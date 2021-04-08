import { get } from './ajax'
import { store } from '@/store'

// 获取热度榜数据
export const getHot = () => get('/hotList')

// 地点检索数据
export const getSearchByQuery = (query, city) =>
  get(`/bmap/place/v2/search?query=${query}&region=${city}&output=json&ak=${store.ak}`)

// 通过经纬度获取地址
export const getPlaceByLocation = (lat, lng) =>
  get(`/bmap/reverse_geocoding/v3/?ak=${store.ak}&output=json&coordtype=wgs84ll&location=${lat},${lng}`)

// 获取ip信息
export const getIp = () => {
  return new Promise((resolve, reject) => {
    // 加载百度地图
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'http://pv.sohu.com/cityjson'
    document.head.append(script)
    // 等页面加载完成后返回数据
    script.onload = () => {
      // eslint-disable-next-line
      resolve(returnCitySN)
    }
  })
}

export const getLocation = () => {
  if (navigator.geolocation) {
    alert(navigator.userAgent)
    navigator.geolocation.getCurrentPosition(
      function showPosition(position) {
        console.log(position)
        var lat = position.coords.latitude // 纬度
        var lag = position.coords.longitude // 经度
        alert('纬度:' + lat + ',经度:' + lag)
      },
      function showError(error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert('定位失败,用户拒绝请求地理定位')
            break
          case error.POSITION_UNAVAILABLE:
            alert('定位失败,位置信息是不可用')
            break
          case error.TIMEOUT:
            alert('定位失败,请求获取用户位置超时')
            break
          case error.UNKNOWN_ERROR:
            alert('定位失败,定位系统失效')
            break
        }
      }
    )
  } else {
    alert('浏览器不支持地理定位。')
  }
}
