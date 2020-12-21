<template>
  <div class="file-reader-excel__toolbar">
    <div class="file-reader-excel__toolbar-left">
      <search :parent="parent"/>
    </div>
    <div class="file-reader-excel__toolbar-middle">
    </div>
    <div class="file-reader-excel__toolbar-right"></div>
  </div>
</template>

<script>
import Search from "./Search";
export default {
  props: { 
    parent: Object
  },
  components: { Search }
};
</script>

<style lang="scss" scoped>
.file-reader-excel__toolbar {
  background: #292929;
  display: flex;
  height: 42px;
  padding-left: 12px;
  align-items: center;
  &-left {
    flex: 1;
  }
}
</style>