import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
const btnRef = document.querySelector('button');

formRef.addEventListener('submit', onSubmitClick);

function onSubmitClick(event) {
  console.dir(event.currentTarget);
  event.preventDefault();
  const amount = Number(event.currentTarget.elements.amount.value);
  console.log('amount', amount);
  let delay = Number(event.currentTarget.elements.delay.value);
  const step = Number(event.currentTarget.elements.step.value);
  for (let i = 1; i <= amount; i += 1) {
    console.log('i', i);
    console.log('delay', delay);

    createPromise(i, delay).then(onResolve).catch(onReject);

    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (shouldResolve) {
        resolve`✅ Fulfilled promise ${position} in ${delay}ms`;
      } else {
        reject`❌ Rejected promise ${position} in ${delay}ms`;
      }
    }, delay)
  );
}

function onResolve(res) {
  Notiflix.Notify.success('Please choose a date in the future');
  console.log(res);
}
function onReject(er) {
  Notiflix.Notify.failure(er);
  console.log(er);
}
