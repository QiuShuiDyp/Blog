<template>
  <input type="text" v-model="value" @change="onChange" />
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    value: {
      type: String,
    },
  },
  methods: {
    onChange(val) {
      this.$emits("value:update", val);
    },
  },
  emits: ["value:update"],
};
</script>
