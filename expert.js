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

form.onsubmit = function () {
    let formElement = [
        { element: inputEmail.value, error: 'Введите e-mail' },
        { element: inputPassword.value, error: 'Введите пароль' },
        { element: inputFirstName.value, error: 'Введите имя' },
        { element: inputLastName.value, error: 'Введите фамилию' },
        { element: inputCompany.value, error: 'Введите название Вашей компании' },
        { element: inputPosition.value, error: 'Введите Вашу должность' },
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
            if (i === 8 && formElement[i].element === false) {
                error.innerHTML = '';
                error.innerHTML = formElement[i].error.toString();
                errorBlock.style.display = 'block';
                flagValidate = false;
                return false;
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