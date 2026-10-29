export interface Track {
  id: string
  name: string
}

export interface Room {
  id: string
  name: string
  capacity: number
}

export interface Speaker {
  id: string
  name: string
  title: string
  company: string
  bio: string
  sessionIds: readonly string[]
}

export interface Session {
  id: string
  title: string
  abstract: string
  trackId: string
  speakerIds: readonly string[]
  day: string
  startTime: string
  endTime: string
  roomId: string
  level: 'Einsteiger' | 'Fortgeschritten' | 'Experte'
  format: 'Vortrag' | 'Workshop' | 'Podium'
}

export interface Conference {
  name: string
  tagline: string
  dates: string[]
  location: string
  timezone: string
}

export interface ConferenceData {
  conference: Conference
  tracks: Track[]
  rooms: Room[]
  speakers: Speaker[]
  sessions: Session[]
}
