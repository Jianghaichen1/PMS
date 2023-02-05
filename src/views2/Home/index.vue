<template>
	<div class="home">
	
	  <div class="content">
  
		<div class="news">
		  <div class="b1">&nbsp;</div>
		  <div class="title" style="margin-top: 10px;font-size: 20px;margin-left: 15px;">时事新闻</div>
			<!--2.表格数据展示区域区域-->
		  <div class="news">                                    <!-- 去除标题头-->                <!-- 斑马纹--> 
			<el-table :data="tableData" style="font-size:20px" :show-header="false"  :stripe="true" >
			<el-table-column prop="title"  width="1200">
			</el-table-column>
		  
			</el-table>
		  </div>
		</div>
			<div class="area">
			  <div class="title" >提问信息</div>
		  	<div style="width: 700px;">
				<table style="margin-top:20px;">
					<tr>
						<td>李先生</td>
						<td colspan="3"></td>
					</tr>
					<tr>
						<td></td>
						<td colspan="3">【图片】病虫害如何处理？</td>
					</tr>
					<tr>
						<td>王先生</td>
						<td colspan="3"></td>
					</tr>
					<tr>
						<td></td>
						<td colspan="3">化肥氮、磷、钾如何合理的调配？</td>
					</tr>
					<tr>
						<td>张先生</td>
						<td colspan="3"></td>
					</tr>
					<tr>
						<td></td>
						<td colspan="3">番茄种植的土壤如何选择？</td>
					</tr>

					<tr>
						<td>陈先生</td>
						<td colspan="3"></td>
					</tr>
					<tr>
						<td></td>
						<td colspan="3">灰霉病的发病症状与防治？</td>
					</tr>
					<tr>
						<td>蒋先生</td>
						<td colspan="3"></td>
					</tr>
					<tr>
						<td></td>
						<td colspan="3">毒宝可溶性粉剂的调配与喷洒方式</td>
					</tr>
					<tr>
						<td>邹先生</td>
						<td colspan="3"></td>
					</tr>
					<tr>
						<td></td>
						<td colspan="3">番茄种植土壤选择</td>
					</tr>
					<tr>
						<td>李女士</td>
						<td colspan="3"></td>
					</tr>
					<tr>
						<td></td>
						<td colspan="3">番茄生长需要的日间温度、夜间温度、地温</td>
					</tr>
					<tr>
						<td colspan="4"  style="text-align: center;margin-top: 10px;">
							点击进入咨询回复					
						</td>
					</tr>
					
					
				</table>
			</div>
		  </div>
	  </div>
  
	  <!-- 知识库 -->
	  <div class="home-footer">
		<el-card class="box-card" style="width: 400px;">
		  <div class="title" style="margin-top: 10px;font-size: 20px;margin-left: 15px;">知识库</div>
		   <!--2.表格数据展示区域区域-->
		   <div class="wrapper">            <!-- 斑马纹-->
			<el-table :data="tableData1"  :stripe="true"  :show-header="false" border>
			 <el-table-column prop="name"  width="450"></el-table-column>
			 <el-table-column prop="content" height="50px"  width="1163"></el-table-column>
			</el-table>
		  </div>
		</el-card>
		<el-card class="box-card2" style="height: 200px;">
		  <div slot="header" class="clearfix">
			<span>快捷入口</span>
		  </div>
		  <div class="text item">
			<el-button type="primary">知识库查询</el-button>
			<el-button>在线回复</el-button>
			
		  </div>
		</el-card>
	  </div>
	</div>
  </template>
  
  <script>
	  export default {
	  //生命周期函数  mounted
		  mounted(){
			
			  },
		data() {
		return {
		  input:'',
		  total:10,
		  pageSize:1,
		  tableData:[],
		  tableData1:[],
		  
		  value: ''
		}
	  },
	  methods:{
		 
  
	  // 封装 新闻信息列表获取
			  http(page){
				  this.$api.getNewsList({
					  page,
				  })
				  .then(res=>{
					  console.log(res.data);
					  if(res.data.status===200){
							  //判断状态码才能进行操作
							  this.tableData=res.data.data;//数据列表
							  this.total=res.data.total;
							  this.pageSize=res.data.pageSize;
					  }
				  
				  });
		  this.$api.getKnowlegeList({
					  page,
				  })
				  .then(res=>{
					  console.log(res.data);
					  if(res.data.status===200){
							  //判断状态码才能进行操作
							  this.tableData1=res.data.data;//数据列表
							  this.total=res.data.total;
							  this.pageSize=res.data.pageSize;
					  }
				  
				  });
			  },
		
	  },
		//生命周期函数  视图
		  created(){
				  this.http(1);
			  },
	   
	  }
  </script>
  
  
  <style lang='less' scoped>
  
  .b1{
	height: 20px;
	padding: 0px; 
	background-color: #D7D7D7;
	border-radius: 10px 10px 10px 10px;
  }
  .ol{
	margin-top:15px;
	width:40%;
  }
  .home{
	margin: 20px;
   
  }
  .header {
	display: flex;
	padding-right: 30px;
	.item {
	  flex: 1;
	  height: 100px;
	  padding: 10px;
	  background: #fff;
	  border-radius: 10px;
	  margin-left: 20px;
	  margin-right: 20px;
	  font-weight: bold;
	  color: #fff;
	  // text-align: center;
	  position: relative;
	  .num {
		font-size: 22px;
		margin: 10px;
			color: #fff;
	  }
	  .bottom {
		position: absolute;
		border-top: 1px solid rgb(246, 245, 245);
		padding: 10px 20px;
		bottom: 0;
		right: 0;
		left: 0;
			color: #fff;
			font-weight: normal;
	  }
	}
	 
  
  }
  .content {
	margin-left: 10px;
   margin-right: 10px;
	display: flex;
	height: 500px;
	width: 1940px;
	.news {
	  flex: 2;
	  width: 1200px;
	  background: #fff;
	  margin-right: -100px;
	  padding: 10px;
  
	}
	.area {
	  flex: 1;
	  background: #fff;
	  padding: 10px;
	}
  }
  .home-footer {
	display: flex;
	padding-left: 20px;
	margin-top: 20px;
	margin-bottom:20px;
	.box-card {
	  flex: 1;
	  margin-right: 20px;
	  height: 400px;
	  
	  span {
		font-weight: 600;
	  }
	}
  }
  </style>