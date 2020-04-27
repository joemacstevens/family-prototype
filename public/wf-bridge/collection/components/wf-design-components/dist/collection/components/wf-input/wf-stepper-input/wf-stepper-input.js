var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import { generateUniqueId, showErrorMessage, prepareErrorTooltip } from '../../../utils/utils';
import { ArrowKeyKode } from './types';
import { OptionsStrategy, NumericStrategy } from './strategies';
import { PrefixEvent } from '../../../utils/custom-event-emitter';
export class WfStepperInput {
    constructor() {
        /** Id of input stepper */
        this.inputId = generateUniqueId();
        /** Decides if label has inline position */
        this.inlineLabel = false;
        /** Variant of stepper */
        this.variant = 'primary';
        /** Decides if stepper is disabled */
        this.disabled = false;
        /** Decides if stepper is in locked state */
        this.locked = false;
        /** Input locked icon */
        this.lockedIcon = 'wf-locked';
        /** Input locked icon size */
        this.lockedIconSize = 'xs';
        this.arrowUpIcon = 'wf-arrow-up';
        this.arrowDownIcon = 'wf-arrow-down';
        this.arrowIconSize = 'xs';
        /** Decides if stepper has an error */
        this.error = false;
        /** DEPRECATED! Decides if stepper input numeric */
        this.numeric = false;
        /** DEPRECATED! Accumulator function to get Value from object option */
        this.getValue = (step) => step.value;
        /** Initial numeric input value or gives/sets value from options value. */
        this.value = 0;
        /** Input value alignment */
        this.textAlign = 'left';
        //** Current selected option index */
        this.selectedIndex = 0;
        this.valueIndex = 0;
        this.generateValue = () => {
            return (this.value = this.strategy.generateValue(this));
        };
        this.rerenderOptions = () => {
            // Parsing string to options is DEPRECATED!
            Array.isArray(this.options)
                ? (this.parsedOptions = this.options)
                : (this.parsedOptions = JSON.parse(this.options));
            this.length = this.parsedOptions.length;
            this.selectedIndex = 0;
            this.handleStepperChange();
        };
        this.handleStepperChange = () => {
            const { locked } = this;
            if (!locked) {
                this.value = this.strategy.generateValue(this);
                this.stepperChange && this.stepperChange.emit(this.value);
            }
        };
        this.swipeUp = () => {
            if (this.swipeUpAvailable()) {
                this.strategy.swipeUp(this);
                this.handleStepperChange();
            }
        };
        this.swipeDown = () => {
            if (this.swipeDownAvailable()) {
                this.strategy.swipeDown(this);
                this.handleStepperChange();
            }
        };
        this.swipeUpAvailable = () => {
            const { disabled, locked, selectedIndex, numeric, length } = this;
            return !disabled && !locked && (numeric || selectedIndex + 1 < length);
        };
        this.swipeDownAvailable = () => {
            const { disabled, locked, selectedIndex, numeric } = this;
            return !disabled && !locked && (numeric || !!selectedIndex);
        };
        this.focusStepper = () => {
            this.host.shadowRoot.querySelector('.input-stepper').focus();
        };
        this.hasOptions = () => {
            const { options, numeric } = this;
            if (numeric)
                return false;
            return !!options && !!options.length;
        };
    }
    handleKeyDown(event) {
        event.preventDefault();
        if (event.key === ArrowKeyKode.ARROW_UP_KEY) {
            this.swipeUp();
        }
        if (event.key === ArrowKeyKode.ARROW_DOWN_KEY) {
            this.swipeDown();
        }
    }
    handleOptionsChange(newOptions, oldOptions) {
        if (!this.checkOptionType(newOptions)) {
            this.options = oldOptions;
            return;
        }
        this.setStrategy();
    }
    handleValueChange(newValue, oldValue) {
        try {
            this.strategy.validateValue(newValue, this);
        }
        catch (error) {
            this.value = oldValue;
            throw error;
        }
    }
    componentWillLoad() {
        this.setStrategy();
        this.value = this.strategy.generateValue(this);
    }
    checkOptionType(options) {
        return (Array.isArray(options) &&
            options.length &&
            options.every((option) => typeof option === 'string'));
    }
    setStrategy() {
        if (this.hasOptions()) {
            this.numeric = false;
            this.strategy = new OptionsStrategy(this.getValue);
            this.rerenderOptions();
        }
        else {
            this.numeric = true;
            this.strategy = new NumericStrategy();
        }
    }
    renderLabel(id) {
        const { error, variant, label, inlineLabel, caption } = this;
        const displayLabel = label || caption;
        const labelClasses = {
            [`form-label`]: true,
            [`form-label-inline`]: inlineLabel || (!!caption && !!!label),
            [`form-label-${variant}`]: variant === 'inverse',
            [`form-label-error`]: !!error,
        };
        const asteriskClasses = {
            [`error`]: !!error,
        };
        return (h("label", { class: labelClasses, htmlFor: `form-element-${id}`, onClick: this.focusStepper },
            displayLabel,
            !!error && h("span", { class: asteriskClasses }, "*")));
    }
    renderLockedIcon() {
        const { lockedIcon, lockedIconSize, locked, variant } = this;
        const iconClasses = {
            [`form-control-icon-locked-${lockedIconSize}`]: true,
            [`form-control-icon-locked-${variant}`]: true,
        };
        return (locked && h("wf-icon", { class: iconClasses, size: lockedIconSize, name: lockedIcon }));
    }
    render() {
        const { inputId, label, inlineLabel, caption, description, variant, size, disabled, locked, error, errorMessage, textAlign, value, arrowUpIcon, arrowDownIcon, arrowIconSize, } = this;
        const containerClasses = {
            [`form-group`]: true,
            [`form-group-${variant}`]: variant === 'inverse',
            [`inline-form-group`]: inlineLabel || (!!caption && !!!label),
        };
        const stepperClasses = {
            'form-control': true,
            'input-stepper': true,
            [`form-control-${variant}`]: !!variant,
            [`form-control-${size}`]: !!size,
            [`form-control-icon-xs`]: true,
            [`form-control-error`]: !!error,
            [`form-control-disabled`]: disabled,
            [`form-control-locked`]: !!locked,
            [`form-control-text-align-${textAlign}`]: !!textAlign,
        };
        return (h("wf-tooltip", Object.assign({}, prepareErrorTooltip(error, errorMessage)),
            h("div", { class: containerClasses },
                (!!label || !!caption) && this.renderLabel(inputId),
                h("div", { class: "form-control-wrapper" },
                    h("div", { class: stepperClasses, tabindex: "1", id: `form-element-${inputId}` },
                        this.renderLockedIcon(),
                        h("input", { disabled: true, class: "input-stepper-data", value: value }),
                        this.swipeUpAvailable() && (h("wf-action-icon", { key: "arrowUp", size: arrowIconSize, name: arrowUpIcon, variant: variant === 'inverse' ? variant : undefined, class: `input-arrow input-arrow-${arrowIconSize} up`, onClick: this.swipeUp })),
                        this.swipeDownAvailable() && (h("wf-action-icon", { key: "arrowDown", size: arrowIconSize, name: arrowDownIcon, variant: variant === 'inverse' ? variant : undefined, class: `input-arrow input-arrow-${arrowIconSize} down`, onClick: this.swipeDown })))),
                !!description && h("div", { class: "form-control-description" }, description),
                showErrorMessage(error, errorMessage) && (h("div", { class: "form-control-error-message", innerHTML: errorMessage.text })))));
    }
    static get is() { return "wf-stepper-input"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../../styles/components/input/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../../styles/components/input/main.css"]
    }; }
    static get properties() { return {
        "inputId": {
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
                "text": "Id of input stepper"
            },
            "attribute": "input-id",
            "reflect": false,
            "defaultValue": "generateUniqueId()"
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
                "original": "InputVariant",
                "resolved": "\"inverse\" | \"primary\" | \"secondary\"",
                "references": {
                    "InputVariant": {
                        "location": "import",
                        "path": "../types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Variant of stepper"
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
                        "path": "../types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "DEPRECATED Size of stepper"
            },
            "attribute": "size",
            "reflect": false
        },
        "options": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string[] | StepperOption[] | string",
                "resolved": "StepperOption[] | string | string[]",
                "references": {
                    "StepperOption": {
                        "location": "import",
                        "path": "../types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Stepper options. DEPRECATED! Option types StepperOption[] | string"
            },
            "attribute": "options",
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
                "text": "Decides if stepper is disabled"
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
                "text": "Decides if stepper is in locked state"
            },
            "attribute": "locked",
            "reflect": false,
            "defaultValue": "false"
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
                        "path": "../../wf-icon/types"
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
        "arrowUpIcon": {
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
                "text": ""
            },
            "attribute": "arrow-up-icon",
            "reflect": false,
            "defaultValue": "'wf-arrow-up'"
        },
        "arrowDownIcon": {
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
                "text": ""
            },
            "attribute": "arrow-down-icon",
            "reflect": false,
            "defaultValue": "'wf-arrow-down'"
        },
        "arrowIconSize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ActionIconSize",
                "resolved": "\"sm\" | \"xs\"",
                "references": {
                    "ActionIconSize": {
                        "location": "import",
                        "path": "../../wf-action-icon/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "arrow-icon-size",
            "reflect": false,
            "defaultValue": "'xs'"
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
                "text": "Decides if stepper has an error"
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
                        "path": "../../../utils/types"
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
        "numeric": {
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
                "text": "DEPRECATED! Decides if stepper input numeric"
            },
            "attribute": "numeric",
            "reflect": false,
            "defaultValue": "false"
        },
        "getValue": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Function",
                "resolved": "Function",
                "references": {
                    "Function": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "DEPRECATED! Accumulator function to get Value from object option"
            },
            "defaultValue": "(step: any) => step.value"
        },
        "value": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "string | number",
                "resolved": "number | string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Initial numeric input value or gives/sets value from options value."
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "0"
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
                        "path": "../types"
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
    static get states() { return {
        "selectedIndex": {}
    }; }
    static get events() { return [{
            "method": "docStepperChange",
            "name": "stepperChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Stepper change event"
            },
            "complexType": {
                "original": "string | number",
                "resolved": "number | string",
                "references": {}
            }
        }, {
            "method": "docWfStepperChange",
            "name": "wfStepperChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Stepper change event"
            },
            "complexType": {
                "original": "string | number",
                "resolved": "number | string",
                "references": {}
            }
        }]; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "options",
            "methodName": "handleOptionsChange"
        }, {
            "propName": "value",
            "methodName": "handleValueChange"
        }]; }
    static get listeners() { return [{
            "name": "keydown",
            "method": "handleKeyDown",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
__decorate([
    PrefixEvent()
], WfStepperInput.prototype, "stepperChange", void 0);
