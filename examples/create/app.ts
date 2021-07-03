import axios from '../../src/index'


const instance = axios.create({
    
})

instance({
    url: '/config/post',
    method: 'post',
    data: {
        a: 1
    }
}).then((res) => {
    console.log(res.data)
})