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
      msg: '加班订餐系统',
      userName: window.localStorage ? localStorage.getItem('userName') : Cookie.read("userName"),
      week: new Date().getDay()
    }
  },
  created() {
    if (this.userName) this.$router.push('UserForm')

    let week = this.week
    if (week !== 2 && week !== 4) this.$router.push('UserFail')
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
      let msg = '乖！输入你的真实姓名好不好?'

      if (userName === '' || userName === null) return this.$message.error(msg)

      if (this.checkNum(userName)) return this.$message.error(msg)

      if (userName.length > 4) return this.$message.error(msg)

      var orderTime = Date.parse(new Date());
      this.$confirm('姓名不要乱输，一旦提交不可修改?', '温馨提示', {
        confirmButtonText: '这是我的真名！',
        cancelButtonText: '我还是改一下吧',
        type: 'warning'
      }).then(() => {
        if (window.localStorage) {
          localStorage.setItem('userName', userName);
        } else {
          Cookie.write('userName', userName);
        }
        this.$router.push('UserForm')
      }).catch(() => { });

    }
  }
};

</script>
<style type="text/css">
@import "../less/main.css";

</style>
