import { readonly, ref } from 'vue'
import rawData from '@/data/conference-data.json'
import type { ConferenceData, Session, Speaker, Track, Room } from '@/types/conference'

const data = rawData as ConferenceData

const sessions = ref<Session[]>(data.sessions)
const speakers = ref<Speaker[]>(data.speakers)
const tracks = ref<Track[]>(data.tracks)
const rooms = ref<Room[]>(data.rooms)
const conference = ref(data.conference)

const sessionMap = new Map<string, Session>(data.sessions.map((s) => [s.id, s]))
const speakerMap = new Map<string, Speaker>(data.speakers.map((s) => [s.id, s]))
const trackMap = new Map<string, Track>(data.tracks.map((t) => [t.id, t]))
const roomMap = new Map<string, Room>(data.rooms.map((r) => [r.id, r]))

export function useConferenceData() {
  function getSessionById(id: string): Session | undefined {
    return sessionMap.get(id)
  }

  function getSpeakerById(id: string): Speaker | undefined {
    return speakerMap.get(id)
  }

  function getTrackById(id: string): Track | undefined {
    return trackMap.get(id)
  }

  function getRoomById(id: string): Room | undefined {
    return roomMap.get(id)
  }

  return {
    sessions: readonly(sessions),
    speakers: readonly(speakers),
    tracks: readonly(tracks),
    rooms: readonly(rooms),
    conference: readonly(conference),
    getSessionById,
    getSpeakerById,
    getTrackById,
    getRoomById,
  }
}
