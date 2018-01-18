<template>
  <div class="userList">
    <div class="userListBox">
      <div class="userListCon">
        <div class="userListCon-sub">
          <div v-if="pages===1" class="pagesbox">
            <h3 class="selectList-title">查数据</h3>
            <div class="selectList">
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
                    <el-button type="text" size="medium"><i class="el-icon-setting el-ico-size" @click="showEditBox(scope.row)"></i></el-button>
                    <el-button type="text" size="medium">
                      <i class="el-icon-delete el-ico-size" @click="removeOrder(scope.row.id)"></i>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div v-if="pages===2" class="pagesbox">
            <h3 class="selectList-title">点餐设置</h3>
            <div class="selectList">
              <div class=" addList">
                <p class="addList-p ">今天是{{newDate}}，{{week}}</p>
                <p class="updateSet">今天点餐状态：
                  <!-- <el-switch v-model="selectSwitch" active-color="#13ce66" inactive-color="#dcdfe6" active-value="启用" inactive-value="禁用" change="setSubmit">
            </el-switch> -->
                  <div class="container">
                    <input type="checkbox" id="radio" name="switch" v-model="selectSwitch" @change="setSubmit">
                    <label for="radio" class="radio">
                      <span class="circle"></span>
                      <span class="text on">ON</span>
                      <span class="text off">OFF</span>
                    </label>
                  </div>
                </p>
              </div>
            </div>
          </div>
          <div v-if="pages===3" class="pagesbox">
            <h3 class="selectList-title">添加数据</h3>
            <div class="selectList">
              <div class="addList" :data="addItem">
                <ul>
                  <li><span class="selectTitle">名字：</span>
                    <el-input v-model="addName" placeholder="请输入姓名" class="selectName"></el-input>
                  </li>
                  <li><span class="selectTitle">订餐：</span>
                    <el-select v-model="addOrderStatus" placeholder="请选择">
                      <el-option v-for="item in orderList" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </li>
                </ul>
                <el-button type="primary" class="orderSetBtn" @click="setAddList">提交</el-button>
              </div>
            </div>
          </div>
          <!-- 弹框编辑用户是否点餐 -->
          <el-dialog title="编辑用户是否订餐" :visible.sync="dialogFormVisible">
            <el-form :data="tableData">
              <el-form-item label="名字" :label-width="formLabelWidth">
                <el-input v-model="editName" placeholder="请输入姓名" class="editFormName"></el-input>
              </el-form-item>
              <el-form-item label="订餐" :label-width="formLabelWidth">
                <el-select v-model="editOrderStatus" placeholder="请选择">
                  <el-option v-for="item in orderList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateDataList">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
      <div class="userListNav">
        <ul>
          <li @click="pages=1" :class="pages===1?'active':''">查询所有</li>
          <li @click="pages=2" :class="pages===2?'active':''">点餐设置</li>
          <li @click="pages=3" :class="pages===3?'active':''">添加数据</li>
        </ul>
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
      filters: [{ text: '加班点餐', value: 1 }, { text: '加班不点餐', value: 2 }, { text: '不加班不点餐', value: 3 }],
      tableData: [],
      pages: 1,
      newDate: Util.getDate(new Date(), 'yyyy-MM-dd'),
      week: Util.getWeek(new Date().getDay()), //星期
      selectDate: new Date(), // 查询日期
      selectInp: '', // 查询名字
      selectSwitch: '', // 点餐设置开关
      options: [{
        value: 0,
        label: '不允许提交'
      }, {
        value: 1,
        label: '允许提交'
      }],
      addName: '', // 添加名字
      addOrderStatus: '', // 添加点餐状态
      addItem: [],
      orderList: [{
        value: 1,
        label: '加班订餐'
      }, {
        value: 2,
        label: '加班不订餐'
      }, {
        value: 3,
        label: '不加班不订餐'
      }],
      editForm: [],
      editName: '', // 编辑名字
      editOrderStatus: '', // 编辑状态
      orderStatus: '',
      orderStatusList: '', // 订单状态
      dialogFormVisible: false,
      formLabelWidth: '120px',
      editFormId: '',
      status: '' // 点餐设置状态

    }
  },
  mounted() {
    this.getDate()
    this.getOrderSet()
  },
  methods: {
    // 获取数据列表
    getDate() {
      let selectInp = this.selectInp
      let selectDate = Util.getDate(this.selectDate, 'yyyy-MM-dd')
      if (!selectDate && !selectInp) return this.$message({ message: '日期和名字不能同时为空', type: 'error' })
      let ajaxURL = Util.ajaxHost + 'manager/getList'
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
    // 管理员添加数据
    setAddList() {
      let orderTime = Date.parse(new Date());
      let name = this.addName
      if (!Util.showUserForm(name)) return

      let orderStatus = this.addOrderStatus
      if (!orderStatus) return this.$message({ message: '订餐状态不能为空', type: 'error' })
      let ajax = Util.ajaxHost + 'addOrder'
      let params = { name, orderStatus }
      this.$http.post(ajax, params).then(succ => {
        let res = succ.data
        if (!Util.commAjaxCB(res)) return
        let addItem = res.data
        this.$message({ message: '提交成功', type: 'success' })
        this.addName = ''
        this.addOrderStatus = ''
      }, err => {
        console.log(err)
      })
    },
    // 显示编辑弹框
    showEditBox(options) {
      this.editFormId = options.id
      this.editName = options.name
      this.editOrderStatus = options.orderStatus
      this.dialogFormVisible = true
    },
    // 根据ID更新订餐数据 (管理用)
    updateDataList() {
      let id = this.editFormId
      let name = this.editName
      if (!Util.showUserForm(name)) return
      let orderStatus = this.editOrderStatus
      let ajax = Util.ajaxHost + 'manager/updateDataById'
      let params = { id, name, orderStatus }
      this.$http.post(ajax, params).then(succ => {
        let res = succ.data
        if (!Util.commAjaxCB(res)) return
        this.$message({ message: '编辑成功', type: 'success' })
        this.getDate()
        this.dialogFormVisible = false

      }, err => {
        console.log(err)
      })
    },
    // 重置
    getReset() {
      this.selectInp = ''
      this.selectDate = ''
    },
    // 删除
    removeOrder(id) {
      this.$confirm('确定删除吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ajax = Util.ajaxHost + 'manager/deleteOrder'
        let params = { id }
        this.$http.post(ajax, params).then(succ => {
          let res = succ.data
          if (!Util.commAjaxCB(res)) return
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 删除之后应该要刷新列表
          this.getDate()
        }).catch(() => {});
      }, err => {
        console.log(err);
      })
    },
    // 统计
    getTotal(param) {
      return ['合计', '', '', param.data.length]
    },
    /* 获取是否提交加班订餐记录
     *  点餐设置开关提交
     *
     */
    getOrderSet() {
      let ajax = Util.ajaxHost + 'getSubmit?date=' + this.newDate
      this.$http.get(ajax).then(succ => {
        let res = succ.data
        if (!Util.commAjaxCB(res)) return
        let _status = res.data.status
        this.status = _status
        this.selectSwitch = Boolean(_status)
        this.$message({ message: '获取成功', type: 'success' })
      }, err => {
        console.log(err)
      })
    },
    // 设置是否提交加班订餐记录
    setSubmit() {
      let status = Number(this.selectSwitch)
      let date = this.newDate
      let ajax = Util.ajaxHost + 'manager/setSubmit'
      let params = { date, status }
      this.$http.post(ajax, params).then(succ => {
        let res = succ.data
        if (!Util.commAjaxCB(res)) return
        this.$message({ message: '设置成功', type: 'success' })
      }, err => {
        console.log(err)
      })
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
