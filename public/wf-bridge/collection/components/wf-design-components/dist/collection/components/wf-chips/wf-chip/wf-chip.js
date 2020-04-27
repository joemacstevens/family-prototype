var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import { PrefixEvent } from '../../../utils/custom-event-emitter';
export class WfChip {
    constructor() {
        this.handleChipRemove = (event) => {
            if (event) {
                event.stopPropagation();
            }
            this.chipRemove.emit(this.host);
        };
        this.handlelChipClick = () => {
            this.chipClick.emit(this.host);
        };
    }
    async removeChip() {
        this.chipRemove.emit(this.host);
    }
    render() {
        return (h("div", { class: "chip", onClick: this.handlelChipClick },
            h("a", { class: "chip-delete", onClick: this.handleChipRemove }, "\u2716"),
            h("slot", null)));
    }
    static get is() { return "wf-chip"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../../styles/components/chip/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../../styles/components/chip/main.css"]
    }; }
    static get events() { return [{
            "method": "docChipRemove",
            "name": "chipRemove",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "docWfChipRemove",
            "name": "wfChipRemove",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "docChipClick",
            "name": "chipClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "docWfChipClick",
            "name": "wfChipClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "removeChip": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "host"; }
}
__decorate([
    PrefixEvent()
], WfChip.prototype, "chipRemove", void 0);
__decorate([
    PrefixEvent()
], WfChip.prototype, "chipClick", void 0);
