<template>
  <div class="cv-pixel">
    <img
      :src="image"
      alt=""
      ref="image"
      v-if="!imageRemove"
      @load="drawImage"
      :style="{
        opacity:showImage ? '1' : '0'
      }"
    />
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    pixelSize:{
      type:Number,
      default:16
    },
    showImage:Boolean
  },
  watch:{
    pixelSize(){
      this.drawImage()
    }
  },
  data() {
    return {
      imageRemove: false,
    };
  },
  mounted() {},
  methods: {
    drawImage() {
      this.canvas = this.$refs.canvas;
      let imageWidth = this.$refs.image.offsetWidth;
      let imageHeight = this.$refs.image.offsetHeight;
      this.canvas.height = imageHeight;
      this.canvas.width = imageWidth;
      this.ctx = this.canvas.getContext("2d");
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.$refs.image, 0, 0);
      let pixelSize = this.pixelSize;
      let r = pixelSize / 2;
      let space = 1;
      let initXpos = r + space;
      let initYpos = r + space;
      let currentXpos = initXpos;
      let currentYpos = initYpos;
      this.positions = [];

      while (currentYpos < imageHeight) {
        while (currentXpos < imageWidth) {
          this.positions.push({
            x: currentXpos,
            y: currentYpos,
          });
          currentXpos += pixelSize + space;
        }
        currentXpos = initXpos;
        currentYpos += pixelSize + space;
      }
      this.positions.forEach((v) => {
        let imgData = this.ctx.getImageData(v.x, v.y, 1, 1);
        v.color = {
          r: imgData.data[0],
          g: imgData.data[1],
          b: imgData.data[2],
          a: imgData.data[3] / 255,
        };
      });
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.positions.forEach((v) => {
        let color = `rgba(${v.color.r},${v.color.g},${v.color.b},${v.color.a})`;
        this.ctx.beginPath();
        this.ctx.arc(v.x, v.y, r, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cv-pixel {
  height: 100%;
  position: relative;
  overflow: hidden;
  user-select: none;
  img {
    max-width: 100%;
    position: absolute;
    opacity: 0;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  canvas {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>