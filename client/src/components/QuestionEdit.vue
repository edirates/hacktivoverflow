<template>
    <div>
        <div class="header" style="display:flex; justify-content:space-between; align-items:center; text-align:left; margin-bottom:30px;">
            <h1 style="font-size:32px; font-weight:strong;">Edit your question</h1>
        </div>
        <form @submit.prevent="editQuestion" method="post" style="text-align:left;">
            <section>
                <b-field label="Title">
                    <b-input v-model="title" placeholder="Title" type="search" icon="subtitles"></b-input>
                </b-field>
                <b-field label="Body">
                    <quillEditor v-model="description"></quillEditor>
                </b-field>
                <b-field label="Tags">
                    <b-taginput v-model="tags" ellipsis icon="label" placeholder="Tags" type="is-primary"></b-taginput>
                </b-field>
                <b-button native-type="submit" type="is-info" style="margin-top:10px; margin-right:10px;">
                    <i class="fas fa-paste" style="margin-right:10px;"></i>
                    Save edits
                </b-button>
                <b-button @click.prevent="$router.back()" type="is-danger" style="margin-top:10px;">
                    <i class="fas fa-eject" style="margin-right:10px;"></i>
                    Cancel
                </b-button>
            </section>
        </form>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';

export default {
  name: 'QuestionEdit',
  data: () => ({
    title: '',
    description: '',
    tags: [],
  }),
  methods: {
    getQuestionDetail() {
      this.$store.dispatch('getQuestionDetail', this.$route.params.id)
        .then((response) => {
          this.title = response.data.title;
          this.description = response.data.description;
          this.tags = response.data.tags;
        })
        .catch((err) => {
          console.log(err);
          this.danger(err.response.data.message);
        });
    },
    editQuestion() {
      this.$store.dispatch('editQuestion', {
        title: this.title,
        description: this.description,
        tags: this.tags,
        QuestionId: this.$route.params.id,
      })
        .then((response) => {
          this.success('Question edited successfully');
          this.$router.back();
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
