import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/pages/Index';
import List from '@/pages/List';
import UserForm from '@/pages/UserForm';
import SubmitSucc from '@/pages/SubmitSucc'
import UserFail from '@/pages/UserFail'
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
  }, {
    path: '/UserForm',
    name: 'UserForm',
    component: UserForm
  },{
    path:'/SubmitSucc',
    name:'SubmitSucc',
    component:SubmitSucc
  },{
    path:'/UserFail',
    name:'UserFail',
    component:UserFail
  }]
})
