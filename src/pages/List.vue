<template>
  <div id="home">
    <my-bg></my-bg>
    <div class="listwarp">
      <el-button type="primary" @click="cleanList">清除数据</el-button>
      <div class="listwarp-box">
        <!-- show-summary 合计 -->
        <el-table :data="tableData" stripe class="table" :default-sort="{prop:'isOrder'}">
          <el-table-column type="index" label="序号">
          </el-table-column>
          <el-table-column label="日期">
            <template slot-scope="scope">
              {{tableData[scope.$index].orderTime | status}}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <!-- sortable -->
          <el-table-column label="是否点晚餐">
            <template slot-scope="scope">
              {{tableData[scope.$index].isOrder ? '是' : '否'}}
            </template>
          </el-table-column>
          <el-table-column prop="mac" label="Mac地址">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import Util from '@/util.js';
import myBg from '@/components/myBg'
export default {
  name: 'list',
  components: {
    myBg
  },
  data() {
    return {
      tableData: [],
      // orderTime: ''
    }
  },
  mounted() {

    this.getData()
  },
  methods: {
    // 获取数据列表
    getData() {
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
    // 点餐排序
    // changeIsOrder(){

    // }
  },
  filters: {

    status(val) {
      val = Number(val);
      if (val) {
        return new Date(val).Format('yyyy-MM-dd hh:mm:ss');
      }
    }
  }
}

</script>
<style>
@import "../less/main.css";
.listwarp {
  /*margin: 8px;*/
  position: absolute;
  left: 25%;
  top: 0;
  margin: 0 auto;
  width: 50%;
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
  margin: 0 auto 40px;
  width: 100%;
  border: 1px solid #c2c2c2;
}

@media screen (min-width: 1200px) {
  .listwarp {
    width: 50%;
    border: 1px solid red;
  }
}

@media (max-width: 480px) {
  .listwarp {
    width: 92%;
    height: 100%;
    position: absolute;
    left: 4%;
    top: 0;
  }
  .listwarp-box {
    box-sizing: border-box;
    width: 100%;
  }
}

.el-table th {
  background: #ecf5ff;
}

.el-table th,
td {
  text-align: center;
}

</style>
