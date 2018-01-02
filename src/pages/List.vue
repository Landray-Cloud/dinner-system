<template>
  <div class="listwarp">
    <el-table :data="tableData" stripe class="table">
      <!-- <el-table-column prop="num" label="序号" width="100%">
      </el-table-column>
      <el-table-column prop="date" label="日期" width="100%">
      </el-table-column> -->
      <el-table-column prop="name" label="姓名" width="100%">
      </el-table-column>
      <el-table-column prop="isOrder" label="是否点晚餐">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'list',
  data() {
    return {
      tableData: [],
      // url: 'http://211.149.193.19:8080/api/customers'
      // url:'https://test.ywork.me/node/dinner/getData'
    }

  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      let ajaxURL = 'https://test.ywork.me/node/dinner/getData'

      this.$http.get(ajaxURL).then(response => {
        let body = response.data
        let data = body.data
        this.tableData = data
      }, err => {
        console.error(err)
      })
    }
  }
}

</script>
<style>
.listwarp {
  width: 50%;
  margin: 4% auto;
  /*margin:4% 0;*/
  border: 1px solid #c2c2c2;
  border: 1px solid #c2c2c2;
}

.el-table th {
  text-align: center;
}

</style>
