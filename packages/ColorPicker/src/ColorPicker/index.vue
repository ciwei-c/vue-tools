<template>
  <div class="cv-color-picker">
    <i
      :class="{
        'color-picker-icon-sucker': true,
        'cv-color-picker__sucker': true,
      }"
      @click="onStartSucker"
      @mouseenter="zoomVisible = false"
      @mouseleave="zoomVisible = true"
    />
    <div
      v-if="active && zoomVisible"
      class="cv-color-picker__zoom"
      @click="onPickColor"
      :style="zoomFormatStyle"
    >
      <div class="cv-color-picker__zoom-canvas">
        <div class="cv-color-picker__zoom-canvas__center-pixel-color">
          {{ getBackground(centerPixelPosition, centerPixelPosition) }}
        </div>
        <div v-for="pixelX in pixelNumber" :key="pixelX">
          <div
            v-for="pixelY in pixelNumber"
            :class="{
              'cv-color-picker__zoom-canvas__center-pixel':
                pixelX === centerPixelPosition &&
                pixelY === centerPixelPosition,
            }"
            :key="pixelY"
            :style="{
              height: pixelSize,
              width: pixelSize,
              background: getBackground(pixelX, pixelY),
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import { throttle } from "@color-picker/utils";
export default {
  props: {
    zoomSize: {
      type: Number,
      default: 250,
    },
    pixelNumber: {
      type: Number,
      default: 13,
    },
    target: String,
  },
  data() {
    return {
      active: false,
      zoomVisible: false,
      pixelDatas: [],
      zoomStyle: {
        top: 0,
        left: 0,
      },
    };
  },
  computed: {
    pixelSize() {
      return this.zoomStyle.height / this.pixelNumber + "px";
    },
    centerPixelPosition() {
      return (this.pixelNumber + 1) / 2;
    },
    zoomFormatStyle() {
      let style = {};
      Object.keys(this.zoomStyle).forEach(
        (k) => (style[k] = this.zoomStyle[k] + "px")
      );
      return style;
    },
  },
  mounted() {
    Object.assign(this.zoomStyle, {
      width: this.zoomSize,
      height: this.zoomSize,
    });
    window.addEventListener(
      "resize",
      throttle(30, () => this.getCanvas())
    );
    document.addEventListener(
      "mouseleave",
      throttle(30, () => (this.zoomVisible = false))
    );
    document.addEventListener(
      "mouseenter",
      throttle(30, () => (this.zoomVisible = true))
    );
  },
  beforeDestroy() {
    window.removeEventListener("resize", throttle);
    window.removeEventListener("mouseleave", throttle);
    window.removeEventListener("mouseenter", throttle);
  },
  methods: {
    getCanvas() {
      if (this.target) {
        this.targetEl = document.querySelector(this.target);
        this.targetRect = this.targetEl.getBoundingClientRect();
      }
      return new Promise((res) => {
        html2canvas(document.body).then((canvas) => {
          this.ctx = canvas.getContext("2d");
          res();
        });
      });
    },
    getCanvasImageData({ x, y }) {
      let imageData = this.ctx.getImageData(
        x - (this.pixelNumber - 1) / 2,
        y - (this.pixelNumber - 1) / 2,
        this.pixelNumber,
        this.pixelNumber
      );
      this.pixelDatas = [];
      for (var i = 0; i < imageData.data.length; i += 4) {
        this.pixelDatas.push({
          r: imageData.data[i],
          g: imageData.data[i + 1],
          b: imageData.data[i + 2],
          a: imageData.data[i + 3] / 255,
        });
      }
    },
    getBackground(pixelX, pixelY) {
      try {
        let { r, g, b, a } = this.pixelDatas[
          (pixelX - 1) * this.pixelNumber + (pixelY - 1)
        ];
        return `rgba(${r},${g},${b},${a})`;
      } catch (error) {
        return "";
      }
    },
    setCalcClientPosition(value, direction) {
      return direction === "x"
        ? value - this.zoomStyle.width / 2
        : value - this.zoomStyle.height / 2;
    },
    setZoomPosition(left, top) {
      Object.assign(this.zoomStyle, { left, top });
    },
    cancelZoom() {
      this.active = false;
      document.removeEventListener("mousemove", throttle);
    },
    onPickColor() {
      this.$emit(
        "pick",
        this.getBackground(this.centerPixelPosition, this.centerPixelPosition)
      );
      this.active = false;
    },
    onStartSucker(e) {
      if (this.active) {
        return this.cancelZoom();
      }
      this.getCanvas().then(() => {
        this.setZoomPosition(
          this.setCalcClientPosition(e.clientX, "x"),
          this.setCalcClientPosition(e.clientY, "y")
        );
        document.addEventListener(
          "mousemove",
          throttle(0, (e) => {
            this.onMouseMove(e);
          })
        );
        this.active = true;
      });
    },
    onMouseMove(e) {
      if (this.targetRect) {
        if (
          e.clientX > this.targetRect.left + this.targetRect.width ||
          e.clientX < this.targetRect.left ||
          e.clientY > this.targetRect.top + this.targetRect.height ||
          e.clientY < this.targetRect.top
        ) {
          this.zoomVisible = false;
        } else {
          this.zoomVisible = true;
        }
      }
      this.getCanvasImageData({ x: e.clientX, y: e.clientY });
      this.setZoomPosition(
        this.setCalcClientPosition(e.clientX, "x"),
        this.setCalcClientPosition(e.clientY, "y")
      );
      this.timeout = null;
    },
  },
};
</script>


<style lang="scss" scoped>
.cv-color-picker {
  cursor: none;
  &__sucker {
    cursor: pointer;
    position: relative;
    z-index: 100000;
  }
  &__zoom {
    position: fixed;
    border: 1px solid #ccc;
    border-radius: 50%;
    z-index: 99999;
    overflow: hidden;
    &-canvas {
      position: relative;
      height: 100%;
      width: 100%;
      &__center-pixel {
        position: relative;
        &::after {
          position: absolute;
          height: 100%;
          width: 100%;
          content: " ";
          left: -1px;
          top: -1px;
          border: 1px solid #f56c6c;
        }
      }
      &__center-pixel-color {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 20%;
        background: #000;
        color: #fff;
        font-size: 12px;
        border-radius: 4px;
        padding: 5px 10px;
        word-break: keep-all;
        white-space: nowrap;
      }
      > div {
        display: flex;
        align-items: center;
        > div {
          border-right: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
          box-sizing: border-box;
          &:last-child {
            border-right: 0;
          }
        }
        &:last-child {
          > div {
            border-bottom: 0;
          }
        }
      }
    }
  }
}
</style>