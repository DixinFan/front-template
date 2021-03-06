import axios from 'axios'
import { Message } from 'view-design';

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
    }
    return config
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      const { data, status } = res
      const { code = -1, msg = '', data: jsonData, showMsg = true } = data;
      if (+code === 0) {
        if (showMsg) {
          Message.success({ content: msg || '请求成功', duration: 3 });
        }
      } else {
        Message.info({ content: msg || '请求非法', duration: 3 })
      }
      if (data.hasOwnProperty('total')) {
        return { data: jsonData, total: data.total }
      }
      return jsonData;
    }, error => {
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      if (errorInfo.status == 403) {
        Message.error({ content: '禁止访问', duration: 3 });
      } else {
        Message.error({ content: '服务器异常', duration: 3 });
      }
      console.log('Error: ', error);
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
