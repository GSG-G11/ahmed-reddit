/* eslint-disable valid-typeof */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const authUsername = querySelector('#auth-username');
const btnLogout = querySelector('#auth-logout');
const loading = querySelector('#loading');

const updatePasswordCard = querySelector('#update-password-card');
const updateInfoCard = querySelector('#update-info-card');
const btnUpdatePassword = querySelector('#update-password');
const btnUpdateInfo = querySelector('#update-info');

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

  const handleUpdatePassword = () => {
    btnUpdatePassword.classList.add('active');
    btnUpdateInfo.classList.remove('active');
    btnUpdatePassword.classList.remove('unActive');
    btnUpdateInfo.classList.add('unActive');
    updatePasswordCard.classList.remove('hidden');
    updateInfoCard.classList.add('hidden');
  };
  const handleUpdateInfo = () => {
    btnUpdatePassword.classList.remove('active');
    btnUpdateInfo.classList.add('active');
    btnUpdatePassword.classList.add('unActive');
    btnUpdateInfo.classList.remove('unActive');
    updatePasswordCard.classList.add('hidden');
    updateInfoCard.classList.remove('hidden');
  };

  addListener('#update-password', 'click', handleUpdatePassword);
  addListener('#update-info', 'click', handleUpdateInfo);

  addListener('#auth-logout', 'click', handleLogout);

  loading.classList.add('hidden');
};
