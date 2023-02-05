<template>
    <div class="randp">
		<!--1.搜索区域-->
		<div class="header">
			
		<el-menu class="el-menu-demo" mode="horizontal" active-text-color="#E5E5E5">
				<el-menu-item >
					<!-- change	仅在输入框失去焦点或员工按下回车时触发 -->
				<el-input @change="searchInp" class="input"    v-model="input"  placeholder="输入关键词搜索"  clearable></el-input>
					
				</el-menu-item> 
				<el-menu-item>
					<el-button  class="b1"   type="primary"  >查询</el-button>
				</el-menu-item>
				
	 
		</el-menu>
		</div>
		<!--2.表格数据展示区域区域-->
		<div class="wrapper">
			<table>
				<tr>
					<td class="t1">
						<div  class="treetext">
								<el-tree :data="data"  font-size="20px" class="tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>

						</div>
					</td>
					<td>
						<el-table :data="tableData" style="font-size: 20px;" ref="singleTable" class="table" border>
						
								
								<el-table-column class="type"  prop="type" label="类型" width="140" >
								</el-table-column>
							
								<el-table-column  prop="name" label="知识名" width="400">
								</el-table-column>
								
								<el-table-column  prop="content" label="内容" width="700px">
								</el-table-column>
								<el-table-column prop="time" sortable  label="时间" width="200" show-overflow-tooltip>
								</el-table-column>
								<el-table-column  prop="hname" label="专家" width="165">
								</el-table-column>
								
						</el-table>
					</td>
				</tr>

			</table>
			
		</div>
		<!--3.分页-->
		<!-- //数据回传 :total-->
		<MyPagination :currentPage="currentPage" :total='total' :pageSize='pageSize' @changePage='changePage' />

	

 	</div>
</template>

<script >
	//子组件 分页
	
	import MyPagination from '../../components/MyPagination.vue';

	
	export default {		
		components:{
   		 //注册组件
		MyPagination,
	
	
	},	
		data(){
			return{
				dialogVisible:false,
				currentPage:1,////选中的高亮页码
				input:'',
				tableData:[],
				total:10,
				pageSize:1,
				type:1,
				list:1,
				title:"添加知识库信息",
				rowData:{},//当前行数据
					data: [{
				
          label: '化肥',
          children: [{
            label: '氮肥',

          },{
			label: '钾肥',
		  },{
			label: '磷肥',
		  },{
			label: '复合肥料',
		  }]
        }, {
          label: '农药',
          children: [{
			label: '杀虫杀螨',
          },{
			label: '杀菌',
			children: [{
              label: '保护性杀菌'
            },{
			  label: '治疗性杀菌'
			},{
			  label: '铲除性杀菌'
			}]
		  },{
			label: '除草',
			children: [{
              label: '选择性除草剂'
            },{
			  label: '无生性除草剂'
			}]
		  },{
			label: '植物生长调节',
			children: [{
              label: '生长素'
            },{
			  label: '赤霉素'
			},{
              label: '细胞分裂素'
            },{
			  label: '甾醇'
			},{
              label: '乙烯'
            },{
			  label: '脱落酸'
			},{
              label: '植物生长抑制'
            },{
			  label: '茉莉酸'
			},{
			  label: '水杨酸'
			}]
		  }]
        }, {
          label: '病害',
          children: [{
            label: '晚疫病',
          }, {
            label: '病毒病',
     	  },{
            label: '青枯病',
          }, {
            label: '灰霉病',
     	  },{
            label: '绵腐病',
          }, {
            label: '棉铃虫',
     	  }]
			},{
          label: '栽培技术',
          children: [
		  {
            label: '播种方式',
     	  },{
            label: '土壤配置',
     	  },{
            label: '种子处理',
          }, {
            label: '温度',
          }, {
            label: '土壤',
     	  },{
            label: '定植',
			children: [{
            label: '整枝',
          }, {
            label: '保花',
     	  }]
          },{
            label: '采收',
			
     	  },{
            label: '绵腐病',
          }, {
            label: '棉铃虫',
     	  }]
			}],
				defaultProps: {
				children: 'children',
				label: 'label'
   	 			},
	};
		},
	methods:{
		
			//分页页码
			changePage(num){
				// this.http(num);
				this.currentPage=num;
				//判断是显示的员工列表数据还是搜索的数据
				if(this.type==1){
					this.http(num);//员工列表

				}else{
					//搜索分页 1 2 list=[0,1,2,3.....] 
					console.log('搜索分页处理----');
					this.tableData=this.list.slice((num-1)*3,num*3);		
					
				}
			},
			//搜索查询数据
			searchInp(val){
				// console.log('搜索-----',val);
				if(!val){
					//搜索为空 显示员工列表
					this.http(1);
					this.currentPage=1;
					this.type=1;
					return;

				}
				this.$api.getSearch({
					search:val 
				}).then(res=>{
					console.log('搜索-----',res.data);
					this.currentPage=1;  //有数据页码就返回为1
					if(res.data.status===200){
						//获取搜索的总数据条数--数据分割
						this.list=res.data.result;
						this.tableData=res.data.result;
						//处理分页
						this.total=res.data.result.lrngth;
						this.pageSize=3;
						this.tableData=res.data.result.slice(0,3);
						this.type=2;
					}else{
						this.tableData=[];
						this.type=2;
						this.total=1;
						this.pageSize=1;
					}
				})
			},
			// 封装 员工列表获取
			http(page){
				this.$api.getBookList({
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
			},
		},
			
			//生命周期函数  视图
		created(){
				this.http(1);
			},
	 
	};
</script>

<style lang="less" scoped>
	.table{
		margin-top: 30px;
		height: 650px;
	}
	

	.tree{
		margin-top: 30px;
		width: 200px;
		margin-left: 170px;
		height: 650px;
		
	}
	.randp{
		margin: 20px;
		width: 80%;
	
	margin-right: 200px;
	}
	.header{
		border-radius: 60px;
		width: 2000px;
		margin-left: 100px;
		button{
			margin-right: 20px;
			
		}
	 }
	 
	 .b1{
		background-color: #26DE4C;
		border-color: #26DE4C ;
		margin-left: 1450px;
		margin-top: -70px;
	 }
.input{
	margin-left: 400px;
	margin-top: 30px;
	
}
	
	  .input /deep/ .el-input__inner {
   			width: 600px;
			margin-left: 400px;
  	}
	 

</style>