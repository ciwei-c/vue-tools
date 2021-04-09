<template>
  <div class="dynamic-form__left-panel">
    <div class="dynamic-form__component" ref="component">
      <div v-for="(v, k) in components" :key="k" class="dynamic-form__component-catalog">
        <div class="dynamic-form__component-catalog-title">{{k}}</div>
        <div ref="dragWrap">
          <div
            :class="`dynamic-form__component-item ${draggableClassName}`"
            v-for="component in v"
            :data-component-name="component.name"
            :key="component.id"
          >
            <i :class="component.icon"></i>
            <span>{{ component.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import parentInstInjectMixin from "@dynamic-form/views/Common/parentInstInjectMixin";
import Components from "@dynamic-form/views/Common/ComponentsJson";
import config from "@dynamic-form/views/Common/config";
import { setSortable, draggableClassName, getItemParentPath, getItemIndex } from "@dynamic-form/views/Common/Drag";
import { FormJsonFactory } from "@dynamic-form/views/Common/parse"
export default {
  mixins: [parentInstInjectMixin],
  data() {
    return {
      draggableClassName,
      components:{},
    };
  },
  mounted() {
    this.handleComponents()
    this.$nextTick(()=>{
      this.$refs.dragWrap.forEach((ref)=>{
        setSortable(ref, {
          ghostClass:"",
          group: {
            name: "components",
            pull: "clone",
            put: false,
          },
          animation: 150,
          sort: false,
          onEnd: (evt) => {
            if(evt.to === ref) return
            let parentPath = getItemParentPath(evt.item.parentNode)
            let index = getItemIndex(evt.item)
            let formJsonFactory = new FormJsonFactory()
            this.topParentInst.pushSomeIndexMetaToFormItems(formJsonFactory.getFormItemJson(evt.item.dataset.componentName), index, parentPath)
            evt.item.remove()
          }
        });
      })
    })
  },
  methods:{
    handleComponents(){
      let components = {}
      Components.forEach(v=>{
        if(!components[v.categories]) {
          components[v.categories] = []
        }
        components[v.categories].push(v)
      })
      this.components = components
    }
  }
};
</script>

<style lang="scss" scoped>
.dynamic-form__left-panel {
  box-shadow: 0px 0px 15px -10px;
}
.dynamic-form__left-panel {
  .dynamic-form__component {
    &-catalog {
      overflow: hidden;
      margin-bottom: 10px;
      &-title {
        font-size: 14px;
        margin-bottom: 10px;
        user-select: none;
      }
    }
    padding: 20px;
    overflow: hidden;
    &-item {
      width: calc(50% - 28px);
      float: left;
      display: flex;
      align-items: center;
      font-size: 14px;
      background: #000;
      padding: 3px 10px;
      color: #fff;
      cursor: move;
      border: 1px dashed transparent;
      border-radius: 2px;
      user-select: none;
      &::after {
        display: none !important;
        content: "" !important;
      }
      i {
        color: #fff;
        margin-right: 10px;
      }
      &:nth-child(2n) {
        margin-left: 10px;
      }
    }
  }
}
</style>