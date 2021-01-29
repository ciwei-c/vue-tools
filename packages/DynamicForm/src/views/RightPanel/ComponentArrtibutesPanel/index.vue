<template>
  <div class="dynamic-form__component-attributes-panel">
    <el-form v-if="formItemModels" size="mini" label-position="top">
      <el-form-item v-for="(prop, idx) in formItemProps" :key="idx" :label="prop.label" :prop="prop.name">
        <props-widget :getVModel="()=>formItemModels[getFormItemModelIndex(prop.name)]" :prop="prop"/>
      </el-form-item>
    </el-form>
    <el-form v-if="componentModels" size="mini" label-position="top">
      <el-form-item v-for="(prop, idx) in componentProps" :key="idx" :label="prop.label" :prop="prop.name">
        <props-widget :getVModel="()=>componentModels[getComponentModelIndex(prop.name)]" :prop="prop"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import parentInstInjectMixin from "@dynamic-form/views/Common/parentInstInjectMixin"
import PropsWidget from "../PropsWidget"
export default {
  components:{PropsWidget},
  mixins:[parentInstInjectMixin],
  computed:{
    hasConfig(){
      return !!this.parentInst.selected.config
    },
    formItemModels(){
      return this.hasConfig ? this.parentInst.selected.config.formItemModels : null
    },
    componentModels(){
      return this.hasConfig ? this.parentInst.selected.config.componentModels : null
    },
    formItemProps(){
      return this.hasConfig ? this.parentInst.selected.config.formItemJson.props.element : []
    },
    componentProps(){
      return this.hasConfig ? this.parentInst.selected.config.componentJson.props.element : []
    }
  },
  mounted(){
    console.log(this.parentInst.selected)
  },
  methods:{
    getFormItemModelIndex(prop){
      return this.formItemModels.findIndex(v => v.name === prop)
    },
    getComponentModelIndex(prop){
      return this.componentModels.findIndex(v => v.name === prop)
    }
  }
}
</script>

<style lang="scss" scoped>
.dynamic-form__component-attributes-panel {
  padding: 20px;
}
</style>