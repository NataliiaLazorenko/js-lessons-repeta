/*
 * Пишемо нотифікашку:
 * - Показуємо і приховуємо додаючи/видаляючи клас
 * - Приховуємо через визначений час
 * - Приховуємо при кліку
 * - Не забуваємо чистити таймер
 */

// 1. Вибираємо посилання на нотифікашту
const refs = {
  notification: document.querySelector('.js-notification'),
};

// 10. Створюємо змінну, в якій будемо зберігати id таймаута (щоб можна було його очистити)
let timeoutId = null; // нуль це число, певне значення, а null - це нічого. Якщо у нас нічого немає, сетимо туди null

// 7. Додаємо слухача події 'click' по нотифікашці, передаємо notificationClickHandler
refs.notification.addEventListener('click', notificationClickHandler);

showNotification();

// 8. Створюємо функцію, яка буде виконуватися при кліку на нотифікашку
function notificationClickHandler() {
  // 12. Очищуємо таймаут при кліку (не потрібно чекати 3 сек., відразу ховаємо нотифікашку)
  clearTimeout(timeoutId);

  // 9. Щоб нотифікашка ховалася при кліку, всередині функції викликаємо hideNotification
  hideNotification();
}

// 2. Створюємо функцію "показати нотифікашку"
function showNotification() {
  // 3. Додаємо на нотифікашку клас is-visible при виклику функції showNotification
  refs.notification.classList.add('is-visible');

  // 6. Прямо всередині showNotification реєструємо відкладений виклик hideNotification, щоб приховати потифікашку через 3 сек.
  // 11. Записуємо ідентифікатор таймаута у змінну timeoutId
  timeoutId = setTimeout(() => {
    console.log(
      'Зараз буду викликати hideNotification в колбеку від setTimeout',
    );
    hideNotification();
  }, 3000);
}

// 4. Створюємо функцію "сховати нотифікашку"
function hideNotification() {
  // 5. Забираємо з нотифікашки клас is-visible
  refs.notification.classList.remove('is-visible');
}
