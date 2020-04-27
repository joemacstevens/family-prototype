import { r as registerInstance, c as createEvent, h } from './core-2ee2b62e.js';
import './_commonjsHelpers-97e6d7b1.js';
import { P as PrefixEvent } from './custom-event-emitter-d3f4fc52.js';
import { d as disableBodyScroll, e as enableBodyScroll } from './block-scroll-824fcfc2.js';

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
const WfModal = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** Controls the 'opened' state of the modal */
        this.opened = false;
        /** Size of action buttons */
        this.buttonSize = 'md';
        this.docClose = createEvent(this, "close", 7);
        this.docWfClose = createEvent(this, "wfClose", 7);
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
        return (h("header", { class: "modal-header" }, h("button", { type: "button", class: "close", "aria-label": "Close", onClick: this.handleCloseRequest.bind(this) }, h("span", { "aria-hidden": "true" }, "\u00D7")), this.header));
    }
    render() {
        const { opened, buttonSize } = this;
        return opened ? (h("div", { class: "modal" }, h("div", { class: "modal-backdrop", onClick: this.close.bind(this) }), h("div", { ref: (el) => (this.modalDialog = el), class: "modal-dialog" }, h("slot", { name: "header" }, this.header ? this.renderHeader() : ''), h("main", { class: "modal-body" }, h("slot", null)), h("footer", { class: "modal-footer" }, h("slot", { name: "footer" }, h("wf-button", { onClick: this.handleCloseRequest.bind(this), size: buttonSize }, "Close")))))) : null;
    }
    static get watchers() { return {
        "opened": ["handleGlobalScroll"]
    }; }
    static get style() { return ".modal{z-index:var(--modal-z-index,100)}.modal-backdrop{background-color:var(--modal-backdrop-background,rgba(0,0,0,.8))}.modal,.modal-backdrop{bottom:0;left:0;position:fixed;right:0;top:0}.modal-dialog{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:var(--modal-shadow,0 0 7px 7px rgba(0,0,0,.2));box-shadow:var(--modal-shadow,0 0 7px 7px rgba(0,0,0,.2));background-color:var(--modal-content-background,#fff);border-radius:var(--modal-border-radius,0);font-family:var(--modal-font-family);height:auto;left:50%;width:var(--modal-width,60%);padding:var(--modal-padding,var(--spacing-m,36px) var(--spacing-l,54px));position:absolute;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);max-height:100%;max-width:100%;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}\@media (-ms-high-contrast:none),screen and (-ms-high-contrast:active){.modal-dialog{height:80%}}.modal-header{-ms-flex-negative:0;flex-shrink:0;background:var(--modal-header-background,none);border-bottom:var(--modal-header-border,2px solid);font-family:var(--headline-font-family,var(--font-family));font-size:var(--headline-4-font-size,32px);font-weight:var(--headline-font-weight,var(--font-weight-bold,var(--font-weight,normal)));padding:var(--modal-header-padding,0 0 var(--spacing-xs,12px))}.modal-header,.modal-header h4{color:var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))}.modal-header h4{margin:0}.modal-header button.close{color:var(--modal-close-icon-color,#000);background:none;border:none;cursor:var(--cursor,pointer);float:right;font-size:var(--headline-4-font-size,32px);margin-right:calc(0px - var(--spacing-s, 24px));margin-top:calc(0px - var(--spacing-s, 24px))}.modal-body{-ms-flex-negative:1;flex-shrink:1;-ms-flex-preferred-size:90%;flex-basis:90%;overflow-y:auto;color:var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)));display:block;min-height:var(--modal-body-min-height,170px);padding:var(--modal-body-padding,0);margin:var(--modal-body-margin,var(--spacing-s,24px) 0 var(--spacing-s,24px) 0)}.modal-footer{-ms-flex-negative:0;flex-shrink:0;padding:var(--modal-footer-padding,0);text-align:var(--modal-footer-align,left);display:-ms-flexbox;display:flex;-ms-flex-pack:var(--modal-footer-justify-content,flex-end);justify-content:var(--modal-footer-justify-content,flex-end)}.modal-footer:after{content:\"\";clear:both;display:table}"; }
};
__decorate([
    PrefixEvent({ eventName: 'close' })
], WfModal.prototype, "modalClose", void 0);

export { WfModal as wf_modal };
