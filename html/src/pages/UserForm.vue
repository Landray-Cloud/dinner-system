<template>
  <div id="home " class="mainBg main">
    <user-fail v-if="orderStatusFail"></user-fail>
    <div v-else>
      <el-form ref="form" :data="createItem" label-width="80px" class="user-elform" v-show="bodyShow" v-loading.body="ufLoading">
        <p class="datap">今天是{{orderDate}}<span @click="addClick">{{week}}</span> </p>
        <h3 class="userFormTitle" v-if="!isAction"><p class="title">{{computUserName }} 是否加班订餐？</p></h3>
        <h3 class=" mackText" v-else><p class="title">{{ computUserName }}，你今天已选择<span class="pink">{{ orderText }}</span>，如有变动，请联系新梅！</p></h3>
        <div class="elform-box">
          <el-form-item label="操作" v-if="!isAction" class="ufelform-item">
            <el-select v-model="orderStatus" placeholder="请选择">
              <el-option v-for="item in orderList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="外卖名称" v-if="!isAction" class="ufelform-item">
            <el-select v-model="cake" placeholder="请选择外卖名称，遵从少数服从多数原则">
              <template v-if="week==='星期二'">
                <el-option v-for="item in options2" :key="item.label" :label="item.label" :value="item.label">
                </el-option>
              </template>
              <template v-if="week==='星期四'">
                <el-option v-for="item in options4" :key="item.label" :label="item.label" :value="item.label">
                </el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" v-if="!isAction" class="ufelform-item">
            <el-input v-model="remarks" placeholder="因为什么项目而加班"></el-input>
          </el-form-item>
          <div v-if="!isAction" class="ufelform-btn">
            <el-button type="primary" @click="getAddList" class="btn" :loading="ufLoadingBtn">提交</el-button>
          </div>
        </div>
      </el-form>
      <el-card class="box-card" v-show="promptSucc">
        <div class="box-cardbox">
          <h3 class="maintitle macktitle thanktitle">感谢您的付出！</h3>
          <div class="reset-btn">
            <el-button type="primary" @click="getReturn">返回</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import Util from '@/util.js';
import userFail from '@/components/userFail'
export default {
  name: 'UserForm',
  components: {
    userFail
  },
  computed: {
    computUserName() {
      let userName = this.userName
      let nameToken = Util.getToken(userName)
      userName = nameToken.userName
      return userName
    }
  },
  data() {
    return {
      bodyShow: true, // false
      promptSucc: false,
      orderDate: Util.getDate(new Date(), 'yyyy-MM-dd'),
      userName: window.localStorage ? localStorage.getItem('DiCaprio') : Cookie.read("DiCaprio"),
      week: new Date().getDay(), //星期
      createItem: [], // 数据列表
      orderStatus: '', // 订餐状态
      orderStatusFail: '',
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
      options2: [
        { label: '真功夫(快餐)', value: 1 }, { label: '永和豆浆(快餐)', value: 2 }, { label: '米多面多', value: 3 }, { label: '潮梅里卤鹅', value: 4 }
      ],
      options4: [
        { label: '壹定食(快餐)', value: 1 }, { label: '吃个汤(椰子汤)', value: 2 }, { label: '粮仓满满(偏辣)', value: 3 }, { label: 'E顿饭(快餐)', value: 4 }
      ],
      isAction: '',
      clickCount: 0,
      cake: '', // 外卖名称
      remarks: '', // 订餐备注
      ufLoading: true,
      ufLoadingBtn: false,
      tfStatus: '', // 手否允许点餐
      userFailShow: false
    }
  },

  created() { // created 组件创建完毕属性已经绑定但dom还未生成的状态
    this.getSubmit()
    if (!this.userName) return this.$router.push('/')
    this.getIsAction()
    this.week = Util.getWeek(this.week);

  },
  methods: {
    getAddList() {
      let orderTime = Date.parse(new Date());
      let name = this.computUserName
      let remarks = `[${this.cake}]` + this.remarks
      if (!Util.showUserForm(name)) return
      let orderStatus = this.orderStatus
      if (!orderStatus) return this.$message({ message: '请选择您的操作！', type: 'error' })
      this.ufLoadingBtn = true
      let ajax = Util.ajaxHost + 'addOrder'
      let params = { name, orderStatus, remarks }
      this.$http.post(ajax, params).then(succ => {
        this.ufLoadingBtn = false
        let res = succ.data
        if (!Util.commAjaxCB(res)) return
        let createItem = res.data
        this.bodyShow = false
        this.promptSucc = true
      }, err => {
        console.log(err)
      })
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
    },
    addClick() {
      this.clickCount = this.clickCount + 1
      if (this.clickCount < 10) return
      localStorage.removeItem('DiCaprio')
      location.reload()
    },
    // 用户今天是否已做了选择
    getIsAction() {
      this.ufLoading = true
      let name = this.computUserName
      let ajax = Util.ajaxHost + "isAction?name=" + name + '&orderDate=' + this.orderDate
      this.$http.get(ajax).then(succ => {
        this.ufLoading = false
        let res = succ.data
        if (!Util.commAjaxCB(res)) return
        let _isAction = res.data.isAction || false
        this.isAction = _isAction
        if (_isAction) this.getOrderStatus()
        this.bodyShow = true
      }, err => {
        this.loading = false
        this.bodyShow = false
        console.log(err);
      })
    },
    // 用户今天的订餐状态
    getOrderStatus() {
      let name = this.computUserName
      let ajax = Util.ajaxHost + "orderStatus?name=" + name + '&orderDate=' + this.orderDate
      this.$http.get(ajax).then(succ => {
        let res = succ.data;
        if (!Util.commAjaxCB(res)) return
        let _orderStatus = res.data.orderStatus
        this.orderStatus = _orderStatus
        this.orderText = Util.filterOrderStatus(_orderStatus)
      }, err => {
        this.bodyShow = true
        console.log(err);
      })
    },
    // 返回
    getReturn() {
      this.getIsAction()
      this.promptSucc = false
    }
  }
}

</script>
<style type="text/css">
@import "../less/main.css";
.user-elform {
  background: #fff;
  padding: 15px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 6px;
  width: 500px;
  height: 400px;
  position: absolute;
  top: 50%;
  margin: -180px 0 0 -250px;
  left: 50%;
}

.elform-box {
  margin: 0 auto;
  width: 80%;
  margin: 0 auto;
}


.elform-box .el-select,
.elform-box .el-input {
  width: 300px;
}


.ufelform-btn {
  width: 60%;
  display: block;
  margin: 0 auto;
}

.ufelform-btn button {
  width: 60%;
  display: block;
  margin: 20% auto 0;
}

@media screen and (max-width: 414px) {
  .user-elform {
    background: #fff;
    padding: 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 6px;
    position: absolute;
    top: 50%;
    height: 450px;
    margin: -50% 0 0 -50%;
    left: 50%;
    width: 100%;
  }
  .elform-box {
    width: 100%;
  }
  .ufelform-btn {
    width: 60%;
    display: block;
    margin: 0 auto;
  }
  /*  .elform-box .el-select{
    width: 98%;
  }*/
  .ufelform-item {
    width: 90%;
  }
  .elform-box .el-select,
  .elform-box .el-input {
    width: 100%;
  }
  /* .elform-box input{
    width: 217px;
  }*/
}

</style>
