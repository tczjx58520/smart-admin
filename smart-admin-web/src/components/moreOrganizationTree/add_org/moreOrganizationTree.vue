<template>
    <Modal v-model="mymoadlStat" class="add" width="460" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
            <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('processDesign_view.TipOrganization') }}</span>
            </div>
            <div>
            <Card dis-hover>
                <div class="department-wrap">
                  <DepartmentEmployeeTree
                    :isDepartment="mymoadlStat"
                    :memberId="memberId"
                    :type="type"
                    @addmyorg = "addorg"
                    ref="departmentEmployeeTree"
                  ></DepartmentEmployeeTree>
                </div>
            </Card>

            </div>
            <div slot="footer">
            <ButtonGroup>
                <Button type="primary" size="large" :loading="modal_loading" @click="handsave">{{ $t('Save') }}</Button>
                <Button type="error" size="large"  @click="cancel">{{ $t('Close') }}</Button>
            </ButtonGroup>
            </div>
        </Modal>
</template>
<script>
import DepartmentEmployeeTree from '../department-employee-tree/department-employee-tree';
export default {
  name: 'moreOrganizationTree',
  components: {
    DepartmentEmployeeTree
  },
  props: {
    modalstat: null,
    type: null,
    memberId: null
  },
  data () {
    return {
      mymoadlStat: false,
      addformbase: {},
      modal_loading: false
    };
  },
  watch: {
    modalstat () {
      console.log('test123')
      this.mymoadlStat = this.modalstat;
    }
  },
  methods: {
    addorg (selection) {
      // console.log('selection==========>', selection);
      // console.log(selection.map(item => { return item.title; }).join(','));
      this.addformbase.organizationOaName = selection.map(item => { return item.title; }).join(',');
      this.addformbase.organizationOa = selection.map(item => { return item.id; });
      // console.log(this.addformbase.organizationOaName);
    },
    ok () {
      this.$Message.info('Clicked ok');
    },
    handsave () {
      // console.log(this.addformbase)
      this.modal_loading = true;
      setTimeout(() => {
        this.$emit('moreOrganizationData', this.addformbase)
      this.$emit('update:modalstat', false);
        this.mymoadlStat = false
        this.modal_loading = false;
      }, 1000);
    },
    cancel () {
      this.mymoadlStat = false
      this.$emit('update:modalstat', false);
    }
  }
};
</script>
