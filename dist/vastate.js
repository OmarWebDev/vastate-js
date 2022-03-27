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
    constructor(name, value) {
        this.placeholder = '{#VALUE#}';
        this.isLoading = false;
        this.value = value;
        this.name = name;
        this.reloadDom();
    }
    setLoading(loading) {
        this.isLoading = loading;
        this.reloadDom();
    }
    static setLoadingTemplate(loadingTemplate) {
        this.loadingTemplate = loadingTemplate;
    }
    get() {
        return this.value;
    }
    set(value) {
        this.value = value;
        this.reloadDom();
    }
    reloadDom() {
        const vastateEachs = document.querySelectorAll(`vastate-each[state="${this.name}"], [vastate-each][state="${this.name}"]`);
        const vastatePrints = document.querySelectorAll(`vastate-print[state="${this.name}"], [vastate-print][state="${this.name}"]`);
        vastatePrints.forEach(vastatePrint => {
            if (this.isLoading) {
                vastatePrint.innerHTML += Vastate.loadingTemplate;
            }
            else {
                vastatePrint.innerHTML = vastatePrint.innerHTML.split(Vastate.loadingTemplate).join('');
                if (vastatePrint.hasAttribute('obj')) {
                    if (vastatePrint.hasAttribute('html')) {
                        // @ts-ignore
                        vastatePrint.innerHTML = vastatePrint.innerHTML.split(this.placeholder).join(this.get()[vastatePrint.getAttribute('obj')]);
                    }
                    else {
                        // @ts-ignore
                        vastatePrint.textContent = vastatePrint.textContent.split(this.placeholder).join(this.get()[vastatePrint.getAttribute('obj')]);
                    }
                }
                else {
                    if (vastatePrint.hasAttribute('html')) {
                        // @ts-ignore
                        vastatePrint.innerHTML = vastatePrint.innerHTML.split(this.placeholder).join(this.get());
                    }
                    else {
                        // @ts-ignore
                        vastatePrint.textContent = vastatePrint.textContent.split(this.placeholder).join(this.get());
                    }
                }
            }
        });
        vastateEachs.forEach(vastateEach => {
            while (vastateEach.children.length > 1) {
                // @ts-ignore
                vastateEach.removeChild(vastateEach.lastElementChild);
            }
            // @ts-ignore
            const stateValueArr = Array.isArray(this.get()) ? this.get() : [];
            if (stateValueArr.length < 1) {
                if (!this.isLoading) {
                    while (vastateEach.children.length > 1) {
                        // @ts-ignore
                        vastateEach.removeChild(vastateEach.lastElementChild);
                    }
                }
                else {
                    vastateEach.innerHTML += Vastate.loadingTemplate;
                }
                return;
            }
            stateValueArr === null || stateValueArr === void 0 ? void 0 : stateValueArr.forEach(val => {
                var _a, _b;
                const firstChild = document.querySelector(`vastate-each[state="${this.name}"] > *, [vastate-each][state="${this.name}"] > *`);
                const template = firstChild === null || firstChild === void 0 ? void 0 : firstChild.cloneNode(true);
                firstChild === null || firstChild === void 0 ? void 0 : firstChild.setAttribute('hidden', 'true');
                template.removeAttribute('hidden');
                if (template.tagName.toLocaleLowerCase() == "vastate-print" || template.hasAttribute('vastate-print')) {
                    template.innerHTML = (_a = template.innerHTML) === null || _a === void 0 ? void 0 : _a.split(this.placeholder).join(typeof val === 'object' ? val[(_b = template.getAttribute('obj')) !== null && _b !== void 0 ? _b : 0] : val);
                }
                else {
                    template === null || template === void 0 ? void 0 : template.querySelectorAll('vastate-print, [vastate-print]').forEach(pr => {
                        var _a, _b;
                        pr.removeAttribute('hidden');
                        // @ts-ignore
                        pr.innerHTML = (_a = pr.innerHTML) === null || _a === void 0 ? void 0 : _a.split(this.placeholder).join(typeof val === 'object' ? val[(_b = pr.getAttribute('obj')) !== null && _b !== void 0 ? _b : 0] : val);
                    });
                }
                vastateEach.appendChild(template);
            });
        });
    }
}
window.Vastate = Vastate;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vastate);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RyxPQUFPO0FBQ3hCLGlFQUFlLE9BQU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92YXN0YXRlLWpzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Zhc3RhdGUtanMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Zhc3RhdGUtanMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly92YXN0YXRlLWpzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdmFzdGF0ZS1qcy8uL3NyYy92YXN0YXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4gKiBOYW1lOiBWYXN0YXRlLmpzXG4gKiBWZXJzaW9uOiAxLjBcbiAqIExpY2Vuc2U6IE1JVFxuICovXG50eXBlIHZhc3RhdGVWYWx1ZSAgPSBzdHJpbmcgfCBudW1iZXIgfCBhbnlbXSB8IGJvb2xlYW4gfCBudWxsXG5cbmNsYXNzIFZhc3RhdGUge1xuICAgIHByaXZhdGUgdmFsdWU6IHZhc3RhdGVWYWx1ZVxuICAgIHByaXZhdGUgcGxhY2Vob2xkZXIgPSAneyNWQUxVRSN9J1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbmFtZTogc3RyaW5nXG4gICAgcHJpdmF0ZSBpc0xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZVxuICAgIHByaXZhdGUgc3RhdGljIGxvYWRpbmdUZW1wbGF0ZTogc3RyaW5nXG5cbiAgICBzZXRMb2FkaW5nKGxvYWRpbmc6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBsb2FkaW5nXG4gICAgICAgIHRoaXMucmVsb2FkRG9tKClcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0TG9hZGluZ1RlbXBsYXRlKGxvYWRpbmdUZW1wbGF0ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubG9hZGluZ1RlbXBsYXRlID0gbG9hZGluZ1RlbXBsYXRlXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCB2YWx1ZTogdmFzdGF0ZVZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgICAgIHRoaXMucmVsb2FkRG9tKClcbiAgICB9XG5cbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlXG4gICAgfVxuXG4gICAgc2V0KHZhbHVlOiB2YXN0YXRlVmFsdWUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlXG4gICAgICAgIHRoaXMucmVsb2FkRG9tKClcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbG9hZERvbSgpIHtcbiAgICAgICAgY29uc3QgdmFzdGF0ZUVhY2hzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgdmFzdGF0ZS1lYWNoW3N0YXRlPVwiJHt0aGlzLm5hbWV9XCJdLCBbdmFzdGF0ZS1lYWNoXVtzdGF0ZT1cIiR7dGhpcy5uYW1lfVwiXWApXG4gICAgICAgIGNvbnN0IHZhc3RhdGVQcmludHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGB2YXN0YXRlLXByaW50W3N0YXRlPVwiJHt0aGlzLm5hbWV9XCJdLCBbdmFzdGF0ZS1wcmludF1bc3RhdGU9XCIke3RoaXMubmFtZX1cIl1gKVxuICAgICAgICB2YXN0YXRlUHJpbnRzLmZvckVhY2godmFzdGF0ZVByaW50ID0+IHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNMb2FkaW5nKSB7XG4gICAgICAgICAgICAgICAgdmFzdGF0ZVByaW50LmlubmVySFRNTCArPSBWYXN0YXRlLmxvYWRpbmdUZW1wbGF0ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXN0YXRlUHJpbnQuaW5uZXJIVE1MID0gdmFzdGF0ZVByaW50LmlubmVySFRNTC5zcGxpdCggVmFzdGF0ZS5sb2FkaW5nVGVtcGxhdGUgKS5qb2luKCAnJyApXG5cbiAgICAgICAgICAgICAgICBpZiAoIHZhc3RhdGVQcmludC5oYXNBdHRyaWJ1dGUoICdvYmonICkgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggdmFzdGF0ZVByaW50Lmhhc0F0dHJpYnV0ZSggJ2h0bWwnICkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXN0YXRlUHJpbnQuaW5uZXJIVE1MID0gdmFzdGF0ZVByaW50LmlubmVySFRNTC5zcGxpdCggdGhpcy5wbGFjZWhvbGRlciApLmpvaW4oIHRoaXMuZ2V0KClbdmFzdGF0ZVByaW50LmdldEF0dHJpYnV0ZSggJ29iaicgKV0gKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFzdGF0ZVByaW50LnRleHRDb250ZW50ID0gdmFzdGF0ZVByaW50LnRleHRDb250ZW50LnNwbGl0KCB0aGlzLnBsYWNlaG9sZGVyICkuam9pbiggdGhpcy5nZXQoKVt2YXN0YXRlUHJpbnQuZ2V0QXR0cmlidXRlKCAnb2JqJyApXSApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIHZhc3RhdGVQcmludC5oYXNBdHRyaWJ1dGUoICdodG1sJyApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFzdGF0ZVByaW50LmlubmVySFRNTCA9IHZhc3RhdGVQcmludC5pbm5lckhUTUwuc3BsaXQoIHRoaXMucGxhY2Vob2xkZXIgKS5qb2luKCB0aGlzLmdldCgpIClcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhc3RhdGVQcmludC50ZXh0Q29udGVudCA9IHZhc3RhdGVQcmludC50ZXh0Q29udGVudC5zcGxpdCggdGhpcy5wbGFjZWhvbGRlciApLmpvaW4oIHRoaXMuZ2V0KCkgKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIHZhc3RhdGVFYWNocy5mb3JFYWNoKHZhc3RhdGVFYWNoID0+IHtcbiAgICAgICAgICAgIHdoaWxlICh2YXN0YXRlRWFjaC5jaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHZhc3RhdGVFYWNoLnJlbW92ZUNoaWxkKHZhc3RhdGVFYWNoLmxhc3RFbGVtZW50Q2hpbGQpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlVmFsdWVBcnI6IGFueVtdID0gQXJyYXkuaXNBcnJheSh0aGlzLmdldCgpKSA/IHRoaXMuZ2V0KCkgOiBbXVxuXG4gICAgICAgICAgICBpZiAoc3RhdGVWYWx1ZUFyci5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzTG9hZGluZykge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAodmFzdGF0ZUVhY2guY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFzdGF0ZUVhY2gucmVtb3ZlQ2hpbGQodmFzdGF0ZUVhY2gubGFzdEVsZW1lbnRDaGlsZClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhc3RhdGVFYWNoLmlubmVySFRNTCArPSBWYXN0YXRlLmxvYWRpbmdUZW1wbGF0ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXRlVmFsdWVBcnI/LmZvckVhY2godmFsID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdENoaWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgdmFzdGF0ZS1lYWNoW3N0YXRlPVwiJHt0aGlzLm5hbWV9XCJdID4gKiwgW3Zhc3RhdGUtZWFjaF1bc3RhdGU9XCIke3RoaXMubmFtZX1cIl0gPiAqYClcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZTogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQgPSBmaXJzdENoaWxkPy5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTEVsZW1lbnRcblxuICAgICAgICAgICAgICAgIGZpcnN0Q2hpbGQ/LnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJ3RydWUnKVxuICAgICAgICAgICAgICAgIHRlbXBsYXRlLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJylcbiAgICAgICAgICAgICAgICBpZiAodGVtcGxhdGUudGFnTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpID09IFwidmFzdGF0ZS1wcmludFwiIHx8IHRlbXBsYXRlLmhhc0F0dHJpYnV0ZSgndmFzdGF0ZS1wcmludCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHRlbXBsYXRlLmlubmVySFRNTD8uc3BsaXQodGhpcy5wbGFjZWhvbGRlcikuam9pbih0eXBlb2YgdmFsID09PSAnb2JqZWN0JyA/IHZhbFt0ZW1wbGF0ZS5nZXRBdHRyaWJ1dGUoJ29iaicpID8/IDBdIDogdmFsKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlPy5xdWVyeVNlbGVjdG9yQWxsKCd2YXN0YXRlLXByaW50LCBbdmFzdGF0ZS1wcmludF0nKS5mb3JFYWNoKHByID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHByLmlubmVySFRNTCA9IHByLmlubmVySFRNTD8uc3BsaXQodGhpcy5wbGFjZWhvbGRlcikuam9pbih0eXBlb2YgdmFsID09PSAnb2JqZWN0JyA/IHZhbFtwci5nZXRBdHRyaWJ1dGUoJ29iaicpID8/IDBdIDogdmFsKVxuXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhc3RhdGVFYWNoLmFwcGVuZENoaWxkKHRlbXBsYXRlKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG59XG5kZWNsYXJlIGdsb2JhbCB7XG4gICAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgICAgIFZhc3RhdGU6IGFueVxuICAgIH1cbn1cblxud2luZG93LlZhc3RhdGUgPSBWYXN0YXRlXG5leHBvcnQgZGVmYXVsdCBWYXN0YXRlIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9