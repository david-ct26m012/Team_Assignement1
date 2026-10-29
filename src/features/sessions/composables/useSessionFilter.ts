import { computed, ref } from 'vue'
import type { Session } from '@/types/conference'

export function useSessionFilter(sessions: Readonly<{ value: readonly Session[] }>) {
  const selectedTrack = ref<string>('')
  const selectedDay = ref<string>('')
  const selectedLevel = ref<string>('')

  const filtered = computed(() => {
    return sessions.value.filter((s) => {
      const trackMatch = !selectedTrack.value || s.trackId === selectedTrack.value
      const dayMatch = !selectedDay.value || s.day === selectedDay.value
      const levelMatch = !selectedLevel.value || s.level === selectedLevel.value
      return trackMatch && dayMatch && levelMatch
    })
  })

  function reset() {
    selectedTrack.value = ''
    selectedDay.value = ''
    selectedLevel.value = ''
  }

  return { selectedTrack, selectedDay, selectedLevel, filtered, reset }
}
