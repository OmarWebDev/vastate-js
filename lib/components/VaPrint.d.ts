import VaValue from "../types/VaValue";
export default class VaPrint extends HTMLElement {
    constructor();
    attributeChangedCallback(attributeName: string): void;
    connectedCallback(): void;
    static get observedAttributes(): string[];
    get value(): VaValue;
    get key(): string | false;
    set value(value: VaValue);
    render(): void;
    signEvent(): void;
}
