# ADR 02: Projekt-Setup & Tooling

**Status:** angenommen · **Datum:** 08.10.2026

## Kontext

Wir bauen eine Web-App für die Konferenz FrontendNow. Sie braucht mehrere Seitentypen:
eine Übersicht, Detailseiten für Sessions und Speaker sowie ein persönliches Dashboard
„Mein Programm“. Wir brauchen also von Anfang an Routing, auch mit dynamischen URLs wie
`/sessions/:id`. Unser Team hat bisher mit Vue gearbeitet, aber noch nicht mit einem
Meta-Framework wie Nuxt. Das Setup muss außerdem die Schritte 2–4 tragen, ohne dass wir
später alles umbauen müssen.

## Alternativen

1. **Vue + Vite + vue-router**
   Vite erstellt das Projekt und startet einen schnellen Entwicklungsserver. Das Routing
   legen wir selbst in einer Datei (`router/index.ts`) fest. Wir sehen also genau, welche
   URL zu welcher Seite führt.
2. **Nuxt**
   Nuxt baut auf Vue und Vite auf und bringt vieles automatisch mit: Routing über die
   Ordnerstruktur (`pages/`), automatische Imports und Layouts. Das spart Code, ist aber
   für uns neu und versteckt einiges an „Magie“, die wir erst verstehen müssten.

## Entscheidung

Wir wählen **Vue + Vite + vue-router**.

- **Routing-Bedarf:** Unsere Seiten lassen sich gut mit wenigen Routen abbilden.
  vue-router deckt alles ab, was wir brauchen, auch dynamische Routen und
  verschachtelte Layouts.
- **Team-Erfahrung:** Wir kennen Vue bereits. Mit Vite und vue-router kommt nur wenig
  Neues dazu, und wir können schneller mit der eigentlichen App beginnen.
- **Nachvollziehbarkeit:** Weil wir Routen selbst festlegen, verstehen wir jeden Schritt
  und können ihn im Team und bei der Präsentation erklären.
- **Spätere Anforderungen:** Neue Seiten (z. B. weitere Dashboards) fügen wir einfach als
  zusätzliche Route und View hinzu. Die Struktur aus ADR 01 bleibt dabei gleich.

## Konsequenzen

- **Positiv:** Schlankes Setup mit wenigen Abhängigkeiten und schnellem Start.
- **Positiv:** Wir lernen, wie Routing in Vue grundsätzlich funktioniert, statt uns auf
  Automatik zu verlassen.
- **Negativ:** Wir schreiben etwas mehr Code selbst, z. B. die Routen-Konfiguration und
  Imports, die Nuxt automatisch erledigen würde.
- **Negativ:** Funktionen, die Nuxt eingebaut hat, müssten wir bei Bedarf später selbst
  ergänzen. Ein Umstieg auf Nuxt wäre möglich, weil unsere Komponenten normale
  Vue-Komponenten sind, würde aber Aufwand bedeuten.
