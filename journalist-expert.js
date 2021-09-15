'use strict'

const expertLink = document.getElementById('expert');
const journalistLink = document.getElementById('journalist');


expertLink.addEventListener('click', function () {
    window.location.href = "expert.html";
});

journalistLink.addEventListener('click', function () {
    window.location.href = "journalist.html";
});


