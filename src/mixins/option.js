export default {
  methods: {
    ensureOption(callback, msg = '您确定要执行该操作? 操作后不可恢复', render) {
      this.$Modal.confirm({
        title: '操作提示',
        content: msg,
        render,
        onOk: () => {
          callback();
        },
      })
    }
  }
}
