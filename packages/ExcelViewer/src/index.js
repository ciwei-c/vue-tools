import ExcelViewer from "./index.vue"
export default {
  install(Vue){
    Vue.component('excel-viewer', ExcelViewer)
  }
}