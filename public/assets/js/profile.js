/* eslint-disable consistent-return */
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

const userCurrentPassword = querySelector('#current-password');
const newPassword = querySelector('#password');
const confirmNewPassword = querySelector('#confirm-password');

const inputUsername = querySelector('#username');
const inputAge = querySelector('#age');
const inputUrlImage = querySelector('#url-image');
const inputBio = querySelector('#bio');

const textEmail = querySelector('#profile-email');
const textAge = querySelector('#profile-age');
const textBio = querySelector('#profile-bio');

window.onload = () => {
   // ---------------------- *** ------------------     Fetch Profile    ----------- *** --------------------------------
  profile()
    .then(({ status, data }) => {
      if (status === 200) {
        const { email, username, age, bio, url_image: urlImage } = data;
        authUsername.textContent = username;
        inputUsername.value = username;
        inputAge.value = age;
        inputUrlImage.value = urlImage;
        inputBio.value = bio;

        if (urlImage) {
          querySelector('#profile-image').src = urlImage;
        }

        textEmail.textContent = email;
        textAge.textContent = age ?? '';
        textBio.textContent = bio ?? '';
      } else {
        window.location.href = '/';
      }
    })
    .catch(() => {
      window.location.href = '/';
    });


  // ---------------------- *** ------------------     handle Logout    ----------- *** --------------------------------
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

   // ---------------------- *** ------------------ handle Update Password   ----------- *** --------------------------------
  const handleUpdatePassword = () => {
    btnUpdatePassword.classList.add('active');
    btnUpdateInfo.classList.remove('active');
    btnUpdatePassword.classList.remove('unActive');
    btnUpdateInfo.classList.add('unActive');
    updatePasswordCard.classList.remove('hidden');
    updateInfoCard.classList.add('hidden');
  };
  addListener('#update-password', 'click', handleUpdatePassword);

  // ---------------------- *** ------------------ handle Update Info   ----------- *** --------------------------------------
  const handleUpdateInfo = () => {
    btnUpdatePassword.classList.remove('active');
    btnUpdateInfo.classList.add('active');
    btnUpdatePassword.classList.add('unActive');
    btnUpdateInfo.classList.remove('unActive');
    updatePasswordCard.classList.add('hidden');
    updateInfoCard.classList.remove('hidden');
  };
  addListener('#update-info', 'click', handleUpdateInfo);

  // ---------------------- *** ------------------ Update Password   ----------- *** --------------------------------------
  const UpdatePassword = () => {
    updateUserPassword({
      currentPassword: userCurrentPassword.value,
      password: newPassword.value,
      confirmPassword: confirmNewPassword.value,
    })
      .then(({ message, status }) => {
        if (status === 400) {
          useAlert('Error', message, 'error', 'Ok', 'center', 2000, false);
          return false;
        }
        useAlert('Success', message, 'success', 'Ok', 'center', 2000, false);
        clearInputText(['#current-password', '#password', '#confirm-password']);
      })
      .catch((error) =>
        useAlert('Error', error, 'error', 'Ok', 'center', 2000, false),
      );
  };
  addListener('#btn-submit-update-password', 'click', UpdatePassword);

  // ---------------------- *** ------------------ Update Information ----------- *** --------------------------------------
  const UpdateInformation = () => {
    // update in dom and fetch to server
  };
  addListener('#btn-submit-update-information', 'click', UpdateInformation);

  // ---------------------- *** ------------------    hidden loading  ----------- *** --------------------------------------
  loading.classList.add('hidden');
};
