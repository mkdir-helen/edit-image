create table users(
    id serial primary key,
    name varchar(50) not null,
    email varchar(50) not null unique,
    username varchar(50) not null unique,
    password varchar(100) not null
);
create table images(
    id serial primary key,
    name text not null,
    url text not null,
    user_id integer references users(id)
);