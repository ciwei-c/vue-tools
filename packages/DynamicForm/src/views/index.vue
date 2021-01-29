<template>
  <div class="cv-dynamic-form">
    <left-panel class="cv-dynamic-form__panel cv-dynamic-form__left-panel" ref="leftPanel" />
    <center-panel class="cv-dynamic-form__panel cv-dynamic-form__center-panel" ref="centerPanel" />
    <right-panel class="cv-dynamic-form__panel cv-dynamic-form__right-panel" ref="rightPanel" />
  </div>
</template>

<script>
import CenterPanel from "./CenterPanel";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
export default {
  components: { LeftPanel, CenterPanel, RightPanel },
  computed: {
    topParentInst() {
      return this;
    },
  },
  data(){
    return {
      formItems:[],
      selected:{
        config:null,
        el:null
      }
    }
  },
  provide(){
    return {
      topParentInst:this.topParentInst,
      parentInst:this
    }
  },
  methods:{
    onSelectFormItem(formItem){
      if(this.selected.config && this.selected.config.id === formItem.id) return
      this.selected = {
        config:formItem,
        el:document.getElementById(formItem.id)
      }
    },
    getUpdateData(data, childrenIndexs, level, updateDta){
      return data.map((v, idx)=>{
        if(idx === childrenIndexs[level]){
          if(level === childrenIndexs.length - 1){
            v.children = updateDta
          } else {
            v.children = this.getUpdateData(v.children, childrenIndexs, level + 1, updateDta)
          }
          return v
        } else {
          return v
        }
      })
    },
    pushSomeIndexMetaToFormItems(meta, index, parentPath){
      if(parentPath.length) {
        let childrenIndexs = []
        let current = this.formItems
        while(parentPath.length) {
          let idx = current.findIndex(v=>v.id === parentPath[0])
          childrenIndexs.push(idx)
          parentPath.splice(0,1)
          current = current[idx].children
        }
        current = this.pushSomeIndexMetaToList(current, meta, index)
        this.formItems = this.getUpdateData(this.formItems, childrenIndexs, 0, current)
      } else {
        this.formItems = this.pushSomeIndexMetaToList(this.formItems, meta, index)
      }
    },
    pushSomeIndexMetaToList(list, meta, index){
      if(index === 0){
        return [meta, ...list]
      } else {
        return [...list.slice(0, index), meta, ...list.slice(index, list.length)]
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.dynamic-form__sortable-ghost {
  position: relative;
  &::before {
    content: " ";
    position: absolute;
    box-sizing: border-box;
    background: #fff;
    height: 100%;
    width: 100%;
    border: 1px dashed #409eff;
    top: 0;
    left: 0;
    z-index: 1;
  }
}
/deep/.dynamic-form__enable-drag-item--active {
  position: relative;
  background: #deedfe;
}
.cv-dynamic-form {
  height: 100%;
  background: #fff;
  overflow: hidden;
  &__left-panel {
    width: 300px;
    float: left;
  }
  &__center-panel {
    width: calc(100% - 640px);
    overflow: auto;
    float: left;
  }
  &__right-panel {
    width: 300px;
    float: right;
  }
  &__panel {
    height: 100%;
  }
}
</style>