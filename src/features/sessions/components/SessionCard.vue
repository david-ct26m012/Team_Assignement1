<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useConferenceData } from '@/composables/useConferenceData'
import type { Session } from '@/types/conference'

const props = defineProps<{ session: Session }>()

const { getTrackById, getRoomById, getSpeakerById } = useConferenceData()

const track = computed(() => getTrackById(props.session.trackId))
const room = computed(() => getRoomById(props.session.roomId))
const speakers = computed(() =>
  props.session.speakerIds.map((id) => getSpeakerById(id)).filter(Boolean),
)

const dayLabel = computed(() => {
  const d = new Date(props.session.day)
  return d.toLocaleDateString('de-AT', { weekday: 'short', day: 'numeric', month: 'short' })
})
</script>

<template>
  <RouterLink :to="`/sessions/${session.id}`" class="session-card">
    <div class="card-header">
      <span class="badge level" :data-level="session.level">{{ session.level }}</span>
      <span class="badge format">{{ session.format }}</span>
    </div>
    <h3 class="card-title">{{ session.title }}</h3>
    <p class="card-abstract">{{ session.abstract }}</p>
    <div class="card-meta">
      <span class="meta-item">
        <span class="meta-icon">📅</span>
        {{ dayLabel }} · {{ session.startTime }}–{{ session.endTime }}
      </span>
      <span v-if="room" class="meta-item">
        <span class="meta-icon">📍</span>
        {{ room.name }}
      </span>
      <span v-if="track" class="meta-item track-label">{{ track.name }}</span>
    </div>
    <div v-if="speakers.length" class="card-speakers">
      <span v-for="sp in speakers" :key="sp!.id" class="speaker-name">{{ sp!.name }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.session-card {
  display: block;
  background-color: var(--color-surface-container-low);
  border: 1px solid var(--color-outline-variant);
  border-radius: 12px;
  padding: var(--space-component-padding);
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.15s, border-color 0.15s;
}

.session-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 2px 8px color-mix(in srgb, var(--color-shadow) 12%, transparent);
}

.card-header {
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

.card-title {
  font-size: var(--font-size-16);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--space-stack-sm);
  line-height: var(--font-line-height-snug);
  color: var(--color-on-surface);
}

.card-abstract {
  font-size: var(--font-size-14);
  color: var(--color-on-surface-variant);
  margin: 0 0 var(--space-stack-sm);
  line-height: var(--font-line-height-normal);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-inline-sm);
  margin-bottom: var(--space-stack-sm);
}

.meta-item {
  font-size: var(--font-size-12);
  color: var(--color-on-surface-variant);
  display: flex;
  align-items: center;
  gap: 4px;
}

.meta-icon {
  font-size: 12px;
}

.track-label {
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
}

.card-speakers {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-inline-sm);
  font-size: var(--font-size-12);
  color: var(--color-on-surface-variant);
}

.speaker-name::before {
  content: '👤 ';
}
</style>
