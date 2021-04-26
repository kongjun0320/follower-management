import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:3333',
  timeout: 100000
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)
service.interceptors.response.use(
  (response) => {
    const res = response.data
    return res
  },
  (error) => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
