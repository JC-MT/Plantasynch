DROP DATABASE IF EXISTS d8pej33t5aqtud;
CREATE DATABASE d8pej33t5aqtud;

\c d8pej33t5aqtud;

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
    email TEXT
);