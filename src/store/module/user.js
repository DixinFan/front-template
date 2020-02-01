import api from '@/api';

export default {
  state: {
    userInfo: '',
  },
  getters: {
    hasGetInfo(state) {
      return !!state.userInfo;
    },
    access(state) {
      if (state.userInfo) {
        return state.userInfo.menuAccessSet || [];
      }
      return [];
    }
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
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
