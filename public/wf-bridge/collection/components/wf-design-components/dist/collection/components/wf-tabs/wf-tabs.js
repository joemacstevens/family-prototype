var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import { PrefixEvent } from '../../utils/custom-event-emitter';
export class WfTabs {
    constructor() {
        /** Controls the visual 'type' of tabs */
        this.type = 'secondary';
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
        return (h("main", { class: tabClasses },
            h("div", { class: "tab-bar" },
                h("slot", null)),
            h("div", { class: "tab-content" },
                h("slot", { name: currentTab }))));
    }
    static get is() { return "wf-tabs"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/tabs/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/tabs/main.css"]
    }; }
    static get properties() { return {
        "selected": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Decides which tab is selected initially"
            },
            "attribute": "selected",
            "reflect": false
        },
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "TabsType",
                "resolved": "\"primary\" | \"secondary\"",
                "references": {
                    "TabsType": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Controls the visual 'type' of tabs"
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "'secondary'"
        }
    }; }
    static get states() { return {
        "currentTab": {}
    }; }
    static get events() { return [{
            "method": "docTabSelect",
            "name": "tabSelect",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emmitted when one of the tabs is selected by user interaction"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "docWfTabSelect",
            "name": "wfTabSelect",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emmitted when one of the tabs is selected by user interaction"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "selected",
            "methodName": "handleProgrammaticSelection"
        }]; }
    static get listeners() { return [{
            "name": "tabButtonClicked",
            "method": "handleTabButtonClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
__decorate([
    PrefixEvent()
], WfTabs.prototype, "tabSelect", void 0);
