-- count unique values

-- count how many unique posts are connected to each tag

SELECT t.name, COUNT(DISTINCT p.id)
FROM public.tags AS t
LEFT JOIN public.post_tags AS pt ON pt.tag_id = t.id
LEFT JOIN public.posts AS p ON p.id = pt.post_id
GROUP BY t.name