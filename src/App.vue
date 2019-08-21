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
  min-height: 100%;
}
.fillcontain{
  width: 100%;display: flex;
}
.right-content {
  flex: 1;
  overflow:auto;
}
</style>
