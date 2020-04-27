import { h } from "@stencil/core";
export class WfChipList {
    onChipRemove(event) {
        event.detail.remove();
    }
    render() {
        return (h("div", { class: "chip-group" },
            h("slot", null)));
    }
    static get is() { return "wf-chip-list"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/chip/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/chip/main.css"]
    }; }
    static get listeners() { return [{
            "name": "chipRemove",
            "method": "onChipRemove",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
