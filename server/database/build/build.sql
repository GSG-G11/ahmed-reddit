BEGIN;

DROP TABLE
  IF EXISTS users,
  posts,
  comments,
  votes CASCADE;

CREATE TABLE
  users(
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(155) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    age INTEGER,
    url_image TEXT,
    bio TEXT
  );

CREATE TABLE
  posts(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    url_image TEXT,
    created_at DATE NOT NULL,
    FOREIGN key (user_id) REFERENCES users(id)
    ON DELETE CASCADE
  );

CREATE TABLE
  comments(
    id SERIAL PRIMARY KEY NOT NULL,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at DATE NOT NULL,
    FOREIGN key (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
    FOREIGN key (post_id) REFERENCES posts(id)
    ON DELETE CASCADE
  );

CREATE TABLE
  votes(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    vote_number INTEGER NOT NULL,
    FOREIGN key (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
    FOREIGN key (post_id) REFERENCES posts(id)
    ON DELETE CASCADE
  );

COMMIT;