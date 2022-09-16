<template>
  <Story title="Input" group="Components" icon="carbon:account">
    <Variant title="Input">
      <template #default>
        <Input v-model="value" :placeholder="placeholder"></Input>
      </template>
    </Variant>
    <Variant title="InputNumber">
      <InputNumber
        v-model="value"
        :max="100"
        :min="-100"
        :step="10"
      ></InputNumber>
    </Variant>
  </Story>
</template>
<script>
import Input from "./input.vue";
import InputNumber from "./InputNumber.vue";
export default {
  components: {
    Input,
    InputNumber,
  },
  data() {
    return {
      value: "123",
      placeholder: "请输入值",

      numberValue: 123,
      numberPlaceholder: "请输入数字",
    };
  },
};
</script>
<docs lang="md">
# Input

input 输入框

# InputNumber

InputNumber 输入框
</docs>
