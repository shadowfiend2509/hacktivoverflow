<template>
<div class="main">
  <div class='rows'>
    <div class='cols'>
      <router-link to='/'>
        Home
      </router-link>
    </div>
    <div class="cols">
      <router-link to='/rating'>Top Question</router-link>
    </div>
    <div class="cols">
      <router-link to='/profile'>Profile</router-link>
    </div>
    <div class="cols">
      <router-link to='/tags'>Tags</router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
.rows{
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgb(235, 228, 228);
  height: 44  vw
}
.cols{
  text-align: center;
  padding: 20px;
}
</style>