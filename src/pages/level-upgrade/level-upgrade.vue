<template>
  <div class="level-upgrade">
    <section class="broadcast-wrapper">
      <swiper ref="mySwiper" :options="options" class="broadcast" @slideChange="slideChange">
        <swiper-slide v-if="levelId <= 0" id="slide-0" class="broadcast-item">
          <img class="slide-image" src="./pic-bzb@2x.png" alt="">
        </swiper-slide>
        <swiper-slide v-if="levelId <= 1" id="slide-1" class="broadcast-item">
          <img class="slide-image" src="./pic-qnb@2x.png" alt="">
        </swiper-slide>
        <swiper-slide id="slide-2" class="broadcast-item">
          <img class="slide-image" src="./pic-hhb@2x.png" alt="">
        </swiper-slide>
      </swiper>
    </section>
    <div class="content-box">
      <img class="top-img" src="./pic-sjdls@2x.png" alt="">
      <div class="content-title">专属权益</div>
      <div v-for="(item, index) in levelData[selectId].list" :key="index" class="content-list">
        <img class="content-list-image" :src="item.icon" alt="">
        <div class="content-text">
          <div class="content-text-title">{{item.title}}</div>
          <div class="content-sub">{{item.subTitle}}</div>
        </div>
      </div>
    </div>
    <div class="submit-btn-box">
      <div :style="levelData[selectId].btnStyle" class="submit-btn" @click="submitLevel">
        <div class="submit-text">立即申请</div>
        <div class="submit-money-box">
          <div>¥</div>
          <div class="submit-money-white">{{levelData[selectId].buttonMoney}}</div>
          <div>/{{levelData[selectId].buttonYear}}年</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import {getSearch, initConfig} from './data-utls'
  import wx from 'weixin-js-sdk'
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  const PAGE_NAME = 'LEVEL_UPGRADE'
  const TITLE = '升级成为代理商'
  const LEVELDATA = {
    0: {
      list: [{icon: require('./icon-cgq@2x.png'), title: '2-3折采购权', subTitle: '可获得为市场价格2-3折的采购优惠价，等级越高，采购折扣越低。'}],
      buttonYear: '',
      buttonMoney: '6000',
      btnStyle: 'color: #704F1B; background-image: linear-gradient(114deg, #F5E5C1 1%, #F2D699 98%)'
    },
    1: {
      list: [{icon: require('./icon-cgq@2x.png'), title: '1-2折采购权', subTitle: '可获得为市场价格1-2折的采购优惠价，等级越高，采购折扣越低。'}, {icon: require('./icon-xsq@2x.png'), title: '销售权', subTitle: '可获得账号销售资格，销售后可获得对应的业务补贴及商品补贴。'}],
      buttonYear: '3',
      buttonMoney: '18000',
      btnStyle: 'color: #8A584B; background-image: linear-gradient(114deg, #E4CDC3 1%, #D8AF9A 98%)'
    },
    2: {
      list: [{icon: require('./icon-cgq@2x.png'), title: '0.5-1折采购权', subTitle: '可获得为市场价格0.5-1折的采购优惠价，等级越高，采购折扣越低。'}, {icon: require('./icon-xsq@2x.png'), title: '销售权', subTitle: '可获得账号销售资格，销售后可获得对应的业务补贴及商品补贴。'}, {icon: require('./icon-zh@2x.png'), title: '赠送5个全能版', subTitle: '合伙版将赠送5个全能版账号开通权，可自动对推荐的用户进行等级开通。'}],
      buttonYear: '3',
      buttonMoney: '90000',
      btnStyle: 'color: #F5E2B4; background-image: linear-gradient(114deg, #3F3F3F 1%, #121212 97%)'
    }
  }
  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        options: {
          loop: false,
          centeredSlides: true,
          slidesPerView: 1.1,
          spaceBetween : 5
        },
        curIndex: 0,
        levelData: LEVELDATA,
        levelId: 0,
        selectId: 0
      }
    },
    computed: {
      // ...Helpers.computed,
    },
    created() {
      let config = getSearch()
      initConfig(config)
      this.levelId = config.levelId * 1 || 0
      this.selectId = this.levelId
    },
    methods: {
      slideChange() {
        this.curIndex = this.$refs.mySwiper.swiper.activeIndex * 1
        switch (this.levelId) {
        case 0:
          this.selectId = this.curIndex
          break
        case 1:
          this.selectId = this.curIndex + 1
          break
        case 2:
          this.selectId = this.curIndex + 2
          break
        }
        console.log(this.$refs.mySwiper.swiper.activeIndex)
      },
      testFn() {
        let name
        let year
        let money
        switch (this.selectId) {
        case 0:
          name = '标准版'
          year = ''
          money = 6000
          break
        case 1:
          name = '全能版'
          year = '三'
          money = 18000
          break
        case 2:
          name = '合伙版'
          year = '三'
          money = 90000
          break
        }
        console.log(`/package-personalCenter/successful-application?name=${name}&year=${year}&money=${money}`)
        wx.miniProgram.navigateTo({url: `/package-personalCenter/successful-application?name=${name}&year=${year}&money=${money}`})
        console.log(wx.miniProgram.navigateTo({url: `package-personalCenter/successful-application`}))
      },
      submitLevel() {
        API.Level.setLevel({data: {apply_level_id: (this.selectId + 1)}}).then((res) => {
          this.$loading.hide()
          let name
          let year
          let money
          switch (this.selectId) {
          case 0:
            name = '标准版'
            year = ''
            money = 6000
            break
          case 1:
            name = '全能版'
            year = '三'
            money = 18000
            break
          case 2:
            name = '合伙版'
            year = '三'
            money = 90000
            break
          }
          wx.miniProgram.navigateTo({url: `/package-personalCenter/successful-application?name=${name}&year=${year}&money=${money}`})
        })
      }
      // ...Helpers.methods,
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  @import "~swiper/dist/css/swiper.css"
  .level-upgrade
    width: 100%
    background: #fff
    box-sizing: border-box
    padding-bottom: 60px
    padding-top: 16px
    min-height: 100vh
  .broadcast-wrapper
    width: 100%
    background-image: linear-gradient(180deg, #FFFFFF 4%, #F5F5F9 83%)
    .broadcast
      height: 100%
      .broadcast-item
        height: 100%
        layout()
        flex-wrap: nowrap
        align-items: center
        .slide-image
          width: 100%
        .title
          font-family: $font-family-regular
          font-size: 20px
          color: #374B63
          letter-spacing: 0
          text-align: center
          line-height: 1
          height: @font-size
  .content-box
    position: relative
    width: 100%
    padding: 27px 20px 0
    box-sizing: border-box
    .content-title
      font-family: $font-family-medium
      color: #3F454B
      font-size: $font-size-16
      text-align: center
      margin-bottom: 20px
  .content-list
    border-radius: 6px
    background: #F5F5F9
    padding: 15px 20px
    margin-bottom: 15px
    layout(row)
    .content-list-image
      width: 44px
      height: @width
      display: block
      margin-right: 20px
    .content-text
      flex: 1
    .content-text-title
      font-family: $font-family-medium
      color: #3F454B
      font-size: $font-size-14
      margin-bottom: 10px
      text-align: left
    .content-sub
      font-family: $font-family-regular
      color: #606972
      font-size: $font-size-13
      line-height: $font-size-19
  .submit-btn-box
    width: 100%
    box-sizing: border-box
    position: fixed
    left: 0
    bottom: 0
    padding: 10px 20px 15px
    .submit-btn
      padding: 12px 0 14.5px
      border-radius: 2px
      background: #D33B32
      layout(row)
      align-items: flex-end
      justify-content: center
      color: #fff
      .submit-text
        font-family: $font-family-medium
        font-size: $font-size-16
        margin-right: 17px
      .submit-money-box
        font-family: $font-family-regular
        font-size: $font-size-13
        layout(row)
        align-items: flex-end
        .submit-money-white
          line-height: 1
          font-size: $font-size-20
          position: relative
          top: 2px
  .top-img
    position: absolute
    left: 0
    top: -23px
    z-index: 999
    width: 100%
    display: block
  .level-upgrade
    width: 100%
</style>
