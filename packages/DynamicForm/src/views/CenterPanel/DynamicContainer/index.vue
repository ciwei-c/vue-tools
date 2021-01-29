<script>
import {
  setSortable,
  draggableClassName,
  draggableActiveClassName
} from "@dynamic-form/views/Common/Drag";
export default {
  render() {
    return this.formItem.name == "Row" ? (
      <el-row
        id={this.formItem.id}
        class={["dynamic-form__center-panel-row-container", draggableClassName, this.isActive(this.formItem.id) ? draggableActiveClassName : ""]}
        nativeOnClick={(e) => {
          e.stopPropagation();
          this.$emit("click");
        }}
      >
        {this.formItem.children.map((col) => {
          return (
            <el-col key={col.id} id={col.id} ref={`col-${col.id}`} span={col.span}>
              {col.children.map((child) => {
                return this.getFormItemJsx(child);
              })}
            </el-col>
          );
        })}
      </el-row>
    ) : null;
  },
  props: {
    name: String,
    formItem: Object,
    isActive: Function,
    getFormItemJsx: Function,
  },
  data() {
    return {
      draggableClassName,
    };
  },
  watch: {
    "formItem.children": {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.initDrag();
        });
      },
    },
  },
  methods: {
    initDrag() {
      if (this.$refs) {
        Object.keys(this.$refs).forEach((ref) => {
          if (ref.startsWith("col")) {
            setSortable(this.$refs[ref].$el, {
              group: {
                name: "components",
              },
              animation: 150,
              onEnd: function (evt) {
                console.log(evt);
              },
            });
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dynamic-form__center-panel-row-container {
  padding: 10px;
  .el-col {
    padding: 10px;
    border: 1px dashed #ccc;
  }
}
</style>