var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import { generateUniqueId, showErrorMessage, prepareErrorTooltip } from '../../utils/utils';
import { PrefixEvent } from '../../utils/custom-event-emitter';
export class WfTextarea {
    constructor() {
        /** Decides if label has inline position */
        this.inlineLabel = false;
        /** Variant of textarea */
        this.variant = 'primary';
        /** Decides if textarea is disabled */
        this.disabled = false;
        /** Decides if textarea in locked state */
        this.locked = false;
        /** Decides if textarea has an error */
        this.error = false;
        /**Decides if textarea field required */
        this.required = false;
        this.formResetListener = () => {
            this.value = this.initialValue;
            this.change.emit(this.value);
        };
        this.handleChange = (event) => {
            const textarea = event.target;
            this.change.emit(textarea.value);
        };
        this.handleInput = (event) => {
            const textarea = event.target;
            this.value = textarea.value;
            this.wfInput.emit(textarea.value);
            // this is in case value was updated within the subscriber
            textarea.value = this.value;
        };
        this.handleFocus = () => {
            this.wfFocus.emit();
        };
        this.handleBlur = () => {
            this.wfBlur.emit();
        };
    }
    /** To focus textarea element use setFocus method */
    async setFocus() {
        this.getNativeTextarea().focus();
    }
    /** Textarea select method */
    async selectText() {
        this.getNativeTextarea().select();
    }
    componentWillLoad() {
        const { textareaId, value } = this;
        this.initialValue = value;
        if (textareaId) {
            return;
        }
        this.textareaId = `form-element-${generateUniqueId()}`;
    }
    getHost() {
        return this.host;
    }
    getNativeTextarea() {
        return this.getHost().shadowRoot.querySelector('textarea');
    }
    async updateInput(value) {
        this.value = value;
        this.wfInput.emit(value);
        this.change.emit(value);
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
    renderLabel(id) {
        const { error, variant, label, inlineLabel, caption, required } = this;
        const displayLabel = label || caption;
        const labelClasses = {
            [`form-label`]: true,
            [`form-label-inline`]: inlineLabel || (!!caption && !!!label),
            [`form-label-${variant}`]: variant === 'inverse',
            [`form-label-error`]: !!error,
        };
        const asteriskClasses = {
            [`error`]: !!error,
            ['required']: !error && !!required,
        };
        return (h("label", { class: labelClasses, htmlFor: id },
            displayLabel,
            (!!error || !!required) && h("span", { class: asteriskClasses }, "*")));
    }
    render() {
        const { textareaId, variant, size, value, placeholder, disabled, error, errorMessage, locked, label, caption, description, maxlength, required, rows, cols, inlineLabel, handleFocus, handleBlur, handleChange, handleInput, } = this;
        const textareaClasses = {
            'form-control': true,
            'form-control-textarea': true,
            [`form-control-${variant}`]: !!variant,
            [`form-control-${size}`]: !!size && !!!rows,
            [`form-control-error`]: !!error,
            [`form-control-disabled`]: !!disabled,
            [`form-control-required`]: !!required,
            [`form-control-locked`]: !!locked,
        };
        const containerClasses = {
            [`form-group`]: true,
            [`form-group-${variant}`]: variant === 'inverse',
            [`inline-form-group`]: inlineLabel || (!!caption && !!!label),
        };
        const textareaAttributes = Object.assign(Object.assign({ id: textareaId, class: textareaClasses, disabled, readonly: !!locked, placeholder,
            value,
            rows,
            cols }, (maxlength ? { maxlength } : {})), { onChange: handleChange, onInput: handleInput, onFocus: handleFocus, onBlur: handleBlur });
        return (h("wf-tooltip", Object.assign({}, prepareErrorTooltip(error, errorMessage)),
            h("div", { class: containerClasses },
                (!!label || !!caption) && this.renderLabel(textareaId),
                h("div", { class: "form-control-wrapper" },
                    h("textarea", Object.assign({}, textareaAttributes))),
                !!description && h("div", { class: "form-control-description" }, description),
                showErrorMessage(error, errorMessage) && (h("div", { class: "form-control-error-message" }, errorMessage.text)))));
    }
    static get is() { return "wf-textarea"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/textarea/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/textarea/main.css"]
    }; }
    static get properties() { return {
        "textareaId": {
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
                "text": "ID of an underlying textarea element"
            },
            "attribute": "textarea-id",
            "reflect": false
        },
        "placeholder": {
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
                "text": "Textarea text placeholder"
            },
            "attribute": "placeholder",
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
                "text": "Content of top label"
            },
            "attribute": "label",
            "reflect": false
        },
        "inlineLabel": {
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
                "text": "Decides if label has inline position"
            },
            "attribute": "inline-label",
            "reflect": false,
            "defaultValue": "false"
        },
        "caption": {
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
                "text": "DEPRECATED Content of left caption"
            },
            "attribute": "caption",
            "reflect": false
        },
        "description": {
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
                "text": "Content of description / contextual info"
            },
            "attribute": "description",
            "reflect": false
        },
        "variant": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "TextareaVariant",
                "resolved": "\"inverse\" | \"primary\" | \"secondary\"",
                "references": {
                    "TextareaVariant": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Variant of textarea"
            },
            "attribute": "variant",
            "reflect": false,
            "defaultValue": "'primary'"
        },
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "TextareaSize",
                "resolved": "\"lg\" | \"sm\"",
                "references": {
                    "TextareaSize": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "DEPRECATED Size of textarea"
            },
            "attribute": "size",
            "reflect": false
        },
        "rows": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Rows of textarea"
            },
            "attribute": "rows",
            "reflect": false
        },
        "cols": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Cols of textarea"
            },
            "attribute": "cols",
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
                "text": "Decides if textarea is disabled"
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "locked": {
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
                "text": "Decides if textarea in locked state"
            },
            "attribute": "locked",
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
                "text": "Decides if textarea has an error"
            },
            "attribute": "error",
            "reflect": false,
            "defaultValue": "false"
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
                "text": "Decides if textarea field required"
            },
            "attribute": "required",
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
        "value": {
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
                "text": "Value of textarea"
            },
            "attribute": "value",
            "reflect": false
        },
        "maxlength": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Maximum length of textarea field"
            },
            "attribute": "maxlength",
            "reflect": false
        }
    }; }
    static get events() { return [{
            "method": "wfInput",
            "name": "wfInput",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Textarea input event"
            },
            "complexType": {
                "original": "string",
                "resolved": "string",
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
                "text": "Textarea focus event"
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
                "text": "Textarea blur event"
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
                "original": "string",
                "resolved": "string",
                "references": {}
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
                "original": "string",
                "resolved": "string",
                "references": {}
            }
        }, {
            "method": "docInput",
            "name": "input",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "string",
                "resolved": "string",
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
                "text": "To focus textarea element use setFocus method",
                "tags": []
            }
        },
        "selectText": {
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
                "text": "Textarea select method",
                "tags": []
            }
        },
        "updateInput": {
            "complexType": {
                "signature": "(value: string) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "host"; }
}
__decorate([
    PrefixEvent()
], WfTextarea.prototype, "change", void 0);
