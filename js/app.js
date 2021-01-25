// DOM elements
const form = document.querySelector('form');
const hoursLabel = document.querySelector('.hours');
const minutesLabel = document.querySelector('.minutes');
const secondsLabel = document.querySelector('.seconds');
const btnStop = document.querySelector('.btn-stop');
const btnPause = document.querySelector('.btn-pause');

// Enums
const SECONDS_IN_AN_HOUR = 3600;
const SECONDS_IN_A_MINUTE = 60;
const SECOND = 1000;

let intervalId = null;
let totalSeconds = 0;

/**
 * Return a 2-digit number.
 *
 * @param {Number} number
 */
function formatTwoDigits(number) {
  return number < 10 ? `0${number}` : number;
}

/**
 * Transform seconds to hours, minutes and seconds.
 *
 * @param {Number} totalSeconds - The total of seconds.
 */
function formatSeconds(totalSeconds) {
  const hours = parseInt(totalSeconds / SECONDS_IN_AN_HOUR);
  const totalSecondsMinusHours = totalSeconds % SECONDS_IN_AN_HOUR;
  const minutes = parseInt(totalSecondsMinusHours / SECONDS_IN_A_MINUTE);
  const seconds = parseInt(totalSecondsMinusHours % SECONDS_IN_A_MINUTE);

  hoursLabel.textContent = formatTwoDigits(hours);
  minutesLabel.textContent = formatTwoDigits(minutes);
  secondsLabel.textContent = formatTwoDigits(seconds);
}

/**
 * Transform hours, minutes and seconds to seconds.
 */
function getSeconds() {
  const hours = Number(form.hours.value);
  const minutes = Number(form.minutes.value);
  const seconds = Number(form.seconds.value);

  if (!hours && !minutes && !seconds) return 0;

  const hoursInSeconds = hours * SECONDS_IN_AN_HOUR;
  const minutesInSeconds = minutes * SECONDS_IN_A_MINUTE;

  return hoursInSeconds + minutesInSeconds + seconds;
}

/**
 * Initialize timer with the values provided by user.
 *
 * @param {SubmitEvent} event
 */
function startTimer(event) {
  event.preventDefault();
  totalSeconds = getSeconds();

  if (!totalSeconds) {
    alert('You need to set at least 1 second.');
    return;
  }

  formatSeconds(totalSeconds);
  clearIntervalId();
  startInterval();
}

function stopTimer() {
  clearIntervalId();
  totalSeconds = 0;
  formatSeconds(totalSeconds);
}

function pauseTimer() {
  if (intervalId) {
    clearIntervalId();
    btnPause.textContent = 'Continue';
  } else {
    btnPause.textContent = 'Pause';
    if (totalSeconds) startInterval();
  }
}

function clearIntervalId() {
  clearInterval(intervalId);
  intervalId = null;
}

function startInterval() {
  intervalId = setInterval(() => {
    totalSeconds--;
    formatSeconds(totalSeconds);
    if (!totalSeconds) stopTimer();
  }, SECOND);
}

form.addEventListener('submit', startTimer);
btnStop.addEventListener('click', stopTimer);
btnPause.addEventListener('click', pauseTimer);
