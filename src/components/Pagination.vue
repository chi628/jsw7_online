<template>
    <div class="pagination">
        <a href="#">&laquo;</a>
        <a href="#" v-for="item in pages.total_pages" :key="item" @click.prevent="updatePage(item)">{{item}}</a>
        <a href="#">&raquo;</a>
    </div>
</template>
<style>
     .pagination {
        display: flex;
        align-items: center;
        justify-content:center;
    }
    .pagination a {
      text-decoration: none;
      font-size: 18px;
      font-family: 'Bree Serif', serif;
      color: #915957;
      letter-spacing: 8px;
    }
</style>
<script>
export default {
  data () {
    return {

    }
  },
  props: ['pages'],
  methods: {
    updatePage (num) {
    //   console.log('內層要觸發換頁', num)
      this.$emit('updatepage', num)
    }
  }
}
</script>
