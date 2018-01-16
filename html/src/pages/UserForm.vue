<template>
  <div id="home" v-show="bodyShow" class="mainBg">
    <div class="userbox" :data="createItem">
      <p class="datap">今天是{{orderDate}} {{week}}</p>
      <h3 class="userFormTitle"><p class="title">{{ userName  }} 是否加班订餐？</p></h3>
      <div class="checkbox">
        <el-select v-model="selectWork" placeholder="请选择">
          <el-option v-for="item in workList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="selectOrder" placeholder="请选择">
          <el-option v-for="item in orderList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <!-- <p>{{selectWork}}</p> -->
      </div>
      <div class="userform-box">
        <!-- <el-button type="primary" @click="sub(true)" class="btn">要点，我爱加班！</el-button>
        <el-button @click="sub(false)" class="btn">不点，给我也不吃！</el-button> -->
        <el-button type="primary" @click="sub" class="btn">提交</el-button>
        <!-- <el-button @click="sub" class="btn">不点，给我也不吃！</el-button> -->
      </div>
    </div>
  </div>
</template>
<script>
import Util from '@/util.js';
export default {
  name: 'UserForm',
  data() {
    return {
      bodyShow: false, // false
      orderDate: Util.getDate(new Date(), 'yyyy-MM-dd'),
      userName: window.localStorage ? localStorage.getItem('userName') : Cookie.read("userName"),
      week: new Date().getDay(), //星期
      createItem: [], // 数据列表
      selectWork: 0, // 下拉框列表  加班/不加班
      selectOrder: 2, // 下拉框列表  点餐/不点餐
      orderStatus: 0, // 订餐状态
      workList: [{
        value: 0,
        label: '加班'
      }, {
        value: 1,
        label: '不加班'
      }],
      orderList: [{
        value: 2,
        label: '点餐'
      }, {
        value: 3,
        label: '不点餐'
      }]
    }
  },
  created() { // created 组件创建完毕属性已经绑定但dom还未生成的状态
    this.getIsOrder()
    this.week = Util.getWeek(this.week);
    if (!this.userName) this.$router.push('/')
  },
  methods: {
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
    },
    // 用户今天是否已做了选择
    getIsOrder() {
      let ajax = Util.ajaxHost + "isAction?name=" + this.userName + '&orderDate=' + this.orderDate
      // let ajax = Util.ajaxHost + "orderStatus?name=" + this.userName + '&orderDate=' + this.orderDate
      this.$http.get(ajax).then(succ => {
        let res = succ.data;
        if (!Util.commAjaxCB(res)) return
        this.bodyShow = true
        if (res.data.isAction) this.$router.push('UserReset')
      }, err => {
        this.bodyShow = true
        console.log(err);
      })
    }
  }
}

</script>
<style type="text/css">
@import "../less/main.css";

</style>
