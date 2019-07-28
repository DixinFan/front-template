<template>
  <div>
    <Modal :title="title" :closable="false" :mask-closable="false"
           width="650" v-model="show">
      <Form :model="formData" :label-width="80" ref="form">
        <FormItem label="用户名" prop="name" :rules="[strRequired]">
          <Input placeholder="请输入用户名" v-model="formData.name"/>
        </FormItem>
        <FormItem label="联系方式" prop="phone" :rules="[strRequired]">
          <Input placeholder="请输入联系方式" v-model="formData.phone"/>
        </FormItem>
        <FormItem label="邮箱" prop="email" :rules="[strRequired, emailValidate]">
          <Input placeholder="请输入邮箱" v-model="formData.email"/>
        </FormItem>
        <FormItem label="密码" prop="password" :rules="[strRequired]">
          <Input placeholder="请输入密码" v-model="formData.password"/>
        </FormItem>
        <FormItem label="用户角色" prop="userRole" :rules="[numRequired]">
          <Select v-model="formData.userRole">
            <Option v-for="(value, key) in USER_ROLE" :key="value.name" :value="value.code">
              {{ value.desc }}
            </Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer" class="form-footer">
        <Button icon="md-trash" type="info" ghost @click="onCancel">取消</Button>
        <Button icon="md-send" type="primary" @click="onOk">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {USER_ROLE} from '@/constant';
  import formMixin from '@/view/base/form-mixin';

  const formatEditProps = (editProps) => {
    const copy = JSON.parse(JSON.stringify(editProps));
    return copy;
  }

  export default {
    props: ['editProps'],
    mixins: [formMixin],
    data() {
      return {
        modify: false,
        show: false,
        formData: {},
        USER_ROLE,
      }
    },
    methods: {
      onCancel() {
        this.show = false;
      },
      onOk() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            const apiKey = this.modify ? 'update' : 'add';
            this.$api.userManage[apiKey](this.formData).then(() => {
              this.$emit('change');
              this.show = false;
            })
          } else {
           this.$Message.error('数据不合法');
          }
        })
      }
    },
    watch: {
      editProps(newEditProps) {
        Object.assign(this, formatEditProps(newEditProps));
      }
    },
    computed: {
      title() {
        const prefix = this.modify ? '修改' : '添加';
        const text = '用户信息';
        return prefix + text;
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/style/less/components/_form";
</style>
