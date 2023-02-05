<template>
	<div>
    
        <div class="content">
            <div class="envir">
              <table class="t1">
                <tr>
                  <td>
                    <div id="location">
                  <baidu-map :zoom="zoom" @ready="handler" class="bm-view" :scroll-wheel-zoom='true'>
                      <!-- scroll-wheel-zoom：能否通过滚轮缩放地图 -->
                  </baidu-map>
                </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src="../../assets/img/sun.jpg"  class="j1" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <div id="air" class="air" ></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src="../../assets/img/rain.gif" class="j2" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <div id="rain" class="rain" ></div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div id="gas" class="gas"  ></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div id="main2" class="main2"  ></div>
                  </td>
                </tr>
              </table>
             
          </div>
            

           
    </div>

	</div>
</template>

<script>
import *as echarts from "echarts";
import { watch } from "fs";
import $ from "jquery"
// import { when } from "q";

	export default {
      mounted(){
        this.alert();
				this.bar();
        this.rain();
        this.gas();
				clearInterval(mygas);
        let mygas=setInterval(()=>{
          this.gas();  //每秒更新一次
        },1400);
        clearInterval(mybar);
        let mybar=setInterval(()=>{
          this.bar(); 
        },4100);
        clearInterval(myrain);
        let myrain=setInterval(()=>{
          this.rain(); 
        },4100);
			},
      data() {
      
        return{
          // 缩放级别
          zoom: 17,
          gasData:('data'),
         }
       },     
	methods:{
    alert(){
     alert("太阳光照过高");
    },
		bar(){
			 // 基于准备好的dom，初始化echarts实例
			 //挂载全局
		
    var chartDom = document.getElementById('air');
    var myChart = echarts.init(chartDom);
    var option;

    let base = +new Date(2020, 8, 3);
    let oneDay = 24 * 3600;
    let date = [];
    let data = [Math.random() * 365];
    for (let i = 1; i < 20000; i++) {
      var now = new Date((base += oneDay));
      date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
      data.push(Math.round((Math.random() - 0.5) * 300 + data[i - 1]));
      
    }
    option = {
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        }
      },
      title: {
      
        text: '太阳光照强度'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 10
        },
        {
          start: 0,
          end: 10
        }
      ],
      series: [
        {
          name: '光照强度lx',
          type: 'line',
          symbol: 'none',
          sampling: 'lttb',
          itemStyle: {
            color: 'rgb(255, 70, 131)'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 158, 68)'
              },
              {
                offset: 1,
                color: 'rgb(255, 70, 131)'
              }
            ])
          },
          data: data
        }
      ],
    };
    
    
		// 使用刚指定的配置项和数据显示图表。
    option && myChart.setOption(option);
		// myChart.setOption(option);
		

		},
    rain(){
      var chartDom1 = document.getElementById('rain');
      var myChart1 = echarts.init(chartDom1);
     
    var option1;

    var categoryData = [];
    let oneDay = 24 * 3600 * 1000;
    let base = +new Date(2020, 9, 3);
   
    let data = [Math.random() * 300];
    var errorData = [];
    var barData = [];
    var dataCount = 100;
    for (var i = 0; i < dataCount; i++) {
      var val = Math.random() * 1000;
      var now = new Date((base += oneDay));
      categoryData.push(
        [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
      );
      categoryData.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));

      errorData.push([
        i,
        echarts.number.round(Math.max(0, val - Math.random() * 100)),
        echarts.number.round(val + Math.random() * 80)
      ]);
      barData.push(echarts.number.round(val, 2));
    }
    option1 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      title: {
        text: '小时雨量变化'
      },

      dataZoom: [
        {
          type: 'slider',
          start: 50,
          end: 70
        },
        {
          type: 'inside',
          start: 50,
          end: 70
        }
      ],
      xAxis: {
        data: categoryData
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          name: 'rain',
          data: barData,
          itemStyle: {
            color: '#77bef7'
          }
        }
      ]
    };
    option1 && myChart1.setOption(option1);
    }, 
    gas(){
  
      var chartDom2 = document.getElementById('gas');
      var myChart2 = echarts.init(chartDom2);
      var option2;

      const categories = (function () {
        let now = new Date();
        let res = [];
        let len = 10;
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
          now = new Date(+now - 2000);
         
      }  
   
        return res;

      
      })();
      const categories2 = (function () {
        let res = [];
        let len = 10;
        while (len--) {
          res.push(10 - len - 1);
        }
        return res;
      })();
      const data = (function () {
        let res = [];
        let len = 10;
        while (len--) {
          res.push(Math.round(Math.random() * 1000));
        }
      
        return res;
      })();
     
     
      const data2 = (function () {
        let res = [];
        let len = 0;
        while (len < 10) {
          res.push(+(Math.random() * 10 + 5).toFixed(1));
          len++;
        }
        return res;
      })();
      option2 = {
        
        color: ['#3A82FF','#2DD979'],
        title: {
          text: '二氧化碳、氧气变化',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },

      
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: categories
          },
          {
            type: 'category',
            boundaryGap: true,
            data: categories2
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
          
            max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2]
          },
          {
            type: 'value',
            scale: true,
            max: 1200,
            min: 300,
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            name: 'Co2',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: data
          },
          {
            name: 'O2',
            type: 'line',
            data: data2
          }
        ]
      };
      app.count = 11;
      setInterval(function () {
      
        let axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");
        data.shift();
        data.push(Math.round(Math.random() * 1000));
        data2.shift();
        data2.push(+(Math.random() * 10 + 5).toFixed(1));
        categories.shift();
        categories.push(axisData);
        categories2.shift();
        categories2.push(app.count++);
        // window.setTime(alert("二氧化碳浓度过高")20000);
        // alert("二氧化碳浓度过高");
        myChart2.setOption({
          xAxis: [
            {
              data: categories
            },
            {
              data: categories2
            }
          ],
          series: [
            {
              data: data
            },
            {
              data: data2
            }
          ]
        });

        
      }, 4000);
    
        // 使用刚指定的配置项和数据显示图表。
      option2 && myChart2.setOption(option2);
      

    },
    handler({ BMap, map }) {

      // 标注点的经纬度
      var point = new BMap.Point(103.82241, 30.702643)
      map.centerAndZoom(point, 13)

      // 创建标注
      var marker = new BMap.Marker(point)

      // 将标注添加到地图中
      map.addOverlay(marker)
      var circle = new BMap.Circle(point, 6, { strokeColor: 'Red', strokeWeight: 6, strokeOpacity: 1, Color: 'Red', fillColor: '#f03' })
      map.addOverlay(circle)
    },
    

	},
  // watch: {

  //   //监听的变量名
  //   gasData(val){
  //     this.gasData=val
  //     this.gas(data);
  //     if(data>=800){
       
  //         this.$message.error('二氧化碳含量过高');   
  //     }

    
  //   }
  // }
  	
	}
</script>

<style lang='less' scoped>

.bm-view {
  margin-top: 50px;
    width: 100%;
    margin-left: 10px;
    border-radius: 30px;
    height: 500px;
}
.content {
    margin-top: 10px;
  margin-left: 10px;
  margin-right: 50px;
  display: flex;
  
  height: 500px;
  width: 100%x;
  .envir {
    flex: 2;
    
    border-radius: 30px;
    width: 1000px;
    background: #fff;
    padding: 10px;
    height: 3000px;
   
  }
  .t1{
    margin-left: 300px;
  }
  .air{
   width: 1400px;
   margin-left:60px;
    height: 500px;
    }
    .rain{
      width: 1400px;
      margin-left:60px; 
      height: 500px;
      }
    .gas{
      width: 1400px;
      margin-left:60px; 
      height: 500px;
    }
}
  .j1{
  margin-left:130px;
  border-radius: 30px;
  }
  .j2{
    margin-left:140px;
    border-radius: 30px;

  }
</style>

