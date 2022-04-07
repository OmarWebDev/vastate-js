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
                vastatePrint.innerHTML = vastatePrint.innerHTML.split(this.loadingTemplate).join('');
                if (vastatePrint.hasAttribute('html')) {
                    // @ts-ignore
                    vastatePrint.innerHTML = vastatePrint.innerHTML.split(vastatePrint.hasAttribute('obj') ? this.previousValue[vastatePrint.getAttribute('obj')].toString() : this.previousValue.toString()).join(this.getVastatePrintValue(vastatePrint));
                }
                else {
                    // @ts-ignore
                    vastatePrint.textContent = vastatePrint.textContent.split(vastatePrint.hasAttribute('obj') && typeof this.previousValue === 'object' ? this.previousValue[vastatePrint.getAttribute('obj')].toString() : this.previousValue.toString()).join(this.getVastatePrintValue(vastatePrint));
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
                const firstChild = document.querySelector(`vastate-each[state="${this.name}"], [vastate-each][state="${this.name}"]`).querySelector(':scope > div');
                console.log(firstChild);
                const template = firstChild === null || firstChild === void 0 ? void 0 : firstChild.cloneNode(true);
                // console.log(template)
                // firstChild?.setAttribute( 'hidden', 'true' )
                template.removeAttribute('hidden');
                if (template.tagName.toLocaleLowerCase() == "vastate-print" || template.hasAttribute('vastate-print')) {
                    template.innerHTML = (_a = template.innerHTML) === null || _a === void 0 ? void 0 : _a.split(this.placeholder).join(this.getVastatePrintValue(template, val));
                }
                else {
                    template === null || template === void 0 ? void 0 : template.querySelectorAll('vastate-print, [vastate-print]').forEach((pr) => {
                        var _a;
                        console.log(pr);
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
        var _a;
        // remove preloader from the page
        vastateEach.innerHTML = vastateEach.innerHTML.split(this.loadingTemplate).join('');
        // remove all children except first one
        vastateEach.querySelectorAll(':scope > *').forEach((e, i) => i !== 0 ? e.remove() : void 0);
        console.log((_a = vastateEach.children[0]) === null || _a === void 0 ? void 0 : _a.setAttribute('hidden', ''));
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
window.onload = () => {
    // @ts-ignore
    if (window.Vastate) {
        // @ts-ignore
        // window.Vastate = window.Vastate.default;
    }
};

window.Vastate = __webpack_exports__["default"];
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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b0JBQ3BDLElBQUksQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUUsQ0FBQyxDQUFFO2dCQUMvRCxNQUFLO1lBQ1Q7Z0JBQ0ksT0FBTyxDQUFDLFVBQVUsQ0FBRSx5QkFBeUIsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUU7Z0JBQ3BFLE1BQUs7U0FDWjtRQUNELE9BQU8sSUFBSTtJQUNmLENBQUM7O0FBdFVEOzs7O0dBSUc7QUFDWSx1QkFBZSxHQUFXLEVBQUU7QUFtVS9DLGlFQUFlLE9BQU87QUFDdEIsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7SUFDakIsYUFBYTtJQUNiLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUNoQixhQUFhO1FBQ2IsMkNBQTJDO0tBQzlDO0FBQ0wsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL1Zhc3RhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vVmFzdGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vVmFzdGF0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1Zhc3RhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9WYXN0YXRlLy4vc3JjL3Zhc3RhdGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogTmFtZTogVmFzdGF0ZS5qc1xyXG4gKiBWZXJzaW9uOiAxLjIuMVxyXG4gKiBMaWNlbnNlOiBNSVRcclxuICovXHJcbnR5cGUgdmFzdGF0ZVZhbHVlID0gc3RyaW5nIHwgbnVtYmVyIHwgYW55W10gfCBib29sZWFuIHwgbnVsbFxyXG50eXBlIHNhdmVNb2RlID0gJ2xvY2FsU3RvcmFnZScgfCAnc2Vzc2lvblN0b3JhZ2UnXHJcblxyXG5jbGFzcyBWYXN0YXRlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXRlIHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB2YWx1ZTogdmFzdGF0ZVZhbHVlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQbGFjZWhvbGRlciB0aGF0IHdpbGwgYmUgcmVwbGFjZWQgd2l0aFxyXG4gICAgICogU3RhdGUgdmFsdWUgd2hlbiBzaG93ZWQgaW4gSFRNTFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgcGxhY2Vob2xkZXI6IGFueSA9ICd7I1ZBTFVFI30nXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGF0ZSBwcmV2aW91c1ZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwcmV2aW91c1ZhbHVlOiB2YXN0YXRlVmFsdWUgPSB0aGlzLnBsYWNlaG9sZGVyXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGF0ZSBOYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBuYW1lOiBzdHJpbmdcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRpbmcgc3RhdHVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc0xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2xvYmFsIExvYWRpbmcgVGVtcGxhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBsb2FkaW5nVGVtcGxhdGU6IHN0cmluZyA9ICcnXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkaW5nIHRlbXBsYXRlIGZvciBzcGVjaWZpYyBzdGF0ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbG9hZGluZ1RlbXBsYXRlOiBzdHJpbmcgPSBWYXN0YXRlLmxvYWRpbmdUZW1wbGF0ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGV2ZW50cyB3aWxsIGJlIHVzZWQgd2hlbiBjcmVhdGVkIGEgbmV3IGV2ZW50XHJcbiAgICAgKiB1c2luZyBvbiBtZXRob2Qgb3IgdHJpZ2dlcmluZyBhbiBleGlzdGluZyBldmVudCB1c2luZyB0cmlnZ2VyIG1ldGhvZFxyXG4gICAgICogdGhlcmUgaXMgYSBkZWZhdWx0IGV2ZW50IHdoaWNoIGlzIGNoYW5nZSB0aGF0IHdpbGwgcmVsb2FkIHRoZSBkb21cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGV2ZW50czoge1trZXk6IHN0cmluZ106IENhbGxhYmxlRnVuY3Rpb259ID0ge1xyXG4gICAgICAgIFwiY2hhbmdlXCI6ICgpID0+IHt9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTYXZlIG1vZGUgaXMgdXNlZCB0byBzZWUgd2hlcmUgdG8gc2F2ZSB0aGUgc3RhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNhdmVNb2RlOiBzYXZlTW9kZSA9ICdsb2NhbFN0b3JhZ2UnO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZ3JvdXBlZFZhc3RhdGVQcmludHNTZWxlY3Rvcjogc3RyaW5nID0gYHZhc3RhdGUtcHJpbnQ6bm90KHZhc3RhdGUtcHJpbnRbc3RhdGVdKSwgW3Zhc3RhdGUtcHJpbnRdOm5vdChbdmFzdGF0ZS1wcmludF1bc3RhdGVdKWA7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSB2YXN0YXRlUHJpbnRzU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIGluaXRpYWxpemUgbmV3IHN0YXRlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG5hbWVcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvciggbmFtZTogc3RyaW5nLCB2YWx1ZTogdmFzdGF0ZVZhbHVlICkge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcclxuICAgICAgICB0aGlzLnZhc3RhdGVQcmludHNTZWxlY3RvciA9IGB2YXN0YXRlLXByaW50W3N0YXRlPVwiJHsgdGhpcy5uYW1lIH1cIl0sIFt2YXN0YXRlLXByaW50XVtzdGF0ZT1cIiR7IHRoaXMubmFtZSB9XCJdOm5vdChbdmFzdGF0ZS1ncm91cF0pYFxyXG4gICAgICAgIHRoaXMucmVsb2FkRG9tKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBsb2FkaW5nIHN0YXR1c1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsb2FkaW5nXHJcbiAgICAgKiBAcmV0dXJuIHRoaXNcclxuICAgICAqL1xyXG4gICAgc2V0TG9hZGluZyggbG9hZGluZzogYm9vbGVhbiApOiB0aGlzIHtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGxvYWRpbmdcclxuICAgICAgICB0aGlzLnJlbG9hZERvbSgpXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBHbG9iYWwgbG9hZGluZyB0ZW1wbGF0ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsb2FkaW5nVGVtcGxhdGVcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNldExvYWRpbmdUZW1wbGF0ZSggbG9hZGluZ1RlbXBsYXRlOiBzdHJpbmcgKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nVGVtcGxhdGUgPSBsb2FkaW5nVGVtcGxhdGVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBjdXJyZW50IHN0YXRlIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIGdldCgpOiB2YXN0YXRlVmFsdWUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgcHJldmlvdXMgc3RhdGUgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGdldFByZXZpb3VzVmFsdWUoKTogdmFzdGF0ZVZhbHVlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcmV2aW91c1ZhbHVlXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFNldCBzdGF0ZSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiB0aGlzXHJcbiAgICAgKi9cclxuICAgIHNldCggdmFsdWU6IHZhc3RhdGVWYWx1ZSApOiB0aGlzIHtcclxuICAgICAgICBpZiAoIHRoaXMudmFsdWUgIT0gdGhpcy5wcmV2aW91c1ZhbHVlIClcclxuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1ZhbHVlID0gdGhpcy52YWx1ZVxyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxyXG4gICAgICAgIHRoaXMudHJpZ2dlcignY2hhbmdlJylcclxuICAgICAgICB0aGlzLnJlbG9hZERvbSgpXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBldmVudCB0aGF0IGNhbiBiZSB0cmlnZ2VyZWRcclxuICAgICAqIHVzaW5nIHRyaWdnZXIgbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV2ZW50XHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcclxuICAgICAqL1xyXG4gICAgb24oZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IENhbGxhYmxlRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0gPSBjYWxsYmFja1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJpZ2dlciBhIGV2ZW50IHRoYXQgaXMgY3JlYXRlZCB1c2luZyBvbiBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqIEBwYXJhbSBwYXJhbXNcclxuICAgICAqL1xyXG4gICAgdHJpZ2dlcihldmVudDogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50XSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XSguLi5wYXJhbXMpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgVmFzdGF0ZS50aHJvd0Vycm9yKGBVbmRlZmluZWQgZXZlbnQgJyR7ZXZlbnR9Jy4gRGlkIHlvdSBjcmVhdGVkIHRoZSBldmVudCB1c2luZyAnb24nIG1ldGhvZD9gKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbG9hZCB0aGUgRE9NIHdoZW4gdmFsdWUgb3IgbG9hZGluZyBzdGF0ZSBpcyBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWxvYWREb20oKSB7XHJcbiAgICAgICAgdGhpcy5yZWxvYWRWYXN0YXRlRWFjaHMoKVxyXG4gICAgICAgIHRoaXMucmVsb2FkVmFzdGF0ZVByaW50cygpXHJcbiAgICAgICAgdGhpcy5yZWxvYWRWYXN0YXRlR3JvdXBzKClcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWxvYWQgYWxsIHZhc3RhdGUtcHJpbnQgdGFncy9hdHRyaWJ1dGVcclxuICAgICAqIGluIHRoZSBET01cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbG9hZFZhc3RhdGVQcmludHMoIHBhcmVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5ib2R5ICkge1xyXG4gICAgICAgIGNvbnN0IHZhc3RhdGVQcmludHMgPSBwYXJlbnQucXVlcnlTZWxlY3RvckFsbCggcGFyZW50Lmhhc0F0dHJpYnV0ZSggJ3Zhc3RhdGUtcHJpbnQtZ3JvdXAnICkgfHwgcGFyZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSBcInZhc3RhdGUtcHJpbnQtZ3JvdXBcIiA/IHRoaXMuZ3JvdXBlZFZhc3RhdGVQcmludHNTZWxlY3RvciA6IHRoaXMudmFzdGF0ZVByaW50c1NlbGVjdG9yIClcclxuICAgICAgICB2YXN0YXRlUHJpbnRzLmZvckVhY2goICggdmFzdGF0ZVByaW50OiBIVE1MRWxlbWVudCApID0+IHtcclxuICAgICAgICAgICAgaWYgKCB0aGlzLmlzTG9hZGluZyApIHtcclxuICAgICAgICAgICAgICAgIHZhc3RhdGVQcmludC5pbm5lckhUTUwgKz0gdGhpcy5sb2FkaW5nVGVtcGxhdGVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhc3RhdGVQcmludC5pbm5lckhUTUwgPSB2YXN0YXRlUHJpbnQuaW5uZXJIVE1MLnNwbGl0KCB0aGlzLmxvYWRpbmdUZW1wbGF0ZSApLmpvaW4oICcnIClcclxuICAgICAgICAgICAgICAgIGlmICggdmFzdGF0ZVByaW50Lmhhc0F0dHJpYnV0ZSggJ2h0bWwnICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIHZhc3RhdGVQcmludC5pbm5lckhUTUwgPSB2YXN0YXRlUHJpbnQuaW5uZXJIVE1MLnNwbGl0KCB2YXN0YXRlUHJpbnQuaGFzQXR0cmlidXRlKCdvYmonKSA/IHRoaXMucHJldmlvdXNWYWx1ZVt2YXN0YXRlUHJpbnQuZ2V0QXR0cmlidXRlKCdvYmonKV0udG9TdHJpbmcoKSA6IHRoaXMucHJldmlvdXNWYWx1ZS50b1N0cmluZygpICkuam9pbiggdGhpcy5nZXRWYXN0YXRlUHJpbnRWYWx1ZSggdmFzdGF0ZVByaW50ICkgKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgdmFzdGF0ZVByaW50LnRleHRDb250ZW50ID0gdmFzdGF0ZVByaW50LnRleHRDb250ZW50LnNwbGl0KCB2YXN0YXRlUHJpbnQuaGFzQXR0cmlidXRlKCdvYmonKSAmJiB0eXBlb2YgdGhpcy5wcmV2aW91c1ZhbHVlID09PSAnb2JqZWN0JyA/IHRoaXMucHJldmlvdXNWYWx1ZVt2YXN0YXRlUHJpbnQuZ2V0QXR0cmlidXRlKCdvYmonKV0udG9TdHJpbmcoKSA6IHRoaXMucHJldmlvdXNWYWx1ZS50b1N0cmluZygpICkuam9pbiggdGhpcy5nZXRWYXN0YXRlUHJpbnRWYWx1ZSggdmFzdGF0ZVByaW50ICkgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSApXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWxvYWQgYWxsIHZhc3RhdGUtZWFjaCB0YWdzL2F0dHJpYnV0ZVxyXG4gICAgICogaW4gdGhlIERPTVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVsb2FkVmFzdGF0ZUVhY2hzKCBwYXJlbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuYm9keSApIHtcclxuICAgICAgICBjb25zdCB2YXN0YXRlRWFjaHMgPSBwYXJlbnQucXVlcnlTZWxlY3RvckFsbCggYHZhc3RhdGUtZWFjaFtzdGF0ZT1cIiR7IHRoaXMubmFtZSB9XCJdLCBbdmFzdGF0ZS1lYWNoXVtzdGF0ZT1cIiR7IHRoaXMubmFtZSB9XCJdYCApXHJcbiAgICAgICAgdmFzdGF0ZUVhY2hzLmZvckVhY2goICggdmFzdGF0ZUVhY2g6IEhUTUxFbGVtZW50ICkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0VmFzdGF0ZUVhY2goIHZhc3RhdGVFYWNoIClcclxuICAgICAgICAgICAgY29uc3Qgc3RhdGVWYWx1ZUFycjogYW55ID0gQXJyYXkuaXNBcnJheSggdGhpcy5nZXQoKSApID8gdGhpcy5nZXQoKSA6IFtdXHJcblxyXG4gICAgICAgICAgICBpZiAoIHN0YXRlVmFsdWVBcnIubGVuZ3RoIDwgMSApIHtcclxuICAgICAgICAgICAgICAgIGlmICggISB0aGlzLmlzTG9hZGluZyApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0VmFzdGF0ZUVhY2goIHZhc3RhdGVFYWNoIClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhc3RhdGVFYWNoLmlubmVySFRNTCArPSB0aGlzLmxvYWRpbmdUZW1wbGF0ZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RhdGVWYWx1ZUFycj8uZm9yRWFjaCggKCB2YWw6IGFueSApID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0Q2hpbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBgdmFzdGF0ZS1lYWNoW3N0YXRlPVwiJHsgdGhpcy5uYW1lIH1cIl0sIFt2YXN0YXRlLWVhY2hdW3N0YXRlPVwiJHsgdGhpcy5uYW1lIH1cIl1gICkucXVlcnlTZWxlY3RvcignOnNjb3BlID4gZGl2JylcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBmaXJzdENoaWxkICk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZTogYW55ID0gZmlyc3RDaGlsZD8uY2xvbmVOb2RlKCB0cnVlIClcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRlbXBsYXRlKVxyXG4gICAgICAgICAgICAgICAgLy8gZmlyc3RDaGlsZD8uc2V0QXR0cmlidXRlKCAnaGlkZGVuJywgJ3RydWUnIClcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlLnJlbW92ZUF0dHJpYnV0ZSggJ2hpZGRlbicgKVxyXG4gICAgICAgICAgICAgICAgaWYgKCB0ZW1wbGF0ZS50YWdOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT0gXCJ2YXN0YXRlLXByaW50XCIgfHwgdGVtcGxhdGUuaGFzQXR0cmlidXRlKCAndmFzdGF0ZS1wcmludCcgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZS5pbm5lckhUTUw/LnNwbGl0KCB0aGlzLnBsYWNlaG9sZGVyICkuam9pbiggdGhpcy5nZXRWYXN0YXRlUHJpbnRWYWx1ZSggdGVtcGxhdGUsIHZhbCApIClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU/LnF1ZXJ5U2VsZWN0b3JBbGwoICd2YXN0YXRlLXByaW50LCBbdmFzdGF0ZS1wcmludF0nICkuZm9yRWFjaCggKCBwcjogSFRNTEVsZW1lbnQgKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHByKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwci5yZW1vdmVBdHRyaWJ1dGUoICdoaWRkZW4nIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHIuaW5uZXJIVE1MID0gcHIuaW5uZXJIVE1MPy5zcGxpdCggdGhpcy5wbGFjZWhvbGRlciApLmpvaW4oIHRoaXMuZ2V0VmFzdGF0ZVByaW50VmFsdWUoIHByLCB2YWwgKSApXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFzdGF0ZUVhY2guYXBwZW5kQ2hpbGQoIHRlbXBsYXRlIClcclxuICAgICAgICAgICAgfSApXHJcbiAgICAgICAgfSApXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWxvYWRWYXN0YXRlR3JvdXBzKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KCBgdmFzdGF0ZS1wcmludC1ncm91cFtzdGF0ZT1cIiR7IHRoaXMubmFtZSB9XCJdLCBbdmFzdGF0ZS1wcmludC1ncm91cF1bc3RhdGU9XCIkeyB0aGlzLm5hbWUgfVwiXWAgKVxyXG4gICAgICAgIGdyb3Vwcy5mb3JFYWNoKCAoIGdyb3VwOiBIVE1MRWxlbWVudCApID0+IHRoaXMucmVsb2FkVmFzdGF0ZVByaW50cyggZ3JvdXAgKSApXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB2YWx1ZSB0aGF0IHdpbGwgYmUgcHJpbnRlZCBpbiBWYXN0YXRlIHByaW50XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHZhc3RhdGVQcmludFxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFZhc3RhdGVQcmludFZhbHVlKCB2YXN0YXRlUHJpbnQ6IEhUTUxFbGVtZW50LCB2YWx1ZSA9IHRoaXMuZ2V0KCkgKSB7XHJcbiAgICAgICAgaWYgKCB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgISB2YXN0YXRlUHJpbnQuaGFzQXR0cmlidXRlKCAnb2JqJyApICkge1xyXG5cclxuICAgICAgICAgICAgVmFzdGF0ZS50aHJvd0Vycm9yKCAnWW91IGFyZSB0cnlpbmcgdG8gcHJpbnQgYW4gb2JqZWN0IHdpdGhvdXQgcGFzc2luZyBvYmogYXR0cmlidXRlIGluIHZhc3RhdGUgcHJpbnQnLCB2YXN0YXRlUHJpbnQgKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiBPYmplY3Qua2V5cyggdmFsdWUgKS5sZW5ndGggPiAwID8gdmFsdWVbdmFzdGF0ZVByaW50LmdldEF0dHJpYnV0ZSggJ29iaicgKS50b1N0cmluZygpID8/IE9iamVjdC5rZXlzKCB0aGlzLmdldCgpIClbMF1dIDogdmFsdWVcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyB0aHJvd0Vycm9yKCBlcnJvcjogc3RyaW5nLCBlbGVtZW50PzogSFRNTEVsZW1lbnQgKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJoc2xhKDAsMCUsOTAlLDEpXCJcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmNvbG9yID0gXCJoc2xhKDAsMCUsMTAlLC45KVwiXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5mb250RmFtaWx5ID0gXCJhcmlhbFwiXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8aDE+VmFzdGF0ZSBKUyBFcnJvcjwvaDE+XHJcbiAgICAgICAgICAgICAgICA8c3Ryb25nPiR7IGVycm9yIH08L3N0cm9uZz5cclxuICAgICAgICAgICAgICAgIDxicj5cclxuICAgICAgICAgICAgICAgICR7IGVsZW1lbnQgPyBgXHJcbiAgICAgICAgICAgICAgICA8c3Ryb25nPkhlbHBmdWwgSW5mbzo8L3N0cm9uZz5cclxuICAgICAgICAgICAgICAgIDxicj5cclxuICAgICAgICAgICAgICAgIDxicj5cclxuICAgICAgICAgICAgICAgIDxwcmUgIHN0eWxlPVwiICBiYWNrZ3JvdW5kOiAjMjYyNjI2OyBjb2xvcjp3aGl0ZTtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBwYWRkaW5nOiAxcmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcIj5cclxuICAgICAgICAgICAgICAgIDxjb2RlPiR7IGVsZW1lbnQub3V0ZXJIVE1MLnNwbGl0KCAnPCcgKS5qb2luKCAnJmx0OycgKS5zcGxpdCggJz4nICkuam9pbiggJyZndDsnICkgfTwvY29kZT5cclxuICAgICAgICAgICAgICAgIDwvcHJlPmAgOiBgYCB9ICAgICAgICAgICAgXHJcbmBcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCBgVmFzdGF0ZSBKUyBFcnJvcjogJHsgZXJyb3IgfWAgKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVzZXRWYXN0YXRlRWFjaCggdmFzdGF0ZUVhY2g6IEhUTUxFbGVtZW50ICk6IHZvaWQge1xyXG4gICAgICAgIC8vIHJlbW92ZSBwcmVsb2FkZXIgZnJvbSB0aGUgcGFnZVxyXG4gICAgICAgIHZhc3RhdGVFYWNoLmlubmVySFRNTCA9IHZhc3RhdGVFYWNoLmlubmVySFRNTC5zcGxpdCggdGhpcy5sb2FkaW5nVGVtcGxhdGUgKS5qb2luKCAnJyApXHJcbiAgICAgICAgLy8gcmVtb3ZlIGFsbCBjaGlsZHJlbiBleGNlcHQgZmlyc3Qgb25lXHJcbiAgICAgICAgdmFzdGF0ZUVhY2gucXVlcnlTZWxlY3RvckFsbCggJzpzY29wZSA+IConICkuZm9yRWFjaCggKCBlOiBIVE1MRWxlbWVudCwgaSApID0+IGkgIT09IDAgPyBlLnJlbW92ZSgpIDogdm9pZCAwIClcclxuICAgICAgICBjb25zb2xlLmxvZyh2YXN0YXRlRWFjaC5jaGlsZHJlblswXT8uc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJykpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgbG9hZGluZyB0ZW1wbGF0ZSBmb3Igc3BlY2lmaWMgc3RhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGVcclxuICAgICAqIEByZXR1cm4gdGhpc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0TG9hZGluZ1RlbXBsYXRlKCB0ZW1wbGF0ZTogc3RyaW5nICk6IHRoaXMge1xyXG4gICAgICAgIHRoaXMubG9hZGluZ1RlbXBsYXRlID0gdGVtcGxhdGVcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2hhbmdlIGN1cnJlbnQgc2F2ZSBtb2RlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHNhdmVNb2RlXHJcbiAgICAgKiBAcmV0dXJuIHRoaXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNhdmVNb2RlKCBzYXZlTW9kZTogc2F2ZU1vZGUgKTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy5zYXZlTW9kZSA9IHNhdmVNb2RlXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCBjdXJyZW50IHNhdmUgbW9kZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gc2F2ZU1vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNhdmVNb2RlKCk6IHNhdmVNb2RlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zYXZlTW9kZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2F2ZSBjdXJyZW50IHN0YXRlIHRvIGxvY2FsU3RvcmFnZS9zZXNzaW9uU3RvcmFnZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gdGhpc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZSgpOiB0aGlzIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHR5cGVvZiB0aGlzLmdldCgpID09ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkoIHRoaXMuZ2V0KCkgKSA/IEpTT04uc3RyaW5naWZ5KCB0aGlzLmdldCgpICkgOiB0aGlzLmdldCgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgc3dpdGNoICggdGhpcy5nZXRTYXZlTW9kZSgpICkge1xyXG4gICAgICAgICAgICBjYXNlIFwibG9jYWxTdG9yYWdlXCI6XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSggdGhpcy5uYW1lLCB2YWx1ZSApXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIFwic2Vzc2lvblN0b3JhZ2VcIjpcclxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oIHRoaXMubmFtZSwgdmFsdWUgKVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIFZhc3RhdGUudGhyb3dFcnJvciggJ1Vuc3VwcG9ydGVkIHNhdmUgbW9kZTogJyArIHRoaXMuZ2V0U2F2ZU1vZGUoKSApXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVzdG9yZSB0aGUgc3RhdGUgZnJvbSBsb2NhbFN0b3JhZ2Uvc2Vzc2lvblN0b3JhZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHRoaXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc3RvcmUoKTogdGhpcyB7XHJcbiAgICAgICAgc3dpdGNoICggdGhpcy5nZXRTYXZlTW9kZSgpICkge1xyXG4gICAgICAgICAgICBjYXNlIFwibG9jYWxTdG9yYWdlXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCB0aGlzLm5hbWUgKSApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXQoIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oIHRoaXMubmFtZSApKSApXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIFwic2Vzc2lvblN0b3JhZ2VcIjpcclxuICAgICAgICAgICAgICAgIGlmICggc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSggdGhpcy5uYW1lICkgKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KCBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oIHRoaXMubmFtZSApKSApXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgVmFzdGF0ZS50aHJvd0Vycm9yKCAnVW5zdXBwb3J0ZWQgc2F2ZSBtb2RlOiAnICsgdGhpcy5nZXRTYXZlTW9kZSgpIClcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgVmFzdGF0ZVxyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgaWYgKHdpbmRvdy5WYXN0YXRlKSB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIC8vIHdpbmRvdy5WYXN0YXRlID0gd2luZG93LlZhc3RhdGUuZGVmYXVsdDtcclxuICAgIH1cclxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==