<script setup lang="ts">
import { type DirectusTranslation } from "~/types";
import CountryFlag from "vue-country-flag-next";

interface Props {
  translations: DirectusTranslation[];
}
defineProps<Props>();

const getFirstTranslation = (item: DirectusTranslation) => {
  return item.translations?.[0]?.value || "No translation";
};

const getCountryCode = (langCode: string) => {
  return langCode.split("-")[1] || langCode;
};
</script>

<template>
  <div v-if="translations && translations.length > 0" class="table-container">
    <table>
      <thead>
        <tr>
          <th scope="col">Key</th>
          <th scope="col">Translation</th>
          <th scope="col" class="col-updated">Last Updated</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in translations" :key="item.key">
          <td>{{ item.key }}</td>
          <td class="tooltip-cell">
            <Flyout trigger-action="hover">
              <template #trigger>
                {{ getFirstTranslation(item) }}
              </template>
              <template #content>
                <ul class="tooltip-list">
                  <li v-for="t in item.translations" :key="t.languages_code">
                    <span class="lang-label">
                      <country-flag
                        :country="getCountryCode(t.languages_code)"
                      />
                    </span>
                    <span class="lang-value">{{ t.value }}</span>
                  </li>
                </ul>
              </template>
            </Flyout>
          </td>
          <td class="col-updated">{{ formatDateAgo(item.updatedAt, item) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  overflow-x: auto;
  overflow-y: auto;
  max-height: 600px;
  border: 1px solid var(--shade-100);
  border-radius: 0.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.75rem;
  background-color: white;
}

th,
td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--shade-100);
}

.tooltip-cell {
  position: relative;
}

th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--shade-600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

tbody tr {
  border-bottom: 1px solid var(--shade-100);
  transition: background-color 0.2s;
}

tbody tr:last-child {
  border-bottom: none;
}

tbody tr:hover {
  cursor: default;

  background-color: var(--shade-50);
}

td {
  padding: 1rem;
  vertical-align: middle;
  color: var(--shade-800);
}

.lang-value {
  color: var(--shade-800);
  text-align: left;
  white-space: normal;
  word-wrap: break-word;
  max-width: 200px;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  border: 1px dashed var(--shade-200);
  border-radius: 0.5rem;
  background-color: var(--shade-25);
}

.empty-state p {
  margin-top: 0.5rem;
  color: var(--shade-600);
}

.col-updated {
  min-width: 150px;
  white-space: nowrap;
}
.tooltip-list {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
  font-size: 0.75rem;
  min-width: 250px;
}

.tooltip-list li {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
}

.tooltip-list li:not(:last-child) {
  margin-bottom: 0.5rem;
}
</style>
