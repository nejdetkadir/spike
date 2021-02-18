import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/users/SignIn'
import SignUp from '../views/users/SignUp'
import Game from '../views/Game'
import ScoreBoard from '../views/ScoreBoard'

Vue.use(VueRouter)

export default function init(store) {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter(to, from, next) {
          if (store.state.account.user) return next('/game')
          return next()
        }
      },
      {
        path: '/users/sign_in',
        name: 'signin',
        component: SignIn,
        beforeEnter(to, from, next) {
          if (store.state.account.user) return next('/game')
          return next()
        }
      },
      {
        path: '/users/sign_up',
        name: 'signup',
        component: SignUp,
        beforeEnter(to, from, next) {
          if (store.state.account.user) return next('/game')
          return next()
        }
      },
      {
        path: '/game',
        name: 'game',
        component: Game,
        beforeEnter(to, from, next) {
          if (!store.state.account.user) return next('/users/sign_in?userStatus=0')
          return next()
        }
      },
      {
        path: '/score-board',
        name: 'scoreboard',
        component: ScoreBoard,
        beforeEnter(to, from, next) {
          if (!store.state.account.user) return next('/users/sign_in?userStatus=0')
          return next()
        }
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
