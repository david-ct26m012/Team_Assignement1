<script setup lang="ts">
// conference-data.json importieren
import conferenceData from './data/conference-data.json'

// Einfache Werte auslesen
const conference = conferenceData.conference
const sessionCount = conferenceData.sessions.length
const speakerCount = conferenceData.speakers.length
</script>

<template>
  <div class="app-layout">
    <!-- Header mit Branding aus den Design Tokens -->
    <header class="header">
      <h1>{{ conference.name }}</h1>
      <p class="tagline">{{ conference.tagline }}</p>
    </header>

    <!-- Hauptbereich mit Funktionsnachweis für Punkt E -->
    <main class="content">
      <section class="proof-card">
        <h2>Systemstatus & Daten-Import Check</h2>
        <div class="stats">
          <div class="stat-box">
            <span class="label">Geladene Sessions:</span>
            <strong class="value">{{ sessionCount }}</strong>
          </div>
          <div class="stat-box">
            <span class="label">Speaker im System:</span>
            <strong class="value">{{ speakerCount }}</strong>
          </div>
          <div class="stat-box">
            <span class="label">Ort:</span>
            <strong class="value">{{ conference.location }}</strong>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.header {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  padding: var(--space-lg);
  text-align: center;
}

.header h1 {
  margin: 0;
  font-size: 2.5rem;
}

.tagline {
  margin-top: var(--space-sm);
  opacity: 0.9;
}

.content {
  padding: var(--space-lg);
  max-width: 800px;
  margin: 0 auto;
}

.proof-card {
  background-color: var(--color-surface);
  padding: var(--space-md);
  border-radius: 8px;
}

.stats {
  display: flex;
  gap: var(--space-md);
  margin-top: var(--space-md);
}

.stat-box {
  background-color: var(--color-background);
  padding: var(--space-md);
  border-radius: 4px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.875rem;
  margin-bottom: var(--space-sm);
}

.value {
  font-size: 1.5rem;
  color: var(--color-primary);
}
</style>
