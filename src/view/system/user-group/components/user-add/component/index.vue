<template>
  <div>
    <Modal v-model="showModal" width="600" title="添加用户到用户组">
      <div class="add-map-container">
        <div class="map-entity-search">
          <UserSelector v-model="userId" @input-all="selectUser"></UserSelector>
          <Button @click="addToUserList" type="info" style="margin-left: 20px;">添加</Button>
        </div>
        <div class="mapped-entity-list margin-top-5">
          <Tooltip :content="item.description"  v-for="(item, index) in userList">
            <Tag :name="index" color="cyan" type="border" closable @on-close="removeFromUserList">
              {{ item.name }}
            </Tag>
          </Tooltip>

        </div>
      </div>
      <div class="edit-form-foot" slot="footer">
        <Button @click="onCancel">取消</Button>
        <Button @click="onOk" type="info">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import UserSelector from '_c/user-selector';
  import { CommonMapTypeMap } from "@/config/constant";

  export default {
    components: {
      UserSelector
    },
    props: {
      value: {
        type: Object,
        default: () => ({ show: false, id: 0 })
      }
    },
    data() {
      return {
        showModal: false,
        userGroupId: 0,
        userList: [],
        user: '',
        userId: 0,
      }
    },
    watch: {
      value: {
        deep: true,
        handler(newValue) {
          this.reset();
          this.userGroupId = newValue && newValue.id || 0;
          // 初始化UserGroupList
          this.$api.userGroup.query({ id: this.userGroupId }).then(({ data }) => {
            if (data && data.length) {
              const userList = data[0].userList || [];
              this.userList = userList.map(user =>
                ({name: user.name, id: user.id, description: user.description})) || [];
            }
          }).catch(error => {
            console.log(error);
          }).finally(() => this.showModal = newValue && newValue.show || false)
        }
      },
    },
    methods: {
      reset() {
        this.userGroupId = 0;
        this.userList = [];
        this.user = '';
        this.userId = 0;
      },
      onCancel() {
        this.showModal = false;
      },
      onOk() {
        if (!this.userGroupId) {
          return;
        }
        // 保存到服务端
        const batchMap = {
          type: CommonMapTypeMap.USER_MAP_GROUP,
          primaryKeyList: this.userList.map(user => user.id) || [],
          secondaryKey: this.userGroupId,
        }
        this.$api.commonMap.updateLongLongMap(batchMap).then(() => {
          this.showModal = false;
        }).catch(error => {
          console.log(error)
        })
      },
      selectUser(user) {
        this.user = user;
      },
      addToUserList() {
        if (this.user && this.user.id) {
          const { id, name, description } = this.user;
          const exists = this.userList.find((user) => user.id == id);
          if (!exists) {
            this.userList.push({ id, name, description })
          }
        }
      },
      removeFromUserList(index) {
        this.userList.splice(index, 1);
      }
    }
  }
</script>

<style scoped>

</style>
