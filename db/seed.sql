create table users
(
    user_id serial primary key,
    email varchar(100),
    password varchar(200)
);

create table post
(
    post_id serial primary key,
    user_id int references users
    (user_id),
    post_url text
);