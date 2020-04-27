import { h } from "@stencil/core";
export class CardHeader {
    render() {
        return (h("header", { class: "card-header" },
            h("slot", null)));
    }
    static get is() { return "wf-card-header"; }
    static get originalStyleUrls() { return {
        "$": ["../../../styles/components/card/card-header/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../../styles/components/card/card-header/main.css"]
    }; }
}
