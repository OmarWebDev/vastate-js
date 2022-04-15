/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/*!************************!*\
  !*** ./src/vastate.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const style = document.createElement('style');
style.innerHTML = `
        [vastate-loader] *[vastate-print], 
        [vastate-loader] vastate-print, 
        [vastate-loader] *[vastate-print-group], 
        [vastate-loader] vastate-print-group, 
        [vastate-loader] *[vastate-each], 
        [vastate-loader] vastate-each {
            display: none !important;
        }
    `;
document.head.appendChild(style);
class Vastate {
    /**
     * initialize new state
     *
     * @param name
     * @param value
     */
    constructor(name, value) {
        /**
         * Placeholder that will be replaced with
         * State value when showed in HTML
         *
         * @private
         */
        this.placeholder = '{#VALUE#}';
        /**
         * State previousValue
         *
         * @private
         */
        this.previousValue = this.placeholder;
        /**
         * Loading status
         *
         * @private
         */
        this.isLoading = false;
        /**
         * Loading template for specific state
         *
         * @private
         */
        this.loadingTemplate = Vastate.loadingTemplate;
        /**
         * events will be used when created a new event
         * using on method or triggering an existing event using trigger method
         * there is a default event which is change that will reload the dom
         *
         * @private
         */
        this.events = {
            "change": () => { }
        };
        /**
         * Save mode is used to see where to save the state
         *
         * @private
         */
        this.saveMode = 'localStorage';
        this.groupedVastatePrintsSelector = `vastate-print:not(vastate-print[state]), [vastate-print]:not([vastate-print][state])`;
        this.value = value;
        this.name = name;
        this.vastatePrintsSelector = `vastate-print[state="${this.name}"], [vastate-print][state="${this.name}"]:not([vastate-group])`;
        this.reloadDom();
    }
    /**
     * Remove vastate-loader attribute
     */
    static mount() {
        style.remove();
    }
    /**
     * Set loading status
     *
     * @param loading
     * @return this
     */
    setLoading(loading) {
        this.isLoading = loading;
        this.reloadDom();
        return this;
    }
    /**
     * Set Global loading template
     *
     * @param loadingTemplate
     */
    static setLoadingTemplate(loadingTemplate) {
        this.loadingTemplate = loadingTemplate;
    }
    /**
     * Get current state value
     */
    get() {
        return this.value;
    }
    /**
     * get previous state value
     *
     */
    getPreviousValue() {
        return this.previousValue;
    }
    /**
     * Set state value
     *
     * @param value
     * @return this
     */
    set(value) {
        if (this.value != this.previousValue)
            this.previousValue = this.value;
        this.value = value;
        this.trigger('change');
        this.reloadDom();
        return this;
    }
    /**
     * Create a new event that can be triggered
     * using trigger method
     *
     * @param event
     * @param callback
     */
    on(event, callback) {
        this.events[event] = callback;
    }
    /**
     * Trigger a event that is created using on method
     *
     * @param event
     * @param params
     */
    trigger(event, ...params) {
        if (this.events[event]) {
            this.events[event](...params);
        }
        else {
            Vastate.throwError(`Undefined event '${event}'. Did you created the event using 'on' method?`);
        }
    }
    /**
     * Reload the DOM when value or loading state is changed
     *
     * @private
     */
    reloadDom() {
        this.reloadVastateEachs();
        this.reloadVastatePrints();
        this.reloadVastateGroups();
    }
    /**
     * Reload all vastate-print tags/attribute
     * in the DOM
     *
     * @private
     */
    reloadVastatePrints(parent = document.body) {
        const vastatePrints = parent.querySelectorAll(parent.hasAttribute('vastate-print-group') || parent.tagName.toLowerCase() == "vastate-print-group" ? this.groupedVastatePrintsSelector : this.vastatePrintsSelector);
        vastatePrints.forEach((vastatePrint) => {
            if (this.isLoading) {
                vastatePrint.innerHTML += this.loadingTemplate;
            }
            else {
                // @ts-ignore
                const valueToBePrinted = vastatePrint.hasAttribute('obj') && typeof this.previousValue === 'object' ? this.previousValue[vastatePrint.getAttribute('obj')].toString() : this.previousValue.toString();
                vastatePrint.innerHTML = vastatePrint.innerHTML.split(this.loadingTemplate).join('');
                if (vastatePrint.hasAttribute('html')) {
                    vastatePrint.innerHTML = vastatePrint.innerHTML.split(valueToBePrinted).join(this.getVastatePrintValue(vastatePrint));
                }
                else {
                    vastatePrint.textContent = vastatePrint.textContent.split(valueToBePrinted).join(this.getVastatePrintValue(vastatePrint));
                }
            }
        });
    }
    /**
     * Reload all vastate-each tags/attribute
     * in the DOM
     *
     * @private
     */
    reloadVastateEachs(parent = document.body) {
        const vastateEachs = parent.querySelectorAll(`vastate-each[state="${this.name}"], [vastate-each][state="${this.name}"]`);
        vastateEachs.forEach((vastateEach) => {
            this.resetVastateEach(vastateEach);
            const stateValueArr = Array.isArray(this.get()) ? this.get() : [];
            if (stateValueArr.length < 1) {
                if (!this.isLoading) {
                    this.resetVastateEach(vastateEach);
                    return;
                }
                vastateEach.innerHTML += this.loadingTemplate;
                return;
            }
            stateValueArr === null || stateValueArr === void 0 ? void 0 : stateValueArr.forEach((val) => {
                var _a;
                const firstChild = document.querySelector(`vastate-each[state="${this.name}"] > *, [vastate-each][state="${this.name}"] > *`);
                const template = firstChild === null || firstChild === void 0 ? void 0 : firstChild.cloneNode(true);
                template.removeAttribute('hidden');
                if (template.tagName.toLocaleLowerCase() == "vastate-print" || template.hasAttribute('vastate-print')) {
                    template.innerHTML = (_a = template.innerHTML) === null || _a === void 0 ? void 0 : _a.split(this.placeholder).join(this.getVastatePrintValue(template, val));
                }
                else {
                    template === null || template === void 0 ? void 0 : template.querySelectorAll('vastate-print, [vastate-print]').forEach((pr) => {
                        var _a;
                        pr.removeAttribute('hidden');
                        pr.innerHTML = (_a = pr.innerHTML) === null || _a === void 0 ? void 0 : _a.split(this.placeholder).join(this.getVastatePrintValue(pr, val));
                    });
                }
                vastateEach.appendChild(template);
            });
        });
    }
    reloadVastateGroups() {
        const groups = document.querySelectorAll(`vastate-print-group[state="${this.name}"], [vastate-print-group][state="${this.name}"]`);
        groups.forEach((group) => this.reloadVastatePrints(group));
    }
    /**
     * Gets the value that will be printed in Vastate print
     *
     * @param vastatePrint
     * @param value
     * @private
     */
    getVastatePrintValue(vastatePrint, value = this.get()) {
        var _a;
        if (typeof value === "object" && !vastatePrint.hasAttribute('obj')) {
            Vastate.throwError('You are trying to print an object without passing obj attribute in vastate print', vastatePrint);
        }
        // @ts-ignore
        return typeof value === "object" && Object.keys(value).length > 0 ? value[(_a = vastatePrint.getAttribute('obj').toString()) !== null && _a !== void 0 ? _a : Object.keys(this.get())[0]] : value;
    }
    static throwError(error, element) {
        document.body.style.background = "hsla(0,0%,90%,1)";
        document.body.style.color = "hsla(0,0%,10%,.9)";
        document.body.style.fontFamily = "arial";
        document.body.innerHTML = `
                <h1>Vastate JS Error</h1>
                <strong>${error}</strong>
                <br>
                ${element ? `
                <strong>Helpful Info:</strong>
                <br>
                <br>
                <pre  style="  background: #262626; color:white;
  font-weight: bold;
  padding: 1rem;
  border-radius: 6px;">
                <code>${element.outerHTML.split('<').join('&lt;').split('>').join('&gt;')}</code>
                </pre>` : ``}            
`;
        throw new TypeError(`Vastate JS Error: ${error}`);
    }
    resetVastateEach(vastateEach) {
        // remove preloader from the page
        vastateEach.innerHTML = vastateEach.innerHTML.split(this.loadingTemplate).join('');
        // remove all children except first one
        vastateEach.querySelectorAll(':scope > *').forEach((e, i) => i !== 0 ? e.remove() : void 0);
    }
    /**
     * Set loading template for specific state
     *
     * @param template
     * @return this
     */
    setLoadingTemplate(template) {
        this.loadingTemplate = template;
        return this;
    }
    /**
     * change current save mode
     *
     * @param saveMode
     * @return this
     */
    setSaveMode(saveMode) {
        this.saveMode = saveMode;
        return this;
    }
    /**
     * get current save mode
     *
     * @return saveMode
     */
    getSaveMode() {
        return this.saveMode;
    }
    /**
     * save current state to localStorage/sessionStorage
     *
     * @return this
     */
    save() {
        const value = typeof this.get() == 'object' || Array.isArray(this.get()) ? JSON.stringify(this.get()) : this.get().toString();
        switch (this.getSaveMode()) {
            case "localStorage":
                localStorage.setItem(this.name, value);
                break;
            case "sessionStorage":
                sessionStorage.setItem(this.name, value);
                break;
            default:
                Vastate.throwError('Unsupported save mode: ' + this.getSaveMode());
                break;
        }
        return this;
    }
    /**
     * restore the state from localStorage/sessionStorage
     *
     * @return this
     */
    restore() {
        switch (this.getSaveMode()) {
            case "localStorage":
                if (localStorage.getItem(this.name))
                    this.set(JSON.parse(localStorage.getItem(this.name)));
                break;
            case "sessionStorage":
                if (sessionStorage.getItem(this.name))
                    this.set(JSON.parse(sessionStorage.getItem(this.name)));
                break;
            default:
                Vastate.throwError('Unsupported save mode: ' + this.getSaveMode());
                break;
        }
        return this;
    }
}
/**
 * Global Loading Template
 *
 * @private
 */
