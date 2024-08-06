CREATE DATABASE yap;
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);
CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    creator_id INT NOT NULL, 
    FOREIGN KEY (creator_id) REFERENCES users(user_id),
    creator_name VARCHAR(255) NOT NULL, 
    FOREIGN KEY (creator_name) REFERENCES users(username),
    content VARCHAR(255)
);

CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    comment VARCHAR(255)
);

