---
title: "Wie analysiert man 120'000 TikTok-Videos, ohne selbst wochenlang zu scrollen?"
description: "Ein Blick in den 🤖 Maschinenraum hinter unserer Tiktok-Recherche («Der toxische Sog der Manosphere»), vom Appium-Bot bis GPT-4o-Klassifizierung."
pubDate: 2025-12-12
tags: ["Datenjournalismus", "LLM", "Python"]
heroImage: "/images/blog/tiktok-automatisierung.jpeg"
---

## Simulation der User
Unsere fünf «jungen Männer» aus dem Experiment hatten jeweils ein eigenes 📱 Smartphone. Zuvor erstellten wir manuell Accounts für sie und wählten stereotypisch männliche Interessen aus der TikTok-Auswahl (Fussball, Gaming, Auto …).

Um dem Algorithmus zusätzliche Hinweise zu geben, führten wir auf vier der fünf Konten manuelle Suchen durch, nach Fitness- («sixpack») oder Business-Themen («reich werden»).

Danach lief das Scrollen automatisch 🔄: Über ein verbundenes Laptop steuerten wir die Smartphones per Skript und Cronjobs. Mit [Appium](https://appium.io/docs/en/latest/) lassen sich Gesten und Interaktionen simulieren, als würden echte Nutzer die Geräte bedienen. Gleichzeitig kann man damit auch Inhalte aus der App auslesen, wie beispielsweise die Videobeschreibungen. Der Bot konnte so auf Videos mit bestimmten Signalwörtern (z. B. « Muskelaufbau» oder «Grindset») länger verweilen und 👍 Likes verteilen, Tiktok erkannte so unser Interesse am Thema. 

Ein Kontroll-Account blieb unverändert: keine manuelle Suche, keine Reaktionen auf Videos.

## Daten sammeln
Tiktok protokolliert praktisch jede Bewegung seiner Nutzer 📊. Ein Teil dieser Daten lässt sich herunterladen, unter anderem auch die «video watch history» ([Tiktok - Requesting your data](https://support.tiktok.com/en/account-and-privacy/personalized-ads-and-data/requesting-your-data)). Sie enthält Zeitstempel und IDs aller angesehenen Videos. 

Mit der Bibliothek [pyktok](https://github.com/dfreelon/pyktok/tree/main) lassen sich die Video-IDs um Metadaten wie Beschreibung, Views, Autor etc. erweitern und auch die Originalvideos ⬇️ herunterladen. Da Pyktok für jedes Video eine Anfrage an die TikTok-Server sendet, lohnt es sich bei ~120’000 Videos, die Anfragen zeitlich zu staffeln, um nicht als Bot erkannt und blockiert zu werden.

Downloads sollten zudem zeitnah erfolgen, falls Videos zwischenzeitlich gelöscht oder gesperrt werden. In den Metadaten finden sich zudem öffentliche Links zu Untertiteln und weiteren Daten, die ebenfalls mit einem Skript abgerufen werden können.

## Auswertung & Analyse
Nun galt es einen Überblick über den Datenberg zu gewinnen und herauszufinden, welche Inhalte der Manosphere zugeordnet werden können - ohne selbst alle 120’000 Videos anschauen zu müssen.

Mit den Video-Beschreibungen, insbesondere den enthaltenen Hashtags, kriegt man eine grobe Übersicht. Insbesondere sahen wir hier, was andere vor uns auch schon gesehen haben: Der Tiktok-Algorithmus reagiert extrem schnell auf die Signale der User (siehe beispielsweise [Inside Tiktoks highly secretive algorithm - Wall Street Journal](https://www.wsj.com/video/series/inside-tiktoks-highly-secretive-algorithm) oder [Tiktok's muscle power - NRK](https://www.nrk.no/ostfold/tiktok_s-muscle-power_-how-children-are-drawn-into-a-world-of-extreme-exercise-1.16212259)). Bald nachdem die Bots Videos mit den Signal-Wörtern länger angeschaut und geliked hatten, enthielt jeder zweite Beitrag in ihrem Feed eines dieser Wörter. 

Die Manosphere umfasst viele Nischen, die zwar Antifeminismus und männliche Dominanz teilen, aber oft eigene Codes und Ausdrücke verwenden. Viele Videos haben keine oder wenig aussagekräftige Beschreibung, sodass zusätzlicher Kontext nötig ist.

Deshalb bündelten wir unser Wissen über die Manosphere in einem Prompt und liessen eine KI die Videos kodieren. Ähnliche Ansätze wurden auch schon wissenschaftlich erprobt, siehe beispielsweise [ChatGPT outperforms crowd workers for text-annotation tasks](https://doi.org/10.1073/pnas.2305016120) (Gilardi et al., 2023) oder auch [From Walls to Windows: Creating Transparency to Understand Filter Bubbles in Social Media](https://www.alexandria.unisg.ch/entities/publication/f41060db-3d3b-4071-ad92-8ac6bb1cc734) (Luka Bekavac et al., 2024). Wir nutzten das multimodale GPT-4o, dem wir nicht nur 📄 Text (Beschreibung, Untertitel, Sticker), sondern auch Bilder 🖼️ (drei Standbilder pro Video, wo vorhanden) übergaben. So konnte die KI Text- und Bildebene kombinieren.

Die KI lieferte nicht nur die Klassifizierung, sondern auch eine Begründung inkl. Bildbeschreibung – hilfreich für Nachvollziehbarkeit und zur Reduktion von Halluzinationen (“Chain-of-thought Prompting”). Über ein Skript liess sich das Modell bequem per API ansteuern und maschinenlesbaren Text ausgeben.

Bei solchen Datenmengen lohnt es sich, die Kosten im Auge zu behalten 💰. Ein kleiner Testlauf hilft, die ungefähren Ausgaben abzuschätzen.

Klar war auch, dass wir die Antworten der KI nicht einfach ungeprüft übernehmen konnten. Deshalb haben wir mehrere Massnahmen ergriffen:

- Temperatur reduziert: Wir haben die Modelltemperatur gesenkt, um konsistentere Ergebnisse zu erhalten.
- Interrater-Reliabilität geprüft: Wir verglichen die Einschätzungen der KI mit unseren eigenen (drei Personen) auf einer Stichprobe. Die Übereinstimmung lag hoch (0,77 Krippendorffs Alpha) und war vergleichbar mit der Übereinstimmung zwischen uns. Dabei fiel uns auch auf, dass die KI leicht konservativer klassifizierte als wir.
- Intrarater-Reliabilität geprüft: Wir schickten Videos aus einer Stichprobe mehrfach an die KI. Die Übereinstimmung war nahezu perfekt (0,98 Krippendorffs Alpha) und die Antworten damit konsistent.
- Begründungen analysiert: In einer Stichprobe prüften wir, wie die KI argumentierte. Sie folgte dabei ähnlichen Schlüssen wie wir und traf vergleichbare Entscheidungen.

Diese Recherche hat doch einiges an Zeit ⏱️ gekostet, trotz KI und Automatisierung. Die Technologien erlaubten uns zwar, grosse Mengen an Daten zu analysieren, brauchten aber gleichzeitig eine enge Begleitung: Wir mussten den Maschinen genau auf die Finger schauen, oft 2–3 Mal nachjustieren und viel ausprobieren 🔧. Sicherlich hätten wir manches noch anders machen oder optimieren können.