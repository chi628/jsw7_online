<template>
    <div>
        <Navbar/>
        <router-view v-if="checkedSuccess" :token="token"/>
    </div>
</template>
<script>
import Navbar from '../../components/NavBar_backend.vue'
export default {
  components: {
    Navbar
  },
  data () {
    return {
      token: '',
      checkedSuccess: false
    }
  },
  methods: {
    checkedToken () {
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)MikoToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`
      this.axios.post(`${process.env.VUE_APP_ApiPath}/api/auth/check`, {
        api_token: this.token
      }).then(res => {
        // console.log('Authtoken', res)
        this.checkedSuccess = true
      }).catch(err => {
        console.log(err)
        this.$router.push('/')
      })
    }
  },
  created () {
    this.checkedToken()
  }
}
</script>
