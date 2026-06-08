---
title: "Privacy Filter: KI nutzen mit persönlichen Informationen?"
description: "Der OpenAI Privacy Filter getestet mit Gerichtsakten."
pubDate: 2026-06-08
tags: ["PII", "KI", "Anonymisierung", "NER"]
heroImage: ""
---

Eigentlich sollte man ChatGPT & Co. nicht mit persönlichen Informationen füttern. Schon gar nicht mit Kundinnen- oder gar Patientendaten. Trotzdem möchte man nicht auf die Analysefähigkeiten moderner Sprachmodelle verzichten. Ein Dilemma, vor dem viele Unternehmen, Fachleute und auch Journalistinnen stehen.

Ein neues Modell von OpenAI verspricht nun Abhilfe: Der [Privacy Filter](https://openai.com/index/introducing-openai-privacy-filter/) soll persönliche Daten (PII) aus Dokumenten entfernen, bevor sie in Chat-Modellen verwendet werden. _Theoretisch_ liessen sich so Kunden- oder gar Patientendaten praktisch bedenkenlos mit ChatGPT & Co. auswerten und analysieren, da der Filter alle Rückschlüsse auf die betroffenen Personen entfernt. Oder im Falle von Journalist:innen liesse sich damit _theoretisch_ ein zugespielter Datensatz nach Hinweisen durchsuchen. 

Gemäss OpenAI soll der Privacy Filter acht Kategorien von PII erkennen: `Personennamen`, `Adressen`, `Email-Adressen`, `Telefonnummern`, `Webadressen`, `Datumsangaben`, sowie `Account-Nummern` und `Secrets`, also Passwörter oder Zugangsschlüssel. Taucht beispielsweise mein Name in einem Dokument auf, soll er mit `PERSON_NAME` ersetzt werden.

Die Firma relativiert aber, dass diese Methoden keinen absoluten Schutz bieten: 

> Privacy Filter is not an anonymization tool, a compliance certification, or a substitute for policy review in high-stakes settings. It is one component in a broader privacy-by-design system. [...] Like all models, Privacy Filter can make mistakes.   
>  &mdash; OpenAI: [Introducing OpenAI Privacy Filter](https://openai.com/index/introducing-openai-privacy-filter/)

Trotzdem war ich gespannt, wie gut das Modell funktionieren würde, insbesondere in deutscher Sprache. 

## Gerichtsakte trifft KI - Test auf (nahezu) realen Daten

Für den Test habe ich 10 zufällige Gerichtsdokumente von entscheidsuche.ch ausgewählt, von Asylverfahren über Erbstreitigkeiten bis zum Dopingverfahren. Die bereits anonymisierten Platzhalter habe ich durch realistisch wirkende Fantasienamen und -daten ersetzt (bspw. `A.____` --> `Pascal Albisser`), um die Erkennung unter möglichst praxisnahen Bedingungen zu testen. Als Grundlage für den späteren Vergleich habe ich alle persönlich identifizierbaren Daten manuell annotiert.

Im Anschluss habe ich dieselben Dokumente auch vom OpenAI Privacy Filter redigieren lassen und die Ergebnisse verglichen. 

## Privacy Filter verpasst die Hälfte

Zunächst bin ich kurz überrascht, wie gut das Modell funktioniert. Im ersten Dokument werden die Namen und Geburtsdaten aller Beteiligten redigiert:

![Textabschnitt mit getrübten, redigierten Stellen](/images/blog/OPF-example-1-court-doc.png "Open AI Privacy Filter erkennt in diesem Dokument alle Namen und Geburtsdaten")

Allerdings ergibt der Einsatz solcher Modelle nur Sinn, wenn sie auch wirklich verlässlich sind. Ein einziges "False Negative" genügt, damit ein Name, ein Geburtsdatum oder eine Identifikationsnummer versehentlich offengelegt wird. Das kann für die betroffene Person schwerwiegende Konsequenzen haben.  

In den anderen Dokumenten zeigt sich dann, dass der Privacy Filter zwar viele Namen erkennt, aber in mehreren Dokumenten welche verpasst. Zum Teil wird sogar derselbe Name im selben Dokument an einer Stelle maskiert, einen Abschnitt später aber stehen gelassen. Ähnlich bei Datumsangaben. Je nach Kontext lässt sich das Transformer-Modell austricksen.

![Textabschnitt mit getrübten, redigierten Stellen](/images/blog/OPF-example-2-missed-names.png "Open AI Privacy Filter verpasst Namen in diesem Beispiel")

Von insgesamt **147 Namensnennungen** in den 10 Dokumenten erkennt der OpenAI Privacy Filter 63 Nennungen korrekt, 15 nur teilweise und **verpasst fast die Hälfte** der Nennungen (69) komplett.  

Der Privacy Filter erkennt zudem bestimmte Schweizer Eigenheiten überhaupt nicht, etwa N-Nummern von Asylsuchenden oder Grundstück-Parzellen.

![Textabschnitt mit getrübten, redigierten Stellen](/images/blog/OPF-example-3-missed-properties.png "Open AI Privacy Filter erkennt die genannten Parzellen und Grundbücher in diesem Beispiel nicht")

Eine N-Nummer identifiziert eine Person im Asylsystem eindeutig. Grundstücksnummern lassen sich in vielen Kantonen über öffentliche Register einer Eigentümerschaft zuordnen.

![Textabschnitt mit getrübten, redigierten Stellen](/images/blog/OPF-example-4-missed-n-number.png "Open AI Privacy Filter verpasst die eindeutig identifizierbaren N-Nummern in diesem Beispiel")

## Spacy im Vergleich

Der OpenAI Privacy Filter ist primär auf englische Texte ausgelegt ("_Performance may drop on non-English text_" - siehe [Huggingface](https://huggingface.co/openai/privacy-filter)). Zum Vergleich habe ich deshalb dieselben Dokumente auch mit Spacy NER (Named Entity Recognition) getestet. Spacy bietet verschiedene Sprachmodelle an, ich habe für meinen Test ___[de_core_news_lg](https://spacy.io/models/de#de_core_news_lg)___ genutzt. 

Von den **147 Namensnennungen** in den 10 Dokumenten erkennt das Spacy-Modell **130 Nennungen korrekt**, 4 teilweise und **verpasst "nur" 13 Namensnennungen (~9%)** komplett.

Im direkten Vergleich wird der Unterschied deutlich. In diesem Datensatz erkennt ein einfaches, auf Deutsch spezialisiertes NER-Modell deutlich mehr Namensnennungen als der OpenAI Privacy Filter.

| | Korrekt | Teilweise | Verpasst |
|---|---|---|---|
| OpenAI Privacy Filter | 63 (43%) | 15 (10%) | 69 (47%) |
| Spacy NER (de_core_news_lg) | 130 (88%) | 4 (3%) | 13 (9%) |
<p class="table-caption">Ergebnisse für deutsche Gerichtsdokumente (n=10, 147 Namensnennungen)</p>

Aber auch mit Spacy besteht noch Potenzial zum verlässlichen Privacy-Filter.
## Kein Rundum-Sorglos-Paket

Wie gesehen, __taugt der Privacy Filter nicht um schützenswerte Personendaten damit zu redigieren und sie sorglos in ChatGPT einzuspeisen__. Fast jede zweite Namensnennung schmuggelt sich in diesem kleinen Experiment am Filter vorbei. 

Ich würde das Modell auch nicht als Komponente in ein grösseres Privacy-by-Design-System einbauen, wie von OpenAI vorgeschlagen. Die Inkonsistenzen führen eher zu Verwirrung, wenn beispielsweise die gleiche Person einmal als `PRIVATE_PERSON_1` und einmal als `Pascal Albisser` im Text auftaucht. 

Für viele Dinge braucht es aber gar kein grosses Transformer-Modell. Wichtige Entitäten wie N-Nummern, Emails oder Kontonummern (IBAN) lassen sich hingegen auch mit einfacheren regelbasierten Ansätzen, etwa mit [Regex](https://regex101.com/), und etwas Domänenwissen redigieren. Dieser Ansatz ist deterministisch, nachvollziehbar und in der Regel auch viel schneller.

Ein optimaler PII-Filter müsste wohl auf eine Kombination von sprachspezifischen Machine-Learning-Modellen (bspw. für Namen, Ortsangaben und Organisationen) und regelbasierten Filtern (für E-Mails, Datumsangaben, etc.) setzen. OpenAI verweist auch auf die Fine-Tuning-Möglichkeiten des Privacy Filters. Interessant wäre ein Folgetest: Reicht Feinjustierung, um wirklich praxistauglich zu werden? Und wie viel davon?

Bis dahin gilt: Blind vertrauen darf man dem Privacy Filter nicht.