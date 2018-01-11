<template>
  <div id="home">
    <my-bg></my-bg>
    <div class="listwarp">
      <el-button type="primary" @click="cleanList">清除数据</el-button>
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
      let ajaxURL = Util.ajaxHost + 'cleanList'
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
