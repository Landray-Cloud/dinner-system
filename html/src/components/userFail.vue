<template>
  <!-- <div class="mainBg" id="home"> -->
  <div class="mainbox" v-show="orderStatus">
    <h3 class="failtitle">当前非点餐提交时间段！</h3>
  </div>
  <!-- </div> -->
</template>
<script>
import Util from '@/util.js';
export default {
  name: 'user-fail',
  data() {
    return {
      orderDate: Util.getDate(new Date(), 'yyyy-MM-dd'),
      orderStatus: '',
      // userFailShow:false
    }
  },
  created() {
    this.getSubmit()
  },
  methods: {
    // 获取某日是否可以提交加班订餐记录
    getSubmit() {
      let ajax = Util.ajaxHost + 'getSubmit?date=' + this.orderDate
      this.$http.get(ajax).then(succ => {
        let res = succ.data
        if (!Util.commAjaxCB(res)) return
        this.orderStatus = res.data.status
        if (!this.orderStatus) {
          this.orderStatus = true
        } else {
          this.orderStatus = false
        }
        // return false
        // if (!this.orderStatus) this.$router.push('/')
        // if (!this.orderStatus) {
        //   this.userFailShow = true
        //   this.indexWarpShow = false

        // }
      }, err => {
        console.log(err)
      })
    }
  }
}

</script>
