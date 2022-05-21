/**
 * Name: Vastate.js
 * Version: 1.3.0
 * License: MIT
 */
import VaEach from "./components/VaEach";
import VaPrint from "./components/VaPrint";
import VaValue from "./types/VaValue";
/**
 * Vastate is a javascript library that can be used to print javascript variables to html easily
 */
declare class Vastate {
    /**
     * Holds the HTML Element of the state
     */
    element: VaPrint | VaEach;
    /**
     * Holds the state value
     */
    private stateValue;
    /**
     * Holds the storage to be used by the state
     */
    private storage;
    /**
     * Creates a new Vastate instance
     *
     * @param element State Name it can be a VaPrint/VaEach HTML Element or a string containing the id of the VaPrint/VaEach HTML Element
     * @param defaultValue Default value of the state
     */
    constructor(element: VaPrint | VaEach | string, defaultValue: VaValue);
    /**
     * Sets the value of the state
     *
     * @param value Value to be set
     */
    set value(value: VaValue);
    /**
     * Gets the value of the state
     *
     * @returns Value of the state
     */
    get value(): VaValue;
    /**
     * Updates the state value in the DOM
     */
    private update;
    set key(key: string);
    get key(): string;
    /**
     * Sets the storage to be used by the state
     *
     * @param storage Storage to be used to store the state
     * @returns Returns the Vastate instance
     */
    setSaveStorage(storage: Storage): this;
    /**
     * Saves the state value to the storage
     *
     * @returns Return Vastate instance
     */
    save(): this;
    /**
     * Loads the state value from the storage
     *
     * @returns Returns the Vastate instance
     */
    load(): this;
    static multiple(selector: string, defaultValue: VaValue): MultiVastate;
    on(event: string, callbacks: {
        [key: string]: CallableFunction;
    }): this;
}
declare class MultiVastate {
    private states;
    constructor(selector: string, defaultValue: VaValue);
    get value(): VaValue[];
    set value(value: VaValue);
    save(): this;
    load(): this;
    setSaveStorage(storage: Storage): this;
}
export default Vastate;
