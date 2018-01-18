<template>
  <el-container style="height: 500px; border: 1px solid #eee;margin: 2% 10%;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-menu-item-group>
          <el-menu-item @click="pages=1" index="1">查询所有</el-menu-item>
          <el-menu-item index="2">点餐设置</el-menu-item>
          <el-menu-item index="3">管理员管理</el-menu-item>
          <el-menu-item index="4">添加数据</el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <el-main>
        <userListSelect></userListSelect>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import userListSelect from '@/components/userListSelect'
export default {
  name: 'Ulist',
  components: {
    userListSelect
  },
  data() {
    return {
    	pages:1
    }
  }
}

</script>
