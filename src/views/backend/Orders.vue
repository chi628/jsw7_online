<template>
  <!-- toggle-button尚未設定好  -->
  <div class="orders">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <h3>Orders</h3>
      <table>
        <thead>
          <tr>
            <th>下單時間</th>
            <th>購買款項</th>
            <th>付款方式</th>
            <th>應付金額</th>
            <th>是否付款</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td>{{ item.created.datetime }}</td>
            <td>
              <ul class="text-center">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.quantity }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td>{{ item.payment }}</td>
            <td class="text-center">{{ item.amount }}</td>
            <td>
              <div class="custom-control custom-switch">
                <input
                  :id="item.id"
                  v-model="item.paid"
                  type="checkbox"
                  class="custom-control-input"
                  @change="setOrderPaid(item)"
                />
                <label class="custom-control-label" :for="item.id">
                  <strong v-if="item.paid" class="text-success">已付款</strong>
                  <span v-else class="text-muted">尚未付款</span>
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      orders: {
        user: {}
      },
      isLoading: false
    }
  },
  methods: {
    getOrders () {
      this.isLoading = true
      this.axios.get(`${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/orders`)
        .then(res => {
          this.orders = res.data.data
          console.log('orders', this.orders)
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    setOrderPaid (item) {
      let url = `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/paid`
      if (!item.paid) {
        url = `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/unpaid`
      }
      this.axios.patch(url, item.id).then(() => {
        this.getOrders()
      })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
<style>
.orders {
  position: relative;
}
.container {
  width: 1080px;
  position: absolute;
  left: 50%;
  margin-left: -540px;
}
.container table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 10px;
  text-align: center;
  /* font-family: 'Bree Serif', serif; */
  color: #333;
}
table thead th {
  padding: 5px 0px;
  letter-spacing: 2px;
  color: #fff;
  text-align: center;
  background-color: #915957;
  border: 1px solid #915957;
  border-radius: 5px;
}
table tbody td {
  padding: 5px 0px;
  color: #222;
  border-bottom: 1px solid #003049;
}
</style>
