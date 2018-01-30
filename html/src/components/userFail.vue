<template>
  <div class="mainbox" v-show="orderStatus">
    <h3 class="failtitle">当前非点餐提交时间段！</h3>
  </div>
</template>
<script>
import Util from '@/util.js';
export default {
  name: 'user-fail',
  data() {
    return {
    }
  }
}

</script>
