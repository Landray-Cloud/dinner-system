<template>
  <div id="home" class="mainBg">
    <div class="myform reset-warp">
      <p class="datap">今天是{{orderDate}} {{week}}</p>
      <h3 class="maintitle"><p class="title">{{ userName }}，你今天已选择<span class="pink">{{ orderStatus ? '订餐' : '不加班订餐' }}</span>！是不是改变主意了？</p></h3>
      <div class=" reset-btn">
        <!-- 已点餐 -->
        <el-button v-if="isOrder" type="primary" @click="sub(false)">不订，给我也不吃！</el-button>
        <!-- 没点餐 -->
        <el-button v-else type="primary" @click="sub(true)">要点，我爱加班！</el-button>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import Util from '@/util.js'
export default {
  name: 'UserReset',
  data() {
    return {
      userName: window.localStorage ? localStorage.getItem('userName') : Cookie.read("userName"),
      orderDate: Util.getDate(new Date(), 'yyyy-MM-dd'),
      week: new Date().getDay(),
      isOrder: false,
      orderStatus: 0
    }
  },
  created() { // created 组件创建完毕属性已经绑定但dom还未生成的状态
    this.getIsOrder()
    let userName = this.userName
    this.week = Util.getWeek(this.week)
    if (userName === null || userName === 'undefined') return this.$router.push('/')
  },
  methods: {
    // 用户今天是否已做了选择
    getIsOrder() {
      let ajax = Util.ajaxHost + "isAction?name=" + this.userName + '&orderDate=' + this.orderDate
      // let ajax = Util.ajaxHost + "orderStatus?name=" + this.userName + '&orderDate=' + this.orderDate
      this.$http.get(ajax).then(succ => {
        let res = succ.data;
        if (!Util.commAjaxCB(res)) return
        // if (res.data.isAction) this.$router.push('UserReset')
      }, err => {
        console.log(err);
      })
    },
    // 更新提交数据
    sub() {
      let orderTime = Date.parse(new Date());
      let userName = this.userName
      let orderStatus = this.orderStatus
      let selectWork = this.selectWork
      let selectOrder = this.selectOrder
      if (selectWork === 0) { // 加班
        if (selectOrder === 2) { // 点餐
          orderStatus = 1
        } else {
          orderStatus = 2
        }
      } else { //不加班
        if (selectOrder === 2) { // 点餐
          orderStatus = 4
        } else {
          orderStatus = 3
        }
      }
      // let dataObj = {
      //   name: userName,
      //   orderStatus: orderStatus
      // }
      // let ajax = Util.ajaxHost + 'updateData';
      let ajax = Util.ajaxHost + 'updateData?name=' + userName + '&orderStatus=' + orderStatus;
      // this.$http.post(ajax, JSON.stringify(dataObj)).then(succ => {
      this.$http.get(ajax).then(succ => {
        let res = succ.data;
        if (!Util.commAjaxCB(res)) return;
        let createItem = res.data;
        this.$router.push({
          name: 'SubmitSucc'
        })
      }, err => {
        console.log(err)
      })
    }
  }
}

</script>
<style type="text/css">
@import "../less/main.css"

</style>
