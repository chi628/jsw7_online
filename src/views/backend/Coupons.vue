<template>
<!-- toggle-button尚未設定好  -->
    <div class="coupons">
      <loading :active.sync="isLoading"></loading>
      <div class="container">
        <h3>Coupons</h3>
        <button class="addbtn" type="button" @click="openModal('new')">新增優惠券</button>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Code</th>
              <th>Percent</th>
              <th>Ｅxpiry_Ｄate</th>
              <th>enabled</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in coupons" :key="item.id">
              <td>{{ item.title }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.percent }}</td>
              <td>{{ item.created.datetime }}</td>
              <td>
                <span v-if="item.enabled">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <button type="button" class="editbtn" @click="openModal('edit', item)">Edit</button>
                <button type="button" class="delbtn" @click="openModal('delete', item)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 新增/編輯 Modal -->
        <div class="modal fade" id="couponsModal" tabindex="-1" role="dialog" aria-labelledby="couponsModalTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="couponsModalTitle">
                            <span v-if="isNew">新增優惠券</span>
                            <span v-else>編輯優惠券</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                     <div class="modal-body">
                        <div class="form-group">
                        <label for="title">標題</label>
                        <input
                            id="title"
                            v-model="tempCoupon.title"
                            type="text"
                            class="form-control"
                            placeholder="請輸入標題"
                        >
                        </div>
                        <div class="form-group">
                        <label for="coupon_code">優惠碼</label>
                        <input
                            id="coupon_code"
                            v-model="tempCoupon.code"
                            type="text"
                            class="form-control"
                            placeholder="請輸入優惠碼"
                        >
                        </div>
                        <div class="form-group">
                        <label for="due_date">到期日</label>
                        <input
                            id="due_date"
                            v-model="due_date"
                            type="date"
                            class="form-control"
                        >
                        </div>
                        <div class="form-group">
                        <label for="due_time">到期時間</label>
                        <input
                            id="due_time"
                            v-model="due_time"
                            type="time"
                            step="1"
                            class="form-control"
                        >
                        </div>
                        <div class="form-group">
                        <label for="price">折扣百分比</label>
                        <input
                            id="price"
                            v-model="tempCoupon.percent"
                            type="number"
                            class="form-control"
                            placeholder="請輸入折扣數量"
                        >
                        </div>
                        <div class="custom-control custom-switch">
                              <input
                                :id="tempCoupon.id"
                                v-model="tempCoupon.enabled"
                                type="checkbox"
                                class="custom-control-input"
                              />
                              <label class="custom-control-label" :for="tempCoupon.id">
                                <strong v-if="tempCoupon.enabled" class="text-success">啟用</strong>
                                <span v-else class="text-muted">未啟用</span>
                              </label>
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" v-if="isNew" @click="addCoupon">確認新增</button>
                        <button type="button" class="btn btn-primary" v-else @click="updateCoupon(tempCoupon.id)">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal End -->

        <!-- 刪除 Modal -->
        <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalTitle" aria-hidden="true">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteModalTitle">刪除優惠券</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        是否刪除<strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="deleteProduct(tempCoupon.id)">確認刪除</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal End -->
    </div>
</template>
<script>
// import Pagination from '@/components/Pagination.vue'
/* global $ */
export default {
  components: {
    // Pagination
  },
  data () {
    return {
      coupons: [],
      tempCoupon: {
        title: '',
        code: '',
        percent: 100,
        enabled: false,
        deadline_at: '2020-06-16 09:31:18'
      },
      due_date: '',
      due_time: '',
      isNew: false,
      token: '',
      isLoading: false,
      pagination: {}
    }
  },
  //   props: [' token'],
  methods: {
    getCoupons () {
      this.isLoading = true
      this.axios.get(`${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/coupons`)
        .then(res => {
          this.isLoading = false
          //   console.log('coupons', res.data.data)
          this.coupons = res.data.data
        })
        .catch(err => {
          this.isLoading = false
          console.log('err', err.response.data.message)
        })
    },
    getCoupon (id) {
      this.isLoading = true
      this.axios.get(`${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${id}`)
        .then(res => {
          this.isLoading = false
          const deadlineAt = res.data.data.deadline.datetime.split(' ')
          this.due_date = deadlineAt[0]
          this.due_time = deadlineAt[1]
          this.tempCoupon = res.data.data
          $('#couponsModal').modal('show')
        })
        .catch(err => {
          this.isLoading = false
          console.log(err.response.data.message)
        })
    },
    addCoupon () {
      this.isLoading = true
      this.axios.post(`${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon`, this.tempCoupon)
        .then(res => {
          this.isLoading = false
          this.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`
          this.tempCoupon = res.data.data
          this.getCoupons()
          $('#couponsModal').modal('hide')
          this.tempCoupon = {
            title: '',
            code: '',
            percent: 100,
            enabled: false,
            deadline_at: '2020-10-16 09:31:18'
          }
        })
        .catch(err => {
          this.isLoading = false
          console.log(err.response.data.message)
        })
    },
    updateCoupon (id) {
      this.isLoading = true
      this.axios.patch(`${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${id}`, this.tempCoupon)
        .then(res => {
          this.isLoading = false
          this.tempCoupon = res.data.data
          this.getCoupons()
          $('#couponsModal').modal('hide')
        })
        .catch(err => {
          this.isLoading = false
          console.log(err.response.data.message)
        })
    },
    deleteProduct (id) {
      this.isLoading = true
      this.axios.delete(`${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${id}`)
        .then(res => {
          this.isLoading = false
          this.getCoupons()
          $('#deleteModal').modal('hide')
        })
        .catch(err => {
          this.isLoading = false
          console.log(err.response.data.message)
        })
    },
    openModal (isNew, item) {
      switch (isNew) {
        case 'new':
          this.isNew = true
          this.tempProduct = {
            imageUrl: []
          }
          $('#couponsModal').modal('show')
          break
        case 'edit':
          this.isNew = false
          this.getCoupon(item.id)
          break
        case 'delete':
          this.tempCoupon = { ...item }
          $('#deleteModal').modal('show')
          break
      }
    }
  },
  created () {
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)MikoToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`
    this.getCoupons()
  }
}
</script>
<style>
    .coupon{
        position: relative;
    }
    .container{
        width: 1080px;
        position: absolute;
        left: 50%;
        margin-left: -540px;
    }
    .addbtn {
      width: 100px;
      height: 40px;
      float: right;
      border: 1px solid #6d6875;
      border-radius: 5px;
      background-color: #6d6875;
      color: #ededed;
      font-size: 16px;
    }
    .container table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 10px;
      text-align: center;
      /* font-family: 'Bree Serif', serif; */
      color:#333;
    }
    table thead th{
      padding:5px 0px;
      letter-spacing: 2px;
      color:#fff;
      text-align:center;
      background-color:#915957;
      border:1px solid #915957;
      border-radius: 5px;
    }
    table tbody td{
      padding:5px 0px;
      color:#222;
      border-bottom:1px solid #003049;
    }
    .editbtn,.delbtn{
      width: 80px;
      height: 40px;
      color:#fff;
      text-align:center;
      border-radius: 5px;
      margin: 0 5px;
    }
    .editbtn{
      background-color:#84a59d;
    }
    .delbtn{
      background-color:#d62828;
    }
</style>
