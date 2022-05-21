import VaValue from "../types/VaValue";
export default class VaEach extends HTMLElement {
    signedEvents: {
        [key: string]: {
            [key: string]: CallableFunction;
        };
    };
    constructor();
    attributeChangedCallback(attributeName: string): void;
    connectedCallback(): void;
    static get observedAttributes(): string[];
    get value(): Array<VaValue>;
    set value(value: Array<VaValue>);
    render(): void;
    getCallback(event: string, callbackName: string): CallableFunction;
    attachEvents(el: HTMLTemplateElement): HTMLTemplateElement;
    signEvent(event: string, callbacks: {
        [key: string]: CallableFunction;
    }): void;
}
