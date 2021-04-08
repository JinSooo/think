<template>
  <el-row :gutter="10">
    <el-col :span="6">
      <el-card shadow="never">
        <!-- 上部区域 -->
        <div class="basic">
          <!-- 头像 -->
          <div class="avatar">
            <el-image
              style="width: 100px; height: 100px"
              :src="avatar"
              :preview-src-list="[avatar]"
            ></el-image>
          </div>
          <!-- 姓名 -->
          <h2>Jason</h2>
          <!-- 描述 -->
          <div class="desc">
            Organize everything in your life in one place.
          </div>
        </div>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 信息 -->
        <div class="info">
          <div class="item">
            <div>地址</div>
            <div>江苏省 苏州市 虎丘区</div>
          </div>
          <div class="item">
            <div>邮编</div>
            <div>341254</div>
          </div>
          <div class="item">
            <div>年龄</div>
            <div>20</div>
          </div>
          <div class="item">
            <div>生日</div>
            <div>1997-10-26</div>
          </div>
          <div class="item">
            <div>简介</div>
            <div>
              Organize everything in your life in one place. Organize everything in your life in one
              place.
            </div>
          </div>
        </div>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 标签 -->
        <div class="tag">
          <h3>标签</h3>
          <el-tag size="small">标签一</el-tag>
          <el-tag size="small">标签二</el-tag>
          <el-tag size="small">标签三</el-tag>
          <el-tag size="small">标签四</el-tag>
          <el-tag size="small">标签五</el-tag>
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card shadow="never">
        <el-tabs v-model="selectTab">
          <el-tab-pane label="文章" name="first">文章</el-tab-pane>
          <el-tab-pane label="项目" name="second">项目</el-tab-pane>
          <el-tab-pane label="应用" name="third">应用</el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-row>
        <el-col :span="24">
          <el-card shadow="never">
            <template #header>
              <div class="card-header">
                <div class="header_content">便捷导航</div>
              </div>
            </template>
            <ul class="links">
              <li><a href="javascript:;">张三</a></li>
              <li><a href="javascript:;">李四</a></li>
              <li><a href="javascript:;">王五</a></li>
              <li><a href="javascript:;">老刘</a></li>
              <li><a href="javascript:;">老王</a></li>
              <li><a href="javascript:;">老李</a></li>
            </ul>
          </el-card>
        </el-col>
        <el-col :span="24" style="margin-top: 10px">
          <el-card shadow="never">
            <template #header>
              <div class="card-header">
                <div class="header_content">项目</div>
              </div>
            </template>
            <ul class="projects">
              <li>
                <div class="title">
                  <div class="avatar">
                    <img src="../../../assets/img/project.jpg" alt="" />
                  </div>
                  <div class="content">
                    世片表受易向接见么政眼中元素来规进。
                  </div>
                </div>
                <div class="description">
                  量十加关强经观即严红受来且研九。法律并南到干和习军儿段代步再题农但。图区适五西得切青支是层结没容白构局口。都至场理导求则置年叫等当定公影。龙方花认意列这习约青立实点带明。文转改图区场许角领原象听少称受运业。
                </div>
                <div class="info">
                  <div class="author">涨幅</div>
                  <div class="time">2021-05-22</div>
                </div>
              </li>
              <div class="divider"></div>
              <li>
                <div class="title">
                  <div class="avatar">
                    <img src="../../../assets/img/project.jpg" alt="" />
                  </div>
                  <div class="content">
                    群将好率候处以被反门细速。
                  </div>
                </div>
                <div class="description">
                  议设机天适命革区军华管件厂它白青每这。解向中过界农通已题大全重与存很意被科。变置只少好流边命半备以叫期。般较地圆八安据月习指节为把角多。林大几影相看结联江系治南龙面中。
                </div>
                <div class="info">
                  <div class="author">涨幅</div>
                  <div class="time">2021-05-22</div>
                </div>
              </li>
              <div class="divider"></div>
              <li>
                <div class="title">
                  <div class="avatar">
                    <img src="../../../assets/img/project.jpg" alt="" />
                  </div>
                  <div class="content">
                    算却与标者区场运给前值采备断才。
                  </div>
                </div>
                <div class="description">
                  白着置布情记点应派江和别设对。重过当干空龙年心许识什长达置。子点社电心采张次员头空问声青需展始。结都片建容基体角北子交存业高素持少。清手非事行产间调消业据化到子。变导需从级好更支革质线北千活院。
                </div>
                <div class="info">
                  <div class="author">涨幅</div>
                  <div class="time">2021-05-22</div>
                </div>
              </li>
              <div class="divider"></div>
              <li>
                <div class="title">
                  <div class="avatar">
                    <img src="../../../assets/img/project.jpg" alt="" />
                  </div>
                  <div class="content">
                    量议已机系合确去意难置常些江装品。
                  </div>
                </div>
                <div class="description">
                  周了论据示意则拉西东直山题青对口。市的段就严解养区长选去革五至。知任进理并统学志展县学山心。断没京对土照厂精体共干统花根干品。
                </div>
                <div class="info">
                  <div class="author">涨幅</div>
                  <div class="time">2021-05-22</div>
                </div>
              </li>
              <div class="divider"></div>
              <li>
                <div class="title">
                  <div class="avatar">
                    <img src="../../../assets/img/project.jpg" alt="" />
                  </div>
                  <div class="content">
                    标标证设这千两江可式算高。
                  </div>
                </div>
                <div class="description">
                  得己通众门则一见得定问团据名每干该。走红被日身斗完东建走据建易。十高选目两群候品书龙如素分只光水周。值说太际点开运空点水其于常。关次整花型空线做意复下有照将。美象度理十领验验门标华除会争。
                </div>
                <div class="info">
                  <div class="author">涨幅</div>
                  <div class="time">2021-05-22</div>
                </div>
              </li>
            </ul>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { defineComponent, ref } from 'vue'
