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
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  );
}

function onResolve({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
function onReject({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
