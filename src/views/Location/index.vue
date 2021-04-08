<template>
  <Container :isPadding="true">
    <template #name>Location</template>
    <template #aside>
      <!-- 显示经纬度信息 -->
      <div class="location" v-if="location">
        <div class="item">
          <div>当前位置:</div>
          <div>
            {{ location.address.province + location.address.city + location.address.district }}
          </div>
        </div>
        <div class="divider"></div>
        <div class="item" v-if="ip">
          <div>ip:</div>
          <div>{{ ip.cip }}</div>
        </div>
        <div class="item">
          <div>经度:</div>
          <div>{{ location.longitude }}</div>
        </div>
        <div class="item">
          <div>纬度:</div>
          <div>{{ location.latitude }}</div>
        </div>
        <div class="item">
          <div>计算:</div>
          <div>
            <el-button type="primary" size="small" style="width: 100%" @click="driving">驾驶线路规划</el-button>
          </div>
          <div class="show_driving">
            <div class="place" v-if="drivingArr.length">
              {{ drivingArr[0].formatted_address }}
            </div>
            <div class="divider_vertical" v-if="drivingArr.length"></div>
            <div class="place" v-if="drivingArr.length >= 2">
              {{ drivingArr[1].formatted_address }}
            </div>
            <div class="info" v-if="drivingArr.length >= 3">
              <div>时间: {{ drivingArr[2].duration }}</div>
              <div>距离: {{ drivingArr[2].distance }}</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div>导航:</div>
          <div>
            <el-autocomplete
              v-model="guideInfo.start"
              :fetch-suggestions="querySearch"
              placeholder="起始地(可无)"
              :trigger-on-focus="false"
              @select="handleSelectGuideStart"
              clearable
            />
            <div class="divider_vertical"></div>
            <el-autocomplete
              v-model="guideInfo.end"
              :fetch-suggestions="querySearch"
              placeholder="终点地"
              @select="handleSelectGuideEnd"
              :trigger-on-focus="false"
              clearable
            />
            <div class="divider_vertical" style="height: 0"></div>
            <el-select v-model="selectGuide" placeholder="导航类型">
              <el-option v-for="item in gudieOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <div class="divider_vertical" style="height: 0"></div>
            <el-button type="primary" size="small" style="width: 100%" @click="guide">开始导航</el-button>
            <div class="divider_vertical" style="height: 0"></div>
            <el-button type="primary" size="small" style="width: 100%" @click="clear">清除覆盖物</el-button>
          </div>
        </div>
      </div>
    </template>
    <template #main>
      <div id="bMap"></div>
      <div class="search" v-if="location">
        <el-autocomplete
          style="width: 300px"
          v-model="searchContent"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleSelect"
          @keydown.enter="searchALl"
          clearable
        >
          <template #prefix>
            <i class="el-input__icon el-icon-search"></i>
          </template>
        </el-autocomplete>
      </div>
    </template>
  </Container>
</template>

