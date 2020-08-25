<template>
    <div class="bread">
         <ul class="breadcrumb">
            <li><router-link to="/home" class="bread_tag">Home</router-link></li>
            <li><router-link to="/products" class="bread_tag">MakeUp</router-link></li>
            <li><router-link to="/products" class="bread_tag">Now</router-link></li>
        </ul>
    </div>
</template>
<style >
.bread{
    width: 200px;
    margin-top: 15px;
    margin-left: 100px;
    /* border: 1px solid blue; */
}
.breadcrumb{
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
}
.breadcrumb li{
    padding: 0 20px;
}
.breadcrumb li:last-child a{
    color: #B5838D;
}
.bread_tag{
    text-decoration: none;
    color: #6d6875;
    font-size: 14px;
    font-family: 'Lemonada', cursive;
}
.breadcrumb li + li{
    padding-left: 0;
}
.breadcrumb li + li::before{
    content: '>';
    margin-right: 20px;
}
</style>
