import Vue from 'vue';
import Vuex from 'vuex';
import api from '../server/api'
import {setItem, getItem} from "../../utils/localStorage";

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    userInfo: {

    },
  },
  getters: {
    getUserName: state => state.userInfo.username,
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data;
    }
  },
  actions: {
    async register({commit}, data) {
      const res = await api.register(data);
      return res;
    },
    async login({commit}, data) {
      const res = await api.login(data);
      return res;
    },
    async postArticle({commit}, data) {
      const res = await  api.postArticle(data);
      return res
    }
  },
});

export default store;
