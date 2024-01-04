<template>
  <button @click="updateCount">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  emits: ['update:count'],
  props: {
    count: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      localCount: this.count,
    }
  },
  methods: {
    updateCount() {
      this.localCount++;
      this.$emit('update:count', this.localCount);
    }
  },
  watch: {
    count: {
      immediate: true,
      handler(newValue) {
        this.localCount = newValue;
      },
    }
  }
};
</script>
