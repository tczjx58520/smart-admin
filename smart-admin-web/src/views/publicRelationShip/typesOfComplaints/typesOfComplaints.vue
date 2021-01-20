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
          v-privilege="['10-16-1']"
          style="margin-right: 15px"
          @click="created"
          icon="md-add"
          type="warning"
          >{{ $t("Create") }}</Button
        >
        <Button
          v-privilege="['10-16-3']"
          style="margin-right: 15px"
          @click="clear"
          icon="md-close"
          type="error"
          >{{ $t("Delete") }}</Button
        >
      </div>
      <Table :columns="columns" :data="data">
        <template slot-scope="{ row, index }" slot="typesOfComplaints">
          <Input
            type="text"
            v-model="complaintsTypeName"
            v-if="editIndex === index"
          />
          <span v-else>{{ row.complaintsTypeName }}</span>
        </template>
        <template slot-scope="{ row }" slot="createPersonName">
          <span>{{ row.createPersonName }}</span>
        </template>
        <template slot-scope="{ row }" slot="createtime">
          <span>{{ row.createtime }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <div v-if="editIndex === index">
            <Button
              style="margin-right: 16px"
              type="info"
              @click="handleSave(row, index)"
              >保存</Button
            >
            <Button type="error" @click="editIndex = -1">取消</Button>
          </div>
          <div v-else>
            <Button style="margin-right: 16px" @click="handleEdit(row, index)"
              >操作</Button
            >
            <Button @click="handleDelete(row, index)">删除</Button>
          </div>
        </template>
      </Table>
    </Card>
  </div>
</template>
<script>
import { typesOfComplaints } from '@/api/typesOfComplaints';
export default {
  name: 'typesOfComplaints',
  data () {
    return {
      searchform: {
        pageNum: 1,
        pageSize: 10
      },
      columns: [
        {
          title: this.$t('typesOfComplaints'),
          slot: 'typesOfComplaints'
        },
        {
          title: this.$t('chuangjianren'),
          slot: 'createPersonName'
        },
        {
          title: this.$t('chuangjianshijian'),
          slot: 'createtime'
        },
        {
          title: this.$t('action'),
          slot: 'action'
        }
      ],
      data: [],
      editIndex: -1, // 当前聚焦的输入框的行数
      complaintsTypeName: '', // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
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
      typesOfComplaints.getstorage(data).then((res) => {
        console.log(res);
        this.data = res.data;
        this.$Spin.hide();
        if (this.edit) {
          this.editIndex = 0;
          this.complaintsTypeName = '';
        }
      });
    },
    reset () {},
    created () {
      const data = {
        complaintsTypeName: '',
        createPersonId: this.$store.state.user.userLoginInfo.userId
      };
      //   this.data.unshift(data);
      typesOfComplaints.addstorage(data).then((res) => {
        this.edit = true;
        this.getList();
      });
    },
    clear () {
      for (const i in this.moreWelfare) {
        let data = {};
        data.id = this.moreWelfare[i].id;
        data.operatId = this.$store.state.user.userLoginInfo.userId;
        typesOfComplaints.deletestorage(data).then((res) => {
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
      this.complaintsTypeName = row.complaintsTypeName;
      this.editIndex = index;
    },
    handleSave (row, index) {
      row.complaintsTypeName = this.complaintsTypeName;
      this.data[index].complaintsTypeName = this.complaintsTypeName;
      console.log(row);
      this.editIndex = -1;
      typesOfComplaints.updatestorage(row).then((res) => {
        if (res.ret === 200) {
          this.$Message.success(res.msg);
          this.edit = false;
          this.getList();
        }
      });
      console.log(this.data);
    },
    handleDelete (row, index) {
      typesOfComplaints.deletestorage(row.id).then((res) => {
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
