var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import { getAllNodes, generateUniqueId, showErrorMessage, prepareErrorTooltip, } from '../../utils/utils';
import { KeyValue } from '../../utils/types';
import isEqual from 'lodash.isequal';
import { PrefixEvent } from '../../utils/custom-event-emitter';
export class WfRadio {
    constructor() {
        /** Decides if radio group is disabled */
        this.disabled = false;
        /** Decides if radio group align horizontally */
        this.inline = false;
        /** Decides if radio group has an error */
        this.error = false;
        /** Size of radio  */
        this.size = 'lg';
        // Correct version of options declaration waiting for Stencil build fix with Generic type
        // @Prop() options: RadioOption<T>[];
        /** Decides if radio field required */
        this.required = false;
        this.getSelectedOptionIndex = () => {
            const index = this.radioOptions.findIndex((option) => isEqual(this.value, option.value));
            return index !== -1 ? index : 0;
        };
        this.formResetListener = () => {
            if (this.initialValue) {
                this.value = this.initialValue;
                this.change.emit(this.value);
            }
        };
        this.getHost = () => {
            return this.host;
        };
        this.handleClick = async (option) => {
            if (this.disabled || option.disabled)
                return;
            this.value = option.value;
            this.change.emit(this.value);
        };
        this.handleOnFocus = async () => {
            this.wfFocus.emit();
        };
        this.handleOnBlur = async () => {
            this.wfBlur.emit();
        };
    }
    /** To focus radio button element use setFocus method */
    async setFocus() {
        const optionBtns = this.getHost().shadowRoot.querySelectorAll('button');
        const optionBtnsArr = Array.from(optionBtns);
        const selectedOption = optionBtnsArr.find((option) => option.classList.contains('checked'));
        selectedOption ? selectedOption.focus() : optionBtnsArr[0].focus();
    }
    watchHandler(newOptions) {
        this.updateRadioOptions(newOptions);
    }
    valueWatcher(newValue, oldValue) {
        if (newValue === undefined)
            return;
        const optionByValue = this.radioOptions.find((option) => isEqual(newValue, option.value));
        if (optionByValue)
            return;
        console.error('No radio option for provided value');
        this.value = oldValue;
    }
    handleKeyDown(e) {
        if (e.key === KeyValue.ARROW_DOWN || e.key === KeyValue.ARROW_RIGHT) {
            e.preventDefault();
            if (this.disabled || this.allOptionsDisabled())
                return;
            const index = this.getNextIndex();
            this.setChangedOption(index);
        }
        else if (e.key === KeyValue.ARROW_UP || e.key === KeyValue.ARROW_LEFT) {
            e.preventDefault();
            if (this.disabled || this.allOptionsDisabled())
                return;
            const index = this.getPreviousIndex();
            this.setChangedOption(index);
        }
    }
    allOptionsDisabled() {
        return this.radioOptions.every((option) => option.disabled);
    }
    getNextIndex() {
        const { getSelectedOptionIndex, radioOptions } = this;
        let index = getSelectedOptionIndex() + 1;
        if (index === radioOptions.length)
            index = 0;
        while (radioOptions[index].disabled) {
            index + 1 === radioOptions.length ? (index = 0) : index++;
        }
        return index;
    }
    getPreviousIndex() {
        const { getSelectedOptionIndex, radioOptions } = this;
        let index = getSelectedOptionIndex() - 1;
        if (index < 0)
            index = radioOptions.length - 1;
        while (radioOptions[index].disabled) {
            index - 1 < 0 ? (index = radioOptions.length - 1) : index--;
        }
        return index;
    }
    setChangedOption(index) {
        this.value = this.radioOptions[index].value;
        this.change.emit(this.value);
    }
    componentWillLoad() {
        const { name, options } = this;
        this.radioName = name || generateUniqueId();
        this.initialValue = this.value;
        this.updateRadioOptions(options);
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
    componentDidUpdate() {
        this.setFocus();
    }
    parseOptionElement(node) {
        return Object.assign({ label: node.getAttribute('label'), value: node.getAttribute('value'), disabled: node.getAttribute('disabled') !== null && node.getAttribute('disabled') !== 'false', checked: node.getAttribute('checked') !== null && node.getAttribute('checked') !== 'false' }, (node.getAttribute('option-id') !== null && { optionId: node.getAttribute('option-id') }));
    }
    updateRadioOptions(options) {
        const { host, parseOptionElement } = this;
        this.radioOptions = options
            ? options
            : getAllNodes(host, 'wf-radio-option, brml-radio-option').map(parseOptionElement);
        const initiallyCheckedOption = this.radioOptions.find((option) => option.checked);
        if (initiallyCheckedOption) {
            this.initialValue = this.value = initiallyCheckedOption.value;
            delete initiallyCheckedOption.checked;
        }
    }
    renderOption(option, index) {
        const { radioName, disabled, error, handleClick, inline, handleOnFocus, handleOnBlur, size, } = this;
        const labelClass = {
            'position-static': !option.label,
            ['checked']: isEqual(this.value, option.value),
        };
        const checkClasses = {
            'form-check': true,
            ['form-check-error']: !!error,
            [`form-check-inline`]: !!inline,
            [`form-check-${size}`]: true,
        };
        if (!option.optionId) {
            option.optionId = generateUniqueId();
        }
        const optionProps = {
            type: 'radio',
            name: radioName,
            id: option.optionId,
            checked: isEqual(this.value, option.value),
            disabled: disabled || !!option.disabled,
            value: '',
        };
        const buttonProps = {
            'data-index': index,
            type: 'button',
            class: labelClass,
            onClick: () => {
                handleClick(option);
            },
            tabindex: !optionProps.checked ? '-1' : '0',
            onfocus: handleOnFocus,
            onblur: handleOnBlur,
        };
        return (h("div", { class: checkClasses },
            h("input", Object.assign({}, optionProps)),
            h("button", Object.assign({}, buttonProps), option.label)));
    }
    render() {
        const { label, error, errorMessage, radioOptions, required } = this;
        const asteriskClasses = {
            [`error`]: !!error,
            ['required']: !error && !!required,
        };
        return (h("wf-tooltip", Object.assign({}, prepareErrorTooltip(error, errorMessage)),
            h("div", { class: "form-group" },
                !!label && (h("label", { class: "form-label" },
                    label,
                    (!!error || !!required) && h("span", { class: asteriskClasses }, "*"))),
                radioOptions && radioOptions.map((option, index) => this.renderOption(option, index)),
                showErrorMessage(error, errorMessage) && (h("div", { class: "form-control-error-message", innerHTML: errorMessage.text })))));
    }
    static get is() { return "wf-radio"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/radio/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/radio/main.css"]
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
                "text": "Radio buttons group name"
            },
            "attribute": "name",
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
                "text": "Decides if radio group is disabled"
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "inline": {
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
                "text": "Decides if radio group align horizontally"
            },
            "attribute": "inline",
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
                "text": "Decides if radio group has an error"
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
                "original": "RadioSize",
                "resolved": "\"lg\" | \"sm\"",
                "references": {
                    "RadioSize": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Size of radio"
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "'lg'"
        },
        "options": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "RadioOption<any>[]",
                "resolved": "RadioOption<any>[]",
                "references": {
                    "RadioOption": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Radio options"
            }
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
                "text": "Decides if radio field required"
            },
            "attribute": "required",
            "reflect": false,
            "defaultValue": "false"
        },
        "value": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Currently selected value"
            },
            "attribute": "value",
            "reflect": false
        }
    }; }
    static get states() { return {
        "radioOptions": {},
        "radioName": {}
    }; }
    static get events() { return [{
            "method": "wfFocus",
            "name": "wfFocus",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Radio button focus event"
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
                "text": "Radio button blur event"
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
                "original": "any",
                "resolved": "any",
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
                "original": "any",
                "resolved": "any",
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
                "original": "any",
                "resolved": "any",
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
                "text": "To focus radio button element use setFocus method",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "options",
            "methodName": "watchHandler"
        }, {
            "propName": "value",
            "methodName": "valueWatcher"
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
], WfRadio.prototype, "change", void 0);
