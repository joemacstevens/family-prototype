import { h } from "@stencil/core";
import { getIconBody } from '../../utils/svg';
export class WfActionIcon {
    constructor() {
        /** The size of the icon */
        this.size = 'sm';
        /** Decide if icon can change the size */
        this.scalable = true;
        /** Defines if icon has bounding circle */
        this.bounding = false;
        /** Defines if icon has property open */
        this.open = false;
        this.svgContent = '';
        this.handleClick = () => {
            this.wfClick.emit();
        };
    }
    async componentWillRender() {
        const { name, size } = this;
        try {
            this.svgContent = await getIconBody(name, size);
        }
        catch (e) {
            this.svgContent = '';
            console.error(e);
        }
    }
    render() {
        const { size, scalable, variant, open, svgContent, bounding, handleClick } = this;
        const iconClasses = {
            icon: true,
            [`icon-${size}`]: !!size,
            [`icon-scalable`]: scalable,
            [`icon-${variant}`]: !!variant,
            [`icon-bounding`]: !!bounding,
            [`icon-open`]: !!open,
        };
        return svgContent ? (h("div", { class: iconClasses },
            h("button", { type: "button", onClick: handleClick, innerHTML: svgContent }))) : null;
    }
    static get is() { return "wf-action-icon"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/action-icon/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/action-icon/main.css"]
    }; }
    static get properties() { return {
        "name": {
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
                "text": "The name of the icon"
            },
            "attribute": "name",
            "reflect": false
        },
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ActionIconSize",
                "resolved": "\"sm\" | \"xs\"",
                "references": {
                    "ActionIconSize": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The size of the icon"
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "'sm'"
        },
        "scalable": {
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
                "text": "Decide if icon can change the size"
            },
            "attribute": "scalable",
            "reflect": false,
            "defaultValue": "true"
        },
        "variant": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ActionIconVariant",
                "resolved": "\"inverse\"",
                "references": {
                    "ActionIconVariant": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The variant of the icon"
            },
            "attribute": "variant",
            "reflect": false
        },
        "bounding": {
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
                "text": "Defines if icon has bounding circle"
            },
            "attribute": "bounding",
            "reflect": false,
            "defaultValue": "false"
        },
        "open": {
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
                "text": "Defines if icon has property open"
            },
            "attribute": "open",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "svgContent": {}
    }; }
    static get events() { return [{
            "method": "wfClick",
            "name": "wfClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "docClick",
            "name": "click",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Click event"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "docWfClick",
            "name": "wfClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Click event"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
}
