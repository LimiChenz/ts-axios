import { isDate, isObject } from './util'

function encode(val: string): string {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/ig, ':')
        .replace(/%24/g, '$')
        .replace(/%2c/ig, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/ig, '[')
        .replace(/%5D/ig, ']')
}

export function buildURL(url: string, params?: any): string {
    if (!params) {
        return url
    }
    const parts: string[] = []


    return url
}