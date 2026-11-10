# PWA-Setup: Manifest & Service-Worker-Registrierung

**Status:** umgesetzt · **Datum:** 10.11.2026  
**Plattform:** CONFZone — Begleit-App zur FrontendNow 2026  
**Federführung:** Person 1 (Scheucher)

---

## Tooling-Wahl: `vite-plugin-pwa`

Wir verwenden `vite-plugin-pwa` im `generateSW`-Modus (Workbox-basiert). Das
Plugin übernimmt automatisch die Service-Worker-Registrierung, generiert das
Manifest und injiziert die Precache-Liste zur Build-Zeit. Eine manuelle
SW-Registrierung hätte keinen Vorteil gebracht, da wir keinen eigenen
SW-Lifecycle (z. B. Update-Dialoge) benötigen. Der `registerType: 'autoUpdate'`
stellt sicher, dass neue Builds ohne Nutzereingabe aktiviert werden, was für
eine Konferenz-App (kein laufender „offener Tab"-Workflow) passend ist.

---

## Manifest-Werte

| Feld | Wert | Begründung |
|---|---|---|
| `name` | `CONFZone – FrontendNow 2026` | Vollständiger Produktname inkl. Konferenz |
| `short_name` | `CONFZone` | Passt auf Home-Screen-Labels (max. ~12 Zeichen) |
| `theme_color` | `#006B5E` | Entspricht `--color-primary` aus den Design Tokens (Teal 40) |
| `background_color` | `#F4FBF8` | Entspricht `--color-background` / `--color-surface` (Neutral 98) — verhindert weißen Splash-Blitz vor erstem Render |
| `display` | `standalone` | App läuft ohne Browser-Chrome; entspricht nativer App-Erfahrung |
| `start_url` | `/` | Startet immer auf der Homeview (Konferenzübersicht) |

---

## Icons

Zwei SVG-Icons unter `public/icons/`:

- `icon-192.svg` — für Home-Screen und App-Liste
- `icon-512.svg` — für Splash-Screen und maskable-Verwendung

Beide zeigen das Kürzel **CZ** (CONFZone) in Weiß auf Teal-Hintergrund (`#006B5E`),
konsistent mit dem primären Branding-Token. Der abgerundete Hintergrund entspricht
dem Icon-Stil moderner mobiler Betriebssysteme. SVG wurde PNG vorgezogen, da es
verlustfrei skaliert und keinen separaten Export-Schritt benötigt.
