<template>
  <div class="tools__color-picker">
    <div class="tools__color-picker-header">
      <el-button size="mini" type="primary" @click="getRandomColorBlocks">刷新色盘</el-button>
      <div style="margin-left:20px;">点击吸管获取颜色</div>
      <color-picker @pick="onPick"><div>11212</div></color-picker>
      <div style="margin-left:50px;margin-right:20px">你选择的颜色是: {{pickedColor}}</div>
      <div :style="{background:pickedColor, height:'10px', width:'20px'}"></div>
    </div>
    <div style="height: calc(100% - 60px)">
      <div
        class="tools__color-picker-block"
        v-for="(randomColorBlock, idx) in randomColorBlocks"
        :key="idx"
        :style="{ background: randomColorBlock }"
      ></div>
    </div>
  </div>
</template>

<script>
import { Button } from 'element-ui';
export default {
  components: {'el-button':Button},
  data() {
    return {
      randomColorBlocks: [],
      pickedColor: ""
    };
  },
  mounted() {
    this.getRandomColorBlocks();
  },
  methods: {
    onPick(v){
      this.pickedColor = v
    },
    getRandomColorBlocks() {
      this.randomColorBlocks = []
      for (let i = 0; i < 500; i++) {
        let color = "rgb(";
        color += `${Math.ceil(Math.random() * 255)},`;
        color += `${Math.ceil(Math.random() * 255)},`;
        color += `${Math.ceil(Math.random() * 255)}`;
        this.randomColorBlocks.push(`${color})`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tools__color-picker {
  height: 100%;
  font-size: 12px;
  * {
    color: #fff;
  }
  &-header {
    height: 60px;
    align-items: center;
    display: flex;
  }
  &-block {
    height: 10%;
    width: 2%;
    float: left;
  }
}
</style>