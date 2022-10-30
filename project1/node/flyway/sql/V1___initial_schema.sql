/* Create your schema here */

CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    original TEXT,
    shortened TEXT
);
