<template>
  <div id="app">
    <div class="manage-page fillcontain">
      <left-menu></left-menu>
      <div class="right-content">
            <vheader></vheader>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
      <!-- <el-row style="height:100%">
        <el-col :span="4" style="min-height:100%;background-color:#324057;">
          
        </el-col>
        <el-col :span="20" style="height:100%;overflow:auto;">
          
        </el-col>
      </el-row> -->
    </div>
  </div>
</template>

<script>
import Vheader from './components/common/Header.vue'
import LeftMenu from './components/common/Menu.vue'
export default {
  name: 'app',
  components: { Vheader, LeftMenu }
}
</script>

<style scope>
/* @import './style/common.css'; */
#app {
  display: flex;
  height: 100%;
}
.fillcontain{
  height: 100%;
  width: 100%;display: flex;
}
.right-content {
  flex: 1;
  overflow:auto;
}
</style>
