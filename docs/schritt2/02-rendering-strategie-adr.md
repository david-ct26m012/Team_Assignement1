# ADR 02: Rendering-Strategie-ADR

## Einleitung

Ich habe die Rendering-Strategie nur für die Bereiche entschieden, die ich tatsächlich umgesetzt habe: Session-Detailseiten und „Mein Programm“. Entscheidend war, ob die Daten statisch sind oder nur im Browser existieren. Die Sessiondaten sind fix und im Projekt enthalten, daher ist eine statische Auslieferung sinnvoll. Das persönliche Programm ist nutzerabhängig und wird nur im Browser gespeichert. Deshalb ist CSR für diese Funktion die richtige Wahl. Ich habe keine echte SSR- oder ISR-Umsetzung gewählt, weil dafür ein laufender Server oder ein Live-Backend nötig wäre. Für dieses Projekt ist das zu aufwendig und nicht nötig.

---

## 1) Session-Detailseiten

### Kontext
Die Session-Detailseiten zeigen feste Inhalte wie Titel, Abstract, Datum, Uhrzeit, Raum, Track, Level, Format und die zugehörigen Speaker. Diese Daten ändern sich nicht während der Nutzung der App. Sie sind Teil des statischen Konferenzdatensatzes und werden mit der App ausgeliefert.

### Optionen
- SSG: Die Seiten werden vorab mit dem Projekt ausgeliefert.
- SSR: Die Seite wird bei jedem Aufruf serverseitig neu gerendert.
- ISR: Statische Seiten werden in einem Intervall neu gebaut.

### Entscheidung
Ich habe SSG-äquivalent gewählt.

### Konsequenzen
Das ist die beste Lösung für diese Daten. Die Detailseiten sind schnell, leicht und zuverlässig. Es gibt keine Ladezeit für die Inhalte und keine zusätzliche Serverlogik. Ich habe bewusst keine SSR-Lösung gewählt, weil die Daten nicht live sind und kein echtes Backend vorhanden ist. ISR wäre nur sinnvoll, wenn sich Zeitplan oder Raum kurzfristig ändern würden. Das ist hier zwar denkbar, aber nicht Teil eines echten Live-Systems. Für dieses Projekt ist statische Auslieferung ausreichend und deutlich einfacher.

---

## 2) Mein Programm-Dashboard

### Kontext
„Mein Programm“ ist personalisiert. Der Nutzer speichert Session-IDs im Browser, und diese Einträge sind nur für ihn sichtbar. Die Daten kommen nicht aus einem Server, sondern aus dem lokalen Zustand und aus dem Konferenzdatensatz. Bei einem Reload müssen die gespeicherten Einträge wieder geladen werden.

### Optionen
- CSR: Der State wird im Browser gelesen und verwaltet.
- SSR: Der persönliche State müsste serverseitig übergeben werden.
- SSG: Nicht passend, weil der Inhalt individuell ist.

### Entscheidung
Ich habe CSR gewählt.

### Konsequenzen
Das passt genau zu den Daten und zur Architektur. Die gespeicherten Session-IDs bleiben im Browser, werden nach dem Reload wieder geladen und sichtbar gemacht. Dafür brauche ich keinen Server. Ich habe bewusst keine SSR-Lösung gewählt, weil der persönliche Zustand nicht serverseitig existiert und durch localStorage verwaltet wird. Ein Nachteil ist, dass der State nur auf diesem Gerät gespeichert ist. Für eine Multi-Geräte-Lösung wäre später ein Backend nötig. Für das Projekt ist CSR die passende und verständliche Lösung.