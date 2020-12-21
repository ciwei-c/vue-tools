<template>
  <div class="tools__home">
    <router-link class="tools__home-tool" v-for="(tool, idx) in tools" :key="idx" :style="{background:tool.bgcolor}" :to="tool.router">
      <div class="tools__home-tool-shadow" :style="{background:tool.bgcolor}"></div>
      <img :src="tool.icon" alt="" />
    </router-link>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tools: [
        {
          label: "颜色拾取器",
          icon: require("@/assets/picker.png"),
          bgcolor:"#1c2950",
          router:"/color-picker"
        },
        {
          label: "PDF预览",
          icon: require("@/assets/pdf.png"),
          bgcolor:"#630707",
          router:"/pdf-viewer"
        },
        {
          label: "EXCEL预览",
          icon: require("@/assets/excel.png"),
          bgcolor:"#0e4800",
          router:"/excel-viewer"
        },
        {
          label: "选区",
          icon: require("@/assets/selection.png"),
          bgcolor:"#606266",
          router:"/selection"
        }
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.tools__home {
  padding: 20px;
  &-tool {
    text-align: center;
    margin-right: 20px;
    display: inline-flex;
    width: 300px;
    align-items: center;
    justify-content: center;
    height: 200px;
    border-radius: 4px;
    cursor: pointer;
    z-index: 2;
    position: relative;
    img {
      width: 40%;
    }
    &:hover {
      .tools__home-tool-shadow {
        left: 10px;
        top: 10px;
      }
    }
    &-shadow {
      z-index: -1;
      transition: all 0.3s;
      position:absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      opacity: 0.5;
      border-radius: 4px;
    }
  }
}
</style>
