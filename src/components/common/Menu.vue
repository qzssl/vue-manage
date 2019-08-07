<template>
  <div class="menu">
    <el-row class="el-menu-row">
      <el-col :span="12" class="el-menu-col">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="manage">
            <i class="el-icon-menu"></i>首页
          </el-menu-item>

          <!-- submenu生成二级菜单 index--唯一标记 分组名可以通过title属性直接设定，也可以通过具名 slot 来设定-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>数据管理</span>
            </template>
            <el-menu-item index="1-1">用户列表</el-menu-item>
            <el-menu-item index="1-2">商家列表</el-menu-item>
            <el-menu-item index="1-3">食品列表</el-menu-item>
            <el-menu-item index="1-4">订单列表</el-menu-item>
            <el-menu-item index="1-5">管理员列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-plus"></i>
              <span>添加数据</span>
            </template>
            <el-menu-item index="2-1">添加商铺</el-menu-item>
            <el-menu-item index="3-2">添加商品</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>图标</span>
            </template>
            <el-menu-item index="3-1">用户分布</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>设置</span>
            </template>
            <el-menu-item index="4-1">管理员设置</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-warning"></i>
              <span>说明</span>
            </template>
            <el-menu-item index="5-1">说明</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    handleOpen(key, keyPath) {
      window.console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      window.console.log(key, keyPath)
    }
  }
}
</script>
<style scoped>
.menu,
.el-menu-row,
.el-menu-col {
  height: 100%;
}
.el-menu-vertical-demo {
  width: 200px;
  min-height: 400px;
  height: 100%;
}
</style>