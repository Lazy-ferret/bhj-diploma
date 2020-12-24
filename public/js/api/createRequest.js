/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}, callback) => {

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.responseType = options.responseType;

    if (options.method === 'GET') {
        url = options.url + '?';
        for (let key in options.data) {
            url += key + '=' + options.data[key] + '&';
        }
        url = url.slice(0, -1);
        try {
            xhr.open(options.method, url);
            xhr.send()
        } catch (e) {
            options.callback(e);
        }
    } else {
        let formData = new FormData;
        url = options.url;
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
        try {
            xhr.open(options.method, url);
            xhr.send(formData);
        } catch (e) {
            options.callback(e);
        }
    }


    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(null, xhr.response);
        } else {
            return callback(xhr.response);
        }
    })

    return xhr;
};
