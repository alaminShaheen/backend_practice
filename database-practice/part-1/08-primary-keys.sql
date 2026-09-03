DROP TABLE IF EXISTS basics.sales;

CREATE TABLE basics.sales (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL ,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT now()
);

INSERT INTO basics.sales (title, price)
VALUES ('hELLO', 10), ('YOOO', 30);

SELECT * FROM basics.sales;

