'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-4cbc2ed1.js');

const WfAccordion = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    render() {
        return (core.h("div", { class: "accordion" }, core.h("slot", null)));
    }
    static get style() { return ".expansion-panel{-webkit-box-sizing:var(--panel-box-sizing,content-box);box-sizing:var(--panel-box-sizing,content-box);-webkit-box-shadow:var(--panel-box-shadow,none);box-shadow:var(--panel-box-shadow,none);display:block;margin:0;padding:0;overflow:visible;-webkit-transition:padding 225ms cubic-bezier(.4,0,.2,1),-webkit-box-shadow .28s cubic-bezier(.4,0,.2,1);transition:padding 225ms cubic-bezier(.4,0,.2,1),-webkit-box-shadow .28s cubic-bezier(.4,0,.2,1);transition:padding 225ms cubic-bezier(.4,0,.2,1),box-shadow .28s cubic-bezier(.4,0,.2,1);transition:padding 225ms cubic-bezier(.4,0,.2,1),box-shadow .28s cubic-bezier(.4,0,.2,1),-webkit-box-shadow .28s cubic-bezier(.4,0,.2,1);background:var(--panel-background,#fff);font-family:var(--panel-font-family);color:var(--panel-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))))}.expansion-panel-header{display:-ms-flexbox;display:flex;-ms-flex-direction:row-reverse;flex-direction:row-reverse;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;padding:var(--panel-header-padding,var(--spacing-xs,12px) var(--spacing-s,24px));min-height:var(--panel-header-height,48px);background:var(--panel-header-background,inherit);border-radius:var(--panel-header-border-radius,0);border-bottom:var(--panel-header-border,3px solid #000);font-size:var(--panel-header-font-size,var(--font-size-small,.9em));font-weight:var(--panel-header-font-weight,var(--font-weight-normal,var(--font-weight,normal)));color:var(--panel-header-color,inherit);cursor:pointer}.expansion-panel-header:hover{background:var(--panel-header-background-hover,#f5f5f5)}.expansion-panel-header:active{background:var(--panel-header-background-pressed,#bebebe)}.expansion-panel-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:visible;visibility:hidden;height:0}.expansion-panel-content-active{visibility:visible;height:auto;padding:var(--panel-content-bottom-padding,var(--spacing-xs,12px))}.expansion-panel .panel-title-hidden{visibility:hidden}.expansion-panel .arrow{border:solid var(--panel-arrow-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));border-width:0 3px 3px 0;display:inline-block;padding:var(--panel-arrow-size,3px)}.expansion-panel .arrow.arrow-up{transform:rotate(-135deg);-webkit-transform:rotate(-135deg)}.expansion-panel .arrow.arrow-down{transform:rotate(45deg);-webkit-transform:rotate(45deg)}.expansion-panel-expanded{padding-bottom:var(--panel-padding-bottom,var(--spacing-xs,12px))}"; }
};

exports.wf_accordion = WfAccordion;
