import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
    const { data, params, method = 'get', url, headers } = config;
    const xhr = new XMLHttpRequest();

    xhr.open(method.toUpperCase(), url, true);

    Object.keys(headers).forEach(name => {
        if (data === null && name.toUpperCase() === 'CONTENT-TYPE') {
            delete headers[name]
        } else {
            xhr.setRequestHeader(name, headers[name])
        }
    })

    xhr.send(data);
}