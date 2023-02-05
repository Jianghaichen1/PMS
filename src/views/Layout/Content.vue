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
						<el-menu-item index="/perm" class="my">	
							<span >个人信息</span>
						
     					 </el-menu-item>
					</div>
					<div class="time">
						
						<span>{{Samplingtime}}</span>
					</div>
					<div>
						<div>
							<img src="../../assets/img/sun.png" class="sun" alt=""/>
						</div>
					</div>
					</div>
					<div class="user">
						<span> 欢迎：{{users.user}}</span>
					</div>
				</div>
				<hr style="margin-top:70px;margin-left:200px;height: 5px; background-color: #02B0FC;border: none;border-radius: 10px;" />
				<div>
				
					<div>
						<el-menu-item index="/book" class="book">	
							<span>知识库查询</span>
     					 </el-menu-item>
					</div>
					<div>
						<el-menu-item index="/diagnosis" class="diagnosis">	
							<span>在线诊断</span>
     					 </el-menu-item>
					</div>
					<div>
						<el-menu-item index="/envir" class="envir">	
							<span>环境监控</span>
     					 </el-menu-item>
					</div>
					<div>
						<el-menu-item index="/" class="home">	
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
		
			    //取样时间
			Samplingtime:'',

		}
	},
  props: ["isCollapse"],
  computed: {
    ...mapState("loginModule", ["users"]),
  },

  mounted(){
	this.getCurrentTime();
    clearInterval(myTimeDisplay );
    let myTimeDisplay = setInterval(() => {
      this.getCurrentTime(); //每秒更新一次时间
    }, 1000);
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
			getCurrentTime() {
					//获取当前时间并打印
					var _this = this;
				let yy = new Date().getFullYear();
				let mm = new Date().getMonth()+1;
				let dd = new Date().getDate();
				let hh = new Date().getHours();
				let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
				let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
				_this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
				this.Samplingtime=_this.gettime;
				console.log(_this.gettime)  
			},	
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
.book {
		
		float:right;
	
		padding-right: 20px;
		display: flex;
		margin-right: 200px;
		font-size: 20px;
}

.diagnosis {
		
		float:right;
	
		padding-right: 20px;
		display: flex;
		margin-right: 150px;
		font-size: 20px;

}

.warn {
		
		float:right;
		
		padding-right: 20px;
		display: flex;
		margin-right: 180px;
		font-size: 20px;
}


.envir {
		
		float:right;
		padding-right: 20px;
		display: flex;
		margin-right: 200px;
		font-size: 20px;
}

 .home {
	float: left;
	padding-right: 20px;
		
		margin-left: 200px;
		font-size: 20px;
}
</style>