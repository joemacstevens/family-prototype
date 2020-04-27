import { h } from "@stencil/core";
export class WfButton {
    constructor() {
        /** Type of button */
        this.type = 'submit';
        /** Variant of button. DEPRECATED! 'link', 'success', 'warning', 'info', 'danger' */
        this.variant = 'primary';
        /** Define if icon should be shown before or after text */
        this.iconPlacement = 'left';
        /** Icon size */
        this.iconSize = 'sm';
        this.handleClick = () => {
            const { type, submit, reset } = this;
            const form = this.selectForm();
            if (type === 'submit' && form) {
                submit(form);
            }
            else if (type === 'reset' && form) {
                reset(form);
            }
            this.wfClick.emit();
        };
        this.handleOnFocus = () => {
            this.wfFocus.emit();
        };
        this.handleOnBlur = () => {
            this.wfBlur.emit();
        };
    }
    /** Button focus method */
    async setFocus() {
        this.getNativeButton().focus();
    }
    captureButtonClick(e) {
        if (this.disabled) {
            e.stopPropagation();
        }
    }
    getHost() {
        return this.host;
    }
    getNativeButton() {
        return this.getHost().shadowRoot.querySelector('button');
    }
    submit(form) {
        const tempSubmit = document.createElement('button');
        tempSubmit.type = 'submit';
        tempSubmit.style.visibility = 'hidden';
        form.appendChild(tempSubmit);
        tempSubmit.click();
        tempSubmit.remove();
    }
    reset(form) {
        form.reset();
    }
    selectForm() {
        return this.host.closest('form');
    }
    render() {
        const { type, variant, size, disabled, active, icon, iconPlacement, iconType, iconSize, handleClick, handleOnFocus, handleOnBlur, } = this;
        const classes = {
            btn: true,
            [`btn-${variant}`]: true,
            [`btn-${size}`]: !!size,
            [`btn-typeicon`]: !!icon,
            [`btn-${variant}-typeicon`]: !!icon,
            [`btn-typeicon-${iconPlacement}`]: !!icon,
            disabled: !!disabled,
            active: !!active && !disabled,
        };
        return (h("button", { type: type, class: classes, disabled: !!disabled, onClick: handleClick, onFocus: handleOnFocus, onBlur: handleOnBlur },
            !!icon && iconPlacement === 'left' ? (h("wf-icon", { class: "btn-icon", name: icon, size: iconSize, type: iconType })) : null,
            h("span", { class: "btn-text" },
                h("slot", null)),
            !!icon && iconPlacement === 'right' ? (h("wf-icon", { class: "btn-icon", name: icon, size: iconSize, type: iconType })) : null));
    }
    static get is() { return "wf-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/button/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/button/main.css"]
    }; }
    static get properties() { return {
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ButtonType",
                "resolved": "\"button\" | \"reset\" | \"submit\"",
                "references": {
                    "ButtonType": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Type of button"
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "'submit'"
        },
        "variant": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ButtonVariant",
                "resolved": "\"danger\" | \"info\" | \"inverse\" | \"link\" | \"primary\" | \"secondary\" | \"success\" | \"tertiary\" | \"warning\"",
                "references": {
                    "ButtonVariant": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Variant of button. DEPRECATED! 'link', 'success', 'warning', 'info', 'danger'"
            },
            "attribute": "variant",
            "reflect": false,
            "defaultValue": "'primary'"
        },
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ButtonSize",
                "resolved": "\"lg\" | \"md\" | \"sm\"",
                "references": {
                    "ButtonSize": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "DEPRECATED! Size of button"
            },
            "attribute": "size",
            "reflect": false
        },
        "active": {
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
                "text": "Use to set button state as active"
            },
            "attribute": "active",
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
                "text": "Use to set button state as disabled"
            },
            "attribute": "disabled",
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
                "text": "Icon name to display on button"
            },
            "attribute": "icon",
            "reflect": false
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
            "defaultValue": "'left'"
        },
        "iconType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "IconType",
                "resolved": "\"inverse\" | \"inverse-simple\" | \"primary\" | \"secondary\"",
                "references": {
                    "IconType": {
                        "location": "import",
                        "path": "../wf-icon/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "DEPRECATED! Icon type"
            },
            "attribute": "icon-type",
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
                "text": "Icon size"
            },
            "attribute": "icon-size",
            "reflect": false,
            "defaultValue": "'sm'"
        }
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
            "method": "wfFocus",
            "name": "wfFocus",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Input focus event"
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }, {
            "method": "wfBlur",
            "name": "wfBlur",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Input blur event"
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
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
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "docFocus",
            "name": "focus",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }, {
            "method": "docBlur",
            "name": "blur",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "setFocus": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Button focus method",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "host"; }
    static get listeners() { return [{
            "name": "click",
            "method": "captureButtonClick",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
