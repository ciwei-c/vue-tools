import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/styles/index.scss"

Vue.config.productionTip = false
import ColorPicker from "../packages/ColorPicker/lib/color-picker"
import ExcelViewer from "../packages/ExcelViewer/lib/excel-viewer"
import DragEditor from "../packages/DragEditor/lib/drag-editor"
import Pixel from "../packages/Pixel/lib/pixel"
import TreeGenerator from "../packages/TreeGenerator/lib/tree-generator"
import PdfViewer from "../packages/PdfViewer/src/index.js"
import DynamicForm from "../packages/DynamicForm/lib/dynamic-form"
import ElementUI from 'element-ui'

Vue.use(ElementUI)
Vue.use(ColorPicker)
Vue.use(ExcelViewer)
Vue.use(DragEditor)
Vue.use(PdfViewer)
Vue.use(Pixel)
Vue.use(TreeGenerator)
Vue.use(DynamicForm)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
