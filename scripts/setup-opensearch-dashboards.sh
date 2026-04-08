#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ -f "${ROOT_DIR}/.env" ]; then
  set -a
  # shellcheck disable=SC1091
  . "${ROOT_DIR}/.env"
  set +a
fi

OPENSEARCH_URL="${OPENSEARCH_EXTERNAL_URL:-https://localhost:9200}"
DASHBOARDS_URL="${OPENSEARCH_DASHBOARDS_URL:-http://localhost:5601}"
OPENSEARCH_USER="${OPENSEARCH_USERNAME:-admin}"
OPENSEARCH_PASSWORD="${OPENSEARCH_INITIAL_ADMIN_PASSWORD:-}"

if [ -z "${OPENSEARCH_PASSWORD}" ]; then
  echo "OPENSEARCH_INITIAL_ADMIN_PASSWORD is required in .env"
  exit 1
fi

put_json() {
  local url="$1"
  local payload="$2"

  curl -sS -k \
    -u "${OPENSEARCH_USER}:${OPENSEARCH_PASSWORD}" \
    -H "Content-Type: application/json" \
    -X PUT "${url}" \
    --data-binary "@${payload}" >/dev/null
}

put_component_template() {
  local template_name="$1"
  local payload="$2"

  put_json "${OPENSEARCH_URL}/_component_template/${template_name}" "${payload}"
  echo "Installed component template ${template_name}"
}

put_index_template() {
  local template_name="$1"
  local payload="$2"

  put_json "${OPENSEARCH_URL}/_index_template/${template_name}" "${payload}"
  echo "Installed index template ${template_name}"
}

index_exists() {
  local index_name="$1"
  local status

  status="$(curl -sS -k -o /dev/null -w "%{http_code}" \
    -u "${OPENSEARCH_USER}:${OPENSEARCH_PASSWORD}" \
    "${OPENSEARCH_URL}/${index_name}")"

  [ "${status}" = "200" ]
}

create_index_if_missing() {
  local index_name="$1"

  if index_exists "${index_name}"; then
    echo "Index ${index_name} already exists"
    return
  fi

  curl -sS -k \
    -u "${OPENSEARCH_USER}:${OPENSEARCH_PASSWORD}" \
    -H "Content-Type: application/json" \
    -X PUT "${OPENSEARCH_URL}/${index_name}" \
    -d '{}' >/dev/null

  echo "Created index ${index_name}"
}

create_index_pattern() {
  local pattern_id="$1"
  local title="$2"

  curl -sS \
    -u "${OPENSEARCH_USER}:${OPENSEARCH_PASSWORD}" \
    -H "osd-xsrf: true" \
    -H "Content-Type: application/json" \
    -X POST "${DASHBOARDS_URL}/api/saved_objects/index-pattern/${pattern_id}?overwrite=true" \
    -d "{
      \"attributes\": {
        \"title\": \"${title}\",
        \"timeFieldName\": \"timestamp\"
      }
    }" >/dev/null

  echo "Registered Dashboards index pattern ${title}"
}

echo "Applying OpenSearch component templates"
put_component_template \
  "nerp-common" \
  "${ROOT_DIR}/storage/opensearch/component-templates/nerp-common.json"
put_component_template \
  "nerp-fintech-fields" \
  "${ROOT_DIR}/storage/opensearch/component-templates/nerp-fintech-fields.json"
put_component_template \
  "nerp-healthcare-fields" \
  "${ROOT_DIR}/storage/opensearch/component-templates/nerp-healthcare-fields.json"

echo "Applying OpenSearch index templates"
put_index_template \
  "fintech-transactions" \
  "${ROOT_DIR}/storage/opensearch/index-templates/fintech-transactions.json"
put_index_template \
  "healthcare-events" \
  "${ROOT_DIR}/storage/opensearch/index-templates/healthcare-events.json"

echo "Ensuring concrete indexes exist"
create_index_if_missing "fintech-transactions"
create_index_if_missing "healthcare-events"

echo "Creating Dashboards index patterns"
create_index_pattern "fintech-transactions" "fintech-transactions"
create_index_pattern "healthcare-events" "healthcare-events"

echo "OpenSearch and Dashboards setup complete"
