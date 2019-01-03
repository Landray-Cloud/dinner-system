import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './theme/index.css'

Vue.use(ElementUI)

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

window.VM = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
