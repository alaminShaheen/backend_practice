-- never check NULL with =.
-- instead check with IS NULL or IS NOT NULL

SELECT name, description FROM basics.products WHERE description IS NULL;

SELECT name, description FROM basics.products WHERE description IS NOT NULL;