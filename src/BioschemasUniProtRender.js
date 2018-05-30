/*jslint node: true */
"use strict";

export default class BioschemasUniProtRender extends HTMLElement {
    constructor() {
        super();
        this._proteinSchema = {};
    }

    static get observedAttributes() { return ['accession']; }

    connectedCallback() {}

    attributeChangedCallback(name, oldValue, newValue) {
        // name will always be "accession" due to observedAttributes
        this._accession = newValue;
        this._init();
    }

    get proteinSchema() {
        return this._proteinSchema;
    }

    get accession() {
        return this._accession;
    }

    set accession(acc) {
        this.setAttribute('accession', acc);
    }

    _renderEntry() {
        console.log('render', this._proteinSchema);
        const div = document.createElement('div');
        div.innerText = JSON.stringify(this._proteinSchema, null, 2);
        document.body.appendChild(div);

        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.innerHTML = JSON.stringify(this._proteinSchema, null, 2);
        document.body.appendChild(s);
    }

    _init() {
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }

        if (this._accession && (this._accession.length !== 0)) {
            const adapter = document.createElement('bioschemas-uniprot-adapter');
            const loader = document.createElement('data-loader');
            const source = document.createElement('source');

            source.setAttribute('src', 'https://www.ebi.ac.uk/proteins/api/proteins/' + this._accession);
            loader.appendChild(source);
            adapter.appendChild(loader);
            this.appendChild(adapter);

            this._addLoaderListeners();
        }
    }

    _addLoaderListeners() {
        this.addEventListener('load', (e) => {
            if (e.target !== this) {
                e.stopPropagation();
                try {
                    if (e.detail.payload.errorMessage) {
                        throw e.detail.payload.errorMessage;
                    }
                    this._proteinSchema = e.detail.payload;
                    this._renderEntry();
                } catch (error) {
                    this.dispatchEvent(new CustomEvent(
                        'error', {
                            detail: error,
                            bubbles: true,
                            cancelable: true
                        }
                    ));
                }
            }
        });
    }
}