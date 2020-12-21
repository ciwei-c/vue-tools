<template>
  <div class="tools__header">
    <router-link class="tools__header-logo" to="/">VUE-TOOLS</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.tools__header {
  height: 60px;
  display: flex;
  padding: 0 20px;
  background: #0f1117;
  &-logo {
    color: #ffdf00;
    font-size: 28px;
    line-height: 60px;
  }
}
</style>