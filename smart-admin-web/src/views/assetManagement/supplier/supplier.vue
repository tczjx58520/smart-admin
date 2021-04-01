<template>
  <div>
    <Card class="warp-card" dis-hover style="height: calc(100vh)">
      <div style="margin-bottom: 20px">
        <Button
          style="margin-right: 15px"
          @click="getList"
          icon="md-refresh"
          type="default"
          >{{ $t("Reflash") }}</Button
        >
        <Button
          v-privilege="['85-88-1']"
          style="margin-right: 15px"
          @click="created"
          icon="md-add"
          type="warning"
          >{{ $t("Create") }}</Button
        >
        <!-- <Button
          v-privilege="['10-16-3']"
          style="margin-right: 15px"
          @click="clear"
          icon="md-close"
          type="error"
          >{{ $t("Delete") }}</Button
        > -->
      </div>
      <Table :columns="columns" :data="data">
        <template slot-scope="{ row, index }" slot="supplierName">
          <Input
            type="text"
            v-model="supplierName"
            v-if="editIndex === index"
          />
          <span v-else>{{ row.supplierName }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="action">
          <div v-if="editIndex === index">
            <Button
              style="margin-right: 16px"
              v-privilege="['85-88-2']"
              type="info"
              @click="handleSave(row, index)"
              >保存</Button
            >
            <Button type="error" @click="handleCancle(row)">取消</Button>
          </div>
          <div v-else>
            <Button style="margin-right: 16px" v-privilege="['85-88-2']"  @click="handleEdit(row, index)"
              >修改</Button
            >
            <Button v-privilege="['85-88-3']"  @click="handleDelete(row, index)">删除</Button>
          </div>
        </template>
      </Table>
    </Card>
  </div>
</template>
<script>
import { supplier } from '@/api/supplier';
export default {
  name: 'supplier',
  data () {
    return {
      searchform: {
        pageNum: 1,
        pageSize: 10
      },
      columns: [
        {
          title: this.$t('supplier'),
          slot: 'supplierName'
        },
        {
          title: this.$t('action'),
          slot: 'action'
        }
      ],
      data: [],
      editIndex: -1, // 当前聚焦的输入框的行数
      supplierName: '', // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editAge: '', // 第二列输入框
      editBirthday: '', // 第三列输入框
      editAddress: '', // 第四列输入框
      edit: false
    };
  },
  mounted () {
    this.getList();
  },
  methods: {
    handleCancle (row) {
      console.log(this.edit);
      if (this.edit && !row.supplierName) {
        this.$Message.warning(this.$t('qsrmc'));
        return false;
      }
      this.edit = false;
      this.editIndex = -1;
    },
    getList () {
      this.$Spin.show({
        render: (h) => {
          return h('div', [
            h('Icon', {
              class: 'demo-spin-icon-load',
              props: {
                type: 'ios-loading',
                size: 18
              }
            }),
            h('div', 'Loading')
          ]);
        }
      });
      const data = {};
      supplier.getstorage(data).then((res) => {
        console.log(res);
        this.data = res.data;
        this.$Spin.hide();
        if (this.edit) {
          this.editIndex = 0;
          this.supplierName = '';
        }
      });
    },
    reset () {},
    created () {
      if (!this.edit) {
        const data = {
          supplierName: ''
        };
        //   this.data.unshift(data);
        supplier.addstorage(data).then(res => {
          this.edit = true;
          this.getList();
        });
      } else {
        this.$Message.warning(this.$t('pleaseEnterEdit'));
      }
    },
    clear () {
      console.log('this.moreWelfare', this.moreWelfare);
      for (const i in this.moreWelfare) {
        let data = {};
        data.id = this.moreWelfare[i].id;
        data.operatId = this.$store.state.user.userLoginInfo.userId;
        supplier.deletestorage(data).then((res) => {
          if (res.ret === 200) {
            this.$Message.success(res.msg);
            this.getList();
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
    },
    handleEdit (row, index) {
      this.supplierName = row.supplierName;
      this.editIndex = index;
    },
    handleSave (row, index) {
      row.supplierName = this.supplierName;
      this.data[index].supplierName = this.supplierName;
      console.log(row);
      if (!this.data[index].supplierName) {
        this.$Message.warning(this.$t('qsrmc'));
        return false;
      }
      this.editIndex = -1;
      supplier.updatestorage(row).then((res) => {
        if (res.ret === 200) {
          this.$Message.success(res.msg);
          this.edit = false;
          this.getList();
        }
      });
      console.log(this.data);
    },
    handleDelete (row, index) {
      supplier.deletestorage(row.id).then((res) => {
        if (res.ret === 200) {
          this.edit = false;
          this.$Message.success(res.msg);
          this.getList();
        } else {
          this.$Message.error(res.msg);
        }
      });
    }
  }
};
</script>
<style lang="less">
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
