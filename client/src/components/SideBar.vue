<template>
    <b-menu>
        <b-menu-list label="Public">
            <b-menu-item icon="earth" label="Stack Overflow" @click.prevent="$router.push('/')"></b-menu-item>
            <b-menu-item icon="account" label="My Questions" @click.prevent="$router.push('/my-questions')"></b-menu-item>
            <!-- <b-menu-item icon="label" label="Watched Tag" @click.prevent="$router.push('/watchedtags')"></b-menu-item> -->
        </b-menu-list>
    </b-menu>
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
