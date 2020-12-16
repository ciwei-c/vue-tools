import ColorPicker from "./ColorPicker"
import config from "@color-picker/config.js"
import "@color-picker/styles/index.scss"
export default {
  install(Vue, options = {}){
    Vue.component('color-picker', ColorPicker)
    Object.assign(config, options)
  }
}