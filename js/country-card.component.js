class CountryCard extends HTMLElement {
    constructor() {
        super();
        this._data = {};
    }

    connectedCallback() {
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <style>

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border-radius: 2px;
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 1px 5px 0 rgb(0 0 0 / 20%);
    height: 100%;
}

.card-image > * {
    width: 100%;
}

.card-body {
    padding: 20px;
     margin-top: auto;
}

.card-body .card__title {
    font-size: 20px;
    font-weight: 300;
    margin-bottom: 8px;
}
.cursor-pointer{
cursor: pointer;

}
</style>
                <div class="card">
                    <div class="card-image">
                        <img src="${this.data.flag}"
                             alt="">
                    </div>
                    <div class="card-body">
                        <h5 class="card__title cursor-pointer" id="card__title">
                            ${this.data.nativeName}
                        </h5>
                      
                    </div>
                </div>
      
    `;
        const title = shadowRoot.querySelector('#card__title')

        title.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('getCountry$', null))
        })
    }

    get data() {
        return this._data;
    }

    set data(country) {
        this._data = country;
    }

}

window.customElements.define('country-card', CountryCard)
