const toString = Object.prototype.toString;

export function isDate(val:any): val is Date{
    return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object{
    return typeof val === 'object' && toString.call(val) === '[object Object]'
}

export function isPlainObject(val:any): val is object {
    return toString.call(val) === '[object Object]'
}