<template>
  <div class="list" id="home">
    <my-bg></my-bg>
    <div class="myform">
      <h3>{{ msg  }}</h3>
      <div class="myform-box">
        <el-input v-model="name" placeholder="你的名字" class="winput" @keyup.13="showUserForm" @change="changeInput"></el-input>
        <el-button type="primary" @click="showUserForm" class="btn">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import myBg from '@/components/myBg';
export default {
  name: 'Index',
  components: {
    myBg
  },
  data() {
    return {
      msg: '点餐小系统',
      name: '',
      week: '' //星期
    }
  },
  created() {
    this.week = new Date().getDay();
    console.log(this.week);
    if (this.week === 2 || this.week === 4) {
      this.$router.push({
        name: 'Index'
      })
    } else {
      this.$router.push({
        name: 'UserFail'
      });
    }
    if (this.userName === null || this.userName === 'undefined' || this.userName === '') {
      this.$router.push('/');
    } else {
      this.$router.push({
        name: 'UserForm'
      });
    }
  },
  mounted() {

    this.name = window.localStorage ? localStorage.getItem('userName') : Cookie.read("userName");
  },
  methods: {
    changeInput() {

    },
    checkNum(val) {
      var regx = /^[0-9]*$/;
      if (regx.test(val)) {
        return true;
      } else {
        return false;
      }
    },
    showUserForm() {
      if (this.name === '' || this.name === null) {
        this.$message.error('请输入姓名');
        return false;
      }
      if (this.checkNum(this.name)) {
        this.$message.error('请不要输入数字或者字母！');
        return false;
      }
      if (this.name.length > 8) {
        this.$message.error('请不要胡乱输入');
        return false;
      }

      var orderTime = this.orderTime;
      orderTime = Date.parse(new Date());
      console.log(orderTime);
      var userName = this.name;
      if (window.localStorage) {
        localStorage.setItem('userName', userName);
      } else {
        Cookie.write('userName', userName);
      }

      this.$router.push({
        name: 'UserForm'
      })
    }
  }
};

</script>
<style type="text/css">
@import "../less/main.css";

</style>
