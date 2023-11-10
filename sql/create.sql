create table shoes (
    id serial primary key, 
    brand varchar(255) not null,
    shoe_name varchar(255) not null,
    color varchar(255) not null,
    shoe_size integer,
    price integer, 
    stock integer,
    img_url text 
    );

-- create table stock (
--     id serial primary key, 
--     shoe_id integer,
--     stock_no integer not null,
--     FOREIGN KEY(shoe_id) REFERENCES shoes(id)
-- )


create table users (
    id serial primary key,
    username varchar(100) not null, 
    password varchar(100) not null
);
create table cart (
    id serial primary key,
    user_id integer not null, 
    paidoff boolean default false,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

/* user cart */
create table user_cart (
    id serial primary key,
    shoe_id integer not null,
    cart_id integer not null,
    FOREIGN KEY(cart_id) REFERENCES cart(id),
    FOREIGN KEY(shoe_id) REFERENCES shoes(id)
);

-- ALTER TABLE cart
-- ADD CONSTRAINT unique_shoe_id UNIQUE (shoe_id);