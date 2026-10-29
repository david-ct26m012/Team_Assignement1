<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useConferenceData } from '@/composables/useConferenceData'

const { conference, sessions, speakers } = useConferenceData()
</script>

<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero-title">{{ conference.name }}</h1>
      <p class="hero-tagline">{{ conference.tagline }}</p>
      <div class="hero-meta">
        <span>📅 15.–16. September 2026</span>
        <span>📍 {{ conference.location }}</span>
      </div>
    </section>

    <section class="stats">
      <div class="stat-card">
        <span class="stat-value">{{ sessions.length }}</span>
        <span class="stat-label">Sessions</span>
        <RouterLink to="/sessions" class="stat-link">Alle ansehen →</RouterLink>
      </div>
      <div class="stat-card">
        <span class="stat-value">{{ speakers.length }}</span>
        <span class="stat-label">Speaker</span>
        <RouterLink to="/speakers" class="stat-link">Alle ansehen →</RouterLink>
      </div>
      <div class="stat-card">
        <span class="stat-value">2</span>
        <span class="stat-label">Konferenztage</span>
      </div>
    </section>

    <section class="cta-row">
      <RouterLink to="/sessions" class="cta-btn primary">Programm entdecken</RouterLink>
      <RouterLink to="/speakers" class="cta-btn secondary">Speaker kennenlernen</RouterLink>
      <RouterLink to="/my-program" class="cta-btn secondary">Mein Programm</RouterLink>
    </section>
  </div>
</template>

<style scoped>
.home {
  max-width: 800px;
}

.hero {
  margin-bottom: var(--space-stack-lg);
}

.hero-title {
  font-size: var(--font-size-40);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin: 0 0 var(--space-stack-sm);
  line-height: var(--font-line-height-tight);
}

.hero-tagline {
  font-size: var(--font-size-20);
  color: var(--color-on-surface-variant);
  margin: 0 0 var(--space-stack-md);
}

.hero-meta {
  display: flex;
  gap: var(--space-stack-lg);
  font-size: var(--font-size-16);
  color: var(--color-on-surface-variant);
}

.stats {
  display: flex;
  gap: var(--space-stack-md);
  margin-bottom: var(--space-stack-lg);
}

.stat-card {
  flex: 1;
  background-color: var(--color-surface-container-low);
  border: 1px solid var(--color-outline-variant);
  border-radius: 12px;
  padding: var(--space-component-padding);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-size: var(--font-size-40);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  line-height: 1;
}

.stat-label {
  font-size: var(--font-size-14);
  color: var(--color-on-surface-variant);
}

.stat-link {
  font-size: var(--font-size-14);
  color: var(--color-primary);
  text-decoration: none;
  font-weight: var(--font-weight-semibold);
  margin-top: var(--space-stack-sm);
}

.stat-link:hover {
  text-decoration: underline;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-stack-md);
}

.cta-btn {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-size: var(--font-size-16);
  font-weight: var(--font-weight-semibold);
  transition: opacity 0.15s;
}

.cta-btn.primary {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}

.cta-btn.secondary {
  background-color: var(--color-surface-container);
  color: var(--color-on-surface);
  border: 1px solid var(--color-outline-variant);
}

.cta-btn:hover {
  opacity: 0.85;
}
</style>
