-- Set root password.
--
-- This makes it impossible to login as root without the correct
-- password. Note: in MariaDB 10.4 and later, the `mysql.global_priv`
-- table has replaced the `mysql.user` table, and `mysql.user`
-- should be considered obsolete.
UPDATE mysql.global_priv
SET priv=json_set(
    priv,
    '$.plugin',
    'mysql_native_password',
    '$.authentication_string',
    '*CFDC767A1B9DB829620B63BA798E41F92E187D99')
WHERE User = 'root';


-- Create less privileged user.
CREATE USER IF NOT EXISTS usernameexample@localhost
IDENTIFIED BY PASSWORD '*33AE2458F0B0A43CDBEE9C37928BC809F2B31A9F';


-- Remove Anonymous User
DELETE FROM mysql.global_priv
WHERE User = '';


-- -- Remove Remote Root
DELETE FROM mysql.global_priv
WHERE User = 'root'
  AND Host NOT IN ('localhost', '127.0.0.1', '::1');


-- -- Remove Test Database
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db
WHERE Db = 'test'
   OR Db = 'test\_%'; -- % Matches any string of zero or more characters
                      -- _ Matches a single character


-- Reload Privileges Tables.
--
-- This ensures that all changes take effect immediately.
FLUSH PRIVILEGES;
