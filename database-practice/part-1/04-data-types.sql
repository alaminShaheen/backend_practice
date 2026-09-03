DROP TABLE IF EXISTS basics.students;

CREATE TABLE basics.products (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    description TEXT,

    stock INTEGER DEFAULT 0,

    total_views BIGINT DEFAULT 0,

    -- decimal values
    -- 10 total digits
    -- 2 digits after decimal
    price NUMERIC(10, 2),

    is_active BOOLEAN DEFAULT TRUE
);

INSERT INTO basics.products (name, description, stock, total_views, price, is_active)
VALUES ('product_1', 'This is a product', 3, 20, 23.99, true);

SELECT * FROM basics.products;

SELECT id, name, price, is_active from basics.products WHERE is_active = TRUE;