<script>
export default {
  props:{
    name: String,
    getProps: Function,
    value: String
  },
  render: function (createElement) {
    let props = {}
    this.props = this.getProps()
    try {
      this.props.forEach(v=>{
        props[v.name] = v.value
      })
    } catch (error) {}
    let node = createElement(
      this.name,
      {
        attrs:Object.assign(props, {
          value:this.value
        }),
        on:{
          input:(v)=>{
          }
        }
      }
    )
    return node
  }
}
</script>