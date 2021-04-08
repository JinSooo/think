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

/**
 * get请求
 * @param {string} url     请求api
 * @param {object | null} params  请求参数
 */
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}

/**
 * post请求
 * @param {string} url  请求api
 * @param {object} data 请求数据
 */
export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}
