<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useConferenceData } from '@/composables/useConferenceData'
import logoUrl from '@/assets/logo.png'

const { conference } = useConferenceData()
</script>

<template>
  <header class="header">
    <div class="header-content">
      <RouterLink to="/" class="brand-link">
        <img :src="logoUrl" :alt="conference.name" class="header-logo" />
      </RouterLink>
      <nav class="nav" aria-label="Hauptnavigation">
        <RouterLink to="/sessions" class="nav-link" active-class="nav-link--active">
          Programm
        </RouterLink>
        <RouterLink to="/speakers" class="nav-link" active-class="nav-link--active">
          Speaker
        </RouterLink>
        <RouterLink to="/my-program" class="nav-link" active-class="nav-link--active">
          Mein Programm
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
