<template>
  <NavBar />
  <main>
    <div class="columns is-mobile is-centered mt-3 is-multiline">
      <div class="columns is-center">
        <ColumnsAndRowInputVue
          :dimensions="dimensions"
          @update-columns="(value) => (dimensions.columns = value)"
          @update-rows="(value) => (dimensions.rows = value)" />
      </div>
      <div class="columns column is-full is-centered has-text-centered">
        <button class="button is-info is-center" @click="handleSubmit">
          Submit
        </button>
      </div>
      <div class="column is-8 is-center">
        <div class="field">
          <label class="label">Essay</label>
          <div class="control">
            <textarea
              v-model="essay"
              class="textarea is-primary"
              placeholder="Paste your essay here"
              rows="10"></textarea>
          </div>
        </div>
      </div>
      <div class="is-center column is-10 table-container mx-4">
        <table class="table is-bordered is-full-desktop mx-auto">
          <thead>
            <IndexRow :columns="columns" />
          </thead>
          <tbody>
            <ParagraphDisplay :essay="essay" :columns="columns" />
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import IndexRow from './components/IndexRow.vue';
import { splitAndFormatEssay } from '@/helpers/essay';
import { computed, reactive, ref, type Ref } from 'vue';
import { essay as initialEssay } from './helpers/contsants';
import ColumnsAndRowInputVue from './components/ColumnsAndRowInput.vue';
import type { IDimensions } from './helpers/types';
import ParagraphDisplay from './components/ParagraphDisplay.vue';

const dimensions = reactive<IDimensions>({
  columns: 0,
  rows: 0,
});

const columns = ref(0);
const rows = ref(0);

const essay: Ref<string> = ref(initialEssay);

const paragraphs = computed(() =>
  splitAndFormatEssay(essay.value, columns.value)
);
const handleSubmit = (): void => {
  (columns.value = dimensions.columns), (rows.value = dimensions.rows);
};
</script>
<style scoped>
table {
  margin-bottom: 30px;
}
</style>
