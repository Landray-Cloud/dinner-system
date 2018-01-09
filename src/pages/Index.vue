<template>
  <div class="list" id="home">
    <my-bg></my-bg>
    <div class="myform">
      <h3>{{ msg  }}</h3>
      <div class="myform-box">
        <el-input v-model="name" placeholder="你的名字" class="winput" @keyup.13="showUserForm" ></el-input>
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
      name: ''
    }
  },
  mounted() {
    this.name = window.localStorage ? localStorage.getItem('userName') : Cookie.read("userName");
  },
  methods: {
    checkNum(val) {
      // var regx = /^[A-Za-z0-9]*$/;
      var regx = /^([a-zA-Z0-9\u4e00-\u9fa5]{4})$/;
      if (regx.test(val)) {
        return true;
      }else{
        return false;
      }
    },
    showUserForm() {
      if (this.name === '' || this.name === 'null') {
        alert('请输入有效姓名');
        return false;
      }
      if (this.checkNum(this.name)) {
        alert('请不要输入数字或者字母！');
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
