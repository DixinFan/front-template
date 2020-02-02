import EditItem from './component';

export default {
  data() {
    return {
      editProps: this.getDefaultEditProp(),
    }
  },
  components: {
    EditItem,
  },
  methods: {
    getDefaultEditProp() {
      return {
        create: true,
        show: false,
        form: {
          id: '',
          name: '',
          description: '',
        },
      }
    },
    addData() {
      const editProps = this.getDefaultEditProp();
      editProps.show = true;
      this.editProps = editProps;
    },
    updateData(index) {
      const oldData = this.dataList[index];
      if (!oldData) {
        return;
      }
      const copy = JSON.parse(JSON.stringify(oldData));
      const editProps = this.getDefaultEditProp();
      editProps.show = true;
      editProps.create = false;
      editProps.form = copy;
      this.editProps = editProps;
    }
  },
}
