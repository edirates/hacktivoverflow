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
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "questions" */ '../components/Questions.vue'),
      },
      {
        path: '/my-questions',
        name: 'my-questions',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "questions" */ '../components/MyQuestions.vue'),
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token')) next();
          else next('/signin');
        },
      },
      {
        path: '/question/detail/:id',
        name: 'detail-question',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "detail-question" */ '../components/QuestionDetail.vue'),
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token')) next();
          else next('/signin');
        },
      },
      {
        path: '/add-question',
        name: 'add-question',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "add-question" */ '../components/QuestionAdd.vue'),
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token')) next();
          else next('/signin');
        },
      },
      {
        path: '/edit-question/:id',
        name: 'edit-question',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "edit-answer" */ '../components/QuestionEdit.vue'),
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token')) next();
          else next('/signin');
        },
      },
      {
        path: '/edit-answer/:id',
        name: 'edit-answer',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
