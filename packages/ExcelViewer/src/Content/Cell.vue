<template>
  <td
    :colspan="cellData.colspan"
    v-if="!cellData.spaned"
    :class="`file-reader-excel__cell-${row}-${col}`"
    :rowspan="cellData.rowspan"
    :style="getCellStyles()"
    v-html="getCellDataValue()"
  ></td>
</template>

<script>
export default {
  props: {
    sheet: Object,
    row: Number,
    col: Number,
    xlsx: Object
  },
  data() {
    return {
      cellData: {}
    };
  },
  mounted() {
    this.cellData = this.getCellData();
  },
  methods: {
    getCellStyles() {
      let style = {};
      if (this.cellData.s) {
        let cellStyle = this.cellData.s;
        if (cellStyle.fgColor && cellStyle.fgColor.rgb) {
          style.background = "#" + cellStyle.fgColor.rgb;
        }
        return style;
      } else {
        return style;
      }
    },
    getCellData() {
      let cellData = this.sheet.data[
        `${this.sheet.colToLetter[this.col]}${this.row}`
      ];
      return cellData || {};
    },
    getCellDataValue() {
      let { v, h } = this.cellData;
      if (v && typeof v === "string") {
        return v
          .split("\n")
          .map(v => {
            return "<div>" + v + "</div>";
          })
          .join("");
      } else {
        return `<div>${v || ""}</div>`;
      }
    }
  }
};
</script>

<style lang="scss">
.file-reader-excel__cell--highlight {
  position: relative;
  div {
    position: relative;
    z-index: 1;
  }
  &::after {
    position: absolute;
    content: " ";
    height: calc(100% + 0px);
    width: calc(100% + 0px);
    left: -2px;
    top: -2px;
    border: 2px solid #217346;
  }
}
</style>