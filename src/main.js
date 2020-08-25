import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap' // Import js file
import 'bootstrap/dist/css/bootstrap.min.css' // Import css file
import $ from 'jquery'
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import { ToggleButton } from 'vue-js-toggle-button'

window.$ = $
Vue.config.productionTip = false
Vue.component('Loading', Loading)
Vue.component('ToggleButton', ToggleButton)
Vue.use(VueAxios, axios)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
extend('required', required)
extend('email', email)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
