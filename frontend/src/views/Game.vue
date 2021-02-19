<template lang="pug">
  div
    .col-md-5.mx-auto(v-if="game.status == 'before'")
      .card
        form.p-3
          h1.text-center Start to game
          .alert.alert-danger.text-center(v-if="backendError") {{backendError}}
          .mb-3
            label.form-label Select a category
            select.form-select(v-model="form.category")
              option(v-for="(c, index) in categories" :key="index" :value="c.code") {{c.name}}
          .d-grid.gap-2
            button.btn.btn-primary(@click.prevent="startGame" :disabled="form.buttonDisable") START THE GAME
    .col-md-8.mx-auto(v-else-if="game.status=='active'")
      .card
        .card-header # {{game.lastIndex+1}}. Question ({{questions.length - game.lastIndex-1}} left)
        .card-body
          .alert.alert-danger.text-center(v-if="game.gameError") {{game.gameError}}
          h5.card-title(v-html="questions[game.lastIndex].question")
          ul.list-group.p-2
            li.list-group-item(:class="{'active' : game.selectedOption == index}" v-for="(a, index) in questions[game.lastIndex].answers" :key="index" v-html="a" @click.prevent="setOption(index)")
          button.btn.btn-primary(@click.prevent="nextQuestion" :disabled="game.selectedOption < 0") Next
    .col-md-5.mx-auto(v-else)
      .card.text-white.bg-primary.mb-3
        .card-header SCORE : {{game.gameScore}}
        .card-body
          h5.card-title {{scoreMessages()}}
          button.btn.btn-primary(@click.prevent="newGame") NEW GAME
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      form: {
        category: 9,
        buttonDisable: false
      },
      game: {
        status: 'before',
        lastIndex: 0,
        answers: [],
        selectedOption: -1,
        gameError: null,
        gameScore: null
      },
      backendError: null,
      categories: [
        {
          name: 'General Knowledge',
          code: '9'
        },
        {
          name: 'Entertainment: Books',
          code: '10'
        },
        {
          name: 'Entertainment: Film',
          code: '11'
        },
        {
          name: 'Entertainment: Music',
          code: '12'
        },
        {
          name: 'Entertainment: Television',
          code: '14'
        },
        {
          name: 'Entertainment: Video Games',
          code: '15'
        },
        {
          name: 'Entertainment: Comics',
          code: '29'
        },
        {
          name: 'Entertainment: Japanese Anime & Manga',
          code: '31'
        },
        {
          name: 'Entertainment: Cartoon & Animations',
          code: '32'
        },
        {
          name: 'Science & Nature',
          code: '17'
        },
        {
          name: 'Science: Computers',
          code: '18'
        },
        {
          name: 'Mythology',
          code: '20'
        },
        {
          name: 'Sports',
          code: '21'
        },
        {
          name: 'Geography',
          code: '22'
        },
        {
          name: 'History',
          code: '23'
        },
        {
          name: 'Politics',
          code: '24'
        },
        {
          name: 'Celebrities',
          code: '26'
        },
        {
          name: 'Animals',
          code: '27'
        },
        {
          name: 'Vehicles',
          code: '28'
        }
      ]
    }
  },
  methods: {
    ...mapActions('quiz', ['fetchQuestions', 'saveQuiz']),
    async startGame() {
      try {
        this.form.buttonDisable = true
        this.backendError = null
        await this.fetchQuestions(this.form.category)
        this.game.status = 'active'
        this.game.gameScore = null
      } catch (error) {
        this.backendError = error.response.data.message
        this.form.buttonDisable = false
      }
    },
    nextQuestion() {
      this.gameError = null
      if(this.game.selectedOption > -1) {
        this.game.answers.push({
          questionIndex: this.game.lastIndex,
          answer: this.questions[this.game.lastIndex].answers[this.game.selectedOption]
        })
        this.game.selectedOption = -1
        this.game.lastIndex != 19 ? this.game.lastIndex++ : this.finishGame() 
      } else {
        this.game.gameError = 'Please select an option'
      }
    },
    setOption(i) {
      this.game.selectedOption = i
    },
    finishGame() {
      this.game.status = 'after'
      for (let i = 0; i < this.game.answers.length; i++) {
        this.game.answers[i].answer === this.questions[i].correct_answer ? this.game.gameScore+=5 : undefined
      }
      this.saveQuiz({
        category: this.questions[0].category,
        score: this.game.gameScore
      })
    },
    newGame() {
      this.form.buttonDisable = false
      this.game.status = 'before'
      this.game.answers = []
      this.game.lastIndex = 0
    },
    scoreMessages() {
      let obj = ''
      if (this.game.gameScore <= 33) {
        obj = 'It looks pretty awful :('
      } else if (this.game.gameScore >= 66) {
        obj = 'you can do better :/'
      } else {
        obj = '	that\'s what you like :)'
      }
      return obj
    }
  },
  computed: {
    ...mapState('quiz', ['questions'])
  },
  beforeRouteLeave(to, from, next) {
    if (this.game.status == 'active') {
      if (confirm("Your exam is not over yet, Are you sure want to go other page?")) {
        next();
      } else {
        next(false)
      }
    } else {
      next();
    }
  },
}
</script>