<template>
  <div
    class="column is-6"
    v-for="(data, index) in numberInputData"
    :key="index">
    <NumberInputField
      :value="data.value"
      :label="data.label"
      @update:value="data.handleUpdate"
      :max-value="data.maxValue" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import NumberInputField from './NumberInputField.vue';
import type { IDimensions } from '@/helpers/types';
import { LINE_LIMIT } from '@/helpers/contsants';

export interface ColumnsAndRowInputProps {
  dimensions: IDimensions;
  maxColumns: number;
  maxRows?: number;
}

const props = withDefaults(defineProps<ColumnsAndRowInputProps>(), {
  dimensions: () => ({ columns: 0, rows: 0 }),
  maxColumns: LINE_LIMIT,
});

const emit = defineEmits<{
  (e: 'updateColumns', newValue: number): void;
  (e: 'updateRows', newValue: number): void;
}>();

const handleUpdateColumns = (newValue: number) =>
  emit(
    'updateColumns',
    props.maxColumns && newValue > props.maxColumns
      ? props.maxColumns
      : newValue
  );
const handleUpdateRows = (newValue: number) =>
  emit(
    'updateRows',
    props.maxRows && newValue > props.maxColumns ? props.maxColumns : newValue
  );

const numberInputData = computed(() => [
  {
    label: 'Columns',
    value: props.dimensions.columns,
    handleUpdate: handleUpdateColumns,
    maxValue: props.maxColumns,
  },
  {
    label: 'Rows',
    value: props.dimensions.rows,
    handleUpdate: handleUpdateRows,
    maxValue: props.maxRows,
  },
]);
</script>

<style scoped></style>
