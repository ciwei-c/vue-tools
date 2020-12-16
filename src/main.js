import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import ColorPicker from "../packages/ColorPicker/lib/color-picker"
Vue.use(ColorPicker)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
