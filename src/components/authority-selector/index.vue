<template>
    <Dropdown
            trigger="click"
            @on-click="select"
            style="position: relative;"
            :value="value">
        <template>
            <Input :value="name" @on-change="updateList" placeholder="输入名字搜索" style="width: 250px;"/>
            <Icon type="arrow-down-b" class="ivu-select-arrow"></Icon>
        </template>
        <Dropdown-menu slot="list" style="width: 250px;">
            <Dropdown-item
                    v-for="(item, index) in List"
                    :name="JSON.stringify(item)"
                    :selected="item.id === value && item.id > 0"
                    :disabled="item.id < 0"
                    :key="index">
                {{ item.name }}
            </Dropdown-item>
        </Dropdown-menu>
    </Dropdown>
</template>
<script>
  import debounce from 'lodash/debounce';

  export default {
    props: {
      value: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        name: '',
        List: [],
      };
    },
    watch: {
      value(newValue) {
        this.initName(newValue);
      }
    },
    methods: {
      updateList: debounce(function (data) {
        const name = data.target.value;
        this.$emit('input', 0);
        this.$api.authority.query({ name })
          .then(({ data }) => {
            this.List = data || [{ id: -999, name: '无结果' }];
          });
      }, 200),
      select(name) {
        const item = JSON.parse(name);
        this.name = item.name;
        this.$emit('input', item.id);
        this.$emit('input-all', item);
      },
      initName(id) {
        if (!id) {
          this.name = '';
        } else if (!this.name){
          this.$api.authority.query({ id }).then(({ data }) => {
            if (data && data.length) {
              this.name = data[0].name;
            }
          })
        }
      }
    },
  };
</script>
