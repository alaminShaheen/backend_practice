-- All posts with all/no comment(s) and post author


-- left join on comments to show posts without any comments as well
SELECT p.title, p.views, p.status, u.name, c.body
FROM public.posts AS p
INNER JOIN public.users AS u ON p.user_id = u.id
LEFT JOIN public.comments AS c ON c.post_id = p.id;