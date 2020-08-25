<template>
    <div class="products">
        <loading :active.sync="isLoading"></loading>
         <div  class="itemlist">
            <div v-for="item in products" :key="item.id" class="item">
                <div class="itemimg">
                    <img :src="`${item.imageUrl[0]}`" alt="">
                </div>
                <span class="tag">{{item.category}}</span>
                <h5 class="item-tilte"><router-link :to="`/product/${item.id}`">{{item.title}}</router-link></h5>
                <!-- <p class="item-content">{{item.content}}</p> -->
                <div class="price">
                    <p>
                        <span class="origin_price">NT${{item.origin_price}}</span>
                        <span>NT${{item.price}}</span>
                    </p>
                </div>
                <div class="btn_container">
                  <button type="button" class="btn">
                      <router-link :to="`/product/${item.id}`">Quick View</router-link>
                  </button>
                  <button type="button" class="btn" @click="addToCart(item)">Add To Cart</button>
                </div>
            </div>
        </div>
        <div class="lookcart">
          <button type="button" @click="getSideCart">查看購物車</button>
        </div>
        <div class="side_cart">
          <div class="side_header">
            <div class="bag_title">
              <h4>Cart</h4>
              <h6 v-if="(cart.length)>1">(<span>{{cart.length}}</span> items)</h6>
              <h6 v-else>(<span>{{cart.length}}</span> item)</h6>
            </div>
            <button type="button" class="bag_close" @click="closeSideCart">
              <span>&times;</span>
            </button>
          </div>
            <div v-for="item in cart" :key="item.id" class="bag_content">
              <div class="bag_img">
                <img :src="`${item.product.imageUrl[0]}`">
                  <div class="item_content">
                    <h3>{{item.product.title}}</h3>
                    <h4>{{item.product.price}}</h4>
                  </div>
              </div>
              <div class="bag_edit">
                <div class="quantity_group">
                  <div class="">
                    <button class="quantity_btn"
                            type="button"
                            :disabled="item.quantity === 1">
                            -
                    </button>
                  </div>
                  <input type="text" class="quantity_form"
                          :value="item.quantity">
                  <div class="">
                    <button class="quantity_btn"
                              type="button">
                            +
                    </button>
                  </div>
                </div>
                <button type="button" class="item_remove" @click="removeItem(item.product.id)">remove</button>
              </div>
            </div>
            <div class="side_footer">
              <!-- <button type="button">結帳</button> -->
              <router-link to="/admin/customer_checked">結帳</router-link>
            </div>
        </div>
    </div>
