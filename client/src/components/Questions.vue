<template>
    <div>
        <div class="header" style="display:flex; justify-content:space-between; align-items:center; text-align:left; margin-bottom:30px;">
            <h1 style="font-size:32px; font-weight:strong;">All Questions</h1>
            <b-button @click.prevent="$router.push('/add-question')" type="is-info">Ask Question</b-button>
        </div>
        <article class="media" v-for="question in $store.state.questions" :key="question._id">
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
                            <b-tag v-for="(tag, index) in question.tags" :key="index" type="is-info" style="margin-right:5px;"> {{ tag }} </b-tag>
                        </div>
                        <div>
                            <small>
                                asked {{ formatDate(question.createdAt) }} <br/>
                                by <b> {{ question.UserId.name }} </b>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'Questions',
    data: () => ({
        
    }),
    methods: {
        getQuestions() {
            this.$store.dispatch('getQuestions')
            .then((response) => {
                this.$store.commit('SET_QUESTIONS', response.data);
            })
            .catch((err) => {
                console.log(err);
                this.danger(err.response.data.message);
            });
        },
        formatDate(date) {
            return moment(new Date(date)).fromNow();
        },
        success(message) {
            this.$buefy.toast.open({
                duration: 1500,
                message: message,
                position: "is-top",
                type: "is-success"
            })
        },
        danger(message) {
            if (Array.isArray(message)) {
                message = message.join(", ");
            }
            this.$buefy.toast.open({
                duration: 2000,
                message: message,
                position: "is-top",
                type: "is-danger"
            })
        }
    },
    created() {
        this.getQuestions();
    }
}
</script>

<style>

</style>
