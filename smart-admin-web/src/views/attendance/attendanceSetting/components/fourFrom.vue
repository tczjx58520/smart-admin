<template>
    <div style="">
        <TabPane :label="$t('kqgl.kqsz')">
            <div style="margin-bottom:20px;">
              <Button style="margin-right:15px;" @click="newFirstForm" icon="md-add" type="warning">{{ $t('Save') }}</Button>
            </div>
            <div>
                <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                    <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                    <div>{{$t('kqgl.szdycdksj')}}</div>
                </div>
                <Form ref="form" :model="fromBaseData" label-position="left" :label-width="140" :rules="ruleValidate" style="padding-top:20px;padding-left:1%">
                        <FormItem :label="$t('kqgl.sbqyxdjsj')"> 
                            <TimePicker type="time" v-model="fromBaseData.timeBeforeFirstStartWork" confirm/>

                        </FormItem>

                        <FormItem :label="$t('kqgl.sbhyxdjsj')"> 
                            <TimePicker type="time" v-model="fromBaseData.timeAfterFirstStartWork"  confirm/>
                        </FormItem>
                </Form>
            </div>

            <div>
                <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                    <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                    <div>{{$t('kqgl.szdecdksj')}}</div>
                </div>
                <Form ref="form" :model="fromBaseData" label-position="left" :label-width="140" :rules="ruleValidate" style="padding-top:20px;padding-left:1%">
                        <FormItem :label="$t('kqgl.sbqyxdjsj')"> 
                            <TimePicker type="time" v-model="fromBaseData.timeBeforeSecondStartWork" confirm/>

                        </FormItem>

                        <FormItem :label="$t('kqgl.sbhyxdjsj')"> 
                            <TimePicker type="time" v-model="fromBaseData.timeAfterSecondStartWork" confirm/>
                        </FormItem>
                </Form>
            </div>

             <div>
                <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                    <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                    <div>{{$t('kqgl.szdccdksj')}}</div>
                </div>
                <Form ref="form" :model="fromBaseData" label-position="left" :label-width="140" :rules="ruleValidate" style="padding-top:20px;padding-left:1%">
                        <FormItem :label="$t('kqgl.sbqyxdjsj')"> 
                            <TimePicker type="time" v-model="fromBaseData.timeBeforeThirdStartWork" confirm/>
                        </FormItem>

                        <FormItem :label="$t('kqgl.sbhyxdjsj')"> 
                            <TimePicker type="time" v-model="fromBaseData.timeAfterThirdStartWork"  confirm/>
                        </FormItem>
                </Form>
            </div>

            <div>
                <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                    <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                    <div>{{$t('kqgl.szdsddksj')}}</div>
                </div>
                <Form ref="form" :model="fromBaseData" label-position="left" :label-width="140" :rules="ruleValidate" style="padding-top:20px;padding-left:1%">
                        <FormItem :label="$t('kqgl.sbqyxdjsj')"> 
                            <TimePicker type="time" v-model="fromBaseData.timeBeforeForthStartWork" confirm/>
                        </FormItem>

                        <FormItem :label="$t('kqgl.sbhyxdjsj')"> 
                            <TimePicker type="time" v-model="fromBaseData.timeAfterForthStartWork" confirm/>

                        </FormItem>
                </Form>
            </div>

            <div>
                <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                    <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                    <div>{{$t('kqgl.txbz')}}</div>
                </div>
                <Form ref="form" :model="fromBaseData" label-position="left" :label-width="140" :rules="ruleValidate" style="padding-top:20px;padding-left:1%">
                        <FormItem :label="$t('kqgl.txsc')"> 
                            <InputNumber :max="100000" :min="0" style="width:13%"></InputNumber>
                        </FormItem>

                        <FormItem :label="$t('kqgl.txpblx')">
                       <CheckboxGroup>
                        <Checkbox label="1">{{$t('kqgl.qky')}}</Checkbox>
                        <Checkbox label="2">{{$t('kqgl.qke')}}</Checkbox>
                    </CheckboxGroup>
                    </FormItem>

                    <FormItem :label="$t('kqgl.tqxblx')">
                       <CheckboxGroup>
                        <Checkbox label="1">{{$t('kqgl.cd')}}</Checkbox>
                        <Checkbox label="2">{{$t('kqgl.zt')}}</Checkbox>
                    </CheckboxGroup>
                    </FormItem>
                </Form>
            </div>

            <div>
                <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                    <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                    <div>{{$t('kqgl.szsfyxt')}}</div>
                </div>
                <Form ref="form" :model="fromBaseData" label-position="left" :label-width="250" :rules="ruleValidate" style="padding-top:20px;padding-left:1%">
                    <FormItem :label="$t('kqgl.qyzdtbzjbc')">
                        <CheckboxGroup>
                            <Checkbox label="1">{{$t('kqgl.shi')}}</Checkbox>
                        </CheckboxGroup>
                    </FormItem>

                    <FormItem :label="$t('kqgl.syry')">
                            <Input type="textarea" :rows="4" style="width: 34%"/>
                    </FormItem>
                    <div class="buttons">
                          <Button type="primary">{{$t('kqgl.tjzz')}}</Button>
                        <Button type="primary" class="buttonItem">{{$t('kqgl.tjry')}}</Button>
                        <Button type="primary" class="buttonItem">{{$t('kqgl.tjgw')}}</Button>
                            <Button class="buttonItem">{{$t('kqgl.qk')}}</Button>
                    </div>

                    <FormItem :label="$t('kqgl.jzry')" style="padding-top:20px;">
                            <Input type="textarea" :rows="4" style="width: 34%"/>
                    </FormItem>
                    <div class="buttons">
                          <Button type="primary">{{$t('kqgl.tjzz')}}</Button>
                        <Button type="primary" class="buttonItem">{{$t('kqgl.tjry')}}</Button>
                        <Button type="primary" class="buttonItem">{{$t('kqgl.tjgw')}}</Button>
                            <Button class="buttonItem">{{$t('kqgl.qk')}}</Button>
                    </div>
                </Form>
            </div>

            <div>
                <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                    <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                    <div>{{$t('kqgl.szmqry')}}</div>
                </div>
                <Form ref="form" :model="fromBaseData" label-position="left" :label-width="140" :rules="ruleValidate" style="padding-top:20px;padding-left:1%">
                         <FormItem :label="$t('kqgl.szmqry')">
                            <Input type="textarea" :rows="4" style="width: 34%"/>
                    </FormItem>
                </Form>
            </div>


        </TabPane>
    </div>
</template>

<script>
import { attendance } from '@/api/attendance'

export default {
    name: 'firstTable',
    components:{
    },
    data() {
        return {
            chooseList: [
        {
          label: 'YES',
          value: 0
        }, {
          label: 'NO',
          value: 1
        }
      ],
            fromBaseData: {

            },
          ruleValidate: []
        }
    },
    mounted() {
     
    },
    methods: {
      newFirstForm() {

      }
    }
}
</script>
<style scoped>
.buttons{
    display: flex;
    padding-left: 20%;
}
.buttonItem{
    margin-left: 20px;
}
</style>