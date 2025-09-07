<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
    },
  },
  methods: {
    onChange(val) {
      this.$emit("value:update", val);
    },
  },
  emits: ["value:update"],
};
</script>
<template>
  <input
    type="text"
    class="d-input"
    v-model="value"
    @change="onChange"
    :placeholder="placeholder"
  />
</template>
<style scoped>
.d-input {
  border-radius: 4px;
  border-color: aliceblue;
}
</style>
