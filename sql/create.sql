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

/* user cart */
create table cart (
    cartd_id serial primary key,
    shoe_id integer not null,
    -- paidoff varchar not null,
    FOREIGN KEY(shoe_id) REFERENCES shoes(id)
);

ALTER TABLE cart
ADD CONSTRAINT unique_shoe_id UNIQUE (shoe_id);