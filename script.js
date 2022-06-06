
window.onload = function () {
    hideCountriesInfo(true);
    document.getElementById("error").style.display = "none";
} 

function buscarPais() {
    const baseURL = "https://restcountries.com/v3.1/name/";
    const countryName = document.getElementById("country-name").value;
    clearChildren();
    
    fetch(baseURL + countryName)
        .then(data => data.json())
        .then(data => {
            let first = true;
            for (let country of data) {
                const node = document.getElementById("countries-info").children[0];
                document.querySelector("#error").style.display = "none";
                hideCountriesInfo(false);
                if (first) {
                    loadCountry(country, node);
                    first = false;
                    continue;
                }
                
                const newNode = node.cloneNode(true);
                loadCountry(country, newNode);
                document.getElementById("countries-info").appendChild(newNode);
            }
        })
        .catch(error => showError(error));
}

function showError(error) {
    console.log(error.message)
    document.getElementById("error").style.display = "block";
    hideCountriesInfo(true);
}

function loadCountry(country, node=document) {
    const name = getCountryName(country);
    const languages = Object.values(country.languages).map(getLanguageName);
    const flagURL = country.flags.png;
    const continents = country.continents.map(getContinent);
    const capitals = country.capital;

    node.querySelector("#country-name").innerText = name;
    node.querySelector("#country-flag").src = flagURL;
    node.querySelector("#country-capital").innerText = capitals.join(", ");
    node.querySelector("#country-languages").innerText = languages.join(", ");
    node.querySelector("#country-continents").innerText = continents.join(", ");
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

function hideCountriesInfo(hide) {
    for (let element of document.getElementsByClassName("info")) {
        element.style.display = hide ? 'none' : 'block';
    };
}

function clearChildren() {
    let idx = 1;
    while (document.getElementById("countries-info").children[idx] !== undefined) {
        const node = document.getElementById("countries-info").children[idx];
        document.getElementById("countries-info").removeChild(node);
    }
}