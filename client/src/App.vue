<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'App',
  created() {
    if (localStorage.getItem('token')) {
      this.$store.commit('SET_LOGIN');
      this.$store.dispatch('getUserData')
      .then((response) => {
          this.$store.commit('SET_USER', response.data);
      })
      .catch((err) => {
          console.log(err);
          this.danger(err.response.data.message);
      });
    }
  },
  components: {
    NavBar,
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