import avatar from '@/assets/img/avatar.jpg'
export default defineComponent({
  name: 'User',
  setup() {
    const selectTab = ref('first')
    return {
      avatar,
      selectTab
    }
  }
})
</script>

<style lang="stylus" scoped>
.basic
  text-align  center
  .avatar
    margin 0 auto
    width 100px
    height 100px
    border-radius 50%
    overflow hidden
  h2
    margin-top 10px
    margin-bottom 20px
.info
  .item
    font-size 14px
    & div:nth-child(1)
      float left
      width 50px
      text-align right
      color rgba(0,0,0,.45)
    & div:nth-child(2)
      padding-left 60px
      margin-bottom 10px
.tag
  h3
    color rgba(0,0,0,.45)
    margin-bottom 5px
  .el-tag
    margin-right 8px
    margin-bottom 8px
.links
  list-style none
  color #606266
  display flex
  flex-wrap wrap
  li
    box-sizing border-box
    width 25%
    padding 8px 16px
    font-size 14px
    & a
      padding-bottom 1px
    &:hover a
      color #409EFF
      border-bottom 1px solid #409EFF
.projects
  li
    cursor pointer
    .title
      clear both
      margin-bottom 12px
      .avatar
        float left
        width 30px
        height 30px
        border-radius 50%
        overflow hidden
        img
          width 100%
          height 100%
      .content
        line-height 30px
        padding-left 10px
        font-size 16px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
    .description
      margin-bottom 16px
      display -webkit-box
      -webkit-box-orient vertical
      // 只显示两行
      -webkit-line-clamp 2
      overflow hidden
      font-size 14px
      color rgba(0,0,0,.45)
    .info
      font-size 12px
      color rgba(0,0,0,.45)
      display flex
      justify-content space-between
.el-tabs
  font-size 16px
  & >>> .el-tabs__item
    letter-spacing .5rem
    font-size 16px
.el-tab-pane
  height 800px
.el-card
  .card-header
    display flex
    justify-content space-between
    align-items center
    font-size 16px
    .header_content
      padding 0 10px
      border-left .3rem solid #1890ff
    .text
      font-size 14px
</style>