Vastate.loadingTemplate = '';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vastate);

window.Vastate = __webpack_exports__["default"];
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFdBQVcsRUFBRSxDQUFFO2dCQUNwRSxNQUFLO1NBQ1o7UUFDRCxPQUFPLElBQUk7SUFDZixDQUFDOztBQTFVRDs7OztHQUlHO0FBQ1ksdUJBQWUsR0FBVyxFQUFFO0FBdVUvQyxpRUFBZSxPQUFPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vVmFzdGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9WYXN0YXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9WYXN0YXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vVmFzdGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1Zhc3RhdGUvLi9zcmMvdmFzdGF0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBOYW1lOiBWYXN0YXRlLmpzXHJcbiAqIFZlcnNpb246IDEuMy4wXHJcbiAqIExpY2Vuc2U6IE1JVFxyXG4gKi9cclxudHlwZSB2YXN0YXRlVmFsdWUgPSBzdHJpbmcgfCBudW1iZXIgfCBhbnlbXSB8IGJvb2xlYW4gfCBudWxsXHJcbnR5cGUgc2F2ZU1vZGUgPSAnbG9jYWxTdG9yYWdlJyB8ICdzZXNzaW9uU3RvcmFnZSdcclxuXHJcbmNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxyXG5zdHlsZS5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgW3Zhc3RhdGUtbG9hZGVyXSAqW3Zhc3RhdGUtcHJpbnRdLCBcclxuICAgICAgICBbdmFzdGF0ZS1sb2FkZXJdIHZhc3RhdGUtcHJpbnQsIFxyXG4gICAgICAgIFt2YXN0YXRlLWxvYWRlcl0gKlt2YXN0YXRlLXByaW50LWdyb3VwXSwgXHJcbiAgICAgICAgW3Zhc3RhdGUtbG9hZGVyXSB2YXN0YXRlLXByaW50LWdyb3VwLCBcclxuICAgICAgICBbdmFzdGF0ZS1sb2FkZXJdICpbdmFzdGF0ZS1lYWNoXSwgXHJcbiAgICAgICAgW3Zhc3RhdGUtbG9hZGVyXSB2YXN0YXRlLWVhY2gge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgYFxyXG5kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKVxyXG5cclxuY2xhc3MgVmFzdGF0ZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGF0ZSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdmFsdWU6IHZhc3RhdGVWYWx1ZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGxhY2Vob2xkZXIgdGhhdCB3aWxsIGJlIHJlcGxhY2VkIHdpdGhcclxuICAgICAqIFN0YXRlIHZhbHVlIHdoZW4gc2hvd2VkIGluIEhUTUxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBsYWNlaG9sZGVyOiBhbnkgPSAneyNWQUxVRSN9J1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhdGUgcHJldmlvdXNWYWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcHJldmlvdXNWYWx1ZTogdmFzdGF0ZVZhbHVlID0gdGhpcy5wbGFjZWhvbGRlclxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhdGUgTmFtZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbmFtZTogc3RyaW5nXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkaW5nIHN0YXR1c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNMb2FkaW5nOiBib29sZWFuID0gZmFsc2VcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdsb2JhbCBMb2FkaW5nIFRlbXBsYXRlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbG9hZGluZ1RlbXBsYXRlOiBzdHJpbmcgPSAnJ1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZGluZyB0ZW1wbGF0ZSBmb3Igc3BlY2lmaWMgc3RhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGxvYWRpbmdUZW1wbGF0ZTogc3RyaW5nID0gVmFzdGF0ZS5sb2FkaW5nVGVtcGxhdGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBldmVudHMgd2lsbCBiZSB1c2VkIHdoZW4gY3JlYXRlZCBhIG5ldyBldmVudFxyXG4gICAgICogdXNpbmcgb24gbWV0aG9kIG9yIHRyaWdnZXJpbmcgYW4gZXhpc3RpbmcgZXZlbnQgdXNpbmcgdHJpZ2dlciBtZXRob2RcclxuICAgICAqIHRoZXJlIGlzIGEgZGVmYXVsdCBldmVudCB3aGljaCBpcyBjaGFuZ2UgdGhhdCB3aWxsIHJlbG9hZCB0aGUgZG9tXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBldmVudHM6IHtba2V5OiBzdHJpbmddOiBDYWxsYWJsZUZ1bmN0aW9ufSA9IHtcclxuICAgICAgICBcImNoYW5nZVwiOiAoKSA9PiB7fVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2F2ZSBtb2RlIGlzIHVzZWQgdG8gc2VlIHdoZXJlIHRvIHNhdmUgdGhlIHN0YXRlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzYXZlTW9kZTogc2F2ZU1vZGUgPSAnbG9jYWxTdG9yYWdlJztcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGdyb3VwZWRWYXN0YXRlUHJpbnRzU2VsZWN0b3I6IHN0cmluZyA9IGB2YXN0YXRlLXByaW50Om5vdCh2YXN0YXRlLXByaW50W3N0YXRlXSksIFt2YXN0YXRlLXByaW50XTpub3QoW3Zhc3RhdGUtcHJpbnRdW3N0YXRlXSlgO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdmFzdGF0ZVByaW50c1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbml0aWFsaXplIG5ldyBzdGF0ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBuYW1lXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoIG5hbWU6IHN0cmluZywgdmFsdWU6IHZhc3RhdGVWYWx1ZSApIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWVcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICAgICAgdGhpcy52YXN0YXRlUHJpbnRzU2VsZWN0b3IgPSBgdmFzdGF0ZS1wcmludFtzdGF0ZT1cIiR7IHRoaXMubmFtZSB9XCJdLCBbdmFzdGF0ZS1wcmludF1bc3RhdGU9XCIkeyB0aGlzLm5hbWUgfVwiXTpub3QoW3Zhc3RhdGUtZ3JvdXBdKWBcclxuICAgICAgICB0aGlzLnJlbG9hZERvbSgpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgdmFzdGF0ZS1sb2FkZXIgYXR0cmlidXRlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBtb3VudCgpIHtcclxuICAgICAgICBzdHlsZS5yZW1vdmUoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGxvYWRpbmcgc3RhdHVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxvYWRpbmdcclxuICAgICAqIEByZXR1cm4gdGhpc1xyXG4gICAgICovXHJcbiAgICBzZXRMb2FkaW5nKCBsb2FkaW5nOiBib29sZWFuICk6IHRoaXMge1xyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gbG9hZGluZ1xyXG4gICAgICAgIHRoaXMucmVsb2FkRG9tKClcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IEdsb2JhbCBsb2FkaW5nIHRlbXBsYXRlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxvYWRpbmdUZW1wbGF0ZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2V0TG9hZGluZ1RlbXBsYXRlKCBsb2FkaW5nVGVtcGxhdGU6IHN0cmluZyApIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmdUZW1wbGF0ZSA9IGxvYWRpbmdUZW1wbGF0ZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGN1cnJlbnQgc3RhdGUgdmFsdWVcclxuICAgICAqL1xyXG4gICAgZ2V0KCk6IHZhc3RhdGVWYWx1ZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCBwcmV2aW91cyBzdGF0ZSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgZ2V0UHJldmlvdXNWYWx1ZSgpOiB2YXN0YXRlVmFsdWUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByZXZpb3VzVmFsdWVcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHN0YXRlIHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIHRoaXNcclxuICAgICAqL1xyXG4gICAgc2V0KCB2YWx1ZTogdmFzdGF0ZVZhbHVlICk6IHRoaXMge1xyXG4gICAgICAgIGlmICggdGhpcy52YWx1ZSAhPSB0aGlzLnByZXZpb3VzVmFsdWUgKVxyXG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzVmFsdWUgPSB0aGlzLnZhbHVlXHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlXHJcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdjaGFuZ2UnKVxyXG4gICAgICAgIHRoaXMucmVsb2FkRG9tKClcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IGV2ZW50IHRoYXQgY2FuIGJlIHRyaWdnZXJlZFxyXG4gICAgICogdXNpbmcgdHJpZ2dlciBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xyXG4gICAgICovXHJcbiAgICBvbihldmVudDogc3RyaW5nLCBjYWxsYmFjazogQ2FsbGFibGVGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XSA9IGNhbGxiYWNrXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmlnZ2VyIGEgZXZlbnQgdGhhdCBpcyBjcmVhdGVkIHVzaW5nIG9uIG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudFxyXG4gICAgICogQHBhcmFtIHBhcmFtc1xyXG4gICAgICovXHJcbiAgICB0cmlnZ2VyKGV2ZW50OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pIHtcclxuICAgICAgICBpZiAodGhpcy5ldmVudHNbZXZlbnRdKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdKC4uLnBhcmFtcylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBWYXN0YXRlLnRocm93RXJyb3IoYFVuZGVmaW5lZCBldmVudCAnJHtldmVudH0nLiBEaWQgeW91IGNyZWF0ZWQgdGhlIGV2ZW50IHVzaW5nICdvbicgbWV0aG9kP2ApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVsb2FkIHRoZSBET00gd2hlbiB2YWx1ZSBvciBsb2FkaW5nIHN0YXRlIGlzIGNoYW5nZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbG9hZERvbSgpIHtcclxuICAgICAgICB0aGlzLnJlbG9hZFZhc3RhdGVFYWNocygpXHJcbiAgICAgICAgdGhpcy5yZWxvYWRWYXN0YXRlUHJpbnRzKClcclxuICAgICAgICB0aGlzLnJlbG9hZFZhc3RhdGVHcm91cHMoKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbG9hZCBhbGwgdmFzdGF0ZS1wcmludCB0YWdzL2F0dHJpYnV0ZVxyXG4gICAgICogaW4gdGhlIERPTVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVsb2FkVmFzdGF0ZVByaW50cyggcGFyZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmJvZHkgKSB7XHJcbiAgICAgICAgY29uc3QgdmFzdGF0ZVByaW50cyA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCBwYXJlbnQuaGFzQXR0cmlidXRlKCAndmFzdGF0ZS1wcmludC1ncm91cCcgKSB8fCBwYXJlbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09IFwidmFzdGF0ZS1wcmludC1ncm91cFwiID8gdGhpcy5ncm91cGVkVmFzdGF0ZVByaW50c1NlbGVjdG9yIDogdGhpcy52YXN0YXRlUHJpbnRzU2VsZWN0b3IgKVxyXG4gICAgICAgIHZhc3RhdGVQcmludHMuZm9yRWFjaCggKCB2YXN0YXRlUHJpbnQ6IEhUTUxFbGVtZW50ICkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIHRoaXMuaXNMb2FkaW5nICkge1xyXG4gICAgICAgICAgICAgICAgdmFzdGF0ZVByaW50LmlubmVySFRNTCArPSB0aGlzLmxvYWRpbmdUZW1wbGF0ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVUb0JlUHJpbnRlZCA9IHZhc3RhdGVQcmludC5oYXNBdHRyaWJ1dGUoJ29iaicpICYmIHR5cGVvZiB0aGlzLnByZXZpb3VzVmFsdWUgPT09ICdvYmplY3QnID8gdGhpcy5wcmV2aW91c1ZhbHVlW3Zhc3RhdGVQcmludC5nZXRBdHRyaWJ1dGUoJ29iaicpXS50b1N0cmluZygpIDogdGhpcy5wcmV2aW91c1ZhbHVlLnRvU3RyaW5nKClcclxuXHJcbiAgICAgICAgICAgICAgICB2YXN0YXRlUHJpbnQuaW5uZXJIVE1MID0gdmFzdGF0ZVByaW50LmlubmVySFRNTC5zcGxpdCggdGhpcy5sb2FkaW5nVGVtcGxhdGUgKS5qb2luKCAnJyApXHJcbiAgICAgICAgICAgICAgICBpZiAoIHZhc3RhdGVQcmludC5oYXNBdHRyaWJ1dGUoICdodG1sJyApICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhc3RhdGVQcmludC5pbm5lckhUTUwgPSB2YXN0YXRlUHJpbnQuaW5uZXJIVE1MLnNwbGl0KCB2YWx1ZVRvQmVQcmludGVkICkuam9pbiggdGhpcy5nZXRWYXN0YXRlUHJpbnRWYWx1ZSggdmFzdGF0ZVByaW50ICkgKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXN0YXRlUHJpbnQudGV4dENvbnRlbnQgPSB2YXN0YXRlUHJpbnQudGV4dENvbnRlbnQuc3BsaXQoIHZhbHVlVG9CZVByaW50ZWQgKS5qb2luKCB0aGlzLmdldFZhc3RhdGVQcmludFZhbHVlKCB2YXN0YXRlUHJpbnQgKSApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbG9hZCBhbGwgdmFzdGF0ZS1lYWNoIHRhZ3MvYXR0cmlidXRlXHJcbiAgICAgKiBpbiB0aGUgRE9NXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWxvYWRWYXN0YXRlRWFjaHMoIHBhcmVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5ib2R5ICkge1xyXG4gICAgICAgIGNvbnN0IHZhc3RhdGVFYWNocyA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCBgdmFzdGF0ZS1lYWNoW3N0YXRlPVwiJHsgdGhpcy5uYW1lIH1cIl0sIFt2YXN0YXRlLWVhY2hdW3N0YXRlPVwiJHsgdGhpcy5uYW1lIH1cIl1gIClcclxuICAgICAgICB2YXN0YXRlRWFjaHMuZm9yRWFjaCggKCB2YXN0YXRlRWFjaDogSFRNTEVsZW1lbnQgKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRWYXN0YXRlRWFjaCggdmFzdGF0ZUVhY2ggKVxyXG4gICAgICAgICAgICBjb25zdCBzdGF0ZVZhbHVlQXJyOiBhbnkgPSBBcnJheS5pc0FycmF5KCB0aGlzLmdldCgpICkgPyB0aGlzLmdldCgpIDogW11cclxuXHJcbiAgICAgICAgICAgIGlmICggc3RhdGVWYWx1ZUFyci5sZW5ndGggPCAxICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCAhIHRoaXMuaXNMb2FkaW5nICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRWYXN0YXRlRWFjaCggdmFzdGF0ZUVhY2ggKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFzdGF0ZUVhY2guaW5uZXJIVE1MICs9IHRoaXMubG9hZGluZ1RlbXBsYXRlXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdGF0ZVZhbHVlQXJyPy5mb3JFYWNoKCAoIHZhbDogYW55ICkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3RDaGlsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIGB2YXN0YXRlLWVhY2hbc3RhdGU9XCIkeyB0aGlzLm5hbWUgfVwiXSA+ICosIFt2YXN0YXRlLWVhY2hdW3N0YXRlPVwiJHsgdGhpcy5uYW1lIH1cIl0gPiAqYCApXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZTogYW55ID0gZmlyc3RDaGlsZD8uY2xvbmVOb2RlKCB0cnVlIClcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlLnJlbW92ZUF0dHJpYnV0ZSggJ2hpZGRlbicgKVxyXG4gICAgICAgICAgICAgICAgaWYgKCB0ZW1wbGF0ZS50YWdOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT0gXCJ2YXN0YXRlLXByaW50XCIgfHwgdGVtcGxhdGUuaGFzQXR0cmlidXRlKCAndmFzdGF0ZS1wcmludCcgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZS5pbm5lckhUTUw/LnNwbGl0KCB0aGlzLnBsYWNlaG9sZGVyICkuam9pbiggdGhpcy5nZXRWYXN0YXRlUHJpbnRWYWx1ZSggdGVtcGxhdGUsIHZhbCApIClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU/LnF1ZXJ5U2VsZWN0b3JBbGwoICd2YXN0YXRlLXByaW50LCBbdmFzdGF0ZS1wcmludF0nICkuZm9yRWFjaCggKCBwcjogSFRNTEVsZW1lbnQgKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByLnJlbW92ZUF0dHJpYnV0ZSggJ2hpZGRlbicgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwci5pbm5lckhUTUwgPSBwci5pbm5lckhUTUw/LnNwbGl0KCB0aGlzLnBsYWNlaG9sZGVyICkuam9pbiggdGhpcy5nZXRWYXN0YXRlUHJpbnRWYWx1ZSggcHIsIHZhbCApIClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXN0YXRlRWFjaC5hcHBlbmRDaGlsZCggdGVtcGxhdGUgKVxyXG4gICAgICAgICAgICB9IClcclxuICAgICAgICB9IClcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbG9hZFZhc3RhdGVHcm91cHMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oIGB2YXN0YXRlLXByaW50LWdyb3VwW3N0YXRlPVwiJHsgdGhpcy5uYW1lIH1cIl0sIFt2YXN0YXRlLXByaW50LWdyb3VwXVtzdGF0ZT1cIiR7IHRoaXMubmFtZSB9XCJdYCApXHJcbiAgICAgICAgZ3JvdXBzLmZvckVhY2goICggZ3JvdXA6IEhUTUxFbGVtZW50ICkgPT4gdGhpcy5yZWxvYWRWYXN0YXRlUHJpbnRzKCBncm91cCApIClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHZhbHVlIHRoYXQgd2lsbCBiZSBwcmludGVkIGluIFZhc3RhdGUgcHJpbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdmFzdGF0ZVByaW50XHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VmFzdGF0ZVByaW50VmFsdWUoIHZhc3RhdGVQcmludDogSFRNTEVsZW1lbnQsIHZhbHVlID0gdGhpcy5nZXQoKSApIHtcclxuXHJcbiAgICAgICAgaWYgKCB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgISB2YXN0YXRlUHJpbnQuaGFzQXR0cmlidXRlKCAnb2JqJyApICkge1xyXG5cclxuICAgICAgICAgICAgVmFzdGF0ZS50aHJvd0Vycm9yKCAnWW91IGFyZSB0cnlpbmcgdG8gcHJpbnQgYW4gb2JqZWN0IHdpdGhvdXQgcGFzc2luZyBvYmogYXR0cmlidXRlIGluIHZhc3RhdGUgcHJpbnQnLCB2YXN0YXRlUHJpbnQgKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiBPYmplY3Qua2V5cyggdmFsdWUgKS5sZW5ndGggPiAwID8gdmFsdWVbdmFzdGF0ZVByaW50LmdldEF0dHJpYnV0ZSggJ29iaicgKS50b1N0cmluZygpID8/IE9iamVjdC5rZXlzKCB0aGlzLmdldCgpIClbMF1dIDogdmFsdWVcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyB0aHJvd0Vycm9yKCBlcnJvcjogc3RyaW5nLCBlbGVtZW50PzogSFRNTEVsZW1lbnQgKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJoc2xhKDAsMCUsOTAlLDEpXCJcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmNvbG9yID0gXCJoc2xhKDAsMCUsMTAlLC45KVwiXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5mb250RmFtaWx5ID0gXCJhcmlhbFwiXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8aDE+VmFzdGF0ZSBKUyBFcnJvcjwvaDE+XHJcbiAgICAgICAgICAgICAgICA8c3Ryb25nPiR7IGVycm9yIH08L3N0cm9uZz5cclxuICAgICAgICAgICAgICAgIDxicj5cclxuICAgICAgICAgICAgICAgICR7IGVsZW1lbnQgPyBgXHJcbiAgICAgICAgICAgICAgICA8c3Ryb25nPkhlbHBmdWwgSW5mbzo8L3N0cm9uZz5cclxuICAgICAgICAgICAgICAgIDxicj5cclxuICAgICAgICAgICAgICAgIDxicj5cclxuICAgICAgICAgICAgICAgIDxwcmUgIHN0eWxlPVwiICBiYWNrZ3JvdW5kOiAjMjYyNjI2OyBjb2xvcjp3aGl0ZTtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBwYWRkaW5nOiAxcmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcIj5cclxuICAgICAgICAgICAgICAgIDxjb2RlPiR7IGVsZW1lbnQub3V0ZXJIVE1MLnNwbGl0KCAnPCcgKS5qb2luKCAnJmx0OycgKS5zcGxpdCggJz4nICkuam9pbiggJyZndDsnICkgfTwvY29kZT5cclxuICAgICAgICAgICAgICAgIDwvcHJlPmAgOiBgYCB9ICAgICAgICAgICAgXHJcbmBcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCBgVmFzdGF0ZSBKUyBFcnJvcjogJHsgZXJyb3IgfWAgKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVzZXRWYXN0YXRlRWFjaCggdmFzdGF0ZUVhY2g6IEhUTUxFbGVtZW50ICk6IHZvaWQge1xyXG4gICAgICAgIC8vIHJlbW92ZSBwcmVsb2FkZXIgZnJvbSB0aGUgcGFnZVxyXG4gICAgICAgIHZhc3RhdGVFYWNoLmlubmVySFRNTCA9IHZhc3RhdGVFYWNoLmlubmVySFRNTC5zcGxpdCggdGhpcy5sb2FkaW5nVGVtcGxhdGUgKS5qb2luKCAnJyApXHJcbiAgICAgICAgLy8gcmVtb3ZlIGFsbCBjaGlsZHJlbiBleGNlcHQgZmlyc3Qgb25lXHJcbiAgICAgICAgdmFzdGF0ZUVhY2gucXVlcnlTZWxlY3RvckFsbCggJzpzY29wZSA+IConICkuZm9yRWFjaCggKCBlOiBIVE1MRWxlbWVudCwgaSApID0+IGkgIT09IDAgPyBlLnJlbW92ZSgpIDogdm9pZCAwIClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBsb2FkaW5nIHRlbXBsYXRlIGZvciBzcGVjaWZpYyBzdGF0ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZVxyXG4gICAgICogQHJldHVybiB0aGlzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRMb2FkaW5nVGVtcGxhdGUoIHRlbXBsYXRlOiBzdHJpbmcgKTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nVGVtcGxhdGUgPSB0ZW1wbGF0ZVxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjaGFuZ2UgY3VycmVudCBzYXZlIG1vZGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gc2F2ZU1vZGVcclxuICAgICAqIEByZXR1cm4gdGhpc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U2F2ZU1vZGUoIHNhdmVNb2RlOiBzYXZlTW9kZSApOiB0aGlzIHtcclxuICAgICAgICB0aGlzLnNhdmVNb2RlID0gc2F2ZU1vZGVcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IGN1cnJlbnQgc2F2ZSBtb2RlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBzYXZlTW9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U2F2ZU1vZGUoKTogc2F2ZU1vZGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNhdmVNb2RlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzYXZlIGN1cnJlbnQgc3RhdGUgdG8gbG9jYWxTdG9yYWdlL3Nlc3Npb25TdG9yYWdlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB0aGlzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzYXZlKCk6IHRoaXMge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdHlwZW9mIHRoaXMuZ2V0KCkgPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheSggdGhpcy5nZXQoKSApID8gSlNPTi5zdHJpbmdpZnkoIHRoaXMuZ2V0KCkgKSA6IHRoaXMuZ2V0KCkudG9TdHJpbmcoKTtcclxuICAgICAgICBzd2l0Y2ggKCB0aGlzLmdldFNhdmVNb2RlKCkgKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJsb2NhbFN0b3JhZ2VcIjpcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCB0aGlzLm5hbWUsIHZhbHVlIClcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgXCJzZXNzaW9uU3RvcmFnZVwiOlxyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSggdGhpcy5uYW1lLCB2YWx1ZSApXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgVmFzdGF0ZS50aHJvd0Vycm9yKCAnVW5zdXBwb3J0ZWQgc2F2ZSBtb2RlOiAnICsgdGhpcy5nZXRTYXZlTW9kZSgpIClcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXN0b3JlIHRoZSBzdGF0ZSBmcm9tIGxvY2FsU3RvcmFnZS9zZXNzaW9uU3RvcmFnZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gdGhpc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzdG9yZSgpOiB0aGlzIHtcclxuICAgICAgICBzd2l0Y2ggKCB0aGlzLmdldFNhdmVNb2RlKCkgKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJsb2NhbFN0b3JhZ2VcIjpcclxuICAgICAgICAgICAgICAgIGlmICggbG9jYWxTdG9yYWdlLmdldEl0ZW0oIHRoaXMubmFtZSApIClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldCggSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSggdGhpcy5uYW1lICkpIClcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgXCJzZXNzaW9uU3RvcmFnZVwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKCBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCB0aGlzLm5hbWUgKSApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXQoIEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSggdGhpcy5uYW1lICkpIClcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBWYXN0YXRlLnRocm93RXJyb3IoICdVbnN1cHBvcnRlZCBzYXZlIG1vZGU6ICcgKyB0aGlzLmdldFNhdmVNb2RlKCkgKVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBWYXN0YXRlIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9