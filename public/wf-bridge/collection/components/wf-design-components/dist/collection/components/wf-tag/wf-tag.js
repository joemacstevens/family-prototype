import { h } from "@stencil/core";
export class WfTag {
    constructor() {
        /** Type of tag */
        this.type = '1';
    }
    render() {
        const { type, text } = this;
        return (h("div", { class: `tag-${type}` },
            h("span", { class: "tag-text" }, text)));
    }
    static get is() { return "wf-tag"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/tag/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/tag/main.css"]
    }; }
    static get properties() { return {
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "TagType",
                "resolved": "\"1\" | \"2\" | \"3\" | \"4\" | \"5\"",
                "references": {
                    "TagType": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Type of tag"
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "'1'"
        },
        "text": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Tag text value"
            },
            "attribute": "text",
            "reflect": false
        }
    }; }
}
