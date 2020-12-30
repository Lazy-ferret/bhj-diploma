/**`
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */

class User {
  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */

  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */

  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */

  static current() {
    if (localStorage.getItem('user') !== 'undefined') {
      return JSON.parse(localStorage.getItem('user'));
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */

  static fetch(data, callback = f => f) {
    return createRequest({
      data: data,
      method: 'GET',
      responseType: 'json',
      url: this.URL + '/current'
    },
      (err, response) => {
        if (response && User.current()) {
          User.setCurrent(response.user);
        } else {
          User.unsetCurrent();
        }
        callback(err, response)
      }
    );
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */

  static login(data, callback = f => f) {
    return createRequest({
      data: data,
      method: 'POST',
      responseType: 'json',
      url: this.URL + '/login',
    },
      (err, response) => {
        if (response) {
          User.setCurrent(response.user);
        }
        callback(err, response)
      }
    );
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */

  static register(data, callback = f => f) {
    return createRequest({
      data: data,
      method: 'POST',
      responseType: 'json',
      url: this.URL + '/register',
    },
      (err, response) => {
        if (response) {
          User.setCurrent(response.user);
        }
        callback(err, response);
      }
    );
  }


  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */

  static logout(data, callback = f => f) {
    return createRequest({
      data: data,
      method: 'POST',
      responseType: 'json',
      url: this.URL + '/logout'
    },
      (err, response) => {
        if (response) {
          User.unsetCurrent();
        }
        callback(err, response)
      }
    );
  }
}

