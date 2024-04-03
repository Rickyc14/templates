FROM redis:6.2


RUN apt-get update -y \
    && rm -rf /var/lib/apt/lists/* \
    ; \
    mkdir -p "/usr/local/etc/redis/" "/run/" \
    && chown -R redis:redis "/usr/local/etc/redis/" \
    && chown -R redis:redis "/run/"

COPY --chown=redis:redis ["./default.conf", "./redis.conf", "./users.acl", "/usr/local/etc/redis/"]

USER redis

CMD [ "/usr/local/bin/redis-server", "/usr/local/etc/redis/redis.conf" ]

