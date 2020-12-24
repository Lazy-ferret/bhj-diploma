/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarBtn = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar-mini');
    sidebarBtn.addEventListener('click', (event) => {
      event.preventDefault();
      sidebar.classList.toggle('sidebar-open');
      sidebar.classList.toggle('sidebar-collapse');

    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    let loginBtn = document.querySelector('.menu-item_login a');
    let registerBtn = document.querySelector('.menu-item_register a');
    let logoutBtn = document.querySelector('.menu-item_logout a');

    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      App.getModal('login').open();
    });

    registerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      App.getModal('register').open();
    });

    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      User.logout({}, (err, response) => {
        if (response) {
          App.setState('init');
        }
      })
    })
  }
}
