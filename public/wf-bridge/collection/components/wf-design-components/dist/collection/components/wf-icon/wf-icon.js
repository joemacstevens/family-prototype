import { h } from "@stencil/core";
import { getIconBody } from '../../utils/svg';
export class WfIcon {
    constructor() {
        /** The size of the icon */
        this.size = 'md';
        /** Decide if icon can change the size */
        this.scalable = true;
        this.svgContent = null;
    }
    async componentWillRender() {
        const { name, size } = this;
        try {
            this.svgContent = await getIconBody(name, size);
        }
        catch (e) {
            this.svgContent = null;
            console.error(e);
        }
    }
    render() {
        const { size, type, scalable, svgContent } = this;
        const iconClasses = {
            icon: true,
            [`icon-${size}`]: !!size,
            [`icon-scalable`]: scalable,
            [`icon-${type}`]: !!type,
        };
        return svgContent ? h("div", { class: iconClasses, innerHTML: svgContent }) : null;
    }
    static get is() { return "wf-icon"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/icon/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/icon/main.css"]
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
                "original": "IconSize",
                "resolved": "\"lg\" | \"md\" | \"sm\" | \"xl\" | \"xs\" | \"xxs\"",
                "references": {
                    "IconSize": {
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
            "defaultValue": "'md'"
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
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "IconType",
                "resolved": "\"inverse\" | \"inverse-simple\" | \"primary\" | \"secondary\"",
                "references": {
                    "IconType": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "DEPRECATED! The type of the icon"
            },
            "attribute": "type",
            "reflect": false
        }
    }; }
    static get states() { return {
        "svgContent": {}
    }; }
}
