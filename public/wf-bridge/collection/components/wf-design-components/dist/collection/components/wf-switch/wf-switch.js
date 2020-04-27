import { h } from "@stencil/core";
export class WfSwitch {
    constructor() {
        this.classes = {};
        /** Disabled Switch */
        this.disabled = false;
        /** Readonly Switch */
        this.readonly = false;
        /** Error Switch */
        this.error = false;
        /** On/Off labels placement */
        this.size = 'md';
        /** On/Off labels placement */
        this.placement = 'none';
        /** Define if icon should be shown before or after text */
        this.iconPlacement = 'right';
        /** Define icon */
        this.icon = 'wf-locked';
        /** Define icon size */
        this.iconSize = 'sm';
        /** Define if switch checked */
        this.checked = false;
        this.handleChange = () => {
            const { readonly, disabled } = this;
            if (readonly) {
                return;
            }
            if (disabled) {
                return;
            }
            this.checked = !this.checked;
            this.change.emit(this.checked);
            this.wfChange.emit(this.checked);
        };
    }
    renderLabel(label) {
        const { iconname, icon, iconsize, iconSize, iconPlacement } = this;
        const labelplacemnt = h("div", { class: "switch-label" }, label);
        return (h("div", { class: "switch-locked" },
            h("div", { class: `icon-wrapper icon-${iconsize || iconSize}` },
                iconPlacement === 'right' && labelplacemnt,
                h("wf-icon", { class: "wf-icon", size: iconsize || iconSize, name: iconname || icon, type: "primary" }),
                iconPlacement === 'left' && labelplacemnt)));
    }
    renderSingle() {
        const { classes, on, off, label } = this;
        return (h("div", { class: classes },
            h("button", { type: "button", class: "switch-inner", onClick: this.handleChange.bind(this) },
                h("div", { class: "switch-inner-thumb" })),
            h("div", { class: "switch-off-text" }, off),
            h("div", { class: "switch-on-text" }, on),
            label ? h("div", { class: "switch-label" }, label) : null));
    }
    renderWithoutText() {
        const { classes, label } = this;
        return (h("div", { class: classes },
            h("button", { type: "button", class: "switch-inner", onClick: this.handleChange.bind(this) },
                h("div", { class: "switch-inner-thumb" })),
            label ? h("div", { class: "switch-label" }, label) : null));
    }
    renderInsideText() {
        const { classes, on, off, label } = this;
        return (h("div", { class: classes },
            h("button", { type: "button", class: "switch-inner", onClick: this.handleChange.bind(this) },
                h("div", { class: "switch-on-text" }, on),
                h("div", { class: "switch-off-text" }, off),
                h("div", { class: "switch-inner-thumb" })),
            label ? h("div", { class: "switch-label" }, label) : null));
    }
    renderOutsideText() {
        const { classes, on, off, label } = this;
        return (h("div", { class: classes },
            h("div", { class: "switch-off-text" }, off),
            h("button", { type: "button", class: "switch-inner", onClick: this.handleChange.bind(this) },
                h("div", { class: "switch-inner-thumb" })),
            h("div", { class: "switch-on-text" }, on),
            label ? h("div", { class: "switch-label" }, label) : null));
    }
    renderLayout(placement) {
        return {
            single: this.renderSingle(),
            none: this.renderWithoutText(),
            inside: this.renderInsideText(),
            outside: this.renderOutsideText(),
        }[placement];
    }
    render() {
        const { checked, size, placement, disabled, readonly, error, label } = this;
        this.classes = {
            switch: true,
            'switch-checked': checked,
            [`switch-${size}`]: true,
            [`switch-disabled`]: !!disabled,
            [`switch-readonly`]: !!readonly,
            [`switch-error`]: !!error,
            [`switch-placement-${placement}`]: true,
        };
        return disabled && label ? this.renderLabel(label) : this.renderLayout(placement);
    }
    static get is() { return "wf-switch"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/switch/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/switch/main.css"]
    }; }
    static get properties() { return {
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
                "text": "Disabled Switch"
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "readonly": {
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
                "text": "Readonly Switch"
            },
            "attribute": "readonly",
            "reflect": false,
            "defaultValue": "false"
        },
        "error": {
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
                "text": "Error Switch"
            },
            "attribute": "error",
            "reflect": false,
            "defaultValue": "false"
        },
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "SwitchSize",
                "resolved": "\"md\" | \"sm\"",
                "references": {
                    "SwitchSize": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "On/Off labels placement"
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "'md'"
        },
        "placement": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "SwitchPlacement",
                "resolved": "\"inside\" | \"none\" | \"outside\" | \"single\"",
                "references": {
                    "SwitchPlacement": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "On/Off labels placement"
            },
            "attribute": "placement",
            "reflect": false,
            "defaultValue": "'none'"
        },
        "iconPlacement": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "IconPlacement",
                "resolved": "\"left\" | \"right\"",
                "references": {
                    "IconPlacement": {
                        "location": "import",
                        "path": "../../utils/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Define if icon should be shown before or after text"
            },
            "attribute": "icon-placement",
            "reflect": false,
            "defaultValue": "'right'"
        },
        "on": {
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
                "text": "Define switch on name"
            },
            "attribute": "on",
            "reflect": false
        },
        "off": {
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
                "text": "Define switch off name"
            },
            "attribute": "off",
            "reflect": false
        },
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
                "text": "Define switch label"
            },
            "attribute": "label",
            "reflect": false
        },
        "iconname": {
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
                "text": "DEPRECATED! Define icon"
            },
            "attribute": "iconname",
            "reflect": false
        },
        "icon": {
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
                "text": "Define icon"
            },
            "attribute": "icon",
            "reflect": false,
            "defaultValue": "'wf-locked'"
        },
        "iconsize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "IconSize",
                "resolved": "\"lg\" | \"md\" | \"sm\" | \"xl\" | \"xs\" | \"xxs\"",
                "references": {
                    "IconSize": {
                        "location": "import",
                        "path": "../wf-icon/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "DEPRECATED! Define icon size"
            },
            "attribute": "iconsize",
            "reflect": false
        },
        "iconSize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "IconSize",
                "resolved": "\"lg\" | \"md\" | \"sm\" | \"xl\" | \"xs\" | \"xxs\"",
                "references": {
                    "IconSize": {
                        "location": "import",
                        "path": "../wf-icon/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Define icon size"
            },
            "attribute": "icon-size",
            "reflect": false,
            "defaultValue": "'sm'"
        },
        "checked": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Define if switch checked"
            },
            "attribute": "checked",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get events() { return [{
            "method": "change",
            "name": "change",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Switch change event"
            },
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            }
        }, {
            "method": "wfChange",
            "name": "wfChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Switch change event"
            },
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            }
        }]; }
}
