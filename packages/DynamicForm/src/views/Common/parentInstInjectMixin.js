export default {
  inject:['topParentInst', 'parentInst'],
  provide(){
    return {
      topParentInst:this.topParentInst,
      parentInst:this
    }
  }
}