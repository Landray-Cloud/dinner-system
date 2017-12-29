<template>
  <div>
    <el-input v-model="name" placeholder="你的名字"></el-input>
    是否点餐: <el-switch v-model="isOrder" active-color="#13ce66" inactive-color="#ff4949">
    </el-switch>
    <el-button type="primary" @click="sub">提交</el-button>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data() {
    return {
      name: '',
      isOrder: false
    }
  },
  methods: {
    sub() {
      console.log(this.name)
      console.log(this.isOrder)
    }
  }
}

</script>
