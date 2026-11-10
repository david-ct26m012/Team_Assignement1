# Offline-Strategie-Konzept: Caching pro Datentyp

**Status:** angenommen · **Datum:** 10.11.2026  
**Plattform:** CONFZone — Begleit-App zur FrontendNow 2026  
**Team:** David Scheucher, Aissa Mohamad Iyad

---

## Ausgangslage

CONFZone läuft als Vite-SPA auf Vue. Konferenz-Daten (Sessions, Speaker) werden
zur Build-Zeit als ES-Modul-Import eingebettet — es gibt keinen separaten HTTP-Fetch
für diese Daten zur Laufzeit. Personalisierter State („Mein Programm") liegt in
`localStorage`. Typische Nutzungssituation: Teilnehmer:innen öffnen die App im
Vortragssaal bei schlechtem Konferenz-WLAN oder im Flugmodus zwischen zwei Sessions.
Das Ziel ist, dass alle Kernfunktionen (Programm abrufen, eigene Session-Liste
einsehen) nach dem ersten Online-Besuch auch vollständig offline funktionieren.

---

## Datentyp 1 — Sessions- und Speaker-Daten (JS-Bundle)

Da die Daten per Vite-Import ins Bundle eingebettet sind, erscheinen sie dem Service
Worker als reguläre `.js`-Datei mit Content-Hash im Dateinamen (z. B.
`assets/index.D4bHz3fT.js`). Gleicher Hash = identischer Inhalt — die Datei ist
unveränderlich.

**Gewählte Strategie: Cache First (Immutable)**

Der Service Worker liefert das Bundle direkt aus dem Cache, ohne das Netz zu
befragen. Beim ersten Online-Besuch wird das Bundle gecacht; danach steht es sofort
zur Verfügung — kein Netzwerk-Roundtrip, kein Ladespinner, auch bei
Verbindungsabbruch mitten in der Nutzung.

**Warum nicht Stale-While-Revalidate?** SWR wäre sinnvoll, wenn kurzfristige
Raumänderungen über eine API eingespielt werden könnten: der Nutzer erhält sofort
die gecachte Version, während im Hintergrund ein Update heruntergeladen wird. In
unserem Setup erfordert eine Raumänderung einen neuen Build und damit einen neuen
Hash — SWR ist daher konzeptionell relevant (z. B. bei einer API-Migration in
Schritt 4), aber aktuell nicht nötig.

---

## Datentyp 2 — App Shell (`index.html`)

`index.html` trägt keinen Content-Hash. Sie muss bei jedem neuen Deploy aktualisiert
werden, damit der Browser die neuen Bundle-Referenzen aufnimmt.

**Gewählte Strategie: Network First mit Cache-Fallback**

Der Service Worker versucht zuerst, `index.html` frisch aus dem Netz zu laden. Ist
das Netz nicht erreichbar, fällt er auf die zuletzt gecachte Version zurück. Damit
ist die App auch offline startfähig — was zwingend nötig ist, da ohne Shell weder
Routing noch `useMyProgram()` ausgeführt werden können.

**Worst Case:** Ein Nutzer öffnet die App zum allerersten Mal ohne Netzverbindung.
Da noch kein Cache vorhanden ist, schlägt der Fallback fehl und die App zeigt nichts
an. Das ist akzeptables Verhalten: eine Konferenz-App wird typischerweise zu Hause
oder im Hotel vorgeladen, bevor man in den schlecht vernetzten Vortragssaal geht.

---

## Datentyp 3 — „Mein Programm" (User State)

Die gespeicherten Session-IDs liegen in `localStorage` und sind vom Netz vollständig
unabhängig. Ein eigener Caching-Eintrag im Service Worker ist nicht nötig.

**Gewählte Strategie: localStorage (kein HTTP-Caching)**

Die Offline-Verfügbarkeit von „Mein Programm" hängt ausschließlich davon ab, ob
die App Shell gecacht ist (Datentyp 2). Ist die Shell im Cache, rendert Vue die
Composable `useMyProgram()`, liest die IDs aus `localStorage` und löst sie gegen
den ebenfalls gecachten Datensatz auf — vollständig ohne Netz.

---

## Strategievergleich

| Strategie | Angewendet auf | Vorteil | Nachteil |
|---|---|---|---|
| **Cache First** | JS/CSS-Bundles, Icons, Fonts | Sofortige Antwort; kein Netz nötig nach erstem Laden | Stale bei Inhaltsänderung (ausgeschlossen durch Hash) |
| **Network First + Cache-Fallback** | `index.html` | Immer aktuell, trotzdem offline-fähig | Netzaufruf beim Start (gering: nur Metadaten) |
| **localStorage** | My-Program-IDs | Synchron, keine Latenz, kein SW-Overhead | Gerätegebunden; kein Sync zwischen Tabs ohne `storage`-Event |
| *(konzeptionell)* **Stale-While-Revalidate** | Programmdaten via API | Sofortantwort + Hintergrundupdate | Kurze Inkonsistenz akzeptieren; nur sinnvoll bei API-Datenquelle |
