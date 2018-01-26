import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/pages/Index';
import UserForm from '@/pages/UserForm';
import UserList from '@/pages/UserList';
import Login from '@/pages/Login';
Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '/Index',
    name: 'Index',
    component: Index
  }, {
    path: '/UserForm',
    name: 'UserForm',
    component: UserForm
  }, {
    path: '/UserList',
    name: 'UserList',
    component: UserList
  }, {
    path: '/Login',
    name: 'Login',
    component: Login
  }]
})
