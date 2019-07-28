export default {
  methods: {
    reset() {
      this.formData = this.getDefaultFormData();
      this.searchData = this.getDefaultFormData();
      this.doSearch();
    },
    doSearch() {
      this.initSearchData(); // formData转化位searchData
      this.fetchData();
    },
  }
}
