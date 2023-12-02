<template>
    <UiToastList 
      :toasts="toasts"
      @destroyToast="destroyToast"
    />
</template>

<script>
import UiToastList from './UiToastList.vue';

export default {
  name: 'TheToaster',

  components: { UiToastList },
  data() {
    return {
      toasts: [],
      counter: 0,
    }
  },
  methods: {
    error(message) {
      this.counter++;
      this.toasts.push({
        type: 'error',
        message: message,
        id: this.counter,
      });
    },
    success(message) {
      this.counter++;
      this.toasts.push({
        type: 'success',
        message: message,
        id: this.counter,
      });
    },
    destroyToast(id) {
      this.toasts = this.toasts.filter((toast) => {
          return toast.id !== id;
      });
    }
  },
};
</script>