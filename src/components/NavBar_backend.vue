<template>
    <div class="navbar">
        <h3>後台管理</h3>
        <router-link to="/admin/products">商品列表</router-link>|
        <router-link to="/admin/coupons">優惠券列表</router-link>|
        <router-link to="/admin/storage">圖片列表</router-link>|
        <router-link to="/admin/orders">訂單列表</router-link>|
        <router-link to="/admin/customer_orders">模擬下單</router-link>
    </div>
</template>
<style>
    .navbar{
        height: 70px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;/*換行*/
        justify-content: flex-start;
        align-items: center;
    }
</style>
