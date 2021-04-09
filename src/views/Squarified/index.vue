<template>
  <div>
    <div style="height:40px;line-height:40px">
      <el-button size="mini" @click="random">随机</el-button>
    </div>
    <div class="squarified-container" style="height:calc(100% - 40px)" ref="container">
      <div 
        v-for="(item, idx) in squarifiedRectInfo" 
        :key="idx"
        :style="{
          left:item.x + 'px',
          top:item.y + 'px',
          width:item.width + 'px',
          height:item.height + 'px',
          background:colors[idx % colors.length]
        }"
      >权重：{{item.data.value}}</div>
    </div>
  </div>
</template>

<script>
import Squarified from "./Squarified";
export default {
  data() {
    return {
      squarifiedRectInfo:[],
      colors: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'],
      data: []
    };
  },
  mounted() {
    this.random()
    this.$nextTick(()=>{
      this.init()
    })
    window.addEventListener('resize', this.throttle(300, ()=>{
      this.init()
    }))
  },
  methods:{
    random(){
      let data = []
      let random = Math.max(Math.round(Math.random() * 15), 10)
      for(let i = 0 ; i < random; i ++){
        data.push({
          value:Math.max(Math.round(Math.random() * 1000), 50)
        })
      }
      this.data = data
      this.init()
    },
    throttle(timeout = 0, fn){
      let throttleTimeout = null
      return ()=>{
        if(throttleTimeout) return
        throttleTimeout = setTimeout(() => {
          throttleTimeout = null
          fn()
        }, timeout);
      }
    },
    init(){
      let squarified = new Squarified(this.data, {
        width:this.$refs.container.offsetWidth,
        height:this.$refs.container.offsetHeight
      });
      this.squarifiedRectInfo = squarified.rectInfo.rows
    }
  }
};
</script>

<style scoped lang="scss">
.squarified-container {
  position: relative;
  box-sizing: border-box;
  > div {
    box-sizing: border-box;
    position: absolute;
    color: #fff;
    transition: all .3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>