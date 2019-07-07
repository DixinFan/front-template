<template>
  <div>
    <Button @click="axiosTest" ghost type="success">测试axios</Button>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      async axiosTest() {
        const res = await this.$api.test.hello({});
        console.log('响应信息', res);
      }
    }
  }
</script>

<style scoped>

</style>
