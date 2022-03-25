/* eslint-disable valid-typeof */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const authContainer = querySelector('#auth-container');
const logoutContainer = querySelector('#logout-container');
const authUsername = querySelector('#auth-username');
const btnLogout = querySelector('#auth-logout');
const loading = querySelector('#loading');
window.onload = () => {
  // ------------------- check Cookies ----------------------
  checkCookies()
    .then(({ status, username }) => {
      if (status === 200) {
        logoutContainer.classList.remove('hidden');
        authContainer.classList.add('hidden');
        authUsername.textContent = username;
      } else {
        authContainer.classList.remove('hidden');
        logoutContainer.classList.add('hidden');
        authUsername.textContent = '';
      }
    })
    .catch((error) => {
      useAlert(
        'Error',
        'Something was wrong ?',
        'error',
        'Ok',
        'center',
        2000,
        false,
      );
    });

  // ------------------- handle Logout ----------------------
  const handleLogout = () => {
    logout()
      .then(({ status, message }) => {
        if (status === 200) {
          useAlert('Success', message, 'success', 'Ok', 'center', 2000, false);
          window.location.href = '/';
        } else {
          useAlert(
            'Error',
            'Something was wrong ?',
            'error',
            'Ok',
            'center',
            2000,
            false,
          );
        }
      })
      .catch((err) =>
        useAlert(
          'Error',
          'Something was wrong ?',
          'error',
          'Ok',
          'center',
          2000,
          false,
        ),
      );
  };
  addListener('#auth-logout', 'click', handleLogout);

  // ------------------- Function To Render Dom ----------------------

  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-us', options);
  };

  const renderCardPost = (
    id,
    title,
    username,
    content,
    createdAt,
    urlImage,
    userImage,
    votesCounts,
    commentsCounts,
  ) => {
    // parent all card
    const containerPosts = querySelector('#container-posts');

    // Create sub parent post
    const cardPosts = createElement('div', 'card__posts', containerPosts);

    // ---- post header ----
    const cardHeader = createElement('div', 'card__header', cardPosts);

    const postHeader = createElement('div', 'post__header', cardHeader);
    const userPostImg = createElement('div', 'user__post__img', postHeader);
    const userImg = createElement('img', '', userPostImg);
    userImg.src = userImage ?? '/img/default_user_img.png';

    const usernamePost = createElement('div', 'username__post', postHeader);
    const userName = createElement('p', 'username', usernamePost);
    userName.textContent = username;
    const postAt = createElement('p', 'post__at', usernamePost);
    postAt.textContent = `Post At | ${formatDate(createdAt)}`;

    // create Post Actions | and | add event listeners here
    const postActions = createElement('div', 'post__actions', cardHeader);
    createElement('i', 'fas fa-trash-alt', postActions);
    createElement('i', 'fas fa-pen-to-square', postActions);

    // ---- post card Body ----
    const cardBody = createElement('div', 'card__body', cardPosts);

    const postTitle = createElement('a', 'post__title', cardBody);
    postTitle.textContent = title;
    postTitle.href = `/posts/${id}/show`;

    const postContent = createElement('div', 'post__content', cardBody);
    postContent.textContent = content;

    if (urlImage) {
      const postImgContainer = createElement('a', 'post__img', cardBody);
      const postImg = createElement('img', '', postImgContainer);
      postImg.src = urlImage;
      postImgContainer.href = `/posts/${id}/show`;
    }

    const postFooter = createElement('div', 'post__footer', cardBody);
    const postVotes = createElement('div', 'post__votes', postFooter);

    const voteUp = createElement('i', 'fas fa-angles-up', postVotes);
    const numberVote = createElement('span', '', postVotes);
    numberVote.textContent = votesCounts ?? '0';
    const voteDown = createElement('i', 'fas fa-angles-down', postVotes);

    const postComments = createElement('a', 'post__comments', postFooter);
    postComments.href = `/posts/${id}/show`;
    createElement('i', 'fas fa-message', postComments);
    const numberComments = createElement('span', '', postComments);
    numberComments.textContent =
      commentsCounts >= 1
        ? `${commentsCounts} Comments`
        : 'No Comments add yet';
  };

  posts()
    .then(({ status, data }) => {
      if (status === 200) {
        data.forEach(
          ({
            id,
            title,
            username,
            content,
            created_at: createdAt,
            url_image: urlImage,
            user_image: userImage,
            votes_counts: votesCounts,
            comments_counts: commentsCounts,
          }) => {
            renderCardPost(
              id,
              title,
              username,
              content,
              createdAt,
              urlImage,
              userImage,
              votesCounts,
              commentsCounts,
            );
          },
        );
      }
    })
    .catch((error) => console.log(error));
  // renderCardPost();

  // ------------------- hidden loading ----------------------
  loading.classList.add('hidden');
};
