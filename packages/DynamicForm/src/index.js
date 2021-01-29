import DynamicForm from "./views/index.vue"
import "@dynamic-form/styles/index.scss"
import config from "@dynamic-form/views/Common/config.js"
export default {
  install(Vue, options = {ui:'element'}){
    Vue.component('dynamic-form', DynamicForm)
    config.ui = options.ui
  }
}