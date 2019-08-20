<template>
  <div class="menu">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      background-color="#324057"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="home">
        <i class="el-icon-menu"></i>首页
      </el-menu-item>

      <!-- submenu生成二级菜单 index--唯一标记 分组名可以通过title属性直接设定，也可以通过具名 slot 来设定-->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>数据管理</span>
        </template>
        <el-menu-item index="userList">用户列表</el-menu-item>
        <el-menu-item index="shopList">商家列表</el-menu-item>
        <el-menu-item index="goodsList">食品列表</el-menu-item>
        <el-menu-item index="orderList">订单列表</el-menu-item>
        <el-menu-item index="adminList">管理员列表</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-plus"></i>
          <span>添加数据</span>
        </template>
        <el-menu-item index="addShop">添加商铺</el-menu-item>
        <el-menu-item index="addGoods">添加商品</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-star-on"></i>
          <span>图标</span>
        </template>
        <el-menu-item index="chart">用户分布</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-edit"></i>
          <span>编辑</span>
        </template>
        <el-menu-item index="textEdit">文本编辑</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>设置</span>
        </template>
        <el-menu-item index="setting">管理员设置</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-warning"></i>
          <span>说明</span>
        </template>
        <el-menu-item index="explain">说明</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {
    defaultActive: function() {
      //浏览器刷新后，仍然可以定位到之前选中的路由
      return this.$route.path.replace('/', '')
    }
  },
  methods: {}
}
</script>
<style scoped>
.menu,
.el-menu-row,
.el-menu-col {
  height: 100%;
}
.el-menu-vertical-demo {
  height: 100%;
  width: 200px;
}
.el-menu{
  border:none;
}
</style>