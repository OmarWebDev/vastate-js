/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/VaEach.ts":
/*!**********************************!*\
  !*** ./src/components/VaEach.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VaEach)
/* harmony export */ });
class VaEach extends HTMLElement {
    constructor() {
        super();
        this.signedEvents = {};
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
        var _a;
        try {
            return (_a = this.signedEvents[event][callbackName]) !== null && _a !== void 0 ? _a : (() => { });
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


/***/ }),

/***/ "./src/components/VaPrint.ts":
/*!***********************************!*\
  !*** ./src/components/VaPrint.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VaPrint)
/* harmony export */ });
class VaPrint extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ 'mode': 'open' });
    }
    attributeChangedCallback(attributeName) {
        if (attributeName === 'value' || attributeName === 'key') {
            this.render();
        }
    }
    connectedCallback() {
        this.render();
    }
    static get observedAttributes() {
        return ['value', 'key'];
    }
    get value() {
        if (this.hasAttribute('value')) {
            try {
                return JSON.parse(this.getAttribute('value'));
            }
            catch (e) {
                return this.getAttribute('value');
            }
        }
        else {
            return '';
        }
    }
    get key() {
        var _a;
        if (this.hasAttribute('key')) {
            return (_a = this.getAttribute('key')) !== null && _a !== void 0 ? _a : false;
        }
        else {
            return false;
        }
    }
    set value(value) {
        this.setAttribute('value', (Array.isArray(value) || typeof value === 'object') ? JSON.stringify(value) : value.toString());
    }
    render() {
        const valueToBePrinted = !Array.isArray(this.value) ? (typeof this.value === 'object' ?
            // @ts-ignore
            this.value[this.key ? this.key : 0] :
            this.value) : 'Printing an array is not supported use VaEach instead';
        if (this.hasAttribute('html'))
            this.shadowRoot.innerHTML = valueToBePrinted;
        else
            this.shadowRoot.textContent = valueToBePrinted;
    }
    signEvent() { }
}


/***/ }),

/***/ "./src/components/VaPrintGroup.ts":
/*!****************************************!*\
  !*** ./src/components/VaPrintGroup.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VaPrintGroup)
/* harmony export */ });
class VaPrintGroup extends HTMLElement {
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
                return this.value;
            }
        }
        else {
            return '';
        }
    }
    set value(value) {
        this.setAttribute('value', JSON.stringify(value));
    }
    render() {
        this.shadowRoot.innerHTML = this.innerHTML;
        this.shadowRoot.querySelectorAll('va-print:not(va-print[id])').forEach(el => {
            el.setAttribute('value', JSON.stringify(this.value));
        });
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/vastate.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_VaEach__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/VaEach */ "./src/components/VaEach.ts");
/* harmony import */ var _components_VaPrint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/VaPrint */ "./src/components/VaPrint.ts");
/* harmony import */ var _components_VaPrintGroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/VaPrintGroup */ "./src/components/VaPrintGroup.ts");
/**
 * Name: Vastate.js
 * Version: 1.3.0
 * License: MIT
 */



window.customElements.define('va-print', _components_VaPrint__WEBPACK_IMPORTED_MODULE_1__["default"]);
window.customElements.define('va-each', _components_VaEach__WEBPACK_IMPORTED_MODULE_0__["default"]);
window.customElements.define('va-print-group', _components_VaPrintGroup__WEBPACK_IMPORTED_MODULE_2__["default"]);
/**
 * Vastate is a javascript library that can be used to print javascript variables to html easily
 */
