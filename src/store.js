import Vue from 'vue'
import Vuex from 'vuex'
import Storager from '@/utils/storage';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: Storager.isAuth(),
    userinfo: Storager.getUserInfo(),
    subscribeBook: {}
  },
  mutations: {
    changeAuth: function(state, auth=false){
      state.auth = auth;
    },
    setUserinfo: function(state, userinfo){
      state.userinfo = userinfo;
    },
    addSubscribeBook: function(state, book){
      state.subscribeBook = book;
    },
  },
  actions: {

  }
})
