<template>
  <div>
    <div v-for="(item, idx) in items" :key="idx" :style="{paddingLeft:`${pathDeep * 10}px`}">
      <template v-if="!item.items.length">
        <el-menu-item
          v-if="!item.items.length"
          :index="getIndex(idx+1)"
          @click="onClickMenu(item.dest[0], item)"
        >
          <span slot="title" class="file-reader-pdf__menu-title">{{item.title}}</span>
        </el-menu-item>
      </template>
      <template v-else>
        <el-submenu :index="getIndex(idx+1)">
          <span slot="title" class="file-reader-pdf__submenu-title">{{item.title}}</span>
          <catalog-menu
            :parentMenu="parentMenu"
            :items="item.items"
            :pathDeep="pathDeep + 1"
            :parentPath="getIndex(idx+1)"
            :pdfDocument="pdfDocument"
            :pdfViewer="pdfViewer"
          ></catalog-menu>
        </el-submenu>
      </template>
    </div>
  </div>
</template>

<script>
import sidebarMixin from "./sidebarMixin";
export default {
  mixins: [sidebarMixin],
  props: {
    items: Array,
    pathDeep: {
      type: Number,
      default: 0
    },
    parentMenu:{
      type:Object
    },
    parentPath: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      defaultActive: "1"
    };
  },
  created() {
    this.parentMenu.$emit("index", this.parentPath)
  },
  methods: {
    getIndex(idx) {
      let _idx = this.parentPath ? `${this.parentPath}-${idx}` : `${idx}`;
      return _idx
    },
    onClickMenu(dest) {
      this.jumpTo(dest);
    },
    jumpTo(dest) {
      this.pdfDocument.getPageIndex(dest).then(page => {
        this.pdfViewer.currentPageNumber = Number(page + 1);
      });
    }
  },
  name: "CatalogMenu"
};
</script>


<style lang="scss">
.file-reader-pdf__catalog {
  .el-menu-item, .el-submenu__title {
    white-space: normal;
    &::after {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: transparent;
      z-index: 1;
      cursor: pointer;
    }
  }
  .el-menu-item, .el-submenu__title {
    height: auto;
    padding-left: 10px !important;
    line-height: 1.1;
    padding: 5px 0;
  }
  .file-reader-pdf__submenu-title,
  .el-submenu .file-reader-pdf__menu-title{
    display: inline-block;
    width: calc(100% - 30px);
    word-break: break-all;
    white-space: normal;
  }
  .el-submenu__icon-arrow {
    top: 14px !important;
    right:10px !important;
  }
  .el-menu-item.is-active {
    color: inherit !important;
  }
}
</style>