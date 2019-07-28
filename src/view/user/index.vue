<template>
  <div class="component-container">
    <div class="component-filter">
      <div class="component-filter-container">
        <div class="component-filter-item">
          <label>编号</label>
          <Input placeholder="请输入编号" v-model="formData.id"/>
        </div>
        <div class="component-filter-item">
          <label>姓名</label>
          <Input placeholder="请输入姓名" v-model="formData.name"/>
        </div>
        <div class="component-filter-item">
          <label>邮箱</label>
          <Input placeholder="请输入邮箱" v-model="formData.email"/>
        </div>
        <div class="component-filter-item">
          <label>联系方式</label>
          <Input placeholder="请输入联系方式" v-model="formData.phone"/>
        </div>
        <div class="component-filter-item">
          <label>用户角色</label>
          <Select placeholder="请选择用户角色" v-model="formData.userRole">
            <Option :value="0">全部</Option>
            <Option v-for="(value, key) in USER_ROLE" :key="value.name" :value="value.code">
              {{ value.desc }}
            </Option>
          </Select>
        </div>
      </div>
      <div class="component-filter-button-container">
        <Button type="success" icon="md-add" @click="addItem">添加</Button>
        <Button type="primary" icon="md-search" @click="doSearch">搜索</Button>
        <Button type="info" icon="md-refresh" @click="reset">重置</Button>
      </div>
    </div>
    <div class="component-content-container">
      <div class="component-content-data-container">
        <Table :columns="tableColumns" :data="tableData"></Table>
      </div>
      <div class="component-content-page-container">
        <Page :total="total" :current.sync="currPage" @on-change="doSearch" :page-size="limit"
              show-total show-elevator></Page>
      </div>
    </div>
    <EditItem @change="doSearch" :editProps="editProps"></EditItem>
  </div>
</template>

<script>
  import baseMixin from '@/view/base/filter-mixin';
  import pageMixin from '@/view/base/page-mixin';
  import {USER_ROLE} from '@/constant';
  import { DateFormat } from "@/utils";
  import EditItem from './edit-item';

  const getDefaultEditProps = () => ({
    modify: false,
    show: false,
    formData: {
      id: 0,
      name: '',
      phone: '',
      email: '',
      password: '',
      userRole: 1,
    }
  })

  export default {
    mixins: [baseMixin, pageMixin],
    components: {
      EditItem
    },
    data() {
      return {
        formData: this.getDefaultFormData(),
        searchData: this.getDefaultFormData(),
        USER_ROLE,
        tableData: [],
        editProps: getDefaultEditProps(),
      }
    },
    computed: {
      tableColumns() {
        const tableColumns = [
          { title: '编号', key: 'id' },
          { title: '姓名',  key: 'name'},
          { title: '联系方式', key: 'phone' },
          { title: '邮箱', key: 'email' },
          { title: '密码', key: 'password' },
          {
            title: '角色类型',
            render: (h, { row }) => h('div', USER_ROLE[row.userRole].desc)
          },
          {
            title: '创建时间',
            render: (h, { row }) => h('div', DateFormat(row.createTime))
          },
          {
            title: '操作',
            render: (h, { row }) => {
              const updateButton = {
                props: {
                  size: 'small',
                  type: 'primary',
                },
                style: {
                  marginRight: '5px',
                },
                on: {
                  click:() => {
                    this.updateItem(row);
                  }
                }
              };
              const deleteButton = {
                props: {
                  size: 'small',
                  type: 'info',
                },
                on: {
                  click:() => {
                    this.deleteItem(row);
                  }
                }
              };
              return h('div', [h('Button', updateButton, '修改'), h('Button', deleteButton, '删除')]);
            }
          }
        ]
        tableColumns.forEach((column) => {
          column['align'] = 'center';
        })
        return tableColumns;
      }
    },
    methods: {
      addItem() {
        const editProps = getDefaultEditProps();
        editProps.show = true;
        this.editProps = editProps;
      },
      getDefaultFormData() {
        return {
          name: '',
          userRole: 0,
          id: '',
          email: '',
          phone: '',
        }
      },
      initSearchData() {
        const searchData = JSON.parse(JSON.stringify(this.formData));
        this.offset = this.limit * (this.currPage - 1);
        searchData.offset = this.offset;
        searchData.limit = this.limit;
        this.searchData = searchData;
      },
      async fetchData() {
        const {total, data} = await this.$api.userManage.query(this.searchData);
        this.tableData = data || [];
        this.total = total || 0;
      },
      updateItem(data) {
        const editProps = getDefaultEditProps();
        const formData = {};
        for (const key in data) {
          if (!key.startsWith('_')) {
            formData[key] = data[key];
          }
        }
        editProps.formData = formData;
        editProps.show = true;
        editProps.modify = true;
        this.editProps = editProps;
      },
      deleteItem(data) {
        this.$Modal.confirm({
          title: '提示',
          content: `您确定要删除【<span style="color: orangered;">${data.name}</span>】?删除后不可恢复`,
          onOk: () => {
            this.$api.userManage.delete([data.id]).then(() => {
              this.reset();
            })
          }
        })
      }
    },
    created() {
      this.doSearch();
    }
  }
</script>

<style scoped>

</style>
