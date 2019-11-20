<template>
    <div>
        <div class="header" style="display:flex; justify-content:space-between; align-items:center; text-align:left; margin-bottom:30px;">
            <h1 style="font-size:32px; font-weight:strong;">My Questions</h1>
            <b-button @click.prevent="$router.push('/add-question')" type="is-info">Ask Question</b-button>
        </div>
        <div v-if="$store.state.my_questions.length === 0">
            <img src="../assets/not_found.jpg" style="max-width:400px;" alt="empty">
            <h1 style="font-size:32px; font-weight:strong;">Ask a question first</h1>
        </div>
        <div v-else>
          <article class="media" v-for="question in $store.state.my_questions" :key="question._id">
              <figure class="media-left" style="text-align:center; color:grey;">
                  <div><b> {{ question.upvotes.length - question.downvotes.length }} </b></div>
                  <div><small> votes </small></div>
                  <div><b> {{ question.answers.length }} </b></div>
                  <div><small> answers </small></div>
              </figure>
              <div class="media-content">
                  <div class="content">
                      <a @click.prevent="$router.push(`/question/detail/${question._id}`)" style="font-size:18px;" ><strong> {{ question.title }} </strong></a>
                      <br>
                      <div v-html="question.description" class="content"></div>
                      <br>
                      <div style="display:flex; justify-content:space-between;">
                          <div>
                              <div>
                                  <b-tag v-for="(tag, index) in question.tags" :key="index" type="is-info" style="margin-right:5px;"> {{ tag }} </b-tag>
                              </div>
                              <div style="margin-top:20px;">
                                  <small>
                                      <a @click.prevent="$router.push(`/edit-question/${question._id}`)" style="color:grey; font-weight:bold; margin-right:20px;">edit</a>
                                      <a @click.prevent="deleteQuestion(question._id)" style="color:grey; font-weight:bold; margin-right:20px;">delete</a>
                                  </small>
                              </div>
                          </div>
                          <div>
                              <small>
                                  asked {{ formatDate(question.createdAt) }} <br/>
                                  by <b> {{ $store.state.user.name }} </b>
                              </small>
                          </div>
                      </div>
                  </div>
              </div>
          </article>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'MyQuestions',
  data: () => ({

  }),
  methods: {
    getMyQuestions() {
      this.$store.dispatch('getMyQuestions')
        .then((response) => {
          this.$store.commit('SET_MY_QUESTIONS', response.data);
        })
        .catch((err) => {
          console.log(err);
          this.danger(err.response.data.message);
        });
    },
    deleteQuestion(id) {
      this.$buefy.dialog.confirm({
        title: 'Deleting question',
        message: 'Are you sure you want to <b>delete</b> your question? This action cannot be undone.',
        confirmText: 'Delete Question',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch('deleteQuestion', id)
            .then((response) => {
              this.success(response.data.message);
              this.getMyQuestions();
            })
            .catch((err) => {
              console.log(err);
              this.danger(err.response.data.message);
            });
        },
      });
    },
    formatDate(date) {
      return moment(new Date(date)).fromNow();
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
  created() {
    this.getMyQuestions();
  },
};
</script>

<style>

</style>
