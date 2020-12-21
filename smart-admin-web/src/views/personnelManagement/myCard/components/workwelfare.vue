<template>
  <div>
    <TabPane :label="$t('gzfl')" name="name6">
      <div style="display: flex; align-items: center">
        <div
          style="
            width: 4px;
            height: 20px;
            background: #2d8cf0;
            margin-right: 15px;
          "
        ></div>
        <div>{{ $t("BaseData") }}</div>
      </div>
      <Form
        :model="showformBase"
        label-position="left"
        :label-width="100"
        inline
        style="padding: 24px"
      >
        <FormItem :label="$t('gongzizhanghuming')" style="width: 48%">
          <span>5465456462316</span>
        </FormItem>
        <FormItem :label="$t('yinghang')" style="width: 48%">
          <span>南京招商银行</span>
        </FormItem>
        <FormItem :label="$t('zhanghao')" style="width: 48%">
          <span>54554566</span>
        </FormItem>
        <FormItem :label="$t('gongjijinzhanghu')" style="width: 48%">
          <span>58894565</span>
        </FormItem>
        <FormItem :label="$t('shebaohao')" style="width: 48%">
          <span>23165463</span>
        </FormItem>
      </Form>

      <div style="display: flex; align-items: center">
        <div
          style="
            width: 4px;
            height: 20px;
            background: #2d8cf0;
            margin-right: 15px;
          "
        ></div>
        <div>{{ $t("zuixingongzidan") }}</div>
      </div>
      <Divider />
      <Table stripe :columns="columns1" :data="data1">
        <template slot-scope="{ row }" slot="myDate">
          <strong>{{ row.myDate }}</strong>
        </template>
        <template slot-scope="{ row }" slot="baseSalary">
          <strong>{{ row.baseSalary }}</strong>
        </template>
        <template slot-scope="{ row }" slot="shouldSalary">
          <strong>{{ row.shouldSalary }}</strong>
        </template>
        <template slot-scope="{ row }" slot="actuallySalary">
          <strong>{{ row.actuallySalary }}</strong>
        </template>
        <template slot-scope="{ row }" slot="personTax">
          <strong>{{ row.personTax }}</strong>
        </template>
        <template slot-scope="{ row }" slot="socialSecurity">
          <strong>{{ row.socialSecurity }}</strong>
        </template>
        <template slot-scope="{ row }" slot="accumulationFund">
          <strong>{{ row.accumulationFund }}</strong>
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
        <div>{{ $t("lishigongzidan") }}</div>
      </div>
      <Divider />
      <Table stripe :columns="columns1" :data="data2">
        <template slot-scope="{ row }" slot="myDate">
          <strong>{{ row.myDate }}</strong>
        </template>
        <template slot-scope="{ row }" slot="baseSalary">
          <strong>{{ row.baseSalary }}</strong>
        </template>
        <template slot-scope="{ row }" slot="shouldSalary">
          <strong>{{ row.shouldSalary }}</strong>
        </template>
        <template slot-scope="{ row }" slot="actuallySalary">
          <strong>{{ row.actuallySalary }}</strong>
        </template>
        <template slot-scope="{ row }" slot="personTax">
          <strong>{{ row.personTax }}</strong>
        </template>
        <template slot-scope="{ row }" slot="socialSecurity">
          <strong>{{ row.socialSecurity }}</strong>
        </template>
        <template slot-scope="{ row }" slot="accumulationFund">
          <strong>{{ row.accumulationFund }}</strong>
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
        <div>{{ $t("gongzitiaozhengjilu") }}</div>
      </div>
      <Divider />
      <Table stripe :columns="columns2" :data="data3">
        <template slot-scope="{ row }" slot="doProject">
          <strong>{{ row.doProject }}</strong>
        </template>
        <template slot-scope="{ row }" slot="doDate">
          <strong>{{ row.doDate }}</strong>
        </template>
        <template slot-scope="{ row }" slot="beforeSalary">
          <strong>{{ row.beforeSalary }}</strong>
        </template>
        <template slot-scope="{ row }" slot="doType">
          <strong>{{ row.doType }}</strong>
        </template>
        <template slot-scope="{ row }" slot="muchSalary">
          <strong>{{ row.muchSalary }}</strong>
        </template>
        <template slot-scope="{ row }" slot="afterSalary">
          <strong>{{ row.afterSalary }}</strong>
        </template>
        <template slot-scope="{ row }" slot="doPerson">
          <strong>{{ row.doPerson }}</strong>
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
        <div>{{ $t("fulijilu") }}</div>
      </div>
      <Divider />
      <Table stripe :columns="columns3" :data="data4">
        <template slot-scope="{ row }" slot="title">
          <strong>{{ row.title }}</strong>
        </template>
        <template slot-scope="{ row }" slot="content">
          <strong>{{ row.content }}</strong>
        </template>
        <template slot-scope="{ row }" slot="handlePerson">
          <strong>{{ row.handlePerson }}</strong>
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
        <div>{{ $t("jiaqixinxi") }}</div>
      </div>
      <Divider />
      <Table stripe :columns="firstColumns" :data="data5">
        <template slot-scope="{ row }" slot="annualLeaveTotalDays">
          <strong>{{ row.annualLeaveTotalDays }}</strong>
        </template>
        <template slot-scope="{ row }" slot="annualLeaveUsedDays">
          <strong>{{ row.annualLeaveUsedDays }}</strong>
        </template>
        <template slot-scope="{ row }" slot="annualLeaveRemainDays">
          <strong>{{ row.annualLeaveRemainDays }}</strong>
        </template>
        <template slot-scope="{ row }" slot="exchangeDayRemain">
          <strong>{{ row.exchangeDayRemain }}</strong>
        </template>
      </Table>
    </TabPane>
  </div>
