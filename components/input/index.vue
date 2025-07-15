<script setup lang="ts">
defineProps<{
  type?: string;
  placeholder?: string;
  label?: string;
  id?: string;
  value?: string | number;
  error?: boolean;
  errorMessage?: string | null;
}>();

defineEmits(["change"]);
</script>

<template>
  <div class="input-container">
    <label v-if="label" :for="id" class="input-label">
      {{ label }}
    </label>
    <div class="input-wrapper">
      <input
        :id="id"
        :value="value"
        :placeholder="placeholder"
        @input="$emit('change', $event)"
        class="base-input"
        :class="{ 'has-error': error }"
        v-bind="$attrs"
      />
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  width: 100%;
}

.input-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--shade-700);
  white-space: nowrap;
}

.input-wrapper {
  position: relative;
  flex-grow: 1;
}

.base-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--shade-200);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.base-input.has-error {
  border-color: var(--red-500);
}

.base-input:focus {
  outline: none;
  border-color: var(--primary-400);
  box-shadow: 0 0 0 2px var(--primary-100);
}

.error-message {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: var(--red-600);
}
</style>
