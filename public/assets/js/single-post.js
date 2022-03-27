/* eslint-disable valid-typeof */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const authContainer = querySelector('#auth-container');
const logoutContainer = querySelector('#logout-container');
const authUsername = querySelector('#auth-username');
const btnLogout = querySelector('#auth-logout');
const loading = querySelector('#loading');
const postId = window.location.href.split('/')[4];

window.onload = () => {
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

  // logout
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

  const renderSinglePostDom = (
    userId,
    postImage,
    postTitle,
    postContent,
    PostAt,
    PostBy,
    postVoteCount,
  ) => {
    // parent all card
    const containerSinglePost = querySelector('#single-post-container');

    // Create sub parent post
    const cardSinglePost = createElement(
      'div',
      'card__single__posts',
      containerSinglePost,
    );

    // ---- post card Image header ----
    if (postImage) {
      const cardImage = createElement('div', 'card__image', cardSinglePost);
      cardImage.style.background = `url('${postImage}')`;
      cardImage.style.backgroundSize = 'cover';
      cardImage.style.backgroundRepeat = 'no-repeat';
      cardImage.style.backgroundPosition = 'center';
    }

    const cardBodySinglePost = createElement(
      'div',
      'card__body__singlePost',
      cardSinglePost,
    );
    const singlePostTitle = createElement(
      'h1',
      'singlePost__title',
      cardBodySinglePost,
    );
    singlePostTitle.textContent = postTitle;

    const singlePostContent = createElement(
      'p',
      'singlePost__content',
      cardBodySinglePost,
    );
    singlePostContent.textContent = postContent;

    const singlePostFooter = createElement(
      'div',
      'singlePost__footer',
      cardBodySinglePost,
    );

    const singlePostAt = createElement(
      'p',
      'footer__post__at',
      singlePostFooter,
    );
    singlePostAt.textContent = formatDate(PostAt);

    const singlePostVote = createElement(
      'p',
      'footer__post__vote',
      singlePostFooter,
    );
    singlePostVote.textContent = postVoteCount
      ? `${postVoteCount} Votes`
      : "haven't any votes yet.";

    // ----------------

    const singlePostByCard = createElement(
      'a',
      'card__post__by',
      cardBodySinglePost,
    );
    singlePostByCard.href = `/profile/user/${userId}/show`;
    const textSinglePostBy = createElement(
      'span',
      'text__post__by',
      singlePostByCard,
    );
    textSinglePostBy.textContent = 'Post By|';

    const singlePostBy = createElement('span', 'p__post__by', singlePostByCard);
    singlePostBy.textContent = PostBy;
  };

  const renderEmptyNotFoundPost = (message) => {
    // parent all card
    const containerSinglePost = querySelector('#single-post-container');

    // Create sub parent post
    const cardNotFoundPost = createElement(
      'div',
      'card__not-found__post',
      containerSinglePost,
    );
    const textSinglePost = createElement(
      'p',
      'text__not-found__post',
      cardNotFoundPost,
    );
    textSinglePost.textContent = message;
    const linkSinglePost = createElement(
      'a',
      'link__not-found__post',
      cardNotFoundPost,
    );
    linkSinglePost.textContent = 'Go Back';
    linkSinglePost.href = '/posts';
  };

  singlePost(postId)
    .then(({ status, message, data }) => {
      if (status === 200) {
        if (data && !Array.isArray(data)) {
          const {
            user_id: userId,
            username: PostBy,
            content: postContent,
            title: postTitle,
            created_at: PostAt,
            url_image: postImage,
            votes_counts: postVoteCount,
          } = data;
          renderSinglePostDom(
            userId,
            postImage,
            postTitle,
            postContent,
            PostAt,
            PostBy,
            postVoteCount,
          );
        } else {
          renderEmptyNotFoundPost(message);
        }
      } else {
        // handle send request
        renderEmptyNotFoundPost(
          'Sorry This Post is not Exist! 😭  Please Use Valid Post Id',
        );
      }
    })
    .catch(() => {
      // handle send request
      renderEmptyNotFoundPost(
        'Sorry This Post is not Exist! 😭  Please Use Valid Post Id',
      );
    });

  addListener('#auth-logout', 'click', handleLogout);
  loading.classList.add('hidden');
};
