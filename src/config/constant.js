
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
