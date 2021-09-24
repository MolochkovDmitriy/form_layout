'use strict'

const form = document.getElementById('form');
const inputEmail = document.getElementById('email');

function validateEmail(email) {
  let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return regex.test(String(email).toLowerCase());
}

form.onsubmit = function () {
  if ((validateEmail(inputEmail.value)) && (inputEmail.value !== '')) {
    return true;
  } else {
    inputEmail.classList.remove('input_normal');
    inputEmail.classList.add('input_error');
    return false;
  }
}