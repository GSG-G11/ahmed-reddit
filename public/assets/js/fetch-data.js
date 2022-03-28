/* eslint-disable function-paren-newline */
/* eslint-disable no-undef */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */

// ----------------------------- fetch *** Register *** Api ------------------------
const fetchRegisterApi = async (formInputs) => {
  const options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(formInputs),
  };
  const response = await fetch('/api/v1/register', options);
  return response.json();
};

// ----------------------------- fetch *** Login *** Api ------------------------
const fetchLoginApi = async (formInputs) => {
  const options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(formInputs),
  };
  const response = await fetch('/api/v1/login', options);
  return response.json();
};

// ----------------------------- fetch Check Auth Login Api ------------------------

const fetchCheckAuthLoginApi = async () => {
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };
  const response = await fetch('/api/v1/check-cookies', options);
  return response.json();
};

// ----------------------------- fetch logout  Api ------------------------
const fetchLogoutApi = async () => {
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };
  const response = await fetch('/api/v1/logout', options);
  return response.json();
};

// ----------------------------- fetch Get profile  Api ------------------------
const fetchProfileApi = async () => {
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };
  const response = await fetch('/api/v1/profile', options);
  return response.json();
};

// ----------------------------- fetch  show User Profile  Api ------------------------
const fetchShowUserProfileApi = async (userId) => {
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };
  const response = await fetch(`/api/v1/profile/user/${userId}/show`, options);
  return response.json();
};

// ----------------------------- fetch Update User Password Api ------------------------
const fetchUpdateUserPasswordApi = async (formInputs) => {
  const options = {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(formInputs),
  };
  const response = await fetch('/api/v1/profile/password/update', options);
  return response.json();
};

// ----------------------------- fetch Update User Information Api ------------------------
const fetchUpdateUserInformationApi = async (formInputs) => {
  const options = {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(formInputs),
  };
  const response = await fetch('/api/v1/profile/update', options);
  return response.json();
};

// ----------------------------- fetch Get All Posts Api ------------------------
const fetchGetAllPostsApi = async () => {
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };
  const response = await fetch('/api/v1/posts', options);
  return response.json();
};

// ----------------------------- fetch  Get One Post  Api ------------------------
const fetchGetPostApi = async (postId) => {
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };
  const response = await fetch(`/api/v1/posts/${postId}/show`, options);
  return response.json();
};

// ----------------------------- fetch  Create Post  Api ------------------------
const fetchCreatePostApi = async (inputs) => {
  const options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(inputs),
  };
  const response = await fetch('/api/v1/posts', options);
  return response.json();
};

// ----------------------------- fetch  Update Post  Api ------------------------
const fetchUpdatePostApi = async (formInputs) => {
  const options = {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(formInputs),
  };
  const response = await fetch('/api/v1/posts', options);
  return response.json();
};

// ----------------------------- fetch Delete posts Api ------------------------
const fetchDeletePostApi = async (postId) => {
  const options = {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(postId),
  };
  const response = await fetch('/api/v1/posts', options);
  return response.json();
};

// ----------------------------- fetch Add Vote To Post Api  fetchAddVoteToPostApi------------------------
const fetchVoteUpToPostApi = async (inputs) => {
  const options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(inputs),
  };
  const response = await fetch('/api/v1/vote/up', options);
  return response.json();
};
const fetchVoteDownToPostApi = async (inputs) => {
  const options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(inputs),
  };
  const response = await fetch('/api/v1/vote/down', options);
  return response.json();
};

// ----------------------------- fetch Get Vote Post Api ------------------------
const fetchGetVotePostApi = async (postId) => {
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };
  const response = await fetch(`/api/v1/vote/post/${postId}`, options);
  return response.json();
};

// ----------------------------- fetch Check User Vote Post Api ------------------------
const fetchCheckUserVotePostApi = async (postId) => {
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };
  const response = await fetch(`/api/v1/vote/post/${postId}/check`, options);
  return response.json();
};

// ----------------------------- fetch  latest Five Posts Api ------------------------
const fetchGetLatestPostsApi = async () => {
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };
  const response = await fetch('/api/v1/posts/latest', options);
  return response.json();
};

// ----------------------------- fetch  Top Voted Posts Api ------------------------
const fetchGetIopVotedPostsApi = async () => {
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };
  const response = await fetch('/api/v1/posts/top-voted', options);
  return response.json();
};

// ----------------------------- fetch  Get Post Comment Api ------------------------
const fetchGetPostCommentApi = async (postId) => {
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };
  const response = await fetch(`/api/v1/comments/${postId}/show`, options);
  return response.json();
};

// ----------------------------- fetch Create Comment Post Api ------------------------
const fetchCreateCommentPostApi = async (inputs) => {
  const options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(inputs),
  };
  const response = await fetch('/api/v1/comments', options);
  return response.json();
};

// ----------------------------- fetch Delete Comment Post Api  ------------------------
const fetchDeleteCommentPostApi = async (commentId) => {
  const options = {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(commentId),
  };
  const response = await fetch('/api/v1/comments', options);
  return response.json();
};
