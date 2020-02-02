<template>
  <div>
    <Modal v-model="show" width="600" :title="editTitle">
      <div class="edit-form-container">
        <Form ref="editRef" :model="form" label-position="right" :label-width="80">
          <FormItem label="权限名" prop="name" :rules="[NotBlank]">
            <Input v-model.trim="form.name"/>
          </FormItem>
          <FormItem label="权限类型" prop="type" :rules="[SelectNumValueRegular]">
            <Select v-model="form.type">
              <Option v-for="(value, key) in AuthorityType" :key="`authority-type-${key}`" :value="value.code">{{ value.desc }}
              </Option>
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
  import { AuthorityType } from "@/config/constant";


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
        AuthorityType,
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
        return (this.create ? "添加" : "更新") + "权限信息";
      },
      editApi() {
        if (this.create) {
          return this.$api.authority.add;
        }
        return this.$api.authority.update;
      }
    }
  };
</script>

<style scoped>

</style>