class Vastate {
    /**
     * Creates a new Vastate instance
     *
     * @param element State Name it can be a VaPrint/VaEach HTML Element or a string containing the id of the VaPrint/VaEach HTML Element
     * @param defaultValue Default value of the state
     */
    constructor(element, defaultValue) {
        /**
         * Holds the storage to be used by the state
         */
        this.storage = localStorage;
        if (typeof element !== 'string')
            this.element = element;
        else
            this.element = document.getElementById(element);
        this.value = defaultValue;
    }
    /**
     * Sets the value of the state
     *
     * @param value Value to be set
     */
    set value(value) {
        if (this.stateValue !== value) {
            this.stateValue = value;
            this.update();
        }
    }
    /**
     * Gets the value of the state
     *
     * @returns Value of the state
     */
    get value() {
        return this.stateValue;
    }
    /**
     * Updates the state value in the DOM
     */
    update() {
        this.element.value = this.stateValue;
    }
    set key(key) {
        this.element.setAttribute('key', key);
    }
    get key() {
        return this.element.getAttribute('key');
    }
    /**
     * Sets the storage to be used by the state
     *
     * @param storage Storage to be used to store the state
     * @returns Returns the Vastate instance
     */
    setSaveStorage(storage) {
        this.storage = storage;
        return this;
    }
    /**
     * Saves the state value to the storage
     *
     * @returns Return Vastate instance
     */
    save() {
        if (this.storage) {
            this.storage.setItem(this.element.id, typeof this.stateValue === 'object' || Array.isArray(this.stateValue) ? JSON.stringify(this.stateValue) : this.stateValue.toString());
        }
        return this;
    }
    /**
     * Loads the state value from the storage
     *
     * @returns Returns the Vastate instance
     */
    load() {
        var _a, _b;
        if (this.storage) {
            this.value = (_b = (_a = JSON.parse(this.storage.getItem(this.key) || 'null')) !== null && _a !== void 0 ? _a : this.storage.getItem(this.element.id)) !== null && _b !== void 0 ? _b : this.value;
        }
        return this;
    }
    static multiple(selector, defaultValue) {
        return new MultiVastate(selector, defaultValue);
    }
    on(event, callbacks) {
        this.element.signEvent(event, callbacks);
        return this;
    }
}
class MultiVastate {
    constructor(selector, defaultValue) {
        this.states = [];
        document.querySelectorAll(selector).forEach(state => {
            this.states.push(new Vastate(state, defaultValue));
        });
    }
    get value() {
        return this.states.map(s => s.value);
    }
    set value(value) {
        this.states.forEach(state => state.value = value);
    }
    save() {
        this.states.forEach(state => state.save());
        return this;
    }
    load() {
        this.states.forEach(state => state.load());
        return this;
    }
    setSaveStorage(storage) {
        this.states.forEach(state => state.setSaveStorage(storage));
        return this;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vastate);

})();

