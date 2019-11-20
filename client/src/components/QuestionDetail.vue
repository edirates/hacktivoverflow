<template>
    <div>
        <div class="header" style="display:flex; justify-content:space-between; text-align:left; margin-bottom:10px; padding-bottom:10px; border-bottom:2px solid whitesmoke;">
            <div>
                <h1 style="font-size:32px; font-weight:strong;">{{ $store.state.question_detail.title }}</h1>
                <small>asked {{ formatDate($store.state.question_detail.createdAt) }}</small>
            </div>
            <div>
                <b-button @click.prevent="$router.push('/add-question')" type="is-info">Ask Question</b-button>
            </div>
        </div>
        <article class="media">
            <figure class="media-left" style="font-size:20px; text-align:center; color:grey; padding:10px;">
                <i @click="upvoteQuestion($store.state.question_detail._id)" class="fas fa-caret-up fa-3x" style="cursor:pointer"></i>
                <div><b> {{ $store.state.question_detail.upvotes.length - $store.state.question_detail.downvotes.length }} </b></div>
                <i @click="downvoteQuestion($store.state.question_detail._id)" class="fas fa-caret-down fa-3x" style="cursor:pointer"></i>
            </figure>
            <div class="media-content">
                <div class="content">
                    <div v-html="$store.state.question_detail.description" class="content"></div>
                    <br>
                    <div style="display:flex; justify-content:space-between;">
                        <div>
                            <b-tag v-for="(tag, index) in $store.state.question_detail.tags" :key="index" type="is-info" style="margin-right:5px;"> {{ tag }} </b-tag>
                        </div>
                        <div>
                            <small>
                                asked {{ formatDate($store.state.question_detail.createdAt) }} <br/>
                                by <b> {{ $store.state.question_detail.UserId.name }} </b>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        <!-- Answers -->
        <div v-if="$store.state.question_detail.answers.length > 0" class="header" style="text-align:left; margin-bottom:10px; padding-bottom:10px; border-bottom:2px solid whitesmoke;">
            <h1 style="font-size:24px; font-weight:strong;">{{ $store.state.question_detail.answers.length }} answers</h1>
        </div>
        <article v-for="answer in $store.state.question_detail.answers" :key="answer._id" class="media">
            <figure class="media-left" style="font-size:20px; text-align:center; color:grey; padding:10px;">
                <i @click="upvoteAnswer(answer._id)" class="fas fa-caret-up fa-3x" style="cursor:pointer"></i>
                <div><b> {{ answer.upvotes.length - answer.downvotes.length }} </b></div>
                <i @click="downvoteAnswer(answer._id)" class="fas fa-caret-down fa-3x" style="cursor:pointer"></i><br/>
                <i v-if="$store.state.question_detail.solution === answer._id" @click="addSolution($store.state.question_detail._id, answer._id)" class="fas fa-check fa-2x" style="cursor:pointer; color:ForestGreen;"></i>
                <i v-else @click="addSolution($store.state.question_detail._id, answer._id)" class="fas fa-check fa-2x" style="cursor:pointer;"></i>
            </figure>
            <div class="media-content">
                <div class="content">
                    <div v-html="answer.description" class="content"></div>
                    <br>
                    <div style="display:flex; justify-content:space-between;">
                        <div>
                            <div v-if="answer.UserId._id === $store.state.user._id">
                                <small>
                                    <a @click.prevent="$router.push(`/edit-answer/${answer._id}`)" style="color:grey; font-weight:bold; margin-right:20px;">edit</a>
                                    <a @click.prevent="deleteAnswer(answer._id)" style="color:grey; font-weight:bold; margin-right:20px;">delete</a>
                                </small>
                            </div>
                        </div>
                        <div>
                            <small>
                                answered {{ formatDate(answer.createdAt) }} <br/>
                                by <b> {{ answer.UserId.name }} </b>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        <article class="media">
            <div class="media-content">
                <form @submit.prevent="addAnswer($store.state.question_detail._id)" method="post" style="text-align:left;">
                <section>
                    <b-field label="Your Answer">
                        <quillEditor v-model="description"></quillEditor>
                    </b-field>
                    <b-button native-type="submit" type="is-info" style="margin-top:10px; margin-right:10px;">
                        <i class="fas fa-paste" style="margin-right:10px;"></i>
                        Post Your Answer
                    </b-button>
                    <b-button @click.prevent="$router.back()" type="is-danger" style="margin-top:10px;">
                        <i class="fas fa-eject" style="margin-right:10px;"></i>
                        Cancel
                    </b-button>
                </section>
            </form>
            </div>
        </article>
    </div>
