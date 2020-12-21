<template>
  <div class="file-reader-excel__toolbar__search" v-show="!imgVisible">
    <el-input
      size="mini"
      v-model="search"
      style="width:120px"
      @keydown.native.enter="onSearch"
    ></el-input>
    <el-button
      size="mini"
      type="primary"
      @click="onSearch"
      class="file-reader-excel__toolbar__search-btn"
    >搜索</el-button>
    <div class="file-reader-excel__toolbar__search-next-prev">
      <el-button size="mini" @click="onPrev">上一个</el-button>
      <el-button size="mini" @click="onNext">下一个</el-button>
    </div>
    <div style="color:#697890;font-size:14px;margin-left:10px">共有 {{matches.length}} 项匹配</div>
  </div>
</template>

<script>
export default {
  props:{
    parent:Object,
    imgVisible:Boolean
  },
  data() {
    return {
      search: "",
      matches: []
    };
  },
  created() {},
  watch: {
    search(v) {}
  },
  methods: {
    onSearch() {
      this.matches = this.parent.$refs.content.onSearch(this.search)
    },
    onPrev() {
      this.parent.$refs.content.onPrevOrNext(true)
    },
    onNext() {
      this.parent.$refs.content.onPrevOrNext(false)
    }
  }
};
</script>

<style lang="scss" >
.file-reader-excel__toolbar__search {
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
    position: relative;
    z-index: 1;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: -5px;
  }
}
</style>