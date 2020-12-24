/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = '';
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback = f => f) {
    return createRequest({
      data: data,
      method: 'GET',
      responseType: 'json',
      url: this.URL
    },
      (err, response) => {
        callback(err, response)
      }
    );
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback = f => f) {
    let createData = Object.assign({ _method: 'PUT' }, data);
    return createRequest({
      data: createData,
      method: 'POST',
      responseType: 'json',
      url: this.URL
    },
      (err, response) => {
        callback(err, response)
      }
    );
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get(id = '', data, callback = f => f) {
    return createRequest({
      data: data,
      method: 'GET',
      responseType: 'json',
      url: this.URL,
      id
    },
      (err, response) => {
        callback(err, response)
      }
    );
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(id = '', data, callback = f => f) {
    let removeData = Object.assign({ _method: 'DELETE', id }, data);
    return createRequest({
      data: removeData,
      method: 'POST',
      responseType: 'json',
      url: this.URL,

    },
      (err, response) => {
        callback(err, response)
      }
    );
  }
}

