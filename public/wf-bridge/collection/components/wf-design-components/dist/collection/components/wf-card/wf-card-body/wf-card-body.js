import { h } from "@stencil/core";
export class CardBody {
    render() {
        return (h("main", { class: "card-body" },
            h("slot", null)));
    }
    static get is() { return "wf-card-body"; }
    static get originalStyleUrls() { return {
        "$": ["../../../styles/components/card/card-body/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../../styles/components/card/card-body/main.css"]
    }; }
}
