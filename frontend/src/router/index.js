import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/users/SignIn'
import SignUp from '../views/users/SignUp'
import Game from '../views/Game'
import ScoreBoard from '../views/ScoreBoard'

Vue.use(VueRouter)

export default function init(store) {
  console.log(store);
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/users/sign_in',
        name: 'signin',
        component: SignIn
      },
      {
        path: '/users/sign_up',
        name: 'signup',
        component: SignUp
      },
      {
        path: '/game',
        name: 'game',
        component: Game
      },
      {
        path: '/score-board',
        name: 'scoreboard',
        component: ScoreBoard
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About')
      }
    ]
  })
}
