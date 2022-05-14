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
            this.shadowRoot.appendChild(el.content);
            // replace the value with the current value
            this.shadowRoot.querySelectorAll('va-print:not(va-print[id], va-print[value])').forEach(el => {
                el.setAttribute('value', JSON.stringify(v));
            });
        });
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
}
class MultiVastate {
    constructor(selector, defaultValue) {
        this.states = [];
        document.querySelectorAll(selector).forEach(state => {
            console.log(defaultValue);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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STtRQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFDLE9BQU8sSUFBSTtJQUNmLENBQUM7SUFFTSxJQUFJO1FBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUMsT0FBTyxJQUFJO0lBQ2YsQ0FBQztJQUVNLGNBQWMsQ0FBQyxPQUFnQjtRQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0QsT0FBTyxJQUFJO0lBQ2YsQ0FBQztDQUNKO0FBQ0QsaUVBQWUsT0FBTyIsInNvdXJjZXMiOlsid2VicGFjazovL1Zhc3RhdGUvLi9zcmMvY29tcG9uZW50cy9WYUVhY2gudHMiLCJ3ZWJwYWNrOi8vVmFzdGF0ZS8uL3NyYy9jb21wb25lbnRzL1ZhUHJpbnQudHMiLCJ3ZWJwYWNrOi8vVmFzdGF0ZS8uL3NyYy9jb21wb25lbnRzL1ZhUHJpbnRHcm91cC50cyIsIndlYnBhY2s6Ly9WYXN0YXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1Zhc3RhdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1Zhc3RhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9WYXN0YXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vVmFzdGF0ZS8uL3NyYy92YXN0YXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYVZhbHVlIGZyb20gXCIuLi90eXBlcy9WYVZhbHVlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYUVhY2ggZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuYXR0YWNoU2hhZG93KHsgJ21vZGUnOiAnb3BlbicgfSk7XHJcbiAgICB9XHJcbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0cmlidXRlTmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGF0dHJpYnV0ZU5hbWUgPT09ICd2YWx1ZScpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbmRlcigpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBbJ3ZhbHVlJ107XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlKCk6IEFycmF5PFZhVmFsdWU+IHtcclxuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ3ZhbHVlJykpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXMuZ2V0QXR0cmlidXRlKCd2YWx1ZScpKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVmFFYWNoOiB2YWx1ZSBtdXN0IGJlIGFuIGFycmF5Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBBcnJheTxWYVZhbHVlPikge1xyXG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd2YWx1ZScsIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy5xdWVyeVNlbGVjdG9yPEhUTUxUZW1wbGF0ZUVsZW1lbnQ+KCd0ZW1wbGF0ZScpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNsZWFyIHRoZSBzaGFkb3cgZG9tXHJcbiAgICAgICAgdGhpcy5zaGFkb3dSb290LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICAvLyBsb29wIHRocm91Z2ggdGhlIGFycmF5XHJcbiAgICAgICAgdGhpcy52YWx1ZS5mb3JFYWNoKHYgPT4ge1xyXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBuZXcgZWxlbWVudFxyXG4gICAgICAgICAgICBjb25zdCBlbCA9IHRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gYXBwZW5kIHRoZSBlbGVtZW50IHRvIHRoZSBzaGFkb3cgZG9tXHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZChlbC5jb250ZW50KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIHZhbHVlIHdpdGggdGhlIGN1cnJlbnQgdmFsdWVcclxuICAgICAgICAgICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3JBbGwoJ3ZhLXByaW50Om5vdCh2YS1wcmludFtpZF0sIHZhLXByaW50W3ZhbHVlXSknKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBKU09OLnN0cmluZ2lmeSh2KSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCBWYVZhbHVlIGZyb20gXCIuLi90eXBlcy9WYVZhbHVlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYVByaW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuYXR0YWNoU2hhZG93KHsgJ21vZGUnOiAnb3BlbicgfSk7XHJcbiAgICB9XHJcbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0cmlidXRlTmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGF0dHJpYnV0ZU5hbWUgPT09ICd2YWx1ZScgfHwgYXR0cmlidXRlTmFtZSA9PT0gJ2tleScpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVuZGVyKClcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIFsndmFsdWUnLCAna2V5J107XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlKCk6IFZhVmFsdWUge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgndmFsdWUnKSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBrZXkoKTogc3RyaW5nIHwgZmFsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgna2V5JykpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgna2V5JykgPz8gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXQgdmFsdWUodmFsdWU6IFZhVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykgPyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgOiB2YWx1ZS50b1N0cmluZygpKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVUb0JlUHJpbnRlZCA9ICFBcnJheS5pc0FycmF5KHRoaXMudmFsdWUpID8gKHR5cGVvZiB0aGlzLnZhbHVlID09PSAnb2JqZWN0JyA/XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgdGhpcy52YWx1ZVt0aGlzLmtleSA/IHRoaXMua2V5IDogMF0gOiBcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSkgOiAnUHJpbnRpbmcgYW4gYXJyYXkgaXMgbm90IHN1cHBvcnRlZCB1c2UgVmFFYWNoIGluc3RlYWQnIFxyXG5cclxuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ2h0bWwnKSlcclxuICAgICAgICAgICAgdGhpcy5zaGFkb3dSb290LmlubmVySFRNTCA9IHZhbHVlVG9CZVByaW50ZWQ7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLnNoYWRvd1Jvb3QudGV4dENvbnRlbnQgPSB2YWx1ZVRvQmVQcmludGVkO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgVmFWYWx1ZSBmcm9tIFwiLi4vdHlwZXMvVmFWYWx1ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFQcmludEdyb3VwIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmF0dGFjaFNoYWRvdyh7ICdtb2RlJzogJ29wZW4nIH0pO1xyXG4gICAgfVxyXG4gICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHJpYnV0ZU5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChhdHRyaWJ1dGVOYW1lID09PSAndmFsdWUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gWyd2YWx1ZSddO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2YWx1ZSgpOiBWYVZhbHVlIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ3ZhbHVlJykpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXMuZ2V0QXR0cmlidXRlKCd2YWx1ZScpKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBWYVZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zaGFkb3dSb290LmlubmVySFRNTCA9IHRoaXMuaW5uZXJIVE1MO1xyXG4gICAgICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yQWxsKCd2YS1wcmludDpub3QodmEtcHJpbnRbaWRdKScpLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgSlNPTi5zdHJpbmdpZnkodGhpcy52YWx1ZSkpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBOYW1lOiBWYXN0YXRlLmpzXHJcbiAqIFZlcnNpb246IDEuMy4wXHJcbiAqIExpY2Vuc2U6IE1JVFxyXG4gKi9cclxuXHJcbmltcG9ydCBWYUVhY2ggZnJvbSBcIi4vY29tcG9uZW50cy9WYUVhY2hcIjtcclxuaW1wb3J0IFZhUHJpbnQgZnJvbSBcIi4vY29tcG9uZW50cy9WYVByaW50XCI7XHJcbmltcG9ydCBWYVByaW50R3JvdXAgZnJvbSBcIi4vY29tcG9uZW50cy9WYVByaW50R3JvdXBcIjtcclxuaW1wb3J0IFZhVmFsdWUgZnJvbSBcIi4vdHlwZXMvVmFWYWx1ZVwiO1xyXG5cclxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgndmEtcHJpbnQnLCBWYVByaW50KTtcclxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgndmEtZWFjaCcsIFZhRWFjaCk7XHJcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3ZhLXByaW50LWdyb3VwJywgVmFQcmludEdyb3VwKTtcclxuXHJcbi8qKlxyXG4gKiBWYXN0YXRlIGlzIGEgamF2YXNjcmlwdCBsaWJyYXJ5IHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJpbnQgamF2YXNjcmlwdCB2YXJpYWJsZXMgdG8gaHRtbCBlYXNpbHlcclxuICovXHJcbmNsYXNzIFZhc3RhdGUge1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBIVE1MIEVsZW1lbnQgb2YgdGhlIHN0YXRlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbGVtZW50OiBWYVByaW50IHwgVmFFYWNoO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBzdGF0ZSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRlVmFsdWU6IFZhVmFsdWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgc3RvcmFnZSB0byBiZSB1c2VkIGJ5IHRoZSBzdGF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0b3JhZ2U6IFN0b3JhZ2UgPSBsb2NhbFN0b3JhZ2U7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBWYXN0YXRlIGluc3RhbmNlXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBlbGVtZW50IFN0YXRlIE5hbWUgaXQgY2FuIGJlIGEgVmFQcmludC9WYUVhY2ggSFRNTCBFbGVtZW50IG9yIGEgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIGlkIG9mIHRoZSBWYVByaW50L1ZhRWFjaCBIVE1MIEVsZW1lbnRcclxuICAgICAqIEBwYXJhbSBkZWZhdWx0VmFsdWUgRGVmYXVsdCB2YWx1ZSBvZiB0aGUgc3RhdGVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogVmFQcmludCB8IFZhRWFjaCB8IHN0cmluZywgZGVmYXVsdFZhbHVlOiBWYVZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ICE9PSAnc3RyaW5nJykgXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpIGFzIFZhUHJpbnQgfCBWYUVhY2hcclxuICAgICAgICB0aGlzLnZhbHVlID0gZGVmYXVsdFZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZSBvZiB0aGUgc3RhdGVcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHZhbHVlIFZhbHVlIHRvIGJlIHNldFxyXG4gICAgICovXHJcbiAgICBzZXQgdmFsdWUodmFsdWU6IFZhVmFsdWUpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZVZhbHVlICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlVmFsdWUgPSB2YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdmFsdWUgb2YgdGhlIHN0YXRlXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIFZhbHVlIG9mIHRoZSBzdGF0ZVxyXG4gICAgICovXHJcbiAgICBnZXQgdmFsdWUoKTogVmFWYWx1ZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVWYWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgc3RhdGUgdmFsdWUgaW4gdGhlIERPTVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSB0aGlzLnN0YXRlVmFsdWVcclxuICAgIH1cclxuXHJcbiAgICBzZXQga2V5KGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgna2V5Jywga2V5KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQga2V5KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2tleScpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBzdG9yYWdlIHRvIGJlIHVzZWQgYnkgdGhlIHN0YXRlXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBzdG9yYWdlIFN0b3JhZ2UgdG8gYmUgdXNlZCB0byBzdG9yZSB0aGUgc3RhdGVcclxuICAgICAqIEByZXR1cm5zIFJldHVybnMgdGhlIFZhc3RhdGUgaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNhdmVTdG9yYWdlKHN0b3JhZ2U6IFN0b3JhZ2UpOiB0aGlzIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNhdmVzIHRoZSBzdGF0ZSB2YWx1ZSB0byB0aGUgc3RvcmFnZVxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyBSZXR1cm4gVmFzdGF0ZSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZSgpOiB0aGlzIHtcclxuICAgICAgICBpZiAodGhpcy5zdG9yYWdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKHRoaXMuZWxlbWVudC5pZCwgdHlwZW9mIHRoaXMuc3RhdGVWYWx1ZSA9PT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheSh0aGlzLnN0YXRlVmFsdWUpID8gSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZVZhbHVlKSA6IHRoaXMuc3RhdGVWYWx1ZS50b1N0cmluZygpKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHN0YXRlIHZhbHVlIGZyb20gdGhlIHN0b3JhZ2VcclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMgUmV0dXJucyB0aGUgVmFzdGF0ZSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZCgpOiB0aGlzIHtcclxuICAgICAgICBpZiAodGhpcy5zdG9yYWdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBKU09OLnBhcnNlKHRoaXMuc3RvcmFnZS5nZXRJdGVtKHRoaXMua2V5KSB8fCAnbnVsbCcpID8/IHRoaXMuc3RvcmFnZS5nZXRJdGVtKHRoaXMuZWxlbWVudC5pZCkgPz8gdGhpcy52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBtdWx0aXBsZShzZWxlY3Rvcjogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IFZhVmFsdWUpOiBNdWx0aVZhc3RhdGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgTXVsdGlWYXN0YXRlKHNlbGVjdG9yLCBkZWZhdWx0VmFsdWUpXHJcbiAgICB9XHJcblxyXG59XHJcbmNsYXNzIE11bHRpVmFzdGF0ZSB7XHJcbiAgICBwcml2YXRlIHN0YXRlczogVmFzdGF0ZVtdID0gW11cclxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9yOiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogVmFWYWx1ZSkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8VmFQcmludCB8IFZhRWFjaD4oc2VsZWN0b3IpLmZvckVhY2goc3RhdGUgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkZWZhdWx0VmFsdWUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZXMucHVzaChuZXcgVmFzdGF0ZShzdGF0ZSwgZGVmYXVsdFZhbHVlKSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldCB2YWx1ZSgpOiBWYVZhbHVlW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlcy5tYXAocyA9PiBzLnZhbHVlKVxyXG4gICAgfVxyXG5cclxuICAgIHNldCB2YWx1ZSh2YWx1ZTogVmFWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc3RhdGVzLmZvckVhY2goc3RhdGUgPT4gc3RhdGUudmFsdWUgPSB2YWx1ZSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2F2ZSgpOiB0aGlzIHtcclxuICAgICAgICB0aGlzLnN0YXRlcy5mb3JFYWNoKHN0YXRlID0+IHN0YXRlLnNhdmUoKSlcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkKCk6IHRoaXMge1xyXG4gICAgICAgIHRoaXMuc3RhdGVzLmZvckVhY2goc3RhdGUgPT4gc3RhdGUubG9hZCgpKVxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNhdmVTdG9yYWdlKHN0b3JhZ2U6IFN0b3JhZ2UpOiB0aGlzIHtcclxuICAgICAgICB0aGlzLnN0YXRlcy5mb3JFYWNoKHN0YXRlID0+IHN0YXRlLnNldFNhdmVTdG9yYWdlKHN0b3JhZ2UpKVxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgVmFzdGF0ZSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==