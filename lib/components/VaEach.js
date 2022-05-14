export default class VaEach extends HTMLElement {
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
                throw new TypeError('VaEach: value must be an array');
            }
        }
        else {
            return [];
        }
    }
    set value(value) {
        this.setAttribute('value', JSON.stringify(value));
    }
    render() {
        const template = this.querySelector('template');
        // clear the shadow dom
        this.shadowRoot.innerHTML = '';
        // loop through the array
        this.value.forEach(v => {
            // create a new element
            const el = template.cloneNode(true);
            // append the element to the shadow dom
            this.shadowRoot.appendChild(el.content);
            // replace the value with the current value
            this.shadowRoot.querySelectorAll('va-print:not(va-print[id], va-print[value])').forEach(el => {
                el.setAttribute('value', JSON.stringify(v));
            });
        });
    }
}
