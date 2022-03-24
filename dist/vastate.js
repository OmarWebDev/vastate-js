var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Vastate_instances, _a, _Vastate_value, _Vastate_name, _Vastate_isLoading, _Vastate_loadingTemplate, _Vastate_reloadDom;
/**
 * Name: Vastate.js
 * Version: 1.0
 * License: MIT
 *
 *
 */
class Vastate {
    constructor(name, value) {
        _Vastate_instances.add(this);
        _Vastate_value.set(this, void 0);
        _Vastate_name.set(this, void 0);
        _Vastate_isLoading.set(this, false);
        __classPrivateFieldSet(this, _Vastate_value, value, "f");
        __classPrivateFieldSet(this, _Vastate_name, name, "f");
        __classPrivateFieldGet(this, _Vastate_instances, "m", _Vastate_reloadDom).call(this);
        console.log('done');
    }
    setLoading(loading) {
        __classPrivateFieldSet(this, _Vastate_isLoading, loading, "f");
        __classPrivateFieldGet(this, _Vastate_instances, "m", _Vastate_reloadDom).call(this);
    }
    static setLoadingTemplate(loadingTemplate) {
        __classPrivateFieldSet(this, _a, loadingTemplate, "f", _Vastate_loadingTemplate);
    }
    get() {
        return __classPrivateFieldGet(this, _Vastate_value, "f");
    }
    set(value) {
        __classPrivateFieldSet(this, _Vastate_value, value, "f");
        __classPrivateFieldGet(this, _Vastate_instances, "m", _Vastate_reloadDom).call(this);
    }
}
_a = Vastate, _Vastate_value = new WeakMap(), _Vastate_name = new WeakMap(), _Vastate_isLoading = new WeakMap(), _Vastate_instances = new WeakSet(), _Vastate_reloadDom = function _Vastate_reloadDom() {
    const vastateEachs = document.querySelectorAll(`vastate-each[state="${__classPrivateFieldGet(this, _Vastate_name, "f")}"], [vastate-each][state="${__classPrivateFieldGet(this, _Vastate_name, "f")}"]`);
    const vastatePrints = document.querySelectorAll(`vastate-print[state="${__classPrivateFieldGet(this, _Vastate_name, "f")}"], [vastate-print][state="${__classPrivateFieldGet(this, _Vastate_name, "f")}"]`);
    vastatePrints.forEach(vastatePrint => {
        if (vastatePrint.hasAttribute('obj')) {
            if (vastatePrint.hasAttribute('html')) {
                // @ts-ignore
                vastatePrint.innerHTML = vastatePrint.innerHTML.split('{#VALUE#}').join(this.get()[vastatePrint.getAttribute('obj')]);
            }
            else {
                // @ts-ignore
                vastatePrint.textContent = vastatePrint.textContent.split('{#VALUE#}').join(this.get()[vastatePrint.getAttribute('obj')]);
            }
        }
        else {
            if (vastatePrint.hasAttribute('html')) {
                // @ts-ignore
                vastatePrint.innerHTML = vastatePrint.innerHTML.split('{#VALUE#}').join(this.get());
            }
            else {
                // @ts-ignore
                vastatePrint.textContent = vastatePrint.textContent.split('{#VALUE#}').join(this.get());
            }
        }
    });
    vastateEachs.forEach(vastateEach => {
        while (vastateEach.children.length > 1) {
            console.log(vastateEach.lastElementChild);
            // @ts-ignore
            vastateEach.removeChild(vastateEach.lastElementChild);
        }
        // @ts-ignore
        const stateValueArr = Array.isArray(this.get()) ? this.get() : [];
        if (stateValueArr.length < 1) {
            if (!__classPrivateFieldGet(this, _Vastate_isLoading, "f")) {
                while (vastateEach.children.length > 1) {
                    console.log(vastateEach.lastElementChild);
                    // @ts-ignore
                    vastateEach.removeChild(vastateEach.lastElementChild);
                }
            }
            else {
                vastateEach.innerHTML += __classPrivateFieldGet(Vastate, _a, "f", _Vastate_loadingTemplate);
            }
            return;
        }
        stateValueArr === null || stateValueArr === void 0 ? void 0 : stateValueArr.forEach(val => {
            var _b, _c;
            const firstChild = document.querySelector(`vastate-each[state="${__classPrivateFieldGet(this, _Vastate_name, "f")}"] > *, [vastate-each][state="${__classPrivateFieldGet(this, _Vastate_name, "f")}"] > *`);
            const template = firstChild === null || firstChild === void 0 ? void 0 : firstChild.cloneNode(true);
            firstChild === null || firstChild === void 0 ? void 0 : firstChild.setAttribute('hidden', 'true');
            if (template.tagName.toLocaleLowerCase() == "vastate-print" || template.hasAttribute('vastate-print')) {
                template.removeAttribute('hidden');
                template.innerHTML = (_b = template.innerHTML) === null || _b === void 0 ? void 0 : _b.split('{#VALUE#}').join(typeof val === 'object' ? val[(_c = template.getAttribute('obj')) !== null && _c !== void 0 ? _c : 0] : val);
            }
            else
                template === null || template === void 0 ? void 0 : template.querySelectorAll('vastate-print, [vastate-print]').forEach(pr => {
                    var _b, _c;
                    // console.log(pr.innerHTML);
                    pr.removeAttribute('hidden');
                    // @ts-ignore
                    pr.innerHTML = (_b = pr.innerHTML) === null || _b === void 0 ? void 0 : _b.split('{#VALUE#}').join(typeof val === 'object' ? val[(_c = pr.getAttribute('obj')) !== null && _c !== void 0 ? _c : 0] : val);
                });
            vastateEach.appendChild(template);
        });
    });
};
_Vastate_loadingTemplate = { value: void 0 };
