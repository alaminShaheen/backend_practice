-- returns data immediately after inserting or updating

INSERT INTO basics.products(name, category, price, stock, sku, description)
VALUES ('RANDOM DATA', 'electronics', 345.99, 45, 'rand-20', '')
RETURNING *;
