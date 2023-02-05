import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './api/index'
import store from './store'
import './assets/css/reset.css'
import './router/permission'

//导入所有 并重命名
import * as echarts from 'echarts'
import bmap from 'vue-baidu-map'


Vue.prototype.$echarts=echarts;

Vue.prototype.$api=api;
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(bmap,{
  //密钥
  ak:'P9KOyyGemD6tIAL6mYIkaACaHuFqGYu2'
})

//持久化
let user=localStorage.getItem('user')
if(user){
   //转化
  user=JSON.parse(user);
 
  store.commit('loginModule/setUser',user) 
}

new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')


router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if(localStorage.getItem('access_token')){ //判断本地是否存在access_token
      next();
    }else { 
      next({
          path: 'login',
          query: {

          redirect: to.fullPath

            }
          })

    }
  }
  else {
    next();
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  if(to.fullPath == "/login"){
    if(localStorage.getItem('access_token')){
      next({
        path:from.fullPath
      });
    }else {
      next();
    }
  }
});