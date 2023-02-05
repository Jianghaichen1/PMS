<template>
	<div class="wrapper">
	  <div class="register-box">
		<div class="logo">
		  <img src="../assets/img/tomato.png" height="120px">
		</div>
	
		<el-form
		  :model="registerForm"
		  status-icon
		  :rules="rules"
		  ref="registerForm"
		  label-width="60px"
		  class="demo-registerForm"
		>
		<table>
			<tr>
				<td> 
					 <el-form-item label="账号" class="username" prop="username">
                   			 <el-input v-model="registerForm.username" label-width="200px"></el-input>
               		 </el-form-item>
				</td>
				<td>   
					 <el-form-item label="姓名" class="name" prop="name" style="margin-left: 40px;">
                    		 <el-input v-model="registerForm.name"></el-input>
               		 </el-form-item>
			    </td>
			</tr>
			<tr>
				<td>
					<el-form-item label="密码" class="password" prop="password">
                    		<el-input v-model="registerForm.password" show-password></el-input>
              		</el-form-item>
				</td>
				<td>	
					<el-form-item label="确认密码" label-width="100px" class="password2" prop="password2" style="width: 400px;">
                    	<el-input v-model="registerForm.password2" show-password ></el-input>
					</el-form-item>
				</td>
			</tr>
			<tr>
				<td>
					<el-form-item label="邮箱" class="email" prop="email">
                   	 <el-input v-model="registerForm.email"></el-input>
             		</el-form-item>
				</td>
				<td>			
					<el-form-item label="电话" class="phone" prop="phone" style="margin-left: 40px;">
						<el-input v-model="registerForm.phone"></el-input>
					</el-form-item>
				</td>
			</tr>
			<tr>
				<td>
					<el-form-item label="性别" prop="sex">
						<el-radio-group v-model="registerForm.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				</td>
				<td>
					<el-form-item label="出生日期" label-width="100px" class="time" required>
						<el-col :span="11">
						<el-form-item  prop="time">
							<el-date-picker type="date" placeholder="选择日期" v-model="registerForm.time" style="width: 100%;"></el-date-picker>
						</el-form-item>
						</el-col>      
                </el-form-item> 	
				</td>
				
			</tr>
			<tr>
				<td>
					<el-form-item label="番茄类型" label-width="100px" class="type" prop="type">
                    	<el-input v-model="registerForm.type"></el-input>
               		</el-form-item>
				</td>
				<td>
					<el-form-item label="擅长" style="margin-left:40px;" class="hobby" prop="hobby">
                   		 <el-input v-model="registerForm.hobby"></el-input>
               		</el-form-item>
				</td>
			</tr>
			<tr> 
				<td colspan="2">
					<el-form-item label="简介" prop="ji">
						<el-input type="textarea" v-model="registerForm.ji"></el-input>
					</el-form-item>
				</td>
				</tr>
		</table>
					<el-form-item style="margin-left: 200px;"> 
						<el-button type="primary" @click="submitForm">注册</el-button>
						<el-button @click="clearForm">重置</el-button>
					</el-form-item>
		
		</el-form>
	  </div>
	</div>
  </template>
  
  <script>
   export default {
	  data() {
		var checkuser = (rule, value, callback) => {
		if (value === "") {
			return callback(new Error("账号不能为空"));
		} else {
			callback();
		}
		};
		var validatePass = (rule, value, callback) => {
		if (value === "") {
			callback(new Error("请输入密码"));
		} else {
			if (this.registerForm.password2 !== "") {
			this.$refs.registerForm.validateField("password2");
			}
			callback();
		}
		};
		var validatePass2 = (rule, value, callback) => {
		if (value === "") {
			callback(new Error("请再次输入密码"));
		} else if (value !== this.registerForm.password) {
			callback(new Error("两次输入密码不一致!"));
		} else {
			callback();
		}
		};
		return { 
		  registerForm: {
			id:'',
			username: '',
			name:'',
			password: '',
			password2: '',
			sex:'',
			email:'',
			phone:'',
			time:'',
			type:'',
			hobby:'',
			ji:'',

		  },
		 
		  value: '',
		  rules: {
			     //校验规则
			username: [
				{  validator: checkuser,required: true, trigger: 'blur' },
				{ min: 2, max: 16, message: '长度在 2到 16 个字符', trigger: 'blur' }
					],
					password: [{  validator: validatePass,required: true, trigger: 'blur' }],
					password2: [{ validator: validatePass2,required: true,trigger: 'blur' }],
					phone:[{min:11, max: 11, message: '11 个字符', trigger: 'blur' }]
		  }
		};
	  },
	  methods: {
		//注册
		   //修改知识数据
		   submitForm() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          console.log("获取输入的信息", this.registerForm);
          let {
			username,
			name,
			password,
			sex,
			email,
			phone,
			time,
			type,
			hobby,
			ji,
          } = this.registerForm;
          this.$api.addRegister({
				username,
				name,
				password,
				sex,
				email,
				phone,
				time,
				type,
				hobby,
				ji,
              })
              .then((res) => {
                console.log("添加---实现---", res.data);
                if (res.data.status === 200) {
                  //成功
                  this.$message({
                    message: "注册成功",
                    type: "success",
                  });
                  //清空表单
                  this.clearForm();
                }else{
                  this.$message.error("错了哦，这是一条错误消息");
				  this.$message.error('账号或者密码错误');
                }
              })
          
        } else {
          console.log("error submit!!");
		     //清空表单
			 this.clearForm();
          return false;
        }
      });
    },
	 /**
     * 清空表单数据列表
     */
	 clearForm() {
      // 清空表单  1 使用element里面的重置表单  2 自己手动初始化goodsForm
      // this.$refs.registerForm.resetFields();
       this. registerForm={
			username: "",
			name:"",
			password: "",
			password2: "",
			sex:"",
			email:"",
			phone:"",
			time:"",
			type:"",
			hobby:"",
			ji:"",
      };
    }, 
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
  background-image: url('../assets/img/register.jpg');
  }
  .register-box {
	width: 800px;
	height: 580px;
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

  .demo-registerForm{
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
	 
	  
  }
  
  </style>