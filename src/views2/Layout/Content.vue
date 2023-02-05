<template>
	<!-- 右侧内容区域 -->
	<div>
		
		<div class="header">
			<!-- 顶部导航条 -->
			<div>
				<el-menu
				:default-active="$router.path"
				class="el-menu-vertical-demo"
				router
				:collapse="isCollapse" 
					>
				
					<div>
						<div>
							<img src="../../assets/img/tomato.png" class="tomato" alt=""/>
						</div>
						
					<div>
					<div class="out">
						<span>安全退出</span>
						<i   style="	font-size: 30px;"  class="el-icon-switch-button" @click="loginout"></i>
					</div>
					<div >
						<el-menu-item index="/perm2" class="my">	
							<span >个人信息</span>
						
     					 </el-menu-item>
					</div>
					<div class="time">
						<span>{{dateFormat(date)}}</span>
						
					</div>
					<div>
						<div>
							<img src="../../assets/img/sun.png" class="sun" alt=""/>
						</div>
					</div>
					</div>
					<div class="user">
						<span> 欢迎：{{users.user }}</span>
					</div>
				</div>
				<hr style="margin-top:70px;margin-left:200px;height: 5px; background-color: #02B0FC;border: none;border-radius: 10px;" />
				<div>
				
					<div>
						<el-menu-item index="/book2" class="book2">	
							<span>知识库管理</span>
     					 </el-menu-item>
					</div>
					<div>
						<el-menu-item index="/diagnosis2" class="diagnosis2">	
							<span>在线诊断</span>
     					 </el-menu-item>
					</div>
				
				
					<div>
						<el-menu-item index="/2/" class="home">	
							<span>首页</span>
     					 </el-menu-item>
					</div>
					
				</div>
				</el-menu>
				
			
			</div>

		

		</div>
		<!--内容区域 路由出口-- >
		  test <div style="height: 1200px;width: 200px;background: pink;"></div> -->
			<div class="content">
				<router-view />
			</div>
			
	  
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
	data(){
		return{
			date:new Date()
		}
	},
  props: ["isCollapse"],
  computed: {
    ...mapState("loginModule", ["users"]),
  },

  methods: {
    ...mapMutations("loginModule", ["clearUser"]),
			changeMenu(){
				 //点击图标 切换父组件的数据 isCollapse
				this.$emit('changeCollapse')
			},loginout(){
				//退出登录
				//清空本地存储
				this.clearUser()
				localStorage.removeItem('user')
				this.$router.push('/login')
				
			},
			
			dateFormat(time){
				var date=new Date(time);
				var year=date.getFullYear();
				var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
				var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
				var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
				var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
				var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
				
				return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
		   },
			
   	},			

	mountime() {
			  //显示当前日期时间
			  let _this = this// 声明一个变量指向Vue实例this，保证作用域一致
          this.timer = setInterval(() => {
           _this.date = new Date(); // 修改数据date
           }, 1000)
		},
	
  }
	

</script>

<style lang="less" scoped>
	.el-menu-vertical-demo{
		border-radius: 20px;
		
	}

	.iconfont{
			font-size: 30PX;
	}

	 .input /deep/ .el-input__inner {
   			 border-radius: 2.64rem !important;
			float:center;
  	}
	 .user {
		float:right;
		padding-right: 20px;
		display: flex;
		margin-top: 20px;
		margin-right: 20px;
    span {
		font-size: 25px;
      position: relative;
      top: -4px;
      margin-right: 10px;
    }
  }
  .out {
		
		float:right;
		margin-top: 20px;
		padding-right: 20px;
		display: flex;
		margin-right: 20px;
    span {
		font-size: 25px;
      position: relative;
      top: -4px;
      margin-right: 10px;
    }
  }
  .sun{
		
		float:right;
		margin-top: 10px;
		padding-right: 20px;
		display: flex;
		margin-right: 20px;

  }
  

  .time {
		
		float:right;
		padding-right: 20px;
		display: flex;
		margin-top: 20px;
		margin-right: 20px;
    span {
		font-size: 25px;
      position: relative;
      top: -4px;
      margin-right: 10px;
    }
  }
  .my {
	
		float:right;
		padding-right: 20px;
		display: flex;
		margin-right: 20px;
		margin-top: 10px;
    span {
		font-size: 25px;
      position: relative;
      top: -4px;
      margin-right: 10px;
    }
  }
  
.tomato{
	float:left;
		padding-right: 20px;
		display: flex;
		margin-right: 20px;
	margin-top: 10px;
	margin-left: 20px;
   width: 50px;
}
.book2 {
		
		float:right;
	
		padding-right: 20px;
		display: flex;
		margin-right:600px;
		font-size: 20px;
}

.diagnosis2 {
		
		float:right;
	
		padding-right: 20px;
		display: flex;
		margin-right: 600px;
		font-size: 20px;

}

 .home {
	float: left;
	padding-right: 20px;
		
		margin-left: 200px;
		font-size: 20px;
}
</style>