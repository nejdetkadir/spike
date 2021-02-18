import axios from 'axios'

const mutations = {
  SET_SCORE_BOARD: 'setScoreBoard'
}

const actions = {
  FETCH_SCORE_BOARD: 'fetchScoreBoard',
}

const quiz = {
  namespaced: true,
  state: () => ({
    scoreBoard: null
  }),
  mutations: {
    [mutations.SET_SCORE_BOARD](state, scoreBoard) {
      state.scoreBoard = scoreBoard
    }
  },
  actions: {
    async [actions.FETCH_SCORE_BOARD]({commit}) {
      const scoreBoard = await axios.get('/quiz/score-board')
      commit(mutations.SET_SCORE_BOARD, scoreBoard.data)
    },
  }
}

export default quiz