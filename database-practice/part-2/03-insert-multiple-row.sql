INSERT INTO basics.products (
    name,
    category,
    price,
    stock,
    sku,
    description
) VALUES
      ('laptop stand 2','electronics',3000.00,50,'ELEC-KEY-003','laptop stand description 2'),
      ('laptop stand 3','electronics',4000.00,20,'ELEC-KEY-004','laptop stand description 3');

SELECT name, category, price, stock, sku
FROM basics.products
WHERE sku IN ('ELEC-KEY-003', 'ELEC-KEY-004');