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
                        vastatePrint.innerHTML = vastatePrint.innerHTML.split(this.placeholder).join('<vprint>' + this.get()[vastatePrint.getAttribute('obj')] + '</vprint>');
                        // @ts-ignore
                        vastatePrint.querySelectorAll('vprint').forEach(e => e.innerHTML = this.get()[vastatePrint.getAttribute('obj')]);
                    }
                    else {
                        // @ts-ignore
                        vastatePrint.innerHTML = vastatePrint.innerHTML.split(this.placeholder).join('<vprint>' + this.get()[vastatePrint.getAttribute('obj')] + '</vprint>');
                        // @ts-ignore
                        vastatePrint.querySelectorAll('vprint').forEach(e => e.textContent = this.get()[vastatePrint.getAttribute('obj')]);
                    }
                }
                else {
                    if (vastatePrint.hasAttribute('html')) {
                        // @ts-ignore
                        vastatePrint.innerHTML = vastatePrint.innerHTML.split(this.placeholder).join('<vprint>' + this.get() + '</vprint>');
                        // @ts-ignore
                        vastatePrint.querySelectorAll('vprint').forEach(e => e.innerHTML = this.get());
                    }
                    else {
                        // @ts-ignore
                        vastatePrint.innerHTML = vastatePrint.innerHTML.split(this.placeholder).join('<vprint>' + this.get() + '</vprint>');
                        // @ts-ignore
                        vastatePrint.querySelectorAll('vprint').forEach(e => e.textContent = this.get());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bkcsUUFBUSxDQUFDLFNBQVMsR0FBRyxjQUFRLENBQUMsU0FBUywwQ0FBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsbUNBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztpQkFDaEo7cUJBQU07b0JBQ0gsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLGdCQUFnQixDQUFDLGdDQUFnQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTs7d0JBQ3RFLEVBQUUsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO3dCQUM1QixhQUFhO3dCQUNiLEVBQUUsQ0FBQyxTQUFTLEdBQUcsUUFBRSxDQUFDLFNBQVMsMENBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLG1DQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7b0JBRS9ILENBQUMsQ0FBQztpQkFDTDtnQkFDRCxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxDQUFDLENBQUM7UUFDTixDQUFDLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFPRCxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU87QUFDeEIsaUVBQWUsT0FBTyIsInNvdXJjZXMiOlsid2VicGFjazovL3Zhc3RhdGUtanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmFzdGF0ZS1qcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdmFzdGF0ZS1qcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Zhc3RhdGUtanMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92YXN0YXRlLWpzLy4vc3JjL3Zhc3RhdGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcbiAqIE5hbWU6IFZhc3RhdGUuanNcbiAqIFZlcnNpb246IDEuMFxuICogTGljZW5zZTogTUlUXG4gKi9cbnR5cGUgdmFzdGF0ZVZhbHVlICA9IHN0cmluZyB8IG51bWJlciB8IGFueVtdIHwgYm9vbGVhbiB8IG51bGxcblxuY2xhc3MgVmFzdGF0ZSB7XG4gICAgcHJpdmF0ZSB2YWx1ZTogdmFzdGF0ZVZhbHVlXG4gICAgcHJpdmF0ZSBwbGFjZWhvbGRlcjogYW55ID0gJ3sjVkFMVUUjfSdcbiAgICBwcml2YXRlIHJlYWRvbmx5IG5hbWU6IHN0cmluZ1xuICAgIHByaXZhdGUgaXNMb2FkaW5nOiBib29sZWFuID0gZmFsc2VcbiAgICBwcml2YXRlIHN0YXRpYyBsb2FkaW5nVGVtcGxhdGU6IHN0cmluZ1xuXG4gICAgc2V0TG9hZGluZyhsb2FkaW5nOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gbG9hZGluZ1xuICAgICAgICB0aGlzLnJlbG9hZERvbSgpXG4gICAgfVxuXG4gICAgc3RhdGljIHNldExvYWRpbmdUZW1wbGF0ZShsb2FkaW5nVGVtcGxhdGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmxvYWRpbmdUZW1wbGF0ZSA9IGxvYWRpbmdUZW1wbGF0ZVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdmFsdWU6IHZhc3RhdGVWYWx1ZSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWVcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLnJlbG9hZERvbSgpXG4gICAgfVxuXG4gICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVxuICAgIH1cblxuICAgIHNldCh2YWx1ZTogdmFzdGF0ZVZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxuICAgICAgICB0aGlzLnJlbG9hZERvbSgpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWxvYWREb20oKSB7XG4gICAgICAgIGNvbnN0IHZhc3RhdGVFYWNocyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYHZhc3RhdGUtZWFjaFtzdGF0ZT1cIiR7dGhpcy5uYW1lfVwiXSwgW3Zhc3RhdGUtZWFjaF1bc3RhdGU9XCIke3RoaXMubmFtZX1cIl1gKVxuICAgICAgICBjb25zdCB2YXN0YXRlUHJpbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgdmFzdGF0ZS1wcmludFtzdGF0ZT1cIiR7dGhpcy5uYW1lfVwiXSwgW3Zhc3RhdGUtcHJpbnRdW3N0YXRlPVwiJHt0aGlzLm5hbWV9XCJdYClcbiAgICAgICAgdmFzdGF0ZVByaW50cy5mb3JFYWNoKHZhc3RhdGVQcmludCA9PiB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzTG9hZGluZykge1xuICAgICAgICAgICAgICAgIHZhc3RhdGVQcmludC5pbm5lckhUTUwgKz0gVmFzdGF0ZS5sb2FkaW5nVGVtcGxhdGVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFzdGF0ZVByaW50LmlubmVySFRNTCA9IHZhc3RhdGVQcmludC5pbm5lckhUTUwuc3BsaXQoIFZhc3RhdGUubG9hZGluZ1RlbXBsYXRlICkuam9pbiggJycgKVxuXG4gICAgICAgICAgICAgICAgaWYgKCB2YXN0YXRlUHJpbnQuaGFzQXR0cmlidXRlKCAnb2JqJyApICkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIHZhc3RhdGVQcmludC5oYXNBdHRyaWJ1dGUoICdodG1sJyApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFzdGF0ZVByaW50LmlubmVySFRNTCA9IHZhc3RhdGVQcmludC5pbm5lckhUTUwuc3BsaXQoIHRoaXMucGxhY2Vob2xkZXIgKS5qb2luKCAnPHZwcmludD4nICsgdGhpcy5nZXQoKVt2YXN0YXRlUHJpbnQuZ2V0QXR0cmlidXRlKCAnb2JqJyApXSArICc8L3ZwcmludD4nIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhc3RhdGVQcmludC5xdWVyeVNlbGVjdG9yQWxsKCd2cHJpbnQnKS5mb3JFYWNoKGUgPT4gZS5pbm5lckhUTUwgPSB0aGlzLmdldCgpW3Zhc3RhdGVQcmludC5nZXRBdHRyaWJ1dGUoICdvYmonICldIClcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhc3RhdGVQcmludC5pbm5lckhUTUwgPSB2YXN0YXRlUHJpbnQuaW5uZXJIVE1MLnNwbGl0KCB0aGlzLnBsYWNlaG9sZGVyICkuam9pbignPHZwcmludD4nICsgdGhpcy5nZXQoKVt2YXN0YXRlUHJpbnQuZ2V0QXR0cmlidXRlKCAnb2JqJyApXSArICc8L3ZwcmludD4nIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhc3RhdGVQcmludC5xdWVyeVNlbGVjdG9yQWxsKCd2cHJpbnQnKS5mb3JFYWNoKGUgPT4gZS50ZXh0Q29udGVudCA9IHRoaXMuZ2V0KClbdmFzdGF0ZVByaW50LmdldEF0dHJpYnV0ZSggJ29iaicgKV0gKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB2YXN0YXRlUHJpbnQuaGFzQXR0cmlidXRlKCAnaHRtbCcgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhc3RhdGVQcmludC5pbm5lckhUTUwgPSB2YXN0YXRlUHJpbnQuaW5uZXJIVE1MLnNwbGl0KCB0aGlzLnBsYWNlaG9sZGVyICkuam9pbiggJzx2cHJpbnQ+JyArIHRoaXMuZ2V0KCkgKyAnPC92cHJpbnQ+JyApXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXN0YXRlUHJpbnQucXVlcnlTZWxlY3RvckFsbCgndnByaW50JykuZm9yRWFjaChlID0+IGUuaW5uZXJIVE1MID0gdGhpcy5nZXQoKSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhc3RhdGVQcmludC5pbm5lckhUTUwgPSB2YXN0YXRlUHJpbnQuaW5uZXJIVE1MLnNwbGl0KCB0aGlzLnBsYWNlaG9sZGVyICkuam9pbiggJzx2cHJpbnQ+JyArIHRoaXMuZ2V0KCkgKyAnPC92cHJpbnQ+JyApXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXN0YXRlUHJpbnQucXVlcnlTZWxlY3RvckFsbCgndnByaW50JykuZm9yRWFjaChlID0+IGUudGV4dENvbnRlbnQgPSB0aGlzLmdldCgpKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIHZhc3RhdGVFYWNocy5mb3JFYWNoKHZhc3RhdGVFYWNoID0+IHtcbiAgICAgICAgICAgIHdoaWxlICh2YXN0YXRlRWFjaC5jaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHZhc3RhdGVFYWNoLnJlbW92ZUNoaWxkKHZhc3RhdGVFYWNoLmxhc3RFbGVtZW50Q2hpbGQpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlVmFsdWVBcnI6IGFueVtdID0gQXJyYXkuaXNBcnJheSh0aGlzLmdldCgpKSA/IHRoaXMuZ2V0KCkgOiBbXVxuXG4gICAgICAgICAgICBpZiAoc3RhdGVWYWx1ZUFyci5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzTG9hZGluZykge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAodmFzdGF0ZUVhY2guY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFzdGF0ZUVhY2gucmVtb3ZlQ2hpbGQodmFzdGF0ZUVhY2gubGFzdEVsZW1lbnRDaGlsZClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhc3RhdGVFYWNoLmlubmVySFRNTCArPSBWYXN0YXRlLmxvYWRpbmdUZW1wbGF0ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXRlVmFsdWVBcnI/LmZvckVhY2godmFsID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdENoaWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgdmFzdGF0ZS1lYWNoW3N0YXRlPVwiJHt0aGlzLm5hbWV9XCJdID4gKiwgW3Zhc3RhdGUtZWFjaF1bc3RhdGU9XCIke3RoaXMubmFtZX1cIl0gPiAqYClcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZTogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQgPSBmaXJzdENoaWxkPy5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTEVsZW1lbnRcblxuICAgICAgICAgICAgICAgIGZpcnN0Q2hpbGQ/LnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJ3RydWUnKVxuICAgICAgICAgICAgICAgIHRlbXBsYXRlLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJylcbiAgICAgICAgICAgICAgICBpZiAodGVtcGxhdGUudGFnTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpID09IFwidmFzdGF0ZS1wcmludFwiIHx8IHRlbXBsYXRlLmhhc0F0dHJpYnV0ZSgndmFzdGF0ZS1wcmludCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHRlbXBsYXRlLmlubmVySFRNTD8uc3BsaXQodGhpcy5wbGFjZWhvbGRlcikuam9pbih0eXBlb2YgdmFsID09PSAnb2JqZWN0JyA/IHZhbFt0ZW1wbGF0ZS5nZXRBdHRyaWJ1dGUoJ29iaicpID8/IDBdIDogdmFsKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlPy5xdWVyeVNlbGVjdG9yQWxsKCd2YXN0YXRlLXByaW50LCBbdmFzdGF0ZS1wcmludF0nKS5mb3JFYWNoKHByID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHByLmlubmVySFRNTCA9IHByLmlubmVySFRNTD8uc3BsaXQodGhpcy5wbGFjZWhvbGRlcikuam9pbih0eXBlb2YgdmFsID09PSAnb2JqZWN0JyA/IHZhbFtwci5nZXRBdHRyaWJ1dGUoJ29iaicpID8/IDBdIDogdmFsKVxuXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhc3RhdGVFYWNoLmFwcGVuZENoaWxkKHRlbXBsYXRlKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG59XG5kZWNsYXJlIGdsb2JhbCB7XG4gICAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgICAgIFZhc3RhdGU6IGFueVxuICAgIH1cbn1cblxud2luZG93LlZhc3RhdGUgPSBWYXN0YXRlXG5leHBvcnQgZGVmYXVsdCBWYXN0YXRlIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9