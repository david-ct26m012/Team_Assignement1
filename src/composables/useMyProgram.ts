import { computed, readonly, ref, watch } from 'vue'
import { useConferenceData } from '@/composables/useConferenceData'

const STORAGE_KEY = 'my-program'
const savedIds = ref<string[]>([])

function readSavedIds(): string[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed.filter((id): id is string => typeof id === 'string' && id.length > 0)
  } catch {
    return []
  }
}

export function useMyProgram() {
  const { getSessionById } = useConferenceData()

  function normalize(ids: string[]) {
    return [...new Set(ids)].filter((id) => Boolean(getSessionById(id)))
  }

  function load() {
    savedIds.value = normalize(readSavedIds())
  }

  load()

  watch(
    savedIds,
    (value) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalize(value)))
      }
    },
    { deep: false },
  )

  const mySessions = computed(() =>
    savedIds.value
      .map((id) => getSessionById(id))
      .filter((session): session is NonNullable<typeof session> => Boolean(session)),
  )

  function addSession(id: string) {
    if (!id || !getSessionById(id)) return
    savedIds.value = [...new Set([...savedIds.value, id])]
  }

  function removeSession(id: string) {
    savedIds.value = savedIds.value.filter((value) => value !== id)
  }

  function toggleSession(id: string) {
    if (isSaved(id)) {
      removeSession(id)
    } else {
      addSession(id)
    }
  }

  function isSaved(id: string) {
    return savedIds.value.includes(id)
  }

  return {
    savedIds: readonly(savedIds),
    mySessions,
    addSession,
    removeSession,
    toggleSession,
    isSaved,
  }
}