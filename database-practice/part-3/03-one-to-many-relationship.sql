-- 1 user can create many posts
-- But a single post can only belong to 1 user

SELECT public.users.name AS author_name, public.posts.title AS post_title, public.posts.status
FROM users
INNER JOIN public.posts ON public.users.id = public.posts.user_id;