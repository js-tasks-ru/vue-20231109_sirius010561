<template>
  <UiInput :type="type" :model-value="modelValueProxy" @input="modelValueProxy = $event.target.valueAsNumber">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
    <slot :name="slotName"/></template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',
  components: { UiInput },
  emits: ['update:modelValue'],
  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: {
      type: Number,
    },
    step: {
      type: String
    }
  },
  computed: {
    modelValueProxy: {
      get() {
        if (typeof this.modelValue === 'undefined' || this.modelValue === null) {
          return '';
        }
        let isoDate = new Date(this.modelValue).toISOString();
        let resultDate = null;
        switch(this.type) {
          case 'date':
            resultDate = isoDate.slice(0, 10);
            break;
          case 'time':
            resultDate = this.step && this.step % 60 != 0 ? isoDate.slice(11, 19) : isoDate.slice(11, 16);
            break;
          case 'datetime-local':
            resultDate = isoDate.slice(0, 16);
            break;
        }
        return resultDate;
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
};
</script>
