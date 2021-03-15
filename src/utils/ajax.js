import axios from 'axios'
import nprogress from 'nprogress'

// 启用进度条
axios.interceptors.request.use(
  config => {
    nprogress.start()
    return config
  },
  err => Promise.reject(err)
)
axios.interceptors.response.use(
  response => {
    nprogress.done()
    return response
  },
  err => Promise.reject(err)
)

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}

export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}
