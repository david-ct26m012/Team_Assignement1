# ADR 02: Rendering-Strategie pro Anwendungsteil

**Status:** angenommen · **Datum:** 29.10.2026

## Einleitung

Die Wahl der Rendering-Strategie beeinflusst Ladezeit, SEO, Komplexität und
Personalisierbarkeit. Unsere Entscheidungskriterien:

- **Datenstabilität:** Ändert sich der Inhalt zur Laufzeit oder ist er zur Build-Zeit fix?
- **Personalisierung:** Ist die Seite nutzerabhängig (→ CSR) oder öffentlich identisch (→ SSG/SSR)?
- **Performance:** Kann die Seite als fertig gerendertes HTML ausgeliefert werden (→ SSG/SSR), oder ist Client-JS zwingend nötig?
- **Rahmen:** Da wir eine Vite-SPA verwenden (kein SSR-fähiges Framework wie Nuxt), bedeutet „SSG-äquivalent", dass die Daten zur Build-Zeit ins Bundle gepackt werden und keine Netzwerkanfragen zur Laufzeit nötig sind. Eine echte SSR/ISR-Simulation ist konzeptionell beschrieben, aber nicht als Live-Backend implementiert.

---

## Entscheidungspunkt 1: Session-Übersicht mit Filterung

**Federführung: Person 1 (Scheu)**

### Kontext

Die Session-Übersicht zeigt alle 20 Sessions der Konferenz und erlaubt es
Nutzer:innen, nach Track, Tag und Level zu filtern. Die Sessiondaten stammen aus
`conference-data.json` und ändern sich nach dem Build nicht mehr (der Zeitplan
wird vor der Konferenz einmalig festgelegt). Die Filter selbst sind interaktiv
und nutzerabhängig.

### Optionen

1. **SSG (Static Site Generation):** Die Seite wird zur Build-Zeit vorgerendert
   mit allen 20 Sessions. Filterlogik läuft vollständig clientseitig per
   JavaScript — kein Reload beim Filtern. In unserem Vite-SPA-Kontext entspricht
   dies dem Bündeln der JSON-Daten im App-Bundle; es gibt keinen Serveraufruf
   zur Laufzeit.

2. **SSR (Server-Side Rendering):** Die Seite wird bei jedem Seitenaufruf
   server-seitig gerendert. Ermöglicht URL-basierte Filter (`?track=ai-dx`),
   sodass gefilterte Ansichten bookmarkbar und SEO-freundlich sind. Erfordert
   einen laufenden Node-Server (z. B. Nuxt).

3. **CSR (Client-Side Rendering):** Leere HTML-Shell, alle Daten werden beim
   Browser-Start geladen. Kein Vorteil gegenüber SSG, aber langsamerer First
   Paint und schlechtere SEO.

### Entscheidung

**SSG-äquivalent** (Daten im Bundle, clientseitige Filterung).

Die Sessiondaten sind statisch und ändern sich nicht. SSG liefert maximale
Performance (kein Ladezustand für Daten) und ist im bestehenden Vite-Setup
ohne zusätzliche Infrastruktur umsetzbar. Die Filter laufen reaktiv im Client
(Vue Computed Properties), was für 20 Sessions problemlos performant ist.

SSR wurde verworfen, weil es einen laufenden Server erfordert, der für dieses
Szenario (statische Konferenzdaten) unverhältnismäßig wäre. URL-basiertes
Filter-State ist als mögliche Erweiterung in Schritt 3 vorgesehen.

### Konsequenzen

- **Positiv:** Keine Ladezeit für Sessiondaten; sofortige Filterreaktivität.
- **Positiv:** Kein Server nötig; funktioniert als statisches Hosting.
- **Negativ:** Filter-State steckt nicht in der URL (kein direktes Teilen
  einer gefilterten Ansicht). Kann in Schritt 3 via Query-Parameter nachgerüstet
  werden.
- **Negativ:** Alle 20 Sessions sind immer im Bundle, auch wenn nur 3 angezeigt
  werden — bei 20 Sessions kein Problem.

---

## Entscheidungspunkt 2: Speaker-Profilseiten

**Federführung: Person 1 (Scheu)**

### Kontext

Jede der 18 Speaker-Profilseiten zeigt statische Daten: Name, Titel, Firma,
Bio und die Liste der gehaltenen Sessions. Diese Daten ändern sich nach dem
Build nicht. Die Seiten sind öffentlich und nicht nutzerabhängig. Eine Route
`/speakers/:id` löst die jeweilige Detailseite auf.

### Optionen

1. **SSG:** Alle 18 Profilseiten werden zur Build-Zeit erzeugt (oder im SPA-
   Kontext: beim ersten Rendern im Client aus dem Bundle aufgebaut). Kein
   Serveraufruf nötig; optimaler First Paint.

2. **SSR:** Seite wird auf Anfrage server-seitig gerendert. Bietet dieselben
   Inhalte wie SSG, aber mit Serveraufwand ohne Mehrwert, da sich Speaker-
   Profile nicht zur Laufzeit ändern.

