export default class VaPrintGroup extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ 'mode': 'open' });
    }
    attributeChangedCallback(attributeName) {
        if (attributeName === 'value') {
            this.render();
        }
    }
    connectedCallback() {
        this.render();
    }
    static get observedAttributes() {
        return ['value'];
    }
    get value() {
        if (this.hasAttribute('value')) {
            try {
                return JSON.parse(this.getAttribute('value'));
            }
            catch (e) {
                return this.value;
            }
        }
        else {
            return '';
        }
    }
    set value(value) {
        this.setAttribute('value', JSON.stringify(value));
    }
    render() {
        this.shadowRoot.innerHTML = this.innerHTML;
        this.shadowRoot.querySelectorAll('va-print:not(va-print[id])').forEach(el => {
            el.setAttribute('value', JSON.stringify(this.value));
        });
    }
}
