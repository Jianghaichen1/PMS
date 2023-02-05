<template>
  <div class="wrapper">
    <div class="login-box">
      <div class="logo">
        <img src="../../assets/img/tomato.png" height="120px" alt="">
      </div>
      <!-- <h3 class="title">登录界面</h3> -->
      <!-- <div>{{ info }}</div> -->
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        class="demo-ruleForm"
      >
      
       
      <el-menu
				:default-active="$router.path"
				class="el-menu-vertical-demo"
				router
				:collapse="isCollapse" 
					>
         
						<el-menu-item index="login" class="login" >	
							<span disabled>种植户</span>
     				</el-menu-item>
					 
            
         
						<el-menu-item index="login2" class="login2">	
							<span>专家</span>
     					 </el-menu-item>
					  
      
          
						<el-menu-item index="login3" class="login3">	
							<span>管理员</span>
     					 </el-menu-item>
					 
            </el-menu>
    
    

        <el-form-item label="账号" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        <el-menu
            :default-active="$router.path"
            class="el-menu-vertical-demo2"
            router
					>
         
						<el-menu-item index="register" class="register" >
							<span style="color:#00A2E8" disabled>加入我们</span>
     				</el-menu-item>
          </el-menu>
     
      </el-form>
    </div>
  </div>
</template>

<script>

// 令牌解析 token
import jwt from 'jwt-decode'

import {mapMutations} from 'vuex'



 export default {
  props: ["isCollapse"],
    data() {
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        info:'',
        loginForm: {
          username: '',
          password: '',
          phone:''
        },
    
        value: '',
        rules: {
          username: [
            { validator: validateUser, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      ...mapMutations('loginModule',['setUser']),
      submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            let {username,password} = this.loginForm;
          
            //请求登录接口------------- 
            this.$api.getLogin({
                username,password
            }).then(res=>{
              console.log('-----',res.data);
              if(res.data.status===200){
                console.log(jwt(res.data.data));
                //登录成功后：
                //1. 存储登录信息  2. 跳转网页 
                //3. 顶部区域显示用户信息  4. 持久化
                let obj ={
                  user:jwt(res.data.data).username,
                  token:res.data.data
                }
                this.setUser(obj)
                //持久化
                //存储本地
                localStorage.setItem('user',JSON.stringify(obj))
                this.$message({
                    message: "登录成功",
                    type: "success",
                  });
                //跳转主界面 
                this.$router.push('/')
                // this.info='' 
                
              }else{
                //账号或者密码错误
                //  方法一 this.info='账号或者密码错误' 
                 this.$message.error('账号或者密码错误');
              }
            })


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang='less' scoped>
.wrapper{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
background-image: url('../../assets/img/b1.png');
}
.login-box {
  width: 400px;
  height: 340px;
  padding: 20px;
  margin: 0 auto;
  margin-top: 180px;
  border-radius: 10px;

  border: 1px solid #eee;
  background: #fff;
  position: relative;
}
.logo{
  position: absolute;
  width: 128px;
  height: 120px;
  background: #f7f7f7;
  border-radius: 50%;
  overflow: hidden;
  top:-80px;
  left:50%;
  left: px;
  margin-left: -60px;
  padding:5px;
  img{
    border-radius: 50%;
    background: #fff;
  }
}
.demo-ruleForm{
  margin-top: 60px;
}
.title{
  margin-bottom: 30px;
  text-align: center;
  color: #666;
}

.el-menu-vertical-demo{
  width:100px;
  border: 0px;
    height: 50px;
    margin-left: 60px;
    margin-top: -30px;
    .login2{
      margin-top: -60px;
      margin-left: 100px;
      width: 100px;
    }
    .login3{
      margin-top: -60px;
      margin-left: 200px;
      width: 100px;
    }
} 
.el-menu-vertical-demo2{
  margin-top: 40px;
  margin-left: 270px;
  border: 0px;
}

  .register{
  
    margin-left: 10px;
    border: 0px;
    // background-color: #00A2E8;
    border-radius: 10px;
    width: 140px;}
</style>