export class WfRadioOption {
    constructor() {
        /** Decides if option is disabled */
        this.disabled = false;
        /** Decides if option is initially selected */
        this.checked = false;
    }
    static get is() { return "wf-radio-option"; }
    static get properties() { return {
        "label": {
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
                "text": "Option label"
            },
            "attribute": "label",
            "reflect": false
        },
        "value": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Option value"
            },
            "attribute": "value",
            "reflect": false
        },
        "optionId": {
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
                "text": "Option ID"
            },
            "attribute": "option-id",
            "reflect": false
        },
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Decides if option is disabled"
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "checked": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Decides if option is initially selected"
            },
            "attribute": "checked",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
}
