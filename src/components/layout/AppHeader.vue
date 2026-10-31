<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useConferenceData } from '@/composables/useConferenceData'
import { useMyProgram } from '@/composables/useMyProgram'
import logoUrl from '@/assets/logo.png'

const { conference } = useConferenceData()
const { savedIds } = useMyProgram()
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
          <span v-if="savedIds.length > 0" class="program-count">{{ savedIds.length }}</span>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.program-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.4rem;
  height: 1.4rem;
  padding: 0 0.3rem;
  border-radius: 999px;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  font-size: 0.7rem;
}
</style>
