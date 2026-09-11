-- aggregate functions calculate aggregate (1) result from many rows
-- COUNT, SUM, AVG, MIN, MAX

-- count of all posts
SELECT COUNT(*) AS total_count
FROM public.posts;

-- count of all published posts
-- filter runs before group by (if any)
SELECT COUNT(*) FILTER ( WHERE p.status = 'published' ) AS published_count,
       SUM(views)                                       AS total_views,
       AVG(views)                                       AS average_views,
       MIN(views)                                       AS minimum_views,
       MAX(views)                                       AS maximum_views
FROM public.posts AS p;

