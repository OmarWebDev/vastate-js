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
                if (template.tagName.toLocaleLowerCase() == "vastate-print" || template.hasAttribute('vastate-print')) {
                    template.removeAttribute('hidden');
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
export default Vastate;
