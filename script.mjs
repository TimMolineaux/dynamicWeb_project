//functie die verbind met de api en alle nodige data er uit haald
fetchData();
async function fetchData() {
    try {
        const response = await fetch('https://bruxellesdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/bruxelles_lieux_culturels/records?limit=20');

        if (!response.ok) {
            throw new Error("Netwerkfout bij het ophalen van de data");
        }

        const data = await response.json();
        console.log(data);//opgehaalde data in de console weergeven om te testen
        displayItems(data);
    } catch (error) {
        console.error('Er is een fout opgetreden:', error);
        alert('Er is een fout opgetreden bij het ophalen van de data');
    }
}

//functie die opgehaalde data in een tabel plaatst
async function displayItems(data) {
    const tbody = document.querySelector('#data-table tbody');

    if (!Array.isArray(data.results) || data.results.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7">Geen resultaten gevonden.</td></tr>';
        return;
    }

    originalRows = data.results.map(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.beschrijving || 'Geen titel'}</td>
            <td>${item.adres || 'Geen adres'}</td>
            <td>${item.code_postal || 'Onbekend'}</td>
            <td>${item.plaats || 'Onbekend'}</td>
            <td><a href="${item.google_street_view}" target="_blank">Street View</a></td>
            <td><a href="${item.google_maps}" target="_blank">Google Maps</a></td>
            <td><button onclick="savePlace('${item.beschrijving || 'Onbekend'}')">Opslaan</button></td>
        `;
        return row;
    });

    // Vul de tabel
    tbody.innerHTML = '';
    originalRows.forEach(row => tbody.appendChild(row));
}

//functie die de gebruiker toelaat plaatsnamen op te slaan
function savePlace(placeName) {
    let savedPlaces = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!savedPlaces.includes(placeName)) {
        savedPlaces.push(placeName);
        localStorage.setItem('favorites', JSON.stringify(savedPlaces));
    }

    renderFavorites(); // herteken de lijst
}

function renderFavorites() {
    const savedPlacesList = document.querySelector('#saved-places');
    savedPlacesList.innerHTML = '';

    const savedPlaces = JSON.parse(localStorage.getItem('favorites')) || [];

    savedPlaces.forEach(place => {
        const listItem = document.createElement('li');
        listItem.textContent = place;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Verwijder';
        deleteButton.onclick = () => {
            removeFavorite(place);
        };

        listItem.appendChild(deleteButton);
        savedPlacesList.appendChild(listItem);
    });
}

function removeFavorite(place) {
    let savedPlaces = JSON.parse(localStorage.getItem('favorites')) || [];
    savedPlaces = savedPlaces.filter(p => p !== place);
    localStorage.setItem('favorites', JSON.stringify(savedPlaces));
    renderFavorites();
}

//functie die de gebruiker laat zoeken naar een specifieke plaatsnaam
document.querySelector('#search-input').addEventListener('input', filterPlaces);

function filterPlaces() {
    const searchTerm = document.querySelector('#search-input').value.toLowerCase();
    const tbody = document.querySelector('#data-table tbody');

    const rows = Array.from(tbody.getElementsByTagName('tr'));

    // Filter de rijen op basis van de zoekterm
    rows.forEach(row => {
        const placeName = row.cells[0].textContent.toLowerCase();

        // Als de plaatsnaam de zoekterm bevat, toon dan de rij, anders verberg de rij
        if (placeName.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none'; 
        }
    });
}

//functie die de gebruiker laat wisselen tussen licht/donker thema
document.getElementById('thema').addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
}

fetchData();

document.querySelector('#sort-options').addEventListener('change', function () {
    const sortBy = this.value;
    if (sortBy === 'standaard') {
        // Herstel de standaard volgorde
        resetToDefault();
    } else {
        // Sorteer de tabel op basis van de geselecteerde optie
        sortTable(sortBy);
    }
});

// Functie om de tabel te sorteren
function sortTable(sortBy) {
    const tbody = document.querySelector('#data-table tbody');
    const rows = Array.from(tbody.rows);

    // Sorteer de rijen op basis van de geselecteerde kolom
    rows.sort((a, b) => {
        let cellA = a.cells[getColumnIndex(sortBy)].textContent.trim();
        let cellB = b.cells[getColumnIndex(sortBy)].textContent.trim();

        // Vergelijk de cellen
        if (sortBy === 'postcode') {
            // bij postcodes omzetten naar getallen
            cellA = parseInt(cellA, 10);
            cellB = parseInt(cellB, 10);
        }

        if (cellA < cellB) return -1;
        if (cellA > cellB) return 1;
        return 0;
    });

    // Voeg de gesorteerde rijen weer toe aan de tabel
    rows.forEach(row => tbody.appendChild(row));
}

// Functie om de kolomindex te krijgen op basis van de gekozen sorteeroptie
function getColumnIndex(sortBy) {
    switch (sortBy) {
        case 'naam':
            return 0; // De naam bevindt zich in de eerste kolom
        case 'adres':
            return 1; // Adres is de tweede kolom
        case 'postcode':
            return 2; // Postcode is de derde kolom
        default:
            return 0; // Default naar naam als er iets misgaat
    }
}

// Functie om terug te gaan naar de standaard volgorde
function resetToDefault() {
    const tbody = document.querySelector('#data-table tbody');
    tbody.innerHTML = '';
    originalRows.forEach(row => tbody.appendChild(row));
}

renderFavorites();