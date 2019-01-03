insert into users
    (name, email, username, password)
    VALUES
    ('Water Melon', 'melon@melon.com', 'melon', 'sweet12345'),
    ('Ice Melon', 'ice@melon.com', 'ice', 'cold12345');

insert into images
    (name, url, user_id)
    VALUES
    ('', 'melon/sweet2.jpg', 1),
    ('', 'melon/sweet1.jpg', 1),
    ('', 'melon/sweet3.jpg', 1),
    ('', 'melon/ice1.jpg', 2),
    ('', 'melon/ice2.jpg', 2),
    ('', 'melon/ice3.jpg', 2),
    ('', 'melon/ice4.jpg', 2),
    ('', 'melon/ice5.jpg', 2),
    ('', 'melon/ice6.jpg', 2);


insert into demos
    (name, folder_name, url, user_id)
    VALUES
    ('baby', 'demo_12311871',  'demo_12311871/baby.jpg', null );