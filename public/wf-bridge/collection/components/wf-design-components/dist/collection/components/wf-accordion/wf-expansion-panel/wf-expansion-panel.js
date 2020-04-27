var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import { generateUniqueId } from '../../../utils/utils';
import { PrefixEvent } from '../../../utils/custom-event-emitter';
export class WfExpansionPanel {
    constructor() {
        /** State of panel */
        this.expanded = false;
        /** Unique Id of panel */
        this.panelId = generateUniqueId();
        /** Show title on open style*/
        this.pinnedTitle = true;
        this.onTogglePanel = () => {
            this.expanded = !this.expanded;
            this.expand.emit({
                id: this.panelId,
                expanded: this.expanded,
            });
        };
    }
    render() {
        const { expanded, pinnedTitle } = this;
        const contentPanelClasses = {
            ['expansion-panel-content']: true,
            [`expansion-panel-content-active`]: !!expanded,
        };
        const panelClasses = {
            ['expansion-panel']: true,
            ['expansion-panel-expanded']: expanded,
        };
        const arrowClasses = {
            ['arrow']: true,
            ['arrow-up']: expanded,
            ['arrow-down']: !expanded,
        };
        const titleClasses = {
            ['panel-title-hidden']: !pinnedTitle && expanded,
        };
        return (h("div", { class: panelClasses },
            h("div", { class: 'expansion-panel-header', onClick: this.onTogglePanel },
                h("div", { class: arrowClasses }),
                h("div", { class: titleClasses },
                    h("slot", { name: "header" }))),
            h("div", { class: contentPanelClasses },
                h("slot", { name: "content" }))));
    }
    static get is() { return "wf-expansion-panel"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../../styles/components/accordion/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../../styles/components/accordion/main.css"]
    }; }
    static get properties() { return {
        "expanded": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "State of panel"
            },
            "attribute": "expanded",
            "reflect": false,
            "defaultValue": "false"
        },
        "panelId": {
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
                "text": "Unique Id of panel"
            },
            "attribute": "panel-id",
            "reflect": false,
            "defaultValue": "generateUniqueId()"
        },
        "pinnedTitle": {
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
                "text": "Show title on open style"
            },
            "attribute": "pinned-title",
            "reflect": false,
            "defaultValue": "true"
        }
    }; }
    static get events() { return [{
            "method": "docExpand",
            "name": "expand",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Collapse event"
            },
            "complexType": {
                "original": "ExpansionPanelEventData",
                "resolved": "ExpansionPanelEventData",
                "references": {
                    "ExpansionPanelEventData": {
                        "location": "import",
                        "path": "../types"
                    }
                }
            }
        }, {
            "method": "docWfExpand",
            "name": "wfExpand",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Collapse event"
            },
            "complexType": {
                "original": "ExpansionPanelEventData",
                "resolved": "ExpansionPanelEventData",
                "references": {
                    "ExpansionPanelEventData": {
                        "location": "import",
                        "path": "../types"
                    }
                }
            }
        }]; }
}
__decorate([
    PrefixEvent()
], WfExpansionPanel.prototype, "expand", void 0);
