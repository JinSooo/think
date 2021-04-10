<template>
  <el-row :gutter="10">
    <!-- 总热度 -->
    <el-col :span="colSpan">
      <el-card>
        <div class="title">
          <span>总热度</span>
          <span><i class="el-icon-info"></i></span>
        </div>
        <div class="content">
          <img src="../../../assets/img/hot.svg" width="30" height="30" alt="" />
          <!-- 热度总量 -->
          <span>{{ total }}</span>
        </div>
        <div class="state" v-if="hotList" style="margin-top: 42px">
          <p>
            同比
            <!-- 相对第一占比 -->
            <span>{{ Math.round(total / hotList[0].hot_value) }}% <i class="el-icon-top"></i></span>
          </p>
          <el-divider></el-divider>
          <!-- 与之第一相差多少 -->
          <div class="info">同比增加 {{ hotList[0].hot_value }}</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="colSpan">
      <el-card>
        <div class="title">
          <span>热度榜</span>
          <span><i class="el-icon-info"></i></span>
        </div>
        <div class="content">
          <span v-if="hotList">{{ hotList[0].hot_value }}</span>
        </div>
        <div class="state">
          <!-- 折线图 -->
          <div ref="chart1Ref" class="chartSmall"></div>
          <el-divider></el-divider>
          <div class="info" v-if="hotList">同比增加 {{ hotList[0].hot_value - hotList[1].hot_value }}</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="colSpan">
      <el-card>
        <div class="title">
          <span>热度榜</span>
          <span><i class="el-icon-info"></i></span>
        </div>
        <div class="content">
          <span v-if="hotList">{{ hotList[0].hot_value }}</span>
        </div>
        <div class="state">
          <!-- 柱状图 -->
          <div ref="chart2Ref" class="chartSmall"></div>
          <el-divider></el-divider>
          <div class="info" v-if="hotList">同比增加 {{ hotList[0].hot_value - hotList[1].hot_value }}</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="colSpan">
      <el-card>
        <div class="title">
          <span>热度占比</span>
          <span><i class="el-icon-info"></i></span>
        </div>
        <div class="content">
          <span v-if="hotList">{{ hotList[0].hot_value }}</span>
        </div>
        <div class="state" style="margin-top: 34px">
          <!-- 占比 -->
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            v-if="hotList"
            :percentage="Math.round(total / hotList[0].hot_value)"
          ></el-progress>
          <el-divider></el-divider>
          <div class="info" v-if="hotList">同比增加 {{ hotList[0].hot_value - hotList[1].hot_value }}</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <!-- 热度榜具体表图 -->
  <el-row style="margin-top: 10px">
    <el-col :span="24">
      <el-card>
        <template #header>
          <div class="card-header">
            <div class="header_content">热度图表</div>
            <!-- 年月日选择 -->
            <div>
              <el-radio-group size="small" v-model="selectRadioButton">
                <el-radio-button label="年"></el-radio-button>
                <el-radio-button label="月"></el-radio-button>
                <el-radio-button label="日"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </template>
        <div ref="chart3Ref" class="chartBig"></div>
      </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="10" style="margin-top: 10px">
    <el-col :span="12">
      <!-- 显示热榜 -->
      <el-card>
        <template #header>
          <div class="card-header">
            <div class="header_content">热度榜</div>
          </div>
        </template>
        <!-- 热搜列表 -->
        <el-table :data="hotListByPagination" style="width: 100%">
          <el-table-column type="index" label="排名" min-width="50"> </el-table-column>
          <el-table-column prop="word" label="热搜名" min-width="250"> </el-table-column>
          <el-table-column prop="hot_value" label="热搜量" min-width="120"> </el-table-column>
          <el-table-column label="同比">
            <template #default="{ row }">
              <span>{{ (row.hot_value / total).toFixed(3) }}</span>
              <i class="el-icon-top" style="color: #67C23A"></i>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @current-change="handleCurrentChange"
          :currentPage="currentPage"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="hotList.length"
          v-if="hotList"
        >
        </el-pagination>
      </el-card>
    </el-col>
    <el-col :span="12">
      <!-- 显示热榜 -->
      <!-- 使两个card高度统一 -->
      <el-card style="height: 100%">
        <template #header>
          <div class="card-header">
            <div class="header_content">标签云</div>
          </div>
        </template>
        <TagCloud />
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { computed, defineComponent, inject, nextTick, onMounted, ref } from 'vue'
import TagCloud from '@/components/TagCloud'
import { getHot } from '@/utils/api'
export default defineComponent({
  name: 'Hot',
  components: {
    TagCloud
  },
  setup() {
    // 获取全局对象
    const Store = inject('Store')
    // 热搜榜数据
    const hotList = ref()
    // 总热度
    const total = ref()
    // 热度值数据
    const hotValueList = []
    // chart1元素
    const chart1Ref = ref()
    // chart2元素
    const chart2Ref = ref()
    // chart3元素
    const chart3Ref = ref()
    // 选择的日期选项
    const selectRadioButton = ref('年')
    /* **************************************************************************************** */
    // 一列显示个数
    const colSpan = computed(() => {
      if (window.innerWidth > 1180) return 6
      return 12
    })
    // 分页索取的查询页数
    const currentPage = ref(1)
    // 分页的热搜榜
    const hotListByPagination = computed(() => {
      const arr = []
      if (hotList.value) {
        for (let index = (currentPage.value - 1) * 10; index < currentPage.value * 10; index++) {
          arr.push(hotList.value[index])
        }
      }
      return arr
    })
    /* **************************************************************************************** */
    // 当前页数事件
    const handleCurrentChange = val => {
      currentPage.value = val
    }
    // 初始化Echart
    const _initEchart = () => {
      // 初始化chart
      _initChart1()
      _initChart2()
      _initChart3()
    }
    // 初始化chart1
    const _initChart1 = () => {
      const data = _randomHotValue()
      var myChart = Store.ctx.$echarts.init(chart1Ref.value)
      var option = {
        xAxis: [
          {
            type: 'category',
            // 坐标轴两边留白策略
            boundaryGap: false
          }
        ],
        yAxis: {
          // 不显示y轴
          show: false
        },
        // echart摆放位置
        grid: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0
        },
        // 存放数据和样式
        series: [
          {
            // 系列名字
            name: '邮件营销',
            // 折线图
            type: 'line',
            // 是否平滑曲线显示
            smooth: true,
            // 图形是否不响应和触发鼠标事件
            silent: true,
            // 去掉图上的点
            symbol: 'none',
            // 区域内容的样式
            areaStyle: {
              color: '#B2E1FF'
            },
            // 线条的样式
            lineStyle: {
              color: '#91D5FF'
            },
            // 数据
            data: data
          }
        ]
      }
      option && myChart.setOption(option)
    }
    // 初始化chart2
    const _initChart2 = () => {
      const data = _randomHotValue()
      var myChart = Store.ctx.$echarts.init(chart2Ref.value)
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'none' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: '{c}'
        },
        xAxis: [
          {
            show: false,
            type: 'category',
            // 坐标轴两边留白策略
            boundaryGap: false,
            data: [1, 2, 3, 4, 5, 6, 7]
          }
        ],
        yAxis: {
          // 不显示y轴
          show: false
        },
        // echart摆放位置
        grid: {
          left: 15,
          right: 15,
          bottom: 0,
          top: 0
        },
        // 存放数据和样式
        series: [
          {
            // 系列名字
            name: '邮件营销',
            // 柱状图
            type: 'bar',
            // 该标域的样式
            itemStyle: {
              color: '#B2E1FF'
            },
            // 数据
            data: data
          }
        ]
      }
      option && myChart.setOption(option)
    }
    // 初始化chart3
    const _initChart3 = () => {
      const data = _randomHotValue()
      var myChart = Store.ctx.$echarts.init(chart3Ref.value)
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'none' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['热搜量', '热度']
        },
        xAxis: [
          {
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '热搜量',
            min: 5000000,
            max: 10000000,
            // 显示y轴线条
            axisLine: { show: true },
            // 显示y轴刻度
            axisTick: { show: true },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '热度',
            min: 5000000,
            max: 8000000,
            // 显示y轴线条
            axisLine: { show: true },
            // 显示y轴刻度
            axisTick: { show: true },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        // echart摆放位置
        grid: {
          left: '10%',
          right: '10%',
          bottom: '10%',
          top: '15%'
        },
        // 存放数据和样式
        series: [
          {
            // 系列名字
            name: '热搜量',
            // 柱状图
            type: 'bar',
            // 该标域的样式
            itemStyle: {
              color: '#B2E1FF'
            },
            // 数据
            data: hotValueList
          },
          {
            // 系列名字
            name: '热度',
            // 柱状图
            type: 'line',
            // 线条的样式
            lineStyle: {
              color: '#1890FF'
            },
            // 数据
            data: data
          }
        ]
      }
      option && myChart.setOption(option)
    }
    // 随机选取10个热度值
    const _randomHotValue = () => {
      const data = []
      for (let index = 0; index < 12; index++) {
        const ran = Math.floor(Math.random() * 39 + 1)
        data.push(hotValueList[ran])
      }
      return data
    }
    /* **************************************************************************************** */
    onMounted(async () => {
      // 获取热点数据
      const res = await getHot()
      hotList.value = res.word_list

      // 计算总热度
      total.value = res.word_list.reduce((count, hot) => {
        return count + hot.hot_value
      }, 0)
      // 获取所有热度值
      res.word_list.forEach(hot => {
        hotValueList.push(hot.hot_value)
      }, 0)

      nextTick(() => {
        // 初始化图表
        _initEchart()
      })
    })

    return {
      hotList,
      total,
      chart1Ref,
      chart2Ref,
      chart3Ref,
      selectRadioButton,
      hotListByPagination,
      handleCurrentChange,
      currentPage,
      colSpan
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
  .title
    display flex
    justify-content space-between
    color #8c8c8c
    & span:nth-child(1)
      font-size 14px
  .content
    padding 10px 0
    font-size 20px
    height 30px
    display flex
    line-height 30px
    img
      padding-right 5px
  .state
    font-size 14px
    span
      color #409EFF
      i
        color #52C41A
    .info
      font-size 12px
      color #8c8c8c
.chartSmall
  width 100%
  height 60px
.chartBig
  width 100%
  height 400px
.el-divider
  margin 8px 0
</style>
