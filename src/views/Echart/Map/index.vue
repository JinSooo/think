<template>
  <el-row :gutter="10">
    <el-col :span="18">
      <el-card>
        <template #header>
          <div class="card-header">
            <div class="header_content">中国地图</div>
          </div>
        </template>
        <el-select
          class="selectMap"
          v-model="selectMap"
          placeholder="请选择"
          @change="handleChange"
        >
          <el-option v-for="map in mapList" :key="map.value" :label="map.label" :value="map.value">
          </el-option>
        </el-select>
        <div ref="chinaMapRef" class="chartBig"></div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-row>
        <el-col :span="24">
          <el-card>
            <template #header>
              <div class="card-header">
                <div class="header_content">关键字</div>
              </div>
            </template>
            <div ref="chart1Ref" class="chartSmall"></div>
          </el-card>
        </el-col>
        <el-col :span="24" style="margin-top: 10px">
          <el-card>
            <template #header>
              <div class="card-header">
                <div class="header_content">关键字</div>
              </div>
            </template>
            <div ref="chart2Ref" class="chartSmall"></div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-row style="margin-top:10px">
    <el-col :span="24">
      <el-card>
        <template #header>
          <div class="card-header">
            <div class="header_content">tooltip & dataZoom</div>
          </div>
        </template>
        <div ref="chart3Ref" class="chartBig"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { defineComponent, inject, nextTick, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'Map',
  setup() {
    // 获取全局对象
    const Store = inject('Store')
    // 地图容器元素
    const chinaMapRef = ref()
    // 所有地图索引
    const mapList = ref([
      {
        label: '中国',
        value: 'china'
      },
      {
        label: '江苏',
        value: 'jiangsu'
      }
    ])
    // 当前选择的地图
    const selectMap = ref('china')
    // 地图内的数据
    const mapData = [
      { name: '北京', value: Math.round(Math.random() * 10000), selected: false },
      { name: '天津', value: Math.round(Math.random() * 10000), selected: false },
      { name: '上海', value: Math.round(Math.random() * 10000), selected: false },
      { name: '重庆', value: Math.round(Math.random() * 10000), selected: false },
      { name: '河北', value: Math.round(Math.random() * 10000), selected: false },
      { name: '河南', value: Math.round(Math.random() * 10000), selected: false },
      { name: '云南', value: Math.round(Math.random() * 10000), selected: false },
      { name: '辽宁', value: Math.round(Math.random() * 10000), selected: false },
      { name: '黑龙江', value: Math.round(Math.random() * 10000), selected: false },
      { name: '湖南', value: Math.round(Math.random() * 10000), selected: false },
      { name: '安徽', value: Math.round(Math.random() * 10000), selected: false },
      { name: '山东', value: Math.round(Math.random() * 10000), selected: false },
      { name: '新疆', value: Math.round(Math.random() * 10000), selected: false },
      { name: '江苏', value: Math.round(Math.random() * 10000), selected: false },
      { name: '浙江', value: Math.round(Math.random() * 10000), selected: false },
      { name: '江西', value: Math.round(Math.random() * 10000), selected: false },
      { name: '湖北', value: Math.round(Math.random() * 10000), selected: false },
      { name: '广西', value: Math.round(Math.random() * 10000), selected: false },
      { name: '甘肃', value: Math.round(Math.random() * 10000), selected: false },
      { name: '山西', value: Math.round(Math.random() * 10000), selected: false },
      { name: '内蒙古', value: Math.round(Math.random() * 10000), selected: false },
      { name: '陕西', value: Math.round(Math.random() * 10000), selected: false },
      { name: '吉林', value: Math.round(Math.random() * 10000), selected: false },
      { name: '福建', value: Math.round(Math.random() * 10000), selected: false },
      { name: '贵州', value: Math.round(Math.random() * 10000), selected: false },
      { name: '广东', value: Math.round(Math.random() * 10000), selected: false },
      { name: '青海', value: Math.round(Math.random() * 10000), selected: false },
      { name: '西藏', value: Math.round(Math.random() * 10000), selected: false },
      { name: '四川', value: Math.round(Math.random() * 10000), selected: false },
      { name: '宁夏', value: Math.round(Math.random() * 10000), selected: false },
      { name: '海南', value: Math.round(Math.random() * 10000), selected: false },
      { name: '台湾', value: Math.round(Math.random() * 10000), selected: false },
      { name: '香港', value: Math.round(Math.random() * 10000), selected: false },
      { name: '澳门', value: Math.round(Math.random() * 10000), selected: false },
      { name: '南海诸岛', value: Math.round(Math.random() * 10000), selected: false },
      // 江苏
      { name: '苏州市', value: Math.round(Math.random() * 10000), selected: false },
      { name: '无锡市', value: Math.round(Math.random() * 10000), selected: false },
      { name: '南通市', value: Math.round(Math.random() * 10000), selected: false },
      { name: '南京市', value: Math.round(Math.random() * 10000), selected: false },
      { name: '连云港市', value: Math.round(Math.random() * 10000), selected: false },
      { name: '宿迁市', value: Math.round(Math.random() * 10000), selected: false },
      { name: '徐州市', value: Math.round(Math.random() * 10000), selected: false },
      { name: '淮安市', value: Math.round(Math.random() * 10000), selected: false },
      { name: '盐城市', value: Math.round(Math.random() * 10000), selected: false },
      { name: '扬州市', value: Math.round(Math.random() * 10000), selected: false },
      { name: '泰州市', value: Math.round(Math.random() * 10000), selected: false },
      { name: '镇江市', value: Math.round(Math.random() * 10000), selected: false },
      { name: '南京市', value: Math.round(Math.random() * 10000), selected: false },
      { name: '常州市', value: Math.round(Math.random() * 10000), selected: false }
    ]
    // 地图chart实例
    let mapChart = null
    // chart的配置
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>火力:{c}'
      },
      visualMap: {
        min: 0,
        max: 10000,
        text: ['High', 'Low'], // 两端的文本
        realtime: false, // 拖拽时，是否实时更新
        calculable: true, // 是否显示拖拽用的手柄
        // 定义 在选中范围中 的视觉元素
        inRange: {
          color: ['lightskyblue', 'yellow', 'orangered']
        },
        outRange: {
          color: ['gray']
        }
      },
      series: [
        {
          type: 'map',
          map: selectMap.value,
          label: {
            show: true,
            formatter: params => (params.value >= 9000 ? params.name : '')
          },
          data: mapData
        }
      ]
    }
    const chart1Ref = ref()
    const chart2Ref = ref()
    const chart3Ref = ref()
    /* **************************************************************************************** */
    // 初始化MapChart
    const _initMap = () => {
      const myChart = Store.ctx.$echarts.init(chinaMapRef.value)
      myChart.setOption(option)
      mapChart = myChart

      // 设置鼠标移入指定省份颜色不变的效果
      myChart.on('mouseover', function(params) {
        if (params.data.value !== undefined) {
          myChart.dispatchAction({
            // type: 'selectDataRange'
            type: 'downplay'
          })
        }
      })
    }
    // 初始化chart1
    const _initChart1 = () => {
      const randomData1 = _createRandomData()
      const randomData2 = _createRandomData()
      var myChart = Store.ctx.$echarts.init(chart1Ref.value)
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['data1', 'data2']
        },
        xAxis: [
          {
            type: 'category',
            // 坐标轴两边留白策略
            boundaryGap: false,
            data: ['', '', '', '', '', '', '', '', '', '', '', '', '']
          }
        ],
        yAxis: {
          // 不显示y轴
          show: false
        },
        // echart摆放位置
        grid: {
          left: 10,
          right: 10,
          bottom: 10,
          top: 30
        },
        // 存放数据和样式
        series: [
          {
            // 系列名字
            name: 'data1',
            // 折线图
            type: 'line',
            // 是否平滑曲线显示
            smooth: true,
            // 区域内容的样式
            areaStyle: {
              color: '#6FD6F0'
            },
            // 线条的样式
            lineStyle: {
              color: '#6FD6F0'
            },
            itemStyle: {
              normal: {
                color: '#6FD6F0'
              }
            },
            stack: 'a',
            // 数据
            data: randomData1
          },
          {
            // 系列名字
            name: 'data2',
            // 折线图
            type: 'line',
            // 是否平滑曲线显示
            smooth: true,
            // 区域内容的样式
            areaStyle: {
              color: '#73BEE5'
            },
            // 线条的样式
            lineStyle: {
              color: '#73BEE5'
            },
            itemStyle: {
              normal: {
                color: '#73BEE5'
              }
            },
            stack: 'a',
            // 数据
            data: randomData2
          }
        ]
      }
      option && myChart.setOption(option)

      // 设置鼠标移入指定省份颜色不变的效果
      myChart.on('mouseover', function(params) {
        if (params.data.value !== undefined) {
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0
          })
        }
      })
    }
    // 初始化chart2
    const _initChart2 = () => {
      var myChart = Store.ctx.$echarts.init(chart2Ref.value)
      var option = {
        tooltip: {
          trigger: 'item'
        },
        // 存放数据和样式
        series: [
          {
            type: 'pie',
            radius: ['100%', '40%'],
            avoidLabelOverlap: false,
            data: [
              { value: 1048, name: 'data1' },
              { value: 735, name: 'data2' },
              { value: 580, name: 'data3' },
              { value: 484, name: 'data4' },
              { value: 300, name: 'data5' }
            ],
            emphasis: {
              label: {
                show: true,
                fontSize: '16',
                fontWeight: 'bold'
              }
            },
            // 不显示文本
            label: {
              show: false,
              position: 'center'
            },
            // 圆角
            itemStyle: {
              borderRadius: 5,
              borderColor: '#fff',
              borderWidth: 2
            }
          }
        ]
      }
      option && myChart.setOption(option)
    }
    // 初始化chart3
    const _initChart3 = () => {
      var base = +new Date(2021, 3, 18)
      var oneDay = 24 * 3600 * 1000
      var valueBase = Math.random() * 300
      var valueBase2 = Math.random() * 50
      var data = []
      var data2 = []

      for (var i = 1; i < 10; i++) {
        var now = new Date((base += oneDay))
        var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-')

        valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase)
        valueBase <= 0 && (valueBase = Math.random() * 300)
        data.push([dayStr, valueBase])

        valueBase2 = Math.round((Math.random() - 0.5) * 20 + valueBase2)
        valueBase2 <= 0 && (valueBase2 = Math.random() * 50)
        data2.push([dayStr, valueBase2])
      }

      var myChart = Store.ctx.$echarts.init(chart3Ref.value)
      var option = {
        // 显示工具栏
        toolbox: {
          left: 'center',
          itemSize: 25,
          top: 55,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {}
          }
        },
        xAxis: {
          type: 'time',
          axisPointer: {
            // 坐标轴指示器是否自动吸附到点上
            snap: true,
            // 坐标轴指示器样式
            lineStyle: {
              color: '#7581BD',
              width: 2
            },
            // 文本显示内容
            label: {
              show: true,
              formatter: function(params) {
                return Store.ctx.$echarts.format.formatTime('yyyy-MM-dd', params.value)
              },
              backgroundColor: '#7581BD'
            },
            // 指示器
            handle: {
              show: true,
              color: '#7581BD'
            }
          },
          // 坐标轴在 grid 区域中的分隔线。
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          // 坐标轴刻度相关设置
          axisTick: {
            inside: true // 坐标轴刻度是否朝内，默认朝外。
          },
          // 坐标轴在 grid 区域中的分隔线。
          splitLine: {
            show: false
          },
          // 是否显示刻度标签
          axisLabel: {
            inside: true,
            formatter: '{value}\n'
          },
          z: 10
        },
        grid: {
          top: 110,
          left: 15,
          right: 15,
          height: 160
        },
        // 内置型数据区域缩放组件
        dataZoom: [
          {
            type: 'inside',
            throttle: 50 // 设置触发视图刷新的频率。单位为毫秒
          }
        ],
        series: [
          {
            type: 'line',
            smooth: true,
            // 标记的图形
            symbol: 'circle',
            symbolSize: 5,
            // 绘制效率选择
            sampling: 'average',
            itemStyle: {
              color: '#0770FF'
            },
            stack: 'a', // 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
            areaStyle: {},
            data: data
          },
          {
            type: 'line',
            smooth: true,
            stack: 'a',
            symbol: 'circle',
            symbolSize: 5,
            sampling: 'average',
            itemStyle: {
              color: '#F2597F'
            },
            areaStyle: {},
            data: data2
          }
        ]
      }
      option && myChart.setOption(option)
    }
    const handleChange = () => {
      option.series[0].map = selectMap.value
      // 重新渲染数据
      mapChart.setOption(option, true)
    }
    // 生成随机数据
    const _createRandomData = (num = 0) => {
      const randomData = []
      for (let index = 0; index < 20; index++) {
        randomData.push(Math.round(Math.random() * 100) + num)
      }
      return randomData
    }
    /* **************************************************************************************** */
    onMounted(() => {
      nextTick(() => {
        _initMap()
        _initChart1()
        _initChart2()
        _initChart3()
      })
    })

    return {
      chinaMapRef,
      mapList,
      selectMap,
      handleChange,
      chart1Ref,
      chart2Ref,
      chart3Ref
    }
  }
})
</script>

<style lang="stylus" scoped>
.el-card
  .card-header
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size 16px
    .header_content
      padding 0 10px
      border-left .3rem solid #1890ff
    .text
      font-size: 14px;
.selectMap
  position absolute
  z-index 99
.chartBig
  width 100%
  height 400px
.chartSmall
  width 100%
  height 145px
</style>
