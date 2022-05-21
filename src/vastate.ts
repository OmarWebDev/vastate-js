/**
 * Name: Vastate.js
 * Version: 1.3.0
 * License: MIT
 */

import VaEach from "./components/VaEach";
import VaPrint from "./components/VaPrint";
import VaPrintGroup from "./components/VaPrintGroup";
import VaValue from "./types/VaValue";

window.customElements.define('va-print', VaPrint);
window.customElements.define('va-each', VaEach);
window.customElements.define('va-print-group', VaPrintGroup);

/**
 * Vastate is a javascript library that can be used to print javascript variables to html easily
 */
class Vastate {
    
    /**
     * Holds the HTML Element of the state
     */
    public element: VaPrint | VaEach;
    
    /**
     * Holds the state value
     */
    private stateValue: VaValue;

    /**
     * Holds the storage to be used by the state
     */
    private storage: Storage = localStorage;
    
    /**
     * Creates a new Vastate instance
     * 
     * @param element State Name it can be a VaPrint/VaEach HTML Element or a string containing the id of the VaPrint/VaEach HTML Element
     * @param defaultValue Default value of the state
     */
    constructor(element: VaPrint | VaEach | string, defaultValue: VaValue) {
        if (typeof element !== 'string') 
            this.element = element
        else
            this.element = document.getElementById(element) as VaPrint | VaEach
        this.value = defaultValue
    }

    /**
     * Sets the value of the state
     * 
     * @param value Value to be set
     */
    set value(value: VaValue) {
        if (this.stateValue !== value) {
            this.stateValue = value
            this.update()
        }
    }

    /**
     * Gets the value of the state
     * 
     * @returns Value of the state
     */
    get value(): VaValue {
        return this.stateValue
    }

    /**
     * Updates the state value in the DOM
     */
    private update(): void {
        this.element.value = this.stateValue
    }

    set key(key: string) {
        this.element.setAttribute('key', key)
    }
    
    get key(): string {
        return this.element.getAttribute('key')
    }

    /**
     * Sets the storage to be used by the state
     * 
     * @param storage Storage to be used to store the state
     * @returns Returns the Vastate instance
     */
    public setSaveStorage(storage: Storage): this {
        this.storage = storage
        return this
    }

    /**
     * Saves the state value to the storage
     * 
     * @returns Return Vastate instance
     */
    public save(): this {
        if (this.storage) {
            this.storage.setItem(this.element.id, typeof this.stateValue === 'object' || Array.isArray(this.stateValue) ? JSON.stringify(this.stateValue) : this.stateValue.toString())
        }
        return this
    }

    /**
     * Loads the state value from the storage
     * 
     * @returns Returns the Vastate instance
     */
    public load(): this {
        if (this.storage) {
            this.value = JSON.parse(this.storage.getItem(this.key) || 'null') ?? this.storage.getItem(this.element.id) ?? this.value
        }
        return this
    }

    static multiple(selector: string, defaultValue: VaValue): MultiVastate {
        return new MultiVastate(selector, defaultValue)
    }

    public on(event: string, callbacks: {[key: string]: CallableFunction}): this {
        this.element.signEvent(event, callbacks)
        return this
    }

}
class MultiVastate {
    private states: Vastate[] = []
    constructor(selector: string, defaultValue: VaValue) {
        document.querySelectorAll<VaPrint | VaEach>(selector).forEach(state => {
            this.states.push(new Vastate(state, defaultValue))
        })
    }

    get value(): VaValue[] {
        return this.states.map(s => s.value)
    }

    set value(value: VaValue) {
        this.states.forEach(state => state.value = value)
    }

    public save(): this {
        this.states.forEach(state => state.save())
        return this
    }

    public load(): this {
        this.states.forEach(state => state.load())
        return this
    }

    public setSaveStorage(storage: Storage): this {
        this.states.forEach(state => state.setSaveStorage(storage))
        return this
    }
}
export default Vastate