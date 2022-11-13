const startBtnRef = document.querySelector('[data-start]');
const stopBtntRef = document.querySelector('[data-stop]');

console.log(startBtnRef);
console.log(stopBtntRef);

startBtnRef.addEventListener('click', onStartBtnClick);
stopBtntRef.addEventListener('click', onStopBtnClick);

let timer;

stopBtntRef.removeAttribute('disabled');

function onStartBtnClick() {
  timer = setInterval(changebodyColor, 1000);
  startBtnRef.setAttribute('disabled', true);
  stopBtntRef.removeAttribute('disabled');
}

function onStopBtnClick() {
  clearInterval(timer);
  startBtnRef.removeAttribute('disabled');
  stopBtntRef.setAttribute('disabled', true);
}

function changebodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
console.log(document.body.style);
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
