<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useConferenceData } from '@/composables/useConferenceData'

const route = useRoute()
const { getSessionById, getSpeakerById, getTrackById, getRoomById } = useConferenceData()

const session = computed(() => getSessionById(route.params.id as string))
const track = computed(() => session.value ? getTrackById(session.value.trackId) : undefined)
const room = computed(() => session.value ? getRoomById(session.value.roomId) : undefined)
const speakers = computed(() =>
  (session.value?.speakerIds ?? []).map((id) => getSpeakerById(id)).filter(Boolean),
)

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString('de-AT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
</script>

<template>
  <div class="session-detail">
    <RouterLink to="/sessions" class="back-link">← Alle Sessions</RouterLink>

    <div v-if="!session" class="not-found">
      <h1>Session nicht gefunden.</h1>
      <RouterLink to="/sessions">Zurück zur Übersicht</RouterLink>
    </div>

    <template v-else>
      <div class="detail-header">
        <div class="badge-row">
          <span class="badge level" :data-level="session.level">{{ session.level }}</span>
          <span class="badge format">{{ session.format }}</span>
          <span v-if="track" class="badge track">{{ track.name }}</span>
        </div>
        <h1 class="detail-title">{{ session.title }}</h1>
        <div class="detail-meta">
          <span>📅 {{ formatDay(session.day) }}</span>
          <span>🕐 {{ session.startTime }}–{{ session.endTime }}</span>
          <span v-if="room">📍 {{ room.name }}</span>
        </div>
      </div>

      <section class="abstract-section">
        <h2 class="section-title">Abstract</h2>
        <p class="abstract-text">{{ session.abstract }}</p>
      </section>

      <section v-if="speakers.length" class="speakers-section">
        <h2 class="section-title">Speaker</h2>
        <div class="speakers-list">
          <RouterLink
            v-for="sp in speakers"
            :key="sp!.id"
            :to="`/speakers/${sp!.id}`"
            class="speaker-item"
          >
            <div class="speaker-avatar">{{ sp!.name.charAt(0) }}</div>
            <div>
              <p class="speaker-name">{{ sp!.name }}</p>
              <p class="speaker-role">{{ sp!.title }} · {{ sp!.company }}</p>
            </div>
          </RouterLink>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.session-detail {
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

.detail-header {
  margin-bottom: var(--space-stack-lg);
}

.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-inline-sm);
  margin-bottom: var(--space-stack-md);
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

.badge.track {
  background-color: var(--color-primary-container);
  color: var(--color-on-primary-container);
}

.detail-title {
  font-size: var(--font-size-32);
  font-weight: var(--font-weight-bold);
  color: var(--color-on-surface);
  margin: 0 0 var(--space-stack-md);
  line-height: var(--font-line-height-tight);
}

.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-stack-md);
  font-size: var(--font-size-16);
  color: var(--color-on-surface-variant);
}

.section-title {
  font-size: var(--font-size-20);
  font-weight: var(--font-weight-semibold);
  color: var(--color-on-surface);
  margin: 0 0 var(--space-stack-md);
}

.abstract-section {
  margin-bottom: var(--space-stack-lg);
}

.abstract-text {
  font-size: var(--font-size-16);
  line-height: var(--font-line-height-normal);
  color: var(--color-on-surface-variant);
  margin: 0;
}

.speakers-section {
  margin-bottom: var(--space-stack-lg);
}

.speakers-list {
  display: grid;
  gap: var(--space-stack-md);
}

.speaker-item {
  display: flex;
  gap: var(--space-stack-md);
  align-items: center;
  background-color: var(--color-surface-container-low);
  border: 1px solid var(--color-outline-variant);
  border-radius: 12px;
  padding: var(--space-component-padding);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s;
}

.speaker-item:hover {
  border-color: var(--color-primary);
}

.speaker-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--color-primary-container);
  color: var(--color-on-primary-container);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-20);
  font-weight: var(--font-weight-bold);
  flex-shrink: 0;
}

.speaker-name {
  font-size: var(--font-size-16);
  font-weight: var(--font-weight-semibold);
  color: var(--color-on-surface);
  margin: 0 0 2px;
}

.speaker-role {
  font-size: var(--font-size-14);
  color: var(--color-on-surface-variant);
  margin: 0;
}
</style>
