/**
 * Name: Vastate.js
 * Version: 1.0
 * License: MIT
 */
type vastateValue = string | number | any[] | boolean | null

class Vastate {
    /**
     * State value
     *
     * @private
     */
    private value: vastateValue
    /**
     * Placeholder that will be replaced with
     * State value when showed in HTML
     *
     * @private
     */
    private placeholder: any = '{#VALUE#}'
    /**
     * State previousValue
     *
     * @private
     */
    private previousValue: vastateValue = this.placeholder
    /**
     * State Name
     *
     * @private
     */
    private readonly name: string
    /**
     * Loading status
     *
     * @private
     */
    private isLoading: boolean = false
    /**
     * Loading Template
     *
     * @private
     */
    private static loadingTemplate: string

    /**
     * Set loading status
     *
     * @param loading
     * @return this
     */
    setLoading( loading: boolean ): this {
        this.isLoading = loading
        this.reloadDom()
        return this
    }

    /**
     * Set loading template
     *
     * @param loadingTemplate
     */
    static setLoadingTemplate( loadingTemplate: string ) {
        this.loadingTemplate = loadingTemplate
    }

    /**
     * initialize new state
     *
     * @param name
     * @param value
     */
    constructor( name: string, value: vastateValue ) {

        this.value = value
        this.name = name
        this.reloadDom()
    }

    /**
     * Get current state value
     */
    get() {
        return this.value
    }

    /**
     * Set state value
     *
     * @param value
     * @return this
     */
    set( value: vastateValue ): this {
        if ( this.value != this.previousValue )
            this.previousValue = this.value
        this.value = value
        this.reloadDom()
        console.log( this.value, this.previousValue )
        return this
    }

    /**
     * Reload the DOM when value or loading state is changed
     *
     * @private
     */
    private reloadDom() {
        this.reloadVastatePrints()
        this.reloadVastateEachs()
    }

    /**
     * Reload all vastate-print tags/attribute
     * in the DOM
     *
     * @private
     */
    private reloadVastatePrints() {
        const vastatePrints = document.querySelectorAll( `vastate-print[state="${ this.name }"], [vastate-print][state="${ this.name }"]` )
        vastatePrints.forEach( ( vastatePrint: HTMLElement ) => {
            if ( this.isLoading ) {
                vastatePrint.innerHTML += Vastate.loadingTemplate
            } else {
                vastatePrint.innerHTML = vastatePrint.innerHTML.split( Vastate.loadingTemplate ).join( '' )
                if ( vastatePrint.hasAttribute( 'html' ) ) {

                    vastatePrint.innerHTML = vastatePrint.innerHTML.split( this.previousValue.toString() ).join( this.getVastatePrintValue( vastatePrint ) )
                } else {
                    vastatePrint.textContent = vastatePrint.textContent.split( this.previousValue.toString() ).join( this.getVastatePrintValue( vastatePrint ) )
                }
            }
        } )
    }

    /**
     * Reload all vastate-each tags/attribute
     * in the DOM
     *
     * @private
     */
    private reloadVastateEachs() {
        const vastateEachs = document.querySelectorAll( `vastate-each[state="${ this.name }"], [vastate-each][state="${ this.name }"]` )
        vastateEachs.forEach( ( vastateEach: HTMLElement ) => {
            while ( vastateEach.children.length > 1 ) {
                vastateEach.removeChild( vastateEach.lastElementChild )
            }
            const stateValueArr: any = Array.isArray( this.get() ) ? this.get() : []

            if ( stateValueArr.length < 1 ) {
                if ( ! this.isLoading ) {
                    // remove preloader from the page
                    vastateEach.innerHTML = vastateEach.innerHTML.split( Vastate.loadingTemplate ).join( '' )
                    // remove all children except first one
                    vastateEach.querySelectorAll( '* + *' ).forEach( ( e: HTMLElement ) => e.remove() )
                    return
                }
                vastateEach.innerHTML += Vastate.loadingTemplate
                return
            }
            stateValueArr?.forEach( ( val: any ) => {
                const firstChild = document.querySelector( `vastate-each[state="${ this.name }"] > *, [vastate-each][state="${ this.name }"] > *` )
                const template: HTMLElement | undefined = firstChild?.cloneNode( true ) as HTMLElement

                firstChild?.setAttribute( 'hidden', 'true' )
                template.removeAttribute( 'hidden' )
                if ( template.tagName.toLocaleLowerCase() == "vastate-print" || template.hasAttribute( 'vastate-print' ) ) {
                    template.innerHTML = template.innerHTML?.split( this.placeholder ).join( this.getVastatePrintValue( template, val ) )
                } else {
                    template?.querySelectorAll( 'vastate-print, [vastate-print]' ).forEach( ( pr: HTMLElement ) => {
                        pr.removeAttribute( 'hidden' )
                        pr.innerHTML = pr.innerHTML?.split( this.placeholder ).join( this.getVastatePrintValue( pr, val ) )

                    } )
                }
                vastateEach.appendChild( template )
            } )
        } )
    }

    /**
     * Gets the value that will be printed in Vastate print
     *
     * @param vastatePrint
     * @param value
     * @private
     */
    private getVastatePrintValue( vastatePrint: HTMLElement, value = this.get() ) {
        if ( typeof value === "object" && ! vastatePrint.hasAttribute( 'obj' ) ) {
            document.body.style.background = "hsla(0,0%,90%,1)"
            document.body.style.color = "hsla(0,0%,10%,.9)"
            document.body.style.fontFamily = "arial"
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
                <code>${ vastatePrint.outerHTML.split( '<' ).join( '&lt;' ).split( '>' ).join( '&gt;' ) }</code>
                </pre>            
`
            return value
        }
        // @ts-ignore
        return typeof value === "object" && Object.keys( value ).length > 0 ? value[vastatePrint.getAttribute( 'obj' ).toString() ?? Object.keys( this.get() )[0]] : value
    }
}

// extend window interface
declare global {
    interface Window {
        Vastate: any
    }
}

// apply vastate class to window so it can be
// called globally via 'window.Vastate' or Vastate
window.Vastate = Vastate

export default Vastate