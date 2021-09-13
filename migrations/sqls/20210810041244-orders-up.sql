CREATE TABLE orders(
    id SERIAL PRIMARY KEY, 
    status VARCHAR(15),
    quantity integer,
    user_id integer
);