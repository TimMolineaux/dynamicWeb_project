# 🌍 Explorer.Brussels – Interactieve Webapplicatie voor Cultuur in Brussel

**Explorer.Brussels** is een dynamische webapplicatie die toeristen en inwoners helpt bij het ontdekken van culturele locaties in Brussel. De applicatie haalt live data op uit een open dataset van de stad Brussel en toont deze op een overzichtelijke, interactieve manier. Gebruikers kunnen plaatsen bekijken op een kaart, toevoegen aan hun favorieten, sorteren, zoeken en feedback geven.

---

## Functionaliteiten

Deze applicatie bevat de volgende functies:

- **Locaties opslaan als favorieten**  
  Bezoekers kunnen locaties opslaan en beheren.

- **Kaartweergave met markers**  
  Elke locatie bevat een link naar Street View en Google Maps. Markers op een kaart tonen geografische posities (indien beschikbaar).

- **Zoeken op plaatsnaam**  
  Real-time zoekfunctie om snel locaties te vinden op naam.

- **Sorteren**  
  Sorteer op **plaatsnaam**, **adres** of **postcode** via een dropdownmenu.

- **Google Maps integratie**  
  Elke rij bevat knoppen om de locatie te openen in Google Maps of Street View.

- **Licht/donker thema toggle**  
  Wissel eenvoudig tussen dag- en nachtmodus, voorkeur wordt opgeslagen.

- **Meertaligheid (i18n)**  
  Ondersteuning voor **Nederlands**, **Frans** en **Engels**.

- **Feedbackformulier met validatie**  
  Bezoekers kunnen feedback achterlaten.

- **Favorietenlijst met beheerfunctie**  
  Bekijk of verwijder favoriete locaties via een dropdownmenu.

- **Gebruik van lokale opslag**  
  Favorieten, feedback, thema en taalvoorkeuren worden opgeslagen via `localStorage`.

---

## API

Voor dit project heb ik gebruik gemaakt van de volgende dataset: https://opendata.brussels.be/explore/dataset/bruxelles_lieux_culturels/information/ deze dataset bevat informatie over culturele plaatsen in Brussel zoals:

- Beschrijving van de locatie
- Adresgegevens (straat, postcode, stad)
- Links naar Google Maps & Street View
- Coördinaten (voor kaartmarkers)
  
Deze velden bieden voldoende diepgang om diverse functionaliteiten zoals sortering, filtering, kaartvisualisatie en favorieten te ondersteunen.

--

## Technische vereisten

**DOM manipulatie:**  
- Elementen selecteren — `document.querySelector('#data-table tbody')` (lijn 184)  
- Elementen manipuleren — aanmaken en toevoegen van tabelrijen in `displayItems()` (lijn 183)  
- Events aan elementen koppelen — `document.getElementById('thema').addEventListener('click', toggleDarkMode)` (lijn 287)  

**Modern JavaScript:**  
- Gebruik van constanten — `const translations = {...}` (regel 23)  
- Template literals — gebruik in `row.innerHTML = \`...\`` in `displayItems()` (lijn 193)  
- Iteratie over arrays — `.forEach()` in `renderFavorites()` (lijn 238)  
- Array methodes — `.filter()` in `removeFavorite()` (lijn 257)  
- Arrow functions — callback in `.forEach(el => {...})` in `applyTranslations()` (lijn 175)  
- Conditional (ternary) operator — `${item.beschrijving || 'Geen titel'}` (lijn 194)  
- Callback functions — `observer` callback in `IntersectionObserver` (lijn 361)  
- Promises — Fetch API gebruikt in `fetchData()` (lijn 2)  
- Async & Await — `async function fetchData()` met `await fetch()` (lijn 3)  
- Observer API  — `IntersectionObserver` om zichtbaarheid kaart te detecteren (lijn 361)  

**Data & API:**  
- Fetch om data op te halen — `fetch('https://bruxellesdata.opendatasoft.com/api/explore/...')` (lijn 5)  
- JSON manipuleren en weergeven — `const data = await response.json();` (lijn 11)

**Opslag & validatie:**  
- Formulier validatie — validatie in `feedback-form` submit event listener (lijn 376)  
- Gebruik van LocalStorage — opslaan en laden van favorieten in `savePlace()` (lijn)  

**Styling & layout:**  
- Basis HTML layout
- Basis CSS 
- Gebruiksvriendelijke elementen

--

## 🔧 Installatiehandleiding

Volg onderstaande stappen om het project lokaal uit te voeren:

1. **Repository klonen**  
    Download of clone deze repository

2. **Project openen in Visual Studio Code**
    Open het project in Visual Studio Code

3. **Live Server installeren**
    Als je Live Server nog niet hebt geïnstalleerd:
    - Open het extensie-tabblad in VS Code (Ctrl+Shift+X)
    - Zoek naar Live Server
    - Installeer de extensie van Ritwick Dey  

4. **Start de applicatie**
    - Klik met de rechtermuisknop op index.html
    - Selecteer "Open with Live Server"
    - Je browser opent automatisch op http://127.0.0.1:5500/ of een gelijkaardig lokaal adres  

5. **Let op**
    De applicatie maakt gebruik van een externe publieke API. Zorg voor een actieve internetverbinding om de data correct te laden.  