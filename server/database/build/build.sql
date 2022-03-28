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

INSERT INTO
  users(username, email, password, age, url_image, bio)
VALUES
  (
    'A7med Qeshta',
    'ahmed_qeshta@gmail.com',
    '$2a$10$CxLWwX99oYJB81jVgX80F.u.p1XKOntT7CaEvGmGbP.nkTSaisA6y',
    23,
    'https://avatars.githubusercontent.com/u/38624002?v=4',
    'My name is Ahmed'
  );

INSERT INTO
  posts(user_id, title, content, url_image, created_at)
VALUES
  (
    1,
    'Post 1',
    'This is the first post',
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    NOW()
  ),
  (
    1,
    'Post two',
    'This is the second post, the second post is best',
    'https://oshiprint.in/image/data/poster/new/mqp1193.jpeg',
    NOW()
  ),
  (
    1,
    'Post 3',
    'This is the third post',
    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    NOW()
  );

INSERT INTO
  comments(post_id, user_id, content, created_at)
VALUES
  (1, 1, 'This is the first comment', NOW()),
  (1, 1, 'This is the second comment', NOW()),
  (1, 1, 'This is the third comment', NOW()),
  (2, 1, 'This is the first comment', NOW()),
  (2, 1, 'This is the second comment', NOW()),
  (2, 1, 'This is the third comment', NOW()),
  (3, 1, 'This is the first comment', NOW()),
  (3, 1, 'This is the second comment', NOW()),
  (3, 1, 'This is the third comment', NOW());

INSERT INTO
  votes(user_id, post_id, vote_number)
VALUES
  (1, 1, 1),
  (1, 2, -1);

COMMIT;