<template>
  <el-upload
  class="avatar-uploader"
  :action="baseUrl + actionUrl"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imgUrl" :src="baseImgPath + imgUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</template>
<script>
import config from '../../../config/config';
  export default {
    props:{
      actionUrl:{type:String,default:''},
      imageUrl:{type:String,default:''}
    },
    watch:{
      //由于props中imageUrl是异步得到的，而 data（）函数只是在初始化的时候会运行一次,
      //所以imgUrl一开始是空，此时需要watch才能得到值。
      imageUrl:function(val){
        this.imgUrl = val;
      }
    },
    data() {
      return {
        baseUrl:config.baseUrl,
        baseImgPath:config.baseImgPath,
        imgUrl:this.imageUrl,
      };
    },
    methods: {
      //成功上传
      handleAvatarSuccess(res) {
        if(res.status === 1){
          this.imgUrl = res.image_path;
          this.$emit('handleAvatarSuccess',res)
        }else{
          this.$message.error('上传图片失败！');
        }
      },
      //上传之前
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
.el-form-item__label{
  line-height: 1;
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #48576a;
  line-height: 1;
  padding: 11px 12px 11px 0;
  box-sizing: border-box;
}
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
