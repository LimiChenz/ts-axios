import { AxiosRequestConfig} from './types'

export default function xhr(config: AxiosRequestConfig){
    const { data, params, method = 'get',url } = config;
    const xhr = new XMLHttpRequest();

    xhr.open(method.toUpperCase(), url, true);
    xhr.send(data);
}