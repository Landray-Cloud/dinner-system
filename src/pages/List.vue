<template>
  <div id="home">
    <my-bg></my-bg>
    <div class="listwarp">
      <el-button type="primary" @click="dialogCleanList = true">清除数据</el-button>
      <div class="listwarp-box">
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
          <el-table-column prop="isOrder" label="是/否点晚餐" :filters="[{ text: '是', value: true }, { text: '否', value: false }]" :filter-method="filterIsOrder">
            <template slot-scope="scope">
              <el-tag :type="scope.row.isOrder === true ? 'success' : 'primary'">{{scope.row.isOrder?'是':'否'}}</el-tag>
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
<script src="//unpkg.com/element-ui@1.3.4/lib/index.js"></script>
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
      dialogCleanList: false,
      cleanPass: '',
      tableData: []
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
        if (!Util.CommAjaxCB(res)) return
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
        if (!Util.CommAjaxCB(res)) return
        this.tableData = res.data
      }, err => {
        console.log(err)
      })
    },
    filterIsOrder(value, row) {
      return row.isOrder === value;
    }
  }
}

</script>
<style>
@import "../less/main.css";
</style>
