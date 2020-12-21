<template>
  <div class="tools__pdf-viewer">
    <pdf-viewer :url="'/compressed.pdf'"></pdf-viewer>
  </div>
</template>

<script>
export default {
  components: {},
  data(){
    return {
    }
  }
};
</script>

<style lang="scss" scoped>
.tools__pdf-viewer {
  height: calc(100% - 10px);
}
</style>