SELECT name, stock, price
FROM basics.products
WHERE sku = 'ELEC-KEY-001';

UPDATE basics.products
SET price = 1199.00,
    stock = 23
WHERE sku = 'ELEC-KEY-001';

SELECT name, stock, price
FROM basics.products
WHERE sku = 'ELEC-KEY-001';