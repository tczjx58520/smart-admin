<template>
  <div>
    <Card class="warp-card" dis-hover style="height: calc(100vh)">
      <div style="display: flex">
        <div style="flex: 1">
          <div style="display: flex; align-items: center">
            <div
              style="
                width: 4px;
                height: 20px;
                background: #2d8cf0;
                margin-right: 15px;
              "
            ></div>
            <div>{{ $t("tousuleixingfenlei") }}</div>
          </div>
          <div style="padding: 20px">
            <Tag
              v-for="item in classList"
              size="large"
              :value="item.id"
              :key="item.id"
              color="default"
              >
                <span style="font-weight: 700;">{{ item.complaintsTypeName }}   </span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span style="font-style:italic;">{{ item.count }}</span>
              </Tag
            >
          </div>
        </div>
        <Divider type="vertical" style="height: calc(100vh)" />
        <div style="flex: 3">
          <Card>
            <p slot="title">
              <Icon :size="20" type="ios-clipboard" color="#f66c54"></Icon>
              {{ $t("kehutousufenxi") }}
            </p>
            <Row :gutter="16">
              <Col span="3">
                <Select v-model="jungleType" @on-change="handleChangeType">
                  <OptionGroup :label="$t('year')">
                    <Option
                      v-for="item in yearList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</Option
                    >
                  </OptionGroup>
                  <OptionGroup :label="$t('month')">
                    <Option
                      v-for="item in monthList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</Option
                    >
                  </OptionGroup>
                  <OptionGroup :label="$t('week')">
                    <Option
                      v-for="item in weekList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</Option
                    >
                  </OptionGroup>
                </Select>
              </Col>
              <Col span="3">
                <Select v-model="selectType" @on-change="handleSelectType" filterable>
                    <Option
                      :value="0"
                      >{{ this.$t('all') }}</Option
                    >
                    <Option
                      v-for="(item,index) in classList"
                      :value="item.complaintsTypeName"
                      :key="index"
                      >{{ item.complaintsTypeName }}</Option
                    >
                </Select>
              </Col>
            </Row>
            <div>
              <ChartLine :value="lineData" :value2="xName"/>
              <Spin size="large" fix v-if="spinShow"></Spin>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import { typesOfComplaints } from '@/api/typesOfComplaints';
import ChartLine from './components/chart-line';
import { utils } from '@/lib/util';
const defaultForm = {
  type: 3
};
export default {
  name: 'customerCenter',
  components: {
    ChartLine
  },
  data () {
    return {
      classList: [],
      yearList: [
        {
          value: 1,
          label: this.$t('toYear')
        },
        {
          value: 2,
          label: this.$t('lastYear')
        }
      ],
      monthList: [
        {
          value: 3,
          label: this.$t('toMonth')
        },
        {
          value: 4,
          label: this.$t('lastMonth')
        }
      ],
      weekList: [
        {
          value: 5,
          label: this.$t('toWeek')
        },
        {
          value: 6,
          label: this.$t('lastWeek')
        }
      ],
      lineData: {},
      jungleType: 5,
      queryForm: Object.assign({}, defaultForm),
      xName: [],
      spinShow: false,
      selectType: 0,
      tempList: null
    };
  },
  mounted () {
    this.getList();
    this.getWeek();
    this.queryChart();
  },
  methods: {
    handleSelectType (val) {
      const AllType = 0;
      if (this.selectType === AllType) {
        this.lineData = this.tempList;
        return false;
      }
      const temp = this._.cloneDeep(this.tempList);
      for (const key in temp) {
        if (key !== this.selectType) {
          delete temp[key];
        }
      }
      this.lineData = temp;
    },
    getList () {
      const data = {};
      typesOfComplaints.getallstorage(data).then((res) => {
        console.log(res);
        this.classList = res.data;
      });
    },
    handleChangeType (val) {
      const YearType = 1;
      const MonthType = 2;
      const WeekTypeTo = 3;
      const WeekTypeLast = 4;
      const typeMap = {
        1: YearType,
        2: YearType,
        3: MonthType,
        4: MonthType,
        5: WeekTypeTo,
        6: WeekTypeLast
      };
      this.queryForm.type = typeMap[val];
      const ToYear = 1;
      const lastYear = 2;
      const ToMonth = 3;
      const lastMonth = 4;
      const ToWeek = 5;
      const lastWeek = 6;
      const TOType = 1;
      const LastType = 2;
      switch (val) {
        case ToYear:
          this.getYear(TOType);
          break;
        case lastYear:
          this.getYear(LastType);
          break;
        case ToMonth:
          this.getMonth(TOType);
          break;
        case lastMonth:
          this.getMonth(LastType);
          break;
        case ToWeek:
          this.getWeek();
          break;
        case lastWeek:
          this.getWeek();
          break;
        default:
          this.$Message.warning(this.$t('wrong'));
          break;
      }
      this.queryChart();
    },
    getYear (type) {
      const TOType = 1;
      const LastType = 2;
      const date = new Date();
      if (type === TOType) {
        this.queryForm.year = Number(date.getFullYear());
      } else {
        this.queryForm.year = Number(date.getFullYear()) - 1;
      }
    },
    getMonth (type) {
      const TOType = 1;
      const LastType = 2;
      const date = new Date();
      const Year = date.getFullYear();
      if (type === TOType) {
        let Month = date.getMonth() + 1;
        Month = Month >= 10 ? Month : '0' + Month;
        this.queryForm.year = Year;
        this.queryForm.months = Month;
      } else {
        date.setMonth(date.getMonth() - 1);
        let Month = date.getMonth() + 1;
        Month = Month >= 10 ? Month : '0' + Month;
        this.queryForm.year = Year;
        this.queryForm.months = Month;
      }
    },
    getWeek () {
      const date = utils.getDateStr(0, 'YMD');
      console.log(date);
      const temp = date.split('-');
      console.log(temp);
      this.queryForm.year = temp[0];
      this.queryForm.months = temp[1];
      this.queryForm.day = temp[2];
    },
    queryChart () {
      this.spinShow = true;
      console.log(this.queryForm);
      typesOfComplaints.getChart(this.queryForm).then((res) => {
        this.spinShow = false;
        console.log(res.data.map, res.data.list);
        this.lineData = res.data.map;
        this.xName = res.data.list;
        this.tempList = res.data.map;
        this.handleSelectType();
      });
      this.spinShow = false;
    }
  }
};
</script>
<style lang="less">
.img {
  font-style: italic;
  font-weight: 700;
}
</style>
