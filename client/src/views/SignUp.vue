<template>
    <div style="display:flex; justify-content:center; margin-top:50px;">
        <div class="column is-one-third" style="border:solid 1px whitesmoke; border-radius:10px;">
            <form @submit.prevent="signUp" style="padding:20px;">
                <img src="../assets/favicon.png" alt="nav-logo" style="width:50px; margin-bottom:50px;">
                <b-field label="Display Name" style="text-align:left;">
                    <b-input v-model="name" type="text" placeholder="Your name" icon="account" minlength="3" maxlength="30"></b-input>
                </b-field>
                <b-field label="Email" style="text-align:left;">
                    <b-input v-model="email" type="email" placeholder="Email address" icon="email" minlength="5" maxlength="50"></b-input>
                </b-field>
                <b-field label="Password" style="text-align:left;">
                    <b-input v-model="password" type="password" placeholder="Password" icon="lock" minlength="8" maxlength="30"></b-input>
                </b-field>
                <b-button native-type="submit" type="is-info" style="width:100%">Login</b-button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SignUp',
  data: () => ({
    name: '',
    email: '',
    password: '',
  }),
  methods: {
    signUp() {
      this.$store.dispatch('signUp', {
        name: this.name,
        email: this.email,
        password: this.password,
      })
        .then((response) => {
          localStorage.setItem('token', response.data.jwt_token);
          this.$store.commit('SET_USER', response.data.user_data);
          this.$store.commit('SET_LOGIN');
          this.$router.push('/');
          this.success('Sign up successfully');
        })
        .catch((err) => {
          console.log(err);
          this.danger(err.response.data.message);
        });
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
      if (Array.isArray(message)) {
        message = message.join(', ');
      }
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

<style>

</style>
