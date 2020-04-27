import { r as registerInstance, h } from './core-2ee2b62e.js';

const CardHeader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("header", { class: "card-header" }, h("slot", null)));
    }
    static get style() { return ".card-header{display:-ms-flexbox;display:flex;-ms-flex-pack:var(--card-header-justify-content,space-between);justify-content:var(--card-header-justify-content,space-between);padding:var(--card-header-padding,0);font-family:var(--card-header-font-family);font-size:var(--card-header-font-size);font-weight:var(--card-header-font-weight)}"; }
};

export { CardHeader as wf_card_header };
