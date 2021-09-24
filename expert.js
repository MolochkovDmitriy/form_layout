'use strict'

const backBtnLink = document.getElementById('back-btn');

const form = document.getElementById('form');
const btnAccept = document.getElementById('accept-btn');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const inputFirstName = document.getElementById('first-name');
const inputLastName = document.getElementById('last-name');
const inputCompany = document.getElementById('company');
const inputPosition = document.getElementById('position');
const inputTelephone = document.getElementById('telephone');
const inputCode = document.getElementById('code');
const checkboxAgreement = document.getElementById('agreement');
const errorBlock = document.getElementById('error-block');
const error = document.getElementById('error-text');
const btnPasswordVisible = document.getElementById('password-visible-btn');
const blockPassword = document.getElementById('password-block');

let flagTelephone = false;

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

backBtnLink.addEventListener('click', function (e) {
	e.preventDefault();
	window.location.href = "index.html";
});

function validatePhone(telephone) {
	let regex = /^(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})$/;
	return regex.test(telephone);
}

function validateEmail(email) {
	let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	return regex.test(String(email).toLowerCase());
}

btnAccept.addEventListener('click', function (e) {
	e.preventDefault();
	if (!(btnAccept.getAttribute('disabled'))) {
		btnAccept.setAttribute('disabled', 'disabled');
		if (inputTelephone.classList.contains('input_error')) {
			inputTelephone.classList.remove('input_error');
			inputTelephone.classList.add('input_normal');
			error.innerHTML = '';
			errorBlock.style.visibility = 'hidden';
		}
		inputTelephone.setAttribute('readonly', 1);
		flagTelephone = true;
	}
});


inputTelephone.oninput = function () {
	if (validatePhone(inputTelephone.value)) {
		btnAccept.removeAttribute('disabled');
	} else {
		btnAccept.setAttribute('disabled', 'disabled');
	}
}

form.onsubmit = function () {
	let formElement = [
		{ element: inputEmail, error: 'Введите e-mail' },
		{ element: inputPassword, error: 'Введите пароль' },
		{ element: inputFirstName, error: 'Введите имя' },
		{ element: inputLastName, error: 'Введите фамилию' },
		{ element: inputCompany, error: 'Введите название Вашей компании' },
		{ element: inputPosition, error: 'Введите Вашу должность' },
		{ element: inputTelephone, error: 'Введите телефон' },
		{ element: inputCode, error: 'Введите код из СМС' },
		{ element: checkboxAgreement.checked, error: 'Не проставлена галочка "Пользовательского соглашения"' },
	]

	let flagValidate = true;
	for (let i = 0; i < formElement.length; i++) {
		if ((i === 1) && blockPassword.classList.contains('input_error')) {
			blockPassword.classList.remove('input_error');
			blockPassword.classList.add('input_normal');
		}
		if ((i !== 8) && (i !== 1) && (document.getElementById(formElement[i].element.id).classList.contains('input_error'))) {
			document.getElementById(formElement[i].element.id).classList.remove('input_error');
			document.getElementById(formElement[i].element.id).classList.add('input_normal');
		}
		if (formElement[i].element.value === '') {
			error.innerHTML = '';
			error.innerHTML = formElement[i].error.toString();
			errorBlock.style.visibility = 'visible';
			if (i === 1) {
				blockPassword.classList.remove('input_normal');
				blockPassword.classList.add('input_error');
			} else {
				document.getElementById(formElement[i].element.id).classList.remove('input_normal');
				document.getElementById(formElement[i].element.id).classList.add('input_error');
			}
			flagValidate = false;
			return false;
		} else {
			if (i === 8 && formElement[i].element === false) {
				error.innerHTML = '';
				error.innerHTML = formElement[i].error.toString();
				errorBlock.style.visibility = 'visible';
				flagValidate = false;
				return false;
			}
		}
	}
	if (flagValidate) {
		if (validateEmail(inputEmail.value)) {
			error.innerHTML = '';
			errorBlock.style.visibility = 'hidden';
			if (flagTelephone) {
				error.innerHTML = '';
				errorBlock.style.visibility = 'hidden';
				return true
			} else {
				error.innerHTML = '';
				error.innerHTML = 'Введён некорректный номер телефона'
				errorBlock.style.visibility = 'visible';
				inputTelephone.classList.remove('input_normal');
				inputTelephone.classList.add('input_error');
				flagValidate = false;
				return false;
			}
		} else {
			error.innerHTML = '';
			error.innerHTML = 'Введён некорректный email'
			errorBlock.style.visibility = 'visible';
			inputEmail.classList.remove('input_normal');
			inputEmail.classList.add('input_error');
			flagValidate = false;
			return false;
		}
	}
}