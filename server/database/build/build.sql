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

-- INSERT INTO
--   posts (user_id, title, content, url_image, created_at)
-- VALUES
--   (1, 'test title', 'test body content', NULL, DATE '2022-03-25');
--
--
--
-- INSERT INTO
--   comments (post_id, user_id, content)
-- VALUES
--   (1, 1, 'test comment body content'),
--   (1, 1, 'test 2 comment body content');
--
--
-- INSERT INTO
--   votes (post_id, user_id, vote_number)
-- VALUES
--   (1, 1, 1),
--   (1, 1, 1),
--   (1, 1, 1);
--
--
--
-- SELECT
--   p.id,
--   p.user_id,
--   p.title,
--   p.content,
--   p.url_image,
--   p.created_at,
--   COUNT(v.id) AS votes_counts
-- FROM
--   posts p
--   JOIN votes v
--   ON p.id=v.post_id
-- GROUP BY
--   p.id;
--
--
-- INSERT INTO
--   votes (post_id, user_id, vote_number)
-- VALUES
--   (1, 1, 1),
--   (1, 1, -1),
--   (1, 1, -1);
--
--
-- SELECT
--   p.id,
--   p.user_id,
--   p.title,
--   SUM(v.vote_number) AS votes_counts
-- FROM
--   posts p
--   LEFT JOIN votes v
--   ON p.id=v.post_id
-- GROUP BY
--   p.id;
--
--
-- SELECT
--   *
-- FROM
--   votes
-- WHERE
--   user_id=1
--   AND post_id=2;
--
--
-- SELECT
--   *
-- FROM
--   votes;
-- --
-- --
-- UPDATE
--   votes
-- SET
--   vote_number=1
-- WHERE
--   id=5
--   AND user_id=1
--   AND post_id=2;
-- --
-- --
-- INSERT INTO
--   votes (post_id, user_id, vote_number)
-- VALUES
--   (2, 1, -1);
--
-- UPDATE
--   votes
-- SET
--   vote_number=$4
-- WHERE
--   id=$1
--   AND user_id=$2
--   AND post_id=$3 RETURNING*;