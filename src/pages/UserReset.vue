<template>
  <div id="home">
    <my-bg></my-bg>
    <!--  <div class="myform succ">
      <h3>今天不管饭，退下吧！</h3>
    </div> -->
    <div class="myform">
      <p>今天是{{orderDate}} {{week}}</p>
      <h3>{{ userName  }}&nbsp;&nbsp;你今天已经点过餐了!</h3>
      <!-- <div class="userform-box">
        <el-button type="primary" @click="sub(true)" class="btn">是的我不想点了</el-button>
        <el-button type="primary" @click="sub(false)" class="btn">我再想想</el-button>
      </div> -->
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
      orderDate: new Date(),
      week: new Date().getDay()

    }
  },
  created() { // created 组件创建完毕属性已经绑定但dom还未生成的状态
    this.userName = window.localStorage ? localStorage.getItem('userName') : Cookie.read("userName");
    this.orderDate = Util.getDate(this.orderDate,'yyyy-MM-dd')
    this.week = Util.getWeek(this.week)

  },
  methods: {}
}

</script>
<style type="text/css">
@import "../less/main.css"

</style>
