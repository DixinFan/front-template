<template>
  <div class="common-page-container">
    <div class="common-filter-container">
      <div class="common-filter-item">
        <Input v-model.trim="inputData.name">
        <span slot="prepend">用户名</span>
        </Input>
      </div>
      <div class="common-filter-item">
        <Input v-model.trim="inputData.email">
        <span slot="prepend">邮箱</span>
        </Input>
      </div>
      <div class="common-filter-item">
        <Input v-model.trim="inputData.phone">
        <span slot="prepend">手机号</span>
        </Input>
      </div>
      <div class="common-filter-item">
        <div class="complex-component-container">
          <div class="ivu-input-group-prepend">用户角色</div>
          <Select v-model="inputData.role">
            <Option :value="0">全部</Option>
            <Option v-for="(value, key) in UserRole" :key="`user-role-${key}`" :value="value.code">
              {{ value.desc }}
            </Option>
          </Select>
        </div>
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
        <template>
          <Select v-model="batchOpValue" class="normal-ivu-select margin-left-5"
                  v-if="showBatchOptionValue(opType.role.code)">
            <Option v-for="(value, key) in UserRole" :key="`user-role-${key}`" :value="value.code">{{ value.desc }}
            </Option>
          </Select>
        </template>
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
    <UserGroupAdd :value="userGroupAddProps"></UserGroupAdd>
  </div>
</template>

<script>
  import pageMixin from "@/mixins/pagination";
  import optionMixin from '@/mixins/option';
  import tableMixin from "./mixin/table-mixin";
  import batchMixin from "./mixin/batch-mixin";
  import editMixin from "./edit-item/edit-mixin";
  import userGroupAddMixin from './components/user-group-add/user-group-add-mixin';


  export default {
    mixins: [pageMixin, tableMixin, batchMixin, optionMixin, editMixin, userGroupAddMixin],
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
          email: '',
          role: '',
          phone: '',
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
        const res = await this.$api.user.query(this.searchData);
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
