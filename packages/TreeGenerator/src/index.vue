<template>
  <div class="tree-generator">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.container = this.$el;
      this.initCanvas();
    });
  },
  methods: {
    /**
     * @description 坐标原点设置成左下角
     */
    resetOrigin() {
      this.ctx.translate(0, this.canvas.height);
      this.ctx.rotate(Math.PI);
      this.ctx.scale(-1, 1);
    },
    initCanvas() {
      this.treeDatas = [];
      this.canvas = this.$refs.canvas;
      this.canvas.width = this.container.offsetWidth;
      this.canvas.height = this.container.offsetHeight;
      this.ctx = this.canvas.getContext("2d");
      this.resetOrigin();
      this.generateTreeRoot();
    },
    generateBranch(treeNode) {
      if (treeNode.lineWidth <= 1 && treeNode.isLeaf) return;
      treeNode.children = [];
      let branchCounts = this.getRangeNumber(3,3);
      for (let i = 0; i < branchCounts; i++) {
        let angle = this.getRangeNumber(30, 45);
        let node = {
          color: treeNode.lineWidth <= 1 ? '#b7b7b7' : '#000',
          isLeaf: treeNode.lineWidth <= 1,
          root: false,
          level: treeNode.level + 1,
          from: i === 2 ? treeNode.lineLength :this.getRangeNumber(3, 8) / 10 * treeNode.lineLength,
          lineLength:treeNode.lineWidth <= 1 ? this.getRangeNumber(30, 50) : treeNode.lineLength * (this.getRangeNumber(7, 10) / 10),
          lineWidth: Math.max(treeNode.lineWidth - this.getRangeNumber(2,3), 1),
          angle:
            i === 0 ? -angle : i === 1 ? angle : this.getRangeNumber(1, 10, true),
        };
        treeNode.children.push(node) 
        this.generateBranch(node);
      }
    },
    generateTreeRoot() {
      let data = {
        root: true,
        level: 1,
        lineLength: this.getRangeNumber(200, 300),
        lineWidth: this.getRangeNumber(10, 10),
      };
      this.generateBranch(data);
      this.treeDatas.push(data);
      this.generate(data);
      console.log(data)
    },
    /**
     * @description 随机范围数
     * @param  {Number} from     起始 Number
     * @param  {Number} to       结束 Number
     * @param  {String} withSign 是否随机正负号 Boolean
     * @return {Number} 随机数
     */
    getRangeNumber(from, to, withSign = false) {
      return (
        Math.round(Math.random() * (to - from) + from) *
        (withSign ? (Math.random() > 0.5 ? 1 : -1) : 1)
      );
    },
    generate(v) {
      this.ctx.lineCap = "round";
      const _gen = (treeNodes) => {
        treeNodes.forEach(treeNode => {
          this.ctx.save();
          this.ctx.translate(0, treeNode.from);
          this.ctx.rotate(treeNode.angle * Math.PI / 180)
          this.ctx.beginPath();
          this.ctx.moveTo(0, 0);
          this.ctx.lineTo(0, treeNode.lineLength);
          this.ctx.lineWidth = treeNode.lineWidth;
          this.ctx.strokeStyle = treeNode.color;
          this.ctx.stroke();
          this.ctx.closePath();
          if(treeNode.children) {
            _gen(treeNode.children);
          }
          this.ctx.restore()

        })
      };
      this.ctx.translate(this.canvas.width / 2, 0);
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(0, v.lineLength);
      this.ctx.lineWidth = v.lineWidth;
      this.ctx.stroke();
      this.ctx.closePath();
      if(v.children) {
        _gen(v.children);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-generator {
  height: 100%;
  background: #ddd;
}
</style>