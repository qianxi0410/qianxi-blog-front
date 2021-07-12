import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    alias: '/posts',
    redirect: 'posts',
    component: Home,
    children: [
      {
        path: 'posts',
        name: 'Posts',
        component: () =>
          import(/* webpackChunkName: "posts" */ '../views/Posts.vue')
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
          import(/* webpackChunkName: "timeline" */ '../views/TimeLine.vue')
      },
      {
        path: '/post/:postName',
        name: 'PostDetail',
        component: () =>
          import(/* webpackChunkName: "PostDetail" */ '../views/PostDetail.vue')
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
