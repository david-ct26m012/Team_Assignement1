# Entscheidungsprotokoll: Offline und Caching

**Status:** getestet  
**Datum:** 14.11.2026  
**Plattform:** CONFZone

## Kontext

Die Konferenz findet auch bei schlechtem WLAN oder im Flugmodus statt. Sessions,
Speaker und die App müssen nach dem ersten Online-Laden offline erreichbar sein.
„Mein Programm“ wird im `localStorage` gespeichert.

## Optionen

Für die App-Shell wurden zwei Optionen geprüft:

- **Network First:** zuerst das Netz nutzen, bei Fehler den Cache nutzen.
- **Cache First:** immer zuerst den Cache nutzen.

Für die statischen JavaScript- und CSS-Dateien wurde Cache First gewählt. Die
Dateien haben einen Hash im Dateinamen und ändern sich dadurch bei einem neuen
Build.

## Entscheidung

Für die App-Shell nutzen wir Network First mit Cache-Fallback. So bekommt die
App online die aktuelle Version und startet offline trotzdem. Für statische
Dateien nutzen wir Cache First. Sessions und Speaker sind im JavaScript-Bundle
enthalten und werden dadurch ebenfalls offline geladen. „Mein Programm“ bleibt
im `localStorage`. Ein eigener Cache-Eintrag ist dafür nicht nötig.

## Konsequenzen

Nach einem Online-Besuch kann die App ohne Verbindung weiter genutzt werden.
Neue Änderungen an Sessions erscheinen erst nach einem neuen Build. Beim ersten
Besuch ohne Netz gibt es noch keinen Cache. Die App kann dann nicht starten.
Das ist akzeptabel, weil die App vor der Konferenz einmal online geöffnet werden
musste.

## Testszenario 1: Session-Übersicht im Flugmodus

**Ausgangslage:** Die Startseite und die Programmdaten wurden online geladen.
Danach wurde der Flugmodus beziehungsweise der Offline-Modus aktiviert.

**Aktion:** Die Session-Übersicht wurde erneut geöffnet.

**Beobachtung:** Die Seite `/sessions` wurde ohne Netzwerkverbindung geöffnet.
Die Übersicht zeigte weiterhin 20 Sessions. Filter und Session-Karten waren
sichtbar. Es erschien keine Browser-Fehlerseite.

**Ergebnis:** Der Test war erfolgreich. Die App-Shell und die Programmdaten
wurden aus dem Cache geladen. Das bestätigt die Entscheidung für Network First
mit Cache-Fallback und Cache First für die statischen Dateien.

## Testszenario 2: „Mein Programm“ offline

**Ausgangslage:** Eine Session wurde online zur persönlichen Programmliste
hinzugefügt. Danach wurde der Offline-Modus aktiviert.

**Aktion:** Die Seite „Mein Programm“ wurde geöffnet.

**Beobachtung:** Die Seite wurde ohne Netzwerkverbindung geladen. Die zuvor
gespeicherte Session „Die Zukunft der Web-Frontends: Trends 2026+“ war sichtbar.
Auch die Schaltflächen „Details“ und „Entfernen“ wurden angezeigt.

**Ergebnis:** Der Test war erfolgreich. Die Session-ID blieb im `localStorage`.
Die App-Shell und die Sessiondaten waren ebenfalls im Cache. Deshalb konnte
„Mein Programm“ vollständig offline angezeigt werden.
Die Navigation und die sichtbaren Aktionen blieben dabei nutzbar.

## Testszenario 3: Erster Besuch direkt offline

**Ausgangslage:** Cache, Service Worker und gespeicherte Daten wurden gelöscht.
Danach wurde die Verbindung getrennt. Die App wurde zum ersten Mal offline
geöffnet.

**Aktion:** Die Startseite wurde direkt im Offline-Modus aufgerufen.

**Beobachtung:** Die App konnte nicht geladen werden. Der Browser zeigte eine
Offline-Fehlerseite. Es gab noch keine gespeicherte App-Shell und keine
Programmdaten.

**Ergebnis:** Dieses Verhalten ist der erwartete Grenzfall. Ohne vorherigen
Online-Besuch kann der Service Worker keinen Cache verwenden. Die App muss
deshalb vor der Offline-Nutzung mindestens einmal online geöffnet werden.
