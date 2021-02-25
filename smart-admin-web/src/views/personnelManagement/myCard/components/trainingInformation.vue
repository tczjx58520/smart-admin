<template>
<div>
  <TabPane :label="$t('peixunjl')" name="name10">
      <div style="display: flex; align-items: center">
        <div
          style="
            width: 4px;
            height: 20px;
            background: #2d8cf0;
            margin-right: 15px;
          "
        ></div>
        <div>{{ $t("peixunjilu") }}</div>
      </div>
      <Divider />
      <Table stripe :columns="columns1" :data="data1">
        <template slot-scope="{ row }" slot="traningName">
          <strong>{{ row.traningName }}</strong>
        </template>
        <template slot-scope="{ row }" slot="beginTime">
          <strong>{{ row.beginTime }}</strong>
        </template>
        <template slot-scope="{ row }" slot="endTime">
          <strong>{{ row.endTime }}</strong>
        </template>
        <template slot-scope="{ row }" slot="result">
          <strong>{{ row.result }}</strong>
        </template>
      </Table>

      <div style="display: flex; align-items: center">
        <div
          style="
            width: 4px;
            height: 20px;
            background: #2d8cf0;
            margin-right: 15px;
          "
        ></div>
        <div>{{ $t("peixunanpai") }}</div>
      </div>
      <Divider />
      <Table stripe :columns="columns2" :data="data2">
        <template slot-scope="{ row }" slot="traningName">
          <strong>{{ row.traningName }}</strong>
        </template>
        <template slot-scope="{ row }" slot="orangizeName">
          <strong>{{ row.orangizeName }}</strong>
        </template>
        <template slot-scope="{ row }" slot="beginTime">
          <strong>{{ row.beginTime }}</strong>
        </template>
        <template slot-scope="{ row }" slot="endTime">
          <strong>{{ row.endTime }}</strong>
        </template>
        <template slot-scope="{ row }" slot="traningPlace">
          <strong>{{ row.traningPlace }}</strong>
        </template>
      </Table>

      <div style="display: flex; align-items: center">
        <div
          style="
            width: 4px;
            height: 20px;
            background: #2d8cf0;
            margin-right: 15px;
          "
        ></div>
        <div>{{ $t("kaoshijilu") }}</div>
      </div>
      <Divider />
      <Table stripe :columns="columns3" :data="data3">
        <template slot-scope="{ row }" slot="examName">
          <strong>{{ row.examName }}</strong>
        </template>
        <template slot-scope="{ row }" slot="examScore">
          <strong>{{ row.examScore }}</strong>
        </template>
        <template slot-scope="{ row }" slot="examTime">
          <strong>{{ row.examTime }}</strong>
        </template>
      </Table>
  </TabPane>
</div>
</template>
<script>
export default {
  name: 'userInfo_tab',
  components: {},
  props: {},
  data () {
    return {
      columns1: [
        {
          title: this.$t('kaoshizhiti'),
          slot: 'traningName'
        },
        {
          title: this.$t('kaishishijian'),
          slot: 'beginTime'
        },
        {
          title: this.$t('jieshushijian'),
          slot: 'endTime'
        },
        {
          title: this.$t('kaopinqingkuang'),
          slot: 'result'
        }
      ],
      data1: [
        {
          traningName: '技能培训',
          result: '良好',
          endTime: '2020-12-19 14:06:00',
          beginTime: '2020-12-30 24:00:00'
        }
      ],
      columns2: [
        {
          title: this.$t('peixunzhuti'),
          slot: 'traningName'
        },
        {
          title: this.$t('zuzhiren'),
          slot: 'orangizeName'
        },
        {
          title: this.$t('kaishishijian'),
          slot: 'beginTime'
        },
        {
          title: this.$t('jieshushijian'),
          slot: 'endTime'
        },
        {
          title: this.$t('peixundidian'),
          slot: 'traningPlace'
        }
      ],
      data2: [
        {
          traningName: '技能培训',
          orangizeName: '沈中平',
          beginTime: '2020-12-19 14:06:00',
          endTime: '2020-12-30 24:00:00',
          traningPlace: '南京嗯哇'
        }
      ],
      columns3: [
        {
          title: this.$t('kaoshimingcheng'),
          slot: 'examName'
        },
        {
          title: this.$t('kaoshifenshu'),
          slot: 'examScore'
        },
        {
          title: this.$t('kaoshishijian'),
          slot: 'examTime'
        }
      ],
      data3: [
        {
          examName: '考试培训',
          examScore: '90',
          examTime: '2020-12-19 14:06:00'
        }
      ]
    };
  },
  computed: {
  },
  watch: {},
  filters: {},
  created () {},
  mounted () {},
  methods: {}
};
</script>
<style lang="less" scoped>
</style>
