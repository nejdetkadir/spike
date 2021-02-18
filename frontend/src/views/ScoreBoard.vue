<template lang="pug">
  .table-responsive
    table.table
      thead
        tr
          th(scope='col') #
          th(scope='col') Name
          th(scope='col') Category
          th(scope='col') Score
          th(scope='col') Date
      tbody
        tr(v-for="(s, index) in scoreBoard" :key="index")
          th(scope='row') {{index+1}}
          td {{s.user.name}}
          td {{s.category}}
          td {{s.score}}
          td {{ moment(s.createdAt).fromNow() }}
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from "moment"

export default {
  data() {
    return {
      moment
    }
  },
  methods: {
    ...mapActions('quiz', ['fetchScoreBoard'])
  },
  computed: {
    ...mapState('quiz', ['scoreBoard'])
  },
  created() {
    this.fetchScoreBoard()
  }
}
</script>