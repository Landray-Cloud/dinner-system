<template>
  <div class="usertable">
    <div class="selectList">
      <h3 class="selectList-title">查数据</h3>
      <ul>
        <li><span class="selectTitle">名字：</span>
          <el-input v-model="selectInp" placeholder="请输入姓名" class="selectName"></el-input>
        </li>
        <li><span class="selectTitle">日期：</span>
          <el-date-picker v-model="selectDate" type="date" placeholder="选择日期"></el-date-picker>
        </li>
        <li>
          <el-button type="primary" icon="el-icon-search" @click="getDate">查询</el-button>
          <el-button icon="el-icon-search" @click="getReset">重置</el-button>
        </li>
      </ul>
      <el-table :data="tableData" stripe show-summary :summary-method="getTotal" class="el-table">
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column label="日期">
          <template slot-scope="scope">
            {{tableData[scope.$index].orderTime}}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="orderStatus" label="是/否订餐" :filters="filters" :filter-method="filterIsOrder">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.orderStatus === 1">加班点餐</el-tag>
            <el-tag type="success" v-if="scope.row.orderStatus === 2">加班不点餐</el-tag>
            <el-tag type="warning" v-if="scope.row.orderStatus === 3">不加班不点餐</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import Util from '@/util.js';
export default {
  name: 'userListSelect',
  data() {
    return {
      selectInp: '', // 输入名字
      selectDate: '', // 日期
      tableData: [],
      name:''
    }
  },
  methods: {
    // 获取数据列表
    getDate() {
      let selectInp = this.selectInp
      let selectDate = Util.getDate(this.selectDate, 'yyyy-MM-dd')
      let ajaxURL = Util.ajaxHost + 'getList'

      if (selectInp && selectDate) {
        ajaxURL += '?name=' + selectInp + '&orderDate=' + selectDate
      } else if (selectInp) {
        ajaxURL += '?name=' + selectInp
      } else if (selectDate) {
        ajaxURL += '?orderDate=' + selectDate
      }
      this.$http.get(ajaxURL).then(succ => {
        let res = succ.data
        if (!Util.commAjaxCB(res)) return
        let data = res.data
        for (var i in data) {
          data[i].orderTime = Util.getDate(data[i].orderTime, 'yyyy-MM-dd hh:ss');
        }
        this.tableData = data
      }, err => {
        console.error(err)
      })
    },
    // 重置
    getReset() {
      this.selectInp = ''
      this.selectDate = ''
    },
    // 统计
    getTotal(parem) {
      return ['总计', '', '', parem.data.length]
    },
    // 删除
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
  }

}

</script>
<style type="text/css">
  @import "../less/main.css";
</style>
