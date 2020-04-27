'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-4cbc2ed1.js');

const CardBody = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    render() {
        return (core.h("main", { class: "card-body" }, core.h("slot", null)));
    }
    static get style() { return ".card-body{-ms-flex-positive:1;flex-grow:1;min-height:var(--card-body-min-height,200px);padding:var(--card-body-padding,var(--spacing-s,24px) 0 0);font-family:var(--card-body-font-family);font-size:var(--card-body-font-size);font-weight:var(--card-body-font-weight)}"; }
};

exports.wf_card_body = CardBody;
