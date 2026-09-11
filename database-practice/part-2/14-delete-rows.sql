INSERT INTO basics.products (name, category, price, stock, sku, description)
VALUES ('DELETE PROD', 'electronics', 345.5, 23, 'Helo', 'deleter');

SELECT name, category, sku
FROM basics.products
WHERE sku = 'Helo';

DELETE FROM basics.products WHERE sku = 'Helo';