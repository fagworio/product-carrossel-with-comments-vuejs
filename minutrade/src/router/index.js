import Vue from 'vue'
import Router from 'vue-router'
import NavMenu from '@/components/NavMenu'
import Shopping from '@/components/Shopping'
import SingleProduct from '@/components/SingleProduct'
import ListStores from '@/components/ListStores'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Shopping',
      component: Shopping,
    },
    {
      path: '/single-product',
      component: SingleProduct
     },
     {
      path: '/stores',
      component: ListStores
     }
  ]
})
