-- 1 post can have multiple tags
-- 1 tag can be associated with multiple posts


-- show every post with its tags

SELECT public.posts.title AS title, public.tags.name AS tag
FROM public.posts
INNER JOIN public.post_tags ON public.posts.id = public.post_tags.post_id
INNER JOIN public.tags ON public.tags.id = public.post_tags.tag_id
ORDER BY title;