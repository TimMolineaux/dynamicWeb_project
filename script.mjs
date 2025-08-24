//functie die verbind met de api en alle nodige data er uit haald
fetchData();
async function fetchData() {
    try {
        const response = await fetch('https://bruxellesdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/bruxelles_lieux_culturels/records?limit=100');

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

//vertalingen
let currentLang = localStorage.getItem('language') || 'nl';

const translations = {
    nl: {
        theme: "Thema",
        language: "Taal",
        feedback: "Feedback",
        favorites: "Favorieten",
        sortBy: "Sorteren op:",
        default: "Standaard",
        name: "Naam",
        address: "Adres",
        postcode: "Postcode",
        city: "Plaats",
        streetView: "Street View",
        googleMaps: "Google Maps",
        action: "Actie",
        nameOptional: "Naam (optioneel):",
        emailOptional: "E-mail (optioneel):",
        messageRequired: "Bericht (verplicht):",
        sendFeedback: "Verstuur feedback",
        latestFeedback: "Laatste feedback",
        yourName: "Jouw naam",
        yourEmail: "jouw@email.com",
        typeYourFeedback: "Typ je feedback hier...",
        searchPlaceholder: "Zoek naar een plaats...",
        addedToFavorites: '"{name}" is toegevoegd aan favorieten!',
        removedFromFavorites: '"{name}" is verwijderd uit favorieten.',
        noFavorites: "Geen favorieten",
        noResults: "Geen resultaten gevonden.",
        noFeedbackYet: "Er is nog geen feedback ingediend.",
        fillName: "Vul je naam in.",
        fillEmail: "Vul je e-mailadres in.",
        validEmail: "Vul een geldig e-mailadres in.",
        messageTooShort: "Je bericht moet minstens 10 tekens bevatten.",
        thankYou: "Bedankt voor je feedback!",
        noTitle: "Geen titel",
        noAddress: "Geen adres",
        unknown: "Onbekend"
    },
    fr: {
        theme: "Thème",
        language: "Langue",
        feedback: "Commentaires",
        favorites: "Favoris",
        sortBy: "Trier par :",
        default: "Par défaut",
        name: "Nom",
        address: "Adresse",
        postcode: "Code postal",
        city: "Ville",
        streetView: "Vue de rue",
        googleMaps: "Google Maps",
        action: "Action",
        nameOptional: "Nom (optionnel) :",
        emailOptional: "E-mail (optionnel) :",
        messageRequired: "Message (obligatoire) :",
        sendFeedback: "Envoyer",
        latestFeedback: "Derniers commentaires",
        yourName: "Votre nom",
        yourEmail: "votre@email.com",
        typeYourFeedback: "Tapez votre message ici...",
        searchPlaceholder: "Rechercher un lieu...",
        addedToFavorites: '"{name}" a été ajouté aux favoris !',
        removedFromFavorites: '"{name}" a été supprimé des favoris.',
        noFavorites: "Aucun favori",
        noResults: "Aucun résultat trouvé.",
        noFeedbackYet: "Aucun commentaire soumis.",
        fillName: "Veuillez entrer votre nom.",
        fillEmail: "Veuillez entrer votre adresse e-mail.",
        validEmail: "Veuillez entrer une adresse e-mail valide.",
        messageTooShort: "Votre message doit contenir au moins 10 caractères.",
        thankYou: "Merci pour votre commentaire !",
        noTitle: "Pas de titre",
        noAddress: "Pas d'adresse",
        unknown: "Inconnu"
    },
    en: {
        theme: "Theme",
        language: "Language",
        feedback: "Feedback",
        favorites: "Favorites",
        sortBy: "Sort by:",
        default: "Default",
        name: "Name",
        address: "Address",
        postcode: "Postal Code",
        city: "City",
        streetView: "Street View",
        googleMaps: "Google Maps",
        action: "Action",
        nameOptional: "Name (optional):",
        emailOptional: "Email (optional):",
        messageRequired: "Message (required):",
        sendFeedback: "Submit feedback",
        latestFeedback: "Latest feedback",
        yourName: "Your name",
        yourEmail: "your@email.com",
        typeYourFeedback: "Type your feedback here...",
        searchPlaceholder: "Search for a place...",
        addedToFavorites: '"{name}" was added to favorites!',
        removedFromFavorites: '"{name}" was removed from favorites.',
        noFavorites: "No favorites",
        noResults: "No results found.",
        noFeedbackYet: "No feedback submitted yet.",
        fillName: "Please enter your name.",
        fillEmail: "Please enter your email address.",
        validEmail: "Please enter a valid email address.",
        messageTooShort: "Your message must be at least 10 characters long.",
        thankYou: "Thank you for your feedback!",
        noTitle: "No title",
        noAddress: "No address",
        unknown: "Unknown"
    }
};


function applyTranslations(lang) {
    currentLang = lang;

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[lang][key] || key;
    });

    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = translations[lang][key] || key;
    });

    localStorage.setItem('language', lang);
}

// Pas het thema toe bij het laden van de pagina
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

