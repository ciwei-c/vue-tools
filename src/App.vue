<template>
  <div id="app">
    <common-header class="tools__header" />
    <div class="tools__body">
      <router-view />
    </div>
  </div>
</template>
<script>
import CommonHeader from "@/components/Header";
import 'css-doodle'
export default {
  components: { CommonHeader },
};
</script>
<style lang="scss">
#app {
  height: 100%;
  .tools__body {
    height: calc(100% - 60px);
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
