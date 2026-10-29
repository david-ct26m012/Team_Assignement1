<script setup lang="ts">
import { useConferenceData } from '@/composables/useConferenceData'
import SpeakerCard from '@/features/speakers/components/SpeakerCard.vue'

const { speakers } = useConferenceData()
</script>

<template>
  <div class="speakers-view">
    <header class="page-header">
      <h1 class="page-title">Speaker</h1>
      <p class="page-subtitle">{{ speakers.length }} Speaker auf der FrontendNow 2026</p>
    </header>

    <div class="speakers-grid">
      <SpeakerCard v-for="speaker in speakers" :key="speaker.id" :speaker="speaker" />
    </div>
  </div>
</template>

<style scoped>
.speakers-view {
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

.speakers-grid {
  display: grid;
  gap: var(--space-stack-md);
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
</style>
