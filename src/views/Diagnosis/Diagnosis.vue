<template>
  <div class="diagnosis">
    <div>
    <!--1.搜索区域-->
      <div>
        <el-menu  style="border-radius:20px 0px 0px 0px;margin-top:50px;" mode="horizontal" active-text-color="#E5E5E5">
          <el-menu-item >
            <!-- change	仅在输入框失去焦点或员工按下回车时触发 -->
          <el-input @change="searchInp" class="input"   v-model="input"  placeholder="输入关键词搜索"  clearable></el-input>
          </el-menu-item> 
          <el-menu-item>

            <el-button  class="b1"  icon="el-icon-search" >查询</el-button>
          </el-menu-item>
          
    
      </el-menu>
      </div>
      <!--2.表格数据展示区域区域-->
      <div>
        <el-table :data="tableData"  style="border-radius: 0px 0px 0px 20px;">
                <el-table-column   width="50">
                  </el-table-column>
              <el-table-column  prop="name"   width="300">
                  </el-table-column>
              <el-table-column prop="operate"  width="120">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" >删除</el-button>	
                  </template>
              </el-table-column>

        </el-table>
        <MyPagination  style="background-color:#FFFFFF;margin-top: 1px;" :currentPage="currentPage" :total='total' :pageSize='pageSize' @changePage='changePage' />
      </div>   
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
          <div>
              <el-form :model="permForm"
                              ref="permForm" 
                label-width="100px"
                  class="demo-ruleForm">
                        <el-form-item class="Uimg" prop="Uimg">
                        <el-button  type="primary" @click="innerVisibleImg = true" >上传图片</el-button>
                          <img :src="permForm.Uimg" height="100px" alt="">
                    </el-form-item>
                    </el-form>  
           </div>    
              <div class="d1">
                <input type="text" class="talk_word" id="talkwords">
                <input type="button" value="发送" class="talk_sub" id="talksub"> 
              </div>  
            </div>
           </div>
              <!-- 1. 内弹框 --- 上传图片 -->
              <el-dialog
                    width="40%"
                    title="上传图片"
                    :visible.sync="innerVisibleImg"
                    append-to-body>
                    <DiagnosisUpdate @sendImg="sendImg" ref="upload" />
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="innerVisibleImg = false">取 消</el-button>
                      <el-button type="primary" @click="showImg">确 定</el-button>
                    </span>
                  </el-dialog>
         </div>

  </div>
        
 </div>
</template>

<script >
//子组件 分页

import MyPagination from '../../components/MyPagination.vue';
import DiagnosisUpdate from './DiagnosisUpdate.vue';

export default {		
  
  components:{
      //注册组件
      DiagnosisUpdate,
       MyPagination,

},	

  data(){
    return{
      innerVisibleImg: false, //图片弹框
        imgUrl:'',
        permForm: {
             Uimg:'',
          },
      currentPage:1,////选中的高亮页码
      input:'',
      tableData:[],
      total:10,
      pageSize:1,
      type:1,
      list:1,
      rowData:{}//当前行数据
      
    };
  },
  mounted()
  {

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
      if (Who.value == 1) {
          //如果Who.value为0n那么是 A说
          str = '<div class="atalk"><span>' + TalkWords.value + '</span></div>';
      }// else {
      //     str = '<div class="btalk"><span>' + TalkWords.value + '</span></div>';
      // }
      Words.innerHTML = Words.innerHTML + str;
  }
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
      this.$api.getSessionSearch({
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
    
  
 
    //删除
    handleDelete(index,row){
      console.log('删除',index,row);
         this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        
        
        //请求删除接口

          this.$api.deleteSession1({
            id:row.id
          })  
          .then(res=>{
            console.log('删除成功!',res.data);
            if(res.data.status===200){
                this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //视图更新
              this.http(1);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    }, 
    
    // 封装 员工列表获取
    http(page){
      this.$api.getSession1List({
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

<style lang="less" scoped type="text/css">

  .d1{
    margin-top: -100px;
  }
  .demo-ruleForm{
    margin-top:-20px;
    margin-left: -250px;
    width: 200px;
   
  }

// .chat{

 
// }
.talk_con {
  width: 1400px;
  border-radius: 0px 30px 30px 0px;
  height: 730px;
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
.who{
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

.diagnosis{
  margin: 20px;
}
.header{
  button{
    margin-right: 20px;
    
  }
 }
 


  .input /deep/ .el-input__inner {
       width: 200px;
    // margin-top: -60px;
  }
 
.diagnosis{
width: 80%;
float: right;
margin-right: 200px;

} 
</style>