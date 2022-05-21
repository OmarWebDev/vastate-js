import VaValue from "../types/VaValue";

export default class VaEach extends HTMLElement {
    signedEvents: { [key: string]: { [key: string]: CallableFunction } } = {};

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
            this.shadowRoot.appendChild(this.attachEvents(el).content);

            // replace the value with the current value
            this.shadowRoot.querySelectorAll('va-print:not(va-print[id], va-print[value])').forEach(el => {
                el.setAttribute('value', JSON.stringify(v));
            })


        })

    }
    getCallback(event: string, callbackName: string): CallableFunction {
        try {
            return this.signedEvents[event][callbackName] ?? (() => { });
        } catch (e) {
            return (() => { });
        }
    }

    attachEvents(el: HTMLTemplateElement): HTMLTemplateElement {
        el.content.querySelectorAll('*[va-event]').forEach(el => {
            let callback = el.getAttribute('va-callback');
            let event: string;
            let callbackFn: CallableFunction
            if (callback) {
                event = el.getAttribute('va-event');
                callbackFn = this.getCallback(event, callback);
            } else {
                const eventAndCallback = el.getAttribute('va-event');
                if (eventAndCallback) {
                    [event, callback] = eventAndCallback.split(':');
                    callbackFn = this.getCallback(event, callback);
                } else {
                    event = 'noevent';
                    callbackFn = () => { };
                }
            }
            
            // @ts-ignore
            el.addEventListener(event, callbackFn)
        })
        return el
    }

    signEvent(event: string, callbacks: { [key: string]: CallableFunction }): void {
        this.signedEvents[event] = callbacks;
    }
}