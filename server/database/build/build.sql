BEGIN;

DROP TABLE
  IF EXISTS users,
  posts,
  comments,
  votes CASCADE;

CREATE TABLE
  users(
    id SERIAL NOT NULL,
    username VARCHAR(155) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
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
    id SERIAL NOT NULL,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    url_image TEXT,
    created_at DATE NOT NULL
  );

ALTER TABLE
  posts
ADD
  PRIMARY KEY(id);

CREATE TABLE
  comments(id SERIAL NOT NULL, post_id INTEGER NOT NULL, user_id INTEGER NOT NULL, content TEXT NOT NULL);

ALTER TABLE
  comments
ADD
  PRIMARY KEY(id);

CREATE TABLE
  votes(
    id SERIAL NOT NULL,
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

-- INSERT INTO
--   posts (user_id, title, content, url_image, created_at)
-- VALUES
--   (1, 'test title', 'test body content', NULL, DATE '2022-03-25');


-- INSERT INTO
--   comments (post_id, user_id, content)
-- VALUES
--   (1, 1, 'test comment body content'),
--   (1, 1, 'test 2 comment body content');
-- INSERT INTO
--   votes (post_id, user_id, vote_number)
-- VALUES
--   (1, 1, 1),
--   (1, 1, 1),
--   (1, 1, 1);
-- SELECT
--   p.id,
--   p.user_id,
--   p.title,
--   p.content,
--   p.url_image,
--   p.created_at,
--   COUNT(v.vote_number) AS votes_counts
-- FROM
--   posts p
--   JOIN votes v
--   ON p.id=v.post_id
-- GROUP BY
--   p.id;