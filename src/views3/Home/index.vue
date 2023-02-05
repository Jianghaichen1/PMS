<template>
    <div class="home">
      <!-- 顶部区域 -->
     <div class="header">
        <div class="item">
          总访问量
          <div class='num'>726,520</div>
          <div class="bottom">今日访问量：342</div>
        </div>
        <div class="item">检测量
          <div class='num'>836,175</div>
           <div class="bottom">今日检测量：442</div>
        </div>
        
      </div>
    
  
      <!-- 预警-->
      <div class="content">
        <div class="time-info">
          <div class="title">预警</div>
                <div id="warn" style="width: 1200px; height: 360px"></div>
        </div>
        <div  class="box-card">
           <el-card>
             <div slot="header" class="clearfix">
                <span>最新内容</span>
              </div>
              <div>
                1.请遵守管理员手册
              </div>
              <div>
                2.请处理预警信息
              </div>
        </el-card>
        </div>
      </div>
  
      <!-- 最新内容 -->
      <div class="home-footer">
        <div class="area">
              <div class="title">位置分布</div>
                <div id="location" style="width: 100%; height: 360px">
                  <baidu-map :zoom="zoom" @ready="handler" class="bm-view" :scroll-wheel-zoom='true'>
                      <!-- scroll-wheel-zoom：能否通过滚轮缩放地图 -->
                  </baidu-map>
                </div>
  
          </div>
      </div>
    </div>
  </template>
  
      // 安装：npm install echarts
          //使用方式
          //1.导入echarts在组件内使用
          //2.导入全局 挂载原型上  全局使用
          //3.开发成vue插件	
  
          //1.使用 main.js 全局挂载
          //导入所有 并重命名
              import * as echarts from 'echarts'
              Vue.prototype.$echarts=echarts;
          //2.直接使用
              this.$echarts.xxx	
  <script>

  import *as echarts from "echarts";
import $ from "jquery"

      export default {
      //生命周期函数  mounted
      data(){
          return{
              // 缩放级别
              zoom: 17
          }
      },
          mounted(){
                  this.warn();
                	clearInterval(mywarn);
        let mywarn=setInterval(()=>{
          this.warn();  //每秒更新一次
        },2100);
              },
      methods:{
        warn(){
      var chartDom2 = document.getElementById('warn');
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
            max: 1500,
            min: 300,
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            name: '预警',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: data
          },
          {
            name: '报警',
            type: 'line',
            data: data2
          }
        ]
      };
      app.count = 11;
      setInterval(function () {
        let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
        data.shift();
        data.push(Math.round(Math.random() * 1000));
        data2.shift();
        data2.push(+(Math.random() * 10 + 5).toFixed(1));
        categories.shift();
        categories.push(axisData);
        categories2.shift();
        categories2.push(app.count++);
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
      }
       
  </script>
  
  
  <style lang='less' scoped>
  .bm-view {
    width: 100%;
    height: 85vh;
}
  .home{
    margin: 10px;
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
     
     .item:nth-child(1){
      background-image: linear-gradient(#04C4CB,#00CC0E);
    }
     .item:nth-child(2){
      background-image: linear-gradient(#1cd2f1,#39717a);
    }
  }
  .content {
    margin: 20px;
    display: flex;
    height: 400px;
    width: 2000px;
    margin-left: 100px;
    .time-info {
      flex: 2;
      background: #fff;
      width:00px;
      margin-right: 20px;
      padding: 10px;
    
    }
    .area {
      flex: 1;
      background: #fff;
      padding: 10px;
    }
  }
  .box-card {
         width: 400px;
         height: 400px;
        // flex: 1;
      margin-right: 100px;
        span {
          font-weight: 600;
        }
      }
  .home-footer {
    display: flex;
    width: 1600px;
    height: 1010px;
    padding-left: 20px;
    margin-left: 100px;
    margin-bottom:20px;

  }
  </style>