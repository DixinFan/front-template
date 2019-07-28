export default {
  data() {
    return {
      total: 0,
      limit: 20,
      offset: 0,
      currPage: 1,
    }
  },
  computed: {
    showPage() {
      return this.total > this.limit;
    }
  }
}
