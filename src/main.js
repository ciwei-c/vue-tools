import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/styles/index.scss"

Vue.config.productionTip = false
import ColorPicker from "../packages/ColorPicker/lib/color-picker"
import ExcelViewer from "../packages/ExcelViewer/lib/excel-viewer"
import DragEditor from "../packages/DragEditor/lib/drag-editor"
// import PdfViewer from "../packages/PdfViewer/lib/pdf-viewer.js"
import PdfViewer from "../packages/PdfViewer/src/index.js"
import ElementUI from 'element-ui'

Vue.use(ElementUI)
Vue.use(ColorPicker)
Vue.use(ExcelViewer)
Vue.use(DragEditor)
Vue.use(PdfViewer)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
