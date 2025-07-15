<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  startDate?: string;
  endDate?: string;
}>();

const emit = defineEmits(["submit"]);

const startDate = ref<string>(props.startDate ?? "");
const endDate = ref<string>(props.endDate ?? "");

const startDateError = ref<string | null>(null);
const endDateError = ref<string | null>(null);

function validateDates() {
  startDateError.value = null;
  endDateError.value = null;

  if (!startDate.value) return;
  if (!endDate.value) return;

  const start = startDate.value ? new Date(startDate.value) : null;
  const end = endDate.value ? new Date(endDate.value) : null;
  const now = new Date();

  // Check for invalid date strings
  if (startDate.value && isNaN(start?.getTime() ?? NaN)) {
    startDateError.value = "Invalid date";
  }
  if (endDate.value && isNaN(end?.getTime() ?? NaN)) {
    endDateError.value = "Invalid date";
  }

  // Check for future dates
  if (start && start > now) {
    startDateError.value = "Date cannot be in the future";
  }
  if (end && end > now) {
    endDateError.value = "Date cannot be in the future";
  }

  // Check if start date is after end date
  if (start && end && start > end) {
    startDateError.value = "Start date cannot be after end date";
  }
}

function handleSubmit() {
  validateDates();
  if (!startDateError.value && !endDateError.value) {
    emit("submit", { startDate: startDate.value, endDate: endDate.value });
  }
}
//  NOTE: Hard coded date format, we can make it dynamic as per locale
function formatInput(value: string): string {
  // Remove all non-digit characters and limit to 8 digits (YYYYMMDD)
  let digits = value.replace(/\D/g, "").slice(0, 8);

  // Add hyphens at the correct positions
  if (digits.length > 4) {
    digits = `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }
  if (digits.length > 7) {
    digits = `${digits.slice(0, 7)}-${digits.slice(7)}`;
  }

  return digits;
}

function handleStartDateInput(event: Event) {
  const input = event.target as HTMLInputElement;
  const formattedValue = formatInput(input.value);
  startDate.value = formattedValue;
}

function handleEndDateInput(event: Event) {
  const input = event.target as HTMLInputElement;
  const formattedValue = formatInput(input.value);
  endDate.value = formattedValue;
}
</script>

<template>
  <div class="date-range">
    <div class="input-group">
      <label for="date-from">From</label>
      <Input
        id="date-from"
        type="text"
        :value="startDate"
        @change="handleStartDateInput"
        @blur="handleSubmit"
        placeholder="YYYY-MM-DD"
        pattern="\d{4}-\d{2}-\d{2}"
        title="Please enter a date in YYYY-MM-DD format"
        :error="!!startDateError"
        :errorMessage="startDateError"
      />
    </div>
    <div class="input-group">
      <label for="date-to">To</label>
      <Input
        id="date-to"
        type="text"
        :value="endDate"
        @change="handleEndDateInput"
        @blur="handleSubmit"
        placeholder="YYYY-MM-DD"
        pattern="\d{4}-\d{2}-\d{2}"
        title="Please enter a date in YYYY-MM-DD format"
        :error="!!endDateError"
        :errorMessage="endDateError"
      />
    </div>
  </div>
</template>

<style scoped>
.date-range {
  display: flex;
  width: 300px;
  gap: 1rem;
  padding: 0.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  position: relative;
  padding-bottom: 1.5rem;
}

label {
  font-size: 0.75rem;
  color: var(--shade-600);
}
</style>
