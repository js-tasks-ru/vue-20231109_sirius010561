<template>
  <div class='toast' :class="$options.classToast[typeToast]">
    <UiIcon class="toast__icon" :icon="$options.iconToast[typeToast]" />
    <span>{{ message }}</span>
  </div>
</template>
<script>
import UiIcon from './UiIcon.vue';
export default {
  name: 'UiToast',

  components: { UiIcon },
  emits: ['destroy'],
  classToast: {
    success: 'toast_success',
    error: 'toast_error',
  },

  iconToast: {
    success: 'check-circle',
    error: 'alert-circle',
  },

  timeLive: {
    success: 5000,
    error: 5000
  },

  props: {
    typeToast: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    destroyToast() {
      let time = this.$options.timeLive[this.typeToast];

      setTimeout(() => {
        this.$emit('destroy');
      }, time);
    }
  },
  mounted() {
    this.destroyToast();
  }
}
</script>
<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast+.toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>