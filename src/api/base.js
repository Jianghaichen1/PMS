// 接口路径配置：
    const base={
        
        login:'/api/api/login',//登录接口
        host:'http://localhost:8989',//基础域名 
        login2:'/api/api/login2',//登录接口
        login3:'/api/api/login3', 

        addRegister:'/api/api/insetRegister',//注册接口
        //知识库
        
        BookList:'/api/api/BookList', //知识库列表
        search:'/api/api/search',//知识库搜索
        uploadUrl:'/api/api/upload',//图片上传post请求
        addBook:'/api/api/insertBook',//知识库添加
        deleteBook:'/api/api/deleteBookById',//删除知识库
        updateBook:'/api/api/updateBook',//修改知识库


        //perm  用户
        permList:'/api/api/permList',//用户信息
        updatePerm:'/api/api/updatePerm',//修改用户信息

        //knowledge 用户-知识库
        knowlegeList:'/api/api/knowlegeList',//知识库列表
        searchKnowledge:'/api/api/searchKnowledge',//搜索查询知识库


         //预警管理
        warnList:'/api/api/warnList',//用户列表
        searchWarn:'/api/api/searchWarn',//用户搜索
        addWarn:'/api/api/insertWarn',//用户添加
        deleteWarn:'/api/api/deleteWarnById',//用户删除
        updateWarn:'/api/api/updateWarn',//修改用户信息
     
        //news  新闻
        newsList:'/api/api/newsList',//新闻列表
        searchNews:'/api/api/searchNews',//用户搜索
        addNews:'/api/api/insertNews',//新闻添加
        deleteNews:'/api/api/deleteNewsById',//删除新闻
        updateNews:'/api/api/updateNews',//修改新闻


        //user 用户
        searchUser:'/api/api/searchUser',//用户搜索
        userList:'/api/api/userList',//用户列表
        addUser:'/api/api/insertUser',//用户添加
        deleteUser:'/api/api/deleteUserById',//删除用户
        updateUser:'/api/api/updateUser',//修改用户

        //expert 专家
        searchExpert:'/api/api/searchExpert',//用户搜索
        expertList:'/api/api/expertList',//用户列表
        addExpert:'/api/api/insertExpert',//用户添加
        deleteExpert:'/api/api/deleteExpertById',//删除用户
        updateExpert:'/api/api/updateExpert',//修改用户

         //admin  管理员
         searchAdmin:'/api/api/searchAdmin',//用户搜索
         adminList:'/api/api/adminList',//用户列表
         addAdmin:'/api/api/insertAdmin',//用户添加
         deleteAdmin:'/api/api/deleteAdminById',//用户删除
         updateAdmin:'/api/api/updateAdmin',//修改用户信息
         
        
          //session1  种植户会话
          searchSession:'/api/api/searchSession1',//用户搜索
          session1List:'/api/api/session1List',//用户列表
          deleteSession1:'/api/api/deleteSession1ById',//用户删除

          //session2  专家会话
        
          searchSession2:'/api/api/searchSession2',//用户搜索
          session2List:'/api/api/session2List',//用户列表
          deleteSession2:'/api/api/deleteSession2ById',//用户删除
    }

    export default base;
