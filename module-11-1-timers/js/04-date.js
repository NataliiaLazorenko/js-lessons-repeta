const date = new Date(5000000); // 5000000 ms з 01.01.1970 р.
console.log(date); // Thu Jan 01 1970 04:23:20 GMT+0300 (за східноєвропейським стандартним часом)

// Показує скільки мілісекунд пройшло з 01.01.1970 р., дорівнює тій к-сті мілісекуд, яку передали у new Date
console.log(date.getTime()); // 5000000

// Поточна кількість мілісекунд, які пройшли з 01.01.1970 р. на момент виконання скрипта
const currentDate = Date.now();

console.log(currentDate); // 1608314731611

// Рахуємо delta
const delta = currentDate - date.getTime();

console.log(delta); // 1608309731611

setInterval(() => {
  console.log(new Date());
}, 1000);
