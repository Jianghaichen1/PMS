//请求方法
    import axios from "axios"
    import base from "./base"
    //引入 node.js
const qs=require('querystring')
    const api={

     
     //登录接口
        getLogin(params) {//params={username:'',password:''}
            //参数转换为字符串
            return axios.post(base.login,qs.stringify(params))
        },

        
        getLogin2(params) {//params={username:'',password:''}
            //参数转换为字符串
            return axios.post(base.login2,qs.stringify(params))
        },

        getLogin3(params) {//params={username:'',password:''}
            //参数转换为字符串
            return axios.post(base.login3,qs.stringify(params))
        },

        //注册
         //添加知识库列表
         addRegister(params){
            
            return axios.get(base.addRegister,{params})
 
        },

        //知识库列表
        //{page:XX}
        getBookList(params){  
            return axios.get(base.BookList,{params})
        },
        
        //搜索知识库列表数据
        getSearch(params){  
            return axios.get(base.search,{params})
        },
        //添加知识库列表
        addBook(params){
            
            return axios.get(base.addBook,{params})
 
        },
        //删除知识库列表
        deleteBook(params){
            return axios.get(base.deleteBook,{params})
        },
        //修改知识库列表
        updateBook(params){
            return axios.get(base.updateBook,{params})
        },



        //新闻列表
        getNewsList(params){
            return axios.get(base.newsList,{params})
        },

         //搜索知新闻列表数据
         getSearchNews(params){  
            return axios.get(base.searchNews,{params})
        },
        //添加新闻列表
        addNews(params){
            
            return axios.get(base.addNews,{params})
 
        },
        //删除新闻列表
        deleteNews(params){
            return axios.get(base.deleteNews,{params})
        },
        //修改新闻列表
        updateNews(params){
            return axios.get(base.updateNews,{params})
        },

        //个人信息管理
        //个人信息
        getPermList(params){
            return axios.get(base.permList,{params})
        },
        //修改个人信息
        updatePerm(params){
            return axios.get(base.updatePerm,{params})
        },
      
        //知识库列表
        getKnowlegeList(params){
            return  axios.get(base.knowlegeList,{params})
        },
         //搜索查询知识库
        getSearchKnowlege(params){
            return axios.get(base.searchKnowledge,{params})
        },
   

         //预警管理列表
        //{page:XX}
        getAttendList(params){  
            return axios.get(base.attendList,{params})
        },
        getWarnList(params){  
            return axios.get(base.warnList,{params})
        },
        //搜索预警数据
        getSearchWarn(params){  
            return axios.get(base.searchWarn,{params})
        },
        //添加预警
        addWarn(params){
            //params -> {} 参数：udp,name,Aup,Adown,type,Alocation
            return axios.get(base.addWarn,{params})
 
        },
        //删除预警
        deleteWarn(params){
            return axios.get(base.deleteWarn,{params})
        },
        //修改预警
        updateWarn(params){
            return axios.get(base.updateWarn,{params})
        },

        //种植户
        //搜索用户列表数据

        getUserSearch(params){  
            return axios.get(base.searchUser,{params})
        },
          //用户列表
        getUserList(params){  
            return axios.get(base.userList,{params})
        },
        
        //添加用户列表
        addUser(params){
            
            return axios.get(base.addUser,{params})
 
        },
        //删除用户列表
        deleteUser(params){
            return axios.get(base.deleteUser,{params})
        },
        //修改用户列表
        updateUser(params){
            return axios.get(base.updateUser,{params})
        },
    
         //专家
        //搜索用户列表数据
        getExpertSearch(params){  
            return axios.get(base.searchExpert,{params})
        },
          //用户列表
        getExpertList(params){  
            return axios.get(base.expertList,{params})
        },
        
        //添加用户列表
        addExpert(params){
            
            return axios.get(base.addExpert,{params})
 
        },
        //删除用户列表
        deleteExpert(params){
            return axios.get(base.deleteExpert,{params})
        },
        //修改用户列表
        updateExpert(params){
            return axios.get(base.updateExpert,{params})
        },
      
        //管理员
        //搜索用户列表数据
        getAdminSearch(params){  
            return axios.get(base.searchAdmin,{params})
        },
          //用户列表
        getAdminList(params){  
            return axios.get(base.adminList,{params})
        },
        
        //添加用户列表
        addAdmin(params){
            
            return axios.get(base.addAdmin,{params})
 
        },
        //删除用户列表
        deleteAdmin(params){
            return axios.get(base.deleteAdmin,{params})
        },
        //修改用户列表
        updateAdmin(params){
            return axios.get(base.updateAdmin,{params})
        },

         //种植户会话列表
        //{page:XX}
        getSession1List(params){  
            return axios.get(base.session1List,{params})
        },
        
        //搜索种植户会话数据
        getSessionSearch(params){  
            return axios.get(base.searchSession,{params})
        },
        
        
        //删除种植户列表
        deleteSession1(params){
            return axios.get(base.deleteSession1,{params})
        },

          //专家会话列表
        //{page:XX}
        getSession2List(params){  
            return axios.get(base.session2List,{params})
        },
        
        //搜索专家会话数据
        getSession2Search(params){  
            return axios.get(base.searchSession2,{params})
        },
       
        //删除专家列表
        deleteSession2(params){
            return axios.get(base.deleteSession2,{params})
        },

    }
    //导出方法
    export default api