/**
 * Name: Vastate.js
 * Version: 1.0
 * License: MIT
 */
type vastateValue  = string | number | any[] | boolean | null

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
     */
    setLoading(loading: boolean) {
        this.isLoading = loading
        this.reloadDom()
    }

    /**
     * Set loading template
     *
     * @param loadingTemplate
     */
    static setLoadingTemplate(loadingTemplate: string) {
        this.loadingTemplate = loadingTemplate
    }

    /**
     * initialize new state
     *
     * @param name
     * @param value
     */
    constructor(name: string, value: vastateValue) {
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
     */
    set(value: vastateValue) {
        this.value = value
        this.reloadDom()
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
        const vastatePrints = document.querySelectorAll(`vastate-print[state="${this.name}"], [vastate-print][state="${this.name}"]`)
        vastatePrints.forEach(vastatePrint => {

            if (this.isLoading) {
                vastatePrint.innerHTML += Vastate.loadingTemplate
            } else {
                vastatePrint.innerHTML = vastatePrint.innerHTML.split( Vastate.loadingTemplate ).join( '' )

                if ( vastatePrint.hasAttribute( 'obj' ) ) {
                    if ( vastatePrint.hasAttribute( 'html' ) ) {
                        // @ts-ignore
                        vastatePrint.innerHTML = vastatePrint.innerHTML.split( this.placeholder ).join( '<vprint>' + this.get()[vastatePrint.getAttribute( 'obj' )] + '</vprint>' )
                        // @ts-ignore
                        vastatePrint.querySelectorAll('vprint').forEach(e => e.innerHTML = this.get()[vastatePrint.getAttribute( 'obj' )] )
                    } else {
                        // @ts-ignore
                        vastatePrint.innerHTML = vastatePrint.innerHTML.split( this.placeholder ).join('<vprint>' + this.get()[vastatePrint.getAttribute( 'obj' )] + '</vprint>' )
                        // @ts-ignore
                        vastatePrint.querySelectorAll('vprint').forEach(e => e.textContent = this.get()[vastatePrint.getAttribute( 'obj' )] )
                    }
                } else {
                    if ( vastatePrint.hasAttribute( 'html' ) ) {
                        // @ts-ignore
                        vastatePrint.innerHTML = vastatePrint.innerHTML.split( this.placeholder ).join( '<vprint>' + this.get() + '</vprint>' )
                        // @ts-ignore
                        vastatePrint.querySelectorAll('vprint').forEach(e => e.innerHTML = this.get())
                    } else {
                        // @ts-ignore
                        vastatePrint.innerHTML = vastatePrint.innerHTML.split( this.placeholder ).join( '<vprint>' + this.get() + '</vprint>' )
                        // @ts-ignore
                        vastatePrint.querySelectorAll('vprint').forEach(e => e.textContent = this.get())
                    }
                }
            }
        })
    }

    /**
     * Reload all vastate-each tags/attribute
     * in the DOM
     *
     * @private
     */
    private reloadVastateEachs() {
        const vastateEachs = document.querySelectorAll(`vastate-each[state="${this.name}"], [vastate-each][state="${this.name}"]`)
        vastateEachs.forEach(vastateEach => {
            while (vastateEach.children.length > 1) {
                // @ts-ignore
                vastateEach.removeChild(vastateEach.lastElementChild)
            }

            // @ts-ignore
            const stateValueArr: any[] = Array.isArray(this.get()) ? this.get() : []

            if (stateValueArr.length < 1) {
                if (!this.isLoading) {
                    while (vastateEach.children.length > 1) {
                        // @ts-ignore
                        vastateEach.removeChild(vastateEach.lastElementChild)
                    }
                } else {
                    vastateEach.innerHTML += Vastate.loadingTemplate
                }
                return
            }
            stateValueArr?.forEach(val => {
                const firstChild = document.querySelector(`vastate-each[state="${this.name}"] > *, [vastate-each][state="${this.name}"] > *`)
                const template: HTMLElement | undefined = firstChild?.cloneNode(true) as HTMLElement

                firstChild?.setAttribute('hidden', 'true')
                template.removeAttribute('hidden')
                if (template.tagName.toLocaleLowerCase() == "vastate-print" || template.hasAttribute('vastate-print')) {
                    template.innerHTML = template.innerHTML?.split(this.placeholder).join(typeof val === 'object' ? val[template.getAttribute('obj') ?? 0] : val)
                } else {
                    template?.querySelectorAll('vastate-print, [vastate-print]').forEach(pr => {
                        pr.removeAttribute('hidden')
                        // @ts-ignore
                        pr.innerHTML = pr.innerHTML?.split(this.placeholder).join(typeof val === 'object' ? val[pr.getAttribute('obj') ?? 0] : val)

                    })
                }
                vastateEach.appendChild(template)
            })
        })
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