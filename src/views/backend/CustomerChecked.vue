<template>
  <div class="information">
        <loading :active.sync="isLoading"></loading>
    <div class="form">
      <validation-observer v-slot="{ invalid }" class="col-md-6">
        <form @submit.prevent="createOrder">
          <div class="form-group">
            <validation-provider v-slot="{ errors, classes }" rules="required">
              <label for="username">收件人姓名</label>
              <input
                id="username"
                v-model="form.name"
                type="text"
                class="form-control"
                :class="classes"
              />
              <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <validation-provider v-slot="{ errors, classes }" rules="required|email">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-control"
                :class="classes"
              />
              <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <validation-provider v-slot="{ errors, classes }" rules="required">
              <label for="tel">收件人手機號碼</label>
              <input id="tel" v-model="form.tel" type="tel" class="form-control" :class="classes" />
              <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <validation-provider v-slot="{ errors, classes }" rules="required">
              <label for="address">地址</label>
              <input
                id="address"
                v-model="form.address"
                type="text"
                class="form-control"
                :class="classes"
              />
              <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <label for="payment">購買方式</label>
            <select id="payment" v-model="form.payment" class="form-control" required>
              <option value disabled>請選擇付款方式</option>
              <option value="WebATM">WebATM</option>
              <option value="ATM">ATM</option>
              <option value="CVS">CVS</option>
              <option value="Barcode">Barcode</option>
              <option value="Credit">Credit</option>
              <option value="ApplePay">ApplePay</option>
              <option value="GooglePay">GooglePay</option>
            </select>
          </div>
          <div class="form-group">
            <label for="message">留言</label>
            <textarea id="message" v-model="form.message" class="form-control" cols="30" rows="3"></textarea>
          </div>
          <div class="text-right">
            <button type="submit" class="btn btn-primary" :disabled="invalid">送出表單</button>
          </div>
        </form>
      </validation-observer>
    </div>
    <div class="side_cart">
      <div class="side_header">
        <div class="bag_title">
          <h4>Cart</h4>
          <h6 v-if="(cart.length)>1">
            (
            <span>{{cart.length}}</span> items)
          </h6>
          <h6 v-else>
            (
            <span>{{cart.length}}</span> item)
          </h6>
        </div>
      </div>
      <div v-for="item in cart" :key="item.id" class="bag_content">
        <div class="bag_img">
          <img :src="`${item.product.imageUrl[0]}`" />
          <div class="item_content">
            <h3>{{item.product.title}}</h3>
            <h4>{{item.product.price}}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.information {
  /* border: 1px solid blue; */
  width: 1080px;
  position: relative;
  left: 50%;
  margin-left: -540px;
  display: flex;
}
.form {
  /* border: 1px solid red; */
  width: 540px;
}
.side_cart {
  /* border:1px solid red; */
  background-color: #fff;
  width: 520px;
  height: 100%;
  margin: 0 20px;
}
.side_header {
  /* border:1px solid green; */
  width: 350px;
  /* height: 40px; */
  display: flex;
  justify-content: space-between;
}
.bag_title {
  /* border:1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.bag_content {
  border: 1px solid blue;
  width: 500px;
  display: flex;
  /* position: relative; */
  /* top: 50px; */
  flex-direction: column;
  /* padding: 5px 10px; */
}
.bag_img {
  /* border:1px solid green; */
  width: 125px;
  display: flex;
}
.bag_img img {
  width: 100%;
}
.item_content {
  /* border:1px solid purple; */
  margin: 5px 10px;
}
</style>
<script>
export default {
  data () {
    return {
      cart: {},
      isLoading: false,
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: ''
      }
    }
  },
  methods: {
    createOrder () {
      this.isLoading = true
      const order = { ...this.form }
      // console.log(order)
      this.axios.post(`${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/ec/orders`, order)
        .then(res => {
          this.isLoading = false
          console.log('success', res.data.data)
          this.$router.push('/admin/order_done')
        })
        .catch(err => {
          console.log('failed', err)
          this.isLoading = false
        })
    },
    getCart () {
      this.isLoading = true
      this.axios.get(`${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/ec/shopping`)
        .then(res => {
          this.isLoading = false
          this.cart = res.data.data
          // console.log(this.cart)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
