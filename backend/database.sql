CREATE DATABASE yap;
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);
CREATE TABLE playerInfo(
    playerInfoID SERIAL PRIMARY KEY,
    playerID INT ,
    FOREIGN KEY (playerID) REFERENCES users(user_id),
    playerName VARCHAR(255) NOT NULL,
    FOREIGN KEY (playerName) REFERENCES users(username),
    balance INT NOT NULL,
    hasLoggedInToday BOOLEAN NOT NULL
);
CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    creator_id INT NOT NULL, 
    FOREIGN KEY (creator_id) REFERENCES users(user_id),
    creator_name VARCHAR(255) NOT NULL, 
    FOREIGN KEY (creator_name) REFERENCES users(username),
    content VARCHAR(255)
);



