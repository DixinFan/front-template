export default {
  data() {
    return {
      strRequired: { type: 'string', required: true, message: '该项不能为空', trigger: 'change' },
      numRequired: { type: 'number', min: 0, message: '该项为必选项', trigger: 'change' },
      emailValidate: { type: 'email', message: '邮箱格式错误', trigger: 'change' }
    }
  }
}
