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
  },
  {
    path: '/tree-generator',
    name: 'TreeGenerator',
    component: () => import(/* webpackChunkName: "TreeGenerator" */ '../views/TreeGenerator')
  },
  {
    path: '/pixel',
    name: 'Pixel',
    component: () => import(/* webpackChunkName: "Pixel" */ '../views/Pixel')
  },
  {
    path: '/dynamic-form',
    name: 'DynamicForm',
    component: () => import(/* webpackChunkName: "DynamicForm" */ '../views/DynamicForm')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
