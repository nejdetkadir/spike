import axios from 'axios'

const mutations = {
  SET_SCORE_BOARD: 'setScoreBoard',
  SET_QUESTIONS: 'setQuestions'
}

const actions = {
  FETCH_SCORE_BOARD: 'fetchScoreBoard',
  FETCH_QUESTIONS: 'fetchQuestions',
  SAVE_QUIZ: 'saveQuiz'
}

const quiz = {
  namespaced: true,
  state: () => ({
    scoreBoard: null,
    questions: null
  }),
  mutations: {
    [mutations.SET_SCORE_BOARD](state, scoreBoard) {
      state.scoreBoard = scoreBoard
    },
    [mutations.SET_QUESTIONS](state, questions) {
      state.questions = questions
    },
  },
  actions: {
    async [actions.FETCH_SCORE_BOARD]({commit}) {
      const scoreBoard = await axios.get('/quiz/score-board')
      commit(mutations.SET_SCORE_BOARD, scoreBoard.data)
    },
    async [actions.FETCH_QUESTIONS]({commit}, code) {
      const questions = await axios.get(`/quiz/questions/${code}`)
      let tempArr = []
      for (let i = 0; i < questions.data.results.length; i++) {
        tempArr.push({
          category: questions.data.results[i].category,
          question: questions.data.results[i].question,
          answers: shuffle([
            ...questions.data.results[i].incorrect_answers,
            questions.data.results[i].correct_answer
          ]),
          correct_answer: questions.data.results[i].correct_answer
        })
      }
      commit(mutations.SET_QUESTIONS, tempArr)
    },
    async [actions.SAVE_QUIZ](state, data) {
      await axios.post('/quiz', data)
    },
  }
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default quiz