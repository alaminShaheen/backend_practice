-- left join keeps all rows from the left table
-- if it does not have a corresponding row on the right, it returns null

-- posts -> left table
-- comments -> right table
-- not every post will have comments

SELECT public.posts.id AS post_id, public.posts.title AS post_title, public.comments.body AS comment_body
FROM posts
LEFT JOIN public.comments ON public.comments.post_id = public.posts.id
ORDER BY post_title;