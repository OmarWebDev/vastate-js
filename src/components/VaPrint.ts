import VaValue from "../types/VaValue";

export default class VaPrint extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({ 'mode': 'open' });
    }
    attributeChangedCallback(attributeName: string): void {
        if (attributeName === 'value' || attributeName === 'key') {
            this.render()
        }
    }
    connectedCallback(): void {
        this.render()
    }

    static get observedAttributes(): string[] {
        return ['value', 'key'];
    }

    get value(): VaValue {
        if (this.hasAttribute('value')) {
            try {
                return JSON.parse(this.getAttribute('value'));
            } catch (e) {
                return this.getAttribute('value');
            }
        } else {
            return '';
        }
    }

    get key(): string | false {
        if (this.hasAttribute('key')) {

            return this.getAttribute('key') ?? false;
        } else {
            return false;
        }
    }

    set value(value: VaValue) {
        this.setAttribute('value', (Array.isArray(value) || typeof this.value === 'object') ? JSON.stringify(value) : value.toString());
    }

    render(): void {
        const valueToBePrinted = !Array.isArray(this.value) ? (typeof this.value === 'object' ?
            // @ts-ignore
            this.value[this.key ? this.key : 0] : 
            this.value) : 'Printing an array is not supported use VaEach instead' 

        if (this.hasAttribute('html'))
            this.shadowRoot.innerHTML = valueToBePrinted;
        else
            this.shadowRoot.textContent = valueToBePrinted;
    }

}
