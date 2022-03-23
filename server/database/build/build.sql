BEGIN;

DROP TABLE
  IF EXISTS users,
  posts,
  comments,
  votes CASCADE;

CREATE TABLE
  users(
    id INTEGER NOT NULL,
    username VARCHAR(155) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    age INTEGER,
    url_image TEXT,
    bio TEXT
  );

ALTER TABLE
  users
ADD
  PRIMARY KEY(id);

CREATE TABLE
  posts(
    id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at DATE NOT NULL
  );

ALTER TABLE
  posts
ADD
  PRIMARY KEY(id);

CREATE TABLE
  comments(
    id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL
  );

ALTER TABLE
  comments
ADD
  PRIMARY KEY(id);

CREATE TABLE
  votes(
    id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    vote_number INTEGER NOT NULL
  );

ALTER TABLE
  votes
ADD
  PRIMARY KEY(id);

ALTER TABLE
  posts
ADD
  CONSTRAINT posts_user_id_foreign FOREIGN KEY(user_id) REFERENCES users(id)
  ON DELETE CASCADE;

ALTER TABLE
  comments
ADD
  CONSTRAINT comments_post_id_foreign FOREIGN KEY(post_id) REFERENCES posts(id)
  ON DELETE CASCADE;

ALTER TABLE
  comments
ADD
  CONSTRAINT comments_user_id_foreign FOREIGN KEY(user_id) REFERENCES users(id)
  ON DELETE CASCADE;

ALTER TABLE
  votes
ADD
  CONSTRAINT votes_user_id_foreign FOREIGN KEY(user_id) REFERENCES users(id)
  ON DELETE CASCADE;

ALTER TABLE
  votes
ADD
  CONSTRAINT votes_post_id_foreign FOREIGN KEY(post_id) REFERENCES posts(id)
  ON DELETE CASCADE;

COMMIT;