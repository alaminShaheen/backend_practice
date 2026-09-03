SELECT * FROM basics.products;

SELECT price FROM basics.products;

-- AS creates an alias for the output of that column name
SELECT
    name AS product_name,
    price AS selling_price,
    stock AS available_quantity
FROM basics.products;