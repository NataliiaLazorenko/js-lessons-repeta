/*
 * Пишемо таймер
 */

// 1. Беремо посилання на кнопки та абзац, в якому буде відображатися таймер
const refs = {
  startBtn: document.querySelector('button[data-action-start]'),
  stopBtn: document.querySelector('button[data-action-stop]'),
  clockface: document.querySelector('.js-clockface'),
};

// 2. Створюємо об'єкт таймера
const timer = {
  // 17. Щоб зупинити інтервал, потрібно отримати його id. Створювати глобальну змінну досить дивно. Оскільки timer це об'єкт, додаємо властивість intervalId
  intervalId: null,
  // 22. Створюємо своєрідний прапорець, який буде фіксувати чи активний таймер. Потрібен, щоб не можна було запустити одночасно кілька таймерів
  isActive: false,

  // 3. Додаємо метод start - коли натискаємо на кнопку start, таймер має почати рахувати час
  start() {
    // 24. Якщо таймер вже запущено, виходимо із функції (можна було б відключити кнопку (зробити disabled), але тоді програмно таймер можна запустити)
    if (this.isActive) {
      return;
    }
    // 23. Вказуємо, що таймер активний (запущено)
    this.isActive = true;
    // 5. Потрібно кожної секунди відображати в інтерфейсі різницю між поточним часом і стартовим. Тому записуємо у змінну поточний час на момент запуску методу start (стартовий час)
    const startTime = Date.now();

    // 26. Таймер починає показувати час з 1-ї секунди (00:00:01). Передаємо у функцію updateClockface час 0, щоб таймер не чекав секунду, а стартував з 00:00:00
    updateClockface(0);

    // 4. Викликаємо setInterval, який реєструє відкладений виклик функції щосекунди
    // 18. У властивість intervalId записуємо id інтервалу
    this.intervalId = setInterval(() => {
      // 6. Всередині setInterval записуємо у змінну поточний час, коли зареєстрована функція буде викликатися
      const currentTime = Date.now();

      // 7. Рахуємо різницю між поточним часом і стартовим (всередині setInterval startTime не зміниться, він береться один раз при виклику методу start)
      const deltaTime = currentTime - startTime;

      // 10. На кожному інтервалі викликаємо функцію updateClockface і передаємо їй deltaTime
      updateClockface(deltaTime);
    }, 1000);
  },

  // 16. Додаємо метод stop
  stop() {
    // 19. Очищуємо інтервал
    clearInterval(this.intervalId);
    // 20. Сетимо intervalId назад в null (щоб все було красиво)
    this.intervalId = null;
    // 25. Вказуємо, що під час зупинки таймера він не активний (щоб можна було повторно запустити)
    this.isActive = false;
    // 21. Передаємо у функцію updateClockface час 0, щоб при зупинці таймера він обнулювався
    updateClockface(0);
  },
};

// 15. Додаємо слухачі події 'click' на кнопки
//     При кліку на копку "Запустити", викликаємо start; при кліку на "Зупинити" - stop
//     При передачі методу як callback в оброблювач події, обов'язково прив'язуємо контекст
refs.startBtn.addEventListener('click', timer.start.bind(timer));
refs.stopBtn.addEventListener('click', timer.stop.bind(timer));

// 8. Створюємо функцію, передаємо їй time - наші мілісекунди (deltaTime)
function updateClockface(time) {
  //   /*
  //    * Копіпаста зі стеку 💩
  //    */

  // 9. Копіюємо у функцію формули розрахунку годин, хвилин та секунд із наших мілісекунд (формули використовують залишок від ділення %)
  // 13. Для приведення часу до потрібного формату, обготраємо формули у виклик функції pad
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  // 14. Вставляємо час як текстовий контент всередину нашого абзацу
  refs.clockface.textContent = `${hours}:${mins}:${secs}`;
}

// 11. Створюємо функцію pad, яка буде приводити наш час до потрібного формату (отримуємо час у форматі 0:0:1, а хочемо 00:00:01)
function pad(value) {
  // 12. Приводимо число до рядка, використовуючи конструктор String. На результаті викликаємо padStart і вказуємо: якщо буде менше 2-х символів, "добити" до 2-х символів нулями зі старту
  return String(value).padStart(2, '0');
}
