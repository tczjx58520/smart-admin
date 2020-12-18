<template>
  <div>
    <div style="color: #86b1f8;font-size:16px;margin-top:20px">概况</div>
    <Divider style="background-color:#74a4f4;margin-top:10px" />

    <div style="display:flex;">
      <Card style="width:350px;flex:1">
        <p slot="title"
           style="background-color:#FFF">
          最近生日
        </p>
        <a href="#"
           slot="extra"
           @click.prevent="changeLimit">
          <Icon type="ios-loop-strong"></Icon>
          ...
        </a>
        <ul>
          <li v-for="item in randomMovieList"
              :key="item.id"
              style="padding:5px;list-style: none;">
            <div style="display:flex;justify-content:space-between">
              <span>{{item.name}}</span>
              <span>{{item.birthday}}</span>
            </div>

          </li>
        </ul>
      </Card>
      <Card style="width:350px;flex:1;margin-left:10px">
        <p slot="title"
           style="background-color:#FFF">
          合同到期
        </p>
        <a href="#"
           slot="extra"
           @click.prevent="changeLimit">
          <Icon type="ios-loop-strong"></Icon>
          ...
        </a>
        <ul>
          <li v-for="item in randomMovieList"
              :key="item.id"
              style="padding:5px;list-style: none;">
            <div style="display:flex;justify-content:space-between">
              <span>{{item.name}}</span>
              <span>{{item.birthday}}</span>
            </div>
          </li>
        </ul>
      </Card>
      <Card style="width:350px;flex:1;margin-left:10px">
        <p slot="title"
           style="background-color:#FFF">
          试用到期
        </p>
        <a href="#"
           slot="extra"
           @click.prevent="changeLimit">
          <Icon type="ios-loop-strong"></Icon>
          ...
        </a>
        <ul>
          <li v-for="item in randomMovieList"
              :key="item.id"
              style="padding:5px;list-style: none;">
            <div style="display:flex;justify-content:space-between">
              <span>{{item.name}}</span>
              <span>{{item.birthday}}</span>
            </div>
          </li>
        </ul>
      </Card>
    </div>

    <div style="display:flex;margin-top:20px">
      <Card style="width:350px;flex:1;">
        <p slot="title"
           style="background-color:#FFF">
          在职员工性别比例
        </p>
        <EmployeePie :value="pieData" />
      </Card>

      <Card style="width:350px;flex:1;margin-left:10px">
        <p slot="title"
           style="background-color:#FFF">
          在职员工学历分布
        </p>
        <EdutionColomnar :value="pieData" />
      </Card>
    </div>

    <div style="display:flex;margin-top:20px">
      <Card style="width:350px;flex:1;">
        <p slot="title"
           style="background-color:#FFF">
          在职员工司龄分布
        </p>
        <div style="width:50%">
          <AgeColomnar :value="pieData" />
        </div>

      </Card>

    </div>
  </div>
</template>
<script>
import { empsituation } from '@/api/empsituation';
import HomeCard from './components/card';
import EmployeePie from './components/employ-pie';
import EdutionColomnar from './components/edution-columnar';
import AgeColomnar from './components/age-columnar';
export default {
  name: 'personnelProfile',
  components: {
    HomeCard,
    EmployeePie,
    EdutionColomnar,
    AgeColomnar
  },
  data () {
    return {
      randomMovieList: [
        {
          id: 1,
          name: '邓文希',
          birthday: '01-13'
        },
        {
          id: 2,
          name: '邓文希',
          birthday: '01-13'
        },
        {
          id: 3,
          name: '邓文希',
          birthday: '01-13'
        },
        {
          id: 4,
          name: '邓文希',
          birthday: '01-13'
        },
        {
          id: 5,
          name: '邓文希',
          birthday: '01-13'
        }
      ],
      pieData: [
        { value: 335, name: '直接访问', color: '#3AA1FF' },
        { value: 310, name: '邮件营销', color: '#36CBCB' },
        { value: 234, name: '联盟广告', color: '#4ECB73' },
        { value: 135, name: '视频广告', color: '#F47F92' },
        { value: 1548, name: '搜索引擎', color: '#FBD437' }
      ]
    };
  },
  created () {
    this.getSexInfo();
    this.getAgeInfo();
    this.getBirthInfo();
  },
  methods: {
    getSexInfo () {
      empsituation.sexDistribute().then(res => {
        console.log(res);
      });
    },
    getAgeInfo () {
      empsituation.ageDistribute().then(res => {
        console.log(res);
      });
    },
    getBirthInfo () {
      empsituation.birthDistribute().then(res => {
        console.log(res);
      });
    }
  }
};
</script>
