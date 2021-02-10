const D = document;
/*
const card__titleElement = D.getElementById('card__title');
const simpleModalElement = D.getElementById('simple-modal');
const closeModalElement = D.getElementById('close-modal');


card__titleElement.addEventListener('click', () => {
    simpleModalElement.classList.add('show');
})
closeModalElement.addEventListener('click', () => {
    simpleModalElement.classList.remove('show');
})*/
const countryCardContainerElement = D.getElementById('country-card-container');

function getCountries() {
    return fetch('https://restcountries.eu/rest/v2/lang/es').then(value => {
        if (value.ok) {
            return value.json()
        }
        throw new Error('Error, al llamar a la API')
    }).then(value => value.slice(0, 12))
}

getCountries().then(value => {
    value.forEach(country => {
        console.log(country);
        let newObject = new CountryCard();
        newObject.data = country;

        let newDiv = document.createElement('div');
        newDiv.classList.add('column')
        newDiv.append(newObject)

        countryCardContainerElement.append(newDiv);

    })
})
;
