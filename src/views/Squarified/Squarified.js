class Squarified {
  constructor(data, options){
    this.sourceData = data.map(v=>Object.assign({}, v))
    this.sourceData.sort((a,b)=>b.value - a.value)
    this.options = Object.assign({}, options)
    this.initRectInfo()
    this.squarified(this.sourceData, [], this.getMinSide())
  }
  getSum(data){
    if(data.length === 1) return data[0].value;
    return data.reduce((a, b)=>{
      a = typeof a === 'object' ? a.value : a
      b = typeof b === 'object' ? b.value : b
      return (a || 0) + (b || 0)
    })
  }
  get heightWidthRatio(){
    return this.options.height / this.options.width
  }
  get widthScale(){
    return this.options.width / this.rectInfo.width
  }
  get heightScale(){
    return this.options.height / this.rectInfo.height
  }
  initRectInfo(){
    this.rectInfo = {
      sx:0,
      sy:0,
      rows:[],
      total:this.getSum(this.sourceData)
    }
    /**
     * 根据容器边长，换算矩形绘图区域的边长，将权重值作为面积值计算，方便操作
     */
    this.rectInfo.width = Math.sqrt(this.rectInfo.total / this.heightWidthRatio)
    this.rectInfo.height = this.rectInfo.width * this.heightWidthRatio
  }
  /**
   * 
   * @param {Array} children 剩余矩形集合
   * @param {Array} row      当前小矩形集合
   * @param {Object} minSide 短边信息，{vertical, value} 短边是否是垂直边，短边值 
   * @returns 
   */
  squarified(children, row, minSide){
    if(!children.length) return this.newLayoutRow(row, minSide)
    let rowWithChild = [...row, children[0]]
    /**
     * 判断同行/同列情况下新增矩形和新行新列情况下的新增矩形长宽比
     */
    if(!row.length || (row.length &&  this.worstNewRadio(row, children[0], minSide) > this.worstOldRadio(rowWithChild, minSide))) {
      children.splice(0, 1)
      this.squarified(children, rowWithChild, minSide)
    } else {
      this.newLayoutRow(row, minSide)
      this.squarified(children, [], this.getMinSide())
    }
  }
  /**
   * 
   * @param {Array} row
   * @param {Object} minSide 
   * @returns 同行/列矩形最差长宽比
   */
  worstOldRadio(row, minSide){
    let otherSide = this.getSum(row) / minSide.value
    return this.getMaxRatio(otherSide, row[row.length - 1].value / otherSide)
  }
  /**
   * 
   * @param {Array} row
   * @param {Object} node 
   * @param {Object} minSide 
   * @returns 新行/列矩形最差长宽比
   */
  worstNewRadio(row, node, minSide){
    let otherSide = this.getSum(row) / minSide.value
    let min = Math.min(
      (this.rectInfo.width - this.rectInfo.sx) - (minSide.vertical ? otherSide : 0), 
      (this.rectInfo.height - this.rectInfo.sy) - (!minSide.vertical ? otherSide : 0)
    )
    return this.getMaxRatio(min, node.value / min)
  }
  /**
   * @returns 最短边
   */
  getMinSide() {
    let height = this.rectInfo.height - this.rectInfo.sy
    let width = this.rectInfo.width - this.rectInfo.sx
    if(height > width) {
      return {
        vertical:false,
        value:width
      }
    } else {
      return {
        vertical:true,
        value:height
      }
    }
  }
  newLayoutRow(row, minSide){
    let otherSide = this.getSum(row) / minSide.value
    row.forEach(node=>{
      let _height = minSide.vertical ? (node.value / otherSide) : otherSide;
      let _width = minSide.vertical ? otherSide : (node.value / otherSide);
      let data = {
        value:node.value,
        data:node,
        x:this.widthScale * this.rectInfo.sx,
        y:this.heightScale * this.rectInfo.sy,
        width:this.widthScale * _width,
        height:this.heightScale * _height
      };
      this.rectInfo.sy += minSide.vertical ? _height : 0
      this.rectInfo.sx += minSide.vertical ? 0 : _width
      this.rectInfo.rows.push(data)
    })
    if(minSide.vertical) {
      this.rectInfo.sy -= minSide.value
      this.rectInfo.sx += otherSide
    } else {
      this.rectInfo.sx -= minSide.value
      this.rectInfo.sy += otherSide
    }
  }
  /**
   * 
   * @param {Number} sideA
   * @param {Number} sideB
   * @returns 
   */
  getMaxRatio(sideA, sideB){
    return Math.max(sideA / sideB, sideB / sideA)
  }
}

export default Squarified