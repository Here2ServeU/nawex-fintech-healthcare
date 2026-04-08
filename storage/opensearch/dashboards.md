# OpenSearch Dashboards

This document describes the OpenSearch Dashboards views to create for the NERP platform.

## Goal

Provide two domain-focused dashboards in OpenSearch Dashboards:

- FinTech risk and transaction monitoring
- Healthcare operational and patient event monitoring

These views complement the integrated React dashboard at `http://localhost:3000`. Use OpenSearch Dashboards at `http://localhost:5601` when you want saved searches, filters, and visualizations directly on indexed search data.

## Prerequisites

1. Start the platform with Docker Compose.
2. Confirm OpenSearch is reachable:

```bash
source .env
curl -k -u "admin:$OPENSEARCH_INITIAL_ADMIN_PASSWORD" https://localhost:9200
```

3. Seed sample data:

```bash
./scripts/seed-fintech-data.sh
./scripts/seed-healthcare-data.sh
```

4. Confirm the target indexes exist in OpenSearch:

- `fintech-transactions`
- `healthcare-events`

## Automate Index Setup And Dashboards Registration

Use the repository script below to create the OpenSearch index templates, ensure the concrete indexes exist, and register the Dashboards index patterns automatically.

```bash
./scripts/setup-opensearch-dashboards.sh
```

The script does the following:

1. Loads `.env`
2. Connects to OpenSearch at `https://localhost:9200`
3. Uploads the reusable component templates from `storage/opensearch/component-templates/`
4. Uploads the composed index templates from `storage/opensearch/index-templates/`
5. Creates these indexes if they do not already exist:
   - `fintech-transactions`
   - `healthcare-events`
6. Registers these Dashboards index patterns through the Dashboards saved objects API:
   - `fintech-transactions`
   - `healthcare-events`

## Composable Index Template Demo

This project includes a small composable index template demo based on the OpenSearch template workflow.

Shared component templates:

- `nerp-common`
- `nerp-fintech-fields`
- `nerp-healthcare-fields`

Composed index templates:

- `fintech-transactions`
- `healthcare-events`

The shared templates demonstrate how to avoid duplicating common settings and field mappings across multiple indexes.

### Shared template responsibilities

`nerp-common` defines:

- common `timestamp` date mapping
- shared `domain` and `type` keyword mappings
- base shard and replica settings for the demo

`nerp-fintech-fields` defines:

- `transaction_id`
- `user_id`
- `amount`
- `currency`
- `merchant`
- `location`

`nerp-healthcare-fields` defines:

- `patient_id`
- `encounter_id`
- `event_type`
- `severity`
- `department`

### Composed template behavior

The `fintech-transactions` index template:

- matches `fintech-transactions*`
- composes `nerp-common` and `nerp-fintech-fields`
- creates the `nerp-fintech` alias

The `healthcare-events` index template:

- matches `healthcare-events*`
- composes `nerp-common` and `nerp-healthcare-fields`
- creates the `nerp-healthcare` alias

### Verify the demo

Run the setup script:

```bash
./scripts/setup-opensearch-dashboards.sh
```

Then inspect the installed templates:

```bash
source .env
curl -k -u "admin:$OPENSEARCH_INITIAL_ADMIN_PASSWORD" https://localhost:9200/_component_template/nerp-common
curl -k -u "admin:$OPENSEARCH_INITIAL_ADMIN_PASSWORD" https://localhost:9200/_index_template/fintech-transactions
curl -k -u "admin:$OPENSEARCH_INITIAL_ADMIN_PASSWORD" https://localhost:9200/fintech-transactions
```

Expected result:

- the component templates exist
- the `fintech-transactions` and `healthcare-events` templates exist
- the created indexes inherit the template mappings, settings, and aliases

Optional environment overrides:

- `OPENSEARCH_EXTERNAL_URL`
- `OPENSEARCH_DASHBOARDS_URL`
- `OPENSEARCH_USERNAME`

