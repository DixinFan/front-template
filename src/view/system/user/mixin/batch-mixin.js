// 有的页面可能不需要批量操作 将批量操作拆解出来
export default {
  data() {
    return {
      selectedTableData: [],
      batchOpType: 1,
      batchOpValue: 1,
      opType: {
        delete: { code: 1, desc: '删除' },
        role: { code: 2, desc: '修改角色' }
      }
    }
  },
  watch: {
    batchOpType(newValue) {
      this.batchOpValue = 1;
      this.refreshTable();
    },
    dataList: {
      deep: true,
      handler() {
        this.selectedTableData = [];
      }
    }
  },
  computed: {
    canBatchUpdate() {
      return this.selectedTableData && this.selectedTableData.length;
    },
    batchTableColumns() {
      this.normalTableColumns.unshift({
        type: 'selection',
        width: 50,
        center: true,
      })
    },
    selectedDataIdList() {
      if (!this.selectedTableData || !this.selectedTableData.length) {
        return [];
      }
      return this.selectedTableData.map((data) => {
        return data.id;
      })
    }
  },
  methods: {
    refreshTable() {
      const copy = this.dataList;
      this.dataList = [];
      this.$nextTick(() => {
        this.dataList = copy;
      })
    },
    showBatchOptionValue(opType) {
      return this.batchOpType == opType;
    },
    selectData(selectedData) {
      this.selectedTableData = selectedData || [];
    },
    batchOption() {
      if (!this.canBatchUpdate) {
        return;
      }
      const callback = () => {
        this.$api.sysUser.process({ idList: this.selectedDataIdList, opType: this.batchOpType, value: this.batchOpValue }).then(() => {
          this.doSearch();
        })
      };
      this.ensureOption(callback);
    }
  },
  updated() {
    this.$refs.tableRef.$on('on-selection-change', this.selectData);
  }
}
