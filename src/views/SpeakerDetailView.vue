<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useConferenceData } from '@/composables/useConferenceData'

const route = useRoute()
const { getSpeakerById, getSessionById, getTrackById } = useConferenceData()

const speaker = computed(() => getSpeakerById(route.params.id as string))

const sessions = computed(() =>
  (speaker.value?.sessionIds ?? [])
    .map((id) => getSessionById(id))
    .filter(Boolean),
)
</script>

<template>
  <div class="speaker-detail">
    <RouterLink to="/speakers" class="back-link">← Alle Speaker</RouterLink>

    <div v-if="!speaker" class="not-found">
      <h1>Speaker nicht gefunden.</h1>
      <RouterLink to="/speakers">Zurück zur Übersicht</RouterLink>
    </div>

    <template v-else>
      <div class="speaker-header">
        <div class="speaker-avatar">{{ speaker.name.charAt(0) }}</div>
        <div>
          <h1 class="speaker-name">{{ speaker.name }}</h1>
          <p class="speaker-role">{{ speaker.title }} · {{ speaker.company }}</p>
        </div>
      </div>

      <section class="bio-section">
        <h2 class="section-title">Biografie</h2>
        <p class="bio-text">{{ speaker.bio }}</p>
      </section>

      <section class="sessions-section">
        <h2 class="section-title">Sessions ({{ sessions.length }})</h2>
        <div class="sessions-list">
          <RouterLink
            v-for="session in sessions"
            :key="session!.id"
            :to="`/sessions/${session!.id}`"
            class="session-item"
          >
            <div class="session-item-header">
              <span class="badge level" :data-level="session!.level">{{ session!.level }}</span>
              <span class="badge format">{{ session!.format }}</span>
            </div>
            <h3 class="session-title">{{ session!.title }}</h3>
            <p class="session-meta">
              {{ session!.day === '2026-09-15' ? 'Tag 1' : 'Tag 2' }} ·
              {{ session!.startTime }}–{{ session!.endTime }} ·
              {{ getTrackById(session!.trackId)?.name }}
            </p>
          </RouterLink>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.speaker-detail {
  max-width: 720px;
}

.back-link {
  display: inline-block;
  color: var(--color-primary);
  text-decoration: none;
  font-size: var(--font-size-14);
  margin-bottom: var(--space-stack-lg);
  font-weight: var(--font-weight-semibold);
}

.back-link:hover {
  text-decoration: underline;
}

.not-found {
  color: var(--color-on-surface-variant);
}

.speaker-header {
  display: flex;
  gap: var(--space-stack-lg);
  align-items: center;
  margin-bottom: var(--space-stack-lg);
}

.speaker-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--color-primary-container);
  color: var(--color-on-primary-container);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-32);
  font-weight: var(--font-weight-bold);
  flex-shrink: 0;
}

.speaker-name {
  font-size: var(--font-size-32);
  font-weight: var(--font-weight-bold);
  color: var(--color-on-surface);
  margin: 0 0 4px;
  line-height: var(--font-line-height-tight);
}

.speaker-role {
  font-size: var(--font-size-16);
  color: var(--color-on-surface-variant);
  margin: 0;
}

.section-title {
  font-size: var(--font-size-20);
  font-weight: var(--font-weight-semibold);
  color: var(--color-on-surface);
  margin: 0 0 var(--space-stack-md);
}

.bio-section {
  margin-bottom: var(--space-stack-lg);
}

.bio-text {
  font-size: var(--font-size-16);
  line-height: var(--font-line-height-normal);
  color: var(--color-on-surface-variant);
  margin: 0;
}

.sessions-section {
  margin-bottom: var(--space-stack-lg);
}

.sessions-list {
  display: grid;
  gap: var(--space-stack-md);
}

.session-item {
  display: block;
  background-color: var(--color-surface-container-low);
  border: 1px solid var(--color-outline-variant);
  border-radius: 12px;
  padding: var(--space-component-padding);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s;
}

.session-item:hover {
  border-color: var(--color-primary);
}

.session-item-header {
  display: flex;
  gap: var(--space-inline-sm);
  margin-bottom: var(--space-stack-sm);
}

.badge {
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-semibold);
  padding: 2px 8px;
  border-radius: 99px;
  background-color: var(--color-surface-variant);
  color: var(--color-on-surface-variant);
}

.badge.level[data-level='Einsteiger'] {
  background-color: var(--color-primary-container);
  color: var(--color-on-primary-container);
}

.badge.level[data-level='Fortgeschritten'] {
  background-color: var(--color-secondary-container);
  color: var(--color-on-secondary-container);
}

.badge.level[data-level='Experte'] {
  background-color: var(--color-tertiary-container);
  color: var(--color-on-tertiary-container);
}

.session-title {
  font-size: var(--font-size-16);
  font-weight: var(--font-weight-semibold);
  color: var(--color-on-surface);
  margin: 0 0 var(--space-inline-xs);
}

.session-meta {
  font-size: var(--font-size-14);
  color: var(--color-on-surface-variant);
  margin: 0;
}
</style>
