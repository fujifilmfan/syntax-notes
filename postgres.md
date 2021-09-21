## Installing and running Postgres

### MacOS

Postgres can be installed using Homebrew:   
 
```sh
$ brew install postgres
==> Installing postgresql
==> Pouring postgresql-13.1.mojave.bottle.tar.gz
==> /usr/local/Cellar/postgresql/13.1/bin/initdb --locale=C -E UTF-8 /usr/local/var/postgres
==> Caveats
To migrate existing data from a previous major version of PostgreSQL run:
  brew postgresql-upgrade-database

This formula has created a default database cluster with:
  initdb --locale=C -E UTF-8 /usr/local/var/postgres
For more details, read:
  https://www.postgresql.org/docs/13/app-initdb.html

To have launchd start postgresql now and restart at login:
  brew services start postgresql
Or, if you don't want/need a background service you can just run:
  pg_ctl -D /usr/local/var/postgres start
==> Summary
🍺  /usr/local/Cellar/postgresql/13.1: 3,217 files, 38.7MB
```

Note the two options for starting Postgres mentioned in the Brew output above.  
Postgres runs on port `5432` by default.  

### Docker

Several apps I've been working on spin up a Docker postgres container and run Flyway to create needed databases.  Since their creation is done for me, I won't go into the details now.

## Common commands

### Create a user (role)

Via CLI:  
```sh
> createuser --pwprompt imu # -P/--pwprompt is optional
Enter password for new role:
Enter it again:
> psql -U postgres
kklein=> GRANT ALL PRIVILEGES ON DATABASE imu TO imu;
# one might need to run `> createdb kklein` first
```  

Via SQL:  
```sql
CREATE USER imu WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE imu TO imu;
```

### Create a database

Via CLI:  
```sh
> createdb imu --owner=imu
```

### Connect to server

```sh
$ psql -U postgres # user and db 'postgres' must exist I think
```

### Databases

List:  
Via `psql`: use `\l` or `\l+`  
```sh
$ psql --host HOST --port 5432 --username postgres --list
```

Use:  
Via `psql`: use `\c DATABASE`  
  
### Show tables

Via `psql`: use `\dt` or `\dt+` (or --dt?)  
Via `SELECT`:  
```sql
SELECT *
FROM pg_catalog.pg_tables
WHERE schemaname != 'pg_catalog'
  AND schemaname != 'information_schema';
```

### Show users

Via `psql`: use `\du` or `\d+` (or --du?)  
Via `SELECT`:
```sql
SELECT usename AS role_name,
  CASE
    WHEN usesuper AND usecreatedb THEN
      CAST('superuser, create database' AS pg_catalog.text)
    WHEN usesuper THEN
      CAST('superuser' AS pg_catalog.text)
    WHEN usecreatedb THEN
      CAST('create database' AS pg_catalog.text)
    ELSE
      CAST('' AS pg_catalog.text)
  END role_attributes
FROM pg_catalog.pg_user
ORDER BY role_name desc;
// or
SELECT usename, usecreatedb, usesuper, userepl, usebypassrls AS role_name,
FROM pg_catalog.pg_user
ORDER BY role_name desc;
```

### Data-only dump

To dump the whole database except for particular tables, one can use `--exclude-table-data`.  
```sh
pg_dump --host=HOST --port=5432 --username=USER --dbname=DB --exclude-table-data=EXCLUDE1 --exclude-table-data=EXCLUDE2 --data-only --verbose > ${PWD}/DATA_DUMP.sql
```

Example:  
```sh
pg_dump --host=sdc-prod.cluster-c3phcog88rqf.us-west-2.rds.amazonaws.com --port=5432 --username=sdc_owner --dbname=sdc --data-only --verbose > ${PWD}/DATA_DUMP.sql
```

To dump only a particular table from the database, one can use `--table`.  
```sh
pg_dump --host=HOST --port=5432 --username=USER --dbname=DB --table=TABLE --data-only --verbose > ${PWD}/DATA_DUMP.sql
```

### Import data

```sh
psql --host=pgsql-dev.snafu.cr.usgs.gov --port=5432 --username=USER --dbname=DB --file=${PWD}/DATA_DUMP.sql
```

```sh
```

## Connecting to Postgres

### Client

I'm currently using DbVisualizer Free to connect to Postgres instances running on remote servers and locally on MacOS and in Docker containers.  I chose it because it supports Postgres, and others on my team are using it.  To open a new connection:  

* Select 'Database' --> 'Create Database Connection' from the menu bar  
* Click 'Use Wizard' to use the 'New Connection Wizard'  
* Give the connection a useful, descriptive name that includes the name of the database and the environment if you have different versions running locally and on a remote server (such as `local_sbdr`, `dev_sbdr`, `prod_sbdr`)  
* Select 'PostgreSQL' as the database driver  
* On the connection details menu, change a few things:  
    * 'Database': should contain the name of your database, not 'postgres' (unless you want a database called postgres)  
    * 'Database Userid' add one  
    * 'Database Password': add one  

### Docker

Start a Postgres image and note the container ID using `docker ps`.  Then, you can enter the container using `docker exec -it CONTAINER_ID bash`.  Once in, you can use Postgres as described in [CLI](#cli).

### CLI

## Transactions
https://www.postgresql.org/docs/9.6/tutorial-transactions.html

https://www.postgresqltutorial.com/postgresql-python/transaction/
"The connection class has two methods for ending a transaction: commit() and rollback(). If you want to commit all changes to the PostgreSQL database permanently, you call the commit() method. And in case you want to cancel the changes, you call the rollback() method. Closing the connection object or destroying it using the  del will also result in an implicit rollback.
Alternatively, you can set the autocommit attribute of the connection object to True. This ensures that psycopg executes every statement and commits it immediately."
"Starting from psycopg 2.5, the connection and cursor are Context Managers and therefore you can use them with the with statement:
```python
with psycopg2.connect(dsn) as conn:
    with conn.cursor() as cur:
        cur.execute(sql)
```
"Psycopg commits the transaction if no exception occurs within the with block, and otherwise it rolls back the transaction."

https://dba.stackexchange.com/questions/251937/query-hanging-in-clientread-and-blocking-all-others
https://stackoverflow.com/questions/56538709/blocking-on-idle-connections-on-clientread-for-parametrized-queries-bindings-d

psychopg2: "connection cannot be re-entered recursively"  
Occurs with:  
```python
conn = self.connection_map[db]
with conn, conn.cursor() as cur:
    cur.execute(query, vars=values)
    rows = cur.fetchall()
    return rows
```
and also with:  
```python
conn = self.connection_map[db]
with conn:
    with conn.cursor() as cur:
        cur.execute(query, vars=values)
        rows = cur.fetchall()
        return rows
```
but not with:  
```python
conn = self.connection_map[db]
with conn.cursor() as cur:
    cur.execute(query, vars=values)
    rows = cur.fetchall()
    return rows
```
Why? The only thing I've found is: https://gitmemory.com/issue/psycopg/psycopg2/1316/872811346 "I understand what the error means (calling with conn inside of with conn)"  

