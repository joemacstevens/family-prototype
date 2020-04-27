import { h } from "@stencil/core";
export class WfAccordion {
    render() {
        return (h("div", { class: "accordion" },
            h("slot", null)));
    }
    static get is() { return "wf-accordion"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/accordion/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/accordion/main.css"]
    }; }
}
