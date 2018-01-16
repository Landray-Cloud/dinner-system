<template>
  <div class="userListBox">
    <div class="userListNav">
      <ul>
        <li @click="pages=1" :class="pages===1?'active':''">查询所有</li>
        <li @click="pages=2" :class="pages===2?'active':''">根据日期查询</li>
        <li @click="pages=3" :class="pages===3?'active':''">根据名字查询</li>
        <li @click="pages=4" :class="pages===4?'active':''">根据日期+名字查询</li>
      </ul>
    </div>
    <div class="usertable" v-if="pages===1">
      
      <el-table :data="tableData" stripe show-summary v-show="showGetList" :summary-method="getTotal">
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
    <div class="usertable" v-if="pages===2">
      这是点餐设置
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
      showGetList: true,
      showGetListOrder: false,
      showGetName: false,
      showGetDateName: false,
      pages: 1

    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 获取数据列表
    getData() {
      let ajaxURL = Util.ajaxHost + 'getList'
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
    // 筛选
    filterIsOrder(value, row) {
      return row.orderStatus === value;
    }
  }
}

</script>
<style>
@import "../less/main.css";
.userListBox {
  border: 1px solid #f3f4f3;
  position: relative;
  background-color: #fafafa;
}

.usertable {
  padding-left: 160px;
}

.userListNav {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 160px;
  height: 100%;
  background-color: #FAFAFA;
}

.userListNav li {
  height: 48px;
  line-height: 48px;
  padding-left: 10px;
  border-bottom: 1px solid #ebeef2;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  background-color: #FAFAFA;
}

.userListNav li.active {
  color: #409eff;
}

</style>
