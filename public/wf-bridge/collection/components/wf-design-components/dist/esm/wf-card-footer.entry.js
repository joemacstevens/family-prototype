import { r as registerInstance, h } from './core-2ee2b62e.js';

const CardFooter = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("footer", { class: "card-footer" }, h("slot", null)));
    }
    static get style() { return ".card-footer{display:-ms-flexbox;display:flex;-ms-flex-pack:var(--card-footer-justify-content,space-between);justify-content:var(--card-footer-justify-content,space-between);padding:var(--card-footer-padding,var(--spacing-s,24px) 0 0);font-family:var(--card-footer-font-family);font-size:var(--card-footer-font-size);font-weight:var(--card-footer-font-weight)}"; }
};

export { CardFooter as wf_card_footer };
