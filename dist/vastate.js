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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLFVBQVUsQ0FBRSx5QkFBeUIsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUU7Z0JBQ3BFLE1BQUs7U0FDWjtRQUNELE9BQU8sSUFBSTtJQUNmLENBQUM7O0FBcFVEOzs7O0dBSUc7QUFDWSx1QkFBZSxHQUFXLEVBQUU7QUFpVS9DLGlFQUFlLE9BQU87QUFDdEIsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7SUFDakIsYUFBYTtJQUNiLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUNoQixhQUFhO1FBQ2IsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDckMsYUFBYTtRQUNiLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUN6QjtBQUNMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9WYXN0YXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1Zhc3RhdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1Zhc3RhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9WYXN0YXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vVmFzdGF0ZS8uL3NyYy92YXN0YXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIE5hbWU6IFZhc3RhdGUuanNcclxuICogVmVyc2lvbjogMS4yLjBcclxuICogTGljZW5zZTogTUlUXHJcbiAqL1xyXG50eXBlIHZhc3RhdGVWYWx1ZSA9IHN0cmluZyB8IG51bWJlciB8IGFueVtdIHwgYm9vbGVhbiB8IG51bGxcclxudHlwZSBzYXZlTW9kZSA9ICdsb2NhbFN0b3JhZ2UnIHwgJ3Nlc3Npb25TdG9yYWdlJ1xyXG5cclxuY2xhc3MgVmFzdGF0ZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGF0ZSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdmFsdWU6IHZhc3RhdGVWYWx1ZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGxhY2Vob2xkZXIgdGhhdCB3aWxsIGJlIHJlcGxhY2VkIHdpdGhcclxuICAgICAqIFN0YXRlIHZhbHVlIHdoZW4gc2hvd2VkIGluIEhUTUxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBsYWNlaG9sZGVyOiBhbnkgPSAneyNWQUxVRSN9J1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhdGUgcHJldmlvdXNWYWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcHJldmlvdXNWYWx1ZTogdmFzdGF0ZVZhbHVlID0gdGhpcy5wbGFjZWhvbGRlclxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhdGUgTmFtZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbmFtZTogc3RyaW5nXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkaW5nIHN0YXR1c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNMb2FkaW5nOiBib29sZWFuID0gZmFsc2VcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdsb2JhbCBMb2FkaW5nIFRlbXBsYXRlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbG9hZGluZ1RlbXBsYXRlOiBzdHJpbmcgPSAnJ1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZGluZyB0ZW1wbGF0ZSBmb3Igc3BlY2lmaWMgc3RhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGxvYWRpbmdUZW1wbGF0ZTogc3RyaW5nID0gVmFzdGF0ZS5sb2FkaW5nVGVtcGxhdGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBldmVudHMgd2lsbCBiZSB1c2VkIHdoZW4gY3JlYXRlZCBhIG5ldyBldmVudFxyXG4gICAgICogdXNpbmcgb24gbWV0aG9kIG9yIHRyaWdnZXJpbmcgYW4gZXhpc3RpbmcgZXZlbnQgdXNpbmcgdHJpZ2dlciBtZXRob2RcclxuICAgICAqIHRoZXJlIGlzIGEgZGVmYXVsdCBldmVudCB3aGljaCBpcyBjaGFuZ2UgdGhhdCB3aWxsIHJlbG9hZCB0aGUgZG9tXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBldmVudHM6IHtba2V5OiBzdHJpbmddOiBDYWxsYWJsZUZ1bmN0aW9ufSA9IHtcclxuICAgICAgICBcImNoYW5nZVwiOiAoKSA9PiB7fVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2F2ZSBtb2RlIGlzIHVzZWQgdG8gc2VlIHdoZXJlIHRvIHNhdmUgdGhlIHN0YXRlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzYXZlTW9kZTogc2F2ZU1vZGUgPSAnbG9jYWxTdG9yYWdlJztcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGdyb3VwZWRWYXN0YXRlUHJpbnRzU2VsZWN0b3I6IHN0cmluZyA9IGB2YXN0YXRlLXByaW50Om5vdCh2YXN0YXRlLXByaW50W3N0YXRlXSksIFt2YXN0YXRlLXByaW50XTpub3QoW3Zhc3RhdGUtcHJpbnRdW3N0YXRlXSlgO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdmFzdGF0ZVByaW50c1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbml0aWFsaXplIG5ldyBzdGF0ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBuYW1lXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoIG5hbWU6IHN0cmluZywgdmFsdWU6IHZhc3RhdGVWYWx1ZSApIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWVcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICAgICAgdGhpcy52YXN0YXRlUHJpbnRzU2VsZWN0b3IgPSBgdmFzdGF0ZS1wcmludFtzdGF0ZT1cIiR7IHRoaXMubmFtZSB9XCJdLCBbdmFzdGF0ZS1wcmludF1bc3RhdGU9XCIkeyB0aGlzLm5hbWUgfVwiXTpub3QoW3Zhc3RhdGUtZ3JvdXBdKWBcclxuICAgICAgICB0aGlzLnJlbG9hZERvbSgpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgbG9hZGluZyBzdGF0dXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbG9hZGluZ1xyXG4gICAgICogQHJldHVybiB0aGlzXHJcbiAgICAgKi9cclxuICAgIHNldExvYWRpbmcoIGxvYWRpbmc6IGJvb2xlYW4gKTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBsb2FkaW5nXHJcbiAgICAgICAgdGhpcy5yZWxvYWREb20oKVxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgR2xvYmFsIGxvYWRpbmcgdGVtcGxhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbG9hZGluZ1RlbXBsYXRlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzZXRMb2FkaW5nVGVtcGxhdGUoIGxvYWRpbmdUZW1wbGF0ZTogc3RyaW5nICkge1xyXG4gICAgICAgIHRoaXMubG9hZGluZ1RlbXBsYXRlID0gbG9hZGluZ1RlbXBsYXRlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgY3VycmVudCBzdGF0ZSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBnZXQoKTogdmFzdGF0ZVZhbHVlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHByZXZpb3VzIHN0YXRlIHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBnZXRQcmV2aW91c1ZhbHVlKCk6IHZhc3RhdGVWYWx1ZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJldmlvdXNWYWx1ZVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgc3RhdGUgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gdGhpc1xyXG4gICAgICovXHJcbiAgICBzZXQoIHZhbHVlOiB2YXN0YXRlVmFsdWUgKTogdGhpcyB7XHJcbiAgICAgICAgaWYgKCB0aGlzLnZhbHVlICE9IHRoaXMucHJldmlvdXNWYWx1ZSApXHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IHRoaXMudmFsdWVcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWVcclxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2NoYW5nZScpXHJcbiAgICAgICAgdGhpcy5yZWxvYWREb20oKVxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgZXZlbnQgdGhhdCBjYW4gYmUgdHJpZ2dlcmVkXHJcbiAgICAgKiB1c2luZyB0cmlnZ2VyIG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXHJcbiAgICAgKi9cclxuICAgIG9uKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBDYWxsYWJsZUZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gY2FsbGJhY2tcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaWdnZXIgYSBldmVudCB0aGF0IGlzIGNyZWF0ZWQgdXNpbmcgb24gbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV2ZW50XHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zXHJcbiAgICAgKi9cclxuICAgIHRyaWdnZXIoZXZlbnQ6IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSkge1xyXG4gICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudF0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0oLi4ucGFyYW1zKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIFZhc3RhdGUudGhyb3dFcnJvcihgVW5kZWZpbmVkIGV2ZW50ICcke2V2ZW50fScuIERpZCB5b3UgY3JlYXRlZCB0aGUgZXZlbnQgdXNpbmcgJ29uJyBtZXRob2Q/YClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWxvYWQgdGhlIERPTSB3aGVuIHZhbHVlIG9yIGxvYWRpbmcgc3RhdGUgaXMgY2hhbmdlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVsb2FkRG9tKCkge1xyXG4gICAgICAgIHRoaXMucmVsb2FkVmFzdGF0ZUVhY2hzKClcclxuICAgICAgICB0aGlzLnJlbG9hZFZhc3RhdGVQcmludHMoKVxyXG4gICAgICAgIHRoaXMucmVsb2FkVmFzdGF0ZUdyb3VwcygpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVsb2FkIGFsbCB2YXN0YXRlLXByaW50IHRhZ3MvYXR0cmlidXRlXHJcbiAgICAgKiBpbiB0aGUgRE9NXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWxvYWRWYXN0YXRlUHJpbnRzKCBwYXJlbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuYm9keSApIHtcclxuICAgICAgICBjb25zdCB2YXN0YXRlUHJpbnRzID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIHBhcmVudC5oYXNBdHRyaWJ1dGUoICd2YXN0YXRlLXByaW50LWdyb3VwJyApIHx8IHBhcmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT0gXCJ2YXN0YXRlLXByaW50LWdyb3VwXCIgPyB0aGlzLmdyb3VwZWRWYXN0YXRlUHJpbnRzU2VsZWN0b3IgOiB0aGlzLnZhc3RhdGVQcmludHNTZWxlY3RvciApXHJcbiAgICAgICAgdmFzdGF0ZVByaW50cy5mb3JFYWNoKCAoIHZhc3RhdGVQcmludDogSFRNTEVsZW1lbnQgKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5pc0xvYWRpbmcgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXN0YXRlUHJpbnQuaW5uZXJIVE1MICs9IHRoaXMubG9hZGluZ1RlbXBsYXRlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXN0YXRlUHJpbnQuaW5uZXJIVE1MID0gdmFzdGF0ZVByaW50LmlubmVySFRNTC5zcGxpdCggdGhpcy5sb2FkaW5nVGVtcGxhdGUgKS5qb2luKCAnJyApXHJcbiAgICAgICAgICAgICAgICBpZiAoIHZhc3RhdGVQcmludC5oYXNBdHRyaWJ1dGUoICdodG1sJyApICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICB2YXN0YXRlUHJpbnQuaW5uZXJIVE1MID0gdmFzdGF0ZVByaW50LmlubmVySFRNTC5zcGxpdCggdmFzdGF0ZVByaW50Lmhhc0F0dHJpYnV0ZSgnb2JqJykgPyB0aGlzLnByZXZpb3VzVmFsdWVbdmFzdGF0ZVByaW50LmdldEF0dHJpYnV0ZSgnb2JqJyldLnRvU3RyaW5nKCkgOiB0aGlzLnByZXZpb3VzVmFsdWUudG9TdHJpbmcoKSApLmpvaW4oIHRoaXMuZ2V0VmFzdGF0ZVByaW50VmFsdWUoIHZhc3RhdGVQcmludCApIClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIHZhc3RhdGVQcmludC50ZXh0Q29udGVudCA9IHZhc3RhdGVQcmludC50ZXh0Q29udGVudC5zcGxpdCggdmFzdGF0ZVByaW50Lmhhc0F0dHJpYnV0ZSgnb2JqJykgJiYgdHlwZW9mIHRoaXMucHJldmlvdXNWYWx1ZSA9PT0gJ29iamVjdCcgPyB0aGlzLnByZXZpb3VzVmFsdWVbdmFzdGF0ZVByaW50LmdldEF0dHJpYnV0ZSgnb2JqJyldLnRvU3RyaW5nKCkgOiB0aGlzLnByZXZpb3VzVmFsdWUudG9TdHJpbmcoKSApLmpvaW4oIHRoaXMuZ2V0VmFzdGF0ZVByaW50VmFsdWUoIHZhc3RhdGVQcmludCApIClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVsb2FkIGFsbCB2YXN0YXRlLWVhY2ggdGFncy9hdHRyaWJ1dGVcclxuICAgICAqIGluIHRoZSBET01cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbG9hZFZhc3RhdGVFYWNocyggcGFyZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmJvZHkgKSB7XHJcbiAgICAgICAgY29uc3QgdmFzdGF0ZUVhY2hzID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIGB2YXN0YXRlLWVhY2hbc3RhdGU9XCIkeyB0aGlzLm5hbWUgfVwiXSwgW3Zhc3RhdGUtZWFjaF1bc3RhdGU9XCIkeyB0aGlzLm5hbWUgfVwiXWAgKVxyXG4gICAgICAgIHZhc3RhdGVFYWNocy5mb3JFYWNoKCAoIHZhc3RhdGVFYWNoOiBIVE1MRWxlbWVudCApID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldFZhc3RhdGVFYWNoKCB2YXN0YXRlRWFjaCApXHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlVmFsdWVBcnI6IGFueSA9IEFycmF5LmlzQXJyYXkoIHRoaXMuZ2V0KCkgKSA/IHRoaXMuZ2V0KCkgOiBbXVxyXG5cclxuICAgICAgICAgICAgaWYgKCBzdGF0ZVZhbHVlQXJyLmxlbmd0aCA8IDEgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoICEgdGhpcy5pc0xvYWRpbmcgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFZhc3RhdGVFYWNoKCB2YXN0YXRlRWFjaCApXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXN0YXRlRWFjaC5pbm5lckhUTUwgKz0gdGhpcy5sb2FkaW5nVGVtcGxhdGVcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0YXRlVmFsdWVBcnI/LmZvckVhY2goICggdmFsOiBhbnkgKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdENoaWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggYHZhc3RhdGUtZWFjaFtzdGF0ZT1cIiR7IHRoaXMubmFtZSB9XCJdID4gKiwgW3Zhc3RhdGUtZWFjaF1bc3RhdGU9XCIkeyB0aGlzLm5hbWUgfVwiXSA+ICpgIClcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCA9IGZpcnN0Q2hpbGQ/LmNsb25lTm9kZSggdHJ1ZSApIGFzIEhUTUxFbGVtZW50XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyc3RDaGlsZD8uc2V0QXR0cmlidXRlKCAnaGlkZGVuJywgJ3RydWUnIClcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlLnJlbW92ZUF0dHJpYnV0ZSggJ2hpZGRlbicgKVxyXG4gICAgICAgICAgICAgICAgaWYgKCB0ZW1wbGF0ZS50YWdOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT0gXCJ2YXN0YXRlLXByaW50XCIgfHwgdGVtcGxhdGUuaGFzQXR0cmlidXRlKCAndmFzdGF0ZS1wcmludCcgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZS5pbm5lckhUTUw/LnNwbGl0KCB0aGlzLnBsYWNlaG9sZGVyICkuam9pbiggdGhpcy5nZXRWYXN0YXRlUHJpbnRWYWx1ZSggdGVtcGxhdGUsIHZhbCApIClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU/LnF1ZXJ5U2VsZWN0b3JBbGwoICd2YXN0YXRlLXByaW50LCBbdmFzdGF0ZS1wcmludF0nICkuZm9yRWFjaCggKCBwcjogSFRNTEVsZW1lbnQgKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByLnJlbW92ZUF0dHJpYnV0ZSggJ2hpZGRlbicgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwci5pbm5lckhUTUwgPSBwci5pbm5lckhUTUw/LnNwbGl0KCB0aGlzLnBsYWNlaG9sZGVyICkuam9pbiggdGhpcy5nZXRWYXN0YXRlUHJpbnRWYWx1ZSggcHIsIHZhbCApIClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXN0YXRlRWFjaC5hcHBlbmRDaGlsZCggdGVtcGxhdGUgKVxyXG4gICAgICAgICAgICB9IClcclxuICAgICAgICB9IClcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbG9hZFZhc3RhdGVHcm91cHMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oIGB2YXN0YXRlLXByaW50LWdyb3VwW3N0YXRlPVwiJHsgdGhpcy5uYW1lIH1cIl0sIFt2YXN0YXRlLXByaW50LWdyb3VwXVtzdGF0ZT1cIiR7IHRoaXMubmFtZSB9XCJdYCApXHJcbiAgICAgICAgZ3JvdXBzLmZvckVhY2goICggZ3JvdXA6IEhUTUxFbGVtZW50ICkgPT4gdGhpcy5yZWxvYWRWYXN0YXRlUHJpbnRzKCBncm91cCApIClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHZhbHVlIHRoYXQgd2lsbCBiZSBwcmludGVkIGluIFZhc3RhdGUgcHJpbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdmFzdGF0ZVByaW50XHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VmFzdGF0ZVByaW50VmFsdWUoIHZhc3RhdGVQcmludDogSFRNTEVsZW1lbnQsIHZhbHVlID0gdGhpcy5nZXQoKSApIHtcclxuICAgICAgICBpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiAhIHZhc3RhdGVQcmludC5oYXNBdHRyaWJ1dGUoICdvYmonICkgKSB7XHJcblxyXG4gICAgICAgICAgICBWYXN0YXRlLnRocm93RXJyb3IoICdZb3UgYXJlIHRyeWluZyB0byBwcmludCBhbiBvYmplY3Qgd2l0aG91dCBwYXNzaW5nIG9iaiBhdHRyaWJ1dGUgaW4gdmFzdGF0ZSBwcmludCcsIHZhc3RhdGVQcmludCApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIE9iamVjdC5rZXlzKCB2YWx1ZSApLmxlbmd0aCA+IDAgPyB2YWx1ZVt2YXN0YXRlUHJpbnQuZ2V0QXR0cmlidXRlKCAnb2JqJyApLnRvU3RyaW5nKCkgPz8gT2JqZWN0LmtleXMoIHRoaXMuZ2V0KCkgKVswXV0gOiB2YWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHRocm93RXJyb3IoIGVycm9yOiBzdHJpbmcsIGVsZW1lbnQ/OiBIVE1MRWxlbWVudCApIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmQgPSBcImhzbGEoMCwwJSw5MCUsMSlcIlxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuY29sb3IgPSBcImhzbGEoMCwwJSwxMCUsLjkpXCJcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmZvbnRGYW1pbHkgPSBcImFyaWFsXCJcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgIDxoMT5WYXN0YXRlIEpTIEVycm9yPC9oMT5cclxuICAgICAgICAgICAgICAgIDxzdHJvbmc+JHsgZXJyb3IgfTwvc3Ryb25nPlxyXG4gICAgICAgICAgICAgICAgPGJyPlxyXG4gICAgICAgICAgICAgICAgJHsgZWxlbWVudCA/IGBcclxuICAgICAgICAgICAgICAgIDxzdHJvbmc+SGVscGZ1bCBJbmZvOjwvc3Ryb25nPlxyXG4gICAgICAgICAgICAgICAgPGJyPlxyXG4gICAgICAgICAgICAgICAgPGJyPlxyXG4gICAgICAgICAgICAgICAgPHByZSAgc3R5bGU9XCIgIGJhY2tncm91bmQ6ICMyNjI2MjY7IGNvbG9yOndoaXRlO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIHBhZGRpbmc6IDFyZW07XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1wiPlxyXG4gICAgICAgICAgICAgICAgPGNvZGU+JHsgZWxlbWVudC5vdXRlckhUTUwuc3BsaXQoICc8JyApLmpvaW4oICcmbHQ7JyApLnNwbGl0KCAnPicgKS5qb2luKCAnJmd0OycgKSB9PC9jb2RlPlxyXG4gICAgICAgICAgICAgICAgPC9wcmU+YCA6IGBgIH0gICAgICAgICAgICBcclxuYFxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoIGBWYXN0YXRlIEpTIEVycm9yOiAkeyBlcnJvciB9YCApXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNldFZhc3RhdGVFYWNoKCB2YXN0YXRlRWFjaDogSFRNTEVsZW1lbnQgKTogdm9pZCB7XHJcbiAgICAgICAgLy8gcmVtb3ZlIHByZWxvYWRlciBmcm9tIHRoZSBwYWdlXHJcbiAgICAgICAgdmFzdGF0ZUVhY2guaW5uZXJIVE1MID0gdmFzdGF0ZUVhY2guaW5uZXJIVE1MLnNwbGl0KCB0aGlzLmxvYWRpbmdUZW1wbGF0ZSApLmpvaW4oICcnIClcclxuICAgICAgICAvLyByZW1vdmUgYWxsIGNoaWxkcmVuIGV4Y2VwdCBmaXJzdCBvbmVcclxuICAgICAgICB2YXN0YXRlRWFjaC5xdWVyeVNlbGVjdG9yQWxsKCAnKiArIConICkuZm9yRWFjaCggKCBlOiBIVE1MRWxlbWVudCApID0+IGUucmVtb3ZlKCkgKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHZhc3RhdGVFYWNoLmNoaWxkcmVuWzBdPy5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBsb2FkaW5nIHRlbXBsYXRlIGZvciBzcGVjaWZpYyBzdGF0ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZVxyXG4gICAgICogQHJldHVybiB0aGlzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRMb2FkaW5nVGVtcGxhdGUoIHRlbXBsYXRlOiBzdHJpbmcgKTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nVGVtcGxhdGUgPSB0ZW1wbGF0ZVxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjaGFuZ2UgY3VycmVudCBzYXZlIG1vZGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gc2F2ZU1vZGVcclxuICAgICAqIEByZXR1cm4gdGhpc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U2F2ZU1vZGUoIHNhdmVNb2RlOiBzYXZlTW9kZSApOiB0aGlzIHtcclxuICAgICAgICB0aGlzLnNhdmVNb2RlID0gc2F2ZU1vZGVcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IGN1cnJlbnQgc2F2ZSBtb2RlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBzYXZlTW9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U2F2ZU1vZGUoKTogc2F2ZU1vZGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNhdmVNb2RlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzYXZlIGN1cnJlbnQgc3RhdGUgdG8gbG9jYWxTdG9yYWdlL3Nlc3Npb25TdG9yYWdlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB0aGlzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzYXZlKCk6IHRoaXMge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdHlwZW9mIHRoaXMuZ2V0KCkgPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheSggdGhpcy5nZXQoKSApID8gSlNPTi5zdHJpbmdpZnkoIHRoaXMuZ2V0KCkgKSA6IHRoaXMuZ2V0KCkudG9TdHJpbmcoKTtcclxuICAgICAgICBzd2l0Y2ggKCB0aGlzLmdldFNhdmVNb2RlKCkgKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJsb2NhbFN0b3JhZ2VcIjpcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCB0aGlzLm5hbWUsIHZhbHVlIClcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgXCJzZXNzaW9uU3RvcmFnZVwiOlxyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSggdGhpcy5uYW1lLCB2YWx1ZSApXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgVmFzdGF0ZS50aHJvd0Vycm9yKCAnVW5zdXBwb3J0ZWQgc2F2ZSBtb2RlOiAnICsgdGhpcy5nZXRTYXZlTW9kZSgpIClcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXN0b3JlIHRoZSBzdGF0ZSBmcm9tIGxvY2FsU3RvcmFnZS9zZXNzaW9uU3RvcmFnZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gdGhpc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzdG9yZSgpOiB0aGlzIHtcclxuICAgICAgICBzd2l0Y2ggKCB0aGlzLmdldFNhdmVNb2RlKCkgKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJsb2NhbFN0b3JhZ2VcIjpcclxuICAgICAgICAgICAgICAgIGlmICggbG9jYWxTdG9yYWdlLmdldEl0ZW0oIHRoaXMubmFtZSApIClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldCggSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSggdGhpcy5uYW1lICkpIClcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgXCJzZXNzaW9uU3RvcmFnZVwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKCBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCB0aGlzLm5hbWUgKSApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXQoIEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSggdGhpcy5uYW1lICkpIClcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBWYXN0YXRlLnRocm93RXJyb3IoICdVbnN1cHBvcnRlZCBzYXZlIG1vZGU6ICcgKyB0aGlzLmdldFNhdmVNb2RlKCkgKVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBWYXN0YXRlXHJcbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBpZiAod2luZG93LlZhc3RhdGUpIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdmFyIFZhc3RhdGUgPSB3aW5kb3cuVmFzdGF0ZS5kZWZhdWx0O1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBkZWxldGUgd2luZG93LlZhc3RhdGU7XHJcbiAgICB9XHJcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=