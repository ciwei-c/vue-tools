<template>
  <div class="file-reader-excel__content">
    <div class="file-reader-excel__content-table" v-if="sheetsReader">
      <div
        v-for="(sheet, sheetName) in sheetsReader.sheets"
        :ref="`table-${sheetName}`"
        :key="sheetName"
        v-show="aciveSheetName === sheetName"
      >
        <table
          border="0"
          cellspacing="0"
          cellpadding="0"
          :style="getTableWidth(sheet)"
        >
          <colgroup>
            <col width="24" />
            <col
              :width="getColWidth(sheet, col)"
              v-for="col in sheet.maxCol"
              :key="col"
            />
          </colgroup>
          <tr>
            <td
              style="background: #000; border-bottom: 0; border-right: 0"
              :style="{
                transform: `translate(${sheet.sideLeft}px, ${sheet.headerTop}px)`,
              }"
            ></td>
            <td
              :style="{ transform: `translateY(${sheet.headerTop}px)` }"
              class="file-reader-excel__content-table--header"
              v-for="col in sheet.maxCol"
              :key="col"
            >
              {{ sheet.colToLetter[col] }}
            </td>
          </tr>
          <tr v-for="row in sheet.maxRow" :key="row">
            <td
              class="file-reader-excel__content-table--sidebar"
              :style="{
                transform: `translateX(${sheet.sideLeft}px)`,
                height: getRowHeight(sheet, row),
              }"
            >
              <span>{{ row }}</span>
            </td>
            <cell
              v-for="col in sheet.maxCol"
              :key="col"
              :sheet="sheet"
              :row="row"
              :col="col"
              :xlsx="xlsx"
            />
          </tr>
        </table>
      </div>
    </div>
    <div class="file-reader-excel__content-bottombar" v-if="sheetsReader">
      <div
        :class="{
          'file-reader-excel__content-bottombar--active':
            aciveSheetName === sheetName,
        }"
        @click="onSwitchSheet(sheetName)"
        v-for="sheetName in sheetsReader.sheetNames"
        :key="sheetName"
      >
        {{ sheetName }}
      </div>
    </div>
  </div>
</template>

