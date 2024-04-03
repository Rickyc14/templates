#!/usr/bin/env bash


# Ensure that your version of snapd is up to date
sudo snap install core; sudo snap refresh core

# Remove certbot-auto and any Certbot OS packages
sudo apt-get remove certbot

# Install Certbot
sudo snap install --classic certbot

# Prepare the Certbot command
sudo ln -s /snap/bin/certbot /usr/bin/certbot


NGINX_CONTAINER="nginx-container-1"
NGINX_STATE="$(docker ps --filter "name=${NGINX_CONTAINER}" --format "{{.State}}")"

if [[ "${NGINX_STATE}" != "running" ]]
then
    echo "Nginx must be running with http.conf!" >&2
    exit 1
fi


WEBROOT="/var/www/html"

if [[ -d "${WEBROOT}" ]]; then
    echo "Make sure ${WEBROOT} is mounted into the Nginx container!"
else
    sudo mkdir -p "${WEBROOT}"
    echo "Created ${WEBROOT}! Remember to mount ${WEBROOT} into the Nginx container!"
    exit 1
fi

DOMAIN="website.com"


# Generate certificate
sudo certbot certonly --webroot --webroot-path="${WEBROOT}" \
                      --email username@email.com \
                      --agree-tos \
                      --no-eff-email \
                      --staging \
                      --domain "${DOMAIN}" \
                      --domain "www.${DOMAIN}"
#   --staging
#   --force-renewal


CERTIFICATES_DIRECTORY="/etc/letsencrypt/live/${DOMAIN}"
# Certificate   /etc/letsencrypt/live/website.com/fullchain.pem
# Key           /etc/letsencrypt/live/website.com/privkey.pem

echo "Certificates Directory: ${CERTIFICATES_DIRECTORY}"

DH_PARAM_DIRECTORY="/etc/ssl/certs/dhparam"
DH_PARAM_FILE="${DH_PARAM_DIRECTORY}/dhparam-2048.pem"

if [[ -f "${DH_PARAM_FILE}" ]]; then
    echo "${DH_PARAM_FILE} already exists!"
else
    sudo mkdir -p "${DH_PARAM_DIRECTORY}"
    sudo openssl dhparam -out "${DH_PARAM_FILE}" 2048
    echo "Created ${DH_PARAM_FILE}!"
fi


echo "Done!"

exit 0
