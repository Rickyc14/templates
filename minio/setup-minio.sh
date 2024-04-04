#!/usr/bin/env bash

set -o nounset -o errexit


# Create an Alias for the S3-Compatible Service
MINIO_ALIAS="local"
MINIO_URL="http://localhost:9000"

# Go to http://127.0.0.1:9001/access-keys and create new ephemeral development
# credentials. After that, replace _USERNAME and _PASSWORD with the new values.
# The mc command uses the specified username (access key) and password
# (secret key) for authenticating to the MinIO deployment. This is required
# for creating new users via the mc command.
_USERNAME="3uVtJyZDoeQvY23K1QdS"
_PASSWORD="um1l7zKTh9Gd1kThwFdVS4MSpYIR7xFkDZLQBSrD"

docker compose exec minio \
    mc alias set "${MINIO_ALIAS}" "${MINIO_URL}" "${_USERNAME}" "${_PASSWORD}"


# Create User

# Same as in docker-compose.yaml
ACCESS_KEY="Nz8TiGqaaeijV3ET6nAV"
SECRET_KEY="XqSziHShW2I4iJ60FzeQWLILyclABB686oRToehz"

docker compose exec minio \
    mc admin user add "${MINIO_ALIAS}" "${ACCESS_KEY}" "${SECRET_KEY}"


# Create Policy
SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
POLICY_PATH="${SCRIPT_DIR}/policies/basicUser.json"
POLICY_NAME="basicUser"
MINIO_CONTAINER="$(docker ps --filter "name=minio" --format "{{.ID}}")"
MINIO_CONTAINER_POLICY_PATH="/${POLICY_PATH##*/}"

docker cp "${POLICY_PATH}" "${MINIO_CONTAINER}:${MINIO_CONTAINER_POLICY_PATH}"

docker compose exec minio \
    mc admin policy create "${MINIO_ALIAS}" "${POLICY_NAME}" "${MINIO_CONTAINER_POLICY_PATH}"


# Associate Policy
docker compose exec minio \
    mc admin policy attach "${MINIO_ALIAS}" "${POLICY_NAME}" --user="${ACCESS_KEY}"


# Create Bucket
BUCKET_NAME="appuserbucket"

docker compose exec minio \
    mc mb "${MINIO_ALIAS}/${BUCKET_NAME}"


# Set Bucket Quota
docker compose exec minio \
    mc quota set "${MINIO_ALIAS}/${BUCKET_NAME}" --size 1g

