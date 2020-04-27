import { r as registerInstance, h } from './core-2ee2b62e.js';

const CardHeaderActions = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("div", { class: "card-header-actions" }, h("slot", null)));
    }
    static get style() { return ".card-header-actions{-ms-flex:1;flex:1;text-align:right}.card-header-actions ::slotted(*){visibility:hidden}.card-header-actions:hover ::slotted(*){visibility:visible}"; }
};

export { CardHeaderActions as wf_card_header_actions };
