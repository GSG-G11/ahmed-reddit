/* eslint-disable valid-typeof */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const authUsername = querySelector('#auth-username');
const btnLogout = querySelector('#auth-logout');
const loading = querySelector('#loading');

window.onload = () => {
  checkCookies()
    .then(({ status, username }) => {
      if (status === 200) {
        authUsername.textContent = username;
      } else {
        window.location.href = '/';
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

  loading.classList.add('hidden');

  addListener('#auth-logout', 'click', handleLogout);
};
