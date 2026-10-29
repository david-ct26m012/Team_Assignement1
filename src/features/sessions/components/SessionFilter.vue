<script setup lang="ts">
import type { Track } from '@/types/conference'

defineProps<{
  tracks: readonly Track[]
  days: readonly string[]
  levels: readonly string[]
}>()

const selectedTrack = defineModel<string>('track', { default: '' })
const selectedDay = defineModel<string>('day', { default: '' })
const selectedLevel = defineModel<string>('level', { default: '' })

defineEmits<{ reset: [] }>()

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString('de-AT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}
</script>

<template>
  <div class="filter-bar">
    <div class="filter-group">
      <label class="filter-label" for="filter-track">Track</label>
      <select id="filter-track" v-model="selectedTrack" class="filter-select">
        <option value="">Alle Tracks</option>
        <option v-for="t in tracks" :key="t.id" :value="t.id">{{ t.name }}</option>
      </select>
    </div>

    <div class="filter-group">
      <label class="filter-label" for="filter-day">Tag</label>
      <select id="filter-day" v-model="selectedDay" class="filter-select">
        <option value="">Beide Tage</option>
        <option v-for="d in days" :key="d" :value="d">{{ formatDay(d) }}</option>
      </select>
    </div>

    <div class="filter-group">
      <label class="filter-label" for="filter-level">Level</label>
      <select id="filter-level" v-model="selectedLevel" class="filter-select">
        <option value="">Alle Level</option>
        <option v-for="l in levels" :key="l" :value="l">{{ l }}</option>
      </select>
    </div>

    <button class="reset-btn" type="button" @click="$emit('reset')">Filter zurücksetzen</button>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-stack-md);
  align-items: flex-end;
  background-color: var(--color-surface-container);
  border-radius: 12px;
  padding: var(--space-component-padding);
  margin-bottom: var(--space-stack-lg);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-sm);
  flex: 1;
  min-width: 160px;
}

.filter-label {
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-semibold);
  color: var(--color-on-surface-variant);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.filter-select {
  appearance: none;
  background-color: var(--color-surface-container-lowest);
  border: 1px solid var(--color-outline-variant);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: var(--font-size-14);
  font-family: var(--font-family-sans);
  color: var(--color-on-surface);
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236F7976' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;
}

.filter-select:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-color: var(--color-primary);
}

.reset-btn {
  background: none;
  border: 1px solid var(--color-outline);
  border-radius: 8px;
  padding: 8px 16px;
  font-size: var(--font-size-14);
  font-family: var(--font-family-sans);
  color: var(--color-on-surface-variant);
  cursor: pointer;
  white-space: nowrap;
  align-self: flex-end;
}

.reset-btn:hover {
  background-color: var(--color-surface-variant);
  color: var(--color-on-surface);
}
</style>
