<template>
  <div class="userListBox">
    <div class="userListNav">
      <ul>
        <li @click="pages=1" :class="pages===1?'active':''">查询所有</li>
        <li @click="pages=2" :class="pages===2?'active':''">点餐设置</li>
        <li @click="pages=3" :class="pages===3?'active':''">管理员管理</li>
      </ul>
    </div>
    <div class="usertable" v-if="pages===1">
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
          </li>
        </ul>
        <el-table :data="tableData" stripe show-summary :summary-method="getTotal">
          <el-table-column type="index" label="序号">
          </el-table-column>
          <el-table-column label="日期">
            <template slot-scope="scope">
              {{tableData[scope.$index].orderTime}}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="orderStatus" sortable label="是/否订餐" :filters="filters" :filter-method="filterIsOrder">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.orderStatus === 1">加班点餐</el-tag>
              <el-tag type="success" v-if="scope.row.orderStatus === 2">加班不点餐</el-tag>
              <el-tag type="warning" v-if="scope.row.orderStatus === 3">不加班不点餐</el-tag>
              <el-tag type="danger" v-if="scope.row.orderStatus === 4">不加班点餐</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="usertable" v-if="pages===2">
      <div class="selectList">
        <h3 class="selectList-title">点餐设置</h3>
        <div class="orderSet">
          <p class="newDate">今天是{{newDate}}，{{week}}</p>
          <p class="updateSet">今天点餐状态：
            <el-select v-model="selectSubmit" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </p>
          <el-button type="primary" class="orderSetBtn" @click="getOrderSet">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Util from '@/util.js';
export default {
  name: 'UserList',
  data() {
    return {
      filters: [{ text: '加班点餐', value: 1 }, { text: '加班不点餐', value: 2 }, { text: '不加班不点餐', value: 3 }, { text: '不加班点餐', value: 4 }],
      tableData: [],
      pages: 1,
      newDate: Util.getDate(new Date(), 'yyyy-MM-dd'),
      week: Util.getWeek(new Date().getDay()), //星期
      selectDate: '', // 查询日期
      selectInp: '', // 查询名字
      selectSubmit: '', // 点餐设置下拉框
      options: [{
        value: 0,
        label: '不允许提交'
      }, {
        value: 1,
        label: '允许提交'
      }]
    }
  },
  mounted() {
    this.getDate()

  },
  methods: {
    // 获取数据列表
    getDate() {
      let selectInp = this.selectInp
      let selectDate = Util.getDate(this.selectDate, 'yyyy-MM-dd')
      let ajaxURL = Util.ajaxHost + 'getList'

      if (selectInp && selectDate) {
      	ajaxURL += '?name=' + selectDate + '&selectDate=' + selectDate
      }else if (selectInp) {
      	ajaxURL += '?name=' + selectInp
      } else if (selectDate) {
      	ajaxURL += '?selectDate=' + selectDate
      }

      // let ajaxURL = Util.ajaxHost + 'getList?name=' + this.selectInp + '&orderDate=' + selectDate
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
    // 统计
    getTotal(param) {
      return ['合计', '', '', param.data.length]
    },
    // 点餐设置提交
    getOrderSet(){

    },
    // 筛选
    filterIsOrder(value, row) {
      return row.orderStatus === value;
    }
  }
}

</script>
<style>
@import "../less/main.css";

</style>
