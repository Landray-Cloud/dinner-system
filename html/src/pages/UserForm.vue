<template>
  <div id="home " v-show="bodyShow" class="mainBg main">
    <div class="userbox" :data="createItem">
      <p class="datap">今天是{{orderDate}} {{week}}</p>
      <h3 class="userFormTitle" v-if="!isAction"><p class="title">{{ userName  }} 是否加班订餐？</p></h3>
      <h3 class="maintitle macktitle" v-else><p class="title">{{ userName }}，你今天已选择<span class="pink">{{ orderText }}</span>如有变动，请联系娜娜</p></h3>
      <div class="checkbox" v-if="!isAction">
        <el-select v-model="orderStatus" placeholder="请选择">
          <el-option v-for="item in orderList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="userform-box" v-if="!isAction">
        <el-button type="primary" @click="sub" class="btn">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Util from '@/util.js';
export default {
  name: 'UserForm',
  data() {
    return {
      bodyShow: false, // false
      orderDate: Util.getDate(new Date(), 'yyyy-MM-dd'),
      userName: window.localStorage ? localStorage.getItem('userName') : Cookie.read("userName"),
      week: new Date().getDay(), //星期
      createItem: [], // 数据列表
      orderStatus: '', // 订餐状态
      orderText: '', // 显示用，订餐状态文字
      orderList: [{
        value: 1,
        label: '加班订餐'
      }, {
        value: 2,
        label: '加班不订餐'
      }, {
        value: 3,
        label: '不加班不订餐'
      }],
      // , {
      //   value: 4,
      //   label: '不加班订餐'
      // }
      isAction: false
    }
  },
  created() { // created 组件创建完毕属性已经绑定但dom还未生成的状态
    this.getIsAction()
    this.week = Util.getWeek(this.week);
    if (!this.userName) this.$router.push('/')
  },
  methods: {
    filterOrderStatus(orderStatus) {
      let text = '返回数据失败'
      switch (orderStatus) {
        case 1:
          text = '加班订餐';
          break;
        case 2:
          text = "加班不订餐";
          break;
        case 3:
          text = "不加班不订餐";
          break;
        case 4:
          text = "不加班订餐";
          break;
        case '':
          text = "获取失败";
          break;
        default:
          text = "获取失败"
          break;
      }
      return text
    },
    sub() {
      let orderTime = Date.parse(new Date());
      let name = this.userName
      let orderStatus = this.orderStatus
      let ajax = Util.ajaxHost + 'updateData'
      let params = { name, orderStatus }

      this.$http.post(ajax, params).then(succ => {
        let res = succ.data
        if (!Util.commAjaxCB(res)) return
        let createItem = res.data
        this.$router.push({ name: 'SubmitSucc' })
      }, err => {
        console.log(err)
      })
    },
    // 用户今天是否已做了选择
    getIsAction() {
      let ajax = Util.ajaxHost + "isAction?name=" + this.userName + '&orderDate=' + this.orderDate
      this.$http.get(ajax).then(succ => {
        let res = succ.data
        if (!Util.commAjaxCB(res)) return
        let _isAction = res.data.isAction || false
        this.isAction = _isAction
        if (_isAction) this.getOrderStatus()
        this.bodyShow = true
      }, err => {
        this.bodyShow = true
        console.log(err);
      })
    },
    // 用户今天的订餐状态
    getOrderStatus() {
      let ajax = Util.ajaxHost + "orderStatus?name=" + this.userName + '&orderDate=' + this.orderDate
      this.$http.get(ajax).then(succ => {
        let res = succ.data;
        if (!Util.commAjaxCB(res)) return
        let _orderStatus = res.data.orderStatus
        this.orderStatus = _orderStatus
        this.orderText = this.filterOrderStatus(_orderStatus)
      }, err => {
        this.bodyShow = true
        console.log(err);
      })
    }
  }
}

</script>
<style type="text/css">
@import "../less/main.css";

</style>
