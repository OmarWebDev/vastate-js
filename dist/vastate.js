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
        this.value = value;
        this.name = name;
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
     * Set loading template
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
        console.log(this.value, this.previousValue);
        return this;
    }
    /**
     * Reload the DOM when value or loading state is changed
     *
     * @private
     */
    reloadDom() {
        this.reloadVastatePrints();
        this.reloadVastateGroups();
        this.reloadVastateEachs();
    }
    /**
     * Reload all vastate-print tags/attribute
     * in the DOM
     *
     * @private
     */
    reloadVastatePrints(parent = document.body) {
        const vastatePrints = parent.querySelectorAll(parent.hasAttribute('vastate-print-group') || parent.tagName.toLowerCase() == "vastate-print-group" ? `vastate-print:not(vastate-print[state]), [vastate-print]:not([vastate-print][state])` : `vastate-print[state="${this.name}"], [vastate-print][state="${this.name}"]:not([vastate-group])`);
        vastatePrints.forEach((vastatePrint) => {
            if (this.isLoading) {
                vastatePrint.innerHTML += Vastate.loadingTemplate;
            }
            else {
                vastatePrint.innerHTML = vastatePrint.innerHTML.split(Vastate.loadingTemplate).join('');
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
            while (vastateEach.children.length > 1) {
                vastateEach.removeChild(vastateEach.lastElementChild);
            }
            const stateValueArr = Array.isArray(this.get()) ? this.get() : [];
            if (stateValueArr.length < 1) {
                if (!this.isLoading) {
                    // TODO: Create function to reset vastate-each
                    return;
                }
                vastateEach.innerHTML += Vastate.loadingTemplate;
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
                <strong>Helpful Info:</strong>
                <br>
                <br>
                <pre  style="  background: #262626; color:white;
  font-weight: bold;
  padding: 1rem;
  border-radius: 6px;">
                <code>${element.outerHTML.split('<').join('&lt;').split('>').join('&gt;')}</code>
                </pre>            
`;
        throw new TypeError(`Vastate JS Error: ${error}`);
    }
    resetVastateEach(vastateEach) {
        // remove preloader from the page
        vastateEach.innerHTML = vastateEach.innerHTML.split(Vastate.loadingTemplate).join('');
        // remove all children except first one
        vastateEach.querySelectorAll('* + *').forEach((e) => e.remove());
    }
}
// apply vastate class to window so it can be
// called globally via 'window.Vastate' or Vastate
window.Vastate = Vastate;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vastate);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxTQUFTLENBQUMsS0FBSyxDQUFFLEdBQUcsQ0FBRSxDQUFDLElBQUksQ0FBRSxNQUFNLENBQUUsQ0FBQyxLQUFLLENBQUUsR0FBRyxDQUFFLENBQUMsSUFBSSxDQUFFLE1BQU0sQ0FBRzs7Q0FFbEc7UUFDTyxNQUFNLElBQUksU0FBUyxDQUFFLHFCQUFzQixLQUFNLEVBQUUsQ0FBRTtJQUN6RCxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsV0FBd0I7UUFDN0MsaUNBQWlDO1FBQ2pDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBRSxDQUFDLElBQUksQ0FBRSxFQUFFLENBQUU7UUFDekYsdUNBQXVDO1FBQ3ZDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBRSxPQUFPLENBQUUsQ0FBQyxPQUFPLENBQUUsQ0FBRSxDQUFjLEVBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBRTtJQUN2RixDQUFDO0NBQ0o7QUFTRCw2Q0FBNkM7QUFDN0Msa0RBQWtEO0FBQ2xELE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTztBQUV4QixpRUFBZSxPQUFPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmFzdGF0ZS1qcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92YXN0YXRlLWpzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92YXN0YXRlLWpzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdmFzdGF0ZS1qcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Zhc3RhdGUtanMvLi9zcmMvdmFzdGF0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxuICogTmFtZTogVmFzdGF0ZS5qc1xuICogVmVyc2lvbjogMS4wXG4gKiBMaWNlbnNlOiBNSVRcbiAqL1xudHlwZSB2YXN0YXRlVmFsdWUgPSBzdHJpbmcgfCBudW1iZXIgfCBhbnlbXSB8IGJvb2xlYW4gfCBudWxsXG5cbmNsYXNzIFZhc3RhdGUge1xuXG4gICAgLyoqXG4gICAgICogU3RhdGUgdmFsdWVcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSB2YWx1ZTogdmFzdGF0ZVZhbHVlXG5cbiAgICAvKipcbiAgICAgKiBQbGFjZWhvbGRlciB0aGF0IHdpbGwgYmUgcmVwbGFjZWQgd2l0aFxuICAgICAqIFN0YXRlIHZhbHVlIHdoZW4gc2hvd2VkIGluIEhUTUxcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBwbGFjZWhvbGRlcjogYW55ID0gJ3sjVkFMVUUjfSdcblxuICAgIC8qKlxuICAgICAqIFN0YXRlIHByZXZpb3VzVmFsdWVcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBwcmV2aW91c1ZhbHVlOiB2YXN0YXRlVmFsdWUgPSB0aGlzLnBsYWNlaG9sZGVyXG5cbiAgICAvKipcbiAgICAgKiBTdGF0ZSBOYW1lXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbmFtZTogc3RyaW5nXG5cbiAgICAvKipcbiAgICAgKiBMb2FkaW5nIHN0YXR1c1xuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGlzTG9hZGluZzogYm9vbGVhbiA9IGZhbHNlXG5cbiAgICAvKipcbiAgICAgKiBMb2FkaW5nIFRlbXBsYXRlXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIGxvYWRpbmdUZW1wbGF0ZTogc3RyaW5nXG5cbiAgICAvKipcbiAgICAgKiBTZXQgbG9hZGluZyBzdGF0dXNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsb2FkaW5nXG4gICAgICogQHJldHVybiB0aGlzXG4gICAgICovXG4gICAgc2V0TG9hZGluZyggbG9hZGluZzogYm9vbGVhbiApOiB0aGlzIHtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBsb2FkaW5nXG4gICAgICAgIHRoaXMucmVsb2FkRG9tKClcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgbG9hZGluZyB0ZW1wbGF0ZVxuICAgICAqXG4gICAgICogQHBhcmFtIGxvYWRpbmdUZW1wbGF0ZVxuICAgICAqL1xuICAgIHN0YXRpYyBzZXRMb2FkaW5nVGVtcGxhdGUoIGxvYWRpbmdUZW1wbGF0ZTogc3RyaW5nICkge1xuICAgICAgICB0aGlzLmxvYWRpbmdUZW1wbGF0ZSA9IGxvYWRpbmdUZW1wbGF0ZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgbmV3IHN0YXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCBuYW1lOiBzdHJpbmcsIHZhbHVlOiB2YXN0YXRlVmFsdWUgKSB7XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICAgICAgdGhpcy5yZWxvYWREb20oKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBjdXJyZW50IHN0YXRlIHZhbHVlXG4gICAgICovXG4gICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBzdGF0ZSB2YWx1ZVxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybiB0aGlzXG4gICAgICovXG4gICAgc2V0KCB2YWx1ZTogdmFzdGF0ZVZhbHVlICk6IHRoaXMge1xuICAgICAgICBpZiAoIHRoaXMudmFsdWUgIT0gdGhpcy5wcmV2aW91c1ZhbHVlIClcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IHRoaXMudmFsdWVcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlXG4gICAgICAgIHRoaXMucmVsb2FkRG9tKClcbiAgICAgICAgY29uc29sZS5sb2coIHRoaXMudmFsdWUsIHRoaXMucHJldmlvdXNWYWx1ZSApXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVsb2FkIHRoZSBET00gd2hlbiB2YWx1ZSBvciBsb2FkaW5nIHN0YXRlIGlzIGNoYW5nZWRcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSByZWxvYWREb20oKSB7XG4gICAgICAgIHRoaXMucmVsb2FkVmFzdGF0ZVByaW50cygpXG4gICAgICAgIHRoaXMucmVsb2FkVmFzdGF0ZUdyb3VwcygpXG4gICAgICAgIHRoaXMucmVsb2FkVmFzdGF0ZUVhY2hzKClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWxvYWQgYWxsIHZhc3RhdGUtcHJpbnQgdGFncy9hdHRyaWJ1dGVcbiAgICAgKiBpbiB0aGUgRE9NXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgcmVsb2FkVmFzdGF0ZVByaW50cyhwYXJlbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICBjb25zdCB2YXN0YXRlUHJpbnRzID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGFyZW50Lmhhc0F0dHJpYnV0ZSgndmFzdGF0ZS1wcmludC1ncm91cCcpIHx8IHBhcmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT0gXCJ2YXN0YXRlLXByaW50LWdyb3VwXCIgPyBgdmFzdGF0ZS1wcmludDpub3QodmFzdGF0ZS1wcmludFtzdGF0ZV0pLCBbdmFzdGF0ZS1wcmludF06bm90KFt2YXN0YXRlLXByaW50XVtzdGF0ZV0pYCA6IGB2YXN0YXRlLXByaW50W3N0YXRlPVwiJHsgdGhpcy5uYW1lIH1cIl0sIFt2YXN0YXRlLXByaW50XVtzdGF0ZT1cIiR7IHRoaXMubmFtZSB9XCJdOm5vdChbdmFzdGF0ZS1ncm91cF0pYCApXG4gICAgICAgIHZhc3RhdGVQcmludHMuZm9yRWFjaCggKCB2YXN0YXRlUHJpbnQ6IEhUTUxFbGVtZW50ICkgPT4ge1xuICAgICAgICAgICAgaWYgKCB0aGlzLmlzTG9hZGluZyApIHtcbiAgICAgICAgICAgICAgICB2YXN0YXRlUHJpbnQuaW5uZXJIVE1MICs9IFZhc3RhdGUubG9hZGluZ1RlbXBsYXRlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhc3RhdGVQcmludC5pbm5lckhUTUwgPSB2YXN0YXRlUHJpbnQuaW5uZXJIVE1MLnNwbGl0KCBWYXN0YXRlLmxvYWRpbmdUZW1wbGF0ZSApLmpvaW4oICcnIClcbiAgICAgICAgICAgICAgICBpZiAoIHZhc3RhdGVQcmludC5oYXNBdHRyaWJ1dGUoICdodG1sJyApICkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhc3RhdGVQcmludC5pbm5lckhUTUwgPSB2YXN0YXRlUHJpbnQuaW5uZXJIVE1MLnNwbGl0KCB0aGlzLnByZXZpb3VzVmFsdWUudG9TdHJpbmcoKSApLmpvaW4oIHRoaXMuZ2V0VmFzdGF0ZVByaW50VmFsdWUoIHZhc3RhdGVQcmludCApIClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXN0YXRlUHJpbnQudGV4dENvbnRlbnQgPSB2YXN0YXRlUHJpbnQudGV4dENvbnRlbnQuc3BsaXQoIHRoaXMucHJldmlvdXNWYWx1ZS50b1N0cmluZygpICkuam9pbiggdGhpcy5nZXRWYXN0YXRlUHJpbnRWYWx1ZSggdmFzdGF0ZVByaW50ICkgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSApXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVsb2FkIGFsbCB2YXN0YXRlLWVhY2ggdGFncy9hdHRyaWJ1dGVcbiAgICAgKiBpbiB0aGUgRE9NXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgcmVsb2FkVmFzdGF0ZUVhY2hzKHBhcmVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIGNvbnN0IHZhc3RhdGVFYWNocyA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCBgdmFzdGF0ZS1lYWNoW3N0YXRlPVwiJHsgdGhpcy5uYW1lIH1cIl0sIFt2YXN0YXRlLWVhY2hdW3N0YXRlPVwiJHsgdGhpcy5uYW1lIH1cIl1gIClcbiAgICAgICAgdmFzdGF0ZUVhY2hzLmZvckVhY2goICggdmFzdGF0ZUVhY2g6IEhUTUxFbGVtZW50ICkgPT4ge1xuICAgICAgICAgICAgd2hpbGUgKCB2YXN0YXRlRWFjaC5jaGlsZHJlbi5sZW5ndGggPiAxICkge1xuICAgICAgICAgICAgICAgIHZhc3RhdGVFYWNoLnJlbW92ZUNoaWxkKCB2YXN0YXRlRWFjaC5sYXN0RWxlbWVudENoaWxkIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN0YXRlVmFsdWVBcnI6IGFueSA9IEFycmF5LmlzQXJyYXkoIHRoaXMuZ2V0KCkgKSA/IHRoaXMuZ2V0KCkgOiBbXVxuXG4gICAgICAgICAgICBpZiAoIHN0YXRlVmFsdWVBcnIubGVuZ3RoIDwgMSApIHtcbiAgICAgICAgICAgICAgICBpZiAoICEgdGhpcy5pc0xvYWRpbmcgKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IENyZWF0ZSBmdW5jdGlvbiB0byByZXNldCB2YXN0YXRlLWVhY2hcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhc3RhdGVFYWNoLmlubmVySFRNTCArPSBWYXN0YXRlLmxvYWRpbmdUZW1wbGF0ZVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhdGVWYWx1ZUFycj8uZm9yRWFjaCggKCB2YWw6IGFueSApID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdENoaWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggYHZhc3RhdGUtZWFjaFtzdGF0ZT1cIiR7IHRoaXMubmFtZSB9XCJdID4gKiwgW3Zhc3RhdGUtZWFjaF1bc3RhdGU9XCIkeyB0aGlzLm5hbWUgfVwiXSA+ICpgIClcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZTogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQgPSBmaXJzdENoaWxkPy5jbG9uZU5vZGUoIHRydWUgKSBhcyBIVE1MRWxlbWVudFxuXG4gICAgICAgICAgICAgICAgZmlyc3RDaGlsZD8uc2V0QXR0cmlidXRlKCAnaGlkZGVuJywgJ3RydWUnIClcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZS5yZW1vdmVBdHRyaWJ1dGUoICdoaWRkZW4nIClcbiAgICAgICAgICAgICAgICBpZiAoIHRlbXBsYXRlLnRhZ05hbWUudG9Mb2NhbGVMb3dlckNhc2UoKSA9PSBcInZhc3RhdGUtcHJpbnRcIiB8fCB0ZW1wbGF0ZS5oYXNBdHRyaWJ1dGUoICd2YXN0YXRlLXByaW50JyApICkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZS5pbm5lckhUTUw/LnNwbGl0KCB0aGlzLnBsYWNlaG9sZGVyICkuam9pbiggdGhpcy5nZXRWYXN0YXRlUHJpbnRWYWx1ZSggdGVtcGxhdGUsIHZhbCApIClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZT8ucXVlcnlTZWxlY3RvckFsbCggJ3Zhc3RhdGUtcHJpbnQsIFt2YXN0YXRlLXByaW50XScgKS5mb3JFYWNoKCAoIHByOiBIVE1MRWxlbWVudCApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByLnJlbW92ZUF0dHJpYnV0ZSggJ2hpZGRlbicgKVxuICAgICAgICAgICAgICAgICAgICAgICAgcHIuaW5uZXJIVE1MID0gcHIuaW5uZXJIVE1MPy5zcGxpdCggdGhpcy5wbGFjZWhvbGRlciApLmpvaW4oIHRoaXMuZ2V0VmFzdGF0ZVByaW50VmFsdWUoIHByLCB2YWwgKSApXG5cbiAgICAgICAgICAgICAgICAgICAgfSApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhc3RhdGVFYWNoLmFwcGVuZENoaWxkKCB0ZW1wbGF0ZSApXG4gICAgICAgICAgICB9IClcbiAgICAgICAgfSApXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWxvYWRWYXN0YXRlR3JvdXBzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBncm91cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihgdmFzdGF0ZS1wcmludC1ncm91cFtzdGF0ZT1cIiR7dGhpcy5uYW1lfVwiXSwgW3Zhc3RhdGUtcHJpbnQtZ3JvdXBdW3N0YXRlPVwiJHt0aGlzLm5hbWV9XCJdYClcbiAgICAgICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwOiBIVE1MRWxlbWVudCkgPT4gdGhpcy5yZWxvYWRWYXN0YXRlUHJpbnRzKGdyb3VwKSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB2YWx1ZSB0aGF0IHdpbGwgYmUgcHJpbnRlZCBpbiBWYXN0YXRlIHByaW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFzdGF0ZVByaW50XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFZhc3RhdGVQcmludFZhbHVlKCB2YXN0YXRlUHJpbnQ6IEhUTUxFbGVtZW50LCB2YWx1ZSA9IHRoaXMuZ2V0KCkgKSB7XG4gICAgICAgIGlmICggdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmICEgdmFzdGF0ZVByaW50Lmhhc0F0dHJpYnV0ZSggJ29iaicgKSApIHtcblxuICAgICAgICAgICAgVmFzdGF0ZS50aHJvd0Vycm9yKCAnWW91IGFyZSB0cnlpbmcgdG8gcHJpbnQgYW4gb2JqZWN0IHdpdGhvdXQgcGFzc2luZyBvYmogYXR0cmlidXRlIGluIHZhc3RhdGUgcHJpbnQnLCB2YXN0YXRlUHJpbnQgKVxuICAgICAgICB9XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiBPYmplY3Qua2V5cyggdmFsdWUgKS5sZW5ndGggPiAwID8gdmFsdWVbdmFzdGF0ZVByaW50LmdldEF0dHJpYnV0ZSggJ29iaicgKS50b1N0cmluZygpID8/IE9iamVjdC5rZXlzKCB0aGlzLmdldCgpIClbMF1dIDogdmFsdWVcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyB0aHJvd0Vycm9yKCBlcnJvcjogc3RyaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCApIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJoc2xhKDAsMCUsOTAlLDEpXCJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5jb2xvciA9IFwiaHNsYSgwLDAlLDEwJSwuOSlcIlxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmZvbnRGYW1pbHkgPSBcImFyaWFsXCJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgPGgxPlZhc3RhdGUgSlMgRXJyb3I8L2gxPlxuICAgICAgICAgICAgICAgIDxzdHJvbmc+JHsgZXJyb3IgfTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPkhlbHBmdWwgSW5mbzo8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICAgIDxwcmUgIHN0eWxlPVwiICBiYWNrZ3JvdW5kOiAjMjYyNjI2OyBjb2xvcjp3aGl0ZTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcIj5cbiAgICAgICAgICAgICAgICA8Y29kZT4keyBlbGVtZW50Lm91dGVySFRNTC5zcGxpdCggJzwnICkuam9pbiggJyZsdDsnICkuc3BsaXQoICc+JyApLmpvaW4oICcmZ3Q7JyApIH08L2NvZGU+XG4gICAgICAgICAgICAgICAgPC9wcmU+ICAgICAgICAgICAgXG5gXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoIGBWYXN0YXRlIEpTIEVycm9yOiAkeyBlcnJvciB9YCApXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldFZhc3RhdGVFYWNoKHZhc3RhdGVFYWNoOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICAvLyByZW1vdmUgcHJlbG9hZGVyIGZyb20gdGhlIHBhZ2VcbiAgICAgICAgdmFzdGF0ZUVhY2guaW5uZXJIVE1MID0gdmFzdGF0ZUVhY2guaW5uZXJIVE1MLnNwbGl0KCBWYXN0YXRlLmxvYWRpbmdUZW1wbGF0ZSApLmpvaW4oICcnIClcbiAgICAgICAgLy8gcmVtb3ZlIGFsbCBjaGlsZHJlbiBleGNlcHQgZmlyc3Qgb25lXG4gICAgICAgIHZhc3RhdGVFYWNoLnF1ZXJ5U2VsZWN0b3JBbGwoICcqICsgKicgKS5mb3JFYWNoKCAoIGU6IEhUTUxFbGVtZW50ICkgPT4gZS5yZW1vdmUoKSApXG4gICAgfVxufVxuXG4vLyBleHRlbmQgd2luZG93IGludGVyZmFjZVxuZGVjbGFyZSBnbG9iYWwge1xuICAgIGludGVyZmFjZSBXaW5kb3cge1xuICAgICAgICBWYXN0YXRlOiBhbnlcbiAgICB9XG59XG5cbi8vIGFwcGx5IHZhc3RhdGUgY2xhc3MgdG8gd2luZG93IHNvIGl0IGNhbiBiZVxuLy8gY2FsbGVkIGdsb2JhbGx5IHZpYSAnd2luZG93LlZhc3RhdGUnIG9yIFZhc3RhdGVcbndpbmRvdy5WYXN0YXRlID0gVmFzdGF0ZVxuXG5leHBvcnQgZGVmYXVsdCBWYXN0YXRlIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9