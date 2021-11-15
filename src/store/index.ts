import Vue from 'vue';
import Vuex from 'vuex';
import Inner from './modules/inner';
import System from './modules/system';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    inner: Inner,
    system: System
  }
});
