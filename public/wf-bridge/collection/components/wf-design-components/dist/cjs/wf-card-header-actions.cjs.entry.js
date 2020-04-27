'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-4cbc2ed1.js');

const CardHeaderActions = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    render() {
        return (core.h("div", { class: "card-header-actions" }, core.h("slot", null)));
    }
    static get style() { return ".card-header-actions{-ms-flex:1;flex:1;text-align:right}.card-header-actions ::slotted(*){visibility:hidden}.card-header-actions:hover ::slotted(*){visibility:visible}"; }
};

exports.wf_card_header_actions = CardHeaderActions;
