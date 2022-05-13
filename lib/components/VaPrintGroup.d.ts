import VaValue from "../types/VaValue";
export default class VaPrintGroup extends HTMLElement {
    constructor();
    attributeChangedCallback(attributeName: string): void;
    connectedCallback(): void;
    static get observedAttributes(): string[];
    get value(): VaValue;
    set value(value: VaValue);
    render(): void;
}
