<template>
  <div class="list" id="home" v-show="bodyShow">
    <my-bg></my-bg>
    <div class="myform" :data="createItem">
      <p>今天是{{orderDate}} {{week}}</p>
      <h3>{{ userName  }} 是否点餐？</h3>
      <div class="userform-box">
        <el-button type="primary" @click="sub(true)" class="btn">是</el-button>
        <el-button type="primary" @click="sub(false)" class="btn">否</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Util from '@/util.js';
import myBg from '@/components/myBg'
export default {
  name: 'UserForm',
  components: {
    myBg
  },
  data() {
    return {
      bodyShow: false, // false
      orderDate: new Date(),
      userName: window.localStorage ? localStorage.getItem('userName') : Cookie.read("userName"),
      week: new Date().getDay(), //星期
      createItem: [],
    }
  },
  created() { // created 组件创建完毕属性已经绑定但dom还未生成的状态
    this.getIsOrder()
    // if (this.isOrder) {
    //   this.bodyShow = true
    //   return 
    // }

    this.week = Util.getWeek(this.week);
    this.orderDate = Util.getDate(this.orderDate, 'yyyy-MM-dd');
    if (!this.userName) this.$router.push('/')
  },
  methods: {
    sub(isOrder) {
      let orderTime = Date.parse(new Date());
      let userName = this.userName;
      let ajax = Util.ajaxHost + 'updateData?name=' + userName + '&isOrder=' + isOrder + '&orderTime=' + orderTime;
      this.$http.get(ajax).then(succ => {
        let res = succ.data;
        if (!Util.CommAjaxCB(res)) return;
        let createItem = res.data;
        this.$router.push({
          name: 'SubmitSucc'
        })


      }, err => {
        console.log(err)
      })
    },
    // 判断是否点餐
    getIsOrder() {
      let ajax = Util.ajaxHost + "isAction?name=" + this.userName
      this.$http.get(ajax).then(succ => {
        let res = succ.data;
        if (!Util.CommAjaxCB(res)) return
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
