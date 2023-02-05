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
			<div class="title" >云上大棚</div>
        <div style="width: 700px;">
            <div style="height: 200px;width:350px;float:left;margin-right: -100px ;">
              <el-select v-model="value" clearable placeholder="请选择" style="margin-top:10px;width: 150px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <br/>
              <div class="ol" style="float: left;margin-top: 40px;font-size: 15px;"> 
                  <ol style="background-color:#E6E6E6">大鹏面积 5849m^2</ol>
                  <ol style="background-color:#F5F5F5">种植株数 1457株</ol>
                  <ol style="background-color:#E6E6E6">成长阶段 幼苗期</ol>
              </div> 
            </div>
            <div style="height: 200px;float:left;">
                <div id="air" style="width: 400px; height: 250px;"></div>
                <div id="location"></div>
              </div>
          </div>
          <div>
            <table >
                <tr>
                  <td>
                    <img  src="../../assets//img/j1.png"  style="margin-left: 20px;width: 180px;margin-right: 10px;margin-top: 50px;" />
                    <img  src="../../assets//img/j2.png"  style="width: 180px;margin-right: 10px;margin-top: 50px;"  />
                    <img  src="../../assets//img/j3.png"  style="width: 180px;margin-right: 10px;margin-top: 50px;" />
                  </td>
                  <td colspan="2">
                      <h2 style="font-size: 40px;margin-left: 20px;margin-top: 50px;">^</h2>
                      <h2 style="font-size: 40px;margin-left: 20px;transform: rotate(180deg);">^</h2>
                  </td>
                </tr> 
                <tr>
                 
                  <p style="margin-left: 5px;margin-top: 10px;">回放时间</p>
                  <p style="margin-left: 50px;">2022—10—24—13:00</p>
                  <p style="margin-left: 50px;">2022—10—25—13:00</p>  
                  <p style="font-size: 20px;margin-top: -25px;margin-left: 400px;color: #95F204;">开始回放</p>
              
                </tr>
         </table>
            
          </div>
			

		</div>
    </div>

    <!-- 知识库 -->
    <div class="home-footer">
      <el-card class="box-card">
        <div class="title" style="margin-top: 10px;font-size: 20px;margin-left: 15px;">知识库</div>
         <!--2.表格数据展示区域区域-->
         <div class="wrapper">            <!-- 斑马纹-->
          <el-table :data="tableData1"  style="font-size: 20px;" :stripe="true"  :show-header="false" border>
           <el-table-column prop="name"  width="400">
           </el-table-column>
           <el-table-column prop="content"  width="950">
           </el-table-column>
        
          </el-table>
        </div>
      </el-card>
      <el-card  style="width: 400px;height: 300px;">
        <div slot="header" class="clearfix">
          <span>快捷入口</span>
        </div>
        <div class="text item">
         
          <div>
            <el-button type="text" @click="dialogVisible = true">预警</el-button>
					
             <el-button>在线诊断</el-button>
          <el-button>知识库查询</el-button>
					</div>
        
			 
        </div>
      </el-card>
    </div>
    <el-dialog
        title="预警"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>
          <table style="margin-left: 100px;">
            <tr>
              <td>
                <h3>预警周期</h3>
              </td>
              <td>
                <input  class="i1" />
              </td>
            </tr>
            <tr>
              <td>
                <input class="i2" type="checkbox" name="vehicle" value="man"/>人工预警
                <input class="i3"    type="checkbox" name="vehicle" value="mind"/>智能预警
              </td>
            </tr>
          </table>
        
             
    
    
  </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
  
</template>

<script>
	export default {
	//生命周期函数  mounted
		mounted(){
				this.bar();
			
			},
      data() {
      return {
      
        dialogVisible: false,
        input:'',
        total:10,
        pageSize:1,
        tableData:[],
        tableData1:[],
        options: [ {
          value: '1',
          label: '南阳一号基地'
        }, {
          value: '2',
          label: '南阳二号基地'
        }],
        value: ''
      }
    },
	methods:{ 
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
            
          });
      },
		bar(){
			 // 基于准备好的dom，初始化echarts实例
			 //挂载全局
		var myChart = this.$echarts.init(document.getElementById('air'));

		// 指定图表的配置项和数据
		var option = {
			
      title: {
        text: '空气质量小时变化'
      },
      tooltip: {
        trigger: 'axis'
      },
  
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
       
        boundaryGap: true,
        data: ['11:00','14:00','17:00','23:00','3:00','7:00']
      },
      yAxis: {
        type: 'value',
        name:'ppm',
        min:0,
        max:5000,
        
          
      },
      series: [
        {
      
          name: 'Co2',
          type: 'line',
          stack: 'Total',
          data: [896, 1050, 732, 360, 420, 630]
        },
        {
      
          name: 'No2',
          type: 'line',
          stack: 'Total',
          data: [1300,720 ,535, 745, 970, 1245]
        },
         {
          name: 'So2',
          type: 'line',
          stack: 'Total',
          data: [500,120 ,235, 345, 420, 490]
        },
      ]
    };

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		

		},

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
  .i2{
    margin-top: 40px;

  }
  .i3{
    margin-top: 40px;
    margin-left: 100px;
  }
  .i1{
    border-radius: 20px;
    border-color: #D7D7D7;
    height: 20px;
    margin-left: -50px;
}
  .warn{
    width: 130px;
    margin-left: -20px;
  }
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
  width: 1850px;
  .box-card {
    flex: 1;
    margin-right: 20px;
    height: 450px;
    
    span {
      font-weight: 600;
    }
  }
}
</style>
<!-- <script type="text/javascript">
window.setTime(alert("二氧化碳浓度过高"),20000);
</script> -->