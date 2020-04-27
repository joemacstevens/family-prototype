'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-4cbc2ed1.js');

const CardFooter = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    render() {
        return (core.h("footer", { class: "card-footer" }, core.h("slot", null)));
    }
    static get style() { return ".card-footer{display:-ms-flexbox;display:flex;-ms-flex-pack:var(--card-footer-justify-content,space-between);justify-content:var(--card-footer-justify-content,space-between);padding:var(--card-footer-padding,var(--spacing-s,24px) 0 0);font-family:var(--card-footer-font-family);font-size:var(--card-footer-font-size);font-weight:var(--card-footer-font-weight)}"; }
};

exports.wf_card_footer = CardFooter;
