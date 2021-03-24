<template>
  <div>
    <Row :gutter="10">
      <Button style="margin-right: 15px"
              @click="getList(0)"
              icon="md-refresh"
              type="default">{{ $t("Reflash") }}</Button>
      <Button v-privilege="['10-16-1']"
              style="margin-right: 15px"
              @click="created"
              icon="md-add"
              type="warning">{{ $t("Create") }}</Button>
      <Button v-privilege="['10-16-3']"
              style="margin-right: 15px"
              @click="clear"
              icon="md-close"
              type="error">{{ $t("Delete") }}</Button>
    </Row>
    <Row :gutter="10">
      <!--菜单管理-->
      <Col :lg="6"
           :md="8">
      <Card class="warp-card"
            dis-hover>
        <div class="card-title"
             slot="title">
          <Icon type="ios-switch"></Icon>菜单管理
        </div>
        <Tree :data="data1"
              :load-data="loadData"
              @on-select-change="handleSelect"></Tree>
      </Card>
      </Col>
      <Col :lg="18"
           :md="16">
      <Card class="warp-card"
            dis-hover
            style="margin-bottom: 100px">
        <div class="card-title"
             slot="title">
          <Icon type="ios-cog"></Icon>详细信息
        </div>
        <div slot="extra">
          <Button @click="addBatchSavePoints"
                  icon="ios-albums-outline"
                  type="primary"
                  size="small">保存修改</Button>
        </div>
        <Row>
          <Form :label-width="100"
                :model="detailItem">
            <FormItem :label="$t('classificationName')">
              <Input v-model="detailItem.classifyName"></Input>
            </FormItem>
            <FormItem label="分类编码">
              <Input v-model="detailItem.classifyNo"></Input>
            </FormItem>
            <FormItem :label="$t('classificationParent')">
              <Select v-model="detailItem.parentId"
                      clearable>
                <Option :value="0">{{ $t("wu") }}</Option>
                <Option v-for="item in parentList"
                        :value="item.id"
                        :key="item.id">{{ item.title }}</Option>
              </Select>
            </FormItem>
          </Form>
        </Row>
      </Card>
      </Col>
    </Row>
    <Modal @on-cancel="cancelSaveData"
           @on-ok="validateAndAddPosition"
           :title="$t('addsignature')"
           v-model="isShowAddModal">
      <Form :label-width="100"
            :model="saveItem">
        <FormItem label="分类编码">
          <Input :maxlength="30"
                 v-model="saveItem.classifyNo"></Input>
        </FormItem>
        <FormItem :label="$t('classificationName')">
          <Input :maxlength="30"
                 v-model="saveItem.classifyName"></Input>
        </FormItem>
        <FormItem :label="$t('classificationParent')">
          <Select v-model="saveItem.parentId"
                  clearable>
            <Option :value="0">{{ $t("wu") }}</Option>
            <Option v-for="item in parentList"
                    :value="item.id"
                    :key="item.id">{{ item.title }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { classification } from '@/api/classification';
const defaultForm = {
  classifyName: '',
  parentId: 0
};
export default {
  name: 'classification',
  data () {
    return {
      data1: [],
      isShowAddModal: false,
      saveItem: Object.assign({}, defaultForm),
      detailItem: {},
      parentList: []
    };
  },
  mounted () {
    this.getList();
  },
  methods: {
    loadData (item, callback) {
      const data = {
        parentId: item.id
      };
      classification.getstorage(data).then((res) => {
        console.log(111111111111, res);
        const data = res.data.map((items) => {
          return {
            title: items.classifyName,
            id: items.id,
            parentId: item.id,
            classifyNo: items.classifyNo
          };
        });
        callback(data);
      });
    },
    getList (val) {
      const data = {
        parentId: val || 0
      };
      classification.getstorage(data).then((res) => {
        console.log('res=======', res.data);
        const data = res.data.map((item) => {
          return {
            loading: false,
            title: item.classifyName,
            classifyNo: item.classifyNo,
            id: item.id,
            parentId: 0,
            children: []
          };
        });
        this.data1 = data;
        this.parentList = data;
      });
    },
    created () {
      console.log('新建=============');
      this.isShowAddModal = true;
    },
    clear () {
      console.log(this.detailItem);
      this.$Modal.confirm({
        title: this.$t('friendlyNotice'),
        content: this.$t('sureDel3'),
        onOk: () => {
          const data = {
            id: this.detailItem.id
          };
          classification.deletestorage(data).then(res => {
            if (res.ret === 200) {
              this.$Message.success(res.msg);
              this.getList();
            }
          });
        }
      });
    },
    cancelSaveData () {
      this.isShowAddModal = false;
    },
    validateAndAddPosition () {
      this.isShowAddModal = false;
      classification.addstorage(this.saveItem).then((res) => {
        if (res.ret === 200) {
          this.$Message.success(this.$t('tj'));
          this.saveItem = Object.assign({}, defaultForm);
          this.getList();
        }
      });
    },
    handleSelect (array, item) {
      console.log(3333333);
      console.log(array, item);
      this.detailItem = Object.assign({}, item);
      this.detailItem.classifyName = this.detailItem.title;
      console.log(123123, this.detailItem);
    },
    addBatchSavePoints () {
      if (!this.detailItem.id) {
        this.$Message.warning(this.$t('qxzxgx'));
        return false;
      }
      classification.updatestorage(this.detailItem).then((res) => {
        if (res.ret === 200) {
          this.$Message.success(this.$t('UpdateOk'));
          this.detailItem = Object.assign({}, defaultForm);
          this.getList();
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
