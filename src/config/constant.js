
/*
* 应用相关常量
* */
export const CommonOptionType = {
    1: {name: 'CREATE', code: 1, desc: '新增'},
    2: {name: 'READ', code: 2, desc: '查询'},
    3: {name: 'UPDATE', code: 3, desc: '修改'},
    4: {name: 'DELETE', code: 4, desc: '删除'},
    100: {name: 'OTHERS', code: 100, desc: '其他'},
}


export const CommonOptionTypeMap = {
    CREATE: 1,
    READ: 2,
    UPDATE: 3,
    DELETE: 4,
    OTHERS: 100
}

export const SwitchStatus = {
    1: { name: 'ON', code: 1, desc: '启用'},
    2: { name: 'OFF', code: 2, desc: '禁用'},
}

export const SwitchStatusMap = {
    ON: 1,
    OFF: 2,
}

export const UserRole = {
    1: {name: 'NORMAL', code: 1, desc: '正常用户'},
    2: {name: 'BLACK', code: 2, desc: '黑名单'},
    3: {name: 'GREY', code: 3, desc: '灰名单'},
}

export const UserRoleMap = {
    NORMAL: 1,
    BLACK: 2,
    GREY: 3
}

export const OptionLogType = {
  1: {name: 'ACCOUNT_STATUS', code: 1, desc: '账号状态'},
  2: {name: 'USER', code: 2, desc: '用户相关'},
  3: {name: 'USER_GROUP', code: 3, desc: '用户组相关'},
  4: {name: 'AUTHORITY', code: 4, desc: '权限相关'},
}

export const OptionLogTypeMap = {
  ACCOUNT_STATUS: 1,
  USER: 2,
  USER_GROUP: 3,
  AUTHORITY: 4
}

export const AuthorityType = {
  1: {name: 'URL', code: 1, desc: '请求权限'},
  2: {name: 'MENU', code: 2, desc: '菜单权限'},
}

export const AuthorityTypeMap = {
  URL: 1,
  MENU: 2
}
