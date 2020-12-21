<template>
  <div class="file-reader-pdf__sidebar" :style="{width:sidebarVisible ? '250px' : '0px',minWidth:sidebarVisible ? '250px' : '0px'}">
    <sider-toggle :outline="outline" :pdfDocument="pdfDocument" :pdfViewer="pdfViewer" :parent="parent"/>
    <catalog :outline="outline" :pdfDocument="pdfDocument" :pdfViewer="pdfViewer"/>
  </div>
</template>

<script>
import sidebarMixin from "./sidebarMixin"
import Catalog from "./Catalog"
import SiderToggle from "./SidebarToggle"
export default {
  components:{Catalog, SiderToggle},
  mixins:[sidebarMixin],
  data(){
    return {
      outline:[],
      sidebarVisible:false
    }
  },
  created(){
  },
  watch:{
    pdfDocument(v){
      if(v){
        this.pdfDocument.getOutline().then(data => {
          this.outline = data;
          this.sidebarVisible = this.outline && this.outline.length > 0;
          this.pdfViewer.eventBus.dispatch('hasSidebar', this.outline && Array.isArray(this.outline) && this.outline.length)
        });
      }
    },
    pdfViewer(v){
      if(v){
        v.eventBus.on("sidebarVisible", (v) => {
          this.sidebarVisible = v
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.file-reader-pdf__sidebar {
  position: relative;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
}
</style>