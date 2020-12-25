import Pixel from "./index.vue"
export default {
  install(Vue, options = {}){
    Vue.component('pixel', Pixel)
  }
}