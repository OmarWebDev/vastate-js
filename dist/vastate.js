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
     * Set state value
     *
     * @param value
     * @return this
     */
    set(value) {
        if (this.value != this.previousValue)
            this.previousValue = this.value;
        this.value = value;
        this.reloadDom();
        return this;
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
                    vastatePrint.innerHTML = vastatePrint.innerHTML.split(this.previousValue.toString()).join(this.getVastatePrintValue(vastatePrint));
                }
                else {
                    vastatePrint.textContent = vastatePrint.textContent.split(this.previousValue.toString()).join(this.getVastatePrintValue(vastatePrint));
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
                firstChild === null || firstChild === void 0 ? void 0 : firstChild.setAttribute('hidden', 'true');
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
        var _a;
        // remove preloader from the page
        vastateEach.innerHTML = vastateEach.innerHTML.split(this.loadingTemplate).join('');
        // remove all children except first one
        vastateEach.querySelectorAll('* + *').forEach((e) => e.remove());
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
        var Vastate = window.Vastate.default;
        // @ts-ignore
        delete window.Vastate;
    }
};

window.Vastate = __webpack_exports__["default"];
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxjQUFjLENBQUMsT0FBTyxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUUsQ0FBQyxDQUFFO2dCQUMvRCxNQUFLO1lBQ1Q7Z0JBQ0ksT0FBTyxDQUFDLFVBQVUsQ0FBRSx5QkFBeUIsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUU7Z0JBQ3BFLE1BQUs7U0FDWjtRQUNELE9BQU8sSUFBSTtJQUNmLENBQUM7O0FBdFJEOzs7O0dBSUc7QUFDWSx1QkFBZSxHQUFXLEVBQUU7QUFtUi9DLGlFQUFlLE9BQU87QUFDdEIsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7SUFDakIsYUFBYTtJQUNiLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUNoQixhQUFhO1FBQ2IsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDckMsYUFBYTtRQUNiLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUN6QjtBQUNMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9WYXN0YXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1Zhc3RhdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1Zhc3RhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9WYXN0YXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vVmFzdGF0ZS8uL3NyYy92YXN0YXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4gKiBOYW1lOiBWYXN0YXRlLmpzXG4gKiBWZXJzaW9uOiAxLjBcbiAqIExpY2Vuc2U6IE1JVFxuICovXG50eXBlIHZhc3RhdGVWYWx1ZSA9IHN0cmluZyB8IG51bWJlciB8IGFueVtdIHwgYm9vbGVhbiB8IG51bGxcbnR5cGUgc2F2ZU1vZGUgPSAnbG9jYWxTdG9yYWdlJyB8ICdzZXNzaW9uU3RvcmFnZSdcblxuY2xhc3MgVmFzdGF0ZSB7XG5cbiAgICAvKipcbiAgICAgKiBTdGF0ZSB2YWx1ZVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIHZhbHVlOiB2YXN0YXRlVmFsdWVcblxuICAgIC8qKlxuICAgICAqIFBsYWNlaG9sZGVyIHRoYXQgd2lsbCBiZSByZXBsYWNlZCB3aXRoXG4gICAgICogU3RhdGUgdmFsdWUgd2hlbiBzaG93ZWQgaW4gSFRNTFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IHBsYWNlaG9sZGVyOiBhbnkgPSAneyNWQUxVRSN9J1xuXG4gICAgLyoqXG4gICAgICogU3RhdGUgcHJldmlvdXNWYWx1ZVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIHByZXZpb3VzVmFsdWU6IHZhc3RhdGVWYWx1ZSA9IHRoaXMucGxhY2Vob2xkZXJcblxuICAgIC8qKlxuICAgICAqIFN0YXRlIE5hbWVcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBuYW1lOiBzdHJpbmdcblxuICAgIC8qKlxuICAgICAqIExvYWRpbmcgc3RhdHVzXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgaXNMb2FkaW5nOiBib29sZWFuID0gZmFsc2VcblxuICAgIC8qKlxuICAgICAqIEdsb2JhbCBMb2FkaW5nIFRlbXBsYXRlXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIGxvYWRpbmdUZW1wbGF0ZTogc3RyaW5nID0gJydcblxuICAgIC8qKlxuICAgICAqIExvYWRpbmcgdGVtcGxhdGUgZm9yIHNwZWNpZmljIHN0YXRlXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgbG9hZGluZ1RlbXBsYXRlOiBzdHJpbmcgPSBWYXN0YXRlLmxvYWRpbmdUZW1wbGF0ZTtcblxuICAgIC8qKlxuICAgICAqIFNhdmUgbW9kZSBpcyB1c2VkIHRvIHNlZSB3aGVyZSB0byBzYXZlIHRoZSBzdGF0ZVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIHNhdmVNb2RlOiBzYXZlTW9kZSA9ICdsb2NhbFN0b3JhZ2UnO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBncm91cGVkVmFzdGF0ZVByaW50c1NlbGVjdG9yOiBzdHJpbmcgPSBgdmFzdGF0ZS1wcmludDpub3QodmFzdGF0ZS1wcmludFtzdGF0ZV0pLCBbdmFzdGF0ZS1wcmludF06bm90KFt2YXN0YXRlLXByaW50XVtzdGF0ZV0pYDtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgdmFzdGF0ZVByaW50c1NlbGVjdG9yOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIG5ldyBzdGF0ZVxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciggbmFtZTogc3RyaW5nLCB2YWx1ZTogdmFzdGF0ZVZhbHVlICkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWVcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLnZhc3RhdGVQcmludHNTZWxlY3RvciA9IGB2YXN0YXRlLXByaW50W3N0YXRlPVwiJHsgdGhpcy5uYW1lIH1cIl0sIFt2YXN0YXRlLXByaW50XVtzdGF0ZT1cIiR7IHRoaXMubmFtZSB9XCJdOm5vdChbdmFzdGF0ZS1ncm91cF0pYFxuICAgICAgICB0aGlzLnJlbG9hZERvbSgpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGxvYWRpbmcgc3RhdHVzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbG9hZGluZ1xuICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAqL1xuICAgIHNldExvYWRpbmcoIGxvYWRpbmc6IGJvb2xlYW4gKTogdGhpcyB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gbG9hZGluZ1xuICAgICAgICB0aGlzLnJlbG9hZERvbSgpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IEdsb2JhbCBsb2FkaW5nIHRlbXBsYXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbG9hZGluZ1RlbXBsYXRlXG4gICAgICovXG4gICAgc3RhdGljIHNldExvYWRpbmdUZW1wbGF0ZSggbG9hZGluZ1RlbXBsYXRlOiBzdHJpbmcgKSB7XG4gICAgICAgIHRoaXMubG9hZGluZ1RlbXBsYXRlID0gbG9hZGluZ1RlbXBsYXRlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGN1cnJlbnQgc3RhdGUgdmFsdWVcbiAgICAgKi9cbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHN0YXRlIHZhbHVlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgKi9cbiAgICBzZXQoIHZhbHVlOiB2YXN0YXRlVmFsdWUgKTogdGhpcyB7XG4gICAgICAgIGlmICggdGhpcy52YWx1ZSAhPSB0aGlzLnByZXZpb3VzVmFsdWUgKVxuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1ZhbHVlID0gdGhpcy52YWx1ZVxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWVcbiAgICAgICAgdGhpcy5yZWxvYWREb20oKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbG9hZCB0aGUgRE9NIHdoZW4gdmFsdWUgb3IgbG9hZGluZyBzdGF0ZSBpcyBjaGFuZ2VkXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgcmVsb2FkRG9tKCkge1xuICAgICAgICB0aGlzLnJlbG9hZFZhc3RhdGVFYWNocygpXG4gICAgICAgIHRoaXMucmVsb2FkVmFzdGF0ZVByaW50cygpXG4gICAgICAgIHRoaXMucmVsb2FkVmFzdGF0ZUdyb3VwcygpXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZWxvYWQgYWxsIHZhc3RhdGUtcHJpbnQgdGFncy9hdHRyaWJ1dGVcbiAgICAgKiBpbiB0aGUgRE9NXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgcmVsb2FkVmFzdGF0ZVByaW50cyggcGFyZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmJvZHkgKSB7XG4gICAgICAgIGNvbnN0IHZhc3RhdGVQcmludHMgPSBwYXJlbnQucXVlcnlTZWxlY3RvckFsbCggcGFyZW50Lmhhc0F0dHJpYnV0ZSggJ3Zhc3RhdGUtcHJpbnQtZ3JvdXAnICkgfHwgcGFyZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSBcInZhc3RhdGUtcHJpbnQtZ3JvdXBcIiA/IHRoaXMuZ3JvdXBlZFZhc3RhdGVQcmludHNTZWxlY3RvciA6IHRoaXMudmFzdGF0ZVByaW50c1NlbGVjdG9yIClcbiAgICAgICAgdmFzdGF0ZVByaW50cy5mb3JFYWNoKCAoIHZhc3RhdGVQcmludDogSFRNTEVsZW1lbnQgKSA9PiB7XG4gICAgICAgICAgICBpZiAoIHRoaXMuaXNMb2FkaW5nICkge1xuICAgICAgICAgICAgICAgIHZhc3RhdGVQcmludC5pbm5lckhUTUwgKz0gdGhpcy5sb2FkaW5nVGVtcGxhdGVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFzdGF0ZVByaW50LmlubmVySFRNTCA9IHZhc3RhdGVQcmludC5pbm5lckhUTUwuc3BsaXQoIHRoaXMubG9hZGluZ1RlbXBsYXRlICkuam9pbiggJycgKVxuICAgICAgICAgICAgICAgIGlmICggdmFzdGF0ZVByaW50Lmhhc0F0dHJpYnV0ZSggJ2h0bWwnICkgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFzdGF0ZVByaW50LmlubmVySFRNTCA9IHZhc3RhdGVQcmludC5pbm5lckhUTUwuc3BsaXQoIHRoaXMucHJldmlvdXNWYWx1ZS50b1N0cmluZygpICkuam9pbiggdGhpcy5nZXRWYXN0YXRlUHJpbnRWYWx1ZSggdmFzdGF0ZVByaW50ICkgKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhc3RhdGVQcmludC50ZXh0Q29udGVudCA9IHZhc3RhdGVQcmludC50ZXh0Q29udGVudC5zcGxpdCggdGhpcy5wcmV2aW91c1ZhbHVlLnRvU3RyaW5nKCkgKS5qb2luKCB0aGlzLmdldFZhc3RhdGVQcmludFZhbHVlKCB2YXN0YXRlUHJpbnQgKSApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWxvYWQgYWxsIHZhc3RhdGUtZWFjaCB0YWdzL2F0dHJpYnV0ZVxuICAgICAqIGluIHRoZSBET01cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSByZWxvYWRWYXN0YXRlRWFjaHMoIHBhcmVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5ib2R5ICkge1xuICAgICAgICBjb25zdCB2YXN0YXRlRWFjaHMgPSBwYXJlbnQucXVlcnlTZWxlY3RvckFsbCggYHZhc3RhdGUtZWFjaFtzdGF0ZT1cIiR7IHRoaXMubmFtZSB9XCJdLCBbdmFzdGF0ZS1lYWNoXVtzdGF0ZT1cIiR7IHRoaXMubmFtZSB9XCJdYCApXG4gICAgICAgIHZhc3RhdGVFYWNocy5mb3JFYWNoKCAoIHZhc3RhdGVFYWNoOiBIVE1MRWxlbWVudCApID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRWYXN0YXRlRWFjaCggdmFzdGF0ZUVhY2ggKVxuICAgICAgICAgICAgY29uc3Qgc3RhdGVWYWx1ZUFycjogYW55ID0gQXJyYXkuaXNBcnJheSggdGhpcy5nZXQoKSApID8gdGhpcy5nZXQoKSA6IFtdXG5cbiAgICAgICAgICAgIGlmICggc3RhdGVWYWx1ZUFyci5sZW5ndGggPCAxICkge1xuICAgICAgICAgICAgICAgIGlmICggISB0aGlzLmlzTG9hZGluZyApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFZhc3RhdGVFYWNoKCB2YXN0YXRlRWFjaCApXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXN0YXRlRWFjaC5pbm5lckhUTUwgKz0gdGhpcy5sb2FkaW5nVGVtcGxhdGVcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXRlVmFsdWVBcnI/LmZvckVhY2goICggdmFsOiBhbnkgKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3RDaGlsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIGB2YXN0YXRlLWVhY2hbc3RhdGU9XCIkeyB0aGlzLm5hbWUgfVwiXSA+ICosIFt2YXN0YXRlLWVhY2hdW3N0YXRlPVwiJHsgdGhpcy5uYW1lIH1cIl0gPiAqYCApXG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcGxhdGU6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkID0gZmlyc3RDaGlsZD8uY2xvbmVOb2RlKCB0cnVlICkgYXMgSFRNTEVsZW1lbnRcblxuICAgICAgICAgICAgICAgIGZpcnN0Q2hpbGQ/LnNldEF0dHJpYnV0ZSggJ2hpZGRlbicsICd0cnVlJyApXG4gICAgICAgICAgICAgICAgdGVtcGxhdGUucmVtb3ZlQXR0cmlidXRlKCAnaGlkZGVuJyApXG4gICAgICAgICAgICAgICAgaWYgKCB0ZW1wbGF0ZS50YWdOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT0gXCJ2YXN0YXRlLXByaW50XCIgfHwgdGVtcGxhdGUuaGFzQXR0cmlidXRlKCAndmFzdGF0ZS1wcmludCcgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gdGVtcGxhdGUuaW5uZXJIVE1MPy5zcGxpdCggdGhpcy5wbGFjZWhvbGRlciApLmpvaW4oIHRoaXMuZ2V0VmFzdGF0ZVByaW50VmFsdWUoIHRlbXBsYXRlLCB2YWwgKSApXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU/LnF1ZXJ5U2VsZWN0b3JBbGwoICd2YXN0YXRlLXByaW50LCBbdmFzdGF0ZS1wcmludF0nICkuZm9yRWFjaCggKCBwcjogSFRNTEVsZW1lbnQgKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwci5yZW1vdmVBdHRyaWJ1dGUoICdoaWRkZW4nIClcbiAgICAgICAgICAgICAgICAgICAgICAgIHByLmlubmVySFRNTCA9IHByLmlubmVySFRNTD8uc3BsaXQoIHRoaXMucGxhY2Vob2xkZXIgKS5qb2luKCB0aGlzLmdldFZhc3RhdGVQcmludFZhbHVlKCBwciwgdmFsICkgKVxuXG4gICAgICAgICAgICAgICAgICAgIH0gKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXN0YXRlRWFjaC5hcHBlbmRDaGlsZCggdGVtcGxhdGUgKVxuICAgICAgICAgICAgfSApXG4gICAgICAgIH0gKVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVsb2FkVmFzdGF0ZUdyb3VwcygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oIGB2YXN0YXRlLXByaW50LWdyb3VwW3N0YXRlPVwiJHsgdGhpcy5uYW1lIH1cIl0sIFt2YXN0YXRlLXByaW50LWdyb3VwXVtzdGF0ZT1cIiR7IHRoaXMubmFtZSB9XCJdYCApXG4gICAgICAgIGdyb3Vwcy5mb3JFYWNoKCAoIGdyb3VwOiBIVE1MRWxlbWVudCApID0+IHRoaXMucmVsb2FkVmFzdGF0ZVByaW50cyggZ3JvdXAgKSApXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsdWUgdGhhdCB3aWxsIGJlIHByaW50ZWQgaW4gVmFzdGF0ZSBwcmludFxuICAgICAqXG4gICAgICogQHBhcmFtIHZhc3RhdGVQcmludFxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRWYXN0YXRlUHJpbnRWYWx1ZSggdmFzdGF0ZVByaW50OiBIVE1MRWxlbWVudCwgdmFsdWUgPSB0aGlzLmdldCgpICkge1xuICAgICAgICBpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiAhIHZhc3RhdGVQcmludC5oYXNBdHRyaWJ1dGUoICdvYmonICkgKSB7XG5cbiAgICAgICAgICAgIFZhc3RhdGUudGhyb3dFcnJvciggJ1lvdSBhcmUgdHJ5aW5nIHRvIHByaW50IGFuIG9iamVjdCB3aXRob3V0IHBhc3Npbmcgb2JqIGF0dHJpYnV0ZSBpbiB2YXN0YXRlIHByaW50JywgdmFzdGF0ZVByaW50IClcbiAgICAgICAgfVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgT2JqZWN0LmtleXMoIHZhbHVlICkubGVuZ3RoID4gMCA/IHZhbHVlW3Zhc3RhdGVQcmludC5nZXRBdHRyaWJ1dGUoICdvYmonICkudG9TdHJpbmcoKSA/PyBPYmplY3Qua2V5cyggdGhpcy5nZXQoKSApWzBdXSA6IHZhbHVlXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgdGhyb3dFcnJvciggZXJyb3I6IHN0cmluZywgZWxlbWVudD86IEhUTUxFbGVtZW50ICkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmQgPSBcImhzbGEoMCwwJSw5MCUsMSlcIlxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmNvbG9yID0gXCJoc2xhKDAsMCUsMTAlLC45KVwiXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZm9udEZhbWlseSA9IFwiYXJpYWxcIlxuICAgICAgICBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICA8aDE+VmFzdGF0ZSBKUyBFcnJvcjwvaDE+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz4keyBlcnJvciB9PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICAgICR7IGVsZW1lbnQgPyBgXG4gICAgICAgICAgICAgICAgPHN0cm9uZz5IZWxwZnVsIEluZm86PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICA8cHJlICBzdHlsZT1cIiAgYmFja2dyb3VuZDogIzI2MjYyNjsgY29sb3I6d2hpdGU7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBwYWRkaW5nOiAxcmVtO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XCI+XG4gICAgICAgICAgICAgICAgPGNvZGU+JHsgZWxlbWVudC5vdXRlckhUTUwuc3BsaXQoICc8JyApLmpvaW4oICcmbHQ7JyApLnNwbGl0KCAnPicgKS5qb2luKCAnJmd0OycgKSB9PC9jb2RlPlxuICAgICAgICAgICAgICAgIDwvcHJlPmAgOiBgYCB9ICAgICAgICAgICAgXG5gXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoIGBWYXN0YXRlIEpTIEVycm9yOiAkeyBlcnJvciB9YCApXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldFZhc3RhdGVFYWNoKCB2YXN0YXRlRWFjaDogSFRNTEVsZW1lbnQgKTogdm9pZCB7XG4gICAgICAgIC8vIHJlbW92ZSBwcmVsb2FkZXIgZnJvbSB0aGUgcGFnZVxuICAgICAgICB2YXN0YXRlRWFjaC5pbm5lckhUTUwgPSB2YXN0YXRlRWFjaC5pbm5lckhUTUwuc3BsaXQoIHRoaXMubG9hZGluZ1RlbXBsYXRlICkuam9pbiggJycgKVxuICAgICAgICAvLyByZW1vdmUgYWxsIGNoaWxkcmVuIGV4Y2VwdCBmaXJzdCBvbmVcbiAgICAgICAgdmFzdGF0ZUVhY2gucXVlcnlTZWxlY3RvckFsbCggJyogKyAqJyApLmZvckVhY2goICggZTogSFRNTEVsZW1lbnQgKSA9PiBlLnJlbW92ZSgpIClcbiAgICAgICAgY29uc29sZS5sb2codmFzdGF0ZUVhY2guY2hpbGRyZW5bMF0/LnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBsb2FkaW5nIHRlbXBsYXRlIGZvciBzcGVjaWZpYyBzdGF0ZVxuICAgICAqXG4gICAgICogQHBhcmFtIHRlbXBsYXRlXG4gICAgICogQHJldHVybiB0aGlzXG4gICAgICovXG4gICAgcHVibGljIHNldExvYWRpbmdUZW1wbGF0ZSggdGVtcGxhdGU6IHN0cmluZyApOiB0aGlzIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nVGVtcGxhdGUgPSB0ZW1wbGF0ZVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoYW5nZSBjdXJyZW50IHNhdmUgbW9kZVxuICAgICAqXG4gICAgICogQHBhcmFtIHNhdmVNb2RlXG4gICAgICogQHJldHVybiB0aGlzXG4gICAgICovXG4gICAgcHVibGljIHNldFNhdmVNb2RlKCBzYXZlTW9kZTogc2F2ZU1vZGUgKTogdGhpcyB7XG4gICAgICAgIHRoaXMuc2F2ZU1vZGUgPSBzYXZlTW9kZVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldCBjdXJyZW50IHNhdmUgbW9kZVxuICAgICAqXG4gICAgICogQHJldHVybiBzYXZlTW9kZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRTYXZlTW9kZSgpOiBzYXZlTW9kZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNhdmVNb2RlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2F2ZSBjdXJyZW50IHN0YXRlIHRvIGxvY2FsU3RvcmFnZS9zZXNzaW9uU3RvcmFnZVxuICAgICAqXG4gICAgICogQHJldHVybiB0aGlzXG4gICAgICovXG4gICAgcHVibGljIHNhdmUoKTogdGhpcyB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdHlwZW9mIHRoaXMuZ2V0KCkgPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheSggdGhpcy5nZXQoKSApID8gSlNPTi5zdHJpbmdpZnkoIHRoaXMuZ2V0KCkgKSA6IHRoaXMuZ2V0KCkudG9TdHJpbmcoKTtcbiAgICAgICAgc3dpdGNoICggdGhpcy5nZXRTYXZlTW9kZSgpICkge1xuICAgICAgICAgICAgY2FzZSBcImxvY2FsU3RvcmFnZVwiOlxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCB0aGlzLm5hbWUsIHZhbHVlIClcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBcInNlc3Npb25TdG9yYWdlXCI6XG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSggdGhpcy5uYW1lLCB2YWx1ZSApXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgVmFzdGF0ZS50aHJvd0Vycm9yKCAnVW5zdXBwb3J0ZWQgc2F2ZSBtb2RlOiAnICsgdGhpcy5nZXRTYXZlTW9kZSgpIClcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVzdG9yZSB0aGUgc3RhdGUgZnJvbSBsb2NhbFN0b3JhZ2Uvc2Vzc2lvblN0b3JhZ2VcbiAgICAgKlxuICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAqL1xuICAgIHB1YmxpYyByZXN0b3JlKCk6IHRoaXMge1xuICAgICAgICBzd2l0Y2ggKCB0aGlzLmdldFNhdmVNb2RlKCkgKSB7XG4gICAgICAgICAgICBjYXNlIFwibG9jYWxTdG9yYWdlXCI6XG4gICAgICAgICAgICAgICAgaWYgKCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSggdGhpcy5uYW1lICkgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldCggSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSggdGhpcy5uYW1lICkpIClcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBcInNlc3Npb25TdG9yYWdlXCI6XG4gICAgICAgICAgICAgICAgaWYgKCBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCB0aGlzLm5hbWUgKSApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KCBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oIHRoaXMubmFtZSApKSApXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgVmFzdGF0ZS50aHJvd0Vycm9yKCAnVW5zdXBwb3J0ZWQgc2F2ZSBtb2RlOiAnICsgdGhpcy5nZXRTYXZlTW9kZSgpIClcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVmFzdGF0ZVxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWYgKHdpbmRvdy5WYXN0YXRlKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdmFyIFZhc3RhdGUgPSB3aW5kb3cuVmFzdGF0ZS5kZWZhdWx0O1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGRlbGV0ZSB3aW5kb3cuVmFzdGF0ZTtcbiAgICB9XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9