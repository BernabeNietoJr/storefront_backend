CREATE TABLE store_users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(100),
    password_digest VARCHAR(100)
);