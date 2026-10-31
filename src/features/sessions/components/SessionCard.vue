<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useConferenceData } from '@/composables/useConferenceData'
import { useMyProgram } from '@/composables/useMyProgram'
import type { Session } from '@/types/conference'

const props = defineProps<{ session: Session }>()

const { getTrackById, getRoomById, getSpeakerById } = useConferenceData()
const { isSaved, toggleSession } = useMyProgram()

const track = computed(() => getTrackById(props.session.trackId))
const room = computed(() => getRoomById(props.session.roomId))
const speakers = computed(() =>
  props.session.speakerIds.map((id) => getSpeakerById(id)).filter(Boolean),
)

const saved = computed(() => isSaved(props.session.id))

const dayLabel = computed(() => {
  const d = new Date(props.session.day)
  return d.toLocaleDateString('de-AT', { weekday: 'short', day: 'numeric', month: 'short' })
})
</script>

<template>
  <article class="session-card">
  <RouterLink :to="`/sessions/${session.id}`" class="session-card__link">
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

  <div class="card-actions">
      <button
        type="button"
        class="save-button"
        :class="{ 'save-button--active': saved }"
        @click.stop="toggleSession(props.session.id)"
      >
        {{ saved ? 'Entfernen' : 'Merken' }}
      </button>
    </div>
  </article>
</template>

<style scoped>
.session-card {
  display: flex;
  justify-content: space-between;
  gap: var(--space-stack-md);
  background-color: var(--color-surface-container-low);
  border: 1px solid var(--color-outline-variant);
  border-radius: 12px;
  padding: var(--space-component-padding);
}

.session-card__link {
  flex: 1;
  text-decoration: none;
  color: inherit;
}

.card-actions {
  display: flex;
  align-items: center;
}

.save-button {
  border: 1px solid var(--color-outline-variant);
  border-radius: 999px;
  background: transparent;
  color: var(--color-on-surface);
  padding: 0.5rem 0.9rem;
  cursor: pointer;
}

.save-button--active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-on-primary);
}
</style>