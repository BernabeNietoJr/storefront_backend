CREATE TABLE orders(
    id SERIAL PRIMARY KEY, 
    prod_id INTEGER, 
    quantity REAL, 
    user_id INTEGER, 
    status VARCHAR(100)
);