import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutation.js'
import actions from './action.js'


Vue.use(Vuex);

const state = {
    token: window.sessionStorage.getItem('token'),
    userid: '',
    balance:'',
 
    notice:[],
    role:''
  
};

export default new Vuex.Store({
    state,
    mutations,
    actions
});