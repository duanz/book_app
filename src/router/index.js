import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/pages/Home';
import Help from '@/pages/Help';
import Search from '@/pages/Search';
import Register from '@/pages/Register';
import Subscribe from '@/pages/Subscribe';
import Login from '@/pages/Login';

import Storager from '@/utils/storage';

Vue.use(VueRouter);

const Router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }, {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/subscribe',
      name: 'subscribe',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Subscribe
    }

  ],

});


Router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth || from.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (Storager.isAuth()) {  // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});


export default Router;













// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/help',
//       name: 'help',
//       component: Help
//     },
//     {
//       path: '/search',
//       name: 'search',
//       component: Search,
//       props: true
//     },
//     {
//       path: '/register',
//       name: 'register',
//       component: Register
//     }, {
//       path: '/login',
//       name: 'login',
//       component: Login
//     },
//     {
//       path: '/subscribe',
//       name: 'subscribe',
//       component: Subscribe
//     }
//   ]
// });
