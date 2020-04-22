select p.post_id, p.post_url
from post p
    join users u on p.user_id = u.user_id
where u.user_id = $1;