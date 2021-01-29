<script>
export default {
  props:{
    getProps: Function
  },
  render: function (createElement) {
    let props = {}
    this.props = this.getProps()
    try {
      this.props.forEach(v=>{
        props[v.name] = v.value
      })
    } catch (error) {}
    
    return createElement(
      'el-form-item',
      {
        props,
        nativeOn:{
          click:(e)=>{
            e.stopPropagation()
            this.$emit("click")
          }
        }
      }, this.$slots.default
    )
  }
}
</script>