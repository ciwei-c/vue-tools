<template>
  <div class="file-reader-pdf__toolbar__jump">
    <div class="file-reader-pdf__toolbar__jump-next-prev">
      <el-button icon="el-icon-arrow-left" size="mini" @click="onPrev" :disabled="currentPage == 1"></el-button>
      <el-button icon="el-icon-arrow-right" size="mini" @click="onNext" :disabled="currentPage == totalPage"></el-button>
    </div>
    <div class="file-reader-pdf__toolbar__jump-count">
      <el-input-number size="mini" style="width:60px" :controls="false" v-model="currentPage" @change="onJump(currentPage)"></el-input-number>
      <div>/</div>
      <div v-if="totalPage">{{totalPage}}</div>
      <div v-else><i class="el-icon-loading"></i></div>
    </div>
  </div>
</template>

<script>
import toolbarMixin from "./toolbarMixin"
export default {
  mixins:[toolbarMixin],
  data(){
    return {
      currentPage: 1
    }
  },
  watch:{
    pdfViewer(v){
      if(v){
        v.eventBus.on("pagechanging", data => {
          if(this.currentPage !== data.pageNumber){
            this.currentPage = data.pageNumber;
          }
        });
      }
    }
  },
  methods:{
    onPrev(){
      this.onJump(--this.currentPage)
    },
    onNext(){
      this.onJump(++this.currentPage)
    },
    onJump(page){
      this.pdfViewer.currentPageNumber = page
    }
  },
  computed:{
    totalPage(){
      return (this.pdfViewer && this.pdfViewer.pagesCount) || 0
    }
  }
}
</script>

<style lang="scss" scoped>
.file-reader-pdf__toolbar__jump {
  display: flex;
  align-items: center;
  &-next-prev {
    margin-right:10px;
    display: flex;
    align-items: center;
    > button{
      text-align: center;
      color: #697890;
      font-size: 12px;
      height: 24px;
      background: transparent;
      width: 24px;
      padding: 0 !important;
      border:1px solid #697890;
      border-radius:4px;
      &:hover{
        background: transparent !important;
        border-color: #697890 !important;
        color: #697890 !important;
      }
    }
  }
  &-count {
    display: flex;
    color: #697890;
    align-items: center;
    margin-right: 20px;
    font-size: 12px;
    > div:not(:first-child):not(:last-child){
      margin: 0 5px;
    }
  }
}
</style>
<style lang="scss">
.file-reader-pdf__toolbar__jump {
  &-count {
    .el-input-number{
      .el-input__inner {
        padding: 0 4px !important;
        text-align: right !important;
      }
    }
  }
}
</style>