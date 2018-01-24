<template>
  <div class=" mainBg">
    <!--中部开始-->
    <el-card class="login-card">
      <div class="text login-item">
        <h3>登录</h3>
        <ul class="login-box">
          <li class="uname">
            <el-input v-model="userName" type="text" placeholder="请输入用户名"></el-input>
          </li>
          <li class="pwd">
            <el-input v-model="pwd" type="password" @keyup.enter.native="loginSub" placeholder="请输入密码"></el-input>
          </li>
        </ul>
        <div class="login-btn">
          <el-button type="primary" @click="loginSub"> 登录</el-button>
        </div>
      </div>
    </el-card>
    <!--中部end-->
  </div>
</template>
<script>
import Util from '@/util.js';
export default {
  name: 'Login',
  data() {
    return {
      pwd: '',
      userName: ''
    }
  },
  methods: {
    loginSub() {
      let user = this.userName
      let pass = this.pwd
      let ajax = Util.ajaxHost + 'manager/login'
      let params = { user, pass }
      this.$http.post(ajax, params).then(succ => {
        let res = succ.data
        if (!Util.commAjaxCB(res)) return
        this.$router.push('UserList')
      }, err => {
        this.$message({ message: '登录失败，请联系管理员', type: 'error' })
      })
    }
  }
}

</script>
<style type="text/css">
@import "../less/main.css";

</style>
