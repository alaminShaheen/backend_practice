-- like - case sensitive pattern match
-- ilike - case insensitive pattern match
-- % means any number of chars match
-- _ exactly 1 char match

-- products where name contains Wireless and anything after wireless may appear.
SELECT name, price from basics.products WHERE name LIKE 'Wireless%';

-- products where name contains Desks and anything before or after Desks may appear and it is case insensitive.
SELECT name, price from basics.products WHERE name ILIKE '%Desk%';

-- products where name and description contains 'chair' and anything before or after 'chair' may appear and it is case insensitive.
SELECT name, price, description from basics.products WHERE name ILIKE '%chair%' AND description ilike '%chair%';


