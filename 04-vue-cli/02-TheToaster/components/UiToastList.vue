<template>
    <div class="toasts">
        <UiToast
            v-for="toast in toasts"
            :key="toast.id"
            :typeToast="toast.type"  
            :message="toast.message"
            @destroy="destroyToast(toast.id)"
        />
    </div>
</template>
<script>
import UiToast from './UiToast.vue';
export default {
    name: 'UiToastList',

    components: { UiToast },
    emits: ['destroyToast'],
    props: {
        toasts: {
            type: Array,
            required: true
        }
    },
    methods: {
        destroyToast(id) {
            this.$emit('destroyToast', id);
        }
    }
}
</script>
<style scoped>
    
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>