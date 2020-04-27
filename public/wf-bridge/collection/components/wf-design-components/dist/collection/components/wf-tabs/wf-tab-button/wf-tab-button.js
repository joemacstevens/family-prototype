import { h } from "@stencil/core";
export class WfTabButton {
    constructor() {
        /** Decides which tab is selected initially, do not set this property directly since it's propagated from `wf-tabs` */
        this.selected = false;
        /** Controls the 'disabled' state of the button */
        this.disabled = false;
    }
    handleWfTabSelect() {
        if (!this.disabled) {
            this.tabButtonClicked.emit(this.tab);
        }
    }
    render() {
        const { type, selected, disabled } = this;
        const tabClasses = {
            'tab-button': true,
            [`tab-button-${type}`]: !!type,
            'tab-button-active': selected,
            'tab-button-disabled': disabled,
        };
        return (h("div", { class: tabClasses, onClick: this.handleWfTabSelect.bind(this) },
            h("slot", null)));
    }
    static get is() { return "wf-tab-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../../styles/components/tabs/tab-button/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../../styles/components/tabs/tab-button/main.css"]
    }; }
    static get properties() { return {
        "tab": {
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
                "text": "This prop needs to be reflected due to a weird behavior of Stencil in Stencil components"
            },
            "attribute": "tab",
            "reflect": true
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
                        "path": "../types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Controls the visual 'type' of tabs, do not set this property directly since it's propagated from `wf-tabs`"
            },
            "attribute": "type",
            "reflect": false
        },
        "selected": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Decides which tab is selected initially, do not set this property directly since it's propagated from `wf-tabs`"
            },
            "attribute": "selected",
            "reflect": false,
            "defaultValue": "false"
        },
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Controls the 'disabled' state of the button"
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get events() { return [{
            "method": "tabButtonClicked",
            "name": "tabButtonClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Tab button click event"
            },
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            }
        }, {
            "method": "docWfTabButtonClicked",
            "name": "wfTabButtonClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Tab button click event"
            },
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            }
        }]; }
}
