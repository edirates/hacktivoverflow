import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'questions',
        component: () => import(/* webpackChunkName: "questions" */ '../components/Questions.vue'),
      },
      {
        path: '/my-questions',
        name: 'my-questions',
        component: () => import(/* webpackChunkName: "questions" */ '../components/MyQuestions.vue'),
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token')) next();
          else next('/signin');
        },
      },
      // {
      //   path: '/watched-tags',
      //   name: 'watched-tags',
      //   component: () => import(/* webpackChunkName: "watched-tags" */ '../components/WatchedTags.vue'),
      //   beforeEnter: (to, from, next) => {
      //     if (localStorage.getItem('token')) next();
      //     else next('/signin');
      //   },
      // },
      {
        path: '/question/detail/:id',
        name: 'detail-question',
        component: () => import(/* webpackChunkName: "detail-question" */ '../components/QuestionDetail.vue'),
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token')) next();
          else next('/signin');
        },
      },
      {
        path: '/add-question',
        name: 'add-question',
        component: () => import(/* webpackChunkName: "add-question" */ '../components/QuestionAdd.vue'),
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token')) next();
          else next('/signin');
        },
      },
      {
        path: '/edit-question/:id',
        name: 'edit-question',
        component: () => import(/* webpackChunkName: "edit-answer" */ '../components/QuestionEdit.vue'),
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token')) next();
          else next('/signin');
        },
      },
      {
        path: '/edit-answer/:id',
        name: 'edit-answer',
        component: () => import(/* webpackChunkName: "edit-answer" */ '../components/AnswerEdit.vue'),
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token')) next();
          else next('/signin');
        },
      },
    ],
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
