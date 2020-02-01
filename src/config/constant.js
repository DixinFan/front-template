/*
* 路由相关常量
* */
export const homeRoute = '/statisticsInfo'; // 登录成功后首页路由
export const loginRoute = '/login'; // 登录页面路由
export const loginRouteName = 'login'; // 登录页面路由name
export const homeRouteName = 'home'; // 登录页面路由name
export const loginUrl = '/login.do'; // 后端拦截响应的url
export const uploadUrl = '/manager/file/upload.do'
export const logoutUrl = '/logout.do'

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

export const SysUserRole = {
    1: {name: 'NORMAL', code: 1, desc: '普通用户'},
    2: {name: 'ADMIN', code: 2, desc: '管理员'},
    10: {name: 'DISABLE', code: 10, desc: '禁用账户'},
}

export const SysUserRoleMap = {
    NORMAL: 1,
    ADMIN: 2,
    DISABLE: 10
}

/*告警*/
export const AlarmLevel = {
    1: {name: 'INFO', code: 1, desc: '信息'},
    2: {name: 'WARNING', code: 2, desc: '可疑'},
    3: {name: 'ERROR', code: 3, desc: '危险'},
}

export const AlarmLevelMap = {
    INFO: 1,
    WARNING: 2,
    ERROR: 3
}

export const AlarmStatus = {
    1: {name: 'TO_DO', code: 1, desc: '未处理'},
    2: {name: 'ENSURE', code: 2, desc: '已确认'},
    3: {name: 'IGNORE', code: 3, desc: '已忽略'},
}

export const AlarmStatusMap = {
    TO_DO: 1,
    ENSURE: 2,
    IGNORE: 3
}

/*AgentDebug*/
export const AgentDebugLevel = {
    1: {name: 'URGENT', code: 1, desc: '紧急'},
    2: {name: 'IMPORTANT', code: 2, desc: '重要'},
    3: {name: 'NORMAL', code: 3, desc: '一般'},
    4: {name: 'IGNORE', code: 4, desc: '忽略'}
}

export const AgentDebugLevelMap = {
    URGENT: 1,
    IMPORTANT: 2,
    NORMAL: 3,
    IGNORE: 4,
}

export const AgentDebugStatus = {
    1: {name: 'TO_DO', code: 1, desc: '未处理'},
    2: {name: 'FIXED', code: 2, desc: '已解决'},
    3: {name: 'SUSPEND', code: 3, desc: '挂起'},
    4: {name: 'IGNORE', code: 4, desc: '忽略'},
}

export const AgentDebugStatusMap = {
    TO_DO: 1,
    FIXED: 2,
    SUSPEND: 3,
    IGNORE: 4,
}

export const AlarmRuleType = {
    1: {name: 'info型', code: 1},
    2: {name: '恶意代码', code: 2},
    3: {name: '网络型', code: 3},
    4: {name: '命令执行', code: 4},
    5: {name: 'webshell', code: 5},
    6: {name: '异常登录', code: 6},
    7: {name: '异常用户', code: 7},
    8: {name: '异常任务', code: 8},
}

export const AlarmRuleLevel = {
    1: {name: '信息', code: 1},
    2: {name: '可疑', code: 2},
    3: {name: '危险', code: 3}
}
export const AlarmRuleStatus = {
    true: 1,
    false: 2,
}

export const AlarmOperatorMap = {
    1: {
        3: {name: '==', code: 3},
        4: {name: '!=', code: 4},
        5: {name: '包含', code: 5},
        6: {name: '不包含', code: 6},
        7: {name: '正则', code: 7},
        8: {name: '为空', code: 8},
    },
    2: {
        1: {name: '>', code: 1},
        2: {name: '<', code: 2},
        3: {name: '==', code: 3},
        4: {name: '!=', code: 4},
        8: {name: '为空', code: 8},
    },
    3: {
        1: {name: '>', code: 1},
        2: {name: '<', code: 2},
        3: {name: '==', code: 3},
        4: {name: '!=', code: 4},
        8: {name: '为空', code: 8},
    },
}

export const AlarmRuleDataType = {
    1: {name: "String", code: 1},
    2: {name: "Long", code: 2},
    3: {name: "Double", code: 3},
}

/*AgentHost*/
export const AuthorityStatus = {
    1: {name: 'CHECK', code: 1, desc: '审核中'},
    2: {name: 'ALLOW', code: 2, desc: '已授权'},
    3: {name: 'DISALLOW', code: 3, desc: '不授权'},
}

export const AuthorityStatusMap = {
    CHECK: 1,
    ALLOW: 2,
    DISALLOW: 3,
}

export const AgentStatus = {
    1: {name: 'ONLINE', code: 1, desc: '在线', class: 'prefix-success'},
    2: {name: 'OUT_LINE', code: 2, desc: '离线', class: 'prefix-error'},
    3: {name: 'LOSE_CONTACT', code: 3, desc: '失联', class: 'prefix-text'},
}

export const AgentStatusMap = {
    ONLINE: 1,
    OUT_LINE: 2,
    LOSE_CONTACT: 3,
}

export const UpgradeStatus = {
    1: {name: 'TO_UPGRADE', code: 1, desc: '待升级'},
    2: {name: 'UPGRADING', code: 2, desc: '升级中'},
    3: {name: 'UPGRADE_FAILED', code: 3, desc: '升级失败'},
    4: {name: 'UPGRADE_SUCCESS', code: 4, desc: '升级成功'},
    5: {name: 'ROLLBACKING', code: 5, desc: '回滚中'},
    6: {name: 'ROLLBACK_FAILED', code: 6, desc: '回滚失败'},
}

export const UpgradeStatusMap = {
    TO_UPGRADE: 1,
    UPGRADING: 2,
    UPGRADE_FAILED: 3,
    UPGRADE_SUCCESS: 4,
    ROLLBACKING: 5,
    ROLLBACK_FAILED: 6,
}

export const CollectRuleTargetType = {
    INCLUDE_GROUP: 1,
    INCLUDE_HOST: 2,
    EXCLUDE_GROUP: 3,
    EXCLUDE_HOST: 4,
}
export const collectRuleType = {
    1: {name: '信息', code: 1},
    2: {name: '告警', code: 2},
}

export const LogModuleType = {
    1: { name: 'LOGIN', code: 1, desc: '用户登录' },
    2: { name: 'ACCOUNT', code: 2, desc: '账号操作' },
    3: { name: 'AGENT_GROUP', code: 3, desc: 'agent分组操作' },
    4: { name: 'COLLECT_RULE', code: 4, desc: '收集规则操作' },
    5: { name: 'ALARM_RULE', code: 5, desc: '告警规则操作' },
    6: { name: 'ALARM_MESSAGE', code: 6, desc: '告警消息操作' },
    7: { name: 'AGENT_VERSION', code: 7, desc: 'agent版本操作' },
}

export const LogModuleTypeMap = {
    LOGIN: 1,
    ACCOUNT: 2,
    AGENT_GROUP: 3,
    COLLECT_RULE: 4,
    ALARM_RULE: 5,
    ALARM_MESSAGE: 6,
    AGENT_VERSION: 7,
}
