// /**
//  * Класс CreateTransactionForm управляет формой
//  * создания новой транзакции
//  * Наследуется от AsyncForm
//  * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), (err, response) => {
      if (response) {
        let accountsSelect = this.element.querySelector('select');
        accountsSelect.innerHTML = '';
        response.data.forEach((e) => {
          accountsSelect.innerHTML += `<option value="${e.id}">${e.name}</option>`;
        })
      } else {
        console.log(err);
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(options) {
    Transaction.create(options, (err, response) => {
      if (response) {
        let modal = this.element.closest('.modal');
        if (modal.getAttribute('id') === 'modal-new-income') {
          App.getModal('newIncome').close();
        } else if (modal.getAttribute('id') === 'modal-new-expense') {
          App.getModal('newExpense').close();
        } else {
          console.log(err);
        }
        App.update();
        this.element.reset();
      }
    })
  }
}
