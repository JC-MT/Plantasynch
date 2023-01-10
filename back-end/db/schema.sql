DROP DATABASE IF EXISTS plantasynch_db;
CREATE DATABASE plantasynch_db;

\c plantasynch_db;

CREATE TABLE garden (
    id SERIAL PRIMARY KEY,
    name TEXT,
    image TEXT,
    origin TEXT,
    category TEXT,
    ideal_light TEXT,
    ideal_watering TEXT,
    last_water TEXT,
    is_healthy BOOLEAN,
    email TEXT,
    skip_history INTEGER[]
);