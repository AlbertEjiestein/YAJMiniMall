// components/w-tab-control/w-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(e){
      // 设置最新的index
      this.setData({
        currentIndex: e.currentTarget.dataset.index
      })

      // 发出事件
      this.triggerEvent("tabClick", {index: this.data.currentIndex}, {})
    },
    setCurrentIndex(index){
      this.setData({
        currentIndex : index
      })
    }
  }
})
