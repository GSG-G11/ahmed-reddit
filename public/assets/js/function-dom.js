/* eslint-disable valid-typeof */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// ----- Helper Selector ---------------
const querySelector = (selector) => document.querySelector(selector);
const querySelectorAll = (selector) => document.querySelectorAll(selector);

const createElement = (tagName, className, parent) => {
  const element = document.createElement(tagName);
  element.className = className;
  parent.appendChild(element);
  return element;
};

const addListener = (selector, eventName, callback) => {
  querySelector(selector).addEventListener(eventName, callback);
};

const clearText = (selector) => {
  selector.forEach((element) => {
    querySelector(element).textContent = '';
  });
};
const clearInputText = (selector) => {
  selector.forEach((element) => {
    querySelector(element).value = '';
  });
};

const useAlert = (
  title,
  text,
  icon,
  confirmButtonText,
  position,
  timer,
  showConfirmButton,
) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    position,
    timer,
    showConfirmButton,
  });
};

const useConfirmAlert = (title,text,icon,showCancelButton,confirmButtonColor,cancelButtonColor,confirmButtonText) =>
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
  });

// .then((result) => {
//   if (result.isConfirmed) {
//     Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
//   }
// })
// ------------------- Function  format Date ----------------------

const formatDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-us', options);
};
