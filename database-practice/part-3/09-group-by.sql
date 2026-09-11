-- Group by creates groups of rows
-- Where filters before grouping
-- Having filters after grouping

-- Find authors who have posted at least 2 posts

SELECT u.name AS author, COUNT(*) AS post_count
FROM public.users AS u
LEFT JOIN public.posts AS p ON p.user_id = u.id
GROUP BY u.id
HAVING COUNT(*) >= 2;

