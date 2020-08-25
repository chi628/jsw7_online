<template>
  <div class="storage">
    <Loading :active.sync="isLoading" />
     <div class="container">
      <div class="uploadnew">
        <!-- <input id="customFile" type="file" > -->
        <label class="uploadbtn">
          <input id="customFile" style="display:none;" type="file" @change="uploadFile">
          <i class="fa fa-photo"></i> 上傳圖片
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>圖片縮圖</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in storages" :key="item.id">
            <td>
              <div class="showimg">
                <img :src="item.path" alt="">
              </div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-danger" @click.prevent="openModel(item)">刪除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 刪除 Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalTitle" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="deleteModalTitle">刪除資料</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            刪除後將無法恢復，是否確定要刪除。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger text-white" @click="deleteData">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
        <!-- Modal End -->
  </div>
</template>
<style>
.storage{
  width: 900px;
  position: absolute;
  left: 50%;
  margin-left: -450px;
}
.container table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 10px;
  text-align: center;
  color: #333;
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
.uploadnew{
  float: right;
}
.uploadbtn{
  width: 100px;
  height: 40px;
  border:1px solid #915957;
  background-color:#915957;
  border-radius: 5px;
  color: #fff;
  padding: 5px 0 ;
  text-align: center;
  margin: 5px 10px;
}
.showimg{
  border: 1px solid red;
  width: 350px;
}
.showimg img{
  width: 50%;
}
</style>
<script>
/* global $ */
export default {
  name: 'Storage',
  components: {
  },
  data () {
    return {
      storages: {},
      tempData: {},
      isLoading: false,
      token: ''
    }
  },
  props: [' token'],
  created () {
    this.getFile()
  },
  methods: {
    uploadFile () {
      this.isLoading = true
      const uploadedfile = document.querySelector('#customFile').files[0]
      console.dir(uploadedfile)
      const formData = new FormData()
      formData.append('file', uploadedfile)
      this.axios.post(`${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/storage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {
          this.isLoading = false
          console.log(res)
        })
        .catch(err => {
          this.isLoading = false
          console.log(err)
        })
    },
    getFile () {
      this.isLoading = true
      this.axios.get(`${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/storage`)
        .then(res => {
          this.isLoading = false
          // console.log('getFile', res)
          this.storages = res.data.data
        })
        .catch(err => {
          this.isLoading = false
          console.log(err)
        })
    },
    deleteData () {
      this.isLoading = true
      this.axios.delete(`${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/storage/${this.tempData.id}`)
        .then(res => {
          console.log('成功刪除')
          this.isLoading = false
          $('#deleteModal').modal('hide')
          this.getFile()
        })
        .catch(err => {
          console.log('刪除失敗', err)
          this.isLoading = false
          $('#deleteModal').modal('hide')
        })
    },
    openModel (item) {
      $('#deleteModal').modal('show')
      this.tempData = { ...item }
    }
  }
}
</script>
