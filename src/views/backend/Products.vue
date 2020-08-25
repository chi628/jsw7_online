<template>
<!-- toggle-button尚未設定好  -->
    <div class="products">
      <loading :active.sync="isLoading"></loading>
      <div class="container">
        <h3>Products</h3>
        <button class="addbtn" type="button" @click="openModal('new')"> 新增產品</button>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Sale</th>
              <th>Lanched</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.origin_price }}</td>
              <td>{{ item.price }}</td>
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
        <!-- pagination -->
        <Pagination :pages="pagination" @updatepage="getProducts"/>
      </div>
      <!-- 新增/編輯 Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="productModalTitle" aria-hidden="true">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="productModalTitle">
                            <span v-if=isNew>新增產品</span>
                            <span v-else>編輯產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label>輸入圖片網址</label>
                                    <input type="text" v-model="tempProduct.imageUrl[0]" class="form-control" placeholder="請輸入圖片連結">
                                </div>
                                <div class="form-group">
                                    <label for="customFile"> 或 上傳圖片
                                        <i class="fas fa-spinner fa-spin"/>
                                    </label>
                                    <input ref="file" type="file" class="form-control">
                                </div>
                                <img :src="tempProduct.imageUrl[0]" class="img-fluid" alt="">
                            </div>
                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label for="title">標題</label>
                                    <input id="title" v-model="tempProduct.title" type="text" class="form-control" placeholder="請輸入標題" required>
                                </div>
                                <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="category">分類</label>
                                    <input id="category" v-model="tempProduct.category" type="text" class="form-control" placeholder="請輸入分類" required>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="unit">單位</label>
                                    <input id="unit" v-model="tempProduct.unit" type="text" class="form-control" placeholder="請輸入單位">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="origin_price">原價</label>
                                    <input id="origin_price" v-model="tempProduct.origin_price" type="number" class="form-control" placeholder="請輸入原價">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="price">售價</label>
                                    <input id="price" v-model="tempProduct.price" type="number" class="form-control" placeholder="請輸入售價">
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label for="description">產品描述</label>
                                <textarea type="text" id="description" class="form-control" v-model="tempProduct.description" placeholder="請輸入商品描述"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="content">產品說明</label>
                                <textarea type="text" id="content"  class="form-control" v-model="tempProduct.content" placeholder="請輸入產品說明或注意事項"></textarea>
                            </div>
                            <div class="custom-control custom-switch">
                              <input
                                :id="tempProduct.id"
                                v-model="tempProduct.enabled"
                                type="checkbox"
                                class="custom-control-input"
                              />
                              <label class="custom-control-label" :for="tempProduct.id">
                                <strong v-if="tempProduct.enabled" class="text-success">上架</strong>
                                <span v-else class="text-muted">未上架</span>
                              </label>
                            </div>
                        </div>
                    </div>
                </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="addProduct" v-if="isNew">確認新增</button>
                        <button type="button" class="btn btn-primary" @click="updateProduct(tempProduct.id)" v-else>Save changes</button>
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
                        <h5 class="modal-title" id="deleteModalTitle">刪除產品</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        是否刪除<strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="deleteProduct(tempProduct.id)">確認刪除</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal End -->
    </div>
</template>
<style>
    .products{
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
<script>
import Pagination from '@/components/Pagination.vue'
/* global $ */
export default {
  components: {
    Pagination
  },
  data () {
    return {
      products: [],
      tempProduct: {
        imageUrl: []
      },
      isNew: false,
      token: '',
      isLoading: false,
      pagination: {}
    }
  },
  props: [' token'],
  methods: {
    getProducts (num = 1) {
      this.isLoading = true
      this.axios.get(`${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${num}`)
        .then(res => {
          this.isLoading = false
          this.products = res.data.data
          this.pagination = res.data.meta.pagination
        })
        .catch(err => {
          this.isLoading = false
          console.log('err', err.response.data.message)
        })
    },
    getProduct (id) {
      this.isLoading = true
      this.axios.get(`${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`)
        .then(res => {
          this.isLoading = false
          this.tempProduct = res.data.data
          $('#productModal').modal('show')
        })
        .catch(err => {
          this.isLoading = false
          console.log(err.response.data.message)
        })
    },
    addProduct () {
      this.isLoading = true
      this.axios.post(`${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/product`, this.tempProduct)
        .then(res => {
          this.isLoading = false
          this.tempProduct = res.data.data
          this.getProducts()
          $('#productModal').modal('hide')
        })
        .catch(err => {
          this.isLoading = false
          console.log(err.response.data.message)
        })
    },
    updateProduct (id) {
      this.isLoading = true
      this.axios.patch(`${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`, this.tempProduct)
        .then(res => {
          this.isLoading = false
          this.tempProduct = res.data.data
          this.getProducts()
          $('#productModal').modal('hide')
        })
        .catch(err => {
          this.isLoading = false
          console.log(err.response.data.message)
        })
    },
    deleteProduct (id) {
      this.isLoading = true
      this.axios.delete(`${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`)
        .then(res => {
          this.isLoading = false
          this.getProducts()
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
          $('#productModal').modal('show')
          break
        case 'edit':
          this.isNew = false
          this.getProduct(item.id)
          break
        case 'delete':
          this.tempProduct = { ...item }
          $('#deleteModal').modal('show')
          break
      }
    }
  },
  created () {
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)MikoToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`
    this.getProducts()
  }
}
</script>
