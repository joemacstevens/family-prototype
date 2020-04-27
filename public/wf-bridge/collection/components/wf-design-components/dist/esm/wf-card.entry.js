import { r as registerInstance, h } from './core-2ee2b62e.js';

const Card = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("div", { class: "card" }, h("slot", null)));
    }
    static get style() { return ".card{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;font-family:var(--card-font-family);background:var(--card-background,#fff);border:var(--card-border,1px solid #d7d7d7);padding:var(--card-padding,var(--spacing-m,36px));min-height:var(--card-min-height,300px);-webkit-box-shadow:var(--card-box-shadow,none);box-shadow:var(--card-box-shadow,none)}"; }
};

export { Card as wf_card };
