<template>
    <div class="randp">
    
            <div class="list" >
              <table style="margin-left: 50px;">
                <tr>
                  <el-input  class="input"   v-model="input"  placeholder="输入关键词搜索"  clearable></el-input>
                  <el-button  class="b1"  style="background-color: #26DE4C;border-color: #26DE4C ;" type="primary" >查询</el-button>
                </tr>
                <tr>
                  <td>
                    <div style="margin-top: 50px;background-color: #F5F5F5;height:70px">
  
                      <h3 style="margin-top: 50px;">风沭千桦</h3>
                    
                       <el-button class="d1" size="mini" type="danger"  icon="el-icon-delete" >删除</el-button>	
  
                    </div>
                   
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style="background-color: #F5F5F5;height:70px">
  
                      <h3 >江海宸</h3>
                     
                       <el-button class="d1" size="mini" type="danger"  icon="el-icon-delete" >删除</el-button>	
  
                    </div>
                   
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style="background-color: #F5F5F5;height:70px">
  
                      <h3>utru</h3>
                   
                       <el-button class="d1" size="mini" type="danger"  icon="el-icon-delete" >删除</el-button>	
  
                    </div>
                   
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style="background-color: #F5F5F5;height:70px">
  
                      <h3>张萌</h3>
                 
                       <el-button class="d1" size="mini" type="danger"  icon="el-icon-delete" >删除</el-button>	
  
                    </div>
                   
                  </td>
                </tr>
              </table>
  
            </div>
      
     
          <div class="chat">      
           <!--1.聊天信息-->
              <div class="talk_con">
                <div style="margin-left: 600px;">2022/11/14</div>
                <div style="margin-left: 630px;">10:30</div>
              <div class="talk_show" id="words">
                <div class="atalk"><span id="asay">请问种植番茄出现青枯病怎么办？</span></div>
                <div class="btalk"><span id="bsay">该病喜欢高温高湿，发病最适温度范围20-38℃，最适感病生育期，是番茄结果中后期，发病潜育期5-20天</span></div>
              </div>
              <div class="talk_input">
               
                <button  style="background-color: #f9f9f9;border: none;" class="whotalk" id="who" value="1"></button>
                <div>
              
                </div>
                <input type="text" class="talk_word" id="talkwords">
                <input type="button" value="发送" class="talk_sub" id="talksub">     
              </div>
            </div>
                    
       
  </div>
  
   </div>
  </template>
  <script>
  //子组件


    export default {
    
      data() {
        return {
        
          permForm: {
               Uimg:'',
            },
       
        }
      },
      methods:{
           /**
         * 显示图片的地址
         */
         sendImg(val) {
          console.log("显示图片的地址", val);
          this.imgUrl = val;
        },
        /**
         * 显示图片--确定按钮
         */
        showImg() {
          this.innerVisibleImg = false;
          this.permForm.img = this.imgUrl;
          //清空图片上传的列表
          this.$refs.upload.fileList = [];
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert("submit!");
            } else {
              console.log("error submit!!");
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
      }
    }
  </script>
  
  <style type="text/css" >
  .d1{
    margin-left: 200px;
    margin-top: -60px;
  }
  .input{
    width: 200px;
    margin-top: 30px;
  }
  .b1{
    margin-left: 20px;
  }
  .list{
    width: 350px;
    margin-top: 80px;
    margin-left: 210px;
    height: 700px;
    border-radius: 30px 0px 0px 30px;
    background-color: #ffffff;
  }
  .chat{
    margin-left: 303px;
    margin-top: -750px;
   
  }
  .talk_con {
    width: 1400px;
    border-radius: 0px 30px 30px 0px;
    height: 700px;
    /* border: 1px solid #666; */
    margin: 50px auto 0;
    background: #f9f9f9;
  }
  .talk_show {
    width: 1380px;
    height: 550px;
     border-radius: 0px 30px 30px 0px;
    /* border: 1px solid #666; */
    background: #fff;
    margin: 10px auto 0;
    overflow: auto;
  }
  .talk_input {
    width: 580px;
    margin: 10px auto 0;
  }
  .whotalk {
    width: 80px;
    height: 30px;
    float: left;
    outline: none;
  }
  .talk_word {
    width: 420px;
    height: 26px;
    padding: 0px;
    border-color: #c0ccd3;
    float: left;
    margin-top: 10px;
    border-radius: 50px;
    margin-left: 10px;
    outline: none;
    text-indent: 10px;
  }
  .talk_sub {
    width: 56px;
    height: 30px;
    float: left;
    margin-left: 10px;
    border:none;
    color: #ffffff;
    margin-top: 10px;
    border-radius: 10px;
    background-color: #3AF546;
  }
  .atalk {
    margin: 10px;
  }
  .atalk span {
    display: inline-block;
    background: #0181cc;
    border-radius: 10px;
    color: #fff;
    padding: 5px 10px;
  }
  .btalk {
    margin: 10px;
    text-align: right;
  }
  .btalk span {
    display: inline-block;
    background: #ef8201;
    border-radius: 10px;
    color: #fff;
    padding: 5px 10px;
  }
  </style>
  
  <script type="text/javascript">
  window.onload = function() {
    var Words = document.getElementById("words");
    var Who = document.getElementById("who");
    var TalkWords = document.getElementById("talkwords");
    var TalkSub = document.getElementById("talksub");
    TalkSub.onclick = function() {
        //定义空字符串
        var str = "";
        if (TalkWords.value == "") {
            // 消息为空时弹窗
            alert("消息不能为空");
            return;
        }
        if (Who.value == 0) {
            //如果Who.value为0n那么是 A说
            str = '<div class="atalk"><span>' + TalkWords.value + '</span></div>';
        } else {
            str = '<div class="btalk"><span>' + TalkWords.value + '</span></div>';
        }
        Words.innerHTML = Words.innerHTML + str;
    }
  }
  </script>