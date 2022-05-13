import VaValue from "../types/VaValue";
export default class VaEach extends HTMLElement {
    constructor();
    attributeChangedCallback(attributeName: string): void;
    connectedCallback(): void;
    static get observedAttributes(): string[];
    get value(): Array<VaValue>;
    set value(value: Array<VaValue>);
    render(): void;
}
