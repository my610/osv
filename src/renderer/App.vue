<template>
  <div id="app">
    <app-aside></app-aside>
    <div class="content">
      <transition name="switch" mode="out-in">
        <router-view></router-view>
      </transition>
      <p class="text-right text-muted"><small>Copyright: alexey-m, 2017</small></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'osv'
  }
</script>

<style>
  @import "~bootstrap/dist/css/bootstrap.css";

  .content {
    margin: 10px 25px 25px 85px;
  }
</style>
