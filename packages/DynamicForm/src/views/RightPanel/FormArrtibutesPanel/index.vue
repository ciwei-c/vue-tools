<template>
  <div class="dynamic-form__component-attributes-panel">
    <el-form v-if="formItemModels" size="mini">
      <el-form-item v-for="(prop, idx) in formItemProps" :key="idx" :label="prop.label" :prop="prop.name">
        <el-input v-model="formItemModels[getFormItemModelIndex(prop)].value"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import parentInstInjectMixin from "@dynamic-form/views/Common/parentInstInjectMixin"
export default {
  mixins:[parentInstInjectMixin],
  computed:{
    formItemModels(){
      return this.parentInst.selected.config ? this.parentInst.selected.config.formItemModels : null
    },
    formItemProps(){
      return this.parentInst.selected.config ? this.parentInst.selected.config.formItemJson.props.element : []
    }
  },
  mounted(){
    console.log(this.parentInst.selected)
  },
  methods:{
    getFormItemModelIndex(prop){
      return this.formItemModels.findIndex(v => v.name === prop)
    }
  }
}
</script>

<style lang="scss" scoped>
.dynamic-form__component-attributes-panel {
  padding: 20px;
}
</style>