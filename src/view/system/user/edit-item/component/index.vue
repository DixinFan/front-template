<template>
    <div>
        <Modal v-model="show" width="600" :title="editTitle">
            <div class="edit-form-container">
                <Form ref="editRef" :model="form" label-position="right" :label-width="80">
                    <FormItem label="用户名" prop="username" :rules="[NotBlank]">
                        <Input v-model.trim="form.username"/>
                    </FormItem>
                    <FormItem label="邮箱" prop="email" :rules="[NotBlank, EmailRegular]">
                        <Input v-model.trim="form.email"/>
                    </FormItem>
                    <FormItem label="角色" prop="role" :rules="[SelectNumValueRegular]">
                        <Select v-model="form.role">
                            <Option v-for="(value, key) in SysUserRole" :key="`user-role-${key}`" :value="value.code">{{ value.desc }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="描述信息" prop="description">
                        <Input type="textarea" :row="4" v-model.trim="form.description"/>
                    </FormItem>
                </Form>
            </div>
            <div class="edit-form-foot" slot="footer">
                <Button @click="onCancel">取消</Button>
                <Button @click="onOk" type="info">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
  import validatorMixin from "@/mixins/formValidator";
  import { SysUserRole } from "@/config/constant";


  export default {
    mixins: [validatorMixin],
    props: {
      value: {
        type: Object,
        default: () => ({
          show: false,
          create: true,
          form: {}
        })
      }
    },
    data() {
      return {
        ...this.value,
        SysUserRole,
      };
    },
    watch: {
      value(newValue) {
        Object.assign(this, newValue);
      }
    },
    methods: {
      onCancel() {
        this.show = false;
      },
      onOk() {
        this.$refs.editRef.validate((valid) => {
          if (!valid) {
            return;
          }
          this.editApi(this.form).then(() => {
            this.emitChange();
          });
        });
      },
      emitChange() {
        this.$emit("edit-success");
        this.show = false;
      }
    },
    computed: {
      editTitle() {
        return (this.create ? "添加" : "更新") + "用户信息";
      },
      editApi() {
        if (this.create) {
          return this.$api.sysUser.add;
        }
        return this.$api.sysUser.update;
      }
    }
  };
</script>

<style scoped>

</style>
