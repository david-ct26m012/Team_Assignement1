<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useMyProgram } from '@/composables/useMyProgram'

const { mySessions, removeSession } = useMyProgram()
</script>

<template>
  <div class="my-program">
    <h1 class="page-title">Mein Programm</h1>

    <div v-if="mySessions.length === 0" class="empty-state">
      <p>Du hast noch keine Sessions gespeichert.</p>
      <RouterLink to="/sessions" class="empty-link">Zum Programm</RouterLink>
    </div>

    <div v-else class="session-list">
      <article v-for="session in mySessions" :key="session.id" class="session-card">
        <div class="session-card__content">
          <h2 class="session-title">{{ session.title }}</h2>
          <p class="session-meta">
            {{ session.day }} · {{ session.startTime }}–{{ session.endTime }}
          </p>
        </div>

        <div class="card-actions">
          <RouterLink :to="`/sessions/${session.id}`" class="details-link">
            Details
          </RouterLink>

          <button type="button" class="remove-button" @click="removeSession(session.id)">
            Entfernen
          </button>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.my-program {
  max-width: 860px;
}

.page-title {
  font-size: var(--font-size-32);
  font-weight: var(--font-weight-bold);
  color: var(--color-on-surface);
  margin: 0 0 var(--space-stack-md);
}

.empty-state {
  background-color: var(--color-surface-container-low);
  border: 1px dashed var(--color-outline-variant);
  border-radius: 12px;
  padding: var(--space-component-padding);
  text-align: center;
  color: var(--color-on-surface-variant);
}

.session-list {
  display: grid;
  gap: var(--space-stack-md);
}

.session-card {
  display: flex;
  justify-content: space-between;
  gap: var(--space-stack-md);
  background-color: var(--color-surface-container-low);
  border: 1px solid var(--color-outline-variant);
  border-radius: 12px;
  padding: var(--space-component-padding);
}

.session-title {
  margin: 0 0 var(--space-stack-sm);
  font-size: var(--font-size-20);
  color: var(--color-on-surface);
}

.session-meta {
  margin: 0;
  color: var(--color-on-surface-variant);
}

.card-actions {
  display: flex;
  align-items: center;
  gap: var(--space-stack-sm);
}

.details-link,
.empty-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: var(--font-weight-semibold);
}

.remove-button {
  border: 1px solid var(--color-outline-variant);
  background: transparent;
  color: var(--color-on-surface);
  border-radius: 999px;
  padding: 0.5rem 0.9rem;
  cursor: pointer;
}
</style>