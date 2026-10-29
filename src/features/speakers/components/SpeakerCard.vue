<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Speaker } from '@/types/conference'

defineProps<{ speaker: Speaker }>()
</script>

<template>
  <RouterLink :to="`/speakers/${speaker.id}`" class="speaker-card">
    <div class="speaker-avatar">{{ speaker.name.charAt(0) }}</div>
    <div class="speaker-info">
      <h3 class="speaker-name">{{ speaker.name }}</h3>
      <p class="speaker-role">{{ speaker.title }} · {{ speaker.company }}</p>
      <p class="speaker-sessions">{{ speaker.sessionIds.length }} Session(s)</p>
    </div>
  </RouterLink>
</template>

<style scoped>
.speaker-card {
  display: flex;
  gap: var(--space-stack-md);
  align-items: center;
  background-color: var(--color-surface-container-low);
  border: 1px solid var(--color-outline-variant);
  border-radius: 12px;
  padding: var(--space-component-padding);
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.15s, border-color 0.15s;
}

.speaker-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 2px 8px color-mix(in srgb, var(--color-shadow) 12%, transparent);
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

.speaker-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.speaker-name {
  font-size: var(--font-size-16);
  font-weight: var(--font-weight-semibold);
  margin: 0;
  color: var(--color-on-surface);
}

.speaker-role {
  font-size: var(--font-size-14);
  color: var(--color-on-surface-variant);
  margin: 0;
}

.speaker-sessions {
  font-size: var(--font-size-12);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
  margin: 0;
}
</style>
