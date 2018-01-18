<template>
  <div class="mainBg" id="home">
    <div class="mainbox">
      <h3 class="maintitle">{{ msg  }}</h3>
      <div class="myform-box">
        <!-- <el-input v-model="userName" placeholder="你的名字" class="winput" @keyup.enter.native="setShowUserForm"></el-input> -->
        <input class="unametext" v-model="userName" placeholder="你的名字" @keyup.13="setShowUserForm" />
        <el-button type="primary" @click="setShowUserForm" class="btn">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Util from '@/util.js';
export default {
  name: 'Index',
  data() {
    return {
      msg: '加班订餐系统',
      userName: window.localStorage ? localStorage.getItem('userName') : Cookie.read("userName"),
      week: new Date().getDay(),
      date: Util.getDate(new Date(), 'yyyy-MM-dd'),
      orderStatus: ''
    }
  },
  created() {
    this.getSubmit()
    if (this.userName) this.$router.push('UserForm')
    let week = this.week
  },
  mounted() {},
  methods: {
    // 判断是否通过
    setShowUserForm() {
      let userName = this.userName
      if (!Util.showUserForm(userName)) return
      // this.$confirm('姓名不要乱输，一旦提交不可修改?', '温馨提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      if (window.localStorage) {
        localStorage.setItem('userName', userName);
      } else {
        Cookie.write('userName', userName);
      }
      this.$router.push('UserForm')
      // }).catch(() => {});

    },
    // 获取某日是否可以提交加班订餐记录
    getSubmit() {
      let ajax = Util.ajaxHost + 'getSubmit?date=' + this.date
      this.$http.get(ajax).then(succ => {
        let res = succ.data
        if (!Util.commAjaxCB(res)) return
        this.orderStatus = res.data.status
        if (!this.orderStatus) this.$router.push('UserFail')
      }, err => {
        console.log(err)
      })
    }
  }
};

</script>
<style type="text/css">
@import "../less/main.css";

</style>