<script>
import xlsx from "xlsx";
import Cell from "./Cell";
import SheetsReader from "../utils/SheetsReader";
import SheetReader from "../utils/SheetsReader";
export default {
  components: { Cell },
  props: {
    url: String,
    arrayBuffer: Array | Object | null,
  },
  data() {
    return {
      data: [],
      currentMatch: null,
      search: "",
      aciveSheetName: "",
      xlsx,
      sheetsReader: null,
    };
  },
  watch: {
    arrayBuffer: {
      handler(v) {
        if (v) {
          let wb = xlsx.read(v, {
            type: "array",
            cellStyles: true,
            _numberType: 1,
          });
          this.sheetsReader = new SheetsReader(wb, xlsx);
          this.aciveSheetName = this.sheetsReader.sheetNames[0];
        }
      },
      immediate: true,
    },
    aciveSheetName: {
      handler(v) {
        this.$nextTick(() => {
          try {
            Object.keys(this.$refs).forEach((k) => {
              this.$refs[k][0].removeEventListener("scroll", this.onScroll);
            });
            this.current$Table = this.$refs[`table-${v}`][0];
            this.current$Table.addEventListener("scroll", this.onScroll);
          } catch (error) {}
        });
      },
      immediate: true,
    },
  },
  methods: {
    getTableWidth(sheet) {
      if (sheet.tableWidth) {
        return {
          tableLayout: "fixed",
          width: `${sheet.tableWidth}px`,
        };
      } else {
        return {};
      }
    },
    getRowHeight(sheet, row) {
      let h = 15;
      if (sheet.rows && sheet.rows[row - 1]) {
        h = sheet.rows[row - 1].hpx;
      }
      return `${h}px`;
    },
    getColWidth(sheet, col) {
      let w = 36;
      if (sheet.cols && sheet.cols[col - 1]) {
        w = sheet.cols[col - 1].wpx;
        w = w * 1.625;
      }
      return w;
    },
    onScroll(e) {
      this.sheetsReader.sheets[
        this.aciveSheetName
      ].headerTop = this.current$Table.scrollTop;
      this.sheetsReader.sheets[
        this.aciveSheetName
      ].sideLeft = this.current$Table.scrollLeft;
    },
    onSwitchSheet(sheetName) {
      this.aciveSheetName !== sheetName && (this.aciveSheetName = sheetName);
    },
    onPrevOrNext(isPrev) {
      let sheet = this.sheetsReader.sheets[this.aciveSheetName];
      if (!isPrev) {
        sheet.currentMatch++;
        if (sheet.currentMatch > sheet.matchs.length - 1)
          sheet.currentMatch = 0;
      } else {
        sheet.currentMatch--;
        if (sheet.currentMatch == -1)
          sheet.currentMatch = sheet.matchs.length - 1;
      }
      this._search(sheet);
    },
    _search(sheet) {
      let highlightClass = "file-reader-excel__cell--highlight";
      let currentHighlightCell = this.current$Table.querySelector(
        `.${highlightClass}`
      );
      if (currentHighlightCell) {
        currentHighlightCell.classList.remove(highlightClass);
      }
      if (sheet.matchs.length) {
        let cell = this.current$Table.querySelector(
          `.file-reader-excel__cell-${sheet.matchs[sheet.currentMatch]}`
        );
        cell.classList.add(highlightClass);
        let left = cell.offsetLeft + cell.offsetWidth;
        let top = cell.offsetTop + cell.offsetHeight;
        let scrollLeft = this.current$Table.scrollLeft;
        let scrollTop = this.current$Table.scrollTop;
        let tableHeight = this.current$Table.offsetHeight;
        let tableWidth = this.current$Table.offsetWidth;

        if (cell.offsetLeft < scrollLeft) {
          this.current$Table.scrollLeft = Math.min(cell.offsetLeft - 100, 0);
        }
        if (cell.offsetTop < scrollTop) {
          this.current$Table.scrollTop = Math.min(cell.offsetTop - 100, 0);
        }
        if (cell.offsetLeft > scrollLeft + tableWidth) {
          this.current$Table.scrollLeft = cell.offsetLeft;
        }
        if (cell.offsetTop > scrollTop + tableHeight) {
          this.current$Table.scrollTop = cell.offsetTop;
        }
      }
    },
    onSearch(search) {
      let sheet = this.sheetsReader.sheets[this.aciveSheetName];
      sheet.matchs = [];
      Object.keys(sheet.text).forEach((k) => {
        if (sheet.text[k].indexOf(search) > -1 && search) {
          sheet.matchs.push(k);
        }
      });
      sheet.currentMatch = 0;
      this._search(sheet);
      return sheet.matchs;
    },
    render(file) {
      let reader = new FileReader();
      var that = this;
      reader.readAsBinaryString(file);
      reader.onerror = function () {};
      reader.onload = function () {
        let wb = xlsx.read(reader.result, {
          type: "binary",
          cellStyles: true,
          _numberType: 1,
          raw: true,
          codepage: true,
          cellFormula: true,
          cellNF: true,
          cellText: true,
          cellDates: true,
          dateNF: true,
          sheetStubs: true,
          sheetRows: true,
          bookDeps: true,
          bookFiles: true,
          bookProps: true,
          bookSheets: true,
          bookVBA: true,
          password: true,
          WTF: true,
          sheets: true,
          PRN: true,
          xlfn: true
        });
        that.sheetsReader = new SheetsReader(wb, xlsx);
        that.aciveSheetName = that.sheetsReader.sheetNames[0];
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.file-reader-excel__content {
  width: 100%;
  height: calc(100% - 42px);
  &-table {
    position: relative;
    height: calc(100% - 28px);
    > div {
      height: 100%;
      overflow: auto;
      td {
        background: #fff;
        transition: transform 0s;
        color: #000;
        border-right: 1px solid #dcdfe6;
        padding: 8px;
        font-size: 13px;
        border-bottom: 1px solid #dcdfe6;
        /deep/ div {
          color: inherit;
        }
      }
      td.file-reader-excel__content-table--header,
      td.file-reader-excel__content-table--sidebar {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
        user-select: none;
        text-align: center;
        background: #000;
      }
      td.file-reader-excel__content-table--header {
        padding: 2px 0;
        border-right: 1px solid #4f4f4f;
        border-top: 0;
        border-bottom: 0;
      }
      td.file-reader-excel__content-table--sidebar {
        text-align: center;
        border-bottom: 1px solid #4f4f4f;
        border-right: 0;
        border-top: 0;
        padding: 0;
        > span {
          display: flex;
          height: 100%;
          align-items: flex-end;
          justify-content: center;
        }
      }
    }
  }
  &-bottombar {
    height: 28px;
    background: #292929;
    padding: 0 12px;
    > div {
      line-height: 28px;
      text-align: center;
      padding: 0 20px;
      display: inline-block;
      font-size: 12px;
      cursor: pointer;
      user-select: none;
      &.file-reader-excel__content-bottombar--active,
      &:hover {
        background: #fff;
        color: #409eff;
        border-bottom: 2px solid #409eff;
      }
    }
  }
}
</style>