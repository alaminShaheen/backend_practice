-- electronic products with price greater than 1000
SELECT * FROM basics.products WHERE category = 'electronics' AND price > 1000;

-- products that are either furniture or electronics
SELECT * FROM basics.products WHERE category = 'electronics' or category = 'furniture';

-- products that are not under the 'furniture' category
SELECT * FROM basics.products WHERE category != 'furniture';

SELECT * FROM basics.products WHERE (category = 'electronics' OR category = 'furniture') AND stock > 0;

SELECT * FROM basics.products WHERE is_active = true AND (price < 1000 or stock >= 100D);