</template>

<script>
import moment from 'moment';
import { quillEditor } from 'vue-quill-editor';

export default {
  name: 'QuestionDetail',
  data: () => ({
    description: '',
  }),
  methods: {
    getQuestionDetail() {
      this.$store.dispatch('getQuestionDetail', this.$route.params.id)
        .then((response) => {
          this.$store.commit('SET_QUESTION_DETAIL', response.data);
        })
        .catch((err) => {
          console.log(err);
          this.danger(err.response.data.message);
        });
    },
    upvoteQuestion(id) {
      this.$store.dispatch('upvoteQuestion', id)
        .then((response) => {
          this.success(response.data.message);
          this.getQuestionDetail();
        })
        .catch((err) => {
          console.log(err);
          this.danger(err.response.data.message);
        });
    },
    downvoteQuestion(id) {
      this.$store.dispatch('downvoteQuestion', id)
        .then((response) => {
          this.success(response.data.message);
          this.getQuestionDetail();
        })
        .catch((err) => {
          console.log(err);
          this.danger(err.response.data.message);
        });
    },
    upvoteAnswer(id) {
      this.$store.dispatch('upvoteAnswer', id)
        .then((response) => {
          this.success(response.data.message);
          this.getQuestionDetail();
        })
        .catch((err) => {
          console.log(err);
          this.danger(err.response.data.message);
        });
    },
    downvoteAnswer(id) {
      this.$store.dispatch('downvoteAnswer', id)
        .then((response) => {
          this.success(response.data.message);
          this.getQuestionDetail();
        })
        .catch((err) => {
          console.log(err);
          this.danger(err.response.data.message);
        });
    },
    addSolution(questionId, answerId) {
      this.$store.dispatch('addSolution', {
        questionId,
        answerId,
      })
        .then((response) => {
          this.success(response.data.message);
          this.getQuestionDetail();
        })
        .catch((err) => {
          console.log(err);
          this.danger(err.response.data.message);
        });
    },
    addAnswer(questionId) {
      this.$store.dispatch('addAnswer', {
        QuestionId: questionId,
        description: this.description,
      })
        .then((response) => {
          this.success('Answer posted successfully');
          this.getQuestionDetail();
        })
        .catch((err) => {
          console.log(err);
          this.danger(err.response.data.message);
        });
    },
    deleteAnswer(id) {
      this.$buefy.dialog.confirm({
        title: 'Deleting answer',
        message: 'Are you sure you want to <b>delete</b> your answer? This action cannot be undone.',
        confirmText: 'Delete Answer',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch('deleteAnswer', id)
            .then((response) => {
              this.success(response.data.message);
              this.getQuestionDetail();
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
    this.getQuestionDetail();
  },
  components: {
    quillEditor,
  },
};
</script>

<style lang="scss" scoped>
    .quill-editor, .quill-code {
        height: 13rem;
        margin-bottom: 100px;
    }
    .quill-editor {
        border: 1px solid #ccc;
        border-bottom: none;
    }
    .quill-code {
        border: none;
        height: auto;
        > code {
            width: 100%;
            margin: 0;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 0;
            height: 10rem;
            overflow-y: auto;
        }
    }
</style>
