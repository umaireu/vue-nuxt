<script setup lang="ts">
defineProps<{
  pageSize: number;
  searchQuery: string;
  dateRange: {
    startDate?: string;
    endDate?: string;
  };
}>();

const emit = defineEmits<{
  (e: "update:pageSize", value: number): void;
  (e: "update:searchQuery", value: string): void;
  (e: "update:dateRange", value: { startDate: string; endDate: string }): void;
}>();

function handleDateRangeChange({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  emit("update:dateRange", { startDate, endDate });
}
</script>

<template>
  <div class="filters-container">
    <div class="filter-item search-filter">
      <Input
        id="search-input"
        :value="searchQuery"
        @change="
          emit('update:searchQuery', ($event.target as HTMLInputElement).value)
        "
        placeholder="Filter on key..."
        style="width: 200px"
      />
    </div>
    <div class="filter-item date-filter">
      <Flyout trigger-action="click">
        <template #trigger>
          <button class="date-filter-button">Updated At</button>
        </template>
        <template #content>
          <DateRange
            :startDate="dateRange.startDate"
            :endDate="dateRange.endDate"
            @submit="handleDateRangeChange"
          />
        </template>
      </Flyout>
    </div>
    <div class="filter-item page-size-filter">
      <Input
        id="page-size-input"
        label="Page Size"
        :value="pageSize"
        @change="
          emit(
            'update:pageSize',
            Number(($event.target as HTMLInputElement).value),
          )
        "
        type="number"
        style="width: 80px"
      />
    </div>
  </div>
</template>

<style scoped>
.filters-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 1rem;
  width: 100%;
}

.date-filter-button {
  /* Basic button styling */
  padding: 0.5rem 1rem;
  border: 1px solid var(--shade-200);
  border-radius: 0.375rem;
  background-color: var(--shade-0);
  cursor: pointer;
  white-space: nowrap;
}

.date-filter-button:hover {
  background-color: var(--shade-50);
}
</style>
