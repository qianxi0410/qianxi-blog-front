import Vue from 'vue';
import Vuex from 'vuex';
import Inner from './inner';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    inner: Inner
  }
});
