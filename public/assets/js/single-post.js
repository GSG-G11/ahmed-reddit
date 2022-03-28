/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
/* eslint-disable valid-typeof */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const authContainer = querySelector('#auth-container');
const logoutContainer = querySelector('#logout-container');
const authUsername = querySelector('#auth-username');
const btnLogout = querySelector('#auth-logout');
const loading = querySelector('#loading');
const btnShowModal = querySelector('#btn-show-modal');
const modalCommentCreate = querySelector('#modal-comment-create');
const postID = window.location.href.split('/')[4];

let userID;
let numberOfComments;

window.onload = () => {
  //  ------------------------- Check Authentication -----------------------------
  fetchCheckAuthLoginApi()
    .then(({ status, id, username }) => {
      if (status !== 200) {
        throw customError('Sorry You are not logged in', 400);
      }
      userID = id;
      logoutContainer.classList.remove('hidden');
      authContainer.classList.add('hidden');
      authUsername.textContent = username;
    })
    .catch(() => {
      userID = undefined;
      authContainer.classList.remove('hidden');
      logoutContainer.classList.add('hidden');
      authUsername.textContent = '';
      btnShowModal.remove();
    });

  //  ------------------------- handle logout -----------------------------
  const handleLogout = () => {
    fetchLogoutApi()
      .then(({ status, message }) => {
        if (status !== 200) {
          throw customError('Sorry You are not logged in', 400);
        }
        useAlert('Success', message, 'success', 'Ok', 'center', 2000, false);
        window.location.href = '/';
      })
      .catch(() =>
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

  const removeDefaultNotFoundComment = () => {
    if (querySelector('#not-found-comment')) {
      querySelector('#not-found-comment').remove();
    }
  };

  // --------------------------- modal Post ----------------------
  // ----------------------------  show/hide modal --------------------------------
  const handleModalComment = () => {
    if (userID) {
      modalCommentCreate.classList.toggle('modal-hidden');
      clearInputText(['#content']);
    }
  };

  addListener('#btn-show-modal', 'click', handleModalComment);
  addListener('.modal-comment-overview', 'click', handleModalComment);
  addListener('#close-comment-modal', 'click', handleModalComment);

  //  ------------------------- render Single Post Dom -----------------------------
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

  //  ------------------------- render Empty Not Found Post -----------------------------
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

  //  ------------------------- render Empty Not Found Post -----------------------------
  const renderEmptyNotFoundComments = (message) => {
    // parent all card
    const containerSingleComment = querySelector('#comment-container');

    // Create sub parent Comment
    const cardNotFoundComment = createElement(
      'div',
      'card__not-found__comment',
      containerSingleComment,
    );
    cardNotFoundComment.id = 'not-found-comment';
    const textSinglePostComment = createElement(
      'p',
      'text__not-found__Comment',
      cardNotFoundComment,
    );
    textSinglePostComment.textContent = message;
  };

  const deleteCommentPost = (commentId) => {
    if (userID) {
      useConfirmAlert(
        'Are you sure?',
        "You won't Delete this Comment!",
        'warning',
        true,
        '#3085d6',
        '#e55f34',
        'Yes, delete it!',
      )
        .then((result) => {
          if (result.isConfirmed) {
            return fetchDeleteCommentPostApi({ commentId });
          }
          throw customError('cancel-delete-comment', 400);
        })
        .then(({ status, message }) => {
          if (status !== 200) {
            throw customError(message, 400);
          }

          useAlert('Success', message, 'success', 'Ok', 'center', 2000, false);
          querySelector(
            `#post-${postID}-user-${userID}-comment-${commentId}`,
          ).remove();

          numberOfComments -= 1;
          querySelector('#comment-counts').textContent = numberOfComments;
          if (!numberOfComments) {
            renderEmptyNotFoundComments("Sorry This Post has't comments!");
          } else {
            removeDefaultNotFoundComment();
          }
        })
        .catch(({ message }) => {
          if (message !== 'cancel-delete-comment') {
            useAlert('Error', message, 'error', 'Ok', 'center', 2000, false);
          }
        });
    } else {
      window.location.href = '/auth/login';
    }
  };

  //  ---------------- render Single Post Comments Dom --------------
  const renderSinglePostCommentDom = (
    commentId,
    postId,
    content,
    userId,
    userImage,
    username,
    createdAt,
  ) => {
    // parent all card
    const postCommentContainer = querySelector('#comment-container');

    // Create sub parent post
    const cardPostComment = createElement(
      'div',
      'card__post__comment',
      postCommentContainer,
    );
    cardPostComment.id = `post-${postId}-user-${userId}-comment-${commentId}`;

    // ---- post header ----
    const cardHeader = createElement('div', 'card__header', cardPostComment);

    const postCommentHeader = createElement(
      'div',
      'post__comment__header',
      cardHeader,
    );
    const userPostCommentImg = createElement(
      'a',
      'user__post__comment__img',
      postCommentHeader,
    );
    userPostCommentImg.href = `/profile/user/${userId}/show`;
    const userImg = createElement('img', '', userPostCommentImg);
    userImg.src = userImage ?? '/img/default_user_img.png';

    const usernamePostComment = createElement(
      'div',
      'username__post__comment',
      postCommentHeader,
    );
    const userName = createElement('a', 'username', usernamePostComment);
    userName.textContent = username;
    userName.href = `/profile/user/${userId}/show`;

    const commentAt = createElement('p', 'comment__at', usernamePostComment);
    commentAt.textContent = `On | ${formatDate(createdAt)}`;

    if (userID === userId) {
      const postCommentActions = createElement(
        'div',
        'post__comment__actions',
        cardHeader,
      );
      const deleteIcon = createElement(
        'i',
        'fas fa-trash-alt',
        postCommentActions,
      );

      deleteIcon.addEventListener('click', () => deleteCommentPost(commentId));
    }

    // ---- post card Body ----
    const cardBody = createElement('div', 'card__body', cardPostComment);

    const postCommentContent = createElement(
      'p',
      'post__comment__content',
      cardBody,
    );
    postCommentContent.textContent = content;
  };

  //  ------------------------- Render Form API singlePost -----------------------------
  fetchGetPostApi(postID)
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
            comments_counts: commentsCounts,
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
          querySelector('#comment-counts').textContent = commentsCounts;
          //  ---------- Render Form API singlePost -----------
          return fetchGetPostCommentApi(postID);
        }
        throw customError('Sorry This Post is not Exist! 😭 ', 400);
      } else {
        throw customError(
          'Sorry This Post is not Exist! 😭  Please Use Valid Post Id',
          400,
        );
      }
    })
    .then(({ status, message, data }) => {
      if (status === 200) {
        numberOfComments = data.length;
        if (data.length) {
          data.forEach((comment) => {
            const {
              id: commentId,
              user_id: userId,
              username: PostBy,
              user_image: userImage,
              content: commentContent,
              created_at: commentAt,
            } = comment;
            renderSinglePostCommentDom(
              commentId,
              postID,
              commentContent,
              userId,
              userImage,
              PostBy,
              commentAt,
            );
          });
        } else {
          renderEmptyNotFoundComments(message);
        }
      } else {
        renderEmptyNotFoundComments("Sorry This Post has't comments!");
      }
    })
    .catch(({ message }) => {
      if (querySelector('#single-post-comment-container')) {
        querySelector('#single-post-comment-container').remove();
      }
      renderEmptyNotFoundPost(message);
    });

  // -------------------------- checkContent --------------------------
  const checkContent = () => {
    const { value: content } = querySelector('#content');
    if (content.length <= 2) {
      querySelector('#error-content-input').textContent =
        'Please Enter a valid content,at least 2 characters';
      return false;
    }
    clearText(['#error-content-input']);
    return true;
  };

  addListener('#content', 'focusout', checkContent);

  // ---------------------- Form Create Post Submit To Create New Post -----------------------------
  const handleCreateNewComment = () => {
    if (checkContent()) {
      clearText(['#error-content-input']);
      // handle send request

      const content = querySelector('#content').value.trim();
      // const createdAt = new Date();

      if (userID) {
        fetchCreateCommentPostApi({ postID, content })
          .then(({ status, message, data }) => {
            if (status !== 200) {
              throw customError(message, 400);
            }
            const {
              id: commentId,
              post_id: postId,
              user_id: userId,
              content: commentContent,
              created_at: commentAt,
              urlImage: userImage,
              username,
            } = data;

            renderSinglePostCommentDom(
              commentId,
              postId,
              commentContent,
              userId,
              userImage,
              username,
              commentAt,
            );

            numberOfComments += 1;

            if (numberOfComments) {
              removeDefaultNotFoundComment();
            }

            querySelector('#comment-counts').textContent = numberOfComments;

            handleModalComment();
            clearInputText(['#content']);
            useAlert(
              'Success',
              message,
              'success',
              'Ok',
              'center',
              2000,
              false,
            );

            scroll({
              top: 400,
              behavior: 'smooth',
            });
          })
          .catch(({ message }) => {
            useAlert('Error', message, 'error', 'Ok', 'center', 2000, false);
          });
      } else {
        window.location.href = '/auth/login';
      }
    } else {
      // handle send request
      useAlert(
        'Error!',
        'Sorry! You invalid credentials',
        'error',
        'Ok',
        'center',
        2000,
        false,
      );
    }
  };

  addListener('#submit-form', 'click', handleCreateNewComment);

  //  ------------------------- Remove Loading -----------------------------
  loading.classList.add('hidden');
};
