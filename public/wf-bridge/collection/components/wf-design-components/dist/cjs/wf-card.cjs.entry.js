'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-4cbc2ed1.js');

const Card = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    render() {
        return (core.h("div", { class: "card" }, core.h("slot", null)));
    }
    static get style() { return ".card{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;font-family:var(--card-font-family);background:var(--card-background,#fff);border:var(--card-border,1px solid #d7d7d7);padding:var(--card-padding,var(--spacing-m,36px));min-height:var(--card-min-height,300px);-webkit-box-shadow:var(--card-box-shadow,none);box-shadow:var(--card-box-shadow,none)}"; }
};

exports.wf_card = Card;
