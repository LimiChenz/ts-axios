import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types'
import { parseHeaders } from './helpers/headers'
import { createError } from './helpers/error'
import { request } from 'http'

enum statusText {
  '请求未初始化',
  '服务器连接已建立',
  '请求已接收',
  '请求处理中',
  '请求已完成,且响应已就绪'
}

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data,
      params,
      method = 'get',
      url,
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials
    } = config
    const xhr = new XMLHttpRequest()

    if (responseType) {
      xhr.responseType = responseType
    }
    if (timeout) {
      xhr.timeout = timeout
    }

    xhr.open(method.toUpperCase(), url!, true)

    xhr.onreadystatechange = function handleLoad() {
      if (xhr.readyState !== 4) {
        return
      }

      // 请求未初始化
      if (xhr.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(xhr.getAllResponseHeaders())
      const responseData = responseType && responseType !== 'text' ? xhr.response : xhr.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: responseHeaders,
        config,
        request: xhr
      }
      handleResponse(response)
    }

    /**
     * 处理状态码
     */
    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status <= 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }

    xhr.onerror = function headleError() {
      // 网络错误的情况
      reject(createError('Network Error', config, null, request))
    }

    xhr.ontimeout = function hendleTimeout() {
      // 请求超时
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    // Object.keys(headers).forEach(name => {
    //   if (data === null && name.toUpperCase() === 'CONTENT-TYPE') {
    //     delete headers[name]
    //   } else {
    //     xhr.setRequestHeader(name, headers[name])
    //   }
    // })

    xhr.send(data)

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        xhr.abort()
        reject(reason)
      })
    }

    if (withCredentials) {
      xhr.withCredentials = true
    }
  })
}