3. **ISR (Incremental Static Regeneration):** Seiten werden statisch generiert
   und nach einer definierten Zeit neu gebaut. Sinnvoll, wenn Speaker-Profile
   kurzfristig aktualisiert werden müssen (z. B. Änderung der Bio, neues Bild).
   Erfordert ein ISR-fähiges Framework (Nuxt, Next.js).

### Entscheidung

**SSG-äquivalent** (Daten im Bundle).

Speaker-Profile sind rein statisch. SSG liefert die beste Performance bei
minimalem Aufwand. ISR wäre konzeptionell interessant, wenn Speaker ihre Bio
selbst aktualisieren könnten — dieser Anwendungsfall ist im Szenario aber nicht
vorgesehen. SSR bringt für unveränderliche Daten keinen Vorteil gegenüber SSG.

### Konsequenzen

- **Positiv:** Kein Ladezustand; Profile sind sofort verfügbar.
- **Positiv:** Direkte Verlinkung von Sessions zu Speaker-Profilen ohne
  asynchronen Fetch.
- **Negativ:** Bio-Aktualisierungen erfordern einen neuen Build/Deploy.
  Für eine echte Plattform müsste zu ISR oder SSR migriert werden, sobald
  Speaker eigene Profile pflegen sollen.

---

## Entscheidungspunkt 3: Session-Detailseiten

**Federführung: Person 2**

### Kontext

Jede der 20 Session-Detailseiten zeigt Titel, Abstract, Zeit (Tag,
Start-/Endzeit), Raum, Track, Level, Format und Links zu den zugehörigen
Speaker-Profilen. Die Daten kommen aus `conference-data.json`. Mögliche
Laufzeitänderungen: Raumwechsel, Zeitplanverschiebungen kurz vor der Konferenz.

### Optionen

1. **SSG:** Seiten werden zur Build-Zeit erzeugt. Schnellste Auslieferung;
   keine Serverinfrastruktur. Zeitplanänderungen erfordern einen neuen Build.

2. **ISR:** Seiten werden statisch generiert und nach einem Revalidierungsintervall
   (z. B. 10 Minuten) neu gebaut. Halbwegs aktuelle Daten bei guter Performance.
   Erfordert ein ISR-fähiges Framework.

3. **SSR:** Seite wird bei jedem Aufruf server-seitig gerendert. Immer aktuelle
   Daten, aber höhere Serverbelastung; für Detailseiten mit statischen Inhalten
   überdimensioniert.

### Entscheidung

**SSG-äquivalent** mit konzeptionellem ISR-Ausblick.

Im aktuellen Vite-SPA-Setup sind die Daten im Bundle fixiert (SSG-äquivalent).
Konzeptionell wäre ISR die bessere Wahl für eine Produktionsplattform mit
möglichen Raumänderungen: Seiten bleiben schnell, werden aber in einem
definierten Intervall neu generiert. Da kein Live-Backend vorhanden ist, wird
ISR als Konzept beschrieben, aber nicht implementiert.

### Konsequenzen

- **Positiv (SSG):** Minimale Infrastruktur; alle Detailseiten sofort verfügbar.
- **Konzeptionell (ISR):** Kurzzeitige Inkonsistenz zwischen Build und Live-Data
  ist akzeptabel für Raumänderungen, nicht jedoch für Ausfälle.
- **Negativ:** Zeitplanänderungen (Raumwechsel) erfordern im SPA-Kontext einen
  neuen Build und Deploy.

---

## Entscheidungspunkt 4: „Mein Programm"-Dashboard

**Federführung: Person 2**

### Kontext

Das „Mein Programm"-Dashboard zeigt die vom Nutzer gespeicherten Sessions.
Der State ist rein nutzerabhängig: er entsteht durch Klicks, wird in
`localStorage` gespeichert und ist für niemand anderen sichtbar. Es gibt keinen
serverseitigen Anteil.

### Optionen

1. **CSR (Client-Side Rendering):** Seite wird als leere Shell ausgeliefert;
   beim Laden liest JavaScript den `localStorage` aus und rendert die gespeicherten
   Sessions. Keine Serverkommunikation nötig.

2. **SSR mit Session/Cookie:** Personalisierten State server-seitig rendern,
   indem der gespeicherte State in einem Cookie übertragen wird. Erfordert
   Serverinfrastruktur und ist für `localStorage`-basierten State unnötig komplex.

3. **SSG:** Nicht anwendbar — es gibt keine statische Version dieser Seite, da
   der Inhalt pro Nutzer unterschiedlich ist.

### Entscheidung

**CSR.**

Der personalisierte State existiert ausschließlich im Browser. CSR ist die
einzig sinnvolle Strategie: es gibt keine serverseitige Datenquelle und nichts
zum Vorrendern. Die Rehydration aus `localStorage` erfolgt synchron beim
App-Start über `useMyProgram()`.

### Konsequenzen

- **Positiv:** Kein Server, keine Cookies, maximale Privatsphäre.
- **Positiv:** Einfache Implementierung mit Vue Composables + `watch` auf
  `localStorage`.
- **Negativ:** State ist gerätegebunden — kein Sync zwischen zwei Browsern.
  Für eine Multi-Device-Lösung wäre ein Backend nötig (außerhalb des Scopes).
- **Negativ:** Bei deaktiviertem JavaScript ist die Seite leer (kein SSR-Fallback).
