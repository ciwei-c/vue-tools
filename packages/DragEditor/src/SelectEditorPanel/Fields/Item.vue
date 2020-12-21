<template>
  <div
    class="ocr-select-editor__panel-field"
    @mouseenter="$emit('mouseenter', index)"
    @mouseleave="$emit('mouseleave', index)"
  >
    <div class="ocr-select-editor__panel-field-title">
      <pre
        >{{ JSON.stringify(getItem(item), null, 4) }}
      </pre>
      <i class="el-icon-close" @click="() => $emit('close', index)"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    index: Number,
  },
  methods: {
    getItem() {
      let { startClientX, startClientY, endClientX, endClientY } = this.item;
      return {
        startX: startClientX,
        startY: startClientY,
        endX: endClientX,
        endY: endClientY,
      };
    },
  },
};
</script>

<style>
</style>