</template>
<script>
export default {
  name: "userInfo_tab",
  components: {},
  props: {},
  data() {
    return {
      showformBase: {},
      columns1: [
        {
          title: this.$t("riqi"),
          slot: "myDate",
        },
        {
          title: this.$t("jibengongzi"),
          slot: "baseSalary",
        },
        {
          title: this.$t("yingfagongzi"),
          slot: "shouldSalary",
        },
        {
          title: this.$t("shifagongzi"),
          slot: "actuallySalary",
        },
        {
          title: this.$t("geshuikouchu"),
          slot: "personTax",
        },
        {
          title: this.$t("shebaokouchu"),
          slot: "socialSecurity",
        },
        {
          title: this.$t("gongjijinkouchu"),
          slot: "accumulationFund",
        },
      ],
      data1: [
        {
          myDate: "2020-11",
          baseSalary: "5000",
          shouldSalary: "5000",
          actuallySalary: "4200",
          personTax: "0",
          socialSecurity: "700",
          accumulationFund: "100",
        },
      ],
      data2: [
        {
          myDate: "2020-10",
          baseSalary: "5000",
          shouldSalary: "5000",
          actuallySalary: "4200",
          personTax: "0",
          socialSecurity: "700",
          accumulationFund: "100",
        },
        {
          myDate: "2020-9",
          baseSalary: "5000",
          shouldSalary: "5000",
          actuallySalary: "4200",
          personTax: "0",
          socialSecurity: "700",
          accumulationFund: "100",
        },
        {
          myDate: "2020-8",
          baseSalary: "5000",
          shouldSalary: "5000",
          actuallySalary: "4200",
          personTax: "0",
          socialSecurity: "700",
          accumulationFund: "100",
        },
      ],
      columns2: [
        {
          title: this.$t("tiaozhengxiangmu"),
          slot: "doProject",
        },
        {
          title: this.$t("tiaozhengriqi"),
          slot: "doDate",
        },
        {
          title: this.$t("tiaozhengqianxingzi"),
          slot: "beforeSalary",
        },
        {
          title: this.$t("tiaozhengleixing"),
          slot: "doType",
        },
        {
          title: this.$t("tiaozhengjine"),
          slot: "muchSalary",
        },
        {
          title: this.$t("tiaozhenghouxinzi"),
          slot: "afterSalary",
        },
        {
          title: this.$t("tiaozhengren"),
          slot: "doPerson",
        },
      ],
      data3: [
        {
          doProject: "erp",
          doDate: "2020-10-09 12:00:00",
          beforeSalary: "3000",
          doType: "研究项目",
          muchSalary: "2000",
          afterSalary: "5000",
          doPerson: "沈中平",
        },
      ],

      columns3: [
        {
          title: this.$t("biaoti"),
          slot: "title",
        },
        {
          title: this.$t("neirong"),
          slot: "content",
        },
        {
          title: this.$t("tianjiaren"),
          slot: "handlePerson",
        },
      ],
      data4: [
        {
          title: '端午福利',
          content: '端午发福利啦',
          handlePerson: '王雪敏'
        }
        
      ],

      firstColumns: [
        {
          title: this.$t("kqgl.nj"),
          key: "annualLeaveTotalDays",
        },
        {
          title: this.$t("kqgl.yxnj"),
          key: "annualLeaveUsedDays",
          editable: true,
          editType: "input",
        },
        {
          title: this.$t("kqgl.wxnj"),
          key: "annualLeaveRemainDays",
        },
        {
          title: this.$t("kqgl.sytx"),
          key: "exchangeDayRemain",
        },
      ],
      data5: [
        {
          annualLeaveTotalDays: 6,
          annualLeaveUsedDays: 1,
          annualLeaveRemainDays: 5,
          exchangeDayRemain: 3
        }
      ],
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped></style>
