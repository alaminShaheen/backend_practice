-- by default order by sorts in ascending order

SELECT name, description, price FROM basics.products ORDER BY price DESC;

SELECT name, description, category, price FROM basics.products ORDER BY category, price DESC;