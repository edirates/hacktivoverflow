<template>
    <b-navbar fixed-top shadow>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img src="../assets/so-logo.png" alt="nav-logo">
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div v-if="$store.state.isLogin === false" class="buttons">
                    <router-link to="/signin" class="button is-white">
                        Log in
                    </router-link>
                    <router-link to="/signup"  class="button is-info">
                        <strong>Sign up</strong>
                    </router-link>
                </div>
                <div v-if="$store.state.isLogin === true" class="buttons">
                    <button @click.prevent="signOut" class="button is-warning">
                        Log out
                    </button>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    signOut() {
      localStorage.removeItem('token');
      this.$store.commit('SET_LOGOUT');
      this.success('Logout successfully');
      this.$router.push('/');
    },
    success(message) {
      this.$buefy.toast.open({
        duration: 1500,
        message,
        position: 'is-top',
        type: 'is-success',
      });
    },
    danger(message) {
      this.$buefy.toast.open({
        duration: 2000,
        message,
        position: 'is-top',
        type: 'is-danger',
      });
    },
  },
};
</script>

<style scoped>

</style>
