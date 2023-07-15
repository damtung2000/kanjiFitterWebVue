<template>
  <div class="field">
    <label class="label">{{ label }}</label>

    <p class="control">
      <input type="number" class="input" :value="value" @input="handleInput" />
    </p>
  </div>
</template>
<script setup lang="ts">
import { watch } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  maxValue: {
    type: Number,
  },
});

watch(
  () => props.value,
  (newValue) => {
    if (props.maxValue && newValue > props.maxValue) {
      emit('update:value', props.maxValue);
    }
  }
);

const emit = defineEmits(['update:value']);
const handleInput = (event: any) => {
  let value = parseInt(event.target.value) || 0;
  if (props.maxValue) {
    value = Math.min(value, props.maxValue);
  }
  emit('update:value', value);
};
</script>
<style scoped></style>
