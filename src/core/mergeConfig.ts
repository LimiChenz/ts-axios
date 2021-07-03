import { isPlainObject } from '../helpers/util'
import { AxiosRequestConfig } from '../types'
import { deepMerge } from '../helpers/util'

const strats = Object.create(null)

function defalutStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromValue2Strat(value1: any, value2: any): any {
  if (typeof value2 !== 'undefined') {
    return value2
  }
}

function deepMergeStrat(value1: any, value2: any): any {
  if (isPlainObject(value2)) {
    return deepMerge(value1, value2)
  } else if (typeof value2 !== 'undefined') {
    return value2
  } else if (isPlainObject(value1)) {
    return deepMerge(value1)
  } else {
    return value1
  }
}

const stratKeysFromValue2 = ['url', 'params', 'data']

stratKeysFromValue2.forEach(key => {
  strats[key] = fromValue2Strat
})

const stratKeysDeepMerge = ['headers', 'auth']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defalutStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
