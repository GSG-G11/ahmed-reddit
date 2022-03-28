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
const buttonShowModal = querySelector('#btn-show-modal');

let userID;
let postID;
let showDefault;

window.onload = () => {
  // --------- ***** ------ *** ---- check Authentication ---------- *** *** *** *** *** ------------
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
      modalPostCreate.remove();
      buttonShowModal.remove();
    });

  // --------- ***** ------ *** ---- handle a post Vote Value ---------- *** *** *** *** *** ------------
  const handleVoteValue = (postId) => {
    fetchGetVotePostApi(postId).then(({ data }) => {
      const { votes_counts: votesCounts, id } = data;
      const voteId = querySelector(`#vote-${id}`);
      voteId.textContent = votesCounts;
    });
  };

  // --------- ***** ------ *** ---- handle Check User Voted  ---------- *** *** *** *** *** ------------
  const handleCheckUserVoted = (postId) => {
    fetchCheckUserVotePostApi(postId).then(({ data }) => {
      const { vote_number: voteNumber, post_id: votedPostId } = data;
      const voteUp = querySelector(`#vote-up-${votedPostId}`);
      const voteDown = querySelector(`#vote-down-${votedPostId}`);
      if (voteNumber === 1) {
        voteUp.classList.add('voted__up');
        voteDown.classList.remove('voted__down');
      } else if (voteNumber === -1) {
        voteUp.classList.remove('voted__up');
        voteDown.classList.add('voted__down');
      }
    });
  };

  // --------------------------- modal Post ----------------------
  // ----------------------------  show/hide modal --------------------------------
  const handleModalPost = () => {
    if (userID) {
      modalPostCreate.classList.toggle('modal-hidden');

      const btnUpdatePost = querySelector('#submit-form');
      const headerPostTitle = querySelector('.add-post-title');

      clearInputText(['#title', '#content', '#imageUrl']);

      postID = undefined;
      headerPostTitle.textContent = 'Add More Post';
      btnUpdatePost.textContent = 'Add Post';
      btnUpdatePost.setAttribute('data-update-post', false);
    }
  };

  addListener('#btn-show-modal', 'click', handleModalPost);
  addListener('.modal-post-overview', 'click', handleModalPost);
  addListener('#close-post-modal', 'click', handleModalPost);

  // ------------------- handle Logout ----------------------
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
      querySelector('#not-found-card').remove();
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
    itemTitle.textContent = 'Not Found Any Post! 😢';
  };

  // -----------------  last and top Voted 5 posts handle ---------------------
  const lastFivePostAdded = () => {
    fetchGetLatestPostsApi()
      .then(({ status, message, data }) => {
        const listParents = querySelector('#last-post-list');
        listParents.textContent = '';

        if (status !== 200) {
          throw customError(message, 400);
        }
        if (!data.length) {
          throw customError('not-found-last-post', 400);
        }

        data.forEach((post) => {
          const { id, title, created_at: CreatedAt } = post;
          renderSideBarPosts('#last-post-list', id, title, CreatedAt);
        });
      })
      .catch(({ message }) => {
        if (message !== 'not-found-last-post') {
          useAlert('Error!', message, 'error', 'Ok', 'center', 2000, false);
        }
        renderSideBarNullPosts('#last-post-list');
      });
  };

  const topVotedPostsAdded = () => {
    fetchGetIopVotedPostsApi()
      .then(({ status, data }) => {
        const listParents = querySelector('#top-post-list');
        listParents.textContent = '';
        if (status !== 200) {
          throw customError(message, 400);
        }
        if (!data.length) {
          throw customError('not-found-top-last-post', 400);
        }

        data.forEach((post) => {
          const { id, title, created_at: CreatedAt } = post;
          renderSideBarPosts('#top-post-list', id, title, CreatedAt);
        });
      })
      .catch(({ message }) => {
        if (message !== 'not-found-top-last-post') {
          useAlert('Error!', message, 'error', 'Ok', 'center', 2000, false);
        }
        renderSideBarNullPosts('#top-post-list');
      });
  };

  // -------------------- function to delete post ----------------------
  const deletePost = (postId) => {
    if (userID) {
      useConfirmAlert(
        'Are you sure?',
        "You won't Delete this Post!",
        'warning',
        true,
        '#3085d6',
        '#e55f34',
        'Yes, delete it!',
      )
        .then((result) => {
          if (result.isConfirmed) {
            return fetchDeletePostApi({ postId });
          }
          throw customError('cancel-delete-post', 400);
        })
        .then(({ status, message }) => {
          if (status !== 200) {
            throw customError(message, 400);
          }

          lastFivePostAdded();
          topVotedPostsAdded();

          useAlert('Success', message, 'success', 'Ok', 'center', 2000, false);
          querySelector(`#post-${postId}-user-${userID}`).style.display =
            'none';

          showDefault -= 1;
          if (!showDefault) {
            createDefaultPost();
          } else {
            removeDefaultPost();
          }
        })
        .catch(({ message }) => {
          if (message !== 'cancel-delete-post') {
            useAlert('Error', message, 'error', 'Ok', 'center', 2000, false);
          }
        });
    } else {
      window.location.href = '/auth/login';
    }
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

    const cardImage = querySelector(`#card-image-${postId}-post`);
    const hasImage = cardImage.children[0];

    querySelector('#title').value = postTitle;
    querySelector('#content').value = postContent;

    if (hasImage) {
      querySelector('#imageUrl').value = hasImage.src;
    }
  };

  // ------------------------------------- To post Vote Up ---------------------
  const postVoteUp = (postId) => {
    if (userID) {
      fetchVoteUpToPostApi({ postId, vote: 1 })
        .then(({ status, message }) => {
          if (status !== 200) {
            throw customError(message, 400);
          }
          if (showDefault) {
            handleVoteValue(postId);
            handleCheckUserVoted(postId);
          }
        })
        .catch(({ message }) =>
          useAlert('Error', message, 'error', 'Ok', 'center', 2000, false),
        );
    } else {
      window.location.href = '/auth/login';
    }
  };
  // ------------------------------------- To post Vote Down ---------------------

  const postVoteDown = (postId) => {
    if (userID) {
      fetchVoteDownToPostApi({ postId, vote: -1 })
        .then(({ status, message }) => {
          if (status !== 200) {
            throw customError(message, 400);
          }
          if (showDefault) {
            handleVoteValue(postId);
            handleCheckUserVoted(postId);
          }
        })
        .catch(({ message }) =>
          useAlert('Error', message, 'error', 'Ok', 'center', 2000, false),
        );
    } else {
      window.location.href = '/auth/login';
    }
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
    const userPostImg = createElement('a', 'user__post__img', postHeader);
    userPostImg.href = `/profile/user/${userId}/show`;
    const userImg = createElement('img', '', userPostImg);

    const isHasImage =
      userImage === '' || userImage === null || userImage === undefined;
    userImg.src = isHasImage ? '/img/default_user_img.png' : userImage;

    const usernamePost = createElement('div', 'username__post', postHeader);
    const userName = createElement('a', 'username', usernamePost);
    userName.textContent = username;
    userName.href = `/profile/user/${userId}/show`;

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
    postTitle.id = `post-title-${id}-post`;
    postTitle.href = `/posts/${id}/show`;

    const postContent = createElement('div', 'post__content', cardBody);
    postContent.textContent = content;
    postContent.id = `post-content-${id}-post`;

    const postImgContainer = createElement('a', 'post__img', cardBody);
    postImgContainer.id = `card-image-${id}-post`;
    if (urlImage) {
      const postImg = createElement('img', '', postImgContainer);
      postImg.src = urlImage;
      postImgContainer.href = `/posts/${id}/show`;
    }

    const postFooter = createElement('div', 'post__footer', cardBody);
    const postVotes = createElement('div', 'post__votes', postFooter);

    const voteUp = createElement('i', 'fas fa-angles-up', postVotes);
    voteUp.id = `vote-up-${id}`;
    voteUp.addEventListener('click', () => postVoteUp(id));

    const numberVote = createElement('span', '', postVotes);
    numberVote.textContent = votesCounts ?? 0;
    numberVote.id = `vote-${id}`;

    const voteDown = createElement('i', 'fas fa-angles-down', postVotes);
    voteDown.id = `vote-down-${id}`;
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
  fetchGetAllPostsApi()
    .then(({ status, message, data }) => {
      if (status !== 200) {
        throw customError(message, 400);
      }
      if (!data.length) {
        throw customError('not-found-post', 400);
      }
      showDefault = data.length;
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
          if (userID) {
            handleCheckUserVoted(id);
          }
        },
      );
    })
    .catch(({ message }) => {
      if (message !== 'not-found-post') {
        useAlert('Error!', message, 'error', 'Ok', 'center', 2000, false);
      }
      createDefaultPost();
    });

  // --------------------  Call lastFivePostAdded() <:::>  topVotedPostsAdded() ----------------------
  lastFivePostAdded();
  topVotedPostsAdded();

  // ------------------  create new post -----------------

  const updateDomPost = (postId, title, content, urlImage) => {
    const postTitle = querySelector(`#post-title-${postId}-post`);
    const postContent = querySelector(`#post-content-${postId}-post`);
    const cardImage = querySelector(`#card-image-${postId}-post`);

    const hasImage = cardImage.children[0];

    postTitle.textContent = title;
    postContent.textContent = content;
    if (urlImage) {
      if (hasImage) {
        hasImage.src = urlImage;
      } else {
        cardImage.textContent = '';
        const postImg = createElement('img', '', cardImage);
        postImg.src = urlImage;
        cardImage.href = `/posts/${postId}/show`;
      }
    } else if (hasImage) {
      hasImage.remove();
    }
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

  const createORUpdatePost = (postId) => {
    const title = querySelector('#title').value.trim();
    const content = querySelector('#content').value.trim();
    const urlImage = querySelector('#imageUrl').value;

    const btnModal = querySelector('#submit-form');
    const isUpdatePost = btnModal.getAttribute('data-update-post') === 'true';

    if (isUpdatePost) {
      return fetchUpdatePostApi({
        postId,
        title,
        content,
        urlImage,
      }).then(({ status, message, data }) => {
        if (status !== 200) {
          throw customError(message, 400);
        }
        const {
          id,
          title: postTitle,
          content: postContent,
          url_image: postImag,
        } = data;
        // ------------------------ function to update dom when update any post -----------------
        updateDomPost(id, postTitle, postContent, postImag);
        handleModalPost();
        clearInputText(['#title', '#content', '#imageUrl']);
        useAlert('Success', message, 'success', 'Ok', 'center', 2000, false);
        lastFivePostAdded();
        topVotedPostsAdded();
      });
    }
    return fetchCreatePostApi({ title, content, urlImage }).then(
      ({ status, message, data }) => {
        if (status !== 200) {
          throw customError(message, 400);
        }

        const {
          id,
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
          id,
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
        useAlert('Success', message, 'success', 'Ok', 'center', 2000, false);
        lastFivePostAdded();
        topVotedPostsAdded();
      },
    );
  };

  // ---------------------- Form Create Post Submit To Create New Post -----------------------------
  const handleCreateNewPost = () => {
    if (checkTitle() && checkContent() && checkImageUrl()) {
      clearText([
        '#error-title-input',
        '#error-content-input',
        '#error-image-url-input',
      ]);

      if (userID) {
        createORUpdatePost(postID).catch(({ message }) => {
          useAlert('Error', message, 'error', 'Ok', 'center', 2000, false);
        });
      } else {
        window.location.href = '/auth/login';
      }
    } else {
      // handle Error response
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
