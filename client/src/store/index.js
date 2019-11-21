import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/apis/axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {},
    questions: [],
    my_questions: [],
    question_detail: {},
    answer_detail: {},
  },
  mutations: {
    SET_LOGIN(state) {
      state.isLogin = true;
    },
    SET_LOGOUT(state) {
      state.isLogin = false;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_QUESTIONS(state, payload) {
      state.questions = payload;
    },
    SET_MY_QUESTIONS(state, payload) {
      state.my_questions = payload;
    },
    SET_QUESTION_DETAIL(state, payload) {
      state.question_detail = payload;
    },
    SET_ANSWER_DETAIL(state, payload) {
      state.answer_detail = payload;
    },
  },
  actions: {
    signUp(context, payload) {
      return axios({
        method: 'POST',
        url: '/users/signup',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password,
        },
      });
    },
    login(context, payload) {
      return axios({
        method: 'POST',
        url: '/users/signin',
        data: {
          email: payload.email,
          password: payload.password,
        },
      });
    },
    glogin(context, payload) {
      return axios({
        method: 'POST',
        url: '/users/gsignin',
        data: {
          idToken: payload.idToken
        },
      });
    },
    getUserData(context) {
      return axios({
        method: 'GET',
        url: '/users',
        headers: {
          jwt_token: localStorage.getItem('token'),
        },
      });
    },
    getQuestions(context) {
      return axios({
        method: 'GET',
        url: '/questions',
      });
    },
    getMyQuestions(context) {
      return axios({
        method: 'GET',
        url: '/questions/user',
        headers: {
          jwt_token: localStorage.getItem('token'),
        },
      });
    },
    getQuestionDetail(context, payload) {
      return axios({
        method: 'GET',
        url: `/questions/${payload}`,
        headers: {
          jwt_token: localStorage.getItem('token'),
        },
      });
    },
    viewQuestion(context, payload) {
      return axios({
        method: 'PATCH',
        url: `/questions/view/${payload}`,
        headers: {
          jwt_token: localStorage.getItem('token'),
        },
      });
    },
    addQuestion(context, payload) {
      return axios({
        method: 'POST',
        url: '/questions',
        data: {
          title: payload.title,
          description: payload.description,
          tags: payload.tags,
        },
        headers: {
          jwt_token: localStorage.getItem('token'),
        },
      });
    },
    editQuestion(context, payload) {
      return axios({
        method: 'PUT',
        url: `/questions/${payload.QuestionId}`,
        data: {
          title: payload.title,
          description: payload.description,
          tags: payload.tags,
        },
        headers: {
          jwt_token: localStorage.getItem('token'),
        },
      });
    },
    deleteQuestion(context, payload) {
      return axios({
        method: 'DELETE',
        url: `/questions/${payload}`,
        headers: {
          jwt_token: localStorage.getItem('token'),
        },
      });
    },
    addSolution(context, payload) {
      return axios({
        method: 'PATCH',
        url: `/questions/solution/${payload.questionId}`,
        data: {
          AnswerId: payload.answerId,
        },
        headers: {
          jwt_token: localStorage.getItem('token'),
        },
      });
    },
    upvoteQuestion(context, payload) {
      return axios({
        method: 'PATCH',
        url: `/questions/upvote/${payload}`,
        headers: {
          jwt_token: localStorage.getItem('token'),
        },
      });
    },
    downvoteQuestion(context, payload) {
      return axios({
        method: 'PATCH',
        url: `/questions/downvote/${payload}`,
        headers: {
          jwt_token: localStorage.getItem('token'),
        },
      });
    },
    getAnswerDetail(context, payload) {
      return axios({
        method: 'GET',
        url: `/answers/${payload}`,
        headers: {
          jwt_token: localStorage.getItem('token'),
        },
      });
    },
    addAnswer(context, payload) {
      return axios({
        method: 'POST',
        url: '/answers',
        data: {
          QuestionId: payload.QuestionId,
          description: payload.description,
        },
        headers: {
          jwt_token: localStorage.getItem('token'),
        },
      });
    },
    editAnswer(context, payload) {
      return axios({
        method: 'PUT',
        url: `/answers/${payload.AnswerId}`,
        data: {
          description: payload.description,
        },
        headers: {
          jwt_token: localStorage.getItem('token'),
        },
      });
    },
    deleteAnswer(context, payload) {
      return axios({
        method: 'DELETE',
        url: `/answers/${payload}`,
        headers: {
          jwt_token: localStorage.getItem('token'),
        },
      });
    },
    upvoteAnswer(context, payload) {
      return axios({
        method: 'PATCH',
        url: `/answers/upvote/${payload}`,
        headers: {
          jwt_token: localStorage.getItem('token'),
        },
      });
    },
    downvoteAnswer(context, payload) {
      return axios({
        method: 'PATCH',
        url: `/answers/downvote/${payload}`,
        headers: {
          jwt_token: localStorage.getItem('token'),
        },
      });
    },
  },
  modules: {
  },
});
