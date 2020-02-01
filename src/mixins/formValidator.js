import validator from "validator";

export default {
    data() {
        return {
            NotBlank: { required: true, type: "string", trigger: "change", message: "该项为必填项" },
            EmailRegular: { type: "email", trigger: "change", message: "邮箱格式不正确" },
            SelectNumValueRegular: { required: true, type: "number", trigger: "change", message: "请选择有效选项", min: 1 },
            multipleSelectNumRegular: { required: true, type: 'array', min: 1, message: '请选择有效选项', trigger: 'change' },
            ArrayNotEmpty: { validator: this.arrayNotEmpty, trigger: 'change' }
        };
    },
    methods: {
        arrayNotEmpty(rule, value, callback) {
            if (!value || !value.length) {
                return callback(new Error('该列表项不能为空'));
            }
            return callback();
        }
    }
};
