<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <!-- 提交action -->
          <login-form @on-success-valid="login"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex';

export default {
  components: {
    LoginForm,
  },
  methods: {
    ...mapActions(['handleLogin']),
    login(authentication) {
      this.handleLogin(authentication).then(() => {
        this.$router.push({ name: this.$config.homeName });
      })
    }
  }
}
</script>

<style>

</style>
