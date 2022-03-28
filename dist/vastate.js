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
        this.reloadVastateEachs();
    }
    /**
     * Reload all vastate-print tags/attribute
     * in the DOM
     *
     * @private
     */
    reloadVastatePrints() {
        const vastatePrints = document.querySelectorAll(`vastate-print[state="${this.name}"], [vastate-print][state="${this.name}"]`);
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
    reloadVastateEachs() {
        const vastateEachs = document.querySelectorAll(`vastate-each[state="${this.name}"], [vastate-each][state="${this.name}"]`);
        vastateEachs.forEach((vastateEach) => {
            while (vastateEach.children.length > 1) {
                vastateEach.removeChild(vastateEach.lastElementChild);
            }
            const stateValueArr = Array.isArray(this.get()) ? this.get() : [];
            if (stateValueArr.length < 1) {
                if (!this.isLoading) {
                    // remove preloader from the page
                    vastateEach.innerHTML = vastateEach.innerHTML.split(Vastate.loadingTemplate).join('');
                    // remove all children except first one
                    vastateEach.querySelectorAll('* + *').forEach((e) => e.remove());
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
            document.body.style.background = "hsla(0,0%,90%,1)";
            document.body.style.color = "hsla(0,0%,10%,.9)";
            document.body.style.fontFamily = "arial";
            document.body.innerHTML = `
                
                <h1>Vastate JS Error</h1>
                <strong>You are trying to print an object without passing obj attribute in vastate print</strong>
                <br>
                <strong>Helpful Info:</strong>
                <br>
                <br>
                <pre  style="  background: #262626; color:white;
  font-weight: bold;
  padding: 1rem;
  border-radius: 6px;">
                <code>${vastatePrint.outerHTML.split('<').join('&lt;').split('>').join('&gt;')}</code>
                </pre>            
`;
            return value;
        }
        // @ts-ignore
        return typeof value === "object" && Object.keys(value).length > 0 ? value[(_a = vastatePrint.getAttribute('obj').toString()) !== null && _a !== void 0 ? _a : Object.keys(this.get())[0]] : value;
    }
}
// apply vastate class to window so it can be
// called globally via 'window.Vastate' or Vastate
window.Vastate = Vastate;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vastate);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBRSxZQUF5QixFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFOztRQUN2RSxJQUFLLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxDQUFFLFlBQVksQ0FBQyxZQUFZLENBQUUsS0FBSyxDQUFFLEVBQUc7WUFDckUsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLGtCQUFrQjtZQUNuRCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsbUJBQW1CO1lBQy9DLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxPQUFPO1lBQ3hDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHOzs7Ozs7Ozs7Ozs7d0JBWWIsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUUsR0FBRyxDQUFFLENBQUMsSUFBSSxDQUFFLE1BQU0sQ0FBRSxDQUFDLEtBQUssQ0FBRSxHQUFHLENBQUUsQ0FBQyxJQUFJLENBQUUsTUFBTSxDQUFHOztDQUV2RztZQUNXLE9BQU8sS0FBSztTQUNmO1FBQ0QsYUFBYTtRQUNiLE9BQU8sT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUUsS0FBSyxDQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGtCQUFZLENBQUMsWUFBWSxDQUFFLEtBQUssQ0FBRSxDQUFDLFFBQVEsRUFBRSxtQ0FBSSxNQUFNLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7SUFDdEssQ0FBQztDQUNKO0FBU0QsNkNBQTZDO0FBQzdDLGtEQUFrRDtBQUNsRCxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU87QUFFeEIsaUVBQWUsT0FBTyIsInNvdXJjZXMiOlsid2VicGFjazovL3Zhc3RhdGUtanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmFzdGF0ZS1qcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdmFzdGF0ZS1qcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Zhc3RhdGUtanMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92YXN0YXRlLWpzLy4vc3JjL3Zhc3RhdGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcbiAqIE5hbWU6IFZhc3RhdGUuanNcbiAqIFZlcnNpb246IDEuMFxuICogTGljZW5zZTogTUlUXG4gKi9cbnR5cGUgdmFzdGF0ZVZhbHVlID0gc3RyaW5nIHwgbnVtYmVyIHwgYW55W10gfCBib29sZWFuIHwgbnVsbFxuXG5jbGFzcyBWYXN0YXRlIHtcbiAgICAvKipcbiAgICAgKiBTdGF0ZSB2YWx1ZVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIHZhbHVlOiB2YXN0YXRlVmFsdWVcbiAgICAvKipcbiAgICAgKiBQbGFjZWhvbGRlciB0aGF0IHdpbGwgYmUgcmVwbGFjZWQgd2l0aFxuICAgICAqIFN0YXRlIHZhbHVlIHdoZW4gc2hvd2VkIGluIEhUTUxcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBwbGFjZWhvbGRlcjogYW55ID0gJ3sjVkFMVUUjfSdcbiAgICAvKipcbiAgICAgKiBTdGF0ZSBwcmV2aW91c1ZhbHVlXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgcHJldmlvdXNWYWx1ZTogdmFzdGF0ZVZhbHVlID0gdGhpcy5wbGFjZWhvbGRlclxuICAgIC8qKlxuICAgICAqIFN0YXRlIE5hbWVcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBuYW1lOiBzdHJpbmdcbiAgICAvKipcbiAgICAgKiBMb2FkaW5nIHN0YXR1c1xuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGlzTG9hZGluZzogYm9vbGVhbiA9IGZhbHNlXG4gICAgLyoqXG4gICAgICogTG9hZGluZyBUZW1wbGF0ZVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBsb2FkaW5nVGVtcGxhdGU6IHN0cmluZ1xuXG4gICAgLyoqXG4gICAgICogU2V0IGxvYWRpbmcgc3RhdHVzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbG9hZGluZ1xuICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAqL1xuICAgIHNldExvYWRpbmcoIGxvYWRpbmc6IGJvb2xlYW4gKTogdGhpcyB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gbG9hZGluZ1xuICAgICAgICB0aGlzLnJlbG9hZERvbSgpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGxvYWRpbmcgdGVtcGxhdGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsb2FkaW5nVGVtcGxhdGVcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0TG9hZGluZ1RlbXBsYXRlKCBsb2FkaW5nVGVtcGxhdGU6IHN0cmluZyApIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nVGVtcGxhdGUgPSBsb2FkaW5nVGVtcGxhdGVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIG5ldyBzdGF0ZVxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciggbmFtZTogc3RyaW5nLCB2YWx1ZTogdmFzdGF0ZVZhbHVlICkge1xuXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgICAgIHRoaXMucmVsb2FkRG9tKClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgY3VycmVudCBzdGF0ZSB2YWx1ZVxuICAgICAqL1xuICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgc3RhdGUgdmFsdWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAqL1xuICAgIHNldCggdmFsdWU6IHZhc3RhdGVWYWx1ZSApOiB0aGlzIHtcbiAgICAgICAgaWYgKCB0aGlzLnZhbHVlICE9IHRoaXMucHJldmlvdXNWYWx1ZSApXG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzVmFsdWUgPSB0aGlzLnZhbHVlXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxuICAgICAgICB0aGlzLnJlbG9hZERvbSgpXG4gICAgICAgIGNvbnNvbGUubG9nKCB0aGlzLnZhbHVlLCB0aGlzLnByZXZpb3VzVmFsdWUgKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbG9hZCB0aGUgRE9NIHdoZW4gdmFsdWUgb3IgbG9hZGluZyBzdGF0ZSBpcyBjaGFuZ2VkXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgcmVsb2FkRG9tKCkge1xuICAgICAgICB0aGlzLnJlbG9hZFZhc3RhdGVQcmludHMoKVxuICAgICAgICB0aGlzLnJlbG9hZFZhc3RhdGVFYWNocygpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVsb2FkIGFsbCB2YXN0YXRlLXByaW50IHRhZ3MvYXR0cmlidXRlXG4gICAgICogaW4gdGhlIERPTVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlbG9hZFZhc3RhdGVQcmludHMoKSB7XG4gICAgICAgIGNvbnN0IHZhc3RhdGVQcmludHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCBgdmFzdGF0ZS1wcmludFtzdGF0ZT1cIiR7IHRoaXMubmFtZSB9XCJdLCBbdmFzdGF0ZS1wcmludF1bc3RhdGU9XCIkeyB0aGlzLm5hbWUgfVwiXWAgKVxuICAgICAgICB2YXN0YXRlUHJpbnRzLmZvckVhY2goICggdmFzdGF0ZVByaW50OiBIVE1MRWxlbWVudCApID0+IHtcbiAgICAgICAgICAgIGlmICggdGhpcy5pc0xvYWRpbmcgKSB7XG4gICAgICAgICAgICAgICAgdmFzdGF0ZVByaW50LmlubmVySFRNTCArPSBWYXN0YXRlLmxvYWRpbmdUZW1wbGF0ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXN0YXRlUHJpbnQuaW5uZXJIVE1MID0gdmFzdGF0ZVByaW50LmlubmVySFRNTC5zcGxpdCggVmFzdGF0ZS5sb2FkaW5nVGVtcGxhdGUgKS5qb2luKCAnJyApXG4gICAgICAgICAgICAgICAgaWYgKCB2YXN0YXRlUHJpbnQuaGFzQXR0cmlidXRlKCAnaHRtbCcgKSApIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXN0YXRlUHJpbnQuaW5uZXJIVE1MID0gdmFzdGF0ZVByaW50LmlubmVySFRNTC5zcGxpdCggdGhpcy5wcmV2aW91c1ZhbHVlLnRvU3RyaW5nKCkgKS5qb2luKCB0aGlzLmdldFZhc3RhdGVQcmludFZhbHVlKCB2YXN0YXRlUHJpbnQgKSApXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFzdGF0ZVByaW50LnRleHRDb250ZW50ID0gdmFzdGF0ZVByaW50LnRleHRDb250ZW50LnNwbGl0KCB0aGlzLnByZXZpb3VzVmFsdWUudG9TdHJpbmcoKSApLmpvaW4oIHRoaXMuZ2V0VmFzdGF0ZVByaW50VmFsdWUoIHZhc3RhdGVQcmludCApIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbG9hZCBhbGwgdmFzdGF0ZS1lYWNoIHRhZ3MvYXR0cmlidXRlXG4gICAgICogaW4gdGhlIERPTVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlbG9hZFZhc3RhdGVFYWNocygpIHtcbiAgICAgICAgY29uc3QgdmFzdGF0ZUVhY2hzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggYHZhc3RhdGUtZWFjaFtzdGF0ZT1cIiR7IHRoaXMubmFtZSB9XCJdLCBbdmFzdGF0ZS1lYWNoXVtzdGF0ZT1cIiR7IHRoaXMubmFtZSB9XCJdYCApXG4gICAgICAgIHZhc3RhdGVFYWNocy5mb3JFYWNoKCAoIHZhc3RhdGVFYWNoOiBIVE1MRWxlbWVudCApID0+IHtcbiAgICAgICAgICAgIHdoaWxlICggdmFzdGF0ZUVhY2guY2hpbGRyZW4ubGVuZ3RoID4gMSApIHtcbiAgICAgICAgICAgICAgICB2YXN0YXRlRWFjaC5yZW1vdmVDaGlsZCggdmFzdGF0ZUVhY2gubGFzdEVsZW1lbnRDaGlsZCApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzdGF0ZVZhbHVlQXJyOiBhbnkgPSBBcnJheS5pc0FycmF5KCB0aGlzLmdldCgpICkgPyB0aGlzLmdldCgpIDogW11cblxuICAgICAgICAgICAgaWYgKCBzdGF0ZVZhbHVlQXJyLmxlbmd0aCA8IDEgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhIHRoaXMuaXNMb2FkaW5nICkge1xuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgcHJlbG9hZGVyIGZyb20gdGhlIHBhZ2VcbiAgICAgICAgICAgICAgICAgICAgdmFzdGF0ZUVhY2guaW5uZXJIVE1MID0gdmFzdGF0ZUVhY2guaW5uZXJIVE1MLnNwbGl0KCBWYXN0YXRlLmxvYWRpbmdUZW1wbGF0ZSApLmpvaW4oICcnIClcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCBjaGlsZHJlbiBleGNlcHQgZmlyc3Qgb25lXG4gICAgICAgICAgICAgICAgICAgIHZhc3RhdGVFYWNoLnF1ZXJ5U2VsZWN0b3JBbGwoICcqICsgKicgKS5mb3JFYWNoKCAoIGU6IEhUTUxFbGVtZW50ICkgPT4gZS5yZW1vdmUoKSApXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXN0YXRlRWFjaC5pbm5lckhUTUwgKz0gVmFzdGF0ZS5sb2FkaW5nVGVtcGxhdGVcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXRlVmFsdWVBcnI/LmZvckVhY2goICggdmFsOiBhbnkgKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3RDaGlsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIGB2YXN0YXRlLWVhY2hbc3RhdGU9XCIkeyB0aGlzLm5hbWUgfVwiXSA+ICosIFt2YXN0YXRlLWVhY2hdW3N0YXRlPVwiJHsgdGhpcy5uYW1lIH1cIl0gPiAqYCApXG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcGxhdGU6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkID0gZmlyc3RDaGlsZD8uY2xvbmVOb2RlKCB0cnVlICkgYXMgSFRNTEVsZW1lbnRcblxuICAgICAgICAgICAgICAgIGZpcnN0Q2hpbGQ/LnNldEF0dHJpYnV0ZSggJ2hpZGRlbicsICd0cnVlJyApXG4gICAgICAgICAgICAgICAgdGVtcGxhdGUucmVtb3ZlQXR0cmlidXRlKCAnaGlkZGVuJyApXG4gICAgICAgICAgICAgICAgaWYgKCB0ZW1wbGF0ZS50YWdOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT0gXCJ2YXN0YXRlLXByaW50XCIgfHwgdGVtcGxhdGUuaGFzQXR0cmlidXRlKCAndmFzdGF0ZS1wcmludCcgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gdGVtcGxhdGUuaW5uZXJIVE1MPy5zcGxpdCggdGhpcy5wbGFjZWhvbGRlciApLmpvaW4oIHRoaXMuZ2V0VmFzdGF0ZVByaW50VmFsdWUoIHRlbXBsYXRlLCB2YWwgKSApXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU/LnF1ZXJ5U2VsZWN0b3JBbGwoICd2YXN0YXRlLXByaW50LCBbdmFzdGF0ZS1wcmludF0nICkuZm9yRWFjaCggKCBwcjogSFRNTEVsZW1lbnQgKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwci5yZW1vdmVBdHRyaWJ1dGUoICdoaWRkZW4nIClcbiAgICAgICAgICAgICAgICAgICAgICAgIHByLmlubmVySFRNTCA9IHByLmlubmVySFRNTD8uc3BsaXQoIHRoaXMucGxhY2Vob2xkZXIgKS5qb2luKCB0aGlzLmdldFZhc3RhdGVQcmludFZhbHVlKCBwciwgdmFsICkgKVxuXG4gICAgICAgICAgICAgICAgICAgIH0gKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXN0YXRlRWFjaC5hcHBlbmRDaGlsZCggdGVtcGxhdGUgKVxuICAgICAgICAgICAgfSApXG4gICAgICAgIH0gKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHZhbHVlIHRoYXQgd2lsbCBiZSBwcmludGVkIGluIFZhc3RhdGUgcHJpbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YXN0YXRlUHJpbnRcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VmFzdGF0ZVByaW50VmFsdWUoIHZhc3RhdGVQcmludDogSFRNTEVsZW1lbnQsIHZhbHVlID0gdGhpcy5nZXQoKSApIHtcbiAgICAgICAgaWYgKCB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgISB2YXN0YXRlUHJpbnQuaGFzQXR0cmlidXRlKCAnb2JqJyApICkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJoc2xhKDAsMCUsOTAlLDEpXCJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuY29sb3IgPSBcImhzbGEoMCwwJSwxMCUsLjkpXCJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZm9udEZhbWlseSA9IFwiYXJpYWxcIlxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGgxPlZhc3RhdGUgSlMgRXJyb3I8L2gxPlxuICAgICAgICAgICAgICAgIDxzdHJvbmc+WW91IGFyZSB0cnlpbmcgdG8gcHJpbnQgYW4gb2JqZWN0IHdpdGhvdXQgcGFzc2luZyBvYmogYXR0cmlidXRlIGluIHZhc3RhdGUgcHJpbnQ8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5IZWxwZnVsIEluZm86PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICA8cHJlICBzdHlsZT1cIiAgYmFja2dyb3VuZDogIzI2MjYyNjsgY29sb3I6d2hpdGU7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBwYWRkaW5nOiAxcmVtO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XCI+XG4gICAgICAgICAgICAgICAgPGNvZGU+JHsgdmFzdGF0ZVByaW50Lm91dGVySFRNTC5zcGxpdCggJzwnICkuam9pbiggJyZsdDsnICkuc3BsaXQoICc+JyApLmpvaW4oICcmZ3Q7JyApIH08L2NvZGU+XG4gICAgICAgICAgICAgICAgPC9wcmU+ICAgICAgICAgICAgXG5gXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgfVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgT2JqZWN0LmtleXMoIHZhbHVlICkubGVuZ3RoID4gMCA/IHZhbHVlW3Zhc3RhdGVQcmludC5nZXRBdHRyaWJ1dGUoICdvYmonICkudG9TdHJpbmcoKSA/PyBPYmplY3Qua2V5cyggdGhpcy5nZXQoKSApWzBdXSA6IHZhbHVlXG4gICAgfVxufVxuXG4vLyBleHRlbmQgd2luZG93IGludGVyZmFjZVxuZGVjbGFyZSBnbG9iYWwge1xuICAgIGludGVyZmFjZSBXaW5kb3cge1xuICAgICAgICBWYXN0YXRlOiBhbnlcbiAgICB9XG59XG5cbi8vIGFwcGx5IHZhc3RhdGUgY2xhc3MgdG8gd2luZG93IHNvIGl0IGNhbiBiZVxuLy8gY2FsbGVkIGdsb2JhbGx5IHZpYSAnd2luZG93LlZhc3RhdGUnIG9yIFZhc3RhdGVcbndpbmRvdy5WYXN0YXRlID0gVmFzdGF0ZVxuXG5leHBvcnQgZGVmYXVsdCBWYXN0YXRlIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9