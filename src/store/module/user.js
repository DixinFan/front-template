import api from '@/api';
import Qs from 'qs';

export default {
  state: {
    userInfo: '',
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {}
  },
  getters: {
    hasGetInfo(state) {
      return !!state.userInfo;
    },
    access(state) {
      if (state.userInfo) {
        return state.userInfo.accessList || [];
      }
      return [];
    }
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setMessageCount(state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList(state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList(state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList(state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore(state, {msg_id, content}) {
      state.messageContentStore[msg_id] = content
    },
    moveMsg(state, {from, to, msg_id}) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    }
  },
  actions: {
    loadUserInfo({state, commit}) {
      return new Promise((resolve, reject) => {
        if (state.userInfo) {
          resolve;
        }
        api.user.load({}).then((data) => {
          if (data) {
            commit('setUserInfo', data);
            resolve();
          }
          reject();
        }).catch(error => {
          console.log(error);
          reject();
        });
      });
    },
    // 登录
    handleLogin({commit}, {username, password}) {
      return  new Promise((resolve, reject) => {
        api.user.login({}, { params: { username, password } }).then((data) => {
          if (!data) {
            commit('setUserInfo', '');
            return reject("用户信息为空");
          }
          commit('setUserInfo', data);
          return resolve();
        }).catch(error => {
          return reject(error);
        })
      })
    },
    // 退出登录
    handleLogOut({state, commit}) {
      return new Promise((resolve, reject) => {
        api.user.logout().finally(() => {
          commit('setUserInfo', '');
          resolve();
        });
      })
    },
    getUnreadMessageCount ({ state, commit}) {
      return state.unreadCount;
    }
  }
}
