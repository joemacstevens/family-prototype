var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import { disableBodyScroll, enableBodyScroll } from '../../utils/block-scroll';
import { PrefixEvent } from '../../utils/custom-event-emitter';
export class WfModal {
    constructor() {
        /** Controls the 'opened' state of the modal */
        this.opened = false;
        /** Size of action buttons */
        this.buttonSize = 'md';
    }
    handleCloseRequest(event) {
        event.stopPropagation();
        this.close();
    }
    handleGlobalScroll(opened) {
        opened ? disableBodyScroll(this.modalDialog) : enableBodyScroll(this.modalDialog);
    }
    close() {
        this.opened = false;
        this.modalClose.emit();
    }
    renderHeader() {
        return (h("header", { class: "modal-header" },
            h("button", { type: "button", class: "close", "aria-label": "Close", onClick: this.handleCloseRequest.bind(this) },
                h("span", { "aria-hidden": "true" }, "\u00D7")),
            this.header));
    }
    render() {
        const { opened, buttonSize } = this;
        return opened ? (h("div", { class: "modal" },
            h("div", { class: "modal-backdrop", onClick: this.close.bind(this) }),
            h("div", { ref: (el) => (this.modalDialog = el), class: "modal-dialog" },
                h("slot", { name: "header" }, this.header ? this.renderHeader() : ''),
                h("main", { class: "modal-body" },
                    h("slot", null)),
                h("footer", { class: "modal-footer" },
                    h("slot", { name: "footer" },
                        h("wf-button", { onClick: this.handleCloseRequest.bind(this), size: buttonSize }, "Close")))))) : null;
    }
    static get is() { return "wf-modal"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/modal/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/modal/main.css"]
    }; }
    static get properties() { return {
        "opened": {
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
                "text": "Controls the 'opened' state of the modal"
            },
            "attribute": "opened",
            "reflect": false,
            "defaultValue": "false"
        },
        "header": {
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
                "text": "Header text"
            },
            "attribute": "header",
            "reflect": false
        },
        "buttonSize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ButtonSize",
                "resolved": "\"lg\" | \"md\" | \"sm\"",
                "references": {
                    "ButtonSize": {
                        "location": "import",
                        "path": "../wf-button/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Size of action buttons"
            },
            "attribute": "button-size",
            "reflect": false,
            "defaultValue": "'md'"
        }
    }; }
    static get events() { return [{
            "method": "docClose",
            "name": "close",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when modal is closed by the user"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "docWfClose",
            "name": "wfClose",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when modal is closed by the user"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get watchers() { return [{
            "propName": "opened",
            "methodName": "handleGlobalScroll"
        }]; }
}
__decorate([
    PrefixEvent({ eventName: 'close' })
], WfModal.prototype, "modalClose", void 0);
