#!/usr/bin/env bash

set -o nounset -o errexit


SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

OLD_FERNET_KEY=""
NEW_FERNET_KEY="$("${SCRIPT_DIR}/generate-fernet-key.py")"
FERNET_KEY="${NEW_FERNET_KEY},${OLD_FERNET_KEY}"

AIRFLOW__CORE__FERNET_KEY="${FERNET_KEY}" docker compose exec airflow rotate-fernet-key

# Relaunch Scheduler

exporft AIRFLOW__CORE__FERNET_KEY="${NEW_FERNET_KEY}"

