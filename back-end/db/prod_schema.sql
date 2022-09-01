DROP DATABASE IF EXISTS ddha7tiqbad9uo;
CREATE DATABASE ddha7tiqbad9uo;

\c ddha7tiqbad9uo;

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
    email TEXT
);