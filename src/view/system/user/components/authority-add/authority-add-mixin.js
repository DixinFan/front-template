import AuthorityAdd from './component';

export default {
  data() {
    return {
      authorityAddProps: this.getDefaultAuthorityAddProps(),
    }
  },
  components: {
    AuthorityAdd,
  },
  methods: {
    getDefaultAuthorityAddProps() {
      return {
        show: false,
        id: 0,
      }
    },
    addAuthority(index) {
      const authorityGroup = this.dataList[index];
      if (!authorityGroup) {
        return;
      }
      const authorityAddProps = this.getDefaultAuthorityAddProps();
      authorityAddProps.show = true;
      authorityAddProps.id = authorityGroup.id;
      this.authorityAddProps = authorityAddProps;
    }
  },
}
