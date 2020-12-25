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
    _generateTreeRoot(sx) {
      let length = this.getRangeNumber(150, 200);
      let treeNode = {
        length,
        animated: false,
        lineWidth: 20,
        radio: null,
        sx,
        sy: 0,
        ex: sx,
        ey: length,
        level: 0,
        root: true,
      };
      this.treeDatas.push(treeNode);
      return treeNode;
    },
    generateBranch(treeNode) {
      if (treeNode.lineWidth < 1) return;
      treeNode.children = [];
      let leftAngle = this.getRangeNumber(115, 130);
      let rightAngle = this.getRangeNumber(60, 80);
      let leftHeight = (treeNode.length * this.getRangeNumber(7, 10)) / 10;
      let rightHeight = (treeNode.length * this.getRangeNumber(7, 10)) / 10;
      treeNode.children[0] = {
        lineWidth: treeNode.lineWidth - this.getRangeNumber(2, 5),
        sx: treeNode.ex,
        sy: treeNode.ey - this.getRangeNumber(50, 150),
        ex: treeNode.ex - this.getRangeNumber(80, 100),
        ey: treeNode.ey + this.getRangeNumber(80, 100),
      };
      treeNode.children[1] = {
        lineWidth: treeNode.lineWidth - this.getRangeNumber(2, 5),
        sx: treeNode.ex,
        sy: treeNode.ey - this.getRangeNumber(50, 150),
        ex: treeNode.ex + this.getRangeNumber(80, 100),
        ey: treeNode.ey + this.getRangeNumber(80, 100),
      };
      // this.generateBranch(treeNode.children[0]);
      // this.generateBranch(treeNode.children[1]);
    },
    generateTreeRoot() {
      let treeNode = this._generateTreeRoot(this.canvas.width / 2);
      this.generateBranch(treeNode);
      this.generate(treeNode);
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
      const _gen = (treeNode) => {
        this.ctx.beginPath();
        this.ctx.moveTo(treeNode.sx, treeNode.sy);
        this.ctx.lineTo(treeNode.ex, treeNode.ey);
        this.ctx.lineWidth = treeNode.lineWidth;
        this.ctx.stroke();
        this.ctx.closePath();
        if (treeNode.children) {
          treeNode.children.forEach((v) => {
            _gen(v);
          });
        }
      };
      _gen(v);
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