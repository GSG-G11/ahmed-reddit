/* eslint-disable consistent-return */
/* eslint-disable no-useless-escape */
/* eslint-disable valid-typeof */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const authContainer = querySelector('#auth-container');
const logoutContainer = querySelector('#logout-container');
const authUsername = querySelector('#auth-username');
const btnLogout = querySelector('#auth-logout');
const loading = querySelector('#loading');
const modalPostCreate = querySelector('#modal-post-create');

let userID;
let postID;
let showDefault;
let counterUserVotedUp = 0;
let counterUserVotedDown = 0;

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
    .catch(() =>
      useAlert(
        'Error!',
        'Sorry! Some things went wrong',
        'error',
        'Ok',
        'center',
        2000,
        false,
      ),
    );

  // --------------------------- modal Post ----------------------
  // ----------------------------  show/hide modal --------------------------------
  const handleModalPost = () => {
    modalPostCreate.classList.toggle('modal-hidden');

    const btnUpdatePost = querySelector('#submit-form');
    const headerPostTitle = querySelector('.add-post-title');

    clearInputText(['#title', '#content', '#imageUrl']);

    postID = undefined;
    headerPostTitle.textContent = 'Add More Post';
    btnUpdatePost.textContent = 'Add Post';
    btnUpdatePost.setAttribute('data-update-post', false);
  };

  addListener('#btn-show-modal', 'click', handleModalPost);
  addListener('.modal-post-overview', 'click', handleModalPost);
  addListener('#close-post-modal', 'click', handleModalPost);

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

  // ------------------- Function  format Date ----------------------

  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-us', options);
  };

  // ------------------------------- create Undefined Posts ----------------------------------
  const createDefaultPost = () => {
    const containerPosts = querySelector('#container-posts');
    const notFoundCard = createElement(
      'div',
      'not__found__card',
      containerPosts,
    );
    notFoundCard.id = 'not-found-card';
    const userImg = createElement('img', '', notFoundCard);
    userImg.src = '/img/banar.svg';
    const text = createElement('p', 'not__found__text', notFoundCard);
    text.textContent = 'Not Found Any Post! 😢';
  };
  const removeDefaultPost = () => {
    if (querySelector('#not-found-card')) {
      querySelector('#not-found-card').style.display = 'none';
    }
  };

  if (showDefault) {
    createDefaultPost();
  }

  const renderSideBarPosts = (idParents, postId, title, CreatedAt) => {
    const parentID = idParents.split('#')[1];
    if (querySelector(`${parentID}-null-posts`)) {
      querySelector(`${parentID}-null-posts`).style.display = 'none';
    }
    const listParents = querySelector(idParents);
    const itemPost = createElement('li', 'last__post__item', listParents);
    const link = createElement('a', '', itemPost);
    link.href = `/posts/${postId}/show`;
    const itemTitle = createElement('span', 'item__title', link);
    itemTitle.textContent = title;
    const itemCreateAt = createElement('span', 'item__create__at', link);
    itemCreateAt.textContent = ` | ${formatDate(CreatedAt)}`;
  };

  renderSideBarNullPosts = (idParents) => {
    const listParents = querySelector(idParents);
    listParents.textContent = '';
    const itemPost = createElement('li', 'last__post__item', listParents);
    itemPost.id = `${idParents}-null-posts`;
    const itemTitle = createElement('span', 'item__title', itemPost);
    itemTitle.textContent = "Sorry We haven't any posts yet 😢";
  };

  // -----------------  last and top Voted 5 posts handle ---------------------
  const lastFivePostAdded = () => {
    latestFivePosts()
      .then(({ status, data }) => {
        const listParents = querySelector('#last-post-list');
        listParents.textContent = '';
        if (status === 200) {
          if (data.length) {
            data.forEach((post) => {
              const { id, title, created_at: CreatedAt } = post;
              renderSideBarPosts('#last-post-list', id, title, CreatedAt);
            });
          } else {
            renderSideBarNullPosts('#last-post-list');
          }
        } else {
          useAlert(
            'Error!',
            'Sorry! Some things went wrong',
            'error',
            'Ok',
            'center',
            2000,
            false,
          );
        }
      })
      .catch((error) => {
        useAlert(
          'Error!',
          'Sorry! Some things went wrong',
          'error',
          'Ok',
          'center',
          2000,
          false,
        );
      });
  };
  const topVotedPostsAdded = () => {
    topVotedPosts()
      .then(({ status, data }) => {
        const listParents = querySelector('#top-post-list');
        listParents.textContent = '';
        if (status === 200) {
          if (data.length) {
            data.forEach((post) => {
              const { id, title, created_at: CreatedAt } = post;
              renderSideBarPosts('#top-post-list', id, title, CreatedAt);
            });
          } else {
            renderSideBarNullPosts('#top-post-list');
          }
        } else {
          useAlert(
            'Error!',
            'Sorry! Some things went wrong',
            'error',
            'Ok',
            'center',
            2000,
            false,
          );
        }
      })
      .catch((error) => {
        useAlert(
          'Error!',
          'Sorry! Some things went wrong',
          'error',
          'Ok',
          'center',
          2000,
          false,
        );
      });
  };

  // -------------------- function to delete post ----------------------
  const deletePost = (postId) => {
    deletePostUser({ postId })
      .then(({ status, message }) => {
        if (status === 200) {
          lastFivePostAdded();
          topVotedPostsAdded();
          useAlert('Success', message, 'success', 'Ok', 'center', 2000, false);
          querySelector(`#post-${postId}-user-${userID}`).style.display =
            'none';
        } else {
          useAlert('Error', message, 'error', 'Ok', 'center', 2000, false);
        }
        showDefault -= 1;
        if (!showDefault) {
          createDefaultPost();
        } else {
          removeDefaultPost();
        }
      })
      .catch((error) => {
        useAlert(
          'Error!',
          'Sorry! Some things went wrong',
          'error',
          'Ok',
          'center',
          2000,
          false,
        );
      });
  };

  // -------------------- function to Edit post ----------------------
  const showEditPost = (postId, postTitle, postContent, postURLImage) => {
    modalPostCreate.classList.toggle('modal-hidden');
    postID = postId;
    const headerPostTitle = querySelector('.add-post-title');
    headerPostTitle.textContent = 'Update This Post';
    const btnUpdatePost = querySelector('#submit-form');
    btnUpdatePost.textContent = 'Update Post';
    btnUpdatePost.setAttribute('data-update-post', true);

    querySelector('#title').value = postTitle;
    querySelector('#content').value = postContent;
    querySelector('#imageUrl').value = postURLImage;
  };

  // ------------------------------------- To post Vote Up ---------------------
  const postVoteUp = (postId) => {
    userVotePost({ postId, vote: 1 })
      .then(({ status, message }) => {
        if (status === 200) {
          if (!counterUserVotedUp) {
            counterUserVotedDown = 0;
            useAlert(
              'Success',
              message,
              'success',
              'Ok',
              'center',
              2000,
              false,
            );
            const voteId = querySelector(`#vote-${postId}`);
            voteId.textContent = +voteId.textContent + 1;
          }
          counterUserVotedUp += 1;
        } else {
          useAlert('Error', message, 'error', 'Ok', 'center', 2000, false);
        }
      })
      .catch(() =>
        useAlert(
          'Error!',
          'Sorry! Some things went wrong',
          'error',
          'Ok',
          'center',
          2000,
          false,
        ),
      );
  };
  // ------------------------------------- To post Vote Down ---------------------
  const postVoteDown = (postId) => {
    //
    userVotePost({ postId, vote: -1 })
      .then(({ status, message }) => {
        if (status === 200) {
          if (!counterUserVotedDown) {
            counterUserVotedUp = 0;
            useAlert(
              'Success',
              message,
              'success',
              'Ok',
              'center',
              2000,
              false,
            );
            const voteId = querySelector(`#vote-${postId}`);
            voteId.textContent = +voteId.textContent - 1;
          }

          counterUserVotedDown += 1;
        } else {
          useAlert('Error', message, 'error', 'Ok', 'center', 2000, false);
        }
      })
      .catch(() =>
        useAlert(
          'Error!',
          'Sorry! Some things went wrong',
          'error',
          'Ok',
          'center',
          2000,
          false,
        ),
      );
  };

  // -------------------- function of render Card Post ----------------------
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
      const editIcon = createElement('i', 'fas fa-pen-to-square', postActions);

      deleteIcon.addEventListener('click', () => deletePost(id));
      editIcon.addEventListener('click', () =>
        showEditPost(id, title, content, urlImage),
      );
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
    voteUp.addEventListener('click', () => postVoteUp(id));

    const numberVote = createElement('span', '', postVotes);
    numberVote.textContent = votesCounts ?? '0';
    numberVote.id = `vote-${id}`;

    const voteDown = createElement('i', 'fas fa-angles-down', postVotes);
    voteDown.addEventListener('click', () => postVoteDown(id));

    const postComments = createElement('a', 'post__comments', postFooter);
    postComments.href = `/posts/${id}/show`;
    createElement('i', 'fas fa-message', postComments);
    const numberComments = createElement('span', '', postComments);
    numberComments.textContent =
      commentsCounts >= 1
        ? `${commentsCounts} Comments`
        : 'No Comments add yet';
  };

  // -------------------- function posts to use render Card Post ----------------------
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
    .catch((error) => {
      useAlert(
        'Error!',
        'Sorry! Some things went wrong',
        'error',
        'Ok',
        'center',
        2000,
        false,
      );
    });

  // --------------------  Call lastFivePostAdded() <:::>  topVotedPostsAdded() ----------------------
  lastFivePostAdded();
  topVotedPostsAdded();

  // ------------------  create new post -----------------

  const updateDomPost = (postId, userId, title, content, urlImage) => {
    const parentPost = querySelector(`#post-${postId}-user-${userId}`);
    const child = parentPost.children;
    const cardBody = child[1];
    const postTitle = cardBody.children[0];
    const postContent = cardBody.children[1];
    const postImageCard = cardBody.children[2];
    const postImage = postImageCard.children[0];

    postTitle.textContent = title;
    postContent.textContent = content;
    postImage.src = urlImage;
  };
  // -------------------------- checkTitle --------------------------
  const checkTitle = () => {
    const { value: title } = querySelector('#title');
    if (title.length <= 2 || title.length >= 100) {
      querySelector('#error-title-input').textContent =
        'Please Enter a valid title,at least 2 characters and less than 100 characters';
      return false;
    }
    clearText(['#error-title-input']);
    return true;
  };

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

  // -------------------------- checkImageUrl --------------------------
  const checkImageUrl = () => {
    const { value: imageUrl } = querySelector('#imageUrl');
    const regexURL =
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

    if (imageUrl && !regexURL.test(imageUrl)) {
      querySelector('#error-image-url-input').textContent =
        'Please Enter a valid URL For Image';
      return false;
    }
    clearText(['#error-image-url-input']);
    return true;
  };

  addListener('#title', 'focusout', checkTitle);
  addListener('#content', 'focusout', checkContent);
  addListener('#imageUrl', 'focusout', checkImageUrl);
  // ---------------------- Form Create Post Submit To Create New Post -----------------------------
  const handleCreateNewPost = () => {
    if (checkTitle() && checkContent() && checkImageUrl()) {
      clearText([
        '#error-title-input',
        '#error-content-input',
        '#error-image-url-input',
      ]);
      // handle send request

      const btnFormSubmitModal = querySelector('#submit-form');
      const title = querySelector('#title').value.trim();
      const content = querySelector('#content').value.trim();
      const urlImage = querySelector('#imageUrl').value.trim();
      const createdAt = new Date();

      // update-post
      const isUpdate =
        btnFormSubmitModal.getAttribute('data-update-post') === 'true';

      if (isUpdate) {
        userUpdatePost({ postID, title, content, urlImage })
          .then(({ status, message, data }) => {
            if (status === 400) {
              useAlert('Error', message, 'error', 'Ok', 'center', 2000, false);
              return false;
            }

            // ------------------------ function to update dom when update any post -----------------

            updateDomPost(postID, userID, title, content, urlImage);
            // update this dom post

            handleModalPost();
            clearInputText(['#title', '#content', '#imageUrl']);
            useAlert(
              'Success',
              message,
              'success',
              'Ok',
              'center',
              2000,
              false,
            );
            lastFivePostAdded();
            topVotedPostsAdded();
          })
          .catch((error) => {
            useAlert(
              'Error',
              error.message,
              'error',
              'Ok',
              'center',
              2000,
              false,
            );
          });
      } else {
        userCreatePost({ title, content, urlImage, createdAt })
          .then(({ status, message, data }) => {
            if (status === 400) {
              useAlert('Error', message, 'error', 'Ok', 'center', 2000, false);
              return false;
            }

            const {
              id: postId,
              user_id: userId,
              title: postTitle,
              username: createdBy,
              content: postContent,
              created_at: postCreatedAt,
              urlImage: userImg,
              url_image: postImag,
            } = data;
            showDefault += 1;
            if (showDefault) {
              removeDefaultPost();
            }

            renderCardPost(
              postId,
              userId,
              postTitle,
              createdBy,
              postContent,
              postCreatedAt,
              postImag,
              userImg,
              0,
              null,
            );

            handleModalPost();
            clearInputText(['#title', '#content', '#imageUrl']);
            useAlert(
              'Success',
              message,
              'success',
              'Ok',
              'center',
              2000,
              false,
            );
            lastFivePostAdded();
            topVotedPostsAdded();
          })
          .catch((error) => {
            useAlert(
              'Error',
              error.message,
              'error',
              'Ok',
              'center',
              2000,
              false,
            );
          });
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

  addListener('#submit-form', 'click', handleCreateNewPost);

  // ------------------- hidden loading ----------------------
  loading.classList.add('hidden');
};
