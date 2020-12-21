<template>
  <div class="file-reader-pdf__toolbar">
    <div class="file-reader-pdf__toolbar-left">
      <search :pdfViewer="pdfViewer" :parent="parent"/>
    </div>
    <div class="file-reader-pdf__toolbar-middle">
      <scale :parent="parent" :pdfViewer="pdfViewer" />
    </div>
    <div class="file-reader-pdf__toolbar-right">
      <jump-to :pdfViewer="pdfViewer" :parent="parent" />
      <spread-mode :parent="parent" :pdfViewer="pdfViewer" />
    </div>
  </div>
</template>

<script>
import toolbarMixin from "./toolbarMixin";
import Scale from "./Scale";
import Search from "./Search";
import JumpTo from "./JumpTo";
import SpreadMode from "./SpreadMode";
export default {
  components: { Scale, JumpTo, SpreadMode, Search},
  mixins: [toolbarMixin]
};
</script>

<style lang="scss" scoped>
.file-reader-pdf__toolbar {
  display: flex;
  align-items: center;
  padding: 10px;
  > div {
    flex: 1;
    width: 0;
  }
  &-left{
    display: flex;
    align-items: center;
  }
  &-right{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>