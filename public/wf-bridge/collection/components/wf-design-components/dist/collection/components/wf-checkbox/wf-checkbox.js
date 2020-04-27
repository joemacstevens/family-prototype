var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import { generateUniqueId, showErrorMessage, prepareErrorTooltip } from '../../utils/utils';
import { PrefixEvent } from '../../utils/custom-event-emitter';
export class WfCheckbox {
    constructor() {
        /** Decides if checkbox is checked */
        this.checked = false;
        /** Decides if checkbox is disabled */
        this.disabled = false;
        /** Decides if checkbox has an error */
        this.error = false;
        /** Size of checkbox  */
        this.size = 'lg';
        /** Decides if checkbox field required */
        this.required = false;
        /** Decides if checkbox is indeterminate mode */
        this.indeterminate = false;
        this.emitValue = () => {
            const { checked, value, change } = this;
            if (value) {
                change.emit({ checked, value });
                return;
            }
            change.emit(checked);
        };
        this.formResetListener = () => {
            this.checked = this.initialChecked;
            this.emitValue();
        };
        this.handleClick = () => {
            if (this.disabled) {
                return;
            }
            this.indeterminate = false;
            this.checked = !this.checked;
            this.emitValue();
        };
        this.handleChange = (checkbox) => {
            this.change.emit(checkbox.target.checked);
            this.checked = checkbox.target.checked;
        };
        this.handleOnFocus = () => {
            this.wfFocus.emit();
        };
        this.handleOnBlur = () => {
            this.wfBlur.emit();
        };
    }
    /** To focus checkbox element use setFocus method */
    async setFocus() {
        this.getHost()
            .shadowRoot.querySelector('button')
            .focus();
    }
    componentWillLoad() {
        const { checkboxId, checked } = this;
        this.initialChecked = checked;
        if (checkboxId) {
            return;
        }
        this.checkboxId = `form-element-${generateUniqueId()}`;
    }
    componentDidLoad() {
        this.form = this.getHost().closest('form');
        if (this.form) {
            this.form.addEventListener('reset', this.formResetListener);
        }
    }
    componentDidUnload() {
        if (this.form) {
            this.form.removeEventListener('reset', this.formResetListener);
        }
    }
    getHost() {
        return this.host;
    }
    render() {
        const { name, checkboxId, checked, disabled, label, size, error, errorMessage, handleChange, handleClick, required, handleOnFocus, handleOnBlur, indeterminate, } = this;
        const checkboxProps = {
            type: 'checkbox',
            name,
            id: checkboxId,
            checked,
            disabled,
            ['data-indeterminate']: !!indeterminate,
            onChange: handleChange,
            value: '',
        };
        const labelProps = Object.assign(Object.assign({}, (!label && { class: 'position-static' })), { onfocus: handleOnFocus, onblur: handleOnBlur });
        const checkboxClasses = {
            'form-check': true,
            [`form-check-${size}`]: true,
            ['form-check-error']: !!error,
            ['form-check-indeterminate']: !!indeterminate,
        };
        const asteriskClasses = {
            [`error`]: !!error,
            ['required']: !error && !!required,
        };
        return (h("wf-tooltip", Object.assign({}, prepareErrorTooltip(error, errorMessage)),
            h("div", { class: checkboxClasses },
                h("input", Object.assign({}, checkboxProps)),
                h("button", Object.assign({ type: "button" }, labelProps, { onClick: handleClick }),
                    label,
                    (!!error || !!required) && h("span", { class: asteriskClasses }, "*")),
                showErrorMessage(error, errorMessage) && (h("div", { class: "form-control-error-message", innerHTML: errorMessage.text })))));
    }
    static get is() { return "wf-checkbox"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/checkbox/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/checkbox/main.css"]
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
                "text": "Checkbox name"
            },
            "attribute": "name",
            "reflect": false
        },
        "checkboxId": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Checkbox ID"
            },
            "attribute": "checkbox-id",
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
                "text": "Content of label"
            },
            "attribute": "label",
            "reflect": false
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
                "text": "Decides if checkbox is checked"
            },
            "attribute": "checked",
            "reflect": false,
            "defaultValue": "false"
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
                "text": "Decides if checkbox is disabled"
            },
            "attribute": "disabled",
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
                "text": "Decides if checkbox has an error"
            },
            "attribute": "error",
            "reflect": false,
            "defaultValue": "false"
        },
        "errorMessage": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "FormErrorMessage",
                "resolved": "FormErrorMessage",
                "references": {
                    "FormErrorMessage": {
                        "location": "import",
                        "path": "../../utils/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Error messages"
            }
        },
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "CheckboxSize",
                "resolved": "\"lg\" | \"sm\"",
                "references": {
                    "CheckboxSize": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Size of checkbox"
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "'lg'"
        },
        "required": {
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
                "text": "Decides if checkbox field required"
            },
            "attribute": "required",
            "reflect": false,
            "defaultValue": "false"
        },
        "indeterminate": {
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
                "text": "Decides if checkbox is indeterminate mode"
            },
            "attribute": "indeterminate",
            "reflect": false,
            "defaultValue": "false"
        },
        "value": {
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
                "text": "Value of checkbox"
            },
            "attribute": "value",
            "reflect": false
        }
    }; }
    static get events() { return [{
            "method": "wfFocus",
            "name": "wfFocus",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Checkbox focus event"
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
                "text": "Checkbox blur event"
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }, {
            "method": "docChange",
            "name": "change",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "boolean | CheckboxOutput",
                "resolved": "CheckboxOutput | boolean",
                "references": {
                    "CheckboxOutput": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            }
        }, {
            "method": "docWfChange",
            "name": "wfChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "boolean | CheckboxOutput",
                "resolved": "CheckboxOutput | boolean",
                "references": {
                    "CheckboxOutput": {
                        "location": "import",
                        "path": "./types"
                    }
                }
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
                "text": "To focus checkbox element use setFocus method",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "host"; }
}
__decorate([
    PrefixEvent()
], WfCheckbox.prototype, "change", void 0);
