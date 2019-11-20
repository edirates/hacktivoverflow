<template>
    <div>
        <div class="header" style="display:flex; justify-content:space-between; align-items:center; text-align:left; margin-bottom:30px;">
            <h1 style="font-size:32px; font-weight:strong;">Ask a public question</h1>
        </div>
        <form @submit.prevent="addQuestion" method="post" style="text-align:left;">
            <section>
                <b-field label="Title">
                    <b-input v-model="title" placeholder="Title" type="search" icon="subtitles"></b-input>
                </b-field>
                <b-field label="Body">
                    <quillEditor v-model="description"></quillEditor>
                </b-field>
                <b-field label="Tags">
                    <b-taginput v-model="tags" ellipsis icon="label" placeholder="Tags"></b-taginput>
                </b-field>
                <b-button native-type="submit" type="is-info" style="margin-top:10px; margin-right:10px;">
                    <i class="fas fa-paste" style="margin-right:10px;"></i>
                    Post Question
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
  name: 'QuestionAdd',
  data: () => ({
    title: '',
    description: '',
    tags: [],
  }),
  methods: {
    addQuestion() {
      this.$store.dispatch('addQuestion', {
        title: this.title,
        description: this.description,
        tags: this.tags,
      })
        .then((response) => {
          this.success('Question posted successfully');
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
