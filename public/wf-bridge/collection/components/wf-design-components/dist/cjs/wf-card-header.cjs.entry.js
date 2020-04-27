'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-4cbc2ed1.js');

const CardHeader = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    render() {
        return (core.h("header", { class: "card-header" }, core.h("slot", null)));
    }
    static get style() { return ".card-header{display:-ms-flexbox;display:flex;-ms-flex-pack:var(--card-header-justify-content,space-between);justify-content:var(--card-header-justify-content,space-between);padding:var(--card-header-padding,0);font-family:var(--card-header-font-family);font-size:var(--card-header-font-size);font-weight:var(--card-header-font-weight)}"; }
};

exports.wf_card_header = CardHeader;
