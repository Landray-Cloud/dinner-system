<template>
  <div class="mainBg" id="home">
    <user-fail v-if="orderStatusFail"></user-fail>
    <div class="mainbox" v-else>
      <h3 class="maintitle">{{ msg  }}</h3>
      <div class="myform-box">
        <div class="useripbox">
          <el-input v-model="userName" placeholder="你的名字" @keyup.enter.native="setShowUserForm"></el-input>
        </div>
        <el-button type="primary" @click="setShowUserForm" class="btn fr" :loading="indexLoading">提交</el-button>
      </div>
    </div>
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
      orderDate: Util.getDate(new Date(), 'yyyy-MM-dd'),
      orderMain: false,
      orderStatusFail: '',
      indexLoading: false
    }
  },
  created() {
    this.getSubmit()
    if (this.userName) this.$router.push('UserForm')
    let week = this.week
  },
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

    },
    // 获取某日是否可以提交加班订餐记录
    getSubmit() {
      let ajax = Util.ajaxHost + 'getSubmit?date=' + this.orderDate
      this.$http.get(ajax).then(succ => {
        let res = succ.data
        if (!Util.commAjaxCB(res)) return
        this.orderStatusFail = res.data.status
        if (!this.orderStatusFail) {
          this.orderStatusFail = true
        } else {
          this.orderStatusFail = false
        }
      }, err => {
        console.log(err)
      })
    }
  }
};

</script>
<style type="text/css">
@import "../less/main.css";
.useripbox {
  width: 72%;
  display: inline-block;
}

</style>
