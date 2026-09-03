-- server -> db -> schema -> table
CREATE SCHEMA IF NOT EXISTS basics;

CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- show all schemas
SELECT schema_name from information_schema.schemata ORDER BY schema_name;
