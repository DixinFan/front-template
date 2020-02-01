<template>
    <div class="common-page-container">
        <div class="common-filter-container">
            <div class="common-filter-item">
                <Input v-model.trim="inputData.operator">
                    <span slot="prepend">操作用户</span>
                </Input>
            </div>
            <div class="common-filter-item">
                <Input v-model.trim="inputData.description">
                    <span slot="prepend">描述</span>
                </Input>
            </div>
            <div class="common-filter-item">
              <div class="complex-component-container">
                <div class="ivu-input-group-prepend">日志类型</div>
                <Select v-model="inputData.logType">
                  <Option :value="0">全部</Option>
                  <Option v-for="(value, key) in OptionLogType" :key="`log-type-${key}`" :value="value.code">
                    {{ value.desc }}
                  </Option>
                </Select>
              </div>
            </div>
          <div class="common-filter-item">
            <div class="complex-component-container">
              <div class="ivu-input-group-prepend">操作类型</div>
              <Select v-model="inputData.optionType">
                <Option :value="0">全部</Option>
                <Option v-for="(value, key) in CommonOptionType" :key="`option-type-${key}`" :value="value.code">
                  {{ value.desc }}
                </Option>
              </Select>
            </div>
          </div>
        </div>
        <div class="common-option-container">
            <Button @click="reset" type="info" icon="md-refresh">重置</Button>
            <Button @click="doSearch" type="primary" icon="md-search">搜索</Button>
        </div>
        <div class="common-content-container">
            <div class="common-table-container">
                <Table ref="tableRef" :data="tableDatas" :columns="tableColumns" stripe></Table>
            </div>
            <Page show-total
                  :page-size="pageSize"
                  :total="total"
                  @on-change="jumpPage" style="margin-top: 15px;"></Page>
        </div>
    </div>
</template>

<script>
  import pageMixin from "@/mixins/pagination";
  import optionMixin from '@/mixins/option';
  import tableMixin from "./mixin/table-mixin";

  export default {
    mixins: [pageMixin, tableMixin, optionMixin],
    data() {
      return {
        inputData: this.getDefaultQueryData(),
        searchData: this.getDefaultQueryData(),
      };
    },
    methods: {
      getDefaultQueryData() {
        return {
          logType: '',
          optionType: '',
          description: '',
          operator: '',
        };
      },
      getSearchData() {
        const searchData = {};
        searchData.currentPage = this.currentPage;
        searchData.pageSize = this.pageSize;
        // 没有特殊处理就
        Object.assign(searchData, JSON.parse(JSON.stringify(this.inputData)));
        // 有特殊处理
        return searchData;
      },
      async fetchList() {
        const res = await this.$api.log.query(this.searchData);
        const { data = [], total = 0, code = 0 } = res;
        if (+code === 0) {
          this.dataList = data || [];
          this.total = total;
        } else {
          this.dataList = [];
          this.total = 0;
        }
      }
    }
  };
</script>

<style scoped lang="scss">

</style>