Example:

```bash
OPENSEARCH_EXTERNAL_URL=https://localhost:9200 \
OPENSEARCH_DASHBOARDS_URL=http://localhost:5601 \
./scripts/setup-opensearch-dashboards.sh
```

## Index Patterns

Create the following data views in OpenSearch Dashboards:

### 1. FinTech data view

- Name: `fintech-transactions`
- Index pattern: `fintech-transactions`
- Time field: `timestamp`

Suggested fields:

- `transaction_id`
- `user_id`
- `amount`
- `currency`
- `merchant`
- `location`
- `domain`
- `type`
- `timestamp`

### 2. Healthcare data view

- Name: `healthcare-events`
- Index pattern: `healthcare-events`
- Time field: `timestamp`

Suggested fields:

- `patient_id`
- `encounter_id`
- `event_type`
- `severity`
- `department`
- `domain`
- `type`
- `timestamp`

## Dashboard Build Steps

### 1. Open OpenSearch Dashboards

Open:

```text
http://localhost:5601
```

### 2. Create the data views

In Dashboards:

1. Go to Data Views.
2. Create `fintech-transactions`.
3. Create `healthcare-events`.
4. Use `timestamp` as the time field for both.

### 3. Create saved searches

Create these saved searches first so they can be reused in multiple dashboards.

FinTech saved searches:

- `FinTech Recent Transactions`
- `FinTech High Value Transactions`
- `FinTech Transactions By Merchant`

Healthcare saved searches:

- `Healthcare Recent Events`
- `Healthcare High Severity Events`
- `Healthcare Events By Department`

## Dashboard 1: FinTech Risk Overview

Dashboard name:

- `NERP FinTech Risk Overview`

Recommended panels:

- Metric: total transaction count
- Metric: total transaction amount
- Metric: high-value transaction count
- Table: most recent transactions
- Bar chart: transactions by merchant
- Bar chart: transactions by location
- Line chart: transactions over time

Suggested filters:

- `amount >= 1000` for high-value review
- `merchant` filter for partner-specific monitoring
- `location` filter for regional analysis

Field mapping ideas:

- Count by `transaction_id`
- Sum by `amount`
- Terms aggregation on `merchant`
- Terms aggregation on `location`
- Date histogram on `timestamp`

## Dashboard 2: Healthcare Operations Overview

Dashboard name:

- `NERP Healthcare Operations Overview`

Recommended panels:

- Metric: total patient event count
- Metric: high severity event count
- Metric: unique encounter count
- Table: most recent patient events
- Bar chart: events by department
- Bar chart: events by severity
- Line chart: events over time

Suggested filters:

- `severity: high`
- `department: cardiology`
- `event_type: admission`

Field mapping ideas:

- Count by `patient_id`
- Unique count by `encounter_id`
- Terms aggregation on `department`
- Terms aggregation on `severity`
- Terms aggregation on `event_type`
- Date histogram on `timestamp`

## Example Queries

Use these searches in Discover to validate indexed data.

FinTech examples:

- `merchant:"CarePay Pharmacy"`
- `user_id:"user-22"`
- `location:"Chicago"`
- `transaction_id:"txn-1001"`

Healthcare examples:

- `patient_id:"patient-2001"`
- `encounter_id:"enc-88"`
- `department:"cardiology"`
- `severity:"medium"`

## Suggested Layout

Use a simple top-to-bottom layout for each dashboard:

1. Top row: key metric cards
2. Middle row: trend and distribution charts
3. Bottom row: recent event table and filtered search results

## Notes

- The React dashboard is the main integrated application view for both domains.
- OpenSearch Dashboards is best for saved visualizations, filtering, and search exploration.
- If no data appears, confirm the seed scripts ran successfully and the OpenSearch indexes contain documents.
- If OpenSearch Dashboards cannot load results, verify the `opensearch` service is running and reachable from the Dashboards container.
