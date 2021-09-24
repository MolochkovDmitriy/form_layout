'use strict'

const form = document.getElementById('form');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const blockPassword = document.getElementById('password-block');
const btnPasswordVisible = document.getElementById('password-visible-btn');

btnPasswordVisible.addEventListener('click', function (e) {
	e.preventDefault();
	if (btnPasswordVisible.classList.contains('password-show-btn')) {
		btnPasswordVisible.classList.remove('password-show-btn');
		btnPasswordVisible.classList.add('password-hide-btn');
		inputPassword.type = 'text';
	} else {
		btnPasswordVisible.classList.remove('password-hide-btn');
		btnPasswordVisible.classList.add('password-show-btn');
		inputPassword.type = 'password';
	}
});

function validateEmail(email) {
  let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return regex.test(String(email).toLowerCase());
}

form.onsubmit = function () {
  if (inputEmail.classList.contains('input_error')) {
    inputEmail.classList.remove('input_error');
    inputEmail.classList.add('input_normal');
  }

  if (blockPassword.classList.contains('input_error')) {
    blockPassword.classList.remove('input_error');
    blockPassword.classList.add('input_normal');
  }

  if (validateEmail(inputEmail.value)) {
    if ((inputPassword.value !== '')) {
      return true;
    } else {
      blockPassword.classList.remove('input_normal');
      blockPassword.classList.add('input_error');
      return false;
    }
  } else {
    inputEmail.classList.remove('input_normal');
    inputEmail.classList.add('input_error');
    return false;
  }
}