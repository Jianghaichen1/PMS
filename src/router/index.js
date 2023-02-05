import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from  "../views/Login/Login.vue";
import Layout from '../views/Layout/index.vue';
import Home from '../views/Home/index.vue';
import Layout2 from '../views2/Layout/index.vue';
import Layout3 from '../views3/Layout/index.vue';
import Register from '../register/index.vue';

//异步架构
// const Register=()=>import('../register/index.vue')
const Warn=()=>import('../views/Warn/Warn.vue')
const Expert=()=>import('../views/Person/Expert/Expert.vue')
const Diagnosis=()=>import('../views/Diagnosis/Diagnosis.vue')
const Envir=()=>import('../views/Envir/Envir.vue')
const Book=()=>import('../views/Book/Book.vue')

const Perm=()=>import('../views/Perm/Perm.vue')

const Left=()=>import('../views/Diagnosis/Left.vue')

//子级路由
const AddPerson=()=>import('../views/Person/AddPerson.vue')
const AddPerm=()=>import('../views/Perm/AddPerm.vue')


//专家
const  Login2=()=>import('../views2/Login/Login2.vue')
const  Home2=()=>import('../views2/Home/index.vue')
const  Book2=()=>import('../views2/Book/Book.vue')
const  AddPerm2=()=>import('../views2/Perm/AddPerm2.vue')
const  Perm2=()=>import('../views2/Perm/Perm2.vue')
const Diagnosis2=()=>import('../views2/Diagnosis/Diagnosis2.vue')
//管理员
const  Login3=()=>import('../views3/Login/Login3.vue')
const  Home3=()=>import('../views3/Home/index.vue')
const  AddPerm3=()=>import('../views3/Perm/AddPerm3.vue')
const  Perm3=()=>import('../views3/Perm/Perm3.vue')
const  Warn3=()=>import('../views3/Warn/Warn3.vue')
const  News3=()=>import('../views3/News/News3.vue')

//子级路由
const PersonUser=()=>import('../views3/Person/User/Person-User.vue')
const PersonExpert=()=>import('../views3/Person/Expert/Person-Expert.vue')
const PersonAdmin=()=>import('../views3/Person/Admin/Person-Admin.vue')

Vue.use(VueRouter)
/*同级路由配置*/ 
const routes = [
  {
  
    path:'',
    component:Layout,
	//路由拦截
    //路由元信息
    
    meta:{
      isLogin:true
    },
     children:[
      {
        path:'/',
        name:'Home',
        component:Home
      },
      //诊断
      {
        path:'/diagnosis',
        name:'Diagnosis',
        component:Diagnosis
      },
     
      {
        path:'/left',
        name:'Left',
        component:Left
      },
      {
        //知识库
        path:'/book',
        name:'Book',
        component:Book
      },
      {
        //环境监控
        path:'/envir',
        name:'Envir',
        component:Envir
      },
      {
        //个人信息管理
        path:'/perm',
        name:'Perm',
        component:Perm
      },
      {
        //个人信息管理
        path:'/add-perm',
        name:'AddPerm',
        component:AddPerm
      },
      {
          path:'/add-person',
          name:'AddPerson',
          component:AddPerson
      },{
        path:'/warn',
        name:'Warn',
        component:Warn,
        children:[
          {
            //预警周期
            path:'warn-expert',
            component:Warn-Expert,
          }
        ]
      }
    ]
  },
  {
  
    path:'/2/',
    component:Layout2,
	//路由拦截
    //路由元信息
    
    meta:{
      isLogin:true
    },
     children:[
      {
        path:'/2/',
        name:'Home2',
        component:Home2
      },
      {
        path:'/book2',
        name:'Book2',
        component:Book2
      },
       //诊断
       {
        path:'/diagnosis2',
        name:'Diagnosis2',
        component:Diagnosis2
      },
      {
        //个人信息管理
        path:'/perm2',
        name:'Perm2',
        component:Perm2
      },
      {
        //个人信息管理
        path:'/add-perm2',
        name:'AddPerm2',
        component:AddPerm2
      },
    ]
  },
  {
  
    path:'/3/',
    component:Layout3,
	//路由拦截
    //路由元信息
    
    meta:{
      isLogin:true
    },
     children:[
      {
        path:'/3/',
        name:'Home3',
        component:Home3
      },
      {
          //种植户管理
        path:'/person-user',
        name:'PersonUser',
        component:PersonUser,
      },
      {
            //专家管理
        path:'/person-expert',
        name:'PersonExpert',
        component:PersonExpert,
      },
      {
            //管理员管理
        path:'/person-admin',
        name:'PersonAdmin',
          component:PersonAdmin,
        },

       //新闻管理
       {
        path:'/news3',
        name:'News3',
        component:News3,
      },
      //预警管理
      {
        path:'/warn3',
        name:'Warn3',
        component:Warn3,
      },
      {
        //个人信息管理
        path:'/perm3',
        name:'Perm3',
        component:Perm3
      },
      {
        //个人信息管理
        path:'/add-perm3',
        name:'AddPerm3',
        component:AddPerm3
      },
    ]
  },
 
  {
    path: '/login',
    name: 'Login',
    component: Login
  
  },
  {
    path: '/login2',
    name: 'Login2',
    component: Login2
  
  },
  {
    path: '/login3',
    name: 'Login3',
    component: Login3
  }, {
    path: '/register',
    name: 'Register',
    component: Register
  },
]

const router = new VueRouter({
  routes
})


export default router

