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
        this.setAttribute('value', (Array.isArray(value) || typeof this.value === 'object') ? JSON.stringify(value) : value.toString());
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
}
// class Vastate {
//     /**
//      * State value
//      *
//      * @private
//      */
//     private value: vastateValue
//     /**
//      * Placeholder that will be replaced with
//      * State value when showed in HTML
//      *
//      * @private
//      */
//     private readonly placeholder: any = '{#VALUE#}'
//     /**
//      * State previousValue
//      *
//      * @private
//      */
//     private previousValue: vastateValue = this.placeholder
//     /**
//      * State Name
//      *
//      * @private
//      */
//     private readonly name: string
//     /**
//      * Loading status
//      *
//      * @private
//      */
//     private isLoading: boolean = false
//     /**
//      * Global Loading Template
//      *
//      * @private
//      */
//     private static loadingTemplate: string = ''
//     /**
//      * Loading template for specific state
//      *
//      * @private
//      */
//     private loadingTemplate: string = Vastate.loadingTemplate;
//     /**
//      * events will be used when created a new event
//      * using on method or triggering an existing event using trigger method
//      * there is a default event which is change that will reload the dom
//      *
//      * @private
//      */
//     private events: {[key: string]: CallableFunction} = {
//         "change": () => {}
//     }
//     /**
//      * Save mode is used to see where to save the state
//      *
//      * @private
//      */
//     private saveMode: saveMode = 'localStorage';
//     private readonly groupedVastatePrintsSelector: string = `vastate-print:not(vastate-print[state]), [vastate-print]:not([vastate-print][state])`;
//     private readonly vastatePrintsSelector: string;
//     /**
//      * initialize new state
//      *
//      * @param name
//      * @param value
//      */
//     constructor( name: string, value: vastateValue ) {
//         this.value = value
//         this.name = name
//         this.vastatePrintsSelector = `vastate-print[state="${ this.name }"], [vastate-print][state="${ this.name }"]:not([vastate-group])`
//         this.reloadDom()
//     }
//     /**
//      * Remove vastate-loader attribute
//      */
//     static mount() {
//         style.remove()
//     }
//     /**
//      * Set loading status
//      *
//      * @param loading
//      * @return this
//      */
//     setLoading( loading: boolean ): this {
//         this.isLoading = loading
//         this.reloadDom()
//         return this
//     }
//     /**
//      * Set Global loading template
//      *
//      * @param loadingTemplate
//      */
//     static setLoadingTemplate( loadingTemplate: string ) {
//         this.loadingTemplate = loadingTemplate
//     }
//     /**
//      * Get current state value
//      */
//     get(): vastateValue {
//         return this.value
//     }
//     /**
//      * get previous state value
//      *
//      */
//     getPreviousValue(): vastateValue {
//         return this.previousValue
//     }
//     /**
//      * Set state value
//      *
//      * @param value
//      * @return this
//      */
//     set( value: vastateValue ): this {
//         if ( this.value != this.previousValue )
//             this.previousValue = this.value
//         this.value = value
//         this.trigger('change')
//         this.reloadDom()
//         return this
//     }
//     /**
//      * Create a new event that can be triggered
//      * using trigger method
//      *
//      * @param event
//      * @param callback
//      */
//     on(event: string, callback: CallableFunction): void {
//         this.events[event] = callback
//     }
//     /**
//      * Trigger a event that is created using on method
//      *
//      * @param event
//      * @param params
//      */
//     trigger(event: string, ...params: any[]) {
//         if (this.events[event])
//         {
//             this.events[event](...params)
//         } else {
//             Vastate.throwError(`Undefined event '${event}'. Did you created the event using 'on' method?`)
//         }
//     }
//     /**
//      * Reload the DOM when value or loading state is changed
//      *
//      * @private
//      */
//     private reloadDom() {
//         this.reloadVastateEachs()
//         this.reloadVastatePrints()
//         this.reloadVastateGroups()
//     }
//     /**
//      * Reload all vastate-print tags/attribute
//      * in the DOM
//      *
//      * @private
//      */
//     private reloadVastatePrints( parent: HTMLElement = document.body ) {
//         const vastatePrints = parent.querySelectorAll( parent.hasAttribute( 'vastate-print-group' ) || parent.tagName.toLowerCase() == "vastate-print-group" ? this.groupedVastatePrintsSelector : this.vastatePrintsSelector )
//         vastatePrints.forEach( ( vastatePrint: HTMLElement ) => {
//             if ( this.isLoading ) {
//                 vastatePrint.innerHTML += this.loadingTemplate
//             } else {
//                 // @ts-ignore
//                 const valueToBePrinted = vastatePrint.hasAttribute('obj') && typeof this.previousValue === 'object' ? this.previousValue[vastatePrint.getAttribute('obj')].toString() : this.previousValue.toString()
//                 vastatePrint.innerHTML = vastatePrint.innerHTML.split( this.loadingTemplate ).join( '' )
//                 if ( vastatePrint.hasAttribute( 'html' ) ) {
//                     vastatePrint.innerHTML = vastatePrint.innerHTML.split( valueToBePrinted ).join( this.getVastatePrintValue( vastatePrint ) )
//                 } else {
//                     vastatePrint.textContent = vastatePrint.textContent.split( valueToBePrinted ).join( this.getVastatePrintValue( vastatePrint ) )
//                 }
//             }
//         } )
//     }
//     /**
//      * Reload all vastate-each tags/attribute
//      * in the DOM
//      *
//      * @private
//      */
//     private reloadVastateEachs( parent: HTMLElement = document.body ) {
//         const vastateEachs = parent.querySelectorAll( `vastate-each[state="${ this.name }"], [vastate-each][state="${ this.name }"]` )
//         vastateEachs.forEach( ( vastateEach: HTMLElement ) => {
//             this.resetVastateEach( vastateEach )
//             const stateValueArr: any = Array.isArray( this.get() ) ? this.get() : []
//             if ( stateValueArr.length < 1 ) {
//                 if ( ! this.isLoading ) {
//                     this.resetVastateEach( vastateEach )
//                     return
//                 }
//                 vastateEach.innerHTML += this.loadingTemplate
//                 return
//             }
//             stateValueArr?.forEach( ( val: any ) => {
//                 const firstChild = document.querySelector( `vastate-each[state="${ this.name }"] > *, [vastate-each][state="${ this.name }"] > *` )
//                 const template: any = firstChild?.cloneNode( true )
//                 template.removeAttribute( 'hidden' )
//                 if ( template.tagName.toLocaleLowerCase() == "vastate-print" || template.hasAttribute( 'vastate-print' ) ) {
//                     template.innerHTML = template.innerHTML?.split( this.placeholder ).join( this.getVastatePrintValue( template, val ) )
//                 } else {
//                     template?.querySelectorAll( 'vastate-print, [vastate-print]' ).forEach( ( pr: HTMLElement ) => {
//                         pr.removeAttribute( 'hidden' )
//                         pr.innerHTML = pr.innerHTML?.split( this.placeholder ).join( this.getVastatePrintValue( pr, val ) )
//                     } )
//                 }
//                 vastateEach.appendChild( template )
//             } )
//         } )
//     }
//     private reloadVastateGroups(): void {
//         const groups = document.querySelectorAll<HTMLElement>( `vastate-print-group[state="${ this.name }"], [vastate-print-group][state="${ this.name }"]` )
//         groups.forEach( ( group: HTMLElement ) => this.reloadVastatePrints( group ) )
//     }
//     /**
//      * Gets the value that will be printed in Vastate print
//      *
//      * @param vastatePrint
//      * @param value
//      * @private
//      */
//     private getVastatePrintValue( vastatePrint: HTMLElement, value = this.get() ) {
//         if ( typeof value === "object" && ! vastatePrint.hasAttribute( 'obj' ) ) {
//             Vastate.throwError( 'You are trying to print an object without passing obj attribute in vastate print', vastatePrint )
//         }
//         // @ts-ignore
//         return typeof value === "object" && Object.keys( value ).length > 0 ? value[vastatePrint.getAttribute( 'obj' ).toString() ?? Object.keys( this.get() )[0]] : value
//     }
//     private static throwError( error: string, element?: HTMLElement ) {
//         document.body.style.background = "hsla(0,0%,90%,1)"
//         document.body.style.color = "hsla(0,0%,10%,.9)"
//         document.body.style.fontFamily = "arial"
//         document.body.innerHTML = `
//                 <h1>Vastate JS Error</h1>
//                 <strong>${ error }</strong>
//                 <br>
//                 ${ element ? `
//                 <strong>Helpful Info:</strong>
//                 <br>
//                 <br>
//                 <pre  style="  background: #262626; color:white;
//   font-weight: bold;
//   padding: 1rem;
//   border-radius: 6px;">
//                 <code>${ element.outerHTML.split( '<' ).join( '&lt;' ).split( '>' ).join( '&gt;' ) }</code>
//                 </pre>` : `` }            
// `
//         throw new TypeError( `Vastate JS Error: ${ error }` )
//     }
//     private resetVastateEach( vastateEach: HTMLElement ): void {
//         // remove preloader from the page
//         vastateEach.innerHTML = vastateEach.innerHTML.split( this.loadingTemplate ).join( '' )
//         // remove all children except first one
//         vastateEach.querySelectorAll( ':scope > *' ).forEach( ( e: HTMLElement, i ) => i !== 0 ? e.remove() : void 0 )
//     }
//     /**
//      * Set loading template for specific state
//      *
//      * @param template
//      * @return this
//      */
//     public setLoadingTemplate( template: string ): this {
//         this.loadingTemplate = template
//         return this
//     }
//     /**
//      * change current save mode
//      *
//      * @param saveMode
//      * @return this
//      */
//     public setSaveMode( saveMode: saveMode ): this {
//         this.saveMode = saveMode
//         return this
//     }
//     /**
//      * get current save mode
//      *
//      * @return saveMode
//      */
//     public getSaveMode(): saveMode {
//         return this.saveMode
//     }
//     /**
//      * save current state to localStorage/sessionStorage
//      *
//      * @return this
//      */
//     public save(): this {
//         const value = typeof this.get() == 'object' || Array.isArray( this.get() ) ? JSON.stringify( this.get() ) : this.get().toString();
//         switch ( this.getSaveMode() ) {
//             case "localStorage":
//                 localStorage.setItem( this.name, value )
//                 break
//             case "sessionStorage":
//                 sessionStorage.setItem( this.name, value )
//                 break
//             default:
//                 Vastate.throwError( 'Unsupported save mode: ' + this.getSaveMode() )
//                 break
//         }
//         return this
//     }
//     /**
//      * restore the state from localStorage/sessionStorage
//      *
//      * @return this
//      */
//     public restore(): this {
//         switch ( this.getSaveMode() ) {
//             case "localStorage":
//                 if ( localStorage.getItem( this.name ) )
//                     this.set( JSON.parse(localStorage.getItem( this.name )) )
//                 break
//             case "sessionStorage":
//                 if ( sessionStorage.getItem( this.name ) )
//                     this.set( JSON.parse(sessionStorage.getItem( this.name )) )
//                 break
//             default:
//                 Vastate.throwError( 'Unsupported save mode: ' + this.getSaveMode() )
//                 break
//         }
//         return this
//     }
// }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vastate);

})();

