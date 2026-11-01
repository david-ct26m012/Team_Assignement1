# AI-LOG — David Scheu

Dieses Log dokumentiert alle KI-Assistenten-Einsätze für Schritt 2 der Projektarbeit.

---

## Einträge

### 2026-10-29

**Tool:** Claude Code (claude-sonnet-4-6)

**Prompt:**
> bitte schau dir die angabe 04c an und übernimm die aufgaben der person 1

**Zweck:**
Gesamtimplementierung der Person-1-Aufgaben für Schritt 2. Ziel war es, ausgehend vom
bestehenden Grundgerüst (Schritt 1) folgende Deliverables zu erstellen:
- TypeScript-Typen für alle Konferenzdaten (`src/types/conference.json`)
- `useConferenceData()`-Composable mit ID-Lookup-Maps
- `useSessionFilter()`-Composable für die AND-verknüpfte Filterlogik
- Session-Übersicht mit Filtern nach Track, Tag und Level (`SessionsView.vue`)
- Speaker-Übersicht (`SpeakersView.vue`) und Speaker-Detailseiten (`SpeakerDetailView.vue`)
- Session-Detailseiten (`SessionDetailView.vue`) als Starthilfe für Person 2
- `MyProgramView.vue`-Stub damit die Routen lauffähig sind
- Navigation in `App.vue` mit Vue Router

Das Prompt löste eine vollständige Implementierung aller Komponenten, Composables,
Views und Router-Konfiguration aus.

---

### 2026-10-29

**Tool:** Claude Code (claude-sonnet-4-6)

**Prompt:**
> hilf mir die begründung für die session-übersicht in der ADR auszuformulieren. ich will sicherstellen, dass ich echte alternativen diskutiere (also nicht einfach SSG als default nehme) und die dateneigenschaften als argument nutze

**Zweck:**
Die Entscheidungspunkte 1 und 2 der Rendering-Strategie-ADR (Session-Übersicht und
Speaker-Profile) sollten nach dem Schema Kontext → Optionen → Entscheidung →
Konsequenzen aufgebaut sein und mind. 2 echte Alternativen diskutieren. Ich wollte
sichergehen, dass die Begründung nicht nur SSG als naheliegende Default-Wahl übernimmt,
sondern SSR und CSR tatsächlich anhand der Dateneigenschaften abwägt und verwirft.

---

### 2026-10-30

**Tool:** Claude Code (claude-sonnet-4-6)

**Prompt:**
> der useSessionFilter gibt bei allen leeren selects alle sessions zurück — stimmt das mit der AND-verknüpfung überein oder interpretiere ich das falsch? erkläre kurz die logik

**Zweck:**
Ich war unsicher, ob ein leerer Filter als „kein Filter gesetzt" (→ alle Sessions durchlassen)
oder als eigener Filterwert zu behandeln ist. Die AND-Verknüpfung aus der Aufgabe bedeutet,
dass alle aktiven Filter gleichzeitig gelten müssen — ein leerer String bedeutet „nicht aktiv",
also kein Ausschluss. Ich wollte die Logik in `useSessionFilter.ts` verstehen und bestätigen,
bevor ich die Filterkomponente fertigstellt.

---

### 2026-10-31

**Tool:** Claude Code (claude-sonnet-4-6)

**Prompt:**
> ich will das cross-review für person 2 machen — SessionDetailView und MyProgramView. was soll ich konkret prüfen damit ich offensichtliche brüche zwischen den features finde?

**Zweck:**
Vor der Abgabe war ein gegenseitiges Cross-Review vorgesehen. Ich wollte gezielt prüfen,
ob die Detailseiten alle geforderten Felder (Titel, Abstract, Tag, Zeit, Raum, Track, Level,
Format, Speaker-Links) anzeigen und ob die localStorage-Persistenz in „Mein Programm"
über einen Reload hinweg funktioniert — ohne die gesamte Codebasis nochmals durchzulesen.
