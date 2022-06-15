/*
* VARIABLES
* */
const D = document;
const simpleModalElement = D.getElementById('simple-modal');
const closeModalElement = D.getElementById('close-modal');
const countryCardContainerElement = D.getElementById('country-card-container');
/*
* END VARIABLES
* */

/*
* FUNCTIONS
* */
function getCountries() {
    return fetch('https://restcountries.com/v3.1/all').then(value => {
        if (value.ok) {
            return value.json()
        }
        throw new Error('Error, al llamar a la API')
    }).then(value => value.slice(0, 12))
}

function renderWebComponents() {
    getCountries().then(value => {
        value.forEach(country => {
            const newComponent = new CountryCard();
            newComponent.data = country;
            const webComponentParentDiv = document.createElement('div');
            webComponentParentDiv.classList.add('column')
            webComponentParentDiv.append(newComponent)
            newComponent.addEventListener('getCountry$', evt => {
                openSimpleModal(newComponent.data)
            })
            countryCardContainerElement.append(webComponentParentDiv);

        })
    })
}

function openSimpleModal({region, capital, population, latlng, name}) {

    simpleModalElement.classList.add('show');
    simpleModalElement.querySelector('#modal-title').innerText = name.official
    simpleModalElement.querySelector('#population').innerText = population
    simpleModalElement.querySelector('#capital').innerText = capital ? capital[0]: '-'
    simpleModalElement.querySelector('#region').innerText = region
    simpleModalElement.querySelector('#mapsLink').href = `https://www.google.com/maps/@${latlng[0]},${latlng[1]},6z`
    document.body.style.overflow = 'hidden';
}

function closeSimpleModal() {
    simpleModalElement.classList.remove('show');
    document.body.style.overflow = 'auto';
}
/*
* END FUNCTIONS
* */

/*
* EVENTS
* */
closeModalElement.addEventListener('click', () => {
    closeSimpleModal();
})
document.addEventListener('DOMContentLoaded', () => {
    renderWebComponents();
})
/*
* END EVENTS
* */
