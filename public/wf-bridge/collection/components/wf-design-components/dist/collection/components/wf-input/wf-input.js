var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import IMask from 'imask';
import { MASKED_TYPE, BASIC_TYPES, ShadowHTMLMaskElement, MapMaskTypes, } from './types';
import { generateUniqueId, showErrorMessage, prepareErrorTooltip, removePX, setPX, } from '../../utils/utils';
import { PrefixEvent } from '../../utils/custom-event-emitter';
export class WfInput {
    constructor() {
        /** Decides if label has inline position */
        this.inlineLabel = false;
        /** Type of input */
        this.type = 'text';
        /** Variant of input */
        this.variant = 'primary';
        /** Input icon size */
        this.iconSize = 'xs';
        /** Input locked icon */
        this.lockedIcon = 'wf-locked';
        /** Input locked icon size */
        this.lockedIconSize = 'xs';
        /** Decides if input is disabled */
        this.disabled = false;
        /** Decides if input in locked state */
        this.locked = false;
        /** Decides if input is in readonly mode */
        this.readonly = false;
        /** Decides if input has an error */
        this.error = false;
        /** Decides if input field required */
        this.required = false;
        /** Value type returned from masked type input */
        this.maskValue = 'value';
        /** Input value alignment */
        this.textAlign = 'left';
        this.setInputLeftPadding = () => {
            const { prefixLabel } = this;
            if (!prefixLabel)
                return;
            const input = this.getNativeInput();
            const prefix = this.getHost().shadowRoot.querySelector('.prefix');
            const paddingLeft = window.getComputedStyle(input, null).getPropertyValue('padding-left');
            const prefixWidth = window.getComputedStyle(prefix, null).getPropertyValue('width');
            const paddingSum = parseInt(paddingLeft, 2) + removePX(prefixWidth) + 12;
            input.style.paddingLeft = setPX(paddingSum);
        };
        this.handleInput = (event) => {
            event.stopPropagation();
            const nativeInput = event.target;
            // this is to make sure value will get most recent masked value
            setTimeout(() => {
                this.value = nativeInput.value;
                const emittedValue = this.getValueToEmit();
                this.input.emit(emittedValue);
            });
        };
        this.handleChange = (event) => {
            event.stopPropagation();
            const nativeInput = event.target;
            this.value = nativeInput.value;
            const emittedValue = this.getValueToEmit();
            this.change.emit(emittedValue);
        };
        this.handleOnFocus = () => {
            this.wfFocus.emit();
        };
        this.handleOnBlur = () => {
            this.wfBlur.emit();
        };
        this.formResetListener = () => {
            const { mask, maskValue } = this;
            this.value = this.initialValue;
            const emittedValue = !!mask ? mask[maskValue] : this.value;
            this.change.emit(emittedValue);
        };
        this.handleIconClick = () => {
            this.wfClick.emit();
            this.iconClick.emit();
        };
    }
    /** Input focus method */
    async setFocus() {
        this.getNativeInput().focus();
    }
    /** Input select method */
    async selectText() {
        this.getNativeInput().select();
    }
    getHost() {
        return this.host;
    }
    get isMasked() {
        return this.type === MASKED_TYPE;
    }
    getNativeInput() {
        return this.getHost().shadowRoot.querySelector('input');
    }
    getValueToEmit() {
        const { value, mask, maskValue } = this;
        return !!mask && value.length > 0 ? mask[maskValue] : value;
    }
    componentWillLoad() {
        const { inputId, value } = this;
        this.initialValue = value;
        if (inputId) {
            return;
        }
        this.inputId = `form-element-${generateUniqueId()}`;
    }
    addIntersectionObserver(element) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting === true) {
                this.setInputLeftPadding();
            }
        }, { threshold: [0] });
        observer.observe(element);
    }
    componentDidLoad() {
        this.form = this.getHost().closest('form');
        if (this.form) {
            this.form.addEventListener('reset', this.formResetListener);
        }
        this.initMask();
        const host = this.getHost();
        this.addIntersectionObserver(host);
    }
    initMask() {
        if (!this.isMasked || this.mask) {
            return;
        }
        const nativeInput = this.getNativeInput();
        this.mask = IMask(new ShadowHTMLMaskElement(nativeInput), {
            mask: /.*/,
        });
        if (this.maskOptions) {
            const options = this.mapMaskOptions(this.maskOptions);
            this.mask.updateOptions(options);
        }
    }
    mapMaskOptions(options) {
        const maskOption = (option) => {
            const mapHeader = (option) => MapMaskTypes[option.mask] ? Object.assign(Object.assign({}, option), { mask: MapMaskTypes[option.mask] }) : option;
            const highLevelMaskType = mapHeader(option);
            if (!highLevelMaskType.blocks)
                return highLevelMaskType;
            return Object.assign(Object.assign({}, highLevelMaskType), { blocks: Object.keys(highLevelMaskType.blocks).reduce((acc, key) => {
                    acc[key] = mapHeader(highLevelMaskType.blocks[key]);
                    return acc;
                }, {}) });
        };
        return Array.isArray(options) ? options.map(maskOption) : maskOption(options);
    }
    componentDidUnload() {
        if (this.form) {
            this.form.removeEventListener('reset', this.formResetListener);
        }
        this.dropMask();
    }
    dropMask() {
        if (!this.mask) {
            return;
        }
        this.mask.destroy();
        delete this.mask;
    }
    handleType() {
        // this is in case masked to any other type change
        this.dropMask();
        // this is in case from any other to masked type change
        this.initMask();
    }
    handleMaskOptions(maskOptions) {
        // due to teh complex nature of mask options the attribute is not supported
        if (!this.isMasked || !this.mask || typeof maskOptions === 'string') {
            return;
        }
        this.mask.updateOptions(this.mapMaskOptions(this.maskOptions));
    }
    handleValue() {
        const nativeInput = this.getNativeInput();
        if (!this.isMasked || !this.mask || this.value === nativeInput.value) {
            return;
        }
        nativeInput.value = this.value;
        this.mask.updateValue();
        this.mask.updateControl();
        this.value = nativeInput.value;
    }
    renderLockedIcon() {
        const { lockedIcon, lockedIconSize, locked, variant } = this;
        const iconClasses = {
            [`form-control-icon-locked-${lockedIconSize}`]: true,
            [`form-control-icon-locked-${variant}`]: true,
        };
        return (locked && h("wf-icon", { class: iconClasses, size: lockedIconSize, name: lockedIcon }));
    }
    renderLabel() {
        const { error, required, variant, inputId, label, inlineLabel, caption } = this;
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
        return (h("label", { class: labelClasses, htmlFor: inputId },
            displayLabel,
            (!!error || !!required) && h("span", { class: asteriskClasses }, "*")));
    }
    render() {
        const { type, inputId, variant, size, value, placeholder, disabled, error, errorMessage, locked, readonly, label, inlineLabel, caption, description, icon, iconSize, maxlength, required, prefixLabel, textAlign, handleChange, handleInput, handleOnFocus, handleOnBlur, handleIconClick, } = this;
        const newType = BASIC_TYPES.includes(type) ? type : 'text';
        const containerClasses = {
            [`form-group`]: true,
            [`form-group-${variant}`]: variant === 'inverse',
            [`inline-form-group`]: inlineLabel || (!!caption && !!!label),
        };
        const inputClasses = {
            'form-control': true,
            [`form-input-type-${newType}`]: true,
            [`form-control-${variant}`]: !!variant,
            [`form-control-${size}`]: !!size,
            [`form-control-icon-${iconSize}`]: !!icon,
            [`form-control-error`]: !!error,
            [`form-control-disabled`]: !!disabled,
            [`form-control-required`]: !!required,
            [`form-control-locked`]: !!locked,
            [`form-control-text-align-${textAlign}`]: !!textAlign,
        };
        const iconClasses = {
            'form-control-icon-wrapper': true,
            [`form-control-icon-wrapper-${iconSize}`]: !!iconSize,
        };
        const inputAttributes = Object.assign(Object.assign({ type: newType, id: inputId, class: inputClasses, readonly: locked || readonly, disabled,
            placeholder, onChange: handleChange, onInput: handleInput, onfocus: handleOnFocus, onblur: handleOnBlur }, (maxlength ? { maxlength } : {})), { value });
        return (h("wf-tooltip", Object.assign({}, prepareErrorTooltip(error, errorMessage)),
            h("div", { class: containerClasses },
                (!!label || !!caption) && this.renderLabel(),
                h("div", { class: "form-control-wrapper" },
                    !!prefixLabel && h("span", { class: "prefix" }, prefixLabel),
                    this.renderLockedIcon(),
                    h("input", Object.assign({}, inputAttributes)),
                    !!icon && (h("div", { class: iconClasses, onClick: handleIconClick },
                        h("wf-icon", { size: iconSize, name: icon })))),
                !!description && h("div", { class: "form-control-description" }, description),
                showErrorMessage(error, errorMessage) && (h("div", { class: "form-control-error-message", innerHTML: errorMessage.text })))));
    }
    static get is() { return "wf-input"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/input/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/input/main.css"]
    }; }
    static get properties() { return {
        "inputId": {
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
                "text": "ID of an underlying input element"
            },
            "attribute": "input-id",
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
                "text": "Input text placeholder"
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
                "text": "DEPRECATED Content of caption"
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
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "InputType",
                "resolved": "\"color\" | \"email\" | \"masked\" | \"number\" | \"password\" | \"search\" | \"tel\" | \"text\" | \"time\" | \"url\"",
                "references": {
                    "InputType": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Type of input"
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "'text'"
        },
        "variant": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "InputVariant",
                "resolved": "\"inverse\" | \"primary\" | \"secondary\"",
                "references": {
                    "InputVariant": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Variant of input"
            },
            "attribute": "variant",
            "reflect": false,
            "defaultValue": "'primary'"
        },
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "InputSize",
                "resolved": "\"lg\" | \"sm\"",
                "references": {
                    "InputSize": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "DEPRECATED Size of input"
            },
            "attribute": "size",
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
                "text": "Input icon"
            },
            "attribute": "icon",
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
                "text": "Input icon size"
            },
            "attribute": "icon-size",
            "reflect": false,
            "defaultValue": "'xs'"
        },
        "lockedIcon": {
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
                "text": "Input locked icon"
            },
            "attribute": "locked-icon",
            "reflect": false,
            "defaultValue": "'wf-locked'"
        },
        "lockedIconSize": {
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
                "text": "Input locked icon size"
            },
            "attribute": "locked-icon-size",
            "reflect": false,
            "defaultValue": "'xs'"
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
                "text": "Decides if input is disabled"
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
                "text": "Decides if input in locked state"
            },
            "attribute": "locked",
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
                "text": "Decides if input is in readonly mode"
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
                "text": "Decides if input has an error"
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
                "text": "Decides if input field required"
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
                "text": "Value of input"
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
                "text": "Maximum length of input field"
            },
            "attribute": "maxlength",
            "reflect": false
        },
        "maskOptions": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "MaskOptions",
                "resolved": "any",
                "references": {
                    "MaskOptions": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Mask options"
            },
            "attribute": "mask-options",
            "reflect": false
        },
        "maskValue": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "MaskValue",
                "resolved": "\"typedValue\" | \"unmaskedValue\" | \"value\"",
                "references": {
                    "MaskValue": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Value type returned from masked type input"
            },
            "attribute": "mask-value",
            "reflect": false,
            "defaultValue": "'value'"
        },
        "prefixLabel": {
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
                "text": "Input prefix"
            },
            "attribute": "prefix-label",
            "reflect": false
        },
        "textAlign": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "InputTextAlign",
                "resolved": "\"center\" | \"left\" | \"right\"",
                "references": {
                    "InputTextAlign": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Input value alignment"
            },
            "attribute": "text-align",
            "reflect": false,
            "defaultValue": "'left'"
        }
    }; }
    static get events() { return [{
            "method": "iconClick",
            "name": "iconClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Input icon click event"
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
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
            "method": "wfClick",
            "name": "wfClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Input click event"
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
            "method": "docWfInput",
            "name": "wfInput",
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
                "text": "Input focus method",
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
                "text": "Input select method",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "type",
            "methodName": "handleType"
        }, {
            "propName": "maskOptions",
            "methodName": "handleMaskOptions"
        }, {
            "propName": "value",
            "methodName": "handleValue"
        }]; }
}
__decorate([
    PrefixEvent()
], WfInput.prototype, "change", void 0);
__decorate([
    PrefixEvent()
], WfInput.prototype, "input", void 0);
