-- IN - value must match 1 item from the list
-- NOT IN - value must not match any item from the list
-- BETWEEN - value must be inside a range (inclusive)

SELECT name, category, price from basics.products WHERE category IN ('furniture', 'electronics');

SELECT name, category, price from basics.products WHERE category NOT IN ('furniture', 'electronics');

SELECT name, category, price from basics.products WHERE price BETWEEN 100 AND 2000;

