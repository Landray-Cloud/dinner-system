import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/pages/Index';
import UserForm from '@/pages/UserForm';
import UserList from '@/pages/UserList';
import UserFail from '@/pages/UserFail';
import Login from '@/pages/Login';
import UList from '@/pages/UList'
Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '/UserForm',
    name: 'UserForm',
    component: UserForm
  },{
    path:'/UserList',
    name:'UserList',
    component:UserList
  },{
    path:'/UList',
    name:'UList',
    component:UList
  },{
    path:'/Login',
    name:'Login',
    component:Login
  },{
    path:'/UserFail',
    name:'UserFail',
    component:UserFail
  }]
})
