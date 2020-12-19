<template>
  <div>
    <Modal
      v-model="mymoadlStat"
      class="add"
      width="1024"
      :closable="false"
      :mask-closable="false"
      :transfer="false"
      :styles="{ top: '10px' }"
    >
      <div slot="header" style="text-align:left;color:#fff;">
        <span>{{ $t("tjzbxmc") }}</span>
      </div>
      <div>
        <Card dis-hover>
          <div
            style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;"
          >
            <div
              style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"
            ></div>
            <div>{{ $t("BaseData") }}</div>
          </div>
          <Divider />
          <Form
            ref="form"
            :model="addformbase"
            label-position="right"
            :label-width="100"
            :rules="ruleValidate"
          >
            <FormItem :label="$t('zbxmc')" prop="itemName">
              <Input v-model="addformbase.itemName"></Input>
            </FormItem>
            <FormItem :label="$t('ms')" prop="desc">
              <Input v-model="addformbase.desc" type="textarea"></Input>
            </FormItem>
          </Form>
        </Card>
      </div>
      <div slot="footer">
        <ButtonGroup>
          <Button
            type="primary"
            size="large"
            :loading="modal_loading"
            @click="handsave"
            >{{ $t("Save") }}</Button
          >
          <Button type="error" size="large" @click="cancel">{{
            $t("Close")
          }}</Button>
        </ButtonGroup>
      </div>
    </Modal>
  </div>
</template>
<script>
import Tables from '@/components/tables';
import RoleTree from '../role-tree/role-tree';
import DepartmentEmployeeTree from '../department-employee-tree/department-employee-tree';
import { repoTaskItem } from '@/api/repoTaskItem';
const defaultForm = {
  type: 2,
  itemName: ''
};
export default {
  name: 'addModal',
  components: {
    DepartmentEmployeeTree,
    Tables
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    copyfile: null
  },
  created () {
    //
  },
  data () {
    return {
      typeList: [
        {
          label: this.$t('xtx'),
          value: 1
        },
        {
          label: this.$t('zdyx'),
          value: 2
        }
      ],
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: Object.assign({}, defaultForm),
      ruleValidate: {
        itemName: [
          {
            required: true,
            message: 'The itemName cannot be empty',
            trigger: 'blur'
          }
        ],
        desc: [
          {
            required: true,
            message: 'The desc cannot be empty',
            trigger: 'blur'
          }
        ]
      },
      mydataList: []
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
    }
  },
  methods: {
    cancel () {
      this.$emit('updateStat', false);
      this.addformbase = Object.assign({}, defaultForm);
    },
    handsave () {
      this.modal_loading = true;
      this.$refs['form'].validate(valid => {
        if (valid) {
          repoTaskItem.addTaskItems(this.addformbase).then(res => {
            this.$Message.success(this.$t('addSuccess'));
            this.modal_loading = false;
            this.$emit('updateStat', false);
            this.addformbase = Object.assign({}, defaultForm);
          });
        } else {
          this.$Message.error('Fail!');
          this.modal_loading = false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.add /deep/ .ivu-modal-header {
  background-color: #2d8cf0;
}
.add /deep/ .ivu-modal-content {
  background-color: #eee;
}
.add /deep/ .ivu-modal-footer {
  border: none;
}
.ivu-tree-children {
  cursor: pointer;
  width: 100%;
}
.option-department {
  font-size: 14px;
  padding: 5px;
  cursor: pointer;
}
.option-department:hover {
  background-color: rgba(5, 170, 250, 0.2);
}
.departmentWrap {
  position: absolute;
  background-color: #ffffff;
  padding: 5px;
  border: 1px solid #dedede;
  width: 100%;
  z-index: 9;
  display: none;
  height: 250px;
  overflow-y: scroll;
}
</style>
