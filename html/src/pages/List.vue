<template>
  <div id="home" class="mainBg">
    <div class="listwarp">
      <!--       <el-button type="primary" @click="dialogCleanList = true">清除数据</el-button> -->
      <!-- <div class="block">
        <span class="demonstration">默认</span>
        <el-date-picker v-model="value1" type="date" placeholder="选择日期">
        </el-date-picker>
      </div> -->
      <div class="listwarp-box">
        <!-- :summary-method="getSummaries"  -->
        <el-table :data="tableData" stripe class="table" show-summary>
          <el-table-column type="index" label="序号">
          </el-table-column>
          <el-table-column label="日期">
            <template slot-scope="scope">
              {{tableData[scope.$index].orderTime}}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="orderStatus" sortable label="是/否点订餐" :filters="[{ text: '是', value: 1 }, { text: '加班不点餐', value: 2 },{ text: '不加班不点餐', value: 3},{ text: '不加班点餐', value: 4 }]" :filter-method="filterIsOrder">
            <template slot-scope="scope">
              <el-tag :type="scope.row.orderStatus === true ? 'success' : 'primary'">{{scope.row.orderStatus?'点餐':'不点餐'}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 清除数据弹出框 -->
    <el-dialog title="清除数据" :visible.sync="dialogCleanList">
      <el-input v-model="cleanPass" placeholder="输入总统安全密码"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="cleanList">全部清除！</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Util from '@/util.js';
export default {
  name: 'list',
  data() {
    return {
      dialogCleanList: false,
      cleanPass: '',
      tableData: [],
      sums: 0 // 合计
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
    // 清除数据
    cleanList() {
      let cleanPass = this.cleanPass
      if (!cleanPass) return this.dialogCleanList = false
      let ajaxURL = Util.ajaxHost + 'cleanList?pass=' + cleanPass
      this.$http.get(ajaxURL).then(succ => {
        let res = succ.data
        if (!Util.commAjaxNoDataCB(res)) return
        this.tableData = []
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.dialogCleanList = false
      }, err => {
        console.log(err)
      })
    },
    // 某用户某天的点餐状态
    getOrderStatus() {
      let ajax = Util.ajaxHost + "orderStatus?name=" + this.userName + '&orderDate=' + this.orderDate
      this.$http.get(ajax).then(succ => {
        let res = succ.data;
        if (!Util.commAjaxCB(res)) return
        this.tableData = res.data
      }, err => {
        this.bodyShow = true
        console.log(err);
      })
    },
    // 筛选
    filterIsOrder(value, row) {
      return row.orderStatus === value;
    }
    // getSummaries(param) {
    //     const { columns, data } = param;
    //     const sums = [];
    //     columns.forEach((column, index) => {
    //       if (index === 0) {
    //         sums[index] = '统计';
    //         return;
    //       }
    //       const values = data.map(item => Number(item[data.isOrder]));
    //       if (!values.every(value => isNaN(value))) {
    //         sums[index] = values.reduce((prev, curr) => {
    //           const value = Number(curr);
    //           if (!isNaN(value)) {
    //             return prev + curr;
    //           } else {
    //             return prev;
    //           }
    //         }, 0);
    //         sums[index] += ' 元';
    //       } else {
    //         sums[index] = 'N/A';
    //       }
    //     });

    //     return sums;
    //   }
    // 统计
    // getNum(tableDataItem) {
    //   const { columns, data } = tableDataItem
    //   console.log(data)
    //   let sums = []
    //   columns.forEach((columns, index) => {
    //     if (index === 0) {
    //       sums[index] = '统计'
    //       return
    //     }
    //     const values = data.map(item =>Number(item[data.isOrder]))
    //     console.log(values)
    //     if(!values.every(value =>isNaN(value))){
    //       alert(1)
    //     }else{
    //       sums[index] = 'N/A'
    //     }
    //   })
    //   return sums
    //   // this.tableData = tableDataItem
    //   // this.sums = 0
    //   // for (let i = 0, len = tableDataItem.length; i < len; i++) {
    //   //   if (typeof tableDataItem[i].isOrder === Boolean) {
    //   //     tableDataItem[i].isOrder = Number(tableDataItem[i].isOrder)

    //   //   };
    //   //   this.sums += tableDataItem[i].isOrder
    //   // }
    //   // let tableDataItem = this.tableData
    //   // let j = 0
    //   // for (j; j < tableDataItem.length; j++) {
    //   // console.log(tableDataItem)
    //   // }
    // }
  }
}

</script>
<style>
@import "../less/main.css";

</style>
