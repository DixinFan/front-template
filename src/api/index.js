import axios from '@/libs/api.request'

const POST = 'post';
const GET = 'get';

const apiRegistry = {
  user: {
    query: { method:  GET, url: '/user/query' }, // 带方法的配置 object
    add: '/user/add.json',                       // 不带方法的配置 string 默认为post
    delete: { method: POST, url: '/user/delete.json' }
  },
  message: {
    query: { method:  GET, url: '/message/query' },
  },
  test: {
    hello: '/test/hello.json',
  },
  user: {
    login: '/login',
    logout: { method: GET, url: '/logout' },
    load: '/login/success',
  }
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

export default new Api().api;
