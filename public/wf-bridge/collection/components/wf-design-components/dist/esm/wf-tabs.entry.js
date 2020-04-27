import { r as registerInstance, c as createEvent, h, g as getElement } from './core-2ee2b62e.js';
import { P as PrefixEvent } from './custom-event-emitter-d3f4fc52.js';

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const WfTabs = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** Controls the visual 'type' of tabs */
        this.type = 'secondary';
        this.docTabSelect = createEvent(this, "tabSelect", 7);
        this.docWfTabSelect = createEvent(this, "wfTabSelect", 7);
    }
    componentDidLoad() {
        // this is a workaround to a problem with selecting buttons in shadowDOM-less browsers
        const possibleTabButtons = !!HTMLElement.prototype.attachShadow
            ? this.host.children
            : Array.from(this.host.children)
                .find((el) => el.classList.contains('tab-container'))
                .querySelector('.tab-bar').children;
        this.tabButtons = Array.from(possibleTabButtons).filter((el) => el.hasAttribute('tab'));
        if (!this.tabButtons.length) {
            return;
        }
        this.tabButtons.forEach((button) => {
            button.setAttribute('type', this.type);
        });
        const initialSelection = this.selected ||
            this.tabButtons
                .find((button) => button.getAttribute('disabled') === null)
                .getAttribute('tab');
        this.handleProgrammaticSelection(initialSelection);
    }
    handleProgrammaticSelection(newSelection) {
        this.currentTab = newSelection;
        this.markButtonSelected(this.currentTab);
    }
    handleTabButtonClick(event) {
        this.currentTab = this.selected = event.detail;
        this.tabSelect.emit(this.currentTab);
        this.markButtonSelected(event.detail);
        event.stopPropagation();
    }
    markButtonSelected(tabName) {
        this.tabButtons.forEach((button) => {
            button.setAttribute('selected', (button.getAttribute('tab') === tabName).toString());
        });
    }
    render() {
        const { type, currentTab } = this;
        const tabClasses = {
            'tab-container': true,
            [`tab-container-${type}`]: !!type,
        };
        return (h("main", { class: tabClasses }, h("div", { class: "tab-bar" }, h("slot", null)), h("div", { class: "tab-content" }, h("slot", { name: currentTab }))));
    }
    get host() { return getElement(this); }
    static get watchers() { return {
        "selected": ["handleProgrammaticSelection"]
    }; }
    static get style() { return ".tab-container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;font-family:var(--tab-font-family)}.tab-container .tab-bar{display:-ms-flexbox;display:flex;border-bottom:var(--tab-bar-border-height,1px) solid var(--tab-bar-border-color,#c2cbcf)}.tab-container .tab-content{min-height:var(--tab-content-min-height,var(--spacing-xs,12px));padding:var(--tab-content-padding,var(--spacing-m,36px) 0)}.tab-container-secondary .tab-bar{border-bottom:var(--tab-secondary-bar-border-height,0) solid var(--tab-secondary-bar-border-color,#fff)}.tab-container-secondary .tab-content{min-height:var(--tab-secondary-content-min-height,var(--spacing-xs,12px));padding:var(--tab-secondary-content-padding,var(--spacing-xs,12px) 0)}"; }
};
__decorate([
    PrefixEvent()
], WfTabs.prototype, "tabSelect", void 0);

export { WfTabs as wf_tabs };
