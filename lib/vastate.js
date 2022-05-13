const style = document.createElement('style');
style.innerHTML = `
        [vastate-loader] *[vastate-print], 
        [vastate-loader] vastate-print, 
        [vastate-loader] *[vastate-print-group], 
        [vastate-loader] vastate-print-group, 
        [vastate-loader] *[vastate-each], 
        [vastate-loader] vastate-each {
            display: none !important;
        }
    `;
document.head.appendChild(style);
class Vastate {
    /**
     * State value
     *
     * @private
     */
    value;
    /**
     * Placeholder that will be replaced with
     * State value when showed in HTML
     *
     * @private
     */
    placeholder = '{#VALUE#}';
    /**
     * State previousValue
     *
     * @private
     */
    previousValue = this.placeholder;
    /**
     * State Name
     *
     * @private
     */
    name;
    /**
     * Loading status
     *
     * @private
     */
    isLoading = false;
    /**
     * Global Loading Template
     *
     * @private
     */
    static loadingTemplate = '';
    /**
     * Loading template for specific state
     *
     * @private
     */
    loadingTemplate = Vastate.loadingTemplate;
    /**
     * events will be used when created a new event
     * using on method or triggering an existing event using trigger method
     * there is a default event which is change that will reload the dom
     *
     * @private
     */
    events = {
        "change": () => { }
    };
    /**
     * Save mode is used to see where to save the state
     *
     * @private
     */
    saveMode = 'localStorage';
    groupedVastatePrintsSelector = `vastate-print:not(vastate-print[state]), [vastate-print]:not([vastate-print][state])`;
    vastatePrintsSelector;
    /**
     * initialize new state
     *
     * @param name
     * @param value
     */
    constructor(name, value) {
        this.value = value;
        this.name = name;
        this.vastatePrintsSelector = `vastate-print[state="${this.name}"], [vastate-print][state="${this.name}"]:not([vastate-group])`;
        this.reloadDom();
    }
    /**
     * Remove vastate-loader attribute
     */
    static mount() {
        style.remove();
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
                // @ts-ignore
                const valueToBePrinted = vastatePrint.hasAttribute('obj') && typeof this.previousValue === 'object' ? this.previousValue[vastatePrint.getAttribute('obj')].toString() : this.previousValue.toString();
                vastatePrint.innerHTML = vastatePrint.innerHTML.split(this.loadingTemplate).join('');
                if (vastatePrint.hasAttribute('html')) {
                    vastatePrint.innerHTML = vastatePrint.innerHTML.split(valueToBePrinted).join(this.getVastatePrintValue(vastatePrint));
                }
                else {
                    vastatePrint.textContent = vastatePrint.textContent.split(valueToBePrinted).join(this.getVastatePrintValue(vastatePrint));
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
            stateValueArr?.forEach((val) => {
                const firstChild = document.querySelector(`vastate-each[state="${this.name}"] > *, [vastate-each][state="${this.name}"] > *`);
                const template = firstChild?.cloneNode(true);
                template.removeAttribute('hidden');
                if (template.tagName.toLocaleLowerCase() == "vastate-print" || template.hasAttribute('vastate-print')) {
                    template.innerHTML = template.innerHTML?.split(this.placeholder).join(this.getVastatePrintValue(template, val));
                }
                else {
                    template?.querySelectorAll('vastate-print, [vastate-print]').forEach((pr) => {
                        pr.removeAttribute('hidden');
                        pr.innerHTML = pr.innerHTML?.split(this.placeholder).join(this.getVastatePrintValue(pr, val));
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
        if (typeof value === "object" && !vastatePrint.hasAttribute('obj')) {
            Vastate.throwError('You are trying to print an object without passing obj attribute in vastate print', vastatePrint);
        }
        // @ts-ignore
        return typeof value === "object" && Object.keys(value).length > 0 ? value[vastatePrint.getAttribute('obj').toString() ?? Object.keys(this.get())[0]] : value;
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
        // remove preloader from the page
        vastateEach.innerHTML = vastateEach.innerHTML.split(this.loadingTemplate).join('');
        // remove all children except first one
        vastateEach.querySelectorAll(':scope > *').forEach((e, i) => i !== 0 ? e.remove() : void 0);
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
export default Vastate;
