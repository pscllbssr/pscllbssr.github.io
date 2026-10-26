---
title: "Boote beobachten mit KI"
description: "Mit Vibe-Coding journalistische Werkzeuge bauen."
pubDate: 2026-10-26
tags: ["Vibe-Coding", "KI"]
heroImage: "/images/blog/roi-picker.webp"
---

Erst aus der Tiefgarage zirkeln, dann mit dem Boot über die Autobahn, durch den dichten Stadtverkehr und schliesslich einwassern. Über eine Stunde dauert es jeweils, wenn Bujar Salihu mit seinem Boot auf den Zürichsee will. Und das seit sechs Jahren. Denn: Bootsplätze auf Schweizer Seen sind ein rares Gut. Die Wartelisten sind lang, bis zu 20 Jahre wartet man teilweise auf einen Platz. 

Und dann gibt es angeblich Boote, die über Jahre nicht benutzt werden und trotzdem ihren Platz nicht freigeben, so Insider. Das wollten wir für einen Rundschau-Beitrag genauer wissen und haben deshalb über den Sommer öffentliche Hafen-Webcams analysiert.

## Datenbeschaffung: Scraping

Die Datengrundlage bestand aus Bildern der Webcams von drei Häfen. Ein automatisiertes Skript rief deren Webseiten tagsüber im Halbstundentakt ab und speicherte die Bilder. Während acht Wochen kamen so **4861 Bilder** zusammen, praktisch ohne Lücken.  

## Meine Illusion...

Ich hatte eigentlich gehofft, die Abfahrten automatisch detektieren zu können: Pro Boot einen Bildausschnitt beobachten, dessen Helligkeitswerte zu einer Kennzahl verdichten und die entstehende Kurve anhand einiger Beispiele so kalibrieren, dass Ausschläge zuverlässig eine Ausfahrt anzeigen. Daraus wurde aber nichts. Zu viele Störfaktoren verhinderten eine belastbare Modellierung, auch weil der Winkel der Hafenkameras meist ungünstig war. Einige Beispiele für Falsch-Positive:

- Das Boot wird nur abgedeckt, aber nicht ausgefahren
- Ein fremdes Boot legt vorübergehend davor an und verdeckt die Sicht
- Andere Objekte stehen im Weg (Autos, Sonnenschirme etc.)
- Das Boot ist über längere Zeit abwesend, was die Berechnung des Referenzwerts verfälscht (Annahme Normalzustand: das Boot ist an der Anlegestelle)
- Ein besonderer Winkel der Sonne lässt das Licht auf der Bootsoberfläche anders reflektieren
- Der auftauchende Hintergrund bei einer Ausfahrt unterscheidet sich farblich kaum vom Boot selbst

## ...und die Vibe-Code Lösung

Weshalb dann der Titel? Weil mich in diesem Fall KI davor bewahrt hat, jedes einzelne Boot auf jedem einzelnen Bild separat von Hand anzusehen (oder die Recherche abzubrechen). Und zwar mittels Vibe-Coding, das zwar [gerne belächelt](https://programmerhumor.io/memes/localhost-party) wird - im Journalismus aber einen seiner stärksten Anwendungsfälle hat, wie ich finde. 

Nach etwas hin und her hat mir mein Programmier-Assistent einerseits einen ROI-Picker bereitgestellt. So konnte ich die einzelnen Boote mittels einer Applikation im Browser direkt auf dem Bild einzeichnen. ROI steht hier für «Region of Interest», also der Bereich pro Boot, dessen Pixel ich analysieren wollte.

![Screenshot der Webapp mit eingezeichneten Rechtecken über einzelnen Bootsplätzen](/images/blog/berth-picker-app.webp "Im ROI-Picker zeichne ich pro Boot den Bildbereich ein, dessen Pixel analysiert werden.")

Eine zweite, davon abgeleitete Webapp zeigt alle Bilder der Zeitreihe und den gewählten ROI pro Boot. Darunter eine Kurve der Helligkeitswerte im gewählten Bereich über die ganze Zeitreihe, mit der ich direkt zum jeweiligen Bild navigieren kann.

Die Kurve folgt der Annahme, dass die Helligkeit konstant bleibt, solange sich ein Boot nicht bewegt. Eine grosse Änderung, respektive Ausreisser, wird hingegen als Indiz für eine Ausfahrt gewertet. Zur besseren Analyse wurden die täglichen und saisonalen Fluktuationen, sowie allgemeine Wetterumstürze auf dem gesamten Bild herausgerechnet. 

![Webapp mit Webcam-Bild und darunter der Helligkeitskurve über die gesamte Zeitreihe](/images/blog/manual-review-example.webp "Ein Ausschlag in der Kurve weist auf eine mögliche Ausfahrt hin – per Klick springe ich zum zugehörigen Bild.")

Wie erwähnt, reicht die Kurve nicht für eine zuverlässige Modellierung. Aber indem ich zuerst die Peaks überprüfe und das fragliche Bild direkt vor mir sehe, spare ich mir einiges an Zeit. Bei einigen Booten (wie dem gezeigten) funktioniert das gut, bei anderen suche ich etwas länger. 

Gehe ich von der Grund-Hypothese aus, dass ein Boot nie bewegt wurde, reicht mir eine einzelne bestätigte Abfahrt, um diese zu widerlegen. In einer zweiten Runde zähle ich die Abfahrten, höre aber bei acht auf (im Schnitt eine pro Woche), da nutzt jemand seinen Platz offensichtlich regelmässig. Einzig bei den Booten ohne Abfahrt muss ich mir folglich die gesamte Zeitreihe anschauen.

## Fast jedes zehnte Boot in der Hauptsaison ungenutzt

Am Schluss steht eine Analyse, für die ich kein Konfidenzintervall angeben muss. Jede gezählte Abfahrt habe ich von Hand auf dem Bild überprüft. Wir können so zeigen, dass knapp **10% der Boote im Beobachtungszeitraum nie bewegt** wurden, **ein Drittel** der Boote hat während der acht Wochen **nur 1-3 Mal** den Hafen verlassen.

Hier der gesamte Beitrag: <iframe width="560" height="320" src="https://www.srf.ch/play/embed?urn=urn:srf:video:f62021d9-18a1-4b80-9239-d3fc9ffe100f&subdivisions=false" allowfullscreen allow="geolocation *; autoplay; encrypted-media" noscroll></iframe>