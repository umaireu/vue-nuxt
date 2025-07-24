<script setup lang="ts">
const {
  searchQuery,
  currentPage,
  pageSize,
  dateRange,
  error,
  isLoading,
  translations,
  totalItems,
  totalPages,
  nextPage,
  previousPage,
} = useTranslations();

const noData = computed(
  () => !isLoading.value && translations.value.length === 0 && !error.value,
);
</script>

<template>
  <Header>
    <Filters
      :pageSize="pageSize"
      :searchQuery="searchQuery"
      :dateRange="dateRange"
      @update:pageSize="(value) => (pageSize = value)"
      @update:searchQuery="(value) => (searchQuery = value)"
      @update:dateRange="(value) => (dateRange = value)"
    />
  </Header>

  <div v-if="error" class="error-state">
    <p>An error occurred while fetching data. Please try again.</p>
  </div>
  <div v-else class="translations-container">
    <div v-if="isLoading" class="loading-state">
      <p>Loading translations...</p>
    </div>
    <div v-else-if="noData" class="empty-state">
      <p>No translation keys found.</p>
      <p class="subtle">Try adjusting your search or filter criteria.</p>
    </div>
    <template v-else>
      <TranslationsTable :translations="translations" />
      <Pagination
        :totalPages="totalPages"
        :totalItems="totalItems"
        :currentPage="currentPage"
        :pageSize="pageSize"
        @previousPageHandler="previousPage"
        @nextPageHandler="nextPage"
        class="mt-4"
      />
    </template>
  </div>
</template>

<style scoped>

.error-state,
.empty-state,
.loading-state {
  text-align: center;
  padding: 4rem 2rem;
  border: 1px dashed var(--shade-200);
  border-radius: 0.5rem;
  background-color: var(--shade-25);
  margin-top: 1rem;
}

.empty-state .subtle {
  font-size: 0.875rem;
  color: var(--shade-500);
}

.mt-4 {
  margin-top: 1rem;
}
</style>
