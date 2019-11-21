import VueQuillEditor from 'vue-quill-editor';
import GSignInButton from 'vue-google-signin-button';
import Vue from 'vue';
import Buefy from 'buefy';
import App from './App.vue';
import router from './router';
import store from './store';
import 'buefy/dist/buefy.css';

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

Vue.use(Buefy);
Vue.use(VueQuillEditor /* { default global options } */);
Vue.use(GSignInButton);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