<script>
import { defineComponent, inject, onMounted, reactive, ref } from 'vue'
import Container from '@/components/Container'
import { loadBMap } from '@/utils/location'
import car from '@/assets/img/mapIcon/car.svg'
import { getSearchByQuery, getPlaceByLocation, getIp } from '@/utils/api'
export default defineComponent({
  name: 'Location',
  components: { Container },
  setup() {
    const Store = inject('Store')
    // 百度地图实例
    let BMapGL = null
    // 存放地图实例
    let map = null
    // 经纬度信息
    const location = ref()
    // ip信息
    const ip = ref()
    // 搜索内容
    const searchContent = ref()
    // 存放关键字索引数组
    let searchArr = []
    // 存放驾车两点的位置
    const drivingArr = ref([])
    // 导航信息
    const guideInfo = reactive({
      start: '', // 开始位置
      end: '', // 结束位置
      startData: {}, // 开始位置的地理信息
      endData: {} // 结束位置的地理信息
    })
    // 导航类型选择
    const gudieOptions = [
      {
        value: '1',
        label: '驾车'
      },
      {
        value: '2',
        label: '公交'
      },
      {
        value: '3',
        label: '步行'
      }
    ]
    // 选择的导航类型
    const selectGuide = ref('1')
    /**************************************************
     * methods
     **************************************************/
    // 地图控件初始化
    const _initBMapControl = (map, point) => {
      const scaleCtrl = new BMapGL.ScaleControl() // 添加比例尺控件
      map.addControl(scaleCtrl)
      const zoomCtrl = new BMapGL.ZoomControl() // 添加比例尺控件
      map.addControl(zoomCtrl)
      const navi3DCtrl = new BMapGL.NavigationControl3D() // 添加3D控件
      map.addControl(navi3DCtrl)
      // 创建城市选择控件
      // const cityControl = new BMapGL.CityListControl({
      //   // 控件的停靠位置（可选，默认左上角）
      //   anchor: 0,
      //   // 控件基于停靠位置的偏移量（可选）
      //   offset: new BMapGL.Size(10, 5)
      // })
      // 将控件添加到地图上
      // map.addControl(cityControl)
      // 创建定位控件
      const locationControl = new BMapGL.LocationControl({
        anchor: 2, // 控件的停靠位置（可选，默认左上角）
        offset: new BMapGL.Size(10, 40) // 控件基于停靠位置的偏移量（可选）
      })
      // 将控件添加到地图上
      map.addControl(locationControl)
      // 点标记(显示当前位置)
      const marker = new BMapGL.Marker(point, {
        // enableDragging: true // 可拖拽,
        icon: new BMapGL.Icon(car, new BMapGL.Size(35, 35)) // 自定义标记图标
      })
      marker.disableMassClear() // 禁止覆盖物在map.clearOverlays方法中被清除
      map.addOverlay(marker)
      // 信息窗口
      const infoWindow = new BMapGL.InfoWindow('地址：当前位置', {
        width: 200,
        height: 100,
        title: '位置'
      })
      marker.addEventListener('click', function() {
        map.openInfoWindow(infoWindow, point) // 开启信息窗口
      })

      // 地图显示后定位一次
      // locationControl.startLocation()
    }
    // 初始化Map
    const _initBMap = () => {
      const map = new BMapGL.Map('bMap', {
        minZoom: 5, // 最小级别
        maxZoom: 20 // 最大级别
      }) // 创建Map实例
      const point = new BMapGL.Point(location.value.longitude, location.value.latitude) // 创建点坐标
      map.centerAndZoom(point, 18) // 初始化地图,设置中心点坐标和地图级别
      map.setTilt(45) // 设置地图倾斜角度
      map.enableScrollWheelZoom(true) // 启用滚轮放大缩小
      // 地图加载完成事件
      map.addEventListener('tilesloaded', function() {
        // 添加路况图层
        // map.setTrafficOn()
        _initBMapControl(map, point)
      })
      return map
    }
    // 获取当前位置
    const _getLocation = () => {
      return new Promise((resolve, reject) => {
        var geolocation = new BMapGL.Geolocation()
        geolocation.getCurrentPosition(
          function(position) {
            console.log(this.getStatus())
            resolve(position)
          },
          {
            enableHighAccuracy: true // 获取最佳效果
          }
        )
      })
    }
    // 搜索关键字索引
    const querySearch = async (queryString, cb) => {
      if (queryString !== '') {
        searchArr = []
        getSearchByQuery(queryString, location.value.address.city).then(res => {
          for (const item of res.results) {
            item.value = item.name
            searchArr.push(item)
          }
          // 调用 callback 返回建议列表的数据
          cb(searchArr)
        })
      }
    }
    // 搜索关键字选中
    const handleSelect = item => {
      // 清除地图上所有覆盖物
      map.clearOverlays()
      // 将地点进行标注
      const point = new BMapGL.Point(item.location.lng, item.location.lat)
      map.addOverlay(new BMapGL.Marker(point))
      // 将地图以标注点为中心显示
      map.centerAndZoom(point, 17)
    }
    // 导航关键字选中
    const handleSelectGuideStart = item => {
      guideInfo.startData = item
    }
    // 导航关键字选中
    const handleSelectGuideEnd = item => {
      guideInfo.endData = item
    }
    // 查询所有索引
    const searchALl = () => {
      // 清除地图上所有覆盖物
      map.clearOverlays()
      const local = new BMapGL.LocalSearch(map, {
        renderOptions: { map: map }
      })
      local.search(searchContent.value)
    }
    // 驾车路线规划
    const driving = () => {
      map.clearOverlays()
      drivingArr.value = []
      map.addEventListener('click', async function(e) {
        const res = await getPlaceByLocation(e.latlng.lat, e.latlng.lng)
        drivingArr.value.push(res.result)
        // 判断如果点完两个点后取消点击事件
        if (drivingArr.value.length === 2) {
          map.removeEventListener('click')
          // 驾车路线轨迹
          var transit = new BMapGL.DrivingRoute(map, {
            renderOptions: { map: map },
            onSearchComplete: results => {
              const plan = results.getPlan(0)
              drivingArr.value.push({
                duration: plan.getDuration(true),
                distance: plan.getDistance(true)
              })
            }
          })
          // 搜寻路线
          transit.search(
            new BMapGL.Point(drivingArr.value[0].location.lng, drivingArr.value[0].location.lat),
            new BMapGL.Point(drivingArr.value[1].location.lng, drivingArr.value[1].location.lat)
          )
        }
      })
    }
    // 导航
    const guide = () => {
      // 判断是否输入
      if (guideInfo.end === '') {
        alert('请输入终点地')
        return
      }
      if (selectGuide.value === '') {
        alert('请输入导航类型')
        return
      }
      // 清除障碍物
      map.clearOverlays()
      const { startData, endData } = guideInfo
      // 判断导航类型
      const guideType =
        selectGuide.value === '1' ? 'DrivingRoute' : selectGuide.value === '2' ? 'TransitRoute' : 'WalkingRoute'
      // 判断起始点是否输入
      const pointStart = guideInfo.start
        ? new BMapGL.Point(startData.location.lng, startData.location.lat)
        : new BMapGL.Point(location.value.longitude, location.value.latitude)
      const pointEnd = new BMapGL.Point(endData.location.lng, endData.location.lat)
      var driving = new BMapGL[guideType](map, {
        renderOptions: {
          // 展现结果的地图实例
          map: map,
          // 检索结束后是否自动调整地图视野
          autoViewport: true
        },
        onSearchComplete: function(results) {
          if (driving.getStatus() !== 0) {
            alert('导航失败')
            return
          }
          const plan = results.getPlan(0)
          let output = ''
          output += '总时长：' + plan.getDuration(true) + '\n' // 获取时间
          output += '总路程：' + plan.getDistance(true) // 获取距离
          setTimeout(() => alert(output), 2000)
        }
      })
      driving.search(pointStart, pointEnd)
    }
    // 清除地图覆盖物
    const clear = () => {
      map.clearOverlays()
      // 重新回到定位点
      map.setCenter(new BMapGL.Point(location.value.longitude, location.value.latitude))
      map.setZoom(18) // 设置地图缩放级别
      map.setTilt(45) // 设置地图倾斜角度
    }

    onMounted(async () => {
      // 进度条加载
      // const loading = Store.ctx.$loading({
      //   lock: true,
      //   text: '加载地图中',
      //   spinner: 'el-icon-loading'
      // })
      Store.ctx.$nprogress.start()
      BMapGL = await loadBMap()
      // 把实例存入全局变量中
      Store.BMapGL = BMapGL
      // 获取经纬度
      location.value = await _getLocation()
      // 初始化地图
      map = await _initBMap()
      // 进度条结束
      // loading.close()
      Store.ctx.$nprogress.done()
      // 获取ip
      ip.value = await getIp()
    })

    return {
      location,
      searchContent,
      querySearch,
      handleSelect,
      searchALl,
      driving,
      drivingArr,
      guideInfo,
      handleSelectGuideEnd,
      handleSelectGuideStart,
      guide,
      clear,
      gudieOptions,
      selectGuide,
      ip
    }
  }
})
</script>

<style lang="stylus" scoped>
#bMap
  height 100%
  width 100%
.search
  position absolute
  left 20px
  top 20px
  z-index 99
.divider
  margin 18px 0
.location
  box-sizing border-box
  padding 20px
  font-size 16px
  .item
    margin-top 10px
    > div:nth-child(1)
      font-weight 700
    > div:nth-child(2)
      font-size 14px
      text-align center
      margin-top 5px
.show_driving
  position relative
  margin-top 10px
  .place
    text-align center
    font-size 12px
  .info
    font-size 12px
    position absolute
    left 10px
    top 24px
</style>
