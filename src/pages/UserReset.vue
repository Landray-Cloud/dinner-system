<template>
  <div id="home">
    <my-bg></my-bg>
    <div class="myform reset-warp">
      <p>今天是{{orderDate}} {{week}}</p>
      <h3>{{ userName }}，你今天已选择<span class="pink">{{ isOrder ? '点餐' : '不点餐' }}</span> !<br/>是不是改变主意了？</h3>
      <div class=" reset-btn">
        <!-- 已点餐 -->
        <el-button v-if="isOrder" type="primary" @click="sub(false)" class="reset-btn">不点，给我也不吃！</el-button>
        <!-- 没点餐 -->
        <el-button v-else type="primary" @click="sub(true)" class="reset-btn">要点，我爱加班！</el-button>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import Util from '@/util.js'
import myBg from '@/components/myBg'
export default {
  name: 'UserReset',
  components: {
    myBg
  },
  data() {
    return {
      userName: window.localStorage ? localStorage.getItem('userName') : Cookie.read("userName"),
      orderDate: new Date(),
      week: new Date().getDay(),
      isOrder: false
    }
  },
  created() { // created 组件创建完毕属性已经绑定但dom还未生成的状态
    this.getIsOrder()
    let userName = this.userName
    this.orderDate = Util.getDate(this.orderDate, 'yyyy-MM-dd')
    this.week = Util.getWeek(this.week)
    if (userName === null || userName === 'undefined') return this.$router.push('/')
  },
  methods: {
    getIsOrder() {
      let ajax = Util.ajaxHost + 'isOrder?name=' + this.userName;
      this.$http.get(ajax).then(succ => {
        let res = succ.data
        if (!Util.CommAjaxCB(res)) return
        this.isOrder = res.data.isOrder
      })
    },
    // 更新提交数据
    sub(isOrder) {
      let orderTime = Date.parse(new Date());
      let userName = this.userName;
      let ajax = Util.ajaxHost + 'updateData?name=' + userName + '&isOrder=' + isOrder + '&orderTime=' + orderTime;
      this.$http.get(ajax).then(succ => {
        let res = succ.data;
        if (!Util.CommAjaxCB(res)) return;
        this.createItem = res.data;

        this.$router.push({
          name: 'SubmitSucc'
        })

      }, err => {
        console.log(err)
      })
    },
  }
}

</script>
<style type="text/css">
@import "../less/main.css"

</style>
