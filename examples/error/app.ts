

import axios from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1'
}).then((res) => {
  console.log('RES1', res)
}).catch((e) => {
  console.log('RES1', e)
})

axios({
  method: 'get',
  url: '/error/get'
}).then((res) => {
  console.log('RES2', res)
}).catch((e) => {
  console.log('RES2',e)
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then((res) => {
    console.log('RES3',res)
  }).catch((e) => {
    console.log('RES3',e)
  })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log('RES4',res)
}).catch((e) => {
  console.log('RES4',e.message)
})