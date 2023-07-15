<template>
  <tr>
    <td className="cell" v-for="i in range(props.columns, 1)" :key="i">
      {{ i }}
    </td>
  </tr>
</template>
<script lang="ts" setup>
import { range } from '@/helpers/array';
import { watch } from 'vue';
const props = defineProps({
  columns: {
    type: Number,
    required: true,
  },
});
watch(
  () => props.columns,
  (newValue, oldValue) => {
    console.log(range(newValue, 1));
  }
);
</script>
<style scoped>
.cell {
  text-align: center;
}
</style>
