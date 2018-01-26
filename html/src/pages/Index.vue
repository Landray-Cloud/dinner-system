<template>
  <div class="mainBg" id="home">
    <user-fail></user-fail>
    <div class="mainbox" v-show="indexWarpShow">
      <h3 class="maintitle">{{ msg  }}</h3>
      <div class="myform-box">
        <!-- <el-input v-model="userName" placeholder="你的名字" class="winput" @keyup.enter.native="setShowUserForm"></el-input> -->
        <input class="unametext" v-model="userName" placeholder="你的名字" @keyup.13="setShowUserForm" />
        <el-button type="primary" @click="setShowUserForm" class="btn fr" :loading="indexLoading">提交</el-button>
      </div>
    </div>
    <!-- <div class="mainbox" v-show="userFailShow">
      <h3 class="failtitle">当前非点餐提交时间段！</h3>
    </div> -->
  </div>
</template>
<script>
import Util from '@/util.js';
import userFail from '@/components/userFail'
export default {
  name: 'Index',
  components: {
    userFail
  },
  data() {
    return {
      msg: '加班订餐系统',
      userName: window.localStorage ? localStorage.getItem('DiCaprio') : Cookie.read("DiCaprio"),
      week: new Date().getDay(),
      // orderDate: Util.getDate(new Date(), 'yyyy-MM-dd'),
      // orderStatus: '',
      indexWarpShow: true,
      // userFailShow: false
      indexLoading: false
    }
  },
  created() {
    // this.getSubmit()
    if (this.userName) this.$router.push('UserForm')
    let week = this.week
  },
  mounted() {},
  methods: {
    // 判断是否通过
    setShowUserForm() {
      let userName = this.userName
      if (!Util.showUserForm(userName)) return
      this.indexLoading = true
      this.$confirm('姓名不要乱输，一旦提交不可修改?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

      }).then(() => {
        this.indexLoading = false
        let upsid = Util.setToken(userName)
        if (window.localStorage) {
          localStorage.setItem('DiCaprio', upsid);
        } else {
          Cookie.write('DiCaprio', upsid);
        }
        this.$router.push('UserForm')
      }).catch(() => {});

    }
    // 获取某日是否可以提交加班订餐记录
    // getSubmit() {
    //   let ajax = Util.ajaxHost + 'getSubmit?date=' + this.orderDate
    //   this.$http.get(ajax).then(succ => {
    //     let res = succ.data
    //     if (!Util.commAjaxCB(res)) return
    //     this.orderStatus = res.data.status
    //     // if (!this.orderStatus) this.$router.push('UserFail')
    //     if (!this.orderStatus) {
    //       this.userFailShow = true
    //       this.indexWarpShow = false

    //     }
    //   }, err => {
    //     console.log(err)
    //   })
    // }
  }
};

</script>
<style type="text/css">
@import "../less/main.css";

</style>
