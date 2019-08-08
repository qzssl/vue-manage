<template>
  <div class="header">
    <div class="left">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      levelList: null
    }
  },
  methods: {
    getBreadcrumb() {
      window.console.log(this.$route.matched)
      let matched = this.$route.matched.filter(item => item.meta.title)
      this.levelList = matched
    }
  },
  watch: {
    $route() {
      window.console.log(this.$route.meta)
      this.getBreadcrumb()
    }
  },
  mounted() {
    this.getBreadcrumb()
  },
  components: {}
}
</script>
<style scoped>
.header {
  flex: 1;
}
</style>