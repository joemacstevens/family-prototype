var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import { stopPropagation } from '../../utils/utils';
import { DropdownTriggerType, KeyCodes } from '../../utils/types';
import { AmountFilterType } from './types';
import { PrefixEvent } from '../../utils/custom-event-emitter';
export class WfAmountFilter {
    constructor() {
        this.defaultMask = {
            mask: Number,
            lazy: false,
            thousandsSeparator: ',',
            radix: '.',
            scale: 3,
        };
        /** Variant of filter wf-input */
        this.variant = 'primary';
        /** Size of component trigger */
        this.size = 'lg';
        /** DEPRECATED! Size of filter input field */
        this.inputSize = 'lg';
        /** Size of action buttons */
        this.buttonSize = 'md';
        /** Error message for empty input value (inner input)*/
        this.errorMessage = {
            text: 'Please enter a valid amount',
        };
        /** Current selected tab */
        this.selectedTab = 'equals';
        /** Decides if amount filter required */
        this.required = false;
        /** Sets filter component error state */
        this.error = false;
        /** Type of internal input */
        this.inputType = 'masked';
        /** Mask options */
        this.maskOptions = this.defaultMask;
        /** Value type returned from masked type input */
        this.maskValue = 'typedValue';
        /** Decides if amount filter is disabled */
        this.disabled = false;
        this.filterListItems = {
            [AmountFilterType.EQUAL]: 'Equal to',
            [AmountFilterType.LESS]: 'Less than',
            [AmountFilterType.GREATER]: 'Greater than',
        };
    }
    componentWillLoad() {
        this.handleApplyButtonClick = this.handleApplyButtonClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.closeFilter = this.closeFilter.bind(this);
        this.cancelFilter = this.cancelFilter.bind(this);
        this.internalSelectedTab = this.selectedTab;
    }
    handleInputValueChange(newValue) {
        const { maskOptions, innerInput } = this;
        this.internalValue = newValue;
        if (!!maskOptions && !!innerInput) {
            this.internalVisibleValue = innerInput.shadowRoot.querySelector('.form-control ').nodeValue;
        }
    }
    handleSelectedTabChange(newSelectedTab) {
        this.internalSelectedTab = newSelectedTab;
    }
    handleOnItemClick(tabName) {
        this.internalSelectedTab = tabName;
    }
    handleApplyButtonClick() {
        const { field, internalSelectedTab, internalValue, maskOptions, innerInput } = this;
        this.validateInput();
        if (!!this.inputError)
            return;
        this.change.emit({
            field,
            value: internalValue,
            filterType: internalSelectedTab,
        });
        this.selectedTab = internalSelectedTab;
        this.value = internalValue;
        if (!!maskOptions) {
            this.internalVisibleValue = innerInput.value;
        }
        this.closeFilter();
    }
    get triggerValue() {
        const { selectedTab, value, filterListItems, internalVisibleValue } = this;
        if (!value && value !== 0) {
            return;
        }
        const inputValue = !!internalVisibleValue ? internalVisibleValue : value;
        return `${filterListItems[selectedTab]} ${inputValue}`;
    }
    handleInputChange(event) {
        event.stopPropagation();
        this.internalValue = event.detail;
        this.validateInput();
    }
    handleKeyPress(event) {
        if (event.keyCode === KeyCodes.ENTER_KEY) {
            this.handleApplyButtonClick();
        }
    }
    validateInput() {
        if (!!this.internalValue || this.internalValue === 0) {
            this.inputError = false;
        }
        else {
            this.inputError = true;
        }
    }
    cancelFilter() {
        this.internalValue = this.value;
        this.innerInput.value = !!this.internalValue ? this.internalValue.toString() : '';
        this.internalSelectedTab = this.selectedTab;
        this.closeFilter();
    }
    closeFilter() {
        this.dropdown.opened = false;
        this.inputError = false;
    }
    renderListItems() {
        const { filterListItems, internalSelectedTab } = this;
        return Object.keys(filterListItems).map((item) => (h("li", { class: `date-picker-list-item ${internalSelectedTab === item ? 'active' : ''}`, onClick: () => {
                this.handleOnItemClick(item);
            } }, filterListItems[item])));
    }
    render() {
        const { label, variant, size, inputSize, value, innerLabel, inputError, errorMessage, triggerValue, buttonSize, required, error, inputType, maskOptions, maskValue, prefixLabel, textAlign, mainErrorMessage, placeholder, disabled, } = this;
        const asteriskClasses = {
            [`error`]: !!error,
            ['required']: !error && !!required,
        };
        const inputAttributes = {
            readonly: true,
            class: 'amount-filter-trigger-input',
            'data-dropdown': DropdownTriggerType.TOGGLE,
            icon: 'wf-arrow-down',
            variant,
            error,
            size,
            placeholder,
            value: triggerValue,
            errorMessage: mainErrorMessage,
            disabled,
        };
        const innerInputAttributes = Object.assign(Object.assign(Object.assign(Object.assign({ class: 'amount-filter-value', variant, type: inputType, label: innerLabel, size: inputSize, error: !!inputError, errorMessage,
            maskOptions }, (!!maskOptions && inputType === 'masked' && { maskValue })), (!!prefixLabel && { prefixLabel })), (!!textAlign && { textAlign })), { onInput: this.handleInputChange, onKeyDown: this.handleKeyPress, value: !!value || value === 0 ? value.toString() : '', onChange: stopPropagation, onWfChange: stopPropagation });
        return (h("div", { class: "amount-filter" },
            h("div", { class: "dropdown-trigger" },
                !!label ? (h("label", { "data-dropdown-trigger": true, class: "form-label" },
                    label,
                    (!!error || !!required) && h("span", { class: asteriskClasses }, "*"))) : null,
                h("wf-input", Object.assign({ ref: (el) => (this.triggerInput = el) }, inputAttributes))),
            h("wf-dropdown", { ref: (el) => (this.dropdown = el), alignWithParent: false, disabled: disabled },
                h("div", { class: "date-picker-content" },
                    h("ul", { class: "date-picker-list" }, this.renderListItems()),
                    h("div", { class: "date-picker-calendar-control" },
                        h("div", { class: "date-picker-range" },
                            h("wf-input", Object.assign({ ref: (el) => (this.innerInput = el) }, innerInputAttributes))),
                        h("div", { class: "date-picker-footer" },
                            h("wf-button", { variant: "link", onClick: this.cancelFilter, size: buttonSize }, "Cancel"),
                            h("wf-button", { onClick: this.handleApplyButtonClick, size: buttonSize }, "Apply")))))));
    }
    static get is() { return "wf-amount-filter"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/amount-filter/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/amount-filter/main.css"]
    }; }
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
                "text": "Filter label"
            },
            "attribute": "label",
            "reflect": false
        },
        "innerLabel": {
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
                "text": "Inner value input label"
            },
            "attribute": "inner-label",
            "reflect": false
        },
        "field": {
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
                "text": "Filtered column key name. Used as ID of filtered column"
            },
            "attribute": "field",
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
                        "path": "../wf-input/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Variant of filter wf-input"
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
                        "path": "../wf-input/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Size of component trigger"
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "'lg'"
        },
        "inputSize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "InputSize",
                "resolved": "\"lg\" | \"sm\"",
                "references": {
                    "InputSize": {
                        "location": "import",
                        "path": "../wf-input/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "DEPRECATED! Size of filter input field"
            },
            "attribute": "input-size",
            "reflect": false,
            "defaultValue": "'lg'"
        },
        "buttonSize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ButtonSize",
                "resolved": "\"lg\" | \"md\" | \"sm\"",
                "references": {
                    "ButtonSize": {
                        "location": "import",
                        "path": "../wf-button/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Size of action buttons"
            },
            "attribute": "button-size",
            "reflect": false,
            "defaultValue": "'md'"
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
                "text": "Error message for empty input value (inner input)"
            },
            "defaultValue": "{\n    text: 'Please enter a valid amount',\n  }"
        },
        "value": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "number | string",
                "resolved": "number | string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Inner input current value"
            },
            "attribute": "value",
            "reflect": false
        },
        "selectedTab": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "AmountFilterRange",
                "resolved": "\"equals\" | \"greaterThan\" | \"lessThan\"",
                "references": {
                    "AmountFilterRange": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Current selected tab"
            },
            "attribute": "selected-tab",
            "reflect": false,
            "defaultValue": "'equals'"
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
                "text": "Decides if amount filter required"
            },
            "attribute": "required",
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
                "text": "Sets filter component error state"
            },
            "attribute": "error",
            "reflect": false,
            "defaultValue": "false"
        },
        "mainErrorMessage": {
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
                "text": "Component error state message"
            }
        },
        "inputType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "InputType",
                "resolved": "\"color\" | \"email\" | \"masked\" | \"number\" | \"password\" | \"search\" | \"tel\" | \"text\" | \"time\" | \"url\"",
                "references": {
                    "InputType": {
                        "location": "import",
                        "path": "../wf-input/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Type of internal input"
            },
            "attribute": "input-type",
            "reflect": false,
            "defaultValue": "'masked'"
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
                        "path": "../wf-input/types"
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
            "reflect": false,
            "defaultValue": "this.defaultMask"
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
                        "path": "../wf-input/types"
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
            "defaultValue": "'typedValue'"
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
                "text": "Internal input prefix"
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
                        "path": "../wf-input/types"
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
                "text": "Decides if amount filter is disabled"
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "inputError": {},
        "internalSelectedTab": {},
        "internalValue": {},
        "internalVisibleValue": {}
    }; }
    static get events() { return [{
            "method": "docChange",
            "name": "change",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Amount filter change event"
            },
            "complexType": {
                "original": "AmountFilterOutput",
                "resolved": "AmountFilterOutput",
                "references": {
                    "AmountFilterOutput": {
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
                "text": "Amount filter change event"
            },
            "complexType": {
                "original": "AmountFilterOutput",
                "resolved": "AmountFilterOutput",
                "references": {
                    "AmountFilterOutput": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            }
        }]; }
    static get watchers() { return [{
            "propName": "value",
            "methodName": "handleInputValueChange"
        }, {
            "propName": "selectedTab",
            "methodName": "handleSelectedTabChange"
        }]; }
}
__decorate([
    PrefixEvent()
], WfAmountFilter.prototype, "change", void 0);
