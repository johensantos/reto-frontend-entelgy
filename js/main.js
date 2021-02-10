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

function openSimpleModal({region, capital, population, latlng, name}) {
    console.log(latlng);
    simpleModalElement.classList.add('show');

    simpleModalElement.querySelector('#modal-title').innerText = name
    simpleModalElement.querySelector('#population').innerText = population
    simpleModalElement.querySelector('#capital').innerText = capital
    simpleModalElement.querySelector('#region').innerText = region
    simpleModalElement.querySelector('#mapsLink').href = `https://www.google.com/maps/@${latlng[0]},${latlng[1]},6z`
    document.body.style.overflow = 'hidden';
}

function closeSimpleModal() {
    simpleModalElement.classList.remove('show');
    document.body.style.overflow = 'auto';
}

closeModalElement.addEventListener('click', () => {
    closeSimpleModal();
})

