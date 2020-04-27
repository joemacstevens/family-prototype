'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-4cbc2ed1.js');

const CardTitle = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    render() {
        return (core.h("h5", { class: "header-5 card-title" }, core.h("slot", null)));
    }
    static get style() { return ".header-1,h1{font-family:var(--headline-1-font-family,var(--headline-font-family));font-weight:var(--headline-1-font-weight,var(--headline-font-weight));font-size:var(--headline-1-font-size,64px);letter-spacing:var(--headline-1-letter-spacing,normal);line-height:var(--headline-1-line-height,64px)}.header-1,.header-2,h1,h2{color:var(--headline-color);margin-bottom:var(--headline-margin-bottom,var(--spacing-m,36px))}.header-2,h2{font-family:var(--headline-2-font-family,var(--headline-font-family));font-weight:var(--headline-2-font-weight,var(--headline-font-weight));font-size:var(--headline-2-font-size,44px);letter-spacing:var(--headline-2-letter-spacing,normal);line-height:var(--headline-2-line-height,44px)}.header-3,h3{font-family:var(--headline-3-font-family,var(--headline-font-family));font-weight:var(--headline-3-font-weight,var(--headline-font-weight));font-size:var(--headline-3-font-size,36px);letter-spacing:var(--headline-3-letter-spacing,normal);line-height:var(--headline-3-line-height,36px)}.header-3,.header-4,h3,h4{color:var(--headline-color);margin-bottom:var(--headline-margin-bottom,var(--spacing-m,36px))}.header-4,h4{font-family:var(--headline-4-font-family,var(--headline-font-family));font-weight:var(--headline-4-font-weight,var(--headline-font-weight));font-size:var(--headline-4-font-size,32px);letter-spacing:var(--headline-4-letter-spacing,normal);line-height:var(--headline-4-line-height,32px)}.header-5,h5{font-family:var(--headline-5-font-family,var(--headline-font-family));font-weight:var(--headline-5-font-weight,var(--headline-font-weight));font-size:var(--headline-5-font-size,24px);letter-spacing:var(--headline-5-letter-spacing,normal);line-height:var(--headline-5-line-height,24px)}.header-5,.header-6,h5,h6{color:var(--headline-color);margin-bottom:var(--headline-margin-bottom,var(--spacing-m,36px))}.header-6,h6{font-family:var(--headline-6-font-family,var(--headline-font-family));font-weight:var(--headline-6-font-weight,var(--headline-font-weight));font-size:var(--headline-6-font-size,18px);letter-spacing:var(--headline-6-letter-spacing,normal);line-height:var(--headline-6-line-height,20px)}.header-7,h7{font-family:var(--headline-7-font-family,var(--headline-font-family));font-weight:var(--headline-7-font-weight,var(--headline-font-weight));font-size:var(--headline-7-font-size,18px);letter-spacing:var(--headline-7-letter-spacing,normal);line-height:var(--headline-7-line-height,20px);color:var(--headline-color);margin-bottom:var(--headline-margin-bottom,var(--spacing-m,36px))}.header-inverse{color:var(--headline-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.header-5.card-title{margin:0}"; }
};

exports.wf_card_title = CardTitle;