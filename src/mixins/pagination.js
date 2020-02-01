/** 翻页器使用的 */

const PAGE_START = 1;
const DEFAULT_PAGE_SIZE = 20;

export default {
  data() {
    return {
      total: 0,
      currentPage: PAGE_START,
      pageSize: DEFAULT_PAGE_SIZE
    };
  },
  methods: {
    jumpPage(page) {
      this.currentPage = page;
      this.sendSearch();
    },
    resetPagination() {
      this.currentPage = PAGE_START;
      this.total = 0;
    },
    reset() {
      this.inputData = this.getDefaultQueryData();
      this.serachData = this.getDefaultQueryData();
      this.resetPagination();
      this.doSearch();
    },
    doSearch() {
      this.resetPagination();
      this.sendSearch();
    },
    sendSearch() {
      this.searchData = this.getSearchData();
      this.fetchList();
    }
  }
};
