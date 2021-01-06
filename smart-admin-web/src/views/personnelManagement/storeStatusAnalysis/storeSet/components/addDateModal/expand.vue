<template>
  <div>
    <Row class="expand-row">
      <Form ref="addformbase" :model="addformbase" inline :label-width="120">
        <Col
          :span="24 / row.length"
          v-for="item in row"
          :key="item.id"
          style="display: flex;"
        >
          <FormItem prop="user" :label="item.itemName">
            <Input type="text" v-model="item.score">
            </Input>
          </FormItem>
        </Col>
      </Form>
    </Row>
  </div>
</template>
<script>
export default {
  props: {
    row: Array,
    index: Number
  },
  data() {
    return {
      addformbase: {}
    }
  },
  methods: {
  },
};
</script>
<style scoped>
.expand-row {
  margin-bottom: 16px;
}
</style>