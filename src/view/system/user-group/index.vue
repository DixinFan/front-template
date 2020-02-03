<template>
  <div class="common-page-container">
    <div class="common-filter-container">
      <div class="common-filter-item">
        <Input v-model.trim="inputData.name">
        <span slot="prepend">用户组名</span>
        </Input>
      </div>
      <div class="common-filter-item">
        <Input v-model.trim="inputData.description">
        <span slot="prepend">描述</span>
        </Input>
      </div>
    </div>
    <div class="common-option-container">
      <Button @click="reset" type="info" icon="md-refresh">重置</Button>
      <Button @click="doSearch" type="primary" icon="md-search">搜索</Button>
      <Button @click="addData" type="success" icon="md-add">添加</Button>
    </div>
    <div class="common-content-container">
      <div class="common-batch-option-container">
        <Button type="warning" ghost :disabled="!canBatchUpdate" @click="batchOption">批量变更</Button>
        <Select class="small-ivu-select margin-left-5" v-model="batchOpType">
          <Option v-for="(value, key) in opType" :key="`opType-${key}`" :value="value.code">{{value.desc}}</Option>
        </Select>
      </div>
      <div class="common-table-container">
        <Table ref="tableRef" :data="tableDatas" :columns="tableColumns" stripe></Table>
      </div>
      <Page show-total
            :page-size="pageSize"
            :total="total"
            @on-change="jumpPage" style="margin-top: 15px;"></Page>
    </div>
    <EditItem :value="editProps" @edit-success="reset"></EditItem>
    <UserAdd :value="userAddProps"></UserAdd>
    <AuthorityAdd :value="authorityAddProps"></AuthorityAdd>
  </div>
</template>

<script>
  import pageMixin from "@/mixins/pagination";
  import optionMixin from '@/mixins/option';
  import tableMixin from "./mixin/table-mixin";
  import batchMixin from "./mixin/batch-mixin";
  import editMixin from "./edit-item/edit-mixin";
  import userAddMixin from './components/user-add/user-add-mixin';
  import authorityAddMixin from './components/authority-add/authority-add-mixin';


  export default {
    mixins: [pageMixin, tableMixin, batchMixin,
      optionMixin, editMixin, userAddMixin, authorityAddMixin],
    data() {
      return {
        inputData: this.getDefaultQueryData(),
        searchData: this.getDefaultQueryData(),
      };
    },
    methods: {
      getDefaultQueryData() {
        return {
          name: '',
          description: '',
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
        const res = await this.$api.userGroup.query(this.searchData);
        const {data = [], total = 0, code = 0} = res;
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
