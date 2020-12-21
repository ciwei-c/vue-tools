<template>
  <div
    v-if="hasSidebar"
    style="position:fixed;z-index:9;top:50%;transform:translateY(-50%)"
    :style="{left:sidebarVisible ? '250px' : '0px'}"
  >
    <div
      @click="onToggleSidebar"
      style="display:flex;flex-direction:column;cursor:pointer;background:#91b1db;padding:10px 8px;border-radius: 0px 6px 6px 0px;font-size: 14px;color:#fff"
    >
      <span>{{sidebarVisible ? '隐' :'显'}}</span>
      <span>{{sidebarVisible ? '藏' :'示'}}</span>
      <span>目</span>
      <span>录</span>
    </div>
  </div>
</template>

<script>
import sidebarMixin from "./sidebarMixin";
export default {
  props: {
    outline: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mixins: [sidebarMixin],
  data() {
    return {
      sidebarVisible: true
    };
  },
  computed: {
    hasSidebar() {
      return this.outline && this.outline.length;
    }
  },
  watch: {
    pdfViewer(v) {
      if (v) {
      }
    }
  },
  methods: {
    onToggleSidebar(v) {
      this.sidebarVisible = !this.sidebarVisible;
      this.pdfViewer.eventBus.dispatch("sidebarVisible", this.sidebarVisible);
    }
  }
};
</script>

<style>
</style>