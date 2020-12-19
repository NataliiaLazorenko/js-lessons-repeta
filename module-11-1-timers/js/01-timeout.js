/*
 * Метод setTimeout()
 */

// setTimeout(() => {
//   console.log('Лог при виклику callback-функції через 3 секунди');
// }, 3000);

const log = () => {
  console.log('Лог при виклику callback-функції через 3 секунди');
};

// setTimeout(log, 3000);
//==================================================================

/*
 * Асинхронність коду
 */

// console.log('До виклику setTimeout');

// setTimeout(log, 0);

// console.log('Після виклику setTimeout');
//==================================================================

/*
 * Очистка таймаута з clearTimeout()
 */

const logger = time => {
  console.log(`Лог через ${time}ms, тому що не відмінили таймаут`);
};

const timerId = setTimeout(logger, 2000, 2000);

const shouldCancelTimer = Math.random() > 0.3;

console.log(shouldCancelTimer);

if (shouldCancelTimer) {
  clearTimeout(timerId);
}
