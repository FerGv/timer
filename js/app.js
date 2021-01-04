// DOM elements
const form = document.querySelector('form');
const hoursLabel = document.querySelector('.hours');
const minutesLabel = document.querySelector('.minutes');
const secondsLabel = document.querySelector('.seconds');

// Enums
const SECONDS_IN_AN_HOUR = 3600;
const SECONDS_IN_A_MINUTE = 60;
const SECOND = 1000;

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
  let totalSeconds = getSeconds();
  formatSeconds(totalSeconds);

  const intervalId = setInterval(() => {
    totalSeconds--;
    formatSeconds(totalSeconds);
    if (!totalSeconds) clearInterval(intervalId);
  }, SECOND);
}

form.addEventListener('submit', startTimer);
