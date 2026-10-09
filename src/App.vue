<script setup lang="ts">
import '@/styles/app.css'
import conferenceData from './data/conference-data.json'
import logoUrl from '@/assets/logo.png'

const conference = conferenceData.conference
const sessionCount = conferenceData.sessions.length
const speakerCount = conferenceData.speakers.length
</script>

<template>
  <div class="app-layout">
    <header class="header">
      <div class="header-content">
        <a href="/" class="brand-link">
          <img
            :src="logoUrl"
            :alt="conference.name"
            class="header-logo"
          />
        </a>
      </div>
    </header>

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
