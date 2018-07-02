import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import HomeStandard from './views/HomeStandard.vue'
import About from './views/About.vue'
import Team from './views/Team.vue'
import LandingPage from './views/LandingPage.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Profile from './views/Profile.vue'
import OtherProfile from './views/OtherProfile.vue'
import Experiment from './views/Experiment.vue'
import EditProfile from './views/EditProfile.vue'
import NotFound from './views/NotFound.vue'
import TagResult from './views/TagResult.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingPage
    },
    {
      path: '/home',
      name: 'home',
      component: HomeStandard
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/team',
      name: 'team',
      component: Team
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      props: true
    },
    {
        path: '/user/:username',
        name: 'otherprofile',
        component: OtherProfile,
        props: true
    },
    {
        path: '/tag/:tag',
        name: 'tagresult',
        component: TagResult,
        props: true
    },
    {
        path: '/profile/editprofile',
        name: 'profile/editprofile',
        component: EditProfile,
        props: true
    },
    {
        path: '*',
        name: 'notfound',
        component: NotFound
    }
  ]
})
