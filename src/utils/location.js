import { store } from '@/store'

// 加载百度地图
export const loadBMap = () => {
  return new Promise((resolve, reject) => {
    // 加载百度地图
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `http://api.map.baidu.com/api?type=webgl&v=1.0&ak=${store.ak}&callback=init`
    document.head.append(script)
    // 等页面加载完成后返回数据
    window.onload = () => {
      // eslint-disable-next-line
      resolve(BMapGL)
    }
  })
}

// 加载百度地图
export const loadBDrawMap = () => {
  return new Promise((resolve, reject) => {
    // 加载百度绘图工具
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'http://mapopen.cdn.bcebos.com/github/BMapGLLib/DrawingManager/src/DrawingManager.min.js'
    document.body.append(script)
    // 加载百度绘图样式
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'http://mapopen.cdn.bcebos.com/github/BMapGLLib/DrawingManager/src/DrawingManager.min.css'
    document.body.appendChild(link)
    resolve('success')
  })
}

// 获取当前位置
export const getLocation = () => {
  return new Promise((resolve, reject) => {
    // window.navigator.geolocation.getCurrentPosition(
    //   position => {
    //     alert(position.coords.longitude)
    //     resolve({
    //       longitude: position.coords.longitude,
    //       latitude: position.coords.latitude
    //     })
    //   },
    //   err => reject(err)
    // )
    // 百度地图的定位API
    var geolocation = new BMapGL.Geolocation()
    // geolocation.enableSDKLocation()
    geolocation.getCurrentPosition(
      function(position) {
        resolve(position)
      },
      {
        // enableHighAccuracy: true, // 获取最佳效果
        // SDKLocation: true // 是否开启SDK辅助定位
      }
    )
  })
}
