// const focus = document.getElementById('box1');
// let btn = document.querySelector('.btn');
// btn.addEventListener('click', translate);
// console.dir(focus);

function translate () {
    // this.focus = focus
    // focus.style = 'background: green'
    document.querySelector('.yellow').classList.toggle('translate');
    document.querySelector('.blue').classList.toggle('translate');
    document.querySelector('.instruct').classList.add('hidden');

    translateR()
}

function translateR () {
    // this.focus = focus
    // focus.style = 'background: green'
    document.querySelector('.green').classList.toggle('translateR');
    document.querySelector('.orange').classList.toggle('translateR');
}
    // document.querySelector('.o-box').addEventListener('click', function () {
    // document.querySelector('.o-box').classList.toggle('o-grow');
    // document.querySelector('.g-box').classList.toggle('hidden');
// });
