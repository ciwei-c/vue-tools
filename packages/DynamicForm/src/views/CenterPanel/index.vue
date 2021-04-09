<script>
import parentInstInjectMixin from "@dynamic-form/views/Common/parentInstInjectMixin";
import {
  setSortable,
  draggableClassName,
  draggableActiveClassName,
  getItemParentPath, 
  getItemIndex
} from "@dynamic-form/views/Common/Drag";
import DynamicComponent from "./DynamicComponent";
import DynamicContainer from "./DynamicContainer";
import DynamicFormItemComponent from "./DynamicFormItemComponent";
export default {
  components: { DynamicComponent, DynamicContainer, DynamicFormItemComponent },
  render() {
    return (
      <div class="dynamic-form__center-panel">
        <el-form
          ref="dragForm"
          model={this.model}
          class="dynamic-form__drag-wrap"
        >
          {this.topParentInst.formItems.map((formItem) => {
            return this.getFormItemJsx(formItem);
          })}
        </el-form>
      </div>
    );
  },
  data() {
    return {
      model: {},
    };
  },
  mixins: [parentInstInjectMixin],
  mounted() {
    setSortable(this.$refs.dragForm.$el, {
      group: {
        name: "components",
      },
      animation: 150,
      onStart: (evt) => {
        this.dragStartData = {
          parentPath:getItemParentPath(evt.item.parentNode),
          index:getItemIndex(evt.item)
        }
      },
      onEnd: (evt) => {
        this.onSortEnd(evt)
      },
    });
  },
  methods: {
    onSortEnd(evt, dragStartData){
      this.dragStartData = this.dragStartData || dragStartData
      let meta = this.topParentInst.getIndexMetaFromFormItems(this.dragStartData.index, this.dragStartData.parentPath)
      this.topParentInst.removeIndexMetaFromFormItems(this.dragStartData.index, this.dragStartData.parentPath)
      let parentPath = getItemParentPath(evt.item.parentNode)
      let index = getItemIndex(evt.item)
      this.topParentInst.pushSomeIndexMetaToFormItems(meta, index, parentPath)
      this.dragStartData = null
    },
    getFormItemJsx(formItem) {
      let jsx = null;
      let strategy = {
        表单控件: () => {
          return this.getWidgetJsx(formItem);
        },
        布局容器: () => {
          return this.getContainerJsx(formItem);
        },
        其他: () => {
          return this.getOtherJsx(formItem);
        },
      };
      jsx = strategy[formItem.componentJson.categories]();
      return jsx;
    },
    getWidgetJsx(formItem) {
      return (
        <dynamic-form-item-component
          key={formItem.id}
          style="padding:20px"
          id={formItem.id}
          class={[
            draggableClassName,
            this.isActive(formItem.id) ? draggableActiveClassName : "",
          ]}
          on-click={() => this.onSelectFormItem(formItem)}
          getProps={() => formItem.formItemModels}
        >
          <dynamic-component
            name={formItem.tag}
            getProps={() => formItem.componentModels}
          ></dynamic-component>
        </dynamic-form-item-component>
      );
    },
    getContainerJsx(formItem) {
      return (
        <dynamic-container
          key={formItem.id}
          formItem={formItem}
          isActive={(v) => this.isActive(v)}
          on-click={() => this.onSelectFormItem(formItem)}
          getFormItemJsx={(v) => this.getFormItemJsx(v)}
          sortEnd={(evt, dragStartData) => this.onSortEnd(evt, dragStartData)}
        ></dynamic-container>
      );
    },
    getOtherJsx(formItem) {
      return (
        <div
          style="padding:20px"
          key={formItem.id}
          on-click={(e) => {
            e.stopPropagation();
            this.onSelectFormItem(formItem);
          }}
          class={[
            draggableClassName,
            this.isActive(formItem.id) ? draggableActiveClassName : "",
          ]}
        >
          <dynamic-component
            name={formItem.tag}
            getProps={() => formItem.componentModels}
          ></dynamic-component>
        </div>
      );
    },
    isActive(id) {
      let is = false;
      try {
        is = id === this.topParentInst.selected.config.id;
      } catch (error) {
        is = false;
      }
      return is;
    },
    onSelectFormItem(formItem) {
      this.topParentInst.onSelectFormItem(formItem);
    },
  },
};
</script>

<style lang="scss" scoped>
.dynamic-form__center-panel {
  height: 100%;
  padding: 20px;
  .el-form {
    min-height: calc(100% - 20px);
    padding-bottom: 20px;
  }
}
</style>