import { isPlainObject } from './util'

function ormalizeHeaderName(headers: any, normalizeName: string): void{
    if (!headers) {
        return
    }
    Object.keys(headers).forEach(name =>{
        if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
            headers[normalizeName] = headers[name]
            delete headers[name]
        }
    })
}

export function processHeaders(headers: any, data:any):any{
    if (isPlainObject(data)) {
        if (headers && !headers['Content-type']) {
            headers['Content-type'] = 'application/json;charset=utf-8'
        }
    }

    return headers
}