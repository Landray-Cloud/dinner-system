<template>
  <div id="home">
    <my-bg></my-bg>
    <div class="myform reset-warp" v-show="showOrder">
      <p>今天是{{orderDate}} {{week}}</p>
      <h3>{{ userName  }}&nbsp;&nbsp;你今天已经点过餐了!<br/>是不是改变主意了？</h3>
      <div class="userform-box reset-btn">
        <el-button type="primary" @click="sub(true)" class="btn">是的我不想点餐了</el-button>
        <el-button type="primary" @click="sub(false)" class="btn">那我还是不改了</el-button>
      </div>
    </div>
    <!-- 没点餐 -->
    <div class="myform reset-warp" v-show="nOrder">
      <p>今天是{{orderDate}} {{week}}</p>
      <h3>{{ userName  }}&nbsp;&nbsp;你今天还没有点过餐!<br/>是不是改变主意了？</h3>
      <div class="userform-box reset-btn">
        <el-button type="primary" @click="sub(true)" class="btn">是的工作使我快乐</el-button>
        <el-button type="primary" @click="sub(false)" class="btn">我还是不想点</el-button>
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
      orderDate: new Date(),
      week: new Date().getDay(),
      showOrder: true,
      nOrder: false

    }
  },
  created() { // created 组件创建完毕属性已经绑定但dom还未生成的状态
    let userName = this.userName = window.localStorage ? localStorage.getItem('userName') : Cookie.read("userName");
    this.orderDate = Util.getDate(this.orderDate, 'yyyy-MM-dd')
    this.week = Util.getWeek(this.week)
    if (userName === null || userName === 'undefined') return this.$router.push('/')


  },
  methods: {
    getIsOrder() {
      let ajax = Util.ajaxHost + 'isOrder?name=' + userName;
      this.$http.get(ajax).then(succ => {
        let res = succ.data
        if (Util.CommAjaxCB(res)) return
        if (!res.data.isOrder) {
          this.nOrder = true
          this.showOrder = false
        }

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
