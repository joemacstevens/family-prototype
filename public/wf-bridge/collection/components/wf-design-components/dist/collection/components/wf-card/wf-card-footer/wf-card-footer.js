import { h } from "@stencil/core";
export class CardFooter {
    render() {
        return (h("footer", { class: "card-footer" },
            h("slot", null)));
    }
    static get is() { return "wf-card-footer"; }
    static get originalStyleUrls() { return {
        "$": ["../../../styles/components/card/card-footer/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../../styles/components/card/card-footer/main.css"]
    }; }
}
