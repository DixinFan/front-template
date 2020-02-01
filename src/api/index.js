import axios from '@/libs/api.request'

const POST = 'post';
const GET = 'get';

/**
 * 指定method需要配置为object
 * 不指定method则只需要注册为string，默认为post请求
 * **/
const apiRegistry = {
  user: {
    login: '/login',
    logout: { method: GET, url: '/logout' },
    load: '/login/success',
    query: '/system/user/query.json',
    add: '/system/user/add.json',
    delete: '/system/user/delete.json',
    update: '/system/user/update.json',
    process: '/system/user/process.json',
  },
}

/*
* axios的基本配置
* */
const getBaseConfig = () => ({
  method: POST,
  url: '',
  data: {},
  params: {},
  headers: {},
});

const processModuleConfigDetail = (moduleConfigDetail) => {
  const baseConfig = getBaseConfig();
  if (typeof moduleConfigDetail === 'string') {
    baseConfig.url = moduleConfigDetail;
  } else {
    Object.assign(baseConfig, moduleConfigDetail);
  }
  /**
   * 第二个参数config可以用来手动进行ajax配置，比如添加request-header
   * **/
  return (form, config = {}) => {
    const realConfig = Object.assign({}, baseConfig, config);
    if (realConfig.method === POST) {
      realConfig.data = form;
    } else {
      realConfig.params = form;
    }
    return axios.request(realConfig);
  }
}

const processRegistry = () => {
  const result = Object.create(null);
  const moduleKeys = Object.keys(apiRegistry);
  moduleKeys.forEach(moduleKey => {
    const moduleConfig = apiRegistry[moduleKey];
    const moduleConfigResult = Object.create(null);
    const moduleConfigKeys = Object.keys(moduleConfig);
    moduleConfigKeys.forEach(moduleConfigKey => {
      const moduleConfigDetail = moduleConfig[moduleConfigKey];
      moduleConfigResult[moduleConfigKey] = processModuleConfigDetail(moduleConfigDetail);
    });
    result[moduleKey] = moduleConfigResult;
  });
  return result;
}

class Api {
  constructor() {
    this.api = processRegistry();
  }

  install(Vue) {
    Vue.prototype.$api = this.api;
  }
}

const API = new Api();

export default API.api;
