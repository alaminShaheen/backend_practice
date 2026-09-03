INSERT INTO basics.products (
                             name,
                             category,
                             price,
                             stock,
                             sku,
                             description
) VALUES (
          'laptop stand',
          'electronics',
          5000.00,
          23,
          'ELEC-KEY-002',
          'laptop stand description'
         );

SELECT * FROM basics.products WHERE sku = 'ELEC-KEY-002';