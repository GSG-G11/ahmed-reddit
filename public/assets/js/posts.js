/* eslint-disable valid-typeof */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const authContainer = querySelector('#auth-container');
const logoutContainer = querySelector('#logout-container');
const authUsername = querySelector('#auth-username');
const btnLogout = querySelector('#auth-logout');
const loading = querySelector('#loading');

let userID;
let showDefault;

window.onload = () => {
  // ------------------- check Cookies ----------------------
  checkCookies()
    .then(({ status, id, username }) => {
      userID = id;
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

  // ------------------------------- create Default Post ----------------------------------
  const createDefaultPost = () => {
    const containerPosts = querySelector('#container-posts');
    const userPostImg = createElement(
      'div',
      'not__found__card',
      containerPosts,
    );
    userPostImg.id = 'not-found-card';
    const userImg = createElement('img', '', userPostImg);
    userImg.src = '/img/banar.svg';
    const text = createElement('p', 'not__found__text', userPostImg);
    text.textContent = 'Not Found Any Post! 😢';
  };

  if (showDefault) {
    createDefaultPost();
  }

  // -------------------- function to delete post ----------------------
  const deletePost = (postId) => {
    deletePostUser({ postId })
      .then(({ status, message }) => {
        if (status === 200) {
          useAlert('Success', message, 'success', 'Ok', 'center', 2000, false);
          querySelector(`#post-${postId}-user-${userID}`).style.display =
            'none';
        } else {
          useAlert('Error', message, 'error', 'Ok', 'center', 2000, false);
        }
        if (showDefault) {
          createDefaultPost();
        }
      })
      .catch(console.log);
  };


  const postVoteUp = ()=>{
    // 
  }

  const renderCardPost = (
    id,
    userId,
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
    cardPosts.id = `post-${id}-user-${userId}`;

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
    if (userID === userId) {
      const postActions = createElement('div', 'post__actions', cardHeader);
      const deleteIcon = createElement('i', 'fas fa-trash-alt', postActions);
      // createElement('i', 'fas fa-pen-to-square', postActions);

      deleteIcon.addEventListener('click', () => deletePost(id));
    }

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
        showDefault = data.length;
        if (data.length) {
          data.forEach(
            ({
              id,
              user_id: userId,
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
                userId,
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
        } else {
          // parent all card
          createDefaultPost();
        }
      } else {
        createDefaultPost();
      }
    })
    .catch((error) => console.log(error));

  // ------------------- hidden loading ----------------------
  loading.classList.add('hidden');
};
