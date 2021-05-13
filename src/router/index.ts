import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    alias: '/index',
    component: Home,
    children: [
      {
        path: '',
        name: 'Index',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Index.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: 'timeline',
        name: 'TimeLine',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/TimeLine.vue')
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
