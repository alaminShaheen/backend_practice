-- inner queries run first

SELECT p.title, p.views
FROM public.posts AS p
WHERE p.views > (SELECT AVG(public.posts.views) FROM public.posts);