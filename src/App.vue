<template>
  <div id="app">
    <left-menu></left-menu>
    <div class="right-content">
      <vheader></vheader>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
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
.right-content {
  flex: 1;
}
</style>
