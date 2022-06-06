
window.onload = function () {
    document.getElementById("country-info").style.display = 'none';
    document.getElementById("error").style.display = "none";
} 

function buscarPais() {
    const baseURL = "https://restcountries.com/v3.1/name/";
    const countryName = document.getElementById("country-name").value;
    
    fetch(baseURL + countryName)
        .then(data => data.json())
        .then(data => loadCountry(data[0]))
        .catch(error => showError());
}

function showError() {
    document.getElementById("error").style.display = "block";
    document.getElementById("country-info").style.display = 'none';
}

function loadCountry(country) {
    document.getElementById("error").style.display = "none";
    document.getElementById("country-info").style.display = 'block';
    const name = getCountryName(country);
    const languages = Object.values(country.languages).map(getLanguageName);
    const flagURL = country.flags.png;
    const continents = country.continents.map(getContinent);
    const capitals = country.capital;

    document.getElementById("country-name").innerText = name;
    document.getElementById("country-flag").src = flagURL;
    document.getElementById("country-capital").innerText = capitals.join(", ");
    document.getElementById("country-languages").innerText = languages.join(", ");
    document.getElementById("country-continents").innerText = continents.join(", ");
}

function getCountryName(country) {
    return country.translations.por !== undefined ? country.translations.por.official : country.name.official; 
}

function getLanguageName(language) {
    console.log(language);
    const languages = {
        "portuguese": "Português",
        "english": "Inglês",
        "german": "Alemão",
        "spanish": "Espanhol",
        "arabic": "Árabe",
        "russian": "Russo",
        "japanese": "Japonês",
        "chinese": "Chinês",
        "italian": "Italiano",
        "french": "Francês"
    };
    return languages[language.toLowerCase()] !== undefined ? languages[language.toLowerCase()] : language; 
}

function getContinent(continent) {
    const continents = {
        "North America": "América do Norte",
        "South America": "América do Sul",
        "Central America": "América Central",
        "Latin America": "América Latina",
        "Europe": "Europa",
        "Asia": "Ásia",
        "Afrika": "África",
        "Oceania": "Oceania"
    }
    return continents[continent];
}