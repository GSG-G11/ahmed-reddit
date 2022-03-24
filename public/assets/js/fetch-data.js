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