import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const myInput = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('[data-start]');
const dayRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

startBtnRef.setAttribute('disabled', true);

let timerId = null;

const fp = flatpickr(myInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] - new Date() < 0) {
      // alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtnRef.removeAttribute('disabled');
      startBtnRef.addEventListener('click', () => {
        countDoun();
        startBtnRef.setAttribute('disabled', true);
      });
    }
  },
});

function countDoun() {
  timerId = setInterval(() => {
    const difference = fp.selectedDates[0] - new Date();

    if (difference >= 0) {
      refreshTimer(convertMs(difference));
    } else {
      clearInterval(timerId);
      startBtnRef.removeAttribute('disabled');
    }
  }, 1000);
}

function refreshTimer({ days, hours, minutes, seconds }) {
  dayRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