window.Vastate = __webpack_exports__["default"];
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q2xDLFNBQVM7QUFDVCx5QkFBeUI7QUFDekIsc0JBQXNCO0FBQ3RCLFVBQVU7QUFDVix1REFBdUQ7QUFDdkQsbUNBQW1DO0FBQ25DLHNCQUFzQjtBQUN0QixRQUFRO0FBRVIsVUFBVTtBQUNWLCtCQUErQjtBQUMvQixTQUFTO0FBQ1QsMEJBQTBCO0FBQzFCLFVBQVU7QUFDVix1Q0FBdUM7QUFDdkMsK0JBQStCO0FBQy9CLFFBQVE7QUFFUixVQUFVO0FBQ1YsMkRBQTJEO0FBQzNELFNBQVM7QUFDVCxzQkFBc0I7QUFDdEIsVUFBVTtBQUNWLDRCQUE0QjtBQUM1Qiw2SUFBNkk7QUFDN0ksMENBQTBDO0FBQzFDLG1DQUFtQztBQUNuQywyREFBMkQ7QUFDM0Qsd0JBQXdCO0FBQ3hCLHFDQUFxQztBQUNyQyw2REFBNkQ7QUFDN0Qsd0JBQXdCO0FBQ3hCLHVCQUF1QjtBQUN2Qix1RkFBdUY7QUFDdkYsd0JBQXdCO0FBQ3hCLFlBQVk7QUFDWixzQkFBc0I7QUFDdEIsUUFBUTtBQUVSLFVBQVU7QUFDViw0REFBNEQ7QUFDNUQsU0FBUztBQUNULHNCQUFzQjtBQUN0QixVQUFVO0FBQ1YsK0JBQStCO0FBQy9CLDBDQUEwQztBQUMxQyxtQ0FBbUM7QUFDbkMsMkRBQTJEO0FBQzNELGdGQUFnRjtBQUNoRix3QkFBd0I7QUFDeEIscUNBQXFDO0FBQ3JDLDZEQUE2RDtBQUM3RCxrRkFBa0Y7QUFDbEYsd0JBQXdCO0FBQ3hCLHVCQUF1QjtBQUN2Qix1RkFBdUY7QUFDdkYsd0JBQXdCO0FBQ3hCLFlBQVk7QUFDWixzQkFBc0I7QUFDdEIsUUFBUTtBQUNSLElBQUk7QUFDSixpRUFBZSxPQUFPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vVmFzdGF0ZS8uL3NyYy9jb21wb25lbnRzL1ZhRWFjaC50cyIsIndlYnBhY2s6Ly9WYXN0YXRlLy4vc3JjL2NvbXBvbmVudHMvVmFQcmludC50cyIsIndlYnBhY2s6Ly9WYXN0YXRlLy4vc3JjL2NvbXBvbmVudHMvVmFQcmludEdyb3VwLnRzIiwid2VicGFjazovL1Zhc3RhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vVmFzdGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vVmFzdGF0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1Zhc3RhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9WYXN0YXRlLy4vc3JjL3Zhc3RhdGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZhVmFsdWUgZnJvbSBcIi4uL3R5cGVzL1ZhVmFsdWVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhRWFjaCBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coeyAnbW9kZSc6ICdvcGVuJyB9KTtcclxuICAgIH1cclxuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAoYXR0cmlidXRlTmFtZSA9PT0gJ3ZhbHVlJykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVuZGVyKClcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIFsndmFsdWUnXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmFsdWUoKTogQXJyYXk8VmFWYWx1ZT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgndmFsdWUnKSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdWYUVhY2g6IHZhbHVlIG11c3QgYmUgYW4gYXJyYXknKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXQgdmFsdWUodmFsdWU6IEFycmF5PFZhVmFsdWU+KSB7XHJcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSB0aGlzLnF1ZXJ5U2VsZWN0b3I8SFRNTFRlbXBsYXRlRWxlbWVudD4oJ3RlbXBsYXRlJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY2xlYXIgdGhlIHNoYWRvdyBkb21cclxuICAgICAgICB0aGlzLnNoYWRvd1Jvb3QuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgYXJyYXlcclxuICAgICAgICB0aGlzLnZhbHVlLmZvckVhY2godiA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBlbGVtZW50XHJcbiAgICAgICAgICAgIGNvbnN0IGVsID0gdGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBhcHBlbmQgdGhlIGVsZW1lbnQgdG8gdGhlIHNoYWRvdyBkb21cclxuICAgICAgICAgICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKGVsLmNvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVwbGFjZSB0aGUgdmFsdWUgd2l0aCB0aGUgY3VycmVudCB2YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvckFsbCgndmEtcHJpbnQ6bm90KHZhLXByaW50W2lkXSwgdmEtcHJpbnRbdmFsdWVdKScpLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCd2YWx1ZScsIEpTT04uc3RyaW5naWZ5KHYpKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFZhVmFsdWUgZnJvbSBcIi4uL3R5cGVzL1ZhVmFsdWVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhUHJpbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coeyAnbW9kZSc6ICdvcGVuJyB9KTtcclxuICAgIH1cclxuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAoYXR0cmlidXRlTmFtZSA9PT0gJ3ZhbHVlJyB8fCBhdHRyaWJ1dGVOYW1lID09PSAna2V5Jykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gWyd2YWx1ZScsICdrZXknXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmFsdWUoKTogVmFWYWx1ZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCd2YWx1ZScpKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLmdldEF0dHJpYnV0ZSgndmFsdWUnKSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndmFsdWUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGtleSgpOiBzdHJpbmcgfCBmYWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdrZXknKSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdrZXknKSA/PyBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldCB2YWx1ZSh2YWx1ZTogVmFWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd2YWx1ZScsIChBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ29iamVjdCcpID8gSlNPTi5zdHJpbmdpZnkodmFsdWUpIDogdmFsdWUudG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlVG9CZVByaW50ZWQgPSAhQXJyYXkuaXNBcnJheSh0aGlzLnZhbHVlKSA/ICh0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ29iamVjdCcgP1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVbdGhpcy5rZXkgPyB0aGlzLmtleSA6IDBdIDogXHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUpIDogJ1ByaW50aW5nIGFuIGFycmF5IGlzIG5vdCBzdXBwb3J0ZWQgdXNlIFZhRWFjaCBpbnN0ZWFkJyBcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdodG1sJykpXHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93Um9vdC5pbm5lckhUTUwgPSB2YWx1ZVRvQmVQcmludGVkO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5zaGFkb3dSb290LnRleHRDb250ZW50ID0gdmFsdWVUb0JlUHJpbnRlZDtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IFZhVmFsdWUgZnJvbSBcIi4uL3R5cGVzL1ZhVmFsdWVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhUHJpbnRHcm91cCBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coeyAnbW9kZSc6ICdvcGVuJyB9KTtcclxuICAgIH1cclxuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAoYXR0cmlidXRlTmFtZSA9PT0gJ3ZhbHVlJykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVuZGVyKClcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIFsndmFsdWUnXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmFsdWUoKTogVmFWYWx1ZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCd2YWx1ZScpKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLmdldEF0dHJpYnV0ZSgndmFsdWUnKSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNldCB2YWx1ZSh2YWx1ZTogVmFWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd2YWx1ZScsIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2hhZG93Um9vdC5pbm5lckhUTUwgPSB0aGlzLmlubmVySFRNTDtcclxuICAgICAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvckFsbCgndmEtcHJpbnQ6bm90KHZhLXByaW50W2lkXSknKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCd2YWx1ZScsIEpTT04uc3RyaW5naWZ5KHRoaXMudmFsdWUpKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogTmFtZTogVmFzdGF0ZS5qc1xyXG4gKiBWZXJzaW9uOiAxLjMuMFxyXG4gKiBMaWNlbnNlOiBNSVRcclxuICovXHJcblxyXG5pbXBvcnQgVmFFYWNoIGZyb20gXCIuL2NvbXBvbmVudHMvVmFFYWNoXCI7XHJcbmltcG9ydCBWYVByaW50IGZyb20gXCIuL2NvbXBvbmVudHMvVmFQcmludFwiO1xyXG5pbXBvcnQgVmFQcmludEdyb3VwIGZyb20gXCIuL2NvbXBvbmVudHMvVmFQcmludEdyb3VwXCI7XHJcbmltcG9ydCBWYVZhbHVlIGZyb20gXCIuL3R5cGVzL1ZhVmFsdWVcIjtcclxuXHJcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3ZhLXByaW50JywgVmFQcmludCk7XHJcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3ZhLWVhY2gnLCBWYUVhY2gpO1xyXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd2YS1wcmludC1ncm91cCcsIFZhUHJpbnRHcm91cCk7XHJcblxyXG4vKipcclxuICogVmFzdGF0ZSBpcyBhIGphdmFzY3JpcHQgbGlicmFyeSB0aGF0IGNhbiBiZSB1c2VkIHRvIHByaW50IGphdmFzY3JpcHQgdmFyaWFibGVzIHRvIGh0bWwgZWFzaWx5XHJcbiAqL1xyXG5jbGFzcyBWYXN0YXRlIHtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgSFRNTCBFbGVtZW50IG9mIHRoZSBzdGF0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZWxlbWVudDogVmFQcmludCB8IFZhRWFjaDtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgc3RhdGUgdmFsdWVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0ZVZhbHVlOiBWYVZhbHVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIHN0b3JhZ2UgdG8gYmUgdXNlZCBieSB0aGUgc3RhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdG9yYWdlOiBTdG9yYWdlID0gbG9jYWxTdG9yYWdlO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgVmFzdGF0ZSBpbnN0YW5jZVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCBTdGF0ZSBOYW1lIGl0IGNhbiBiZSBhIFZhUHJpbnQvVmFFYWNoIEhUTUwgRWxlbWVudCBvciBhIHN0cmluZyBjb250YWluaW5nIHRoZSBpZCBvZiB0aGUgVmFQcmludC9WYUVhY2ggSFRNTCBFbGVtZW50XHJcbiAgICAgKiBAcGFyYW0gZGVmYXVsdFZhbHVlIERlZmF1bHQgdmFsdWUgb2YgdGhlIHN0YXRlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IFZhUHJpbnQgfCBWYUVhY2ggfCBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogVmFWYWx1ZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZWxlbWVudCAhPT0gJ3N0cmluZycpIFxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KSBhcyBWYVByaW50IHwgVmFFYWNoXHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IGRlZmF1bHRWYWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdmFsdWUgb2YgdGhlIHN0YXRlXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSB0byBiZSBzZXRcclxuICAgICAqL1xyXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBWYVZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVWYWx1ZSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZVZhbHVlID0gdmFsdWVcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHZhbHVlIG9mIHRoZSBzdGF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyBWYWx1ZSBvZiB0aGUgc3RhdGVcclxuICAgICAqL1xyXG4gICAgZ2V0IHZhbHVlKCk6IFZhVmFsdWUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlVmFsdWVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHN0YXRlIHZhbHVlIGluIHRoZSBET01cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnZhbHVlID0gdGhpcy5zdGF0ZVZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGtleShrZXk6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2tleScsIGtleSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGtleSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdrZXknKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgc3RvcmFnZSB0byBiZSB1c2VkIGJ5IHRoZSBzdGF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gc3RvcmFnZSBTdG9yYWdlIHRvIGJlIHVzZWQgdG8gc3RvcmUgdGhlIHN0YXRlXHJcbiAgICAgKiBAcmV0dXJucyBSZXR1cm5zIHRoZSBWYXN0YXRlIGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTYXZlU3RvcmFnZShzdG9yYWdlOiBTdG9yYWdlKTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZVxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTYXZlcyB0aGUgc3RhdGUgdmFsdWUgdG8gdGhlIHN0b3JhZ2VcclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMgUmV0dXJuIFZhc3RhdGUgaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNhdmUoKTogdGhpcyB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RvcmFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmVsZW1lbnQuaWQsIHR5cGVvZiB0aGlzLnN0YXRlVmFsdWUgPT09ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkodGhpcy5zdGF0ZVZhbHVlKSA/IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGVWYWx1ZSkgOiB0aGlzLnN0YXRlVmFsdWUudG9TdHJpbmcoKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBzdGF0ZSB2YWx1ZSBmcm9tIHRoZSBzdG9yYWdlXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIFJldHVybnMgdGhlIFZhc3RhdGUgaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWQoKTogdGhpcyB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RvcmFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gSlNPTi5wYXJzZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmtleSkgfHwgJ251bGwnKSA/PyB0aGlzLnN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmVsZW1lbnQuaWQpID8/IHRoaXMudmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG4vLyBjbGFzcyBWYXN0YXRlIHtcclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIFN0YXRlIHZhbHVlXHJcbi8vICAgICAgKlxyXG4vLyAgICAgICogQHByaXZhdGVcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSB2YWx1ZTogdmFzdGF0ZVZhbHVlXHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiBQbGFjZWhvbGRlciB0aGF0IHdpbGwgYmUgcmVwbGFjZWQgd2l0aFxyXG4vLyAgICAgICogU3RhdGUgdmFsdWUgd2hlbiBzaG93ZWQgaW4gSFRNTFxyXG4vLyAgICAgICpcclxuLy8gICAgICAqIEBwcml2YXRlXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgcmVhZG9ubHkgcGxhY2Vob2xkZXI6IGFueSA9ICd7I1ZBTFVFI30nXHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiBTdGF0ZSBwcmV2aW91c1ZhbHVlXHJcbi8vICAgICAgKlxyXG4vLyAgICAgICogQHByaXZhdGVcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSBwcmV2aW91c1ZhbHVlOiB2YXN0YXRlVmFsdWUgPSB0aGlzLnBsYWNlaG9sZGVyXHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiBTdGF0ZSBOYW1lXHJcbi8vICAgICAgKlxyXG4vLyAgICAgICogQHByaXZhdGVcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSByZWFkb25seSBuYW1lOiBzdHJpbmdcclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIExvYWRpbmcgc3RhdHVzXHJcbi8vICAgICAgKlxyXG4vLyAgICAgICogQHByaXZhdGVcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSBpc0xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICogR2xvYmFsIExvYWRpbmcgVGVtcGxhdGVcclxuLy8gICAgICAqXHJcbi8vICAgICAgKiBAcHJpdmF0ZVxyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIHN0YXRpYyBsb2FkaW5nVGVtcGxhdGU6IHN0cmluZyA9ICcnXHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiBMb2FkaW5nIHRlbXBsYXRlIGZvciBzcGVjaWZpYyBzdGF0ZVxyXG4vLyAgICAgICpcclxuLy8gICAgICAqIEBwcml2YXRlXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgbG9hZGluZ1RlbXBsYXRlOiBzdHJpbmcgPSBWYXN0YXRlLmxvYWRpbmdUZW1wbGF0ZTtcclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIGV2ZW50cyB3aWxsIGJlIHVzZWQgd2hlbiBjcmVhdGVkIGEgbmV3IGV2ZW50XHJcbi8vICAgICAgKiB1c2luZyBvbiBtZXRob2Qgb3IgdHJpZ2dlcmluZyBhbiBleGlzdGluZyBldmVudCB1c2luZyB0cmlnZ2VyIG1ldGhvZFxyXG4vLyAgICAgICogdGhlcmUgaXMgYSBkZWZhdWx0IGV2ZW50IHdoaWNoIGlzIGNoYW5nZSB0aGF0IHdpbGwgcmVsb2FkIHRoZSBkb21cclxuLy8gICAgICAqXHJcbi8vICAgICAgKiBAcHJpdmF0ZVxyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIGV2ZW50czoge1trZXk6IHN0cmluZ106IENhbGxhYmxlRnVuY3Rpb259ID0ge1xyXG4vLyAgICAgICAgIFwiY2hhbmdlXCI6ICgpID0+IHt9XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiBTYXZlIG1vZGUgaXMgdXNlZCB0byBzZWUgd2hlcmUgdG8gc2F2ZSB0aGUgc3RhdGVcclxuLy8gICAgICAqXHJcbi8vICAgICAgKiBAcHJpdmF0ZVxyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIHNhdmVNb2RlOiBzYXZlTW9kZSA9ICdsb2NhbFN0b3JhZ2UnO1xyXG5cclxuLy8gICAgIHByaXZhdGUgcmVhZG9ubHkgZ3JvdXBlZFZhc3RhdGVQcmludHNTZWxlY3Rvcjogc3RyaW5nID0gYHZhc3RhdGUtcHJpbnQ6bm90KHZhc3RhdGUtcHJpbnRbc3RhdGVdKSwgW3Zhc3RhdGUtcHJpbnRdOm5vdChbdmFzdGF0ZS1wcmludF1bc3RhdGVdKWA7XHJcblxyXG4vLyAgICAgcHJpdmF0ZSByZWFkb25seSB2YXN0YXRlUHJpbnRzU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIGluaXRpYWxpemUgbmV3IHN0YXRlXHJcbi8vICAgICAgKlxyXG4vLyAgICAgICogQHBhcmFtIG5hbWVcclxuLy8gICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4vLyAgICAgICovXHJcbi8vICAgICBjb25zdHJ1Y3RvciggbmFtZTogc3RyaW5nLCB2YWx1ZTogdmFzdGF0ZVZhbHVlICkge1xyXG4vLyAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxyXG4vLyAgICAgICAgIHRoaXMubmFtZSA9IG5hbWVcclxuLy8gICAgICAgICB0aGlzLnZhc3RhdGVQcmludHNTZWxlY3RvciA9IGB2YXN0YXRlLXByaW50W3N0YXRlPVwiJHsgdGhpcy5uYW1lIH1cIl0sIFt2YXN0YXRlLXByaW50XVtzdGF0ZT1cIiR7IHRoaXMubmFtZSB9XCJdOm5vdChbdmFzdGF0ZS1ncm91cF0pYFxyXG4vLyAgICAgICAgIHRoaXMucmVsb2FkRG9tKClcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIFJlbW92ZSB2YXN0YXRlLWxvYWRlciBhdHRyaWJ1dGVcclxuLy8gICAgICAqL1xyXG4vLyAgICAgc3RhdGljIG1vdW50KCkge1xyXG4vLyAgICAgICAgIHN0eWxlLnJlbW92ZSgpXHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiBTZXQgbG9hZGluZyBzdGF0dXNcclxuLy8gICAgICAqXHJcbi8vICAgICAgKiBAcGFyYW0gbG9hZGluZ1xyXG4vLyAgICAgICogQHJldHVybiB0aGlzXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHNldExvYWRpbmcoIGxvYWRpbmc6IGJvb2xlYW4gKTogdGhpcyB7XHJcbi8vICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBsb2FkaW5nXHJcbi8vICAgICAgICAgdGhpcy5yZWxvYWREb20oKVxyXG4vLyAgICAgICAgIHJldHVybiB0aGlzXHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiBTZXQgR2xvYmFsIGxvYWRpbmcgdGVtcGxhdGVcclxuLy8gICAgICAqXHJcbi8vICAgICAgKiBAcGFyYW0gbG9hZGluZ1RlbXBsYXRlXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHN0YXRpYyBzZXRMb2FkaW5nVGVtcGxhdGUoIGxvYWRpbmdUZW1wbGF0ZTogc3RyaW5nICkge1xyXG4vLyAgICAgICAgIHRoaXMubG9hZGluZ1RlbXBsYXRlID0gbG9hZGluZ1RlbXBsYXRlXHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiBHZXQgY3VycmVudCBzdGF0ZSB2YWx1ZVxyXG4vLyAgICAgICovXHJcbi8vICAgICBnZXQoKTogdmFzdGF0ZVZhbHVlIHtcclxuLy8gICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICogZ2V0IHByZXZpb3VzIHN0YXRlIHZhbHVlXHJcbi8vICAgICAgKlxyXG4vLyAgICAgICovXHJcbi8vICAgICBnZXRQcmV2aW91c1ZhbHVlKCk6IHZhc3RhdGVWYWx1ZSB7XHJcbi8vICAgICAgICAgcmV0dXJuIHRoaXMucHJldmlvdXNWYWx1ZVxyXG4vLyAgICAgfVxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiBTZXQgc3RhdGUgdmFsdWVcclxuLy8gICAgICAqXHJcbi8vICAgICAgKiBAcGFyYW0gdmFsdWVcclxuLy8gICAgICAqIEByZXR1cm4gdGhpc1xyXG4vLyAgICAgICovXHJcbi8vICAgICBzZXQoIHZhbHVlOiB2YXN0YXRlVmFsdWUgKTogdGhpcyB7XHJcbi8vICAgICAgICAgaWYgKCB0aGlzLnZhbHVlICE9IHRoaXMucHJldmlvdXNWYWx1ZSApXHJcbi8vICAgICAgICAgICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IHRoaXMudmFsdWVcclxuLy8gICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWVcclxuLy8gICAgICAgICB0aGlzLnRyaWdnZXIoJ2NoYW5nZScpXHJcbi8vICAgICAgICAgdGhpcy5yZWxvYWREb20oKVxyXG4vLyAgICAgICAgIHJldHVybiB0aGlzXHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiBDcmVhdGUgYSBuZXcgZXZlbnQgdGhhdCBjYW4gYmUgdHJpZ2dlcmVkXHJcbi8vICAgICAgKiB1c2luZyB0cmlnZ2VyIG1ldGhvZFxyXG4vLyAgICAgICpcclxuLy8gICAgICAqIEBwYXJhbSBldmVudFxyXG4vLyAgICAgICogQHBhcmFtIGNhbGxiYWNrXHJcbi8vICAgICAgKi9cclxuLy8gICAgIG9uKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBDYWxsYWJsZUZ1bmN0aW9uKTogdm9pZCB7XHJcbi8vICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gY2FsbGJhY2tcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIFRyaWdnZXIgYSBldmVudCB0aGF0IGlzIGNyZWF0ZWQgdXNpbmcgb24gbWV0aG9kXHJcbi8vICAgICAgKlxyXG4vLyAgICAgICogQHBhcmFtIGV2ZW50XHJcbi8vICAgICAgKiBAcGFyYW0gcGFyYW1zXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHRyaWdnZXIoZXZlbnQ6IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSkge1xyXG4vLyAgICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudF0pXHJcbi8vICAgICAgICAge1xyXG4vLyAgICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0oLi4ucGFyYW1zKVxyXG4vLyAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgIFZhc3RhdGUudGhyb3dFcnJvcihgVW5kZWZpbmVkIGV2ZW50ICcke2V2ZW50fScuIERpZCB5b3UgY3JlYXRlZCB0aGUgZXZlbnQgdXNpbmcgJ29uJyBtZXRob2Q/YClcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiBSZWxvYWQgdGhlIERPTSB3aGVuIHZhbHVlIG9yIGxvYWRpbmcgc3RhdGUgaXMgY2hhbmdlZFxyXG4vLyAgICAgICpcclxuLy8gICAgICAqIEBwcml2YXRlXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgcmVsb2FkRG9tKCkge1xyXG4vLyAgICAgICAgIHRoaXMucmVsb2FkVmFzdGF0ZUVhY2hzKClcclxuLy8gICAgICAgICB0aGlzLnJlbG9hZFZhc3RhdGVQcmludHMoKVxyXG4vLyAgICAgICAgIHRoaXMucmVsb2FkVmFzdGF0ZUdyb3VwcygpXHJcbi8vICAgICB9XHJcblxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICogUmVsb2FkIGFsbCB2YXN0YXRlLXByaW50IHRhZ3MvYXR0cmlidXRlXHJcbi8vICAgICAgKiBpbiB0aGUgRE9NXHJcbi8vICAgICAgKlxyXG4vLyAgICAgICogQHByaXZhdGVcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSByZWxvYWRWYXN0YXRlUHJpbnRzKCBwYXJlbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuYm9keSApIHtcclxuLy8gICAgICAgICBjb25zdCB2YXN0YXRlUHJpbnRzID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIHBhcmVudC5oYXNBdHRyaWJ1dGUoICd2YXN0YXRlLXByaW50LWdyb3VwJyApIHx8IHBhcmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT0gXCJ2YXN0YXRlLXByaW50LWdyb3VwXCIgPyB0aGlzLmdyb3VwZWRWYXN0YXRlUHJpbnRzU2VsZWN0b3IgOiB0aGlzLnZhc3RhdGVQcmludHNTZWxlY3RvciApXHJcbi8vICAgICAgICAgdmFzdGF0ZVByaW50cy5mb3JFYWNoKCAoIHZhc3RhdGVQcmludDogSFRNTEVsZW1lbnQgKSA9PiB7XHJcbi8vICAgICAgICAgICAgIGlmICggdGhpcy5pc0xvYWRpbmcgKSB7XHJcbi8vICAgICAgICAgICAgICAgICB2YXN0YXRlUHJpbnQuaW5uZXJIVE1MICs9IHRoaXMubG9hZGluZ1RlbXBsYXRlXHJcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbi8vICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZVRvQmVQcmludGVkID0gdmFzdGF0ZVByaW50Lmhhc0F0dHJpYnV0ZSgnb2JqJykgJiYgdHlwZW9mIHRoaXMucHJldmlvdXNWYWx1ZSA9PT0gJ29iamVjdCcgPyB0aGlzLnByZXZpb3VzVmFsdWVbdmFzdGF0ZVByaW50LmdldEF0dHJpYnV0ZSgnb2JqJyldLnRvU3RyaW5nKCkgOiB0aGlzLnByZXZpb3VzVmFsdWUudG9TdHJpbmcoKVxyXG5cclxuLy8gICAgICAgICAgICAgICAgIHZhc3RhdGVQcmludC5pbm5lckhUTUwgPSB2YXN0YXRlUHJpbnQuaW5uZXJIVE1MLnNwbGl0KCB0aGlzLmxvYWRpbmdUZW1wbGF0ZSApLmpvaW4oICcnIClcclxuLy8gICAgICAgICAgICAgICAgIGlmICggdmFzdGF0ZVByaW50Lmhhc0F0dHJpYnV0ZSggJ2h0bWwnICkgKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgdmFzdGF0ZVByaW50LmlubmVySFRNTCA9IHZhc3RhdGVQcmludC5pbm5lckhUTUwuc3BsaXQoIHZhbHVlVG9CZVByaW50ZWQgKS5qb2luKCB0aGlzLmdldFZhc3RhdGVQcmludFZhbHVlKCB2YXN0YXRlUHJpbnQgKSApXHJcbi8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHZhc3RhdGVQcmludC50ZXh0Q29udGVudCA9IHZhc3RhdGVQcmludC50ZXh0Q29udGVudC5zcGxpdCggdmFsdWVUb0JlUHJpbnRlZCApLmpvaW4oIHRoaXMuZ2V0VmFzdGF0ZVByaW50VmFsdWUoIHZhc3RhdGVQcmludCApIClcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH0gKVxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICogUmVsb2FkIGFsbCB2YXN0YXRlLWVhY2ggdGFncy9hdHRyaWJ1dGVcclxuLy8gICAgICAqIGluIHRoZSBET01cclxuLy8gICAgICAqXHJcbi8vICAgICAgKiBAcHJpdmF0ZVxyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIHJlbG9hZFZhc3RhdGVFYWNocyggcGFyZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmJvZHkgKSB7XHJcbi8vICAgICAgICAgY29uc3QgdmFzdGF0ZUVhY2hzID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIGB2YXN0YXRlLWVhY2hbc3RhdGU9XCIkeyB0aGlzLm5hbWUgfVwiXSwgW3Zhc3RhdGUtZWFjaF1bc3RhdGU9XCIkeyB0aGlzLm5hbWUgfVwiXWAgKVxyXG4vLyAgICAgICAgIHZhc3RhdGVFYWNocy5mb3JFYWNoKCAoIHZhc3RhdGVFYWNoOiBIVE1MRWxlbWVudCApID0+IHtcclxuLy8gICAgICAgICAgICAgdGhpcy5yZXNldFZhc3RhdGVFYWNoKCB2YXN0YXRlRWFjaCApXHJcbi8vICAgICAgICAgICAgIGNvbnN0IHN0YXRlVmFsdWVBcnI6IGFueSA9IEFycmF5LmlzQXJyYXkoIHRoaXMuZ2V0KCkgKSA/IHRoaXMuZ2V0KCkgOiBbXVxyXG5cclxuLy8gICAgICAgICAgICAgaWYgKCBzdGF0ZVZhbHVlQXJyLmxlbmd0aCA8IDEgKSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoICEgdGhpcy5pc0xvYWRpbmcgKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFZhc3RhdGVFYWNoKCB2YXN0YXRlRWFjaCApXHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICB2YXN0YXRlRWFjaC5pbm5lckhUTUwgKz0gdGhpcy5sb2FkaW5nVGVtcGxhdGVcclxuLy8gICAgICAgICAgICAgICAgIHJldHVyblxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHN0YXRlVmFsdWVBcnI/LmZvckVhY2goICggdmFsOiBhbnkgKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdENoaWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggYHZhc3RhdGUtZWFjaFtzdGF0ZT1cIiR7IHRoaXMubmFtZSB9XCJdID4gKiwgW3Zhc3RhdGUtZWFjaF1bc3RhdGU9XCIkeyB0aGlzLm5hbWUgfVwiXSA+ICpgIClcclxuLy8gICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlOiBhbnkgPSBmaXJzdENoaWxkPy5jbG9uZU5vZGUoIHRydWUgKVxyXG4vLyAgICAgICAgICAgICAgICAgdGVtcGxhdGUucmVtb3ZlQXR0cmlidXRlKCAnaGlkZGVuJyApXHJcbi8vICAgICAgICAgICAgICAgICBpZiAoIHRlbXBsYXRlLnRhZ05hbWUudG9Mb2NhbGVMb3dlckNhc2UoKSA9PSBcInZhc3RhdGUtcHJpbnRcIiB8fCB0ZW1wbGF0ZS5oYXNBdHRyaWJ1dGUoICd2YXN0YXRlLXByaW50JyApICkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHRlbXBsYXRlLmlubmVySFRNTD8uc3BsaXQoIHRoaXMucGxhY2Vob2xkZXIgKS5qb2luKCB0aGlzLmdldFZhc3RhdGVQcmludFZhbHVlKCB0ZW1wbGF0ZSwgdmFsICkgKVxyXG4vLyAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZT8ucXVlcnlTZWxlY3RvckFsbCggJ3Zhc3RhdGUtcHJpbnQsIFt2YXN0YXRlLXByaW50XScgKS5mb3JFYWNoKCAoIHByOiBIVE1MRWxlbWVudCApID0+IHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcHIucmVtb3ZlQXR0cmlidXRlKCAnaGlkZGVuJyApXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHByLmlubmVySFRNTCA9IHByLmlubmVySFRNTD8uc3BsaXQoIHRoaXMucGxhY2Vob2xkZXIgKS5qb2luKCB0aGlzLmdldFZhc3RhdGVQcmludFZhbHVlKCBwciwgdmFsICkgKVxyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgICB9IClcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIHZhc3RhdGVFYWNoLmFwcGVuZENoaWxkKCB0ZW1wbGF0ZSApXHJcbi8vICAgICAgICAgICAgIH0gKVxyXG4vLyAgICAgICAgIH0gKVxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHByaXZhdGUgcmVsb2FkVmFzdGF0ZUdyb3VwcygpOiB2b2lkIHtcclxuLy8gICAgICAgICBjb25zdCBncm91cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PiggYHZhc3RhdGUtcHJpbnQtZ3JvdXBbc3RhdGU9XCIkeyB0aGlzLm5hbWUgfVwiXSwgW3Zhc3RhdGUtcHJpbnQtZ3JvdXBdW3N0YXRlPVwiJHsgdGhpcy5uYW1lIH1cIl1gIClcclxuLy8gICAgICAgICBncm91cHMuZm9yRWFjaCggKCBncm91cDogSFRNTEVsZW1lbnQgKSA9PiB0aGlzLnJlbG9hZFZhc3RhdGVQcmludHMoIGdyb3VwICkgKVxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICogR2V0cyB0aGUgdmFsdWUgdGhhdCB3aWxsIGJlIHByaW50ZWQgaW4gVmFzdGF0ZSBwcmludFxyXG4vLyAgICAgICpcclxuLy8gICAgICAqIEBwYXJhbSB2YXN0YXRlUHJpbnRcclxuLy8gICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4vLyAgICAgICogQHByaXZhdGVcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSBnZXRWYXN0YXRlUHJpbnRWYWx1ZSggdmFzdGF0ZVByaW50OiBIVE1MRWxlbWVudCwgdmFsdWUgPSB0aGlzLmdldCgpICkge1xyXG5cclxuLy8gICAgICAgICBpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiAhIHZhc3RhdGVQcmludC5oYXNBdHRyaWJ1dGUoICdvYmonICkgKSB7XHJcblxyXG4vLyAgICAgICAgICAgICBWYXN0YXRlLnRocm93RXJyb3IoICdZb3UgYXJlIHRyeWluZyB0byBwcmludCBhbiBvYmplY3Qgd2l0aG91dCBwYXNzaW5nIG9iaiBhdHRyaWJ1dGUgaW4gdmFzdGF0ZSBwcmludCcsIHZhc3RhdGVQcmludCApXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuLy8gICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIE9iamVjdC5rZXlzKCB2YWx1ZSApLmxlbmd0aCA+IDAgPyB2YWx1ZVt2YXN0YXRlUHJpbnQuZ2V0QXR0cmlidXRlKCAnb2JqJyApLnRvU3RyaW5nKCkgPz8gT2JqZWN0LmtleXMoIHRoaXMuZ2V0KCkgKVswXV0gOiB2YWx1ZVxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHByaXZhdGUgc3RhdGljIHRocm93RXJyb3IoIGVycm9yOiBzdHJpbmcsIGVsZW1lbnQ/OiBIVE1MRWxlbWVudCApIHtcclxuLy8gICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmQgPSBcImhzbGEoMCwwJSw5MCUsMSlcIlxyXG4vLyAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuY29sb3IgPSBcImhzbGEoMCwwJSwxMCUsLjkpXCJcclxuLy8gICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmZvbnRGYW1pbHkgPSBcImFyaWFsXCJcclxuLy8gICAgICAgICBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGBcclxuLy8gICAgICAgICAgICAgICAgIDxoMT5WYXN0YXRlIEpTIEVycm9yPC9oMT5cclxuLy8gICAgICAgICAgICAgICAgIDxzdHJvbmc+JHsgZXJyb3IgfTwvc3Ryb25nPlxyXG4vLyAgICAgICAgICAgICAgICAgPGJyPlxyXG4vLyAgICAgICAgICAgICAgICAgJHsgZWxlbWVudCA/IGBcclxuLy8gICAgICAgICAgICAgICAgIDxzdHJvbmc+SGVscGZ1bCBJbmZvOjwvc3Ryb25nPlxyXG4vLyAgICAgICAgICAgICAgICAgPGJyPlxyXG4vLyAgICAgICAgICAgICAgICAgPGJyPlxyXG4vLyAgICAgICAgICAgICAgICAgPHByZSAgc3R5bGU9XCIgIGJhY2tncm91bmQ6ICMyNjI2MjY7IGNvbG9yOndoaXRlO1xyXG4vLyAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4vLyAgIHBhZGRpbmc6IDFyZW07XHJcbi8vICAgYm9yZGVyLXJhZGl1czogNnB4O1wiPlxyXG4vLyAgICAgICAgICAgICAgICAgPGNvZGU+JHsgZWxlbWVudC5vdXRlckhUTUwuc3BsaXQoICc8JyApLmpvaW4oICcmbHQ7JyApLnNwbGl0KCAnPicgKS5qb2luKCAnJmd0OycgKSB9PC9jb2RlPlxyXG4vLyAgICAgICAgICAgICAgICAgPC9wcmU+YCA6IGBgIH0gICAgICAgICAgICBcclxuLy8gYFxyXG4vLyAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoIGBWYXN0YXRlIEpTIEVycm9yOiAkeyBlcnJvciB9YCApXHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcHJpdmF0ZSByZXNldFZhc3RhdGVFYWNoKCB2YXN0YXRlRWFjaDogSFRNTEVsZW1lbnQgKTogdm9pZCB7XHJcbi8vICAgICAgICAgLy8gcmVtb3ZlIHByZWxvYWRlciBmcm9tIHRoZSBwYWdlXHJcbi8vICAgICAgICAgdmFzdGF0ZUVhY2guaW5uZXJIVE1MID0gdmFzdGF0ZUVhY2guaW5uZXJIVE1MLnNwbGl0KCB0aGlzLmxvYWRpbmdUZW1wbGF0ZSApLmpvaW4oICcnIClcclxuLy8gICAgICAgICAvLyByZW1vdmUgYWxsIGNoaWxkcmVuIGV4Y2VwdCBmaXJzdCBvbmVcclxuLy8gICAgICAgICB2YXN0YXRlRWFjaC5xdWVyeVNlbGVjdG9yQWxsKCAnOnNjb3BlID4gKicgKS5mb3JFYWNoKCAoIGU6IEhUTUxFbGVtZW50LCBpICkgPT4gaSAhPT0gMCA/IGUucmVtb3ZlKCkgOiB2b2lkIDAgKVxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICogU2V0IGxvYWRpbmcgdGVtcGxhdGUgZm9yIHNwZWNpZmljIHN0YXRlXHJcbi8vICAgICAgKlxyXG4vLyAgICAgICogQHBhcmFtIHRlbXBsYXRlXHJcbi8vICAgICAgKiBAcmV0dXJuIHRoaXNcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIHNldExvYWRpbmdUZW1wbGF0ZSggdGVtcGxhdGU6IHN0cmluZyApOiB0aGlzIHtcclxuLy8gICAgICAgICB0aGlzLmxvYWRpbmdUZW1wbGF0ZSA9IHRlbXBsYXRlXHJcbi8vICAgICAgICAgcmV0dXJuIHRoaXNcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIGNoYW5nZSBjdXJyZW50IHNhdmUgbW9kZVxyXG4vLyAgICAgICpcclxuLy8gICAgICAqIEBwYXJhbSBzYXZlTW9kZVxyXG4vLyAgICAgICogQHJldHVybiB0aGlzXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBzZXRTYXZlTW9kZSggc2F2ZU1vZGU6IHNhdmVNb2RlICk6IHRoaXMge1xyXG4vLyAgICAgICAgIHRoaXMuc2F2ZU1vZGUgPSBzYXZlTW9kZVxyXG4vLyAgICAgICAgIHJldHVybiB0aGlzXHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiBnZXQgY3VycmVudCBzYXZlIG1vZGVcclxuLy8gICAgICAqXHJcbi8vICAgICAgKiBAcmV0dXJuIHNhdmVNb2RlXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBnZXRTYXZlTW9kZSgpOiBzYXZlTW9kZSB7XHJcbi8vICAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZU1vZGVcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIHNhdmUgY3VycmVudCBzdGF0ZSB0byBsb2NhbFN0b3JhZ2Uvc2Vzc2lvblN0b3JhZ2VcclxuLy8gICAgICAqXHJcbi8vICAgICAgKiBAcmV0dXJuIHRoaXNcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIHNhdmUoKTogdGhpcyB7XHJcbi8vICAgICAgICAgY29uc3QgdmFsdWUgPSB0eXBlb2YgdGhpcy5nZXQoKSA9PSAnb2JqZWN0JyB8fCBBcnJheS5pc0FycmF5KCB0aGlzLmdldCgpICkgPyBKU09OLnN0cmluZ2lmeSggdGhpcy5nZXQoKSApIDogdGhpcy5nZXQoKS50b1N0cmluZygpO1xyXG4vLyAgICAgICAgIHN3aXRjaCAoIHRoaXMuZ2V0U2F2ZU1vZGUoKSApIHtcclxuLy8gICAgICAgICAgICAgY2FzZSBcImxvY2FsU3RvcmFnZVwiOlxyXG4vLyAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oIHRoaXMubmFtZSwgdmFsdWUgKVxyXG4vLyAgICAgICAgICAgICAgICAgYnJlYWtcclxuLy8gICAgICAgICAgICAgY2FzZSBcInNlc3Npb25TdG9yYWdlXCI6XHJcbi8vICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCB0aGlzLm5hbWUsIHZhbHVlIClcclxuLy8gICAgICAgICAgICAgICAgIGJyZWFrXHJcbi8vICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbi8vICAgICAgICAgICAgICAgICBWYXN0YXRlLnRocm93RXJyb3IoICdVbnN1cHBvcnRlZCBzYXZlIG1vZGU6ICcgKyB0aGlzLmdldFNhdmVNb2RlKCkgKVxyXG4vLyAgICAgICAgICAgICAgICAgYnJlYWtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcmV0dXJuIHRoaXNcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIHJlc3RvcmUgdGhlIHN0YXRlIGZyb20gbG9jYWxTdG9yYWdlL3Nlc3Npb25TdG9yYWdlXHJcbi8vICAgICAgKlxyXG4vLyAgICAgICogQHJldHVybiB0aGlzXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyByZXN0b3JlKCk6IHRoaXMge1xyXG4vLyAgICAgICAgIHN3aXRjaCAoIHRoaXMuZ2V0U2F2ZU1vZGUoKSApIHtcclxuLy8gICAgICAgICAgICAgY2FzZSBcImxvY2FsU3RvcmFnZVwiOlxyXG4vLyAgICAgICAgICAgICAgICAgaWYgKCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSggdGhpcy5uYW1lICkgKVxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KCBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCB0aGlzLm5hbWUgKSkgKVxyXG4vLyAgICAgICAgICAgICAgICAgYnJlYWtcclxuLy8gICAgICAgICAgICAgY2FzZSBcInNlc3Npb25TdG9yYWdlXCI6XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oIHRoaXMubmFtZSApIClcclxuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLnNldCggSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCB0aGlzLm5hbWUgKSkgKVxyXG4vLyAgICAgICAgICAgICAgICAgYnJlYWtcclxuLy8gICAgICAgICAgICAgZGVmYXVsdDpcclxuLy8gICAgICAgICAgICAgICAgIFZhc3RhdGUudGhyb3dFcnJvciggJ1Vuc3VwcG9ydGVkIHNhdmUgbW9kZTogJyArIHRoaXMuZ2V0U2F2ZU1vZGUoKSApXHJcbi8vICAgICAgICAgICAgICAgICBicmVha1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gdGhpc1xyXG4vLyAgICAgfVxyXG4vLyB9XHJcbmV4cG9ydCBkZWZhdWx0IFZhc3RhdGUiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=