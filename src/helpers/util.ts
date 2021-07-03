const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return typeof val === 'object' && toString.call(val) === '[object Object]'
}

export function isPlainObject(val: any): val is object {
  return toString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const value = obj[key]
        if (isPlainObject(value)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], value)
          } else {
            result[key] = deepMerge({}, value)
          }
        } else {
          result[key] = value
        }
      })
    }
  })

  return result
}
