var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import clonedeep from 'lodash.clonedeep';
import { DropdownTriggerType, KeyValue } from '../../utils/types';
import { handleKeyboardControl } from '../../utils/keyboard-control';
import { stopPropagation } from '../../utils/utils';
import { PrefixEvent } from '../../utils/custom-event-emitter';
export class WfMultiselectDropdown {
    constructor() {
        /** Prepared options array */
        this.multiselectDropdownOptions = [];
        /** List of selected options */
        this.selectedOptions = [];
        /** Search string input */
        this.searchStr = '';
        /** Multiselect dropdown options. Type string is DEPRECATED! */
        this.options = [];
        /** Variant of filter wf-input */
        this.variant = 'primary';
        /** DEPRECATED! Size of component trigger */
        this.size = 'lg';
        /** DEPRECATED! Size of action buttons */
        this.buttonSize = 'md';
        /** Size of items checkboxs */
        this.checkboxSize = 'lg';
        /** Decides if multiselect required */
        this.required = false;
        /** Sets filter component error state */
        this.error = false;
        /** Decides if multiselect dropdown is disabled */
        this.disabled = false;
        this.initialValue = '';
    }
    handleInput(e) {
        const { multiselectDropdownOptions, selectedOptions } = this;
        this.searchStr = e.detail;
        this.dropdown.opened = true;
        if (selectedOptions.length > 0 &&
            multiselectDropdownOptions.length === selectedOptions.length) {
            this.handleSelectAll(false);
        }
    }
    handleDropdownChange(e) {
        e.stopPropagation();
        if (e.detail) {
            this.host.shadowRoot
                .querySelector('.filter-selected-options')
                .shadowRoot.querySelector('input')
                .focus();
        }
        this.toggleInput(e.detail);
    }
    handleKeyDown(e) {
        const { dropdown, host } = this;
        if (!dropdown.opened)
            return;
        e.cancelBubble = true;
        if (e.key === KeyValue.ESC_KEY) {
            e.preventDefault();
            dropdown.opened = false;
            return;
        }
        const optionClass = 'multiselect-dropdown-option';
        const focusClass = 'multiselect-dropdown-option-focused';
        const optionsList = host.shadowRoot.querySelector(`.multiselect-dropdown-options-wrapper`);
        if (optionsList) {
            const focusedElToClick = optionsList.querySelector(`.multiselect-dropdown-option-focused .multiselect-dropdown-option-checkbox`);
            handleKeyboardControl(e, optionClass, focusClass, optionsList, focusedElToClick, Array.from(host.shadowRoot
                .querySelector('.multiselect-dropdown-footer')
                .querySelectorAll('wf-button')));
        }
    }
    handleValueChange(newValue, oldValue) {
        const validateValue = (value) => Array.isArray(value) && this.validateValues(value);
        if (!validateValue(newValue)) {
            this.value = validateValue(oldValue) ? oldValue : [];
            throw new Error('Value is not valid');
        }
    }
    validateValues(value) {
        let countUpdatedOptions = 0;
        const mappedOptions = this.multiselectDropdownOptions.map((option) => {
            const checked = value && value.includes(option.value);
            if (checked) {
                countUpdatedOptions++;
            }
            option.selected = checked;
            return option;
        });
        if (countUpdatedOptions !== value.length) {
            return false;
        }
        this.multiselectDropdownOptions = mappedOptions;
        this.selectedOptions = value;
        this.showSelectedOptions();
        return true;
    }
    toggleInput(opened) {
        if (opened) {
            this.selectedOptionsElement.value = this.searchStr;
        }
        else {
            this.selectedOptionsElement.value = this.initialValue;
        }
    }
    handleSave() {
        const { selectedOptions, field } = this;
        this.value = [...selectedOptions];
        this.change.emit({
            field,
            values: selectedOptions,
        });
        this.closeFilter(true);
        this.showSelectedOptions();
    }
    closeFilter(shouldSave = false) {
        this.dropdown.opened = false;
        if (shouldSave) {
            this.currentOptionsState = JSON.stringify(this.multiselectDropdownOptions);
        }
        else {
            this.multiselectDropdownOptions = JSON.parse(this.currentOptionsState);
            this.updateSelectedOptions();
        }
    }
    handleCheckboxChange(option, event) {
        const { selectedOptions } = this;
        const checked = !!event ? event.detail : !!!option.selected;
        if (!!event) {
            event.stopPropagation();
        }
        this.multiselectDropdownOptions = this.multiselectDropdownOptions.map((item) => item === option ? Object.assign(Object.assign({}, option), { selected: checked }) : item);
        if (checked) {
            selectedOptions.push(option.value);
        }
        else {
            selectedOptions.splice(selectedOptions.indexOf(option.value), 1);
        }
    }
    handleSelectAll(event) {
        const selected = event instanceof CustomEvent ? event.detail : event;
        this.multiselectDropdownOptions = this.multiselectDropdownOptions.map((option) => {
            option.selected = selected;
            return option;
        });
        this.updateSelectedOptions();
    }
    handleSelectAllClick(allSelected) {
        this.handleSelectAll(!allSelected);
    }
    handleCheckboxClick(option) {
        this.handleCheckboxChange(option);
    }
    updateSelectedOptions() {
        const { multiselectDropdownOptions } = this;
        this.selectedOptions = multiselectDropdownOptions
            .filter((option) => option.selected)
            .map((option) => option.value);
    }
    getDisplayValue(option) {
        const displayItem = this.multiselectDropdownOptions.find((originalOption) => originalOption.value === option);
        return !!displayItem.label ? displayItem.label : displayItem.value;
    }
    showSelectedOptions() {
        const { selectedOptionsElement, selectedOptions, multiselectDropdownOptions, optionsVisibilityLimit, } = this;
        if (!selectedOptions.length) {
            this.initialValue = selectedOptionsElement.value = '';
            return;
        }
        if (selectedOptions.length === multiselectDropdownOptions.length) {
            this.initialValue = selectedOptionsElement.value = 'All';
            return;
        }
        const limit = !!optionsVisibilityLimit
            ? typeof optionsVisibilityLimit === 'string'
                ? parseInt(optionsVisibilityLimit)
                : optionsVisibilityLimit
            : selectedOptions.length;
        const moreOptionsInfo = limit < selectedOptions.length ? ` & ${selectedOptions.length - limit} more...` : '';
        this.initialValue = selectedOptionsElement.value = `${selectedOptions
            .slice(0, limit)
            .map((option) => this.getDisplayValue(option))
            .join(', ')}${moreOptionsInfo}`;
    }
    getSortableValue(option) {
        return !!option.label
            ? option.label.toString().toLowerCase()
            : option.value.toString().toLowerCase();
    }
    sortOptions(options) {
        return options.sort((a, b) => {
            const x = this.getSortableValue(a);
            const y = this.getSortableValue(b);
            return x < y ? -1 : x > y ? 1 : 0;
        });
    }
    filterUniqueOptions(options) {
        return options.filter((option, index) => options.findIndex((a) => a.value === option.value) === index);
    }
    componentWillLoad() {
        this.handleSave = this.handleSave.bind(this);
        this.handleSelectAll = this.handleSelectAll.bind(this);
        const { options } = this;
        this.handleOptionsUpdate(typeof options === 'string' ? JSON.parse(options) : options);
    }
    handleOptionsUpdate(newValue, oldValue) {
        if (!Array.isArray(newValue) ||
            newValue.some((item) => typeof item !== 'object' || !item.hasOwnProperty('value'))) {
            throw new Error('Options is not valid');
        }
        this.multiselectDropdownOptions = this.sortOptions(this.filterUniqueOptions(clonedeep(newValue)));
        this.currentOptionsState = JSON.stringify(this.multiselectDropdownOptions);
        this.updateSelectedOptions();
        if (oldValue)
            this.showSelectedOptions();
    }
    componentDidLoad() {
        this.showSelectedOptions();
    }
    findSearchStrInValue(searchStr, value) {
        return searchStr.length > 0
            ? value
                .toString()
                .toLowerCase()
                .includes(searchStr.toString().toLowerCase())
            : true;
    }
    renderMultiselectDropdownOptions() {
        const { multiselectDropdownOptions, searchStr, checkboxSize } = this;
        const filteredOptions = multiselectDropdownOptions.filter((option) => this.findSearchStrInValue(searchStr, !!option.label ? option.label : option.value));
        const filteredSelectedOptions = filteredOptions.filter((option) => option.selected);
        const allSelected = filteredOptions.length === filteredSelectedOptions.length;
        const selectAllAttributes = {
            class: 'multiselect-dropdown-option-checkbox',
            label: 'Select All',
            checked: allSelected,
            size: checkboxSize,
            onChange: this.handleSelectAll,
            onWfChange: stopPropagation,
        };
        const optionAttributes = (option) => {
            const classes = {
                ['multiselect-dropdown-option-checkbox']: true,
                [`multiselect-dropdown-option-checkbox-selected`]: !!option.selected,
            };
            return {
                class: classes,
                size: checkboxSize,
                label: !!option.label ? option.label : option.value,
                checked: !!option.selected,
                onWfChange: stopPropagation,
            };
        };
        return (h("div", { class: "multiselect-dropdown-options-wrapper" }, filteredOptions.length === 0 ? (h("div", { class: "multiselect-dropdown-option-not-found" }, "Cannot be found")) : (h("div", { class: "multiselect-dropdown-options-list" },
            searchStr.length === 0 && (h("div", { class: "multiselect-dropdown-option multiselect-dropdown-select-all" },
                h("wf-checkbox", Object.assign({}, selectAllAttributes, { onClick: () => this.handleSelectAllClick(allSelected), onChange: stopPropagation })))),
            filteredOptions.map((option) => (h("div", { class: "multiselect-dropdown-option" },
                h("wf-checkbox", Object.assign({}, optionAttributes(option), { onClick: () => this.handleCheckboxClick(option), onChange: stopPropagation })))))))));
    }
    render() {
        const { label, variant, size, buttonSize, required, error, errorMessage, placeholder, disabled, } = this;
        const asteriskClasses = {
            [`error`]: !!error,
            ['required']: !error && !!required,
        };
        const inputAttributes = {
            size,
            variant,
            error,
            errorMessage,
            placeholder,
            disabled,
            onChange: stopPropagation,
            onWfChange: stopPropagation,
        };
        return (h("div", { class: "dropdown-multiselect-dropdown" },
            h("div", { class: "dropdown-trigger" },
                !!label ? (h("label", { "data-dropdown-trigger": true, class: "form-label" },
                    label,
                    !!error || (!!required && h("span", { class: asteriskClasses }, "*")))) : null,
                h("wf-input", Object.assign({ "data-dropdown": DropdownTriggerType.OPEN_ONLY_WITH_ICON, icon: "wf-arrow-down", class: "filter-selected-options" }, inputAttributes, { ref: (el) => (this.selectedOptionsElement = el) }))),
            h("wf-dropdown", { ref: (el) => (this.dropdown = el), "scroll-sensitive": "false", disabled: disabled, adjustHeight: true },
                h("div", { class: "multiselect-dropdown" },
                    this.renderMultiselectDropdownOptions(),
                    h("div", { class: "multiselect-dropdown-footer" },
                        h("wf-button", { onClick: () => {
                                this.closeFilter();
                            }, variant: "link", size: buttonSize }, "Cancel"),
                        h("wf-button", { onClick: this.handleSave, size: buttonSize }, "Apply"))))));
    }
    static get is() { return "wf-multiselect-dropdown"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/multiselect-dropdown/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/multiselect-dropdown/main.css"]
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
                "text": "Multiselect dropdown label"
            },
            "attribute": "label",
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
        "options": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "MultiselectDropdownOption[] | string",
                "resolved": "MultiselectDropdownOption[] | string",
                "references": {
                    "MultiselectDropdownOption": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Multiselect dropdown options. Type string is DEPRECATED!"
            },
            "attribute": "options",
            "reflect": false,
            "defaultValue": "[]"
        },
        "optionsVisibilityLimit": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "number | string",
                "resolved": "number | string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Limit of visible selected options"
            },
            "attribute": "options-visibility-limit",
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
                "text": "DEPRECATED! Size of component trigger"
            },
            "attribute": "size",
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
                "text": "DEPRECATED! Size of action buttons"
            },
            "attribute": "button-size",
            "reflect": false,
            "defaultValue": "'md'"
        },
        "checkboxSize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "CheckboxSize",
                "resolved": "\"lg\" | \"sm\"",
                "references": {
                    "CheckboxSize": {
                        "location": "import",
                        "path": "../wf-checkbox/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Size of items checkboxs"
            },
            "attribute": "checkbox-size",
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
                "text": "Decides if multiselect required"
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
                "text": "Component error state message"
            }
        },
        "value": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "string[]",
                "resolved": "string[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Property gives current value or sets new from options value."
            }
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
                "text": "Decides if multiselect dropdown is disabled"
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "multiselectDropdownOptions": {},
        "selectedOptions": {},
        "searchStr": {}
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
                "original": "MultiselectDropdownResult",
                "resolved": "MultiselectDropdownResult",
                "references": {
                    "MultiselectDropdownResult": {
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
                "text": "Change event"
            },
            "complexType": {
                "original": "MultiselectDropdownResult",
                "resolved": "MultiselectDropdownResult",
                "references": {
                    "MultiselectDropdownResult": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            }
        }]; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "value",
            "methodName": "handleValueChange"
        }, {
            "propName": "options",
            "methodName": "handleOptionsUpdate"
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
], WfMultiselectDropdown.prototype, "change", void 0);
