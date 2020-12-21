<template>
  <el-menu :default-active="defaultActive" :default-openeds="defaultOpeneds">
    <catalog-menu :parentMenu="parentMenu" class="file-reader-pdf__catalog" :pdfDocument="pdfDocument" :pdfViewer="pdfViewer" :items="outline"/>
  </el-menu>
</template>

<script>
import sidebarMixin from "./sidebarMixin"
import CatalogMenu from './CatalogMenu'
export default {
  components:{CatalogMenu},
  mixins:[sidebarMixin],
  data(){
    return {
      defaultActive:"1",
      defaultOpeneds:[]
    }
  },
  mounted(){
    this.$on('index',(idx)=>{
      if(/^\d+$/.test(idx) && !this.defaultOpeneds.includes(idx)) {
        this.defaultOpeneds.push(idx)
      }
    })
  },
  computed:{
    parentMenu(){
      return this
    }
  },
  props:{
    outline:Array
  }
};
</script>