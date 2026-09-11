-- Get author name, post title, post status and post views for published posts

SELECT public.users.name AS author_name, public.posts.title, public.posts.status, public.posts.views
FROM public.posts
INNER JOIN public.users ON public.posts.user_id = public.users.id
WHERE public.posts.status = 'published'
ORDER BY public.posts.views DESC;