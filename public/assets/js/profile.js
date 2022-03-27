/* eslint-disable no-useless-escape */
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
const textPostCounts = querySelector('#profile-post-counts');
const textCommentPostCounts = querySelector('#profile-comment-post-counts');
const textVotePostCounts = querySelector('#profile-vote-post-counts');

const textImage = querySelector('#profile-image');

window.onload = () => {
  // ---------------------- *** ------------------     Fetch Profile    ----------- *** --------------------------------
  fetchProfileApi()
    .then(({ status, data }) => {
      if (status === 200) {
        const {
          email,
          username,
          age,
          bio,
          url_image: urlImage,
          post_counts: postCounts,
          comment_counts: commentCounts,
          vote_counts: voteCounts,
        } = data;
        authUsername.textContent = username;
        inputUsername.value = username;
        inputAge.value = age;
        inputUrlImage.value = urlImage;
        inputBio.value = bio;

        if (urlImage) {
          textImage.src = urlImage;
        }

        textEmail.textContent = `Email: ${email}`;
        textAge.textContent = `Age: ${age}` ?? '';
        textBio.textContent = `Bio: ${bio}` ?? '';
        textPostCounts.textContent =
          `You have : ${postCounts} Posts` ?? "You have't nay Post";
        textCommentPostCounts.textContent =
          `You have : ${commentCounts} Comments` ?? "You have't nay comment";
        textVotePostCounts.textContent =
          `You have : ${voteCounts} Votes` ?? "You have't nay Vote";
      } else {
        window.location.href = '/';
      }
    })
    .catch(() => {
      window.location.href = '/';
    });

  // ---------------------- *** ------------------     handle Logout    ----------- *** --------------------------------
  const handleLogout = () => {
    fetchLogoutApi()
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

  // ---------------------- *** ------------------ Check handle Update Password   ----------- *** -----------------------
  // error-current-password-input
  // error-password-input
  // error-confirm-password-input

  const checkCurrentPassword = () => {
    const { value: currentPassword } = querySelector('#current-password');
    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;

    if (!regexPassword.test(currentPassword) || currentPassword.length <= 0) {
      querySelector('#error-current-password-input').textContent =
        'Please Enter a valid Password,The password contain symbols, numbers and letters (uppercase, lowercase)';
      return false;
    }
    if (currentPassword.length <= 8 || currentPassword.length >= 255) {
      querySelector('#error-current-password-input').textContent =
        'Please Enter a valid Password,The password must be at least 6';
      return false;
    }
    clearText(['#error-current-password-input']);
    return true;
  };

  const checkPassword = () => {
    const { value: password } = querySelector('#password');
    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;

    if (!regexPassword.test(password) || password.length <= 0) {
      querySelector('#error-password-input').textContent =
        'Please Enter a valid Password,The password contain symbols, numbers and letters (uppercase, lowercase)';
      return false;
    }
    if (password.length <= 8 || password.length >= 255) {
      querySelector('#error-password-input').textContent =
        'Please Enter a valid Password,The password must be at least 6';
      return false;
    }
    clearText(['#error-password-input']);
    return true;
  };

  const checkConfirmPassword = () => {
    const { value: password } = querySelector('#password');
    const { value: confirmPassword } = querySelector('#confirm-password');
    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    if (confirmPassword !== password) {
      querySelector('#error-confirm-password-input').textContent =
        "Sorry! Your Passwords don't match";
      return false;
    }
    if (confirmPassword.length <= 8 || confirmPassword.length >= 255) {
      querySelector('#error-confirm-password-input').textContent =
        'Password at least 8 characters';
      return false;
    }
    if (!regexPassword.test(confirmPassword) || confirmPassword.length <= 0) {
      querySelector('#error-confirm-password-input').textContent =
        'Please Enter a valid Password,The password contain symbols, numbers and letters (uppercase, lowercase)';
      return false;
    }
    clearText(['#error-confirm-password-input']);
    return true;
  };
  addListener('#current-password', 'focusout', checkCurrentPassword);
  addListener('#password', 'focusout', checkPassword);
  addListener('#confirm-password', 'focusout', checkConfirmPassword);

  // ---------------------- *** ------------------ Update Password   ----------- *** --------------------------------------
  const UpdatePassword = () => {
    if (checkCurrentPassword() && checkPassword() && checkConfirmPassword()) {
      clearText([
        '#error-current-password-input',
        '#error-password-input',
        '#error-confirm-password-input',
      ]);

      fetchUpdateUserPasswordApi({
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
          clearInputText([
            '#current-password',
            '#password',
            '#confirm-password',
          ]);
        })
        .catch((error) =>
          useAlert('Error', error, 'error', 'Ok', 'center', 2000, false),
        );
    }
  };
  addListener('#btn-submit-update-password', 'click', UpdatePassword);

  // ---------------------- *** ------------------        *************   ----------- *** -----------------------
  // ---------------------- *** ------------------ ****************************   ----------- *** -----------------------
  // ---------------------- *** ------------------ Check handle Update Password   ----------- *** -----------------------
  const checkAge = () => {
    const { value: age } = querySelector('#age');
    if (age.length < 1 || !Number.isInteger(+age) || +age < 8 || +age >= 120) {
      querySelector('#error-age-input').textContent =
        'Please Enter a valid Age';
      return false;
    }
    clearText(['#error-age-input']);
    return true;
  };

  const checkUsername = () => {
    const { value: username } = querySelector('#username');
    if (username.length <= 2 || username.length >= 25) {
      querySelector('#error-username-input').textContent =
        'Please Enter a valid UserName,at least 2 characters and less than 25 characters';
      return false;
    }
    clearText(['#error-username-input']);
    return true;
  };

  // -------------------------- checkContent --------------------------
  const checkBio = () => {
    const { value: content } = querySelector('#bio');
    if (content && content.length <= 2) {
      querySelector('#error-bio-input').textContent =
        'Please Enter a valid Bio,at least 2 characters';
      return false;
    }
    clearText(['#error-bio-input']);
    return true;
  };

  // -------------------------- checkImageUrl --------------------------
  const checkImageUrl = () => {
    const { value: imageUrl } = querySelector('#url-image');
    const regexURL =
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

    if (imageUrl && !regexURL.test(imageUrl)) {
      querySelector('#error-user-image-input').textContent =
        'Please Enter a valid URL For Image';
      return false;
    }
    clearText(['#error-user-image-input']);
    return true;
  };

  addListener('#age', 'focusout', checkAge);
  addListener('#username', 'focusout', checkUsername);
  addListener('#bio', 'focusout', checkBio);
  addListener('#url-image', 'focusout', checkImageUrl);

  // ---------------------- *** ------------------ Update Information ----------- *** --------------------------------------
  const UpdateInformation = () => {
    if (checkAge() && checkUsername() && checkBio() && checkImageUrl()) {
      clearText([
        '#error-age-input',
        '#error-username-input',
        '#error-bio-input',
        '#error-user-image-input',
      ]);
      // update in dom and fetch to server
      fetchUpdateUserInformationApi({
        username: inputUsername.value.trim(),
        age: inputAge.value.trim(),
        url_image: inputUrlImage.value.trim(),
        bio: inputBio.value.trim(),
      })
        .then(({ message, status, data }) => {
          if (status === 400) {
            useAlert('Error', message, 'error', 'Ok', 'center', 2000, false);
            return false;
          }
          const { email, username, age, url_image: image, bio } = data;
          authUsername.textContent = username;
          inputUsername.value = username;
          inputAge.value = age;
          inputUrlImage.value = image;

          inputBio.value = bio;
          textEmail.textContent = email;
          textAge.textContent = age;
          textBio.textContent = bio;

          if (image) {
            textImage.src = image;
          }

          useAlert('Success', message, 'success', 'Ok', 'center', 2000, false);
        })
        .catch((error) =>
          useAlert('Error', error, 'error', 'Ok', 'center', 2000, false),
        );
    }
  };

  addListener('#btn-submit-update-information', 'click', UpdateInformation);

  // ---------------------- *** ------------------    hidden loading  ----------- *** --------------------------------------
  loading.classList.add('hidden');
};
