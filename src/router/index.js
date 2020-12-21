import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home')
  },
  {
    path: '/color-picker',
    name: 'ColorPicker',
    component: () => import(/* webpackChunkName: "ColorPicker" */ '../views/ColorPicker')
  },
  {
    path: '/pdf-viewer',
    name: 'PdfViewer',
    component: () => import(/* webpackChunkName: "PdfViewer" */ '../views/PdfViewer')
  },
  {
    path: '/excel-viewer',
    name: 'ExcelViewer',
    component: () => import(/* webpackChunkName: "ExcelViewer" */ '../views/ExcelViewer')
  },
  {
    path: '/selection',
    name: 'Selection',
    component: () => import(/* webpackChunkName: "Selection" */ '../views/Selection')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
