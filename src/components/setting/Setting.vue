<template>
  <div class="setting">
    <el-row>
      <header class="admin-title">管理员信息</header>
      <el-col :span="14">
        <p class="text">姓名：{{admin.user_name}}</p>
        <p class="text">注册时间：{{admin.create_time}}</p>
        <p class="text">管理员权限：{{admin.admin}}</p>
        <p class="text">管理员 ID：{{admin.id}}</p>
        <p class="text avatar-text">
          <span>更换头像</span>
          <upload :actionUrl="actionUrl"
          v-on:handleAvatarSuccess="uploadImg"></upload>
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { adminInfo } from '../api/api';
import Upload from '../common/Upload.vue'
export default {
  components: { Upload },
  data(){
    return {
      actionUrl:'/v1/addimg/shop',
      admin:{}
    }
  },
  created(){
    this.initData()
  },
  methods:{
    async initData(){
      try{
        const res =await adminInfo()
        if(res.status === 1){
          this.admin = {...res}
        }else{
          this.$message({
            type:'error',
            message:res.message
          })
        }
      }catch(err){
        window.console.log(err)
      }
    },
    uploadImg(res){
      this.admin.avatar = res.image_path;
    }
  }
}
</script>
<style scoped>
.admin-title{
  margin-top:20px;
  font-size:24px;
  color:#666;
  text-align: center;
}
.setting .el-col .text{
  padding:20px;
}
.avatar-text span{
  margin-bottom:10px;
  display: block;
}
.setting .avatar-text{
  height: 160px;
}
</style>
<style>
.setting .el-col{
  background-color: #f9fafc;
  min-height: 400px;
  margin: 20px auto 0;
  border-radius: 10px;
  float: inherit;
  box-sizing: border-box;
}

</style>