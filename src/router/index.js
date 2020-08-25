import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/fronted/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Home
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/backend/Products.vue')
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('../views/backend/Coupons.vue')
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/backend/Orders.vue')
      },
      {
        path: 'customer_orders',
        name: 'Customer_Orders',
        component: () => import('../views/backend/CustomerOrders.vue')
      },
      {
        path: 'storage',
        name: 'Storage',
        component: () => import('../views/backend/Storage.vue')
      },
      {
        path: 'customer_checked',
        name: 'Customer_Checked',
        component: () => import('../views/backend/CustomerChecked.vue')
      },
      {
        path: 'order_done',
        name: 'Order_Done',
        component: () => import('../views/backend/OrderDone.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
