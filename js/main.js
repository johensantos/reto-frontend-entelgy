const D = document;
const simpleModalElement = D.getElementById('simple-modal');
const closeModalElement = D.getElementById('close-modal');


const countryCardContainerElement = D.getElementById('country-card-container');

function getCountries() {
    return fetch('https://restcountries.eu/rest/v2/lang/es').then(value => {
        if (value.ok) {
            return value.json()
        }
        throw new Error('Error, al llamar a la API')
    }).then(value => value.slice(0, 12))
}

function renderWebComponents() {
    getCountries().then(value => {
        value.forEach(country => {
            let newComponent = new CountryCard();
            newComponent.data = country;
            let webComponentParentDiv = document.createElement('div');
            webComponentParentDiv.classList.add('column')
            webComponentParentDiv.append(newComponent)
            newComponent.addEventListener('getCountry$', evt => {
                openSimpleModal(newComponent.data)
            })
            countryCardContainerElement.append(webComponentParentDiv);

        })
    })
}

document.addEventListener('DOMContentLoaded', () => {
    renderWebComponents();
})

function openSimpleModal(countryData) {
    console.log(countryData);
    simpleModalElement.classList.add('show');
}

function closeSimpleModal() {
    simpleModalElement.classList.remove('show');
}

closeModalElement.addEventListener('click', () => {
    closeSimpleModal();
})
