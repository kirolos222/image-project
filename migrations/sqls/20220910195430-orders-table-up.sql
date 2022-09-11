CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES user4(id),
    products_id bigint REFERENCES products(id),
    quantity integer NOT NULL
);