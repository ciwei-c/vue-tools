<script>
import IconSelect from "./IconSelect"
export default {
  components:{IconSelect},
  props:{
    prop:Object,
    getVModel:Function
  },
  render(){
    return <div>{this.getWidget()}</div>
  },
  methods:{
    getWidget(){
      let tagsMap = {
        'icon':()=>{
          return <icon-select></icon-select>
        },
        'string':()=>{
          if(Array.isArray(this.prop.optionalValue) && this.prop.optionalValue.length) {
            if(this.prop.optionalValue.length <= 3){
              return (<el-radio-group on-input={()=>{}}>
                {this.prop.optionalValue.map(v=>{
                  return <el-radio label={v.value}>{v.label}</el-radio>
                })}
              </el-radio-group>)
            } else {
              return (<el-select>
                {this.prop.optionalValue.map(v=>{
                  return <el-option value={v.value} label={v.label}></el-option>
                })}
              </el-select>)
            }
          } else {
            return <el-input></el-input>
          }
        },
        'number':()=>{
          return <el-input-number></el-input-number>
        },
        'boolean':()=>{
          return <el-switch></el-switch>
        },
      }
      let widget = tagsMap[this.prop.componentType || this.prop.type]()
      Object.assign(widget.componentOptions.propsData, {
        value:this.getVModel().value
      })
      widget.componentOptions.listeners = {
        input:(v)=>{
          this.getVModel().value = v
        }
      }
      return widget
    }
  }
}
</script>

<style>

</style>