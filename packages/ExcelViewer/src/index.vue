<template>
  <div class="file-reader-excel">
    <toolbar class="file-reader__toolbar" :parent="parent" v-if="arrayBuffer"/>
    <file-content :parent="parent" ref="content" :url="url" :arrayBuffer="arrayBuffer" v-if="arrayBuffer"/>
  </div>
</template>
<script>
import Toolbar from "./Toolbar";
import FileContent from "./Content";
export default {
  components: { Toolbar, FileContent },
  props: {
    url: String
  },
  data() {
    return {
      arrayBuffer: null
    };
  },
  watch: {
    url: {
      handler(v) {
        if (v) {
          fetch(v, {
            method: "get"
          })
            .then(res => {
              return res.arrayBuffer();
            })
            .then(data => {
              this.arrayBuffer = data;
            });
        }
      },
      immediate: true
    }
  },
  computed: {
    parent() {
      return this;
    }
  }
};
</script>
<style lang="scss">
.file-reader-excel {
  height: 100%;
  width: 100%;
  font-size: 14px;
  background: #3c3f42;
  color: #fff;
}
</style>