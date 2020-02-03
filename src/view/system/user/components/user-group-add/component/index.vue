<template>
  <div>
    <Modal v-model="showModal" width="600" title="添加用户到用户组">
      <div class="add-map-container">
        <div class="map-entity-search">
          <UserGroupSelector v-model="userGroupId" @input-all="selectUserGroup"></UserGroupSelector>
          <Button @click="addToUserGroupList" type="info" style="margin-left: 20px;">添加</Button>
        </div>
        <div class="mapped-entity-list margin-top-5">
          <Tooltip :content="item.description"  v-for="(item, index) in userGroupList">
            <Tag :name="index" color="cyan" type="border" closable @on-close="removeFromUserGroupList">
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
  import UserGroupSelector from '_c/user-group-selector';
  import { CommonMapTypeMap } from "@/config/constant";

  export default {
    components: {
      UserGroupSelector
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
        userId: 0,
        userGroupList: [],
        userGroup: '',
        userGroupId: 0,
      }
    },
    watch: {
      value: {
        deep: true,
        handler(newValue) {
          this.reset();
          this.userId = newValue && newValue.id || 0;
          // 初始化UserList
          this.$api.user.query({ id: this.userId }).then(({ data }) => {
            if (data && data.length) {
              const userGroupList = data[0].userGroupList || [];
              this.userGroupList = userGroupList.map(userGroup =>
                ({name: userGroup.name, id: userGroup.id, description: userGroup.description})) || [];
            }
          }).catch(error => {
            console.log(error);
          }).finally(() => this.showModal = newValue && newValue.show || false)
        }
      },
    },
    methods: {
      reset() {
        this.userId = 0;
        this.userGroupList = [];
        this.userGroup = '';
        this.userGroupId = 0;
      },
      onCancel() {
        this.showModal = false;
      },
      onOk() {
        if (!this.userId) {
          return;
        }
        // 保存到服务端
        const batchMap = {
          type: CommonMapTypeMap.USER_MAP_GROUP,
          secondaryKeyList: this.userGroupList.map(userGroup => userGroup.id) || [],
          primaryKey: this.userId,
        }
        this.$api.commonMap.updateLongLongMap(batchMap).then(() => {
          this.showModal = false;
        }).catch(error => {
          console.log(error)
        })
      },
      selectUserGroup(userGroup) {
        this.userGroup = userGroup;
      },
      addToUserGroupList() {
        if (this.userGroup && this.userGroup.id) {
          const { id, name, description } = this.userGroup;
          const exists = this.userGroupList.find((userGroup) => userGroup.id == id);
          if (!exists) {
            this.userGroupList.push({ id, name, description })
          }
        }
      },
      removeFromUserGroupList(index) {
        this.userGroupList.splice(index, 1);
      }
    }
  }
</script>

<style scoped>

</style>
