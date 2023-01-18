DROP DATABASE IF EXISTS plantasynch_db;
CREATE DATABASE plantasynch_db;

\c plantasynch_db;

CREATE TABLE garden (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT,
    image TEXT,
    origin TEXT,
    category TEXT,
    ideal_light TEXT,
    ideal_watering TEXT,
    last_water TEXT,
    is_healthy BOOLEAN,
    email TEXT,
    user_id INTEGER,
    demo_plant BOOLEAN,
    actions JSON,
    skip_count INTEGER,
    skip_history INTEGER[]
);

CREATE TABLE platasynch_users (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT,
    password TEXT NOT NULL,
    email TEXT,
    joined_date TIMESTAMP DEFAULT NOW()
);