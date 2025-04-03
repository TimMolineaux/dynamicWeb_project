fetchData();
async function fetchData() {
    try {
        const response = await fetch('https://bruxellesdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/bruxelles_lieux_culturels/records?limit=20');

        if (!response.ok) {
            throw new Error("Netwerkfout bij het ophalen van de data");
        }

        const data = await response.json();
        console.log(data);
        displayItems(data);
    } catch (error) {
        console.error('Er is een fout opgetreden:', error);
        alert('Er is een fout opgetreden bij het ophalen van de data');
    }
}

async function displayItems(data) {
    const tbody = document.querySelector('#data-table tbody');
    const savedPlacesList = document.querySelector('#saved-places');

    // Controleer of de results array bestaat en niet leeg is
    if (!Array.isArray(data.results) || data.results.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">Geen resultaten gevonden.</td></tr>';
        return;
    }

    // Loop door de items in de results array en voeg ze toe aan de tabel
    data.results.forEach(item => {
        const row = document.createElement('tr');

        // Voeg de cellen toe met de gegevens van elk item
        row.innerHTML = `
            <td>${item.beschrijving || 'Geen titel'}</td>
            <td>${item.adres || 'Geen adres'}</td>
            <td>${item.code_postal || 'Onbekend'}</td>
            <td id="link"><a href="https://www.google.com/maps/search/?api=1&query=${item.coordonnees_geographiques.lat},${item.coordonnees_geographiques.lon}" target="_blank" class="map-link">Bekijk op Google Maps</a></td>
            <td id="link"><button onclick="savePlace('${item.beschrijving || 'Onbekend'}')">Opslaan</button></td>
        `;

        // Voeg de nieuwe rij toe aan de tbody
        tbody.appendChild(row);
    });
}

function savePlace(placeName) {
    const savedPlacesList = document.querySelector('#saved-places');

    // Maak een nieuw lijstitem voor de opgeslagen plaats
    const listItem = document.createElement('li');
    listItem.textContent = placeName;

    // Maak de verwijderknop
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Verwijder';
    deleteButton.onclick = function () {
        // Verwijder het lijstitem wanneer op de knop wordt geklikt
        savedPlacesList.removeChild(listItem);
        console.log(`Plaats "${placeName}" is verwijderd!`);
    };

    // Voeg de verwijderknop toe aan het lijstitem
    listItem.appendChild(deleteButton);

    // Voeg het lijstitem toe aan de lijst
    savedPlacesList.appendChild(listItem);

    console.log(`Plaats "${placeName}" is opgeslagen!`);
}

// Voeg de zoekfunctie toe aan je JavaScript-bestand
document.querySelector('#search-input').addEventListener('input', filterPlaces);

function filterPlaces() {
    const searchTerm = document.querySelector('#search-input').value.toLowerCase(); // Zoekterm omgezet naar kleine letters
    const tbody = document.querySelector('#data-table tbody');

    // Alle rijen in de tabel ophalen
    const rows = Array.from(tbody.getElementsByTagName('tr'));

    // Filter de rijen op basis van de zoekterm
    rows.forEach(row => {
        const placeName = row.cells[0].textContent.toLowerCase(); // De naam van de plaats (eerste kolom)

        // Als de plaatsnaam de zoekterm bevat, toon dan de rij, anders verberg de rij
        if (placeName.includes(searchTerm)) {
            row.style.display = ''; // Toon de rij
        } else {
            row.style.display = 'none'; // Verberg de rij
        }
    });
}

document.getElementById('thema').addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
    document.body.classList.toggle('dark-theme'); // Wissel tussen donkere en lichte modus
}