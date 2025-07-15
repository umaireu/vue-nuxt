<script setup lang="ts">
import { computed } from "vue";

interface Props {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  pageSize: number;
}

const props = defineProps<Props>();

const emit = defineEmits(["previousPageHandler", "nextPageHandler"]);

const canGoBack = computed(() => props.currentPage > 1);

const canGoForward = computed(() => props.currentPage < props.totalPages);

const rangeStart = computed(() => (props.currentPage - 1) * props.pageSize + 1);

const rangeEnd = computed(() => {
  const end = props.currentPage * props.pageSize;
  return Math.min(end, props.totalItems);
});

const goBack = () => {
  emit("previousPageHandler");
};

const goForward = () => {
  emit("nextPageHandler");
};
</script>

<template>
  <div class="pagination-controls">
    <div class="page-nav">
      <span class="page-info">
        Page {{ rangeStart }} of {{ rangeEnd }} ({{ totalItems }} keys)
      </span>
      <div class="buttons">
        <button
          @click="goBack"
          :disabled="!canGoBack"
          aria-label="Go to previous page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </button>
        <button
          @click="goForward"
          :disabled="!canGoForward"
          aria-label="Go to next page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pagination-controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.75rem 0;
  font-size: 0.75rem;
  gap: 1.5rem;
}

.page-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.page-info {
  color: var(--shade-500);
  white-space: nowrap;
}

.buttons {
  display: flex;
  gap: 0.5rem;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover:not(:disabled) {
  background-color: var(--shade-50);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
