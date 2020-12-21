<template>
  <div class="file-reader-pdf__toolbar__search">
    <el-input
      size="mini"
      placeholder="搜索关键字"
      v-model="search"
      style="width:100px"
      @keydown.native.enter="onSearch('find')"
    ></el-input>
    <el-button
      size="mini"
      type="primary"
      @click="onSearch('find')"
      class="file-reader-pdf__toolbar__search-btn"
    >搜索</el-button>
    <div class="file-reader-pdf__toolbar__search-next-prev">
      <el-button size="mini" @click="onPrev">上一个</el-button>
      <el-button size="mini" @click="onNext">下一个</el-button>
    </div>
    <div style="color:#697890;font-size:14px;margin-left:10px">共有 {{matches.total}} 项匹配</div>
  </div>
</template>

<script>
import toolbarMixin from "./toolbarMixin";
import defauleConfigMixin from "../defauleConfigMixin";
export default {
  mixins: [toolbarMixin, defauleConfigMixin],
  data() {
    return {
      search: "",
      matches: {
        total:0,
        current:0
      }
    };
  },
  created() {},
  watch: {
    pdfViewer(v) {
      if (v) {}
    },
    'pdfViewer.findController._matchesCountTotal':{
      handler(v){
        this.matches.total = v;
      },
      deep:false
    },
    search(v) {
    }
  },
  methods: {
    onSearch(cmd, option) {
      this.pdfViewer.findController.executeCommand(cmd,Object.assign({ query: this.search, highlightAll: true }, option));
    },
    onPrev() {
      this.onSearch('findagain',{ findPrevious: true });
    },
    onNext() {
      this.onSearch('findagain',{ findPrevious: false });
    }
  }
};
</script>

<style lang="scss" >
.file-reader-pdf__toolbar__search {
  margin-right: 5px;
  display: flex;
  align-items: center;
  &-next-prev {
    margin-right: 10px;
    display: flex;
    align-items: center;
    margin-left: 10px;
    > button {
      text-align: center;
      color: #697890;
      font-size: 12px;
      height: 24px;
      background: transparent;
      width: 48px;
      padding: 0 !important;
      border: 1px solid #697890;
      border-radius: 4px;
      &:hover, &:focus, &:active {
        background: transparent !important;
        border-color: #697890 !important;
        color: #697890 !important;
      }
    }
  }
  &-btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: -5px;
    position: relative;
    z-index: 1;
  }
}
</style>