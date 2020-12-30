/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    if (options.responseType) {
        xhr.responseType = options.responseType;
    };
    xhr.setRequestHeader = options.headers;
    let url, formData = {};

    if (options.method === 'GET' && options.id) {
        url = options.url + '/' + options.id;
    } else if (options.method === 'GET') {
        url = options.url + '?';
        for (let key in options.data) {
            url += key + '=' + options.data[key] + '&';
        }
        url = url.slice(0, -1);
    } else {
        formData = new FormData;
        url = options.url;
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
    }

    xhr.open(options.method, url);
    xhr.send(formData);

    xhr.onload = () => {
        if (xhr.response.success) {
            callback(null, xhr.response);
        }
        else {
            return callback(xhr.response);
        }
    }

    xhr.onerror = () => {
        alert('Ошибка сервера');
    }

    return xhr.response;
}
