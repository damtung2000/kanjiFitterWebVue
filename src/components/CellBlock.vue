<template>
  <div class="column are-small">{{ content }}</div>
</template>

<script setup lang="ts">
const props = defineProps<{ content?: string }>();
</script>
