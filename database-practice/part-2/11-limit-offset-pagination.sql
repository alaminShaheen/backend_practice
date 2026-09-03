-- limit - how many rows to return
-- offset - how many rows to skip

-- first 5 products or 1st page
SELECT name, description FROM basics.products ORDER BY name LIMIT 5 OFFSET 0;

-- 2nd 5 products or 2nd page
SELECT name, description FROM basics.products ORDER BY name LIMIT 5 OFFSET 5;