<template>
  <div id="home">
    <my-bg></my-bg>
    <!--  <div class="myform succ">
      <h3>今天不管饭，退下吧！</h3>
    </div> -->
    <div class="myform">
      <p>今天是{{orderDate | status}} {{week | getWeek}}</p>
      <h3>{{ userName  }}&nbsp;&nbsp;你今天已经点过餐了!</h3>
      <!-- <div class="userform-box">
        <el-button type="primary" @click="sub(true)" class="btn">是的我不想点了</el-button>
        <el-button type="primary" @click="sub(false)" class="btn">我再想想</el-button>
      </div> -->
    </div>
  </div>
</template>
<script>
import myBg from '@/components/myBg'
export default {
  name: 'UserReset',
  components: {
    myBg
  },
  data() {
    return {
      orderDate: '',
      week: ''

    }
  },
  created() { // created 组件创建完毕属性已经绑定但dom还未生成的状态
    this.userName = window.localStorage ? localStorage.getItem('userName') : Cookie.read("userName");

  },
  mounted() {
    // this.getIsOrder();
    this.orderDate = new Date();
    this.week = this.orderDate.getDay();
    // this.userName = window.localStorage ? localStorage.getItem('userName') : Cookie.read("userName");

  },
  methods: {
    // getIsOrder() {
    //   let ajax = "https://test.ywork.me/node/dinner/isOrder";
    //   this.$http.get(ajax).then(res => {
    //     let body = res.data;
    //   }, err => {
    //     console.log(err);
    //   })

    // }
  },
  filters: {
    status(val) {
      val = Number(val);
      if (val) {
        return new Date(val).Format('yyyy-MM-dd');
      }
    },
    getWeek(val) {
      let text = '获取数据失败';
      switch (val) {
        case 1:
          text = '星期一';
          break;
        case 2:
          text = '星期二';
          break;
        case 3:
          text = '星期三';
          break;
        case 4:
          text = '星期四';
          break;
        case 5:
          text = '星期五';
          break;
        case 6:
          text = '星期六';
          break;
        case 7:
          text = '星期日';
          break;
        default:
          text = '获取数据失败';
          break;
      }
      return text;
    }
  }
}

</script>
<style type="text/css">
@import "../less/main.css"

</style>