//functie die opgehaalde data in een tabel plaatst
async function displayItems(data) {
    const tbody = document.querySelector('#data-table tbody');

    if (!Array.isArray(data.results) || data.results.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7">${translations[currentLang]?.noResults}</td></tr>`;
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
            <td><button onclick="savePlace('${item.beschrijving || 'Onbekend'}', '${item.google_maps}')">Opslaan</button></td>
        `;
        return row;
    });

    // Vul de tabel
    tbody.innerHTML = '';
    originalRows.forEach(row => tbody.appendChild(row));
}

//functie die de gebruiker toelaat plaatsnamen op te slaan
function savePlace(placeName, mapLink) {
    let savedPlaces = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!savedPlaces.some(p => p.name === placeName)) {
        savedPlaces.push({ name: placeName, mapLink: mapLink });
        localStorage.setItem('favorites', JSON.stringify(savedPlaces));
        renderFavorites();
        showNotification('addedToFavorites', 'green', 3000, { name: placeName });
    }
}

function renderFavorites() {
    const savedPlaces = JSON.parse(localStorage.getItem('favorites')) || [];

    const savedPlacesList = document.querySelector('#favorites-list');
    if (!savedPlacesList) {
        console.warn('favorites-list niet gevonden in de DOM.');
        return;
    }

    savedPlacesList.innerHTML = '';

    if (savedPlaces.length === 0) {
        savedPlacesList.innerHTML = '<li>Geen favorieten</li>';
        return;
    }

    savedPlaces.forEach(place => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = place.mapLink;
        link.textContent = place.name;
        link.target = '_blank';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '✕';
        deleteButton.onclick = () => removeFavorite(place.name);

        listItem.appendChild(link);
        listItem.appendChild(deleteButton);
        savedPlacesList.appendChild(listItem);
    });
}

function removeFavorite(placeName) {
    let savedPlaces = JSON.parse(localStorage.getItem('favorites')) || [];
    savedPlaces = savedPlaces.filter(p => p.name !== placeName);
    localStorage.setItem('favorites', JSON.stringify(savedPlaces));
    renderFavorites();
    showNotification('removedFromFavorites', 'red', 3000, { name: placeName });

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
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
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

// Observer API gebruiken om te detecteren wanneer de kaart zichtbaar wordt
const kaartSectie = document.querySelector('.kaart');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            kaartSectie.classList.add('zichtbaar');

            observer.unobserve(kaartSectie);
        }
    });
}, {
    threshold: 0.6
});

observer.observe(kaartSectie);

//feedbackformulier
document.getElementById('feedback-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const errorElem = document.getElementById('feedback-error');
    const successElem = document.getElementById('feedback-success');

    // Reset berichten
    errorElem.textContent = '';
    successElem.textContent = '';

    // Validatie
    if (name.length === 0) {
        errorElem.textContent = translations[currentLang]?.fillName || "Vul je naam in.";
        return;
    }

    if (email.length === 0) {
        errorElem.textContent = translations[currentLang]?.fillEmail || "Vul je e-mailadres in.";
        return;
    }

    if (message.length < 10) {
        errorElem.textContent = translations[currentLang]?.messageTooShort || "Je bericht moet minstens 10 tekens bevatten.";
        return;
    }

    if (email && !validateEmail(email)) {
        errorElem.textContent = translations[currentLang]?.validEmail || "Vul een geldig e-mailadres in.";
        return;
    }

    successElem.textContent = translations[currentLang]?.thankYou || "Bedankt voor je feedback!";

    // Feedback opslaan in localStorage
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.push({ name, email, message, date: new Date().toISOString() });
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    renderFeedbackList();

    // Formulier resetten
    e.target.reset();
});

// Simpele e-mail validatie functie
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

//Verzamelde feedback weergeven
function renderFeedbackList() {
    const feedbackList = document.getElementById('feedback-list');
    feedbackList.innerHTML = '';

    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

    if (feedbacks.length === 0) {
        feedbackList.innerHTML = `<li>${translations[currentLang]?.noFeedbackYet}</li>`;
        return;
    }

    //Sorteren
    const latestFeedbacks = feedbacks
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // sorteer op datum, nieuwste eerst
        .slice(0, 5); // neem enkel de eerste 5

    latestFeedbacks.forEach(fb => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
    <strong>${fb.name || 'Anoniem'}</strong> (${new Date(fb.date).toLocaleDateString()}):<br/>
    <em>${fb.message}</em>
  `;
        feedbackList.appendChild(listItem);
    });
}

// Toon/verberg favorieten dropdown
document.getElementById('favorites-toggle').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('favorites-dropdown').classList.toggle('visible');
});

// Sluit dropdown als je ergens anders klikt
document.addEventListener('click', () => {
    document.getElementById('favorites-dropdown').classList.remove('visible');
});

//meldingen
function showNotification(keyOrMessage, color = 'green', duration = 3000, replaceData = {}) {
    const notificationEl = document.getElementById('notification');

    let message = translations[currentLang]?.[keyOrMessage] || keyOrMessage;

    Object.entries(replaceData).forEach(([key, value]) => {
        message = message.replace(`{${key}}`, value);
    });

    notificationEl.style.color = color;
    notificationEl.textContent = message;

    setTimeout(() => {
        notificationEl.textContent = '';
    }, duration);
}

// Toggle taal dropdown
document.getElementById('language-toggle').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('language-dropdown').classList.toggle('visible');
});

// Sluit dropdown bij klik buiten
document.addEventListener('click', () => {
    document.getElementById('language-dropdown').classList.remove('visible');
});

// Taal veranderen bij selectie
document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', () => {
        const selectedLang = option.getAttribute('data-lang');
        applyTranslations(selectedLang);
        localStorage.setItem('language', selectedLang);
        document.getElementById('language-dropdown').classList.remove('visible');
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'nl';
    applyTranslations(savedLang);

    renderFavorites();
    renderFeedbackList();
});