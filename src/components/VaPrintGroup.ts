import VaValue from "../types/VaValue";

export default class VaPrintGroup extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ 'mode': 'open' });
    }
    attributeChangedCallback(attributeName: string): void {
        if (attributeName === 'value') {
            this.render()
        }
    }

    connectedCallback(): void {
        this.render()
    }

    static get observedAttributes(): string[] {
        return ['value'];
    }

    get value(): VaValue {
        if (this.hasAttribute('value')) {
            try {
                return JSON.parse(this.getAttribute('value'));
            } catch (e) {
                return this.value;
            }
        } else {
            return '';
        }
    }
    set value(value: VaValue) {
        this.setAttribute('value', JSON.stringify(value));
    }

    render(): void {
        this.shadowRoot.innerHTML = this.innerHTML;
        this.shadowRoot.querySelectorAll('va-print:not(va-print[id])').forEach(el => {
            el.setAttribute('value', JSON.stringify(this.value));
        })
    }
}