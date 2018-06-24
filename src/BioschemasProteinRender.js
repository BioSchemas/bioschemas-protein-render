/*jslint node: true */
"use strict";

import _each from 'lodash-es/each';
import _filter from 'lodash-es/filter';

export default class BioschemasProteinRender extends HTMLElement {
    constructor() {
        super();
        this._proteinSchema = {};
        this._structureSchema = {};
        this._uniprotAdapterID = 'uniprot-adapter';
        this._pdbeAdapterID = 'pdbe-adapter';
        this._pdbeID = '';
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

    get structureSchema() {
        return this._structureSchema;
    }

    get accession() {
        return this.getAttribute('accession');
    }

    set accession(acc) {
        this.setAttribute('accession', acc);
    }

    _renderSchema(schema, title, element) {
        const header = document.createElement(element);
        header.innerText = title;
        document.body.appendChild(header);

        const div = document.createElement('div');
        div.innerText = JSON.stringify(schema, null, 2);
        document.body.appendChild(div);
    }

    _init() {
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }

        if (this._accession && (this._accession.length !== 0)) {
            const adapter = document.createElement('bioschemas-uniprot-adapter');
            adapter.id = this._uniprotAdapterID;
            const loader = document.createElement('data-loader');
            const source = document.createElement('source');

            source.setAttribute('src', 'https://www.ebi.ac.uk/proteins/api/proteins/' + this._accession);
            loader.appendChild(source);
            adapter.appendChild(loader);
            this.appendChild(adapter);

            this._addLoaderListeners();
        }
    }

    _createPDBeAdapter(entry) {
        const adapterPDB = document.createElement('bioschemas-pdbe-adapter');
        adapterPDB.id = this._pdbeAdapterID;
        const loaderPDB = document.createElement('data-loader');
        const sourcePDB = document.createElement('source');

        sourcePDB.setAttribute('src', `http://www.ebi.ac.uk/pdbe/api/pdb/entry/summary/${entry}`);
        loaderPDB.appendChild(sourcePDB);
        adapterPDB.appendChild(loaderPDB);
        this.appendChild(adapterPDB);
    }

    _getFirstPDBeEntry() {
        const pdbe = _filter(this._proteinSchema.seeAlso, (reference) => {
            return reference.indexOf('pdbe') !== -1;
        });
        if (pdbe && (pdbe.length !== 0)) {
            this._pdbeID = pdbe[0].substring(pdbe[0].lastIndexOf('/')+1);
            return this._pdbeID;
        } else {
            this._pdbeID = '';
            return '';
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
                    if (e.target.id === this._uniprotAdapterID) {
                        this._proteinSchema = e.detail.payload;
                        this._renderSchema(this._proteinSchema, `UniProt entry markup: ${this._accession}`, 'h1');
                        this._createPDBeAdapter(this._getFirstPDBeEntry());
                    } else if (e.target.id === this._pdbeAdapterID) {
                        this._structureSchema = e.detail.payload;
                        this._renderSchema(this._structureSchema, `First PDBe entry markup: ${this._pdbeID}`, 'h2');
                    }
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