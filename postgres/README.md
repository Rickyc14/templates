# Postgres



```bash
# psql (14.0 (Debian 14.0-1.pgdg110+1))

docker-compose -f local.yml exec postgres psql -h postgres -p 5432 -U user_admin example_db

docker compose -f local.yml exec postgres psql -h postgres -p 5432 -U user_admin example_db
```
