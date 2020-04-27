import { h } from "@stencil/core";
export class CardTitle {
    render() {
        return (h("h5", { class: "header-5 card-title" },
            h("slot", null)));
    }
    static get is() { return "wf-card-title"; }
    static get originalStyleUrls() { return {
        "$": ["../../../../styles/components/card/card-title/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../../../styles/components/card/card-title/main.css"]
    }; }
}