</template>
<script>
/* global $ */
// import Bread from '@/components/Bread.vue'
export default {
  components: {
    // Bread
  },
  data () {
    return {
      products: [],
      cart: {},
      isLoading: false,
      token: ''
    }
  },
  props: [' token'],
  methods: {
    getProducts () {
      this.isLoading = true
      this.axios.get(`${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/ec/products`)
        .then(res => {
          this.products = res.data.data
          this.isLoading = false
        })
    },
    addToCart (item, quantity = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/ec/shopping`
      const cart = {
        product: item.id,
        quantity
      }
      this.axios.post(url, cart)
        .then(res => {
          this.isLoading = false
          $('.itemlist').addClass('show_car')
          setTimeout(() => {
            $('.itemlist').removeClass('show_car')
          }, 1000)
          this.getProducts()
        })
        .catch(err => {
          this.isLoading = false
          console.log('add to car', err)
        })
    },
    removeItem (id) {
      // console.log(id)
      this.isLoading = true
      const url = `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`
      this.axios.delete(url)
        .then(res => {
          this.isLoading = false
          this.getCart()
        })
        .catch(err => {
          this.isLoading = false
          console.log(err)
        })
    },
    getCart () {
      this.isLoading = true
      this.axios.get(`${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/ec/shopping`)
        .then(res => {
          this.isLoading = false
          this.cart = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getSideCart () {
      $('.lookcart').addClass('show_car')
      this.getCart()
    },
    closeSideCart () {
      $('.lookcart').removeClass('show_car')
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
<style>
.products{
    /* border: 1px solid blue; */
    position: relative;
    height: 100%;
}
.itemlist{
    /* border: 1px solid red; */
    width: 1056px;
    position: absolute;
    left: 50%;
    margin-left: -528px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;/*換行*/
    justify-content: flex-start;
    align-items: center;
}
.item{
    width: 330px;
    margin: 10px;
}
.itemimg{
    width: 300px;
    height: 200px;
    overflow: hidden;
}
.itemimg img{
    width: 100%;
    margin: 0 15px;
}
.tag{
    /* border: 1px solid green; */
    position: relative;
    top: -195px;
    left: 15px;
    width: 100px;
    height: 100px;
    padding: 10px;
    background: #9D6B53;
    border-radius: 5px;
    color: #fff;
    font-size: 6px;
    font-family: 'Bree Serif', serif;
  }
.item-tilte,.price{
    text-align: center;
    margin: 10px;
}
.item-tilte a{
    text-decoration: none;
    color: #6d6875;
    font-family: 'Lemonada', cursive;
    font-size: 22px;
}
.origin_price{
    /* left: -10px; */
    padding: 0 10px;
    font-size: 12px;
    text-decoration: line-through;
    font-family: 'Lemonada', cursive;
}
.btn_container{
    /* border: 1px solid green; */
    height: 40px;
    margin: 10px auto;
    text-align: center;
}
.btn{
    width: 120px;
    height: 100%;
    background-color: #fff;
    border: 2px solid #B5838D;
    border-radius: 5px;
    margin: 0 15px;
    padding: 0 15px;
    color: #6d6875;
    font-family: 'Lemonada', cursive;
    font-size: 12px;
}
.btn a{
    text-decoration: none;
    color: #6d6875;
}
.btn:hover,.btn a:hover{
    cursor: pointer;
    background-color: #B5838D;
    color: #fff;
    transform: .5s ease;
}
.show_car+ .side_cart {
  transform: translateX(0);
}
.hidden_car+ .side_cart {
  transform: translateX(100%);
}
.side_cart{
  border:1px solid red;
  background-color: #fff;
  width: 400px;
  height: 100%;
  position: fixed;
  float: right;
  right: 0;
  top: 0;
  padding: 5px 10px;
  overflow-y:scroll;
  transform: translateX(100%);
  transition: .5s;
}
.side_header{
  /* border:1px solid green; */
  width: 350px;
  position: fixed;
  height: 40px;
  display: flex;
  justify-content:space-between
}
.side_footer{
  border:1px solid green;
  position: fixed;
  right: 0;
  bottom: 0;
  width: 400px;
  height: 100px;
  background-color: #fff;
}
.side_footer button{
  margin: 30px 140px;
  width: 120px;
  height: 40px;
  background-color: #000;
  color: #fff;
}
.bag_title{
  /* border:1px solid red; */
  display: flex;
  justify-content:center;
  align-items:center;
}
.bag_close{
  height: 35px;
  float: left;
  border: none;
  background-color: #fff;
  font-size: 18px;
}
.bag_content{
  border:1px solid blue;
  width: 350px;
  display: flex;
  position: relative;
  top: 50px;
  flex-direction: column;
  padding: 5px 10px;
}
.bag_img{
  /* border:1px solid green; */
  width: 125px;
  display: flex;
}
.bag_img img{
  width: 100%;
}
.item_content{
  /* border:1px solid purple; */
  margin: 5px 10px;
}
.bag_edit{
  border:1px solid purple;
  width: 100%;
  display: flex;
  padding: 5px 10px;
  margin: 5px auto;
}
.quantity_group{
  display: flex;
}
.quantity_btn{
  width: 30px;
  height: 100%;
  border: none;
}
.quantity_form{
  width: 80px;
  border: none;
  text-align: center;
}
.item_remove{
  margin: 0 5px;
  width: 100%;
  border: none;
}
</style>
