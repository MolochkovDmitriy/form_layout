'use strict'

const backBtnLink = document.getElementById('back-btn');

const form = document.getElementById('form');
const btnAccept = document.getElementById('accept-btn');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const inputFirstName = document.getElementById('first-name');
const inputLastName = document.getElementById('last-name');
const inputMassMedia = document.getElementById('mass-media');
const inputPosition = document.getElementById('position');
const checkboxVerification = document.getElementById('verification');
const inputSite = document.getElementById('site');
const inputCity = document.getElementById('city');
const inputTelephone = document.getElementById('telephone');
const inputCode = document.getElementById('code');
const checkboxAgreement = document.getElementById('agreement');
const errorBlock = document.getElementById('error-block');
const error = document.getElementById('error-text');


backBtnLink.addEventListener('click', function () {
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
  if (!(btnAccept.classList.contains('disabled'))) {
    btnAccept.classList.add('disabled');
    inputTelephone.setAttribute('readonly', 1);
  }
});


inputTelephone.oninput = function () {
  if (validatePhone(inputTelephone.value)) {
    btnAccept.classList.remove('disabled')
  } else {
    btnAccept.classList.add('disabled');
  }
}

form.onsubmit = function() {
  let formElement = [
    { element: inputEmail.value, error: 'Введите e-mail' },
    { element: inputPassword.value, error: 'Введите пароль' },
    { element: inputFirstName.value, error: 'Введите имя' },
    { element: inputLastName.value, error: 'Введите фамилию' },
    { element: inputMassMedia.value, error: 'Выберите название Вашего СМИ' },
    { element: inputPosition.value, error: 'Введите Вашу должность' },
    { element: checkboxVerification.checked, error: 'Не проставлена галочка "Верифицировать меня"' },
    { element: inputSite.value, error: 'Введите сайт СМИ' },
    { element: inputCity.value, error: 'Выберите город' },
    { element: inputTelephone.value, error: 'Введите телефон' },
    { element: inputCode.value, error: 'Введите код из СМС' },
    { element: checkboxAgreement.checked, error: 'Не проставлена галочка "Пользовательского соглашения"' },
  ]
  let flagValidate = true;
  for (let i = 0; i < formElement.length; i++) {
    if (formElement[i].element === '') {
      error.innerHTML = '';
      error.innerHTML = formElement[i].error.toString();
      errorBlock.style.display = 'block';
      flagValidate = false;
      return false;
    } else {
      if ((i === 4 || i === 8) && (formElement[i].element === 'Название вашего СМИ' || formElement[i].element === 'Город')) {
        error.innerHTML = '';
        error.innerHTML = formElement[i].error.toString();
        errorBlock.style.display = 'block';
        flagValidate = false;
        return false;
      } else {
        if ((i === 6 || i === 11) && (formElement[i].element === false || formElement[i].element === false)) {
          error.innerHTML = '';
          error.innerHTML = formElement[i].error.toString();
          errorBlock.style.display = 'block';
          flagValidate = false;
          return false;
        }
      }
    }
  }
  if (flagValidate) {
    if (validateEmail(inputEmail.value)) {
      error.innerHTML = '';
      errorBlock.style.display = 'none';
      return true;
    } else {
      error.innerHTML = '';
      error.innerHTML = 'Введён некорректный e-mail'
      errorBlock.style.display = 'block';
      flagValidate = false;
      return false;
    }
  }
}

