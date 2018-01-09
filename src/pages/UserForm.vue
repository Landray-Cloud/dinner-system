<template>
  <div class="list" id="home">
    <my-bg></my-bg>
    <div class="myform" :data="createItem">
      <p>今天是{{orderDate | status}} {{week | getWeek}}</p>
      <h3>{{ userName  }}是否点餐？</h3>
      <div class="userform-box">
        <el-button type="primary" @click="sub(true)" class="btn">是</el-button>
        <el-button type="primary" @click="sub(false)" class="btn">否</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import myBg from '@/components/myBg'
export default {
  name: 'UserForm',
  components: {
    myBg
  },
  data() {
    return {
      orderDate: '',
      userName: '',
      week: '', //星期
      createItem: []
    }
  },
  created() { // created 组件创建完毕属性已经绑定但dom还未生成的状态
    this.userName = window.localStorage ? localStorage.getItem('userName') : Cookie.read("userName");
    // console.log(this.userName);
    if (this.userName === null || this.userName === 'undefined' || this.userName === '') {
      this.$router.push('/');
    } else {
      this.$router.push({
        name: 'UserForm'
      });
    }
  },
  mounted() {
    this.orderDate = new Date();
    this.week = this.orderDate.getDay();
    // this.userName = window.localStorage ? localStorage.getItem('userName') : Cookie.read("userName");

  },
  methods: {
    sub(isOrder) {
      let orderTime = Date.parse(new Date());
      let userName = this.userName;
      if (window.localStorage) {
        localStorage.setItem('userName', userName);
      } else {
        Cookie.write('userName', userName)
      }
      // if (this.week === 2 || this.week !== 4) {
      //   this.$router.push({
      //     name: 'UserFail'
      //   })
      //   return;
      // }
      let ajax = 'https://test.ywork.me/node/dinner/insertData?name=' + userName + '&isOrder=' + isOrder + '&orderTime=' + orderTime;
      this.$http.get(ajax).then(res => {
        let body = res.data
        if (typeof res === 'undefined' || res === null) {
          alert('集合返回失败，请联系管理员')
        }
        let errcode = res.data.errcode;
        if (typeof errcode === 'undefined' || errcode === null || errcode !== 0) {
          let toastMsg = '系统繁忙'
          let errmsg = res.data.errmsg

          if (typeof errcode !== 'undefined' && errmsg !== null || errmsg !== '') {
            toastMsg = errmsg
          }
          if (typeof errcode === 'number') {
            toastMsg += '返回码：' + errcode
          }
        }
        let data = body.data
        this.createItem = data;
        this.$router.push({
          name: 'SubmitSucc'
        })

      }, err => {
        console.log(err)
      })
    }
  },
  filters: {
    status(val) {
      val = Number(val);
      if (val) {
        return new Date(val).Format('yyyy-MM-dd');
      }
    },
    getWeek(val) {
      let text = '获取数据失败';
      switch (val) {
        case 1:
          text = '星期一';
          break;
        case 2:
          text = '星期二';
          break;
        case 3:
          text = '星期三';
          break;
        case 4:
          text = '星期四';
          break;
        case 5:
          text = '星期五';
          break;
        case 6:
          text = '星期六';
          break;
        case 7:
          text = '星期日';
          break;
        default:
          text = '获取数据失败';
          break;
      }
      return text;
    }
  }
}

</script>
<style type="text/css">
@import "../less/main.css";

</style>
