import VaValue from "../types/VaValue";

export default class VaEach extends HTMLElement {
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

    get value(): Array<VaValue> {
        if (this.hasAttribute('value')) {
            try {
                return JSON.parse(this.getAttribute('value'));
            } catch (e) {
                throw new TypeError('VaEach: value must be an array');
            }
        } else {
            return [];
        }
    }
    set value(value: Array<VaValue>) {
        this.setAttribute('value', JSON.stringify(value));
    }

    render(): void {
        const template = this.querySelector<HTMLTemplateElement>('template');
        
        // clear the shadow dom
        this.shadowRoot.innerHTML = '';

        // loop through the array
        this.value.forEach(v => {
            // create a new element
            const el = template.cloneNode(true) as HTMLTemplateElement;
            
            // append the element to the shadow dom
            this.shadowRoot.appendChild(el.content);

            // replace the value with the current value
            this.shadowRoot.querySelectorAll('va-print:not(va-print[id], va-print[value])').forEach(el => {
                el.setAttribute('value', JSON.stringify(v));
            })
        })
        
    }
}