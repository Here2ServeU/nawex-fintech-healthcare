#!/usr/bin/env bash
set -euo pipefail

if [ ! -f .env ]; then
  cp .env.example .env
fi

echo "Bootstrapping NERP platform"
echo "Environment file ready at .env"
echo "Run docker-compose up --build to start the stack"
