create table users
(
    user_id serial primary key,
    email varchar(150),
    password varchar(250),
);

create table
if not exists post
(
    post_id serial primary key,
    user_id int references users
(user_id),
    post_url text
);