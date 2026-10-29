<script setup lang="ts">
import { computed } from 'vue'
import { useConferenceData } from '@/composables/useConferenceData'
import { useSessionFilter } from '@/features/sessions/composables/useSessionFilter'
import SessionCard from '@/features/sessions/components/SessionCard.vue'
import SessionFilter from '@/features/sessions/components/SessionFilter.vue'

const { sessions, tracks, conference } = useConferenceData()

const LEVELS = ['Einsteiger', 'Fortgeschritten', 'Experte']

const { selectedTrack, selectedDay, selectedLevel, filtered, reset } = useSessionFilter(sessions)

const activeFilterCount = computed(() => {
  return [selectedTrack.value, selectedDay.value, selectedLevel.value].filter(Boolean).length
})
</script>

<template>
  <div class="sessions-view">
    <header class="page-header">
      <h1 class="page-title">Programm</h1>
      <p class="page-subtitle">
        {{ filtered.length }} von {{ sessions.length }} Sessions
        <span v-if="activeFilterCount > 0" class="filter-hint"
          >({{ activeFilterCount }} Filter aktiv)</span
        >
      </p>
    </header>

    <SessionFilter
      v-model:track="selectedTrack"
      v-model:day="selectedDay"
      v-model:level="selectedLevel"
      :tracks="tracks"
      :days="conference.dates"
      :levels="LEVELS"
      @reset="reset"
    />

    <div v-if="filtered.length === 0" class="empty-state">
      <p>Keine Sessions für diese Filterkombination gefunden.</p>
      <button class="reset-link" type="button" @click="reset">Filter zurücksetzen</button>
    </div>

    <div v-else class="sessions-grid">
      <SessionCard v-for="session in filtered" :key="session.id" :session="session" />
    </div>
  </div>
</template>

<style scoped>
.sessions-view {
  max-width: 900px;
}

.page-header {
  margin-bottom: var(--space-stack-lg);
}

.page-title {
  font-size: var(--font-size-32);
  font-weight: var(--font-weight-bold);
  color: var(--color-on-surface);
  margin: 0 0 var(--space-inline-xs);
  line-height: var(--font-line-height-tight);
}

.page-subtitle {
  font-size: var(--font-size-16);
  color: var(--color-on-surface-variant);
  margin: 0;
}

.filter-hint {
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

.sessions-grid {
  display: grid;
  gap: var(--space-stack-md);
}

.empty-state {
  text-align: center;
  padding: var(--space-section) 0;
  color: var(--color-on-surface-variant);
}

.reset-link {
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: var(--font-size-16);
  cursor: pointer;
  text-decoration: underline;
  font-family: var(--font-family-sans);
}
</style>
