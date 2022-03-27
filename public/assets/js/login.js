/* eslint-disable consistent-return */
/* eslint-disable operator-linebreak */
/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */

const checkEmail = () => {
  const { value: email } = querySelector('#email');
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!regexEmail.test(email) || email.length <= 0) {
    querySelector('#email_error').textContent = 'Please Enter a valid E-mail';
    return false;
  }
  if (email.length <= 8 || email.length >= 100) {
    querySelector('#email_error').textContent =
      'Email at least 8 characters,and less than 100 characters';
    return false;
  }
  clearText(['#email_error']);
  return true;
};

const checkPassword = () => {
  const { value: password } = querySelector('#password');
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;

  if (!regexPassword.test(password) || password.length <= 0) {
    querySelector('#password_error').textContent =
      'Please Enter a valid Password,The password contain symbols, numbers and letters (uppercase, lowercase)';
    return false;
  }
  if (password.length <= 8 || password.length >= 255) {
    querySelector('#password_error').textContent =
      'Please Enter a valid Password,The password must be at least 6';
    return false;
  }
  clearText(['#password_error']);
  return true;
};

addListener('#email', 'focusout', checkEmail);
addListener('#password', 'focusout', checkPassword);

const handleSubmitFrom = () => {
  if (checkEmail() && checkPassword()) {
    clearText(['#password_error', '#email_error']);
    // handle send request

    const email = querySelector('#email').value.trim();
    const password = querySelector('#password').value.trim();

    login({ email, password })
      .then(({ status, message }) => {
        if (status === 400) {
          useAlert('Error', message, 'error', 'Ok', 'center', 2000, false);
          return false;
        }

        useAlert(
          'Success',
          'Login Successfully 😉',
          'success',
          'Ok',
          'center',
          2000,
          false,
        );
        clearInputText(['#email', '#password']);

        window.location.href = '/posts';
      })
      .catch((error) => {
        useAlert('Error', error.message, 'error', 'Ok', 'center', 2000, false);
      });
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

addListener('#form-submit', 'click', handleSubmitFrom);
