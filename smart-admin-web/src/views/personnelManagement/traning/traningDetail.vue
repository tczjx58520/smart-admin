<template>
  <div>
    <Card class="warp-card"
          dis-hover>
      <div style="display:flex;flex-wrap: wrap;">
        <div style="padding:16px;width:30%;">
          <Card style="height:25vh;cursor:pointer;"
                class="position_mid"
                @click.native="additem">
            <div style="height:100%;width:100%;">
              <Icon type="md-add" /> <span>{{ $t("tj") }}</span>
            </div>
          </Card>
        </div>
        <div style="padding:16px;width:30%;"
             v-for="(item, index) in items"
             :key="index">
          <Card style="height:25vh;cursor:pointer;">
            <div style="height:100%;width:100%;display:flex;">
              <div class="detail_left"
                   style="height:100px;">
                <Icon type="md-filing"
                      size="25" />
              </div>
              <div class="detail_right">
                <div class="title">{{ item.materialName }}</div>
                <div class="content">
                  <p v-html="item.materialBody"></p>
                </div>
              </div>
            </div>
            <div style="display:flex;justify-content: space-around;"
                 class="bottom_menu">
              <Poptip confirm
                      :title="$t('isokdel')"
                      @on-ok="ok_del(item.id,item.attachments)"
                      @on-cancel="cancel_del">
                <Button type="text">{{ $t("sc") }}</Button>
              </Poptip>
              <span style="color:#ebebeb;">|</span>
              <Button type="text"
                      @click.native="editItem(item)">{{ $t("Edit") }}</Button>
            </div>
          </Card>
        </div>
      </div>
    </Card>
    <!-- 添加类型 -->
    <add-detail-modal :modalstat="addDialog"
                      @updateStat="updateStat" />
    <edit-dialog :modalstat="editDialog"
                 :editInfo="editInfo"
                 @updateStat="updateStat_edit" />
  </div>
</template>
<script>
import AddDetailModal from './components/addmodal/add-detail-modal.vue';
import { training } from '@/api/traning';
import EditDialog from './components/editmodal/editmodal.vue';
const defaultform = {
  name: '',
  des: ''
};
export default {
  name: 'traning',
  components: { AddDetailModal, EditDialog },
  props: {},
  data () {
    return {
      items: [],
      addformbase: Object.assign({}, defaultform),
      typeDialog: false,
      ruleInline: {
        user: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      },
      addDialog: false,
      editDialog: false,
      editInfo: null
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () { },
  mounted () {
    this.getItemList();
  },
  methods: {
    ok_del (id, attachment) {
      console.log(attachment);
      const ids = [];
      for (let i = 0; i < attachment.length; i++) {
        ids.push(attachment[i].id);
      }
      const data = {
        picId: ids
      };
      training.delPic(data).then(res => {
        console.log(res);
      });
      // training.delTrainingDetail(id).then(res => {
      //   this.$Message.success(this.$t('sccg'));
      //   this.getItemList();
      // });
    },
    cancel_del () { },
    getItemList () {
      training.getTrainingDetail(this.$route.query.id).then(res => {
        console.log(res);
        this.items = res.data;
      });
    },
    updateStat (stat, value) {
      this.addDialog = stat;
      this.getItemList();
    },
    updateStat_edit (stat, value) {
      this.editDialog = stat;
    },
    additem () {
      this.addDialog = true;
    },
    editItem (value) {
      console.log('执行=====', value);
      this.editInfo = value;
      this.editDialog = true;
    },
    ok () {
      const data = {
        materialName: this.addformbase.materialName,
        materialBody: this.addformbase.materialBody,
        icon: ''
      };
      this.items.unshift(data);
    },
    cancel () {
      this.typeDialog = false;
    }
  }
};
</script>
<style lang="less" scoped>
.position_mid {
  display: flex;
  justify-content: center;
  align-items: center;
}
.detail_left {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.detail_right {
  flex: 4;
  .title {
    font-size: 24px;
    margin-bottom: 16px;
  }
  .content {
    font-size: 16px;
    line-height: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    justify-content: space-around;
  }
}
.bottom_menu {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #f7f9fa;
  height: 50px;
  align-items: center;
}
</style>
