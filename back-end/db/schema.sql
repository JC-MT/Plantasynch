DROP DATABASE IF EXISTS platasynch_db;
CREATE DATABASE platasynch_db;

\ c platasynch_db;

CREATE TABLE garden (
    id SERIAL PRIMARY KEY,
    name TEXT,
    image TEXT,
    origin TEXT,
    category TEXT,
    ideal_light TEXT,
    ideal_watering TEXT,
    last_water INT,
    is_healthy BOOLEAN,
);