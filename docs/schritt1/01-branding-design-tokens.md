## Markenkonzept

Wir verstehen die Konferenzseite nicht als Infobroschüre, sondern als persönlichen Begleiter: In wenigen Klicks finden Besucher:innen die Sessions, die zu ihnen passen, und stellen sich ihr eigenes Programm zusammen. Ein frisches, farbstarkes Erscheinungsbild rund um Türkis sorgt für Orientierung statt Reizüberflutung und hebt uns von nüchternen, rein funktionalen Konferenzseiten ab. Klarheit und Wärme statt Datenwüste.



## Begründung der Tokens-Architektur

Ausgangspunkt war ein Export aus dem Material Theme Builder. Diesen haben wir nicht
unverändert übernommen, sondern auf das reduziert, was wir tatsächlich verwenden, und in
zwei klar getrennte Ebenen umgebaut:

- **Primitive Tokens** (`primitive.color.*`): 33 Rohwerte, benannt nach Farbfamilie und
  Helligkeit (z. B. `teal.40`, `neutral.98`). Die Zahl entspricht der Helligkeit L*
  (0 = schwarz, 100 = weiß). Primitive tragen keine Bedeutung und werden in Komponenten
  nie direkt verwendet.
- **Semantische Tokens** (`semantic.light.color.*`): 49 Rollen nach Verwendungszweck
  (z. B. `primary`, `onSurface`, `outline`). Sie enthalten keine Hexwerte, sondern
  ausschließlich Verweise auf Primitive, z. B. `"primary": "{primitive.color.teal.40}"`.

### 1. Wartbarkeit
Jeder Farbwert existiert genau einmal. Soll etwa unser Türkis angepasst werden, ändern wir
einen primitiven Wert, und alle Rollen, die darauf verweisen, übernehmen die Änderung.
Weil Komponenten nur semantische Namen kennen, ist im Code sofort erkennbar, wofür eine
Farbe steht (`onPrimary` statt `#FFFFFF`).

### 2. Theming-Erweiterbarkeit
Die semantischen Rollen liegen bewusst unter `semantic.light`. Ein späterer Dark Mode
ergänzt lediglich einen Block `semantic.dark` mit denselben Rollennamen, der auf andere
Primitive verweist (z. B. `surface` → dunkler Neutralton). Komponenten müssen dafür nicht
angepasst werden. Die Struktur ist also vorbereitet, ohne den Dark Mode bereits
umzusetzen.

### 3. Konsistenz
Die Material-Rollen bilden feste Paare aus Fläche und Inhalt (`primary`/`onPrimary`,
`surface`/`onSurface`, `errorContainer`/`onErrorContainer`). Wer eine Fläche einsetzt,
greift automatisch zur passenden Text- bzw. Iconfarbe. So entstehen keine frei
kombinierten Farbpaare, auch wenn zwei Personen parallel an Komponenten arbeiten.

### 4. Barrierefreiheit
Da nur geprüfte Paare als semantische Rollen existieren, ist die Kontrastprüfung in die
Struktur eingebaut. Alle Paare erfüllen WCAG 2.1 AA (geprüft mit dem WebAIM Contrast
Checker):

| Paar | Kontrast |
|---|---|
| `onSurface` auf `surface` | 16,3 : 1 |
| `onPrimary` auf `primary` | 6,4 : 1 |
| `primary` als Text auf `surface` | 6,1 : 1 |
| `onPrimaryContainer` auf `primaryContainer` | 7,3 : 1 |
| `onError` auf `error` | 6,5 : 1 |
| `outline` auf `surface` (UI-Element, ≥ 3 : 1) | 4,3 : 1 |