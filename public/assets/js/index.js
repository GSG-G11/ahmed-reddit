/* eslint-disable valid-typeof */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const authContainer = querySelector('#auth-container');
const logoutContainer = querySelector('#logout-container');
const authUsername = querySelector('#auth-username');
const btnLogout = querySelector('#auth-logout');
const loading = querySelector('#loading');
window.onload = () => {
  //  ----------------------- fetch Check Auth Login Api -------------------------------
  fetchCheckAuthLoginApi()
    .then(({ status, username }) => {
      if (status !== 200) {
        throw customError('Sorry You are not logged in', 400);
      }
      logoutContainer.classList.remove('hidden');
      authContainer.classList.add('hidden');
      authUsername.textContent = username;
    })
    .catch(() => {
      authContainer.classList.remove('hidden');
      logoutContainer.classList.add('hidden');
      authUsername.textContent = '';
    });

  //  ----------------------- logout -------------------------------
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
  loading.classList.add('hidden');
};
