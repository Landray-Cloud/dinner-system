import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/pages/Index';
import List from '@/pages/List';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '/List',
    name: 'List',
    component: List
  }]
})