window.Vastate = __webpack_exports__["default"];
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFjO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckQsQ0FBQztJQUVNLElBQUk7UUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxQyxPQUFPLElBQUk7SUFDZixDQUFDO0lBRU0sSUFBSTtRQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFDLE9BQU8sSUFBSTtJQUNmLENBQUM7SUFFTSxjQUFjLENBQUMsT0FBZ0I7UUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNELE9BQU8sSUFBSTtJQUNmLENBQUM7Q0FDSjtBQUNELGlFQUFlLE9BQU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9WYXN0YXRlLy4vc3JjL2NvbXBvbmVudHMvVmFFYWNoLnRzIiwid2VicGFjazovL1Zhc3RhdGUvLi9zcmMvY29tcG9uZW50cy9WYVByaW50LnRzIiwid2VicGFjazovL1Zhc3RhdGUvLi9zcmMvY29tcG9uZW50cy9WYVByaW50R3JvdXAudHMiLCJ3ZWJwYWNrOi8vVmFzdGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9WYXN0YXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9WYXN0YXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vVmFzdGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1Zhc3RhdGUvLi9zcmMvdmFzdGF0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmFWYWx1ZSBmcm9tIFwiLi4vdHlwZXMvVmFWYWx1ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFFYWNoIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG4gICAgc2lnbmVkRXZlbnRzOiB7IFtrZXk6IHN0cmluZ106IHsgW2tleTogc3RyaW5nXTogQ2FsbGFibGVGdW5jdGlvbiB9IH0gPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuYXR0YWNoU2hhZG93KHsgJ21vZGUnOiAnb3BlbicgfSk7XHJcbiAgICB9XHJcbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0cmlidXRlTmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGF0dHJpYnV0ZU5hbWUgPT09ICd2YWx1ZScpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbmRlcigpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBbJ3ZhbHVlJ107XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlKCk6IEFycmF5PFZhVmFsdWU+IHtcclxuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ3ZhbHVlJykpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXMuZ2V0QXR0cmlidXRlKCd2YWx1ZScpKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVmFFYWNoOiB2YWx1ZSBtdXN0IGJlIGFuIGFycmF5Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBBcnJheTxWYVZhbHVlPikge1xyXG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd2YWx1ZScsIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy5xdWVyeVNlbGVjdG9yPEhUTUxUZW1wbGF0ZUVsZW1lbnQ+KCd0ZW1wbGF0ZScpO1xyXG5cclxuICAgICAgICAvLyBjbGVhciB0aGUgc2hhZG93IGRvbVxyXG4gICAgICAgIHRoaXMuc2hhZG93Um9vdC5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICAgICAgLy8gbG9vcCB0aHJvdWdoIHRoZSBhcnJheVxyXG4gICAgICAgIHRoaXMudmFsdWUuZm9yRWFjaCh2ID0+IHtcclxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IGVsZW1lbnRcclxuICAgICAgICAgICAgY29uc3QgZWwgPSB0ZW1wbGF0ZS5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgZWxlbWVudCB0byB0aGUgc2hhZG93IGRvbVxyXG4gICAgICAgICAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGhpcy5hdHRhY2hFdmVudHMoZWwpLmNvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVwbGFjZSB0aGUgdmFsdWUgd2l0aCB0aGUgY3VycmVudCB2YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvckFsbCgndmEtcHJpbnQ6bm90KHZhLXByaW50W2lkXSwgdmEtcHJpbnRbdmFsdWVdKScpLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCd2YWx1ZScsIEpTT04uc3RyaW5naWZ5KHYpKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG4gICAgZ2V0Q2FsbGJhY2soZXZlbnQ6IHN0cmluZywgY2FsbGJhY2tOYW1lOiBzdHJpbmcpOiBDYWxsYWJsZUZ1bmN0aW9uIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zaWduZWRFdmVudHNbZXZlbnRdW2NhbGxiYWNrTmFtZV0gPz8gKCgpID0+IHsgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKCgpID0+IHsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjaEV2ZW50cyhlbDogSFRNTFRlbXBsYXRlRWxlbWVudCk6IEhUTUxUZW1wbGF0ZUVsZW1lbnQge1xyXG4gICAgICAgIGVsLmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnKlt2YS1ldmVudF0nKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgbGV0IGNhbGxiYWNrID0gZWwuZ2V0QXR0cmlidXRlKCd2YS1jYWxsYmFjaycpO1xyXG4gICAgICAgICAgICBsZXQgZXZlbnQ6IHN0cmluZztcclxuICAgICAgICAgICAgbGV0IGNhbGxiYWNrRm46IENhbGxhYmxlRnVuY3Rpb25cclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IGVsLmdldEF0dHJpYnV0ZSgndmEtZXZlbnQnKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrRm4gPSB0aGlzLmdldENhbGxiYWNrKGV2ZW50LCBjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudEFuZENhbGxiYWNrID0gZWwuZ2V0QXR0cmlidXRlKCd2YS1ldmVudCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50QW5kQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBbZXZlbnQsIGNhbGxiYWNrXSA9IGV2ZW50QW5kQ2FsbGJhY2suc3BsaXQoJzonKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja0ZuID0gdGhpcy5nZXRDYWxsYmFjayhldmVudCwgY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudCA9ICdub2V2ZW50JztcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja0ZuID0gKCkgPT4geyB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrRm4pXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZWxcclxuICAgIH1cclxuXHJcbiAgICBzaWduRXZlbnQoZXZlbnQ6IHN0cmluZywgY2FsbGJhY2tzOiB7IFtrZXk6IHN0cmluZ106IENhbGxhYmxlRnVuY3Rpb24gfSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2lnbmVkRXZlbnRzW2V2ZW50XSA9IGNhbGxiYWNrcztcclxuICAgIH1cclxufSIsImltcG9ydCBWYVZhbHVlIGZyb20gXCIuLi90eXBlcy9WYVZhbHVlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYVByaW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuYXR0YWNoU2hhZG93KHsgJ21vZGUnOiAnb3BlbicgfSk7XHJcbiAgICB9XHJcbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0cmlidXRlTmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGF0dHJpYnV0ZU5hbWUgPT09ICd2YWx1ZScgfHwgYXR0cmlidXRlTmFtZSA9PT0gJ2tleScpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVuZGVyKClcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIFsndmFsdWUnLCAna2V5J107XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlKCk6IFZhVmFsdWUge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgndmFsdWUnKSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBrZXkoKTogc3RyaW5nIHwgZmFsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgna2V5JykpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgna2V5JykgPz8gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXQgdmFsdWUodmFsdWU6IFZhVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykgPyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgOiB2YWx1ZS50b1N0cmluZygpKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVUb0JlUHJpbnRlZCA9ICFBcnJheS5pc0FycmF5KHRoaXMudmFsdWUpID8gKHR5cGVvZiB0aGlzLnZhbHVlID09PSAnb2JqZWN0JyA/XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgdGhpcy52YWx1ZVt0aGlzLmtleSA/IHRoaXMua2V5IDogMF0gOiBcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSkgOiAnUHJpbnRpbmcgYW4gYXJyYXkgaXMgbm90IHN1cHBvcnRlZCB1c2UgVmFFYWNoIGluc3RlYWQnIFxyXG5cclxuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ2h0bWwnKSlcclxuICAgICAgICAgICAgdGhpcy5zaGFkb3dSb290LmlubmVySFRNTCA9IHZhbHVlVG9CZVByaW50ZWQ7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLnNoYWRvd1Jvb3QudGV4dENvbnRlbnQgPSB2YWx1ZVRvQmVQcmludGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHNpZ25FdmVudCgpIHt9XHJcblxyXG59XHJcbiIsImltcG9ydCBWYVZhbHVlIGZyb20gXCIuLi90eXBlcy9WYVZhbHVlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYVByaW50R3JvdXAgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuYXR0YWNoU2hhZG93KHsgJ21vZGUnOiAnb3BlbicgfSk7XHJcbiAgICB9XHJcbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0cmlidXRlTmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGF0dHJpYnV0ZU5hbWUgPT09ICd2YWx1ZScpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbmRlcigpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBbJ3ZhbHVlJ107XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlKCk6IFZhVmFsdWUge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgndmFsdWUnKSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXQgdmFsdWUodmFsdWU6IFZhVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNoYWRvd1Jvb3QuaW5uZXJIVE1MID0gdGhpcy5pbm5lckhUTUw7XHJcbiAgICAgICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3JBbGwoJ3ZhLXByaW50Om5vdCh2YS1wcmludFtpZF0pJykuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBKU09OLnN0cmluZ2lmeSh0aGlzLnZhbHVlKSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIE5hbWU6IFZhc3RhdGUuanNcclxuICogVmVyc2lvbjogMS4zLjBcclxuICogTGljZW5zZTogTUlUXHJcbiAqL1xyXG5cclxuaW1wb3J0IFZhRWFjaCBmcm9tIFwiLi9jb21wb25lbnRzL1ZhRWFjaFwiO1xyXG5pbXBvcnQgVmFQcmludCBmcm9tIFwiLi9jb21wb25lbnRzL1ZhUHJpbnRcIjtcclxuaW1wb3J0IFZhUHJpbnRHcm91cCBmcm9tIFwiLi9jb21wb25lbnRzL1ZhUHJpbnRHcm91cFwiO1xyXG5pbXBvcnQgVmFWYWx1ZSBmcm9tIFwiLi90eXBlcy9WYVZhbHVlXCI7XHJcblxyXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd2YS1wcmludCcsIFZhUHJpbnQpO1xyXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd2YS1lYWNoJywgVmFFYWNoKTtcclxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgndmEtcHJpbnQtZ3JvdXAnLCBWYVByaW50R3JvdXApO1xyXG5cclxuLyoqXHJcbiAqIFZhc3RhdGUgaXMgYSBqYXZhc2NyaXB0IGxpYnJhcnkgdGhhdCBjYW4gYmUgdXNlZCB0byBwcmludCBqYXZhc2NyaXB0IHZhcmlhYmxlcyB0byBodG1sIGVhc2lseVxyXG4gKi9cclxuY2xhc3MgVmFzdGF0ZSB7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIEhUTUwgRWxlbWVudCBvZiB0aGUgc3RhdGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVsZW1lbnQ6IFZhUHJpbnQgfCBWYUVhY2g7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIHN0YXRlIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGVWYWx1ZTogVmFWYWx1ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBzdG9yYWdlIHRvIGJlIHVzZWQgYnkgdGhlIHN0YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZSA9IGxvY2FsU3RvcmFnZTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IFZhc3RhdGUgaW5zdGFuY2VcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgU3RhdGUgTmFtZSBpdCBjYW4gYmUgYSBWYVByaW50L1ZhRWFjaCBIVE1MIEVsZW1lbnQgb3IgYSBzdHJpbmcgY29udGFpbmluZyB0aGUgaWQgb2YgdGhlIFZhUHJpbnQvVmFFYWNoIEhUTUwgRWxlbWVudFxyXG4gICAgICogQHBhcmFtIGRlZmF1bHRWYWx1ZSBEZWZhdWx0IHZhbHVlIG9mIHRoZSBzdGF0ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBWYVByaW50IHwgVmFFYWNoIHwgc3RyaW5nLCBkZWZhdWx0VmFsdWU6IFZhVmFsdWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQgIT09ICdzdHJpbmcnKSBcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCkgYXMgVmFQcmludCB8IFZhRWFjaFxyXG4gICAgICAgIHRoaXMudmFsdWUgPSBkZWZhdWx0VmFsdWVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZhbHVlIG9mIHRoZSBzdGF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUgVmFsdWUgdG8gYmUgc2V0XHJcbiAgICAgKi9cclxuICAgIHNldCB2YWx1ZSh2YWx1ZTogVmFWYWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlVmFsdWUgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVWYWx1ZSA9IHZhbHVlXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB2YWx1ZSBvZiB0aGUgc3RhdGVcclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMgVmFsdWUgb2YgdGhlIHN0YXRlXHJcbiAgICAgKi9cclxuICAgIGdldCB2YWx1ZSgpOiBWYVZhbHVlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZVZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBzdGF0ZSB2YWx1ZSBpbiB0aGUgRE9NXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IHRoaXMuc3RhdGVWYWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBrZXkoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdrZXknLCBrZXkpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBrZXkoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgna2V5JylcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHN0b3JhZ2UgdG8gYmUgdXNlZCBieSB0aGUgc3RhdGVcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHN0b3JhZ2UgU3RvcmFnZSB0byBiZSB1c2VkIHRvIHN0b3JlIHRoZSBzdGF0ZVxyXG4gICAgICogQHJldHVybnMgUmV0dXJucyB0aGUgVmFzdGF0ZSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U2F2ZVN0b3JhZ2Uoc3RvcmFnZTogU3RvcmFnZSk6IHRoaXMge1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2VcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2F2ZXMgdGhlIHN0YXRlIHZhbHVlIHRvIHRoZSBzdG9yYWdlXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIFJldHVybiBWYXN0YXRlIGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzYXZlKCk6IHRoaXMge1xyXG4gICAgICAgIGlmICh0aGlzLnN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0odGhpcy5lbGVtZW50LmlkLCB0eXBlb2YgdGhpcy5zdGF0ZVZhbHVlID09PSAnb2JqZWN0JyB8fCBBcnJheS5pc0FycmF5KHRoaXMuc3RhdGVWYWx1ZSkgPyBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlVmFsdWUpIDogdGhpcy5zdGF0ZVZhbHVlLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3RhdGUgdmFsdWUgZnJvbSB0aGUgc3RvcmFnZVxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyBSZXR1cm5zIHRoZSBWYXN0YXRlIGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkKCk6IHRoaXMge1xyXG4gICAgICAgIGlmICh0aGlzLnN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IEpTT04ucGFyc2UodGhpcy5zdG9yYWdlLmdldEl0ZW0odGhpcy5rZXkpIHx8ICdudWxsJykgPz8gdGhpcy5zdG9yYWdlLmdldEl0ZW0odGhpcy5lbGVtZW50LmlkKSA/PyB0aGlzLnZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIG11bHRpcGxlKHNlbGVjdG9yOiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogVmFWYWx1ZSk6IE11bHRpVmFzdGF0ZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNdWx0aVZhc3RhdGUoc2VsZWN0b3IsIGRlZmF1bHRWYWx1ZSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb24oZXZlbnQ6IHN0cmluZywgY2FsbGJhY2tzOiB7W2tleTogc3RyaW5nXTogQ2FsbGFibGVGdW5jdGlvbn0pOiB0aGlzIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuc2lnbkV2ZW50KGV2ZW50LCBjYWxsYmFja3MpXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcbn1cclxuY2xhc3MgTXVsdGlWYXN0YXRlIHtcclxuICAgIHByaXZhdGUgc3RhdGVzOiBWYXN0YXRlW10gPSBbXVxyXG4gICAgY29uc3RydWN0b3Ioc2VsZWN0b3I6IHN0cmluZywgZGVmYXVsdFZhbHVlOiBWYVZhbHVlKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxWYVByaW50IHwgVmFFYWNoPihzZWxlY3RvcikuZm9yRWFjaChzdGF0ZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLnB1c2gobmV3IFZhc3RhdGUoc3RhdGUsIGRlZmF1bHRWYWx1ZSkpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmFsdWUoKTogVmFWYWx1ZVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZXMubWFwKHMgPT4gcy52YWx1ZSlcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdmFsdWUodmFsdWU6IFZhVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnN0YXRlcy5mb3JFYWNoKHN0YXRlID0+IHN0YXRlLnZhbHVlID0gdmFsdWUpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNhdmUoKTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZXMuZm9yRWFjaChzdGF0ZSA9PiBzdGF0ZS5zYXZlKCkpXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZCgpOiB0aGlzIHtcclxuICAgICAgICB0aGlzLnN0YXRlcy5mb3JFYWNoKHN0YXRlID0+IHN0YXRlLmxvYWQoKSlcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTYXZlU3RvcmFnZShzdG9yYWdlOiBTdG9yYWdlKTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZXMuZm9yRWFjaChzdGF0ZSA9PiBzdGF0ZS5zZXRTYXZlU3RvcmFnZShzdG9yYWdlKSlcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFZhc3RhdGUiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=