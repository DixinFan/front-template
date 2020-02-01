// 写在一个文件里实在是太复杂了 找问题也不好找
// 将查询和数据显示分开来
import { CommonOptionType, CommonOptionTypeMap, OptionLogType } from '@/config/constant';
import { millisFormatTime } from "@/utils/timeUtil";

export default {
  data() {
    return {
      dataList: [],
      CommonOptionType,
      CommonOptionTypeMap,
      OptionLogType,
    }
  },
  computed: {
    tableDatas() {
      let tableDatas = [];
      if (this.batchTableDatas) {
        tableDatas =  this.batchTableDatas || [];
      } else {
        tableDatas = this.normalTableDatas || [];
      }
      tableDatas.forEach((data, index) => {
        data['_disabled'] = this.hasAuthority ? !this.hasAuthority(index) : false;
      })
      return tableDatas;
    },
    tableColumns() {
      if (this.batchTableColumns) {
        return this.batchTableColumns;
      }
      return this.normalTableColumns;
    },
    normalTableDatas() {
      if (!this.dataList || !this.dataList.length) {
        return [];
      }
      return this.dataList;
    },
    normalTableColumns() {
      const result = [
        { key: 'operator', title: '操作者' },
        {
          title: '日志类型',
          render: (h, { row }) => h('div', this.OptionLogType[row.logType].desc),
        },
        {
          title: '操作类型',
          render: (h, { row }) => h('div', this.CommonOptionType[row.optionType].desc),
        },
        { key: 'description', title: '描述信息' },
        {
          title: '创建时间',
          render: (h, { row }) => h('div', millisFormatTime(row.createTime)),
        },
        {
          title: '操作',
          render: (h, { index }) => {
            const deleteBtn = h('Button', {
              props: {
                type: 'error',
                size: 'small',
                disabled: this.hasAuthority ? !this.hasAuthority(index) : false,
              },
              on: {
                click: () => this.singleOption(index, CommonOptionTypeMap.DELETE),
              }
            }, '删除');
            return h('div', [deleteBtn]);
          }
        },
      ];
      result.forEach(column => {
        column['align'] = 'center';
        column['tooltip'] = true;
      })
      return result;
    }
  },
  methods: {
    hasAuthority(index) {
      return true;
    },
    singleOption(index, optionType) {
      switch (optionType) {
        case CommonOptionTypeMap.DELETE:
          this.deleteData(index);
          break;
      }
    },
    deleteData(index) {
      const data = this.dataList[index];
      if (!data) {
        return;
      }
      const callback = () => {
        this.$api.log.delete({ id: data.id }).then(() => {
          this.doSearch();
        })
      };
      this.ensureOption(callback);
    }
  },
  created() {
    this.doSearch();
  }
}
