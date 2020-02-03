import UserGroupAdd from './component';

export default {
  data() {
    return {
      userGroupAddProps: this.getDefaultUserGroupAddProps(),
    }
  },
  components: {
    UserGroupAdd,
  },
  methods: {
    getDefaultUserGroupAddProps() {
      return {
        show: false,
        id: 0,
      }
    },
    addUserGroup(index) {
      const userGroupGroup = this.dataList[index];
      if (!userGroupGroup) {
        return;
      }
      const userGroupAddProps = this.getDefaultUserGroupAddProps();
      userGroupAddProps.show = true;
      userGroupAddProps.id = userGroupGroup.id;
      this.userGroupAddProps = userGroupAddProps;
    }
  },
}
