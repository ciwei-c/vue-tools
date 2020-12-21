<template>
  <div class="ocr-select-editor__panel">
    <div style="height:100%">
      <div>已选区域</div>
      <fields :data="fields" :parent="parent"/>
    </div>
  </div>
</template>

<script>
import emitMixin from "../emitMixin";
import Fields from "./Fields"
export default {
  mixins: [emitMixin],
  components: {Fields},
  computed:{
    parent(){
      return this
    }
  },
  data() {
    return {
      activeName: "step1",
      fields:[]
    };
  },
  watch:{
    activeName:{
      immediate:true,
      handler(v){
        this.$emit('activeChange', v)
      }
    }
  },
  mounted(){
    this.eventOn('fieldSelect', v=>{
      this.fields[v.index] = Object.assign({}, v.data)
      this.fields = this.fields.map(v => v)
    })
  },
  beforeDestroy(){
    this.eventOff('fieldSelect')
  },
  methods:{
    onClickTips(){
      this.$refs.tips.show()
    }
  }
};
</script>

<style lang="scss">
.ocr-select-editor__panel {
  position: absolute;
  padding: 20px;
  right: 0;
  top: 0;
  height: 100%;
  box-sizing: border-box;
  width: 380px;
  background: #f5f5f5;
  .el-tabs__content {
    height: calc(100% - 60px);
  }
  .el-tab-pane {
    height: 100%;
  }
}
</style>