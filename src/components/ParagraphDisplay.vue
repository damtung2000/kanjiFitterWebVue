<template>
  <tr v-for="(paragraph, index) in paragraphs" :key="index">
    <td v-for="(character, index) in paragraph" :key="index">
      {{ character }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import { splitAndFormatEssay } from '@/helpers/essay';
import { computed } from 'vue';
interface ParagraphDisplayProps {
  essay: string;
  columns: number;
  maxRows?: number;
}

const props = defineProps<ParagraphDisplayProps>();

const paragraphs = computed(() =>
  splitAndFormatEssay(props.essay, props.columns)
);
</script>

<style scoped></style>
