<template>
  <div>
    <div v-if="$store.state.isLogin === false">
      <img src="../assets/background.png" alt="home-logo" style="background-size:cover; background-position:center; background-repeat:no-repeat; width:100%; max-height:660px;">
    </div>
    <div v-else class="column" style="display:flex;">
      <div class="column is-one-fifth" style="text-align:left; border-right:2px solid whitesmoke; height:100vh;">
        <SideBar></SideBar>
      </div>
      <div class="column is-four-fifths">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';

export default {
  name: 'home',
  components: {
    SideBar,
  }
};
</script>
