'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-4cbc2ed1.js');
const customEventEmitter = require('./custom-event-emitter-f54d881b.js');

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
const WfChip = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        this.handleChipRemove = (event) => {
            if (event) {
                event.stopPropagation();
            }
            this.chipRemove.emit(this.host);
        };
        this.handlelChipClick = () => {
            this.chipClick.emit(this.host);
        };
        this.docChipRemove = core.createEvent(this, "chipRemove", 7);
        this.docWfChipRemove = core.createEvent(this, "wfChipRemove", 7);
        this.docChipClick = core.createEvent(this, "chipClick", 7);
        this.docWfChipClick = core.createEvent(this, "wfChipClick", 7);
    }
    async removeChip() {
        this.chipRemove.emit(this.host);
    }
    render() {
        return (core.h("div", { class: "chip", onClick: this.handlelChipClick }, core.h("a", { class: "chip-delete", onClick: this.handleChipRemove }, "\u2716"), core.h("slot", null)));
    }
    get host() { return core.getElement(this); }
    static get style() { return ".chip{display:inline-block;margin:var(--chip-spacing,var(--spacing-xxxs,3px));padding:var(--chip-padding,var(--spacing-xs,12px));font-family:var(--chip-font-family);font-size:var(--chip-font-size,14px);font-weight:var(--chip-font-weight,400);color:var(--chip-color,#000);background:var(--chip-background,#f1f3f4);border-radius:var(--chip-border-radius,19px);position:relative;cursor:pointer;max-width:var(--chip-max-width,200px);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.chip,.chip .chip-delete{line-height:var(--chip-delete-x-font-size,20px)}.chip .chip-delete{display:none;float:right;margin-left:5px;font-size:var(--chip-delete-x-font-size,20px);text-decoration:none}.chip .chip-delete,.chip:hover{background:var(--chip-background-darker,#dee2e7)}.chip:active,.chip:active .chip-delete{background-color:var(--chip-color-active,#919191)}.chip:hover .chip-delete{display:inline}"; }
};
__decorate([
    customEventEmitter.PrefixEvent()
], WfChip.prototype, "chipRemove", void 0);
__decorate([
    customEventEmitter.PrefixEvent()
], WfChip.prototype, "chipClick", void 0);

exports.wf_chip = WfChip;
