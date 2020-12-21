<template>
  <div class="file-reader-pdf__toolbar__scale">
    <div class="file-reader-pdf__toolbar__scale-btns">
      <el-button size="mini" @click="onScale(false)" :disabled="disableZoomOut" type="text" icon="el-icon-zoom-out"></el-button>
      <el-button style="margin-left:0px" size="mini" @click="onScale(true)" :disabled="disableZoomIn" type="text" icon="el-icon-zoom-in"></el-button>
    </div>
    <div class="file-reader-pdf__toolbar__scale-options">
      <el-select v-model="scale" size="mini" style="width:100px" :popper-append-to-body="false">
        <el-option v-for="(option, idx) in options" :key="idx" :label="option.label" :value="option.value"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import toolbarMixin from "./toolbarMixin"
import defauleConfigMixin from "../defauleConfigMixin"
import { throttle } from "../utils"
export default {
  mixins:[toolbarMixin, defauleConfigMixin],
  data(){
    return {
      style:null,
      options:[{
        value:'auto',
        label:'自动缩放'
      },{
        value:'page-actual',
        label:'实际大小'
      },{
        value:'page-fit',
        label:'适应页面'
      },{
        value:'page-width',
        label:'适应页宽'
      },{
        value:'50%',
        label:'50%'
      },{
        value:'75%',
        label:'75%'
      },{
        value:'100%',
        label:'100%'
      },{
        value:'125%',
        label:'125%'
      },{
        value:'150%',
        label:'150%'
      },{
        value:'200%',
        label:'200%'
      },{
        value:'300%',
        label:'300%'
      }]
    }
  },
  created(){
    this.onResizeListen()
  },
  watch:{
    pdfViewer(v){
      if(v){
        v.eventBus.on("pagesinit", () => {
          this.setCurrentScaleValue(this.scale)
        });
      }
    },
    scale(v){
      this.onResizeListen()
      v = this.getScaleValue(v)
      this.setCurrentScaleValue(v)
    }
  },
  computed:{
    disableZoomOut(){
      return this.getScaleValue(this.scale) === this.minScale
    },
    disableZoomIn(){
      return this.getScaleValue(this.scale) === this.maxScale
    }
  },
  methods:{
    onResizeListen(){
      if(this.scale === 'auto' && !this.onresize){
        this.onresize = window.onresize = throttle(100, ()=>{
          if(this.pdfViewer.currentScaleValue === "auto"){
            this.setCurrentScaleValue("auto")
          }
        })
      } else {
        this.onresize = window.onresize = null
      }
    },
    setCurrentScaleValue(currentScaleValue){
      this.pdfViewer.currentScaleValue = currentScaleValue
      // let head = document.getElementsByTagName('head')[0]
      // if(this.pdfViewer.currentScale < 1){
      //   if(this.style){
      //     head.removeChild(this.style);
      //     this.style = null
      //   }
      //   this.style = document.createElement('style')
      //   this.style.innerHTML  = `.file-reader-pdf .textLayer >div {
      //     transform: scaleX(${this.pdfViewer.currentScale}) !important;
      //   }`
      //   head.appendChild(this.style)
      // } else {
      //   if(this.style){
      //     head.removeChild(this.style);
      //     this.style = null
      //   }
      // }
    },
    onScale(isAdd){
      let currentScale = Number(this.pdfViewer.currentScale.toFixed(1))
      let scale = isAdd ? 10 : - 10
      scale = currentScale * 10 * 10 + scale
      if( scale < this.minScale * 10 * 10){
        scale = this.minScale * 10 * 10
      } else if(scale > this.maxScale * 10 * 10){
        scale = this.maxScale * 10 * 10
      }
      this.scale = scale + "%"
    },
    getScaleValue(v){
      if(v.endsWith("%")){
        v = Number(v.split("%")[0]) / 100
      }
      return v
    }
  }
}
</script>

<style lang="scss" >
.file-reader-pdf__toolbar__scale {
  display: flex;
  align-items: center;
  justify-content: center;
  .el-select-dropdown  {
    .el-select-dropdown__item {
      font-size: 12px;
      padding: 0 12px;
      height: 22px;
      line-height: 22px;
    }
  }
  &-btns{
    margin-right: 20px;
    transform: scale(1.4);
  }
}
</style>