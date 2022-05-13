/**
 * Name: Vastate.js
 * Version: 1.3.0
 * License: MIT
 */

import VaEach from "./components/VaEach";
import VaPrint from "./components/VaPrint";
import VaPrintGroup from "./components/VaPrintGroup";
import VaValue from "./types/VaValue";

window.customElements.define('va-print', VaPrint);
window.customElements.define('va-each', VaEach);
window.customElements.define('va-print-group', VaPrintGroup);

/**
 * Vastate is a javascript library that can be used to print javascript variables to html easily
 */
class Vastate {
    
    /**
     * Holds the HTML Element of the state
     */
    public element: VaPrint | VaEach;
    
    /**
     * Holds the state value
     */
    private stateValue: VaValue;

    /**
     * Holds the storage to be used by the state
     */
    private storage: Storage = localStorage;
    
    /**
     * Creates a new Vastate instance
     * 
     * @param element State Name it can be a VaPrint/VaEach HTML Element or a string containing the id of the VaPrint/VaEach HTML Element
     * @param defaultValue Default value of the state
     */
    constructor(element: VaPrint | VaEach | string, defaultValue: VaValue) {
        if (typeof element !== 'string') 
            this.element = element
        else
            this.element = document.getElementById(element) as VaPrint | VaEach
        this.value = defaultValue
    }

    /**
     * Sets the value of the state
     * 
     * @param value Value to be set
     */
    set value(value: VaValue) {
        if (this.stateValue !== value) {
            this.stateValue = value
            this.update()
        }
    }

    /**
     * Gets the value of the state
     * 
     * @returns Value of the state
     */
    get value(): VaValue {
        return this.stateValue
    }

    /**
     * Updates the state value in the DOM
     */
    private update(): void {
        this.element.value = this.stateValue
    }

    set key(key: string) {
        this.element.setAttribute('key', key)
    }
    
    get key(): string {
        return this.element.getAttribute('key')
    }

    /**
     * Sets the storage to be used by the state
     * 
     * @param storage Storage to be used to store the state
     * @returns Returns the Vastate instance
     */
    public setSaveStorage(storage: Storage): this {
        this.storage = storage
        return this
    }

    /**
     * Saves the state value to the storage
     * 
     * @returns Return Vastate instance
     */
    public save(): this {
        if (this.storage) {
            this.storage.setItem(this.element.id, typeof this.stateValue === 'object' || Array.isArray(this.stateValue) ? JSON.stringify(this.stateValue) : this.stateValue.toString())
        }
        return this
    }

    /**
     * Loads the state value from the storage
     * 
     * @returns Returns the Vastate instance
     */
    public load(): this {
        if (this.storage) {
            this.value = JSON.parse(this.storage.getItem(this.key) || 'null') ?? this.storage.getItem(this.element.id) ?? this.value
        }
        return this
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
export default Vastate