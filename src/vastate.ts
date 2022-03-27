/**
 * Name: Vastate.js
 * Version: 1.0
 * License: MIT
 */
type vastateValue  = string | number | any[] | boolean | null

class Vastate {
    private value: vastateValue
    private placeholder = '{#VALUE#}'
    private readonly name: string
    private isLoading: boolean = false
    private static loadingTemplate: string

    setLoading(loading: boolean) {
        this.isLoading = loading
        this.reloadDom()
    }

    static setLoadingTemplate(loadingTemplate: string) {
        this.loadingTemplate = loadingTemplate
    }

    constructor(name: string, value: vastateValue) {
        this.value = value
        this.name = name
        this.reloadDom()
    }

    get() {
        return this.value
    }

    set(value: vastateValue) {
        this.value = value
        this.reloadDom()
    }

    private reloadDom() {
        const vastateEachs = document.querySelectorAll(`vastate-each[state="${this.name}"], [vastate-each][state="${this.name}"]`)
        const vastatePrints = document.querySelectorAll(`vastate-print[state="${this.name}"], [vastate-print][state="${this.name}"]`)
        vastatePrints.forEach(vastatePrint => {

            if (this.isLoading) {
                vastatePrint.innerHTML += Vastate.loadingTemplate
            } else {
                vastatePrint.innerHTML = vastatePrint.innerHTML.split( Vastate.loadingTemplate ).join( '' )

                if ( vastatePrint.hasAttribute( 'obj' ) ) {
                    if ( vastatePrint.hasAttribute( 'html' ) ) {
                        // @ts-ignore
                        vastatePrint.innerHTML = vastatePrint.innerHTML.split( this.placeholder ).join( this.get()[vastatePrint.getAttribute( 'obj' )] )
                    } else {
                        // @ts-ignore
                        vastatePrint.textContent = vastatePrint.textContent.split( this.placeholder ).join( this.get()[vastatePrint.getAttribute( 'obj' )] )
                    }
                } else {
                    if ( vastatePrint.hasAttribute( 'html' ) ) {
                        // @ts-ignore
                        vastatePrint.innerHTML = vastatePrint.innerHTML.split( this.placeholder ).join( this.get() )
                    } else {
                        // @ts-ignore
                        vastatePrint.textContent = vastatePrint.textContent.split( this.placeholder ).join( this.get() )
                    }
                }
            }
        })

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

                if (template.tagName.toLocaleLowerCase() == "vastate-print" || template.hasAttribute('vastate-print')) {
                    template.removeAttribute('hidden')
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
declare global {
    interface Window {
        Vastate: any
    }
}

window.Vastate = Vastate
export default Vastate