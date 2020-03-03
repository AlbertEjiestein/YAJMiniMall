// pages/home/home.js
import {
  getMultiData,
  getProduct
} from '../../service/home.js'

// import {
//   POP,
//   SELL,
//   NEW,
//   BACK_TOP_POSITION
// } from '../../common/const.js'

Page({
  data: {
    banners: [],
    recommends: [],
    titles: ["流行", "新款", "精选"],
    goods: {
      ['pop']: { page: 1, list: [] },
      ['new']: { page: 1, list: [] },
      ['sell']: { page: 1, list: [] },
    },
    currentType: 'pop',
    topPosition: 0,
    tabControlTop: 0,
    showBackTop: false,
    showTabControl: false
  },
  onLoad: function (options) {
    // 1.发送网络请求
    this._getData()
  },
  // onReachBottom: function() {
  //   this._getProductData(this.data.currentType)
  // },
  loadMore() {
    this._getProductData(this.data.currentType);
  },
  scrollPosition(e) {
    // 获取滚动的位置
    const position = e.detail.scrollTop;
    
    this.setData({
      showBackTop: position > 1000
    })

    // 判断tabcontrol是否超过顶边
    wx.createSelectorQuery().select('.tab-control').boundingClientRect((rect) => {
      const show = rect.top > 0;
      this.setData({
        showTabControl: !show
      })
    }).exec()
  },
  onImageLoad() {
    wx.createSelectorQuery().select('.tab-control').boundingClientRect((rect) => {
      this.setData({
        tabControlTop: rect.top
      })
    }).exec()
  },
  onPageScroll(res) {
  },
  tabClick(e) {
    // 1.根据当前的点击赋值最新的currentType
    let currentType = ''
    switch (e.detail.index) {
      case 0:
        currentType = 'pop'
        break
      case 1:
        currentType = 'new'
        break
      case 2:
        currentType = 'sell'
        break
    }
    this.setData({
      currentType: currentType
    })
    // console.log(this.selectComponent('.tab-control'));
    // 获取子组件
    this.selectComponent('.tab-control').setCurrentIndex(e.detail.index)
    this.selectComponent('.tab-control-temp').setCurrentIndex(e.detail.index)
  },

  onBackTop(){
    this.setData({
      showBackTop: false,
      topPosition: 0
    })
  },

  // 网络请求相关方法
  _getData() {
    this._getMultiData(); // 获取上面的数据
    this._getProductData('pop');
    this._getProductData('new');
    this._getProductData('sell');
  },
  _getMultiData() {
    getMultiData().then(res => {
      // 1.取出轮播所有的数据
      const banners = res.data.data.banner.list.map(item => {
        return item.image
      })

      // 2.设置数据
      this.setData({
        banners: banners,
        recommends: res.data.data.recommend.list
      })
    })
  },
  _getProductData(type) {
    // 1.获取数据对应的页码
    const page = this.data.goods[type].page;

    // 2.请求数据
    getProduct(type, page).then(res => {
      // 1.取出数据
      const list = res.data.data.list;

      // 2.将数据临时获取
      const goods = this.data.goods;
      goods[type].list.push(...list)
      goods[type].page += 1;

      // 3.最新的goods设置到goods中
      this.setData({
        goods: goods
      })
    })
  }
})