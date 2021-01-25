<template>
  <div>
    <Card class="warp-card" dis-hover style="height: calc(100vh - 75px)">
      <div style="margin-bottom: 20px">
        <Button
          style="margin-right: 15px"
          @click="handleBack"
          icon="md-refresh"
          type="default"
          >{{ $t("Back") }}</Button
        >
        <Button
          v-privilege="['10-12-1']"
          v-if="addformbase.status === 0 "
          style="margin-right: 15px"
          @click="addGong"
          icon="md-add"
          type="warning"
          >{{ $t("Tjwj") }}</Button
        >
        <Button
          v-privilege="['10-12-1']"
          v-if="addformbase.status === 0 "
          style="margin-right: 15px"
          @click="handleProcess"
          icon="md-add"
          type="warning"
          >{{ $t("Process") }}</Button
        >
        <Button
          v-privilege="['10-12-1']"
          v-if="addformbase.status === 0 "
          style="margin-right: 15px"
          @click="endEvent"
          icon="md-add"
          type="warning"
          >{{ $t("Ending") }}</Button
        >
        <Button
          v-privilege="['10-12-3']"
          style="margin-right: 15px"
          icon="md-close"
          type="error"
          @click="delEvent"
          >{{ $t("Delete") }}</Button
        >
      </div>
      <Tabs :animated="false">
        <TabPane v-privilege="['10-12-4']" :label="$t('BaseData')">
          <Form
          ref="form"
          :model="addformbase"
          label-position="right"
          :label-width="100"
          inline
        >
          <Row>
            <Col span="24">
              <FormItem :label="$t('shijianbiaoti')" style="width: 100%;height:60px" prop="title">
                <span>{{ addformbase.title }}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('lianxiren')" style="width: 100%;height:60px" prop="contactName">
                <span> {{ addformbase.contactName }}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('shijianfang')" style="width: 100%;height:60px" >
                <span>{{ addformbase.organizationName }}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('chuliren')" style="width: 100%;height:60px" prop="handPersonName">
                <span>{{ addformbase.handPersonName }}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('shijianshijian')" style="width: 100%;height:60px">
                <span>{{ addformbase.createtimeStr }}</span>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem :label="$t('shijianneirong')" style="width: 100%;height:60px" prop="content">
                <span> {{ addformbase.content }}</span>
              </FormItem>
            </Col>
          </Row>
        </Form>
        </TabPane>
        <TabPane v-privilege="['10-11-4']" :label="$t('gengjingjilu')">
          <Table
            :columns="processColumns"
            :data="processData"
            :loading="Sheloading"
          ></Table>
        </TabPane>
        <TabPane v-privilege="['10-11-4']" :label="$t('wendangqu')">
          <!-- <Table
            :columns="Shecolumns"
            :data="Shedata"
            :loading="Sheloading"
          ></Table> -->
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import { publicEventsList } from '@/api/publicEventsList';
import { utils } from '@/lib/util';
export default {
  name: 'publicEventsDetail',
  components: {},
  props: {},
  data () {
    return {
      addformbase: {},
      //   社保
      Shevisiable: false,
      Sheloading: false,
      Shesearchform: {
        pageNum: 1,
        pageSize: 10
      },
      // table表头
      processColumns: [
        {
          title: this.$t('genjinshijian'),
          key: 'finishTime',
          render: (h, params) => {
            let date = 'N/A';
            if (params.row.finishTime) {
              const temp = new Date(params.row.finishTime);
              date = utils.getDate(temp, 'YMDHM');
            }
            return h('span', date);
          }
        },
        {
          title: this.$t('genjinren'),
          key: 'handPersonName'
        },
        {
          title: this.$t('genjinfangshi'),
          key: 'followWay'
        },
        {
          title: this.$t('genjinneirong'),
          key: 'followContent',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  style: {
                    display: 'inline-block',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  },
                  domProps: {
                    innerHTML: params.row.followContent
                  }
                },
                ''
              )
            ]);
          }
        }
      ],
      processData: [],
      // table数据
      Shedata: [],
      moreGong: [],
      moreShe: []
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {},
  mounted () {
    this.getwelfareList();
    this.getprocessList();
  },
  methods: {
    endEvent () {
      this.$Modal.confirm({
        title: this.$t('friendlyNotice'),
        content: this.$t('sureending'),
        onOk: () => {
          const data = {
            id: this.$route.query.id,
            status: 1
          };
          publicEventsList.updatestorage(data).then(res => {
            if (res.ret === 200) {
              this.$router.closeCurrentPage();
              this.$Message.success(res.msg);
            }
          });
        }
      });
    },
    delEvent () {
      this.$Modal.confirm({
        title: this.$t('friendlyNotice'),
        content: this.$t('sureDel'),
        onOk: () => {
          const data = {
            id: this.$route.query.id
          };
          publicEventsList.deletestorage(data).then(res => {
            if (res.ret === 200) {
              this.$router.closeCurrentPage();
              this.$Message.success(res.msg);
            }
          });
        }
      });
    },
    handleProcess () {
      this.$router.push({ path: '/publicRelationShip/followPublicEvents', query: { id: this.$route.query.id } });
    },
    handleBack () {
      this.$router.closeCurrentPage();
    },
    async getwelfareList () {
      const searchform = {
        pageNum: 1,
        pageSize: 99,
        id: this.$route.query.id
      };
      try {
        let result = await publicEventsList.getstorage(searchform);
        this.addformbase = Object.assign({}, result.data.list[0]);
        this.addformbase.handPersonName = this.addformbase.handlePersonName;
        this.addformbase.organizationName = this.addformbase.eventParty;
        const temp = new Date(this.addformbase.createtime);
        const date = utils.getDate(temp, 'YMDHM');
        this.addformbase.createtimeStr = date;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.loading = false;
      }
    },
    async getprocessList () {
      const searchform = {
        pageNum: 1,
        pageSize: 99,
        id: this.$route.query.id
      };
      try {
        let result = await publicEventsList.getFollowStorage(searchform);
        this.processData = result.data.list;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
      }
    },
    handleDelete () {
      this.$Modal.confirm({
        title: '友情提醒',
        content: '确定要删除吗？',
        onOk: () => {
          const data = {
            id: this.$route.query.id
          };
          publicEventsList.deletestorage(data).then(res => {
            this.$Message.success(this.$t('sccg'));
            this.getwelfareList();
          });
        }
      });
    },
    // 翻页
    GongchangePage (pageNum) {
      this.searchform.pageNum = pageNum;
      this.getGongList();
    },
    // 改变一页展示数
    GongchangePageSize (pageSize) {
      this.Gongsearchform.pageNum = 1;
      this.Gongsearchform.pageSize = pageSize;
      this.getGongList();
    },
    // 重置
    resetGong () {
      this.getGongList();
    },
    addGong () {
      this.Gongvisiable = true;
    },
    // 重置
    resetShe () {
      this.getSheList();
    },
    addShe () {
      this.Shevisiable = true;
    },
    updateStat_gong (state) {
      this.Gongvisiable = state;
      this.getGongList();
    },
    updateStat_she (state) {
      this.Shevisiable = state;
      this.getSheList();
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-form-item {
  margin-bottom: 0;
}
</style>
