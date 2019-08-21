<template>
  <div class="header">
    <div class="left">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown menu-align="start">
        <img class="avator" src="http://elm.cangdu.org/img/16c6bd4ff9a50556.png" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>首页</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
  </div>
</template>

<script>
export default {
  props: {},
}
</script>
<style scoped>
.header {
  display: flex;
  height: 60px;
  background-color: #eff2f7;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
}
.avator {
  height: 36px;
  width: 36px;
  border-radius: 50%;
  margin-right: 37px;
  cursor: pointer;
}
.el-dropdown-menu {
  min-width: 100px;
  margin: 5px 0;
  border: 1px solid #d1dbe5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.12);
  padding: 6px 0;
}

.popper__arrow {
  display: none;
}
</style>