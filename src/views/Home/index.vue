<template>
  <div class="tools__home">
    <router-link class="tools__home-tool" v-for="(tool, idx) in tools" :key="idx" :style="{background:tool.bgcolor}" :to="tool.router">
      <div class="tools__home-tool-shadow" :style="{background:tool.bgcolor}"></div>
      <img :src="tool.icon" alt="" />
    </router-link>
    <div style="position:absolute;top:0;overflow:hidden;height:100%">
      <css-doodle click-to-update>
        :doodle {
          @grid: 20 / 100vmax;
          background: #0a0c27;
        }
        --hue: calc(180 + 1.5 * @row * @col);
        background: hsl(var(--hue), 50%, 70%);
        margin: -.5px;
        transition: @r(.5s) ease;
        clip-path: polygon(@pick(
          '0 0, 100% 0, 100% 100%',
          '0 0, 100% 0, 0 100%',
          '0 0, 100% 100%, 0 100%',
          '100% 0, 100% 100%, 0 100%'
        ));
      </css-doodle>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  methods:{
    onClickDoodle(e){
      console.log(e)
    }
  },
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
        },
        {
          label: "像素",
          icon: require("@/assets/pixel.png"),
          bgcolor:"#f5f5f5",
          router:"/pixel"
        },
        // {
        //   label: "树",
        //   icon: require("@/assets/tree.png"),
        //   bgcolor:"#4a3838",
        //   router:"/tree-generator"
        // },
        {
          label: "动态表单",
          icon: require("@/assets/form.png"),
          bgcolor:"#d8f7f4",
          router:"/dynamic-form"
        }
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.tools__home {
  position: relative;
  &-tool {
    text-align: center;
    margin: 20px;
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
      user-select: none;
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
