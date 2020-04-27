import { h } from "@stencil/core";
export class CardHeaderActions {
    render() {
        return (h("div", { class: "card-header-actions" },
            h("slot", null)));
    }
    static get is() { return "wf-card-header-actions"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../../../styles/components/card/card-header-actions/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../../../styles/components/card/card-header-actions/main.css"]
    }; }
}
