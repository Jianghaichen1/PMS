<template>
	<div class="add-goods">
	 
	  <div class="title">
		<h1 style="color: #02A7F0;">个人信息</h1>
		<div>
		<el-menu  
			:default-active="$router.path"
			class="el-menu-vertical-demo"
			router
			width="0px"
			>
			<el-menu-item index="/add-perm2" style="width:0px">	
				<div class="title1">
					<img src="../../assets/img/edit.png" class="title2"/>
					<h3 style="margin-left:35px ;margin-top:-70px;color: #02A7F0;">编辑</h3>
				</div>
							
			</el-menu-item>
		</el-menu>
		</div>
	
	  </div>
	  <!-- 表单数据 -->
	 <!--2.表格数据展示区域区域-->
		<div class="wrapper">
			<el-form
		 		:model="permForm"
				status-icon
				ref="permForm"
				label-width="60px"
				class="demo-permForm"
				disabled
				
		>
		<table>
			<tr>
				<td > 
					 <el-form-item label="账号" class="username" prop="username" style="margin-top: 60px;">
                   			 <el-input v-model="permForm.username" label-width="200px"></el-input>
               		 </el-form-item>
				</td>
				<td>   
					 <el-form-item label="姓名" class="name" prop="name" style="margin-top: 60px;margin-left: 40px;">
                    		 <el-input v-model="permForm.name"></el-input>
               		 </el-form-item>
			    </td>
			</tr>

			<tr>
				<td>
					<el-form-item label="邮箱" class="email" prop="email">
                   	 <el-input v-model="permForm.email"></el-input>
             		</el-form-item>
				</td>
				<td>			
					<el-form-item label="电话" class="phone" prop="phone" style="margin-left: 40px;">
						<el-input v-model="permForm.phone"></el-input>
					</el-form-item>
				</td>
			</tr>
			<tr>
				<td>
					<el-form-item label="性别" prop="sex">
						<el-radio-group v-model="permForm.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				</td>
				<td>
					<el-form-item label="出生日期" label-width="100px" class="time" required>
						<el-col :span="11">
						<el-form-item  prop="time" >
							<el-date-picker type="date"   placeholder="选择日期" v-model="permForm.time" style="width: 300px;"></el-date-picker>
						</el-form-item>
						</el-col>      
                </el-form-item> 	
				</td>
				
			</tr>
			<tr>
				<td>
					<el-form-item label="番茄类型" style="margin-left: -10px;margin-top: 20px;" label-width="100px" class="type" prop="type">
                    	<el-input v-model="permForm.type"></el-input>
               		</el-form-item>
				</td>
				<td>
					<el-form-item label="擅长" style="margin-left:40px;margin-top: 20px;" class="hobby" prop="hobby">
                   		 <el-input v-model="permForm.hobby"></el-input>
               		</el-form-item>
				</td>
			</tr>
			<tr> 
				<td colspan="2">
					<el-form-item label="简介" prop="ji" style="margin-top: 20px;">
						<el-input type="textarea" v-model="permForm.ji"></el-input>
					</el-form-item>
				</td>
				</tr>
		</table>	
		    </el-form>
		</div>
	</div>
  </template>
  
  <script>
  export default {
	
	data() {
	  return {
		
		permForm: {
			
			username:'风沭千桦',
			name:'王唯',
			sex:'男',
			email:'233525@163.com',
			phone:'13805257923',
			time:'2022-05-31',
			type:'西粉二号',
			hobby:'足球,唱歌,看书',
			ji:'性格有点内向、乐观上进、有爱心并善于施教并行;对待工作认真负责,善于沟通、协调有较强的组织能力与团队;',

		  },
			imgUrl:'',
		   dialogVisible:false,
	
		};
	  }, 
	methods: {
	}
  };
  </script>
  
  <style lang='less' scoped>
  .wrapper{
	width: 1200px;
	margin-left: 400px;

	height: 600px;
	border-radius: 30px;
	background-color: #ffffff;
  }
  .demo-permForm{
	margin-left: 220px;
	
  }
  .title1{
	margin-left: 130px;
	height: 25px;
	width: 80px;
	margin-top: -30px;
	border: 2px solid #02A7F0;
	border-radius: 10px;
	
  }
  .title2{
	width: 15px;
	margin-top: -30px;
	margin-left: 10px;
  }
  .add-goods {
	margin: 20px;
  }
  .title {
	padding: 10px;
	background: #fff;
	border: 1px solid #eee;
	margin-bottom: 20px;
  }
  .myform {
	background: #fff;
	padding: 10px;
	padding-right: 30px;
  }
  .line{
	  text-align: center;
  }
  </style>