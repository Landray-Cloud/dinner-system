<template>
  <div class="listwarp">
    <p class="datep">{{orderTime}}</p>
    <el-button type="primary" @click="cleanList">清除数据</el-button>
    <div class="listwarp-box">
      <el-table :data="tableData" stripe class="table">
        <el-table-column prop="orderTime" label="日期" width="100%">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="100%">
        </el-table-column>
        <el-table-column  label="是否点晚餐">
          <template scope="scope">
            {{tableData[scope.$index].isOrder == 'true' ? '是' : '否'}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'list',
  data() {
    return {
      tableData: [],
      orderTime: ''
    }
  },
  mounted() {

    this.getData()
  },
  methods: {
    // 获取数据列表
    getData() {
      let d = new Date()
      let day = d.getDate()
      let month = d.getMonth() + 1
      let year = d.getFullYear()
      this.listwarp = year + '-' + month + '-' + day
      let ajaxURL = 'https://test.ywork.me/node/dinner/getData'

      this.$http.get(ajaxURL).then(res => {
        let body = res.data
        if (typeof res === 'undefined' || res === null) {
          alert('集合返回失败，请联系管理员');
          return false;
        }
        let errcode = res.data.errcode;
        if (typeof errcode === 'undefined' || errcode === null || errcode !== 0) {
          let toastMsg = '系统繁忙';
          let errmsg = res.data.errmsg;
          if (typeof errcode !== 'undefined' && errmsg !== null || errmsg !== '') {
            toastMsg = errmsg;
          }
          if (typeof errcode === 'number') {
            toastMsg += '返回码：' + errcode;
          }
          if (errcode === -1001) {
            return false;
          }
        }
        let data = body.data

        this.tableData = data
      }, err => {
        console.error(err)
      })
    },
    // 清除数据
    cleanList() {
      let ajaxURL = 'https://test.ywork.me/node/dinner/cleanData'
      this.$http.get(ajaxURL).then(res => {
        let body = res.data
        let data = body.data
        this.tableData = data

      }, err => {
        console.log(err)

      })
    }
  }
}

</script>
<style>
.listwarp {
  margin: 8px;
  box-sizing: border-box;
  position: relative;
}

.datep {
  display: inline-block;
  font-size: 20px;
  text-align: left;
  float: left;
  margin: 20px 0 0 10px;
}

.listwarp button {
  position: absolute;
  right: 0;
  top: 20px;
}

.listwarp-box {
  position: relative;
  top: 80px;
  margin: 0 auto;
  width: 50%;
  border: 1px solid #c2c2c2;
}

@media screen (min-width: 1200px) {
  .listwarp {
    width: 50%;
    border: 1px solid red;
  }
}

@media (max-width: 480px) {
  .listwarp-box {
    width: 100%;
  }
}

.el-table th {
  text-align: center;
}

</style>
