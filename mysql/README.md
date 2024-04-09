# MariaDB



```bash
# You can start it via
systemctl start mariadb

# or
rcmysql start


# Set password for the mariadb root user
'/usr/bin/mysqladmin' -u root password 'new-password'
'/usr/bin/mysqladmin' -u root -h password 'new-password'

# or

'/usr/bin/mysql_secure_installation'
```



```bash
mysql --batch --user username -ppassword --disable-column-names --execute "use database_name; show tables;"

mysql --batch --user root -ppassword --disable-column-names --execute "SHOW DATABASES;"

mysql --batch --user root -ppassword --disable-column-names --execute "SELECT PASSWORD('somepass');"

mysql -u root -ppassword --batch --execute 'select * from mysql.global_priv';
```



```sql
select * from mysql.global_priv;


SELECT Host, User, Privileges.access, Privileges.plugin, Privileges.EmptyPassword as FROM global_priv;


select * from JSON_TABLE(Priv, '$[*]'
  columns(
   access  varchar(200) path '$.access' 'Not Found' 'Error' ,
   plugin varchar(200) path '$.plugin' 'Not Found' 'Error' ,
   auth_string varcahr(200) path '$.authentication_string' 'Not Found' 'Error' )
) as Privileges;
```


```sql
CREATE USER IF NOT EXISTS root@localhost IDENTIFIED BY 'examplerootpassword';
SET PASSWORD FOR root@localhost = PASSWORD ('examplerootpassword');

GRANT ALL ON *.* TO root@localhost WITH GRANT OPTION;

CREATE USER IF NOT EXISTS root@'%' IDENTIFIED BY 'examplerootpassword';
SET PASSWORD FOR root@'%' = PASSWORD ('examplerootpassword');

GRANT ALL ON *.* TO root@'%' WITH GRANT OPTION;

CREATE USER IF NOT EXISTS myuser@'%' IDENTIFIED BY 'thisismyuserpassword';
SET PASSWORD FOR myuser@'%' = PASSWORD ('thisismyuserpassword');

CREATE DATABASE IF NOT EXISTS databasename;

GRANT ALL ON databasename.* TO myuser@'%';
```
