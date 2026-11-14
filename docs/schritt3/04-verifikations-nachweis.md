# Verifikations-Nachweis

## Test und Ergebnis

Die drei Offline-Tests wurden im Produktions-Build mit Safari durchgeführt. Nach
dem Online-Laden blieb die Session-Übersicht im Offline-Modus erreichbar und
zeigte 20 Sessions. Das bestätigt den Cache für App-Shell und Programmdaten
(Szenario 1). Eine online gespeicherte Session blieb auch offline unter „Mein
Programm“ sichtbar. Die Session-ID kam aus `localStorage` (Szenario 2). Für
Szenario 3 wurden Cache, Service Worker und gespeicherte Daten gelöscht. Beim
ersten Aufruf ohne Verbindung zeigte Safari eine Offline-Fehlerseite. Das ist
der erwartete Grenzfall ohne vorherigen Cache.

## Technische Prüfung

Der Produktions-Build erzeugte `dist/manifest.webmanifest` und `dist/sw.js`.
Der Safari-Webinspektor zeigte `manifest.webmanifest` im Netzwerkbereich. Die
zusätzliche Prüfung in Chrome zeigte ein erkanntes Manifest mit
`display: standalone` und einen aktiven Service Worker für
`http://localhost:4173/`. Der sichtbare Button „Installieren“ bestätigt die
Installierbarkeit. Der Lighthouse-Tab enthält in dieser Chrome-Version keine
eigene PWA-Kategorie; deshalb wurden die PWA-Punkte über Lighthouse und
„Application“ geprüft. Chrome meldet noch Warnungen zu den SVG-Icons und zur
fehlenden Manifest-ID. Diese Punkte sollten vor der Abgabe verbessert werden.

## Belege

- [Szenario 1: Session-Übersicht offline](./assets/szenario-1-sessions-offline.png)
- [Szenario 2: Mein Programm offline](./assets/szenario-2-mein-programm-offline.png)
- [Szenario 3: Erster Besuch offline](./assets/szenario-3-erstbesuch-offline.png)
- [Safari: Manifest und Service Worker](./assets/safari-service-worker-manifest.png)
- [Chrome: Manifest](./assets/chrome-manifest.png)
- [Chrome: Service Worker](./assets/chrome-service-worker.png)
- [Chrome: Lighthouse und Installation](./assets/chrome-lighthouse-installation.png)
