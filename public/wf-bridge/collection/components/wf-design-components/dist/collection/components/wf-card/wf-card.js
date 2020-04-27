import { h } from "@stencil/core";
export class Card {
    render() {
        return (h("div", { class: "card" },
            h("slot", null)));
    }
    static get is() { return "wf-card"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/card/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/card/main.css"]
    }; }
}
