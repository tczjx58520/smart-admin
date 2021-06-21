<template>
  <div class="tables-edit-outer">
    <div v-if="!isEditting" @dblclick="startEdit" @click="testClick(editingdata)" :class="editingdata.click === true ? 'tables-edit-con click-con' : 'tables-edit-con'">
      <span class="value-con" v-show="editType !== 'nomalselect'">{{ value }}</span>
      <span class="value-con" v-show="editType === 'nomalselect'">{{ value | valueFilter }}</span>
    </div>
    <div v-else class="tables-editting-con">
      <Input v-show="editType === 'input'" :value="value" @input="handleInput" class="tables-edit-input"/>

      <DatePicker v-show="editType === 'date'" :value="value" type="date" placeholder="Select date" class="tables-edit-input" @input="handleInput"/>

      <TimePicker v-show="editType === 'time'" type="time" :value="value"  class="tables-edit-input" @input="handleInput"  confirm/>
      <Select v-show="editType === 'select'" v-model="selectId" label-in-value  class="tables-edit-input" @on-change="handSelectChange">
        <Option v-for="item in selectData" :value="item.id" :key="item.id">{{ item.shiftName }}</Option>
    </Select>

    <Select v-show="editType === 'nomalselect'" v-model="value"  class="tables-edit-input" @on-change="getSelectData">
        <Option v-for="item in selectData" :value="item.id" :key="item.id">{{ item.name }}</Option>
    </Select>
      <Button @click="saveEdit" style="padding: 6px 4px;" type="text">
        <Icon type="md-checkmark"></Icon>
      </Button>
      <Button @click="canceltEdit" style="padding: 6px 4px;" type="text">
        <Icon type="md-close"></Icon>
      </Button>
    </div>
  </div>
</template>

<script>
let that = this;
export default {
  name: 'TablesEdit',
  filters: {
    valueFilter (val) {
      const data = {
        0: '是',
        1: '否'
      };
      return data[val];
    }
  },
  props: {
    // 当前编辑的单元格值
    value: {
      type: [String, Number],
      require: true
    },
    // 当前编辑的下拉框值
    selectId: {
      type: [String, Number],
      require: false
    },
    // 当前编辑的单元格id
    edittingCellId: {
      type: String,
      require: true
    },
    // 表格数据
    params: {
      type: Object,
      require: true
    },
    // 表格里全局设置的是否可编辑
    editable: {
      type: Boolean,
      require: true
    },
    // 编辑表格组件类型
    editType: {
      type: String,
      require: true
    },
    // 下拉组件数据
    selectData: {
      type: Array,
      require: true
    }
  },
  computed: {
    // 判断是否处于编辑状态
    isEditting () {
      // console.log('editType', this.editType)
      return this.edittingCellId === `editting-${this.params.index}-${this.params.column.key}`;
    },
    editingdata () {
      // console.log(this.params)
      return this.params;
    }
  },
  methods: {
    testClick (val) {
      console.log('clickName', this.params);
      this.params.click = !this.params.click;
    },
    getSelectData (val) {
      // console.log(val)
      this.$emit('getnomalselect', val);
    },
    handSelectChange (val) {
      console.log(val, val);
      this.$emit('input', val.label);
      this.$emit('select', val.value);
    },
    handleInput (val) {
      this.$emit('input', val);
    },
    startEdit () {
      this.$emit('on-start-edit', this.params);
    },
    saveEdit () {
      console.log('this.params', this.params);
      this.$emit('on-save-edit', this.params);
    },
    canceltEdit () {
      this.$emit('on-cancel-edit', this.params);
    }
  }
};
</script>

<style lang="less">
.tables-edit-outer {
  height: 100%;
  .tables-edit-con {
    position: relative;
    height: 35px;
    line-height: 35px;
    .value-con {
      vertical-align: middle;
    }
    .tables-edit-btn {
      position: absolute;
      right: 10px;
      top: 0;
      display: none;
    }
    &:hover {
      .tables-edit-btn {
        display: inline-block;
      }
    }
  }
  .tables-editting-con {
    .tables-edit-input {
      width: ~"calc(100% - 60px)";
    }
  }

  .click-con {
    background: red;
  }
}
</style>
