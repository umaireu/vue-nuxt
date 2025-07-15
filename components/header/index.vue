<template>
  <header class="page-header">
    <img src="/goose.png" alt="Company Logo" class="logo" />
    <slot />
  </header>
</template>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--shade-200);
}

.logo {
  height: 40px;
}
</style>
