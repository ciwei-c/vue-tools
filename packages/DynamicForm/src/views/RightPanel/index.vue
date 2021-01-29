<template>
  <div class="dynamic-form__right-panel">
    <el-tabs v-model="activeName" class="dynamic-form__right-panel-attribute-tabs">
      <el-tab-pane label="组件属性" name="componentAttributes">
        <component-arrtibutes-panel></component-arrtibutes-panel>
      </el-tab-pane>
      <el-tab-pane label="表单属性" name="formAttributes">表单属性</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import parentInstInjectMixin from "@dynamic-form/views/Common/parentInstInjectMixin"
import ComponentArrtibutesPanel from "./ComponentArrtibutesPanel"
export default {
  mixins:[parentInstInjectMixin],
  components:{ComponentArrtibutesPanel},
  computed:{
    selected(){
      return this.topParentInst.selected
    }
  },
  data(){
    return {
      activeName:"componentAttributes"
    }
  },
  watch:{
    selected(v){
      console.log(v)
    }
  }
}
</script>

<style lang="scss" scoped>
.dynamic-form__right-panel {
  box-shadow: 0px 0px 15px -10px;
  /deep/.dynamic-form__right-panel-attribute-tabs {
    height: 100%;
    > .el-tabs__header.is-top {
      margin: 0 !important;
      .el-tabs__nav.is-top {
        width: 100% !important;
      }
      .el-tabs__item.is-top {
        width: 50% !important;
        text-align: center;
        padding:0 !important;
      }
    }
    > .el-tabs__content {
      height: calc(100% - 40px);
      overflow: auto;
    }
  }
}
</style>