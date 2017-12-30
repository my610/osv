import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'client-page',
      component: require('@/components/client').default
    },
    {
      path: '/settings',
      name: 'settings-page',
      component: require('@/components/settings').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
