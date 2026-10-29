<script setup lang="ts">
import '@/styles/app.css'
import { RouterView } from 'vue-router'
import AppShell from '@/components/layout/AppShell.vue'
</script>

<template>
  <AppShell>
    <RouterView />
  </AppShell>
</template>
