var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import isEqual from 'lodash.isequal';
import clonedeep from 'lodash.clonedeep';
import { getAllNodes, generateUniqueId, showErrorMessage, prepareErrorTooltip, stopPropagation, } from '../../utils/utils';
import { handleKeyboardControl } from '../../utils/keyboard-control';
import { KeyValue } from '../../utils/types';
import { PrefixEvent } from '../../utils/custom-event-emitter';
export class WfSelect {
    constructor() {
        this.searchStr = '';
        /** Decides if label has inline position */
        this.inlineLabel = false;
        /** Select ID */
        this.selectId = generateUniqueId();
        /** Type of component user as select list trigger (TEMPORARY! Will be changed to 'type') */
        this.selectType = 'input';
        /** Variant of select trigger (SelectVariant or ButtonVariant, based on selectType)*/
        this.variant = 'primary';
        /** DEPRECATED! Size of select  */
        this.size = 'lg';
        /** Decides if select is in locked state */
        this.locked = false;
        /** Decides if select is disabled */
        this.disabled = false;
        /** Decides if filtering available */
        this.liveSearch = false;
        /** Decides if select has an error */
        this.error = false;
        /** Icon name */
        this.icon = 'wf-arrow-down';
        /** DEPRECATED! Search Icon Name */
        this.searchIcon = 'wf-arrow-down';
        /** Icon size */
        this.iconSize = 'xs';
        /** Decides if select field required */
        this.required = false;
        this.formResetListener = () => {
            if (this.initialOption) {
                this.selectedValue = this.initialOption.selectedName || this.initialOption.name;
                this.value = this.initialOption.value;
                this.change.emit(this.initialOption.value);
            }
        };
        this.handleSelectChange = (option) => {
            if (!this.locked && !option.disabled) {
                this.closeSelect();
                this.value = option.value;
                this.change.emit(option.value);
                this.selectedValue = option.selectedName || option.name;
            }
        };
    }
    /** To focus select element use setFocus method */
    async setFocus() {
        if (this.selectInput)
            this.selectInput.setFocus();
        if (this.selectButton)
            this.selectButton.setFocus();
    }
    watchHandler(newOptions) {
        this.updateSelectOptions(newOptions);
    }
    handleInput(ev) {
        this.searchStr = ev.detail;
    }
    //TODO : Merge selectedValue and value in one option
    handleDropdownChange() {
        const { selectInput, selectButton, dropdown, selectType, liveSearch } = this;
        if (selectType === 'button') {
            if (!dropdown || !selectButton)
                return;
            selectButton.innerHTML = this.getSelectedValueText();
            return;
        }
        this.searchStr = '';
        if (!dropdown || !selectInput)
            return;
        if (dropdown.opened && liveSearch) {
            selectInput.value = this.getSelectedOptionName();
            if (this.selectInput)
                this.selectInput.setFocus();
            return;
        }
        selectInput.value = this.getSelectedValue();
    }
    handleKeyDown(ev) {
        const { dropdown, host } = this;
        if (!dropdown.opened) {
            if (ev.key === KeyValue.ENTER_KEY) {
                ev.preventDefault();
                dropdown.opened = true;
            }
            return;
        }
        ev.cancelBubble = true;
        if (ev.key === KeyValue.ESC_KEY) {
            ev.preventDefault();
            dropdown.opened = false;
            return;
        }
        const optionClass = 'form-select-option';
        const focusClass = 'form-select-option-focused';
        const optionsList = host.shadowRoot.querySelector(`.form-select-list`);
        handleKeyboardControl(ev, optionClass, focusClass, optionsList);
    }
    handleValueChange(newValue, oldValue) {
        const { selectOptions } = this;
        if (newValue === undefined && oldValue !== undefined) {
            this.selectedValue = undefined;
            this.value = undefined;
            if (!!this.selectInput)
                this.selectInput.value = undefined;
            if (!!this.selectButton)
                this.selectButton.innerHTML = '';
            return;
        }
        if (selectOptions) {
            const index = selectOptions.findIndex((option) => isEqual(option.value, newValue));
            if (index === -1) {
                this.value = oldValue;
                throw new Error('Value is not valid');
            }
            else {
                selectOptions[index].selected = true;
                this.selectedValue = selectOptions[index].selectedName || selectOptions[index].name;
                this.handleDropdownChange();
            }
        }
    }
    componentWillLoad() {
        this.updateSelectOptions(this.options, true);
    }
    getSelectedValue() {
        const { prefixLabel, selectedValue, placeholder } = this;
        if (prefixLabel)
            return selectedValue
                ? `${prefixLabel}: ${selectedValue}`
                : placeholder
                    ? ''
                    : `${prefixLabel}: `;
        return selectedValue;
    }
    getSelectedValueText() {
        const { placeholder } = this;
        const value = this.getSelectedValue();
        const finalValue = value || placeholder;
        return finalValue || '';
    }
    getSelectedOptionName() {
        if (!this.selectOptions)
            return '';
        const selectedOption = this.selectOptions.find((opt) => {
            if (opt.hasOwnProperty('selectedName') && !!opt.selectedName)
                return opt.selectedName === this.selectedValue;
            return opt.name === this.selectedValue;
        });
        return selectedOption ? selectedOption.name : '';
    }
    componentDidLoad() {
        this.form = this.getHost().closest('form');
        if (this.form) {
            this.form.addEventListener('reset', this.formResetListener);
        }
        this.handleDropdownChange();
    }
    componentDidUnload() {
        if (this.form) {
            this.form.removeEventListener('reset', this.formResetListener);
        }
    }
    getHost() {
        return this.host;
    }
    parseOptionElement(node) {
        return {
            name: node.getAttribute('name') || '',
            value: node.getAttribute('value'),
            selectedName: node.getAttribute('selected-name') || null,
            disabled: node.getAttribute('disabled') !== null && node.getAttribute('disabled') !== 'false',
            selected: node.getAttribute('selected') !== null && node.getAttribute('selected') !== 'false',
        };
    }
    updateSelectOptions(options, initial = false) {
        const { host, parseOptionElement } = this;
        this.selectOptions = options
            ? clonedeep(options)
            : getAllNodes(host, 'wf-select-option, brml-select-option').map(parseOptionElement);
        if (this.value && initial) {
            this.handleValueChange(this.value);
            return;
        }
        this.initialOption = this.selectOptions.find((option) => option.selected);
        if (this.initialOption) {
            this.value = this.initialOption.value;
            if (!initial)
                this.change.emit(this.initialOption.value);
            this.selectedValue = this.initialOption.selectedName || this.initialOption.name;
        }
        else {
            this.selectedValue = undefined;
            this.value = undefined;
        }
    }
    closeSelect() {
        this.dropdown.opened = false;
    }
    renderOption(option, index) {
        const { selectedValue, locked, handleSelectChange, size } = this;
        const selectedByName = selectedValue === option.name ||
            (!!option.selectedName && selectedValue === option.selectedName);
        const optionClass = {
            ['form-select-option']: true,
            [`form-select-option-selected`]: selectedByName,
            [`form-select-option-${size}`]: true,
        };
        const optionProps = {
            'data-value': index,
            key: index,
            selected: !!option.selected,
            disabled: !!locked ? true : option.disabled,
        };
        return (h("li", Object.assign({ class: optionClass }, optionProps, { onClick: () => handleSelectChange(option) }), !this.customRow ? h("a", null,
            " ",
            option.name) : h("div", { innerHTML: this.customRow(option) })));
    }
    renderListOptions(options) {
        const { searchStr, disabled } = this;
        const optionListClass = {
            ['form-select-list']: true,
        };
        const filteredOption = options.filter((option) => option.name.toLowerCase().includes(searchStr.toLowerCase()));
        return (h("wf-dropdown", { ref: (el) => (this.dropdown = el), class: "form-control-select-dropdown", disabled: disabled, parentSelector: ".form-group" },
            h("ul", { tabindex: "-1", class: optionListClass },
                filteredOption.map((option, index) => this.renderOption(option, index)),
                h("slot", { name: "footer" }))));
    }
    renderLabel() {
        const { label, error, required, variant, type, selectId, inlineLabel, caption } = this;
        // Supporting deprecated type and caption
        const inputVariant = type || variant;
        const displayCaption = !!caption && !label;
        const currentLabel = displayCaption ? caption : label;
        const labelClasses = {
            [`form-label`]: true,
            [`form-label-inline`]: inlineLabel || displayCaption,
            [`form-label-${inputVariant}`]: inputVariant === 'inverse',
            [`form-label-error`]: !!error,
        };
        const asteriskClasses = {
            [`error`]: !!error,
            ['required']: !error && !!required,
        };
        return (h("label", { "data-dropdown-trigger": true, class: labelClasses, htmlFor: selectId },
            currentLabel,
            (!!error || !!required) && h("span", { class: asteriskClasses }, "*")));
    }
    renderButtonTrigger() {
        const { variant, disabled, selectId, placeholder, icon, iconSize, selectedValue } = this;
        const commomAttributes = {
            disabled,
            iconSize,
            id: `form-element-${selectId}`,
            'data-dropdown': `${!disabled}`,
        };
        const buttonAttributes = Object.assign(Object.assign({}, commomAttributes), { icon,
            variant, class: !!placeholder && !selectedValue ? 'with-placeholder' : '' });
        return (h("wf-button", Object.assign({}, buttonAttributes, { ref: (el) => (this.selectButton = el), iconPlacement: "right" }), placeholder));
    }
    renderInputTrigger() {
        const { type, variant, size, locked, disabled, error, selectId, placeholder, icon, iconSize, searchIcon, liveSearch, selectType, } = this;
        const commomAttributes = {
            disabled,
            iconSize,
            id: `form-element-${selectId}`,
            onChange: stopPropagation,
            onWfChange: stopPropagation,
            'data-dropdown': `${!disabled}`,
        };
        const selectClasses = {
            [`form-control-select`]: true,
        };
        let inputAttributes;
        if (selectType !== 'button') {
            const inputVariant = variant === 'primary' || variant === 'secondary' || variant === 'inverse'
                ? type || variant
                : 'primary';
            inputAttributes = Object.assign(Object.assign({}, commomAttributes), { size,
                locked,
                placeholder,
                error, variant: inputVariant, class: selectClasses, readonly: !liveSearch, icon: liveSearch ? searchIcon : icon });
        }
        return h("wf-input", Object.assign({}, inputAttributes, { ref: (el) => (this.selectInput = el) }));
    }
    render() {
        const { variant, label, caption, inlineLabel, error, errorMessage, selectOptions, description, selectType, } = this;
        const containerClasses = {
            [`form-group`]: true,
            [`inline-form-group`]: !!inlineLabel || (!!caption && !label),
            [`form-group-${variant}`]: variant === 'inverse',
            [`form-group-${selectType}`]: selectType === 'button',
        };
        return (h("wf-tooltip", Object.assign({}, prepareErrorTooltip(error, errorMessage)),
            h("div", { class: containerClasses },
                (!!label || !!caption) && this.renderLabel(),
                h("div", { class: "form-control-wrapper" },
                    selectType === 'button' ? this.renderButtonTrigger() : this.renderInputTrigger(),
                    selectOptions && this.renderListOptions(selectOptions)),
                !!description && h("div", { class: "form-control-description" }, description),
                showErrorMessage(error, errorMessage) && (h("div", { class: "form-control-error-message", innerHTML: errorMessage.text })))));
    }
    static get is() { return "wf-select"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/select/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/select/main.css"]
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
                "text": "Content of top label"
            },
            "attribute": "label",
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
                "text": "Placeholder describes the expected value"
            },
            "attribute": "placeholder",
            "reflect": false
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
                "text": "Prefix label content"
            },
            "attribute": "prefix-label",
            "reflect": false
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
                "text": "DEPRECATED! Content of left caption"
            },
            "attribute": "caption",
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
        "selectId": {
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
                "text": "Select ID"
            },
            "attribute": "select-id",
            "reflect": false,
            "defaultValue": "generateUniqueId()"
        },
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "SelectVariant",
                "resolved": "\"inverse\" | \"primary\" | \"secondary\"",
                "references": {
                    "SelectVariant": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "DEPRECATED! Type of select"
            },
            "attribute": "type",
            "reflect": false
        },
        "selectType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "SelectType",
                "resolved": "\"button\" | \"input\"",
                "references": {
                    "SelectType": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Type of component user as select list trigger (TEMPORARY! Will be changed to 'type')"
            },
            "attribute": "select-type",
            "reflect": false,
            "defaultValue": "'input'"
        },
        "variant": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "SelectVariant | ButtonVariant",
                "resolved": "\"danger\" | \"info\" | \"inverse\" | \"link\" | \"primary\" | \"secondary\" | \"success\" | \"tertiary\" | \"warning\"",
                "references": {
                    "SelectVariant": {
                        "location": "import",
                        "path": "./types"
                    },
                    "ButtonVariant": {
                        "location": "import",
                        "path": "../wf-button/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Variant of select trigger (SelectVariant or ButtonVariant, based on selectType)"
            },
            "attribute": "variant",
            "reflect": false,
            "defaultValue": "'primary'"
        },
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "SelectSize",
                "resolved": "\"lg\" | \"sm\"",
                "references": {
                    "SelectSize": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "DEPRECATED! Size of select"
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "'lg'"
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
                "text": "Decides if select is in locked state"
            },
            "attribute": "locked",
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
                "text": "Decides if select is disabled"
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "liveSearch": {
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
                "text": "Decides if filtering available"
            },
            "attribute": "live-search",
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
                "text": "Decides if select has an error"
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
                "text": "Icon name"
            },
            "attribute": "icon",
            "reflect": false,
            "defaultValue": "'wf-arrow-down'"
        },
        "searchIcon": {
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
                "text": "DEPRECATED! Search Icon Name"
            },
            "attribute": "search-icon",
            "reflect": false,
            "defaultValue": "'wf-arrow-down'"
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
            "defaultValue": "'xs'"
        },
        "customRow": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "(option: SelectOption<any>) => string",
                "resolved": "(option: SelectOption<any>) => string",
                "references": {
                    "SelectOption": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Custom row for option element"
            }
        },
        "options": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "SelectOption<any>[] | string",
                "resolved": "SelectOption<any>[] | string",
                "references": {
                    "SelectOption": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Select options. Type string is DEPRECATED!"
            },
            "attribute": "options",
            "reflect": false
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
                "text": "Decides if select field required"
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
                "text": "Property gives current value or sets new from options value."
            },
            "attribute": "value",
            "reflect": false
        }
    }; }
    static get states() { return {
        "selectOptions": {},
        "searchStr": {},
        "selectedValue": {}
    }; }
    static get events() { return [{
            "method": "docChange",
            "name": "change",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Change event"
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
                "text": "Change event"
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
                "text": "To focus select element use setFocus method",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "options",
            "methodName": "watchHandler"
        }, {
            "propName": "prefixLabel",
            "methodName": "handleDropdownChange"
        }, {
            "propName": "value",
            "methodName": "handleValueChange"
        }]; }
    static get listeners() { return [{
            "name": "input",
            "method": "handleInput",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "toggle",
            "method": "handleDropdownChange",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "handleKeyDown",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
__decorate([
    PrefixEvent()
], WfSelect.prototype, "change", void 0);
