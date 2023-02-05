<template>
	<div>
		<!-- <h2>左侧导航</h2> -->
    <!-- 折叠 collapse -->
		   <el-menu
      :default-active="$router.path"
      class="el-menu-vertical-demo"
      text-color="#fff" 
      router
      :collapse="isCollapse" 
      >

        <el-menu-item index="/3/"  class="b1">
            <i class="el-icon-menu"></i>
            <span slot="title" >首页</span>
        </el-menu-item>

        
        <el-menu-item index="/news3"  class="b2">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">新闻管理</span>
        </el-menu-item>

        <el-menu-item index="/warn3" class="b3">
            <i class="el-icon-message-solid"></i>
            <span slot="title">预警管理</span>
        </el-menu-item>

        <el-menu-item index="/person-user">
          <i class="el-icon-notebook-2"></i>
          <span slot="title">种植户管理</span>
        </el-menu-item>
        <el-menu-item index="/person-expert">
          <i class="el-icon-notebook-2"></i>
          <span slot="title">专家管理</span>
        </el-menu-item>

        <el-menu-item index="/person-admin">
          <i class="el-icon-notebook-2"></i>
          <span slot="title">管理员管理</span>
        </el-menu-item>

    

     </el-menu>

  
	</div>
</template>

<script >
	export default {
    props:['isCollapse'],//接收来自父类的信息
    data(){
      return{
        //导航展开
           //isCollapse:false
      }
    }
	}
</script>

<style lang="less" scoped >
  .el-menu-vertical-demo{
      border-radius: 0 0 10% 0;
      height:auto;
      background-image:-webkit-linear-gradient(rgb(4, 196, 203),#00CC0E);
        //固定定位
            position: fixed;
            top:0;
            bottom: 0;
       
  }

    .b1:hover{
          /* 悬停的样式 */
        
        background-color: #91e9af !important;
        color: #FFFFFF !important;
        /* 选中的样式 */
    }
    .b1:active {

        background-color: #009D8E;
        color: #FFF;

      }

       .b2:hover{
          /* 悬停的样式 */
        
        background-color: #91e9af !important;
        color: #FFFFFF !important;
        /* 选中的样式 */
    }
    .b2:active {

        background-color: #009D8E;
        color: #FFF;

      }

       .b3:hover{
          /* 悬停的样式 */
        
        background-color: #91e9af !important;
        color: #FFFFFF !important;
        /* 选中的样式 */
    }
    .b3:active {

        background-color: #009D8E;
        color: #FFF;

      }

    .b4:hover{
          /* 悬停的样式 */
        
        background-color: #91e9af !important;
        color: #FFFFFF !important;
        /* 选中的样式 */
    }
    .b4:active {

        background-color: #009D8E;
        color: #FFF;

      }
      .el-menu-vertical-demo:not(.el-menu--collapse) {
          width: 200px;
          min-height: 400px;
        }


 
</style>