export default class VaEach extends HTMLElement {
    signedEvents = {};
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
            this.shadowRoot.appendChild(this.attachEvents(el).content);
            // replace the value with the current value
            this.shadowRoot.querySelectorAll('va-print:not(va-print[id], va-print[value])').forEach(el => {
                el.setAttribute('value', JSON.stringify(v));
            });
        });
    }
    getCallback(event, callbackName) {
        try {
            return this.signedEvents[event][callbackName] ?? (() => { });
        }
        catch (e) {
            return (() => { });
        }
    }
    attachEvents(el) {
        el.content.querySelectorAll('*[va-event]').forEach(el => {
            let callback = el.getAttribute('va-callback');
            let event;
            let callbackFn;
            if (callback) {
                event = el.getAttribute('va-event');
                callbackFn = this.getCallback(event, callback);
            }
            else {
                const eventAndCallback = el.getAttribute('va-event');
                if (eventAndCallback) {
                    [event, callback] = eventAndCallback.split(':');
                    callbackFn = this.getCallback(event, callback);
                }
                else {
                    event = 'noevent';
                    callbackFn = () => { };
                }
            }
            // @ts-ignore
            el.addEventListener(event, callbackFn);
        });
        return el;
    }
    signEvent(event, callbacks) {
        this.signedEvents[event] = callbacks;
    }
}
