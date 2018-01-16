<template>
  <div class="mainBg" id="home">
    <div class="mainbox">
      <h3 class="maintitle">{{ msg  }}</h3>
      <div class="myform-box">
        <el-input v-model="userName" placeholder="你的名字" class="winput" @keyup.13="showUserForm"></el-input>
        <el-button type="primary" @click="showUserForm" class="btn">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'Index',
  data() {
    return {
      msg: '点餐小系统',
      userName: window.localStorage ? localStorage.getItem('userName') : Cookie.read("userName"),
      week: new Date().getDay()
    }
  },
  created() {
    if (this.userName) this.$router.push('UserForm')

    let week = this.week
    // if (week !== 2 && week !== 4) this.$router.push('UserFail')
    if (week === 2 && week === 4) this.$router.push('UserFail')
  },
  mounted() {},
  methods: {
    checkNum(val) {
      var regx = /^[A-Za-z0-9]*$/;
      if (regx.test(val)) {
        return true;
      } else {
        return false;
      }
    },
    showUserForm() {
      let userName = this.userName;

      if (userName === '' || userName === null) return this.$message.error('请输入姓名');

      if (this.checkNum(userName)) return this.$message.error('请不要输入数字或者字母！');

      if (userName.length > 4) return this.$message.error('姓名最长不能超过4个字符');

      var orderTime = Date.parse(new Date());

      if (window.localStorage) {
        localStorage.setItem('userName', userName);
      } else {
        Cookie.write('userName', userName);
      }

      this.$router.push('UserForm')
    }
  }
};

</script>
<style type="text/css">
@import "../less/main.css";

</style>
