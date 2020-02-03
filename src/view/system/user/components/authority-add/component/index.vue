<template>
  <div>
    <Modal v-model="showModal" width="600" title="添加用户权限">
      <div class="add-map-container">
        <div class="map-entity-search">
          <AuthoritySelector v-model="authorityId" @input-all="selectAuthority"></AuthoritySelector>
          <Button @click="addToAuthorityList" type="info" style="margin-left: 20px;">添加</Button>
        </div>
        <div class="mapped-entity-list margin-top-5">
          <Tooltip :content="item.description"  v-for="(item, index) in authorityList">
            <Tag :name="index" color="cyan" type="border" closable @on-close="removeFromAuthorityList">
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
  import AuthoritySelector from '_c/authority-selector';
  import { CommonMapTypeMap } from "@/config/constant";

  export default {
    components: {
      AuthoritySelector,
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
        authorityList: [],
        authority: '',
        authorityId: 0,
      }
    },
    watch: {
      value: {
        deep: true,
        handler(newValue) {
          this.reset();
          this.userId = newValue && newValue.id || 0;
          this.$api.user.query({ id: this.userId }).then(({ data }) => {
            if (data && data.length) {
              const authorityList = data[0].authorityList || [];
              this.authorityList = authorityList.map(authority =>
                ({name: authority.name, id: authority.id, description: authority.description})) || [];
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
        this.authorityList = [];
        this.authority = '';
        this.authorityId = 0;
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
          type: CommonMapTypeMap.USER_MAP_AUTHORITY,
          secondaryKeyList: this.authorityList.map(authority => authority.id) || [],
          primaryKey: this.userId,
        }
        this.$api.commonMap.updateLongLongMap(batchMap).then(() => {
          this.showModal = false;
        }).catch(error => {
          console.log(error)
        })
      },
      selectAuthority(authority) {
        this.authority = authority;
      },
      addToAuthorityList() {
        if (this.authority && this.authority.id) {
          const { id, name, description } = this.authority;
          const exists = this.authorityList.find((authority) => authority.id == id);
          if (!exists) {
            this.authorityList.push({ id, name, description })
          }
        }
      },
      removeFromAuthorityList(index) {
        this.authorityList.splice(index, 1);
      }
    }
  }
</script>

<style scoped>

</style>
