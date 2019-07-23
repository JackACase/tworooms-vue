import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import NewGame from '@/components/NewGame'
import JoinGame from '@/components/JoinGame'
import Lobby from '@/components/Lobby'
import Game from '@/components/Game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/new/',
      name: 'NewGame',
      component: NewGame
    },
    {
      path: '/join/',
      mame: 'JoinGame',
      component: JoinGame
    },
    {
      path: '/lobby/:accessCode',
      name: 'Lobby',
      component: Lobby,
      props: true
    },
    {
      path: '/game/:accessCode',
      name: 'Game',
      component: Game,
      props: true
    }
  ]
})
