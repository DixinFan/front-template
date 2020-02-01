// 通用的数据初始化的mixin 需要ajax来拉数据

export default {
  data() {
    return {
      ajaxFinish: true,
    }
  },
  methods: {
    /**
    * ajaxApiArray 一个promise的数组 其实就是ajax函数的调用结果
    * successCallBack 必填 在响应中做一些赋值操作 参数是response的数组
    * errorCallBack 选填
    * */
    fetchRemoteData(ajaxPromiseArray, successCallBack, errorCallBack) {
      this.ajaxFinish = false;
      Promise.all(ajaxPromiseArray).then((resArray) => {
        successCallBack(resArray);
      }).catch(error => {
        errorCallBack ? errorCallBack(error) : (console.log(error));
      }).finally(() => {
        this.ajaxFinish = true;
      })
    }
  }
}
