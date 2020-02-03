import UserAdd from './component';

export default {
  data() {
    return {
      userAddProps: this.getDefaultUserAddProps(),
    }
  },
  components: {
    UserAdd,
  },
  methods: {
    getDefaultUserAddProps() {
      return {
        show: false,
        id: 0,
      }
    },
    addUser(index) {
      const userGroup = this.dataList[index];
      if (!userGroup) {
        return;
      }
      const userAddProps = this.getDefaultUserAddProps();
      userAddProps.show = true;
      userAddProps.id = userGroup.id;
      this.userAddProps = userAddProps;
    }
  },
}
