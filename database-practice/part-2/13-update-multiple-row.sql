SELECT * FROM basics.products;


UPDATE basics.products
SET price = ROUND(price * 1.10, 2)
WHERE category = 'stationery';