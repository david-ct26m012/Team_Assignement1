<script setup lang="ts">
// Person 2: Mein Programm (Aufgabe E)
// Placeholder – wird von Person 2 implementiert
</script>

<template>
  <div class="my-program">
    <h1 class="page-title">Mein Programm</h1>
    <p class="placeholder-hint">
      Diese Seite wird von Person 2 implementiert (Aufgabe E: „Mein Programm"-Grundfunktion).
    </p>
  </div>
</template>

<style scoped>
.my-program {
  max-width: 720px;
}

.page-title {
  font-size: var(--font-size-32);
  font-weight: var(--font-weight-bold);
  color: var(--color-on-surface);
  margin: 0 0 var(--space-stack-md);
}

.placeholder-hint {
  color: var(--color-on-surface-variant);
  font-size: var(--font-size-16);
  padding: var(--space-stack-lg);
  background-color: var(--color-surface-container);
  border-radius: 12px;
  border: 1px dashed var(--color-outline-variant);
}
</style>
