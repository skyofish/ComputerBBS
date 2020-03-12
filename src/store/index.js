import Vue from 'vue';
import Vuex from 'vuex';
import api from '../server/api'
import {setItem, getItem} from "../../utils/localStorage";

Vue.use(Vuex);

const state = {     // 全局管理的数据存储
  isLogin:false,
  // token:getItem('token') ? getItem('token'):'',   // token
};

const store = new Vuex.Store({
  state: {
    userInfo: {
      username: getItem('username'),
    },
  },
  getters: {
    // getStorage(state){   // 获取本地存储的登录信息
    //   if(!state.token){
    //     state.token =JSON.parse(localStorage.getItem(key))
    //   }
    //   return state.token
    // },
  },
  mutations: {
    // setLoginState(state, value) {
    //   state.isLogin = value
    // },
    setUserInfo(state, data) {
      const {type, value} = data;
      setItem(type, value);
      state.userInfo[type] = value;
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
    }
  },
});

export default store;
