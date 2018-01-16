<template>
  <div id="home" class="mainBg">
    <div class="mainbox succ">
      <h3 class="maintitle">感谢您的付出！</h3>
      <div class="reset-btn">
        <el-button type="primary" @click="getReturn">返回</el-button>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'SubmitSucc',
  data() {
    return {}
  },
  methods: {
    getReturn() {
      this.$router.push('UserForm')
    }
  }
}

</script>
<style type="text/css">
@import "../less/main.css";

</style>
