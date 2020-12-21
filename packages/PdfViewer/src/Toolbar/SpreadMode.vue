<template>
  <el-radio-group v-model="value" size="mini">
    <el-radio-button :label="this.spreadMode.NONE">单页</el-radio-button>
    <!-- <el-radio-button :label="this.spreadMode.EVEN">双页视图</el-radio-button> -->
    <el-radio-button :label="this.spreadMode.ODD">双页</el-radio-button>
  </el-radio-group>
</template>

<script>
import defauleConfigMixin from "../defauleConfigMixin"
import toolbarMixin from "./toolbarMixin"
export default {
  mixins:[defauleConfigMixin,toolbarMixin],
  data(){
    return {
      value:""
    }
  },
  watch:{
    value(v){
      if(this.pdfViewer){
        if(this.pdfViewer.spreadMode !== v){
          this.pdfViewer.spreadMode = v
        }
      }
    }
  },
  created(){
    this.value = this.spreadMode.NONE
  }
}
</script>

<style>

</style>