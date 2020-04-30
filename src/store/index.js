import Vue from 'vue';
import Vuex from 'vuex';
import api from '../server/api'
import {setItem, getItem} from "../../utils/localStorage";

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    userInfo: {

    },
    blockName: '',
    articleId: ''
  },
  getters: {
    getUserName: state => state.userInfo.username,
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data;
    },
    setBlockName(state, data) {
      state.blockName = data;
    },
    setArticleId(state, data) {
      state.articleId = data;
    },
    setUpload(state, data) {
      state.userInfo.point = state.userInfo.point + 20
      state.userInfo.exp = state.userInfo.exp + 10
    },
    setDownload(state, data) {
      state.userInfo.point = state.userInfo.point - data
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
    },
    async updatePersonalInfo({commit}, data) {
      const res = await api.updatePersonalInfo(data)
      return res
    },
    async getArticleList({commit}, data) {
      const res = await api.getArticleList(data)
      return res
    },
    async getBlockList({commit}) {
      const res = await api.getBlockList()
      return res
    },
    async getAnnouncement({commit}) {
      const res = await api.getAnnouncement()
      return res
    },
    async makeAnnouncement({commit}, data) {
      const res = await api.makeAnnouncement(data)
      return res
    },
    async getResourceList({commit}, data) {
      const res = await api.getResource(data)
      return res
    },
    async getArticleDetail({commit}, data) {
      const res = await api.getArticleDetail(data)
      return  res
    },
    async comment({commit}, data) {
      const res = await api.comment(data)
      return res
    },
    async uploadFile({commit}, data) {
      const res = await api.uploadFile(data)
      return res
    },
    async downloadFile({commit}, data) {
      const res = await api.downloadFile(data)
      return res
    },
    async like({commit}, data) {
      const res = await api.like(data)
      return res
    },
    async articleElite({commit}, data) {
      const res = await api.articleElite(data)
      return res
    },
    async articleTop({commit}, data) {
      const res = await api.articleTop(data)
      return res
    },
    async articleRemove({commit}, data) {
      const res = await api.articleRemove(data)
      return res
    },
    async articleCheck({commit}, data) {
      const res = await api.articleCheck(data)
      return res
    },
    async userList({commit}, data) {
      const res = await api.userList(data)
      return res
    },
    async userLock({commit}, data) {
      const res = await api.userLock(data)
      return res
    },
    async moderatorRequest({commit}, data) {
      const res = await api.moderatorRuquest(data)
      return res
    },
    async moderatorSuccess({commit}, data) {
      const res = await api.moderatorSuccess(data)
      return res
    },
    async moderatorFail({commit}, data) {
      const res = await api.moderatorFail(data)
      return res
    },
  },
});

export default store;
