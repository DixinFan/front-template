import {setToken, getToken} from '@/libs/util';
import api from '@/api';

export default {
  state: {
    userRole: 0,
    userName: '',
    userId: '',
    avatarImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {}
  },
  mutations: {
    setUserRole(state, role) {
      state.userRole = role;
    },
    setUserId(state, id) {
      state.userId = id
    },
    setUserName(state, name) {
      state.userName = name
    },
    setAccess(state, access) {
      state.access = access
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status
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
    // 登录
    handleLogin({commit}, {username, password}) {
      return  new Promise((resolve, reject) => {
        api.user.login({}, {params: {username, password}}).then((data) => {
          if (!data) {
            // 登录失败 无用户信息
            commit('setUserName', '');
            commit('setAccess', []);
            commit('setUserRole', 0);
            commit('setHasGetInfo', false);
            return reject();
          }
          const {accessList, name, userRole} = data;
          commit('setUserName', name);
          commit('setAccess', accessList);
          commit('setUserRole', userRole);
          commit('setHasGetInfo', true);
          resolve();
        })
      })
    },
    // 退出登录
    handleLogOut({state, commit}) {
      return new Promise((resolve, reject) => {
        api.user.logout().then(() => {
          commit('setUserName', '');
          commit('setAccess', []);
          commit('setUserRole', 0);
          commit('setHasGetInfo', false);
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setUserName', '');
        commit('setAccess', []);
        commit('setUserRole', 0);
        commit('setHasGetInfo', false);
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo({state, commit}) {
      return new Promise((resolve, reject) => {
        try {
          api.user.query({token: state.token}).then(res => {
            const data = res.data
            commit('setAvatar', data.avatar)
            commit('setUserName', data.name)
            commit('setUserId', data.user_id)
            commit('setAccess', data.access)
            commit('setHasGetInfo', true)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
  }
}
