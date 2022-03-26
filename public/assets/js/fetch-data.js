/* eslint-disable function-paren-newline */
/* eslint-disable no-undef */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */

const register = async (formInputs) => {
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

const login = async (formInputs) => {
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

const checkCookies = async () => {
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

// logout
const logout = async () => {
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

// profile
const profile = async () => {
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

// profile
const updateUserPassword = async (formInputs) => {
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

// profile
const updateUserInformation = async (formInputs) => {
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

// posts
const posts = async () => {
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

// Delete posts
const deletePostUser = async (postId) => {
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


// user Vote Post
const userVotePost = async (inputs) => {
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
  const response = await fetch('/api/v1/vote', options);
  return response.json();
};



// user Create Post
const userCreatePost = async (inputs) => {
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

