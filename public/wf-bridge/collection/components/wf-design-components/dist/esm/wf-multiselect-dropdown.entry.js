import { r as registerInstance, c as createEvent, h, g as getElement } from './core-2ee2b62e.js';
import './_commonjsHelpers-97e6d7b1.js';
import { e as clonedeep, s as stopPropagation } from './utils-9974937e.js';
import { a as KeyValue, D as DropdownTriggerType } from './types-bc604d28.js';
import { P as PrefixEvent } from './custom-event-emitter-d3f4fc52.js';
import { h as handleKeyboardControl } from './keyboard-control-29636223.js';

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const WfMultiselectDropdown = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this.docChange = createEvent(this, "change", 7);
        this.docWfChange = createEvent(this, "wfChange", 7);
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
        return (h("div", { class: "multiselect-dropdown-options-wrapper" }, filteredOptions.length === 0 ? (h("div", { class: "multiselect-dropdown-option-not-found" }, "Cannot be found")) : (h("div", { class: "multiselect-dropdown-options-list" }, searchStr.length === 0 && (h("div", { class: "multiselect-dropdown-option multiselect-dropdown-select-all" }, h("wf-checkbox", Object.assign({}, selectAllAttributes, { onClick: () => this.handleSelectAllClick(allSelected), onChange: stopPropagation })))), filteredOptions.map((option) => (h("div", { class: "multiselect-dropdown-option" }, h("wf-checkbox", Object.assign({}, optionAttributes(option), { onClick: () => this.handleCheckboxClick(option), onChange: stopPropagation })))))))));
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
        return (h("div", { class: "dropdown-multiselect-dropdown" }, h("div", { class: "dropdown-trigger" }, !!label ? (h("label", { "data-dropdown-trigger": true, class: "form-label" }, label, !!error || (!!required && h("span", { class: asteriskClasses }, "*")))) : null, h("wf-input", Object.assign({ "data-dropdown": DropdownTriggerType.OPEN_ONLY_WITH_ICON, icon: "wf-arrow-down", class: "filter-selected-options" }, inputAttributes, { ref: (el) => (this.selectedOptionsElement = el) }))), h("wf-dropdown", { ref: (el) => (this.dropdown = el), "scroll-sensitive": "false", disabled: disabled, adjustHeight: true }, h("div", { class: "multiselect-dropdown" }, this.renderMultiselectDropdownOptions(), h("div", { class: "multiselect-dropdown-footer" }, h("wf-button", { onClick: () => {
                this.closeFilter();
            }, variant: "link", size: buttonSize }, "Cancel"), h("wf-button", { onClick: this.handleSave, size: buttonSize }, "Apply"))))));
    }
    get host() { return getElement(this); }
    static get watchers() { return {
        "value": ["handleValueChange"],
        "options": ["handleOptionsUpdate"]
    }; }
    static get style() { return ".all-caps{font-family:var(--all-caps-font-family,var(--font-family));font-weight:var(--all-caps-font-weight,var(--font-weight-bold,var(--font-weight,normal)));font-size:var(--all-caps-font-size,13px);line-height:var(--all-caps-line-height,15px);text-transform:var(--all-caps-text-transform,uppercase);letter-spacing:var(--all-caps-letter-spacing,1px)}.label-1{font-family:var(--label-1-font-family,var(--label-font-family));font-size:var(--label-1-font-size,var(--label-font-size));line-height:var(--label-1-line-height,var(--label-line-height));color:var(--label-1-color,var(--label-color));letter-spacing:var(--label-1-spacing,var(--label-letter-spacing));font-weight:var(--label-1-font-weight,var(--label-font-weight));text-transform:var(--label-1-text-transform,var(--label-text-transform))}.label-2{font-family:var(--label-2-font-family,var(--label-font-family));font-size:var(--label-2-font-size,var(--label-font-size));line-height:var(--label-2-line-height,var(--label-line-height));color:var(--label-2-color,var(--label-color));letter-spacing:var(--label-2-spacing,var(--label-letter-spacing));font-weight:var(--label-2-font-weight,var(--label-font-weight));text-transform:var(--label-2-text-transform,var(--label-text-transform))}.label-3{font-family:var(--label-3-font-family,var(--label-font-family));font-size:var(--label-3-font-size,var(--label-font-size));line-height:var(--label-3-line-height,var(--label-line-height));color:var(--label-3-color,var(--label-color));letter-spacing:var(--label-3-spacing,var(--label-letter-spacing));font-weight:var(--label-3-font-weight,var(--label-font-weight));text-transform:var(--label-3-text-transform,var(--label-text-transform))}.label-4{font-family:var(--label-4-font-family,var(--label-font-family));font-size:var(--label-4-font-size,var(--label-font-size));line-height:var(--label-4-line-height,var(--label-line-height));color:var(--label-4-color,var(--label-color));letter-spacing:var(--label-4-spacing,var(--label-letter-spacing));font-weight:var(--label-4-font-weight,var(--label-font-weight));text-transform:var(--label-4-text-transform,var(--label-text-transform))}.label-5{font-family:var(--label-5-font-family,var(--label-font-family));font-size:var(--label-5-font-size,var(--label-font-size));line-height:var(--label-5-line-height,var(--label-line-height));color:var(--label-5-color,var(--label-color));letter-spacing:var(--label-5-spacing,var(--label-letter-spacing));font-weight:var(--label-5-font-weight,var(--label-font-weight));text-transform:var(--label-5-text-transform,var(--label-text-transform))}.label-secondary{color:var(--label-secondary-color,var(--color-text-secondary,var(--text-secondary-color,#444)))}.label-tertiary{color:var(--label-tertiary-color,var(--text-tertiary-color,#646464))}.label-inverse{color:var(--label-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}:host{display:inline-block;vertical-align:var(--form-control-vertical-align,bottom)}.form-label,:host .form-tooltip{display:block}.form-label{font-family:var(--form-control-label-font-family);font-size:var(--form-control-label-font-size,var(--font-size-small,.9em));color:var(--form-control-label-color,var(--color-text-secondary,var(--text-secondary-color,#444)));line-height:var(--form-control-label-line-height);margin-bottom:var(--form-control-label-margin-bottom,var(--spacing-xxs,6px))}.form-label-inline{display:inline-block;text-align:right;padding-right:var(--form-control-label-inline-padding-right,var(--spacing-s,24px));padding-left:0;margin:0;width:var(--form-control-caption-width,var(--form-control-label-inline-width,25%));-ms-flex:1;flex:1}.form-label-locked{pointer-events:none}.form-label-error{color:var(--form-control-label-color-error,var(--form-control-error-label-color))}.form-label-inverse{color:var(--form-control-inverse-label-color,hsla(0,0%,100%,.8))}.form-label .required{color:var(--form-control-required-asterisk-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31))))}.form-label .error{color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-control{display:block;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:var(--form-control-font-family);font-weight:var(--form-control-font-weight);font-size:var(--form-control-font-size);border-width:0;border-style:var(--form-control-border-style,solid);border-radius:var(--form-control-border-radius);height:var(--form-control-size-m,var(--form-control-height,var(--spacing-m,36px)));-webkit-box-shadow:var(--form-control-box-shadow);box-shadow:var(--form-control-box-shadow)}.form-control-primary{color:var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));border-color:var(--form-control-border-color,var(--smoke,#919191));border-width:var(--form-control-border-width,1px);background:var(--form-control-background,var(--white,#fff));padding-left:var(--form-control-padding,var(--spacing-xs,12px));padding-right:var(--form-control-padding,var(--spacing-xs,12px))}.form-control-primary .form-control-required{border-color:var(--form-control-border-color-required,var(--form-control-required-border-color,var(--form-control-border-color,var(--smoke,#919191))))}.form-control-secondary{color:var(--form-control-secondary-color,var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))));border-color:var(--form-control-secondary-border-color,var(--form-control-border-color,var(--smoke,#919191)));border-width:var(--form-control-secondary-border-width,var(--form-control-border-width,1px));background:var(--form-control-secondary-background,var(--form-control-background,var(--white,#fff)));padding-left:var(--form-control-secondary-padding,var(--form-control-padding,var(--spacing-xs,12px)));padding-right:var(--form-control-secondary-padding,var(--form-control-padding,var(--spacing-xs,12px)))}.form-control-secondary .form-control-required{border-color:var(--form-control-secondary-required-border-color,var(--form-control-secondary-border-color,var(--form-control-border-color,var(--smoke,#919191))))}.form-control-inverse{color:var(--form-control-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));border-color:var(--form-control-inverse-border-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));border-width:var(--form-control-inverse-border-width,var(--form-control-border-width,1px));background:var(--form-control-inverse-background,transparent);padding-left:var(--form-control-inverse-padding,var(--form-control-padding,var(--spacing-xs,12px)));padding-right:var(--form-control-inverse-padding,var(--form-control-padding,var(--spacing-xs,12px)))}.form-control-inverse .form-control-required{border-color:var(--form-control-inverse-required-border-color,var(--form-control-inverse-border-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff)))))}.form-control-sm{height:var(--form-control-size-sm,var(--form-control-sm-height,var(--form-control-size-m,var(--form-control-height,var(--spacing-m,36px)))))}.form-control-icon-xs{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-xs, 16px))}.form-control-icon-xs+.form-control-icon-wrapper-xs,.form-control-icon-xs .form-control-arrow-xs{top:calc(50% - (var(--icon-size-xs, 16px) / 2) - var(--icon-padding-xs, 4px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-xs, 4px))}.form-control .input-arrow-xs{--icon-padding-xs:0}.form-control .input-arrow-xs.up{top:1px}.form-control .input-arrow-xs.down{top:50%}.form-control-icon-locked-xs{position:absolute;top:calc(50% - (var(--icon-size-xs, 16px) / 2) - var(--icon-padding-xs, 4px));left:0}.form-control-icon-locked-xs~input{text-indent:var(--icon-size-xs,16px)}.form-control-icon-sm{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-sm, 24px))}.form-control-icon-sm+.form-control-icon-wrapper-sm,.form-control-icon-sm .form-control-arrow-sm{top:calc(50% - (var(--icon-size-sm, 24px) / 2) - var(--icon-padding-sm, 6px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-sm, 6px))}.form-control .input-arrow-sm{--icon-padding-sm:0}.form-control .input-arrow-sm.up{top:1px}.form-control .input-arrow-sm.down{top:50%}.form-control-icon-locked-sm{position:absolute;top:calc(50% - (var(--icon-size-sm, 24px) / 2) - var(--icon-padding-sm, 6px));left:0}.form-control-icon-locked-sm~input{text-indent:var(--icon-size-sm,24px)}.form-control-icon-md{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-md, 36px))}.form-control-icon-md+.form-control-icon-wrapper-md,.form-control-icon-md .form-control-arrow-md{top:calc(50% - (var(--icon-size-md, 36px) / 2) - var(--icon-padding-md, 18px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-md, 18px))}.form-control .input-arrow-md{--icon-padding-md:0}.form-control .input-arrow-md.up{top:1px}.form-control .input-arrow-md.down{top:50%}.form-control-icon-locked-md{position:absolute;top:calc(50% - (var(--icon-size-md, 36px) / 2) - var(--icon-padding-md, 18px));left:0}.form-control-icon-locked-md~input{text-indent:var(--icon-size-md,36px)}.form-control-icon-lg{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-lg, 72px))}.form-control-icon-lg+.form-control-icon-wrapper-lg,.form-control-icon-lg .form-control-arrow-lg{top:calc(50% - (var(--icon-size-lg, 72px) / 2) - var(--icon-padding-lg, 12px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-lg, 12px))}.form-control .input-arrow-lg{--icon-padding-lg:0}.form-control .input-arrow-lg.up{top:1px}.form-control .input-arrow-lg.down{top:50%}.form-control-icon-locked-lg{position:absolute;top:calc(50% - (var(--icon-size-lg, 72px) / 2) - var(--icon-padding-lg, 12px));left:0}.form-control-icon-locked-lg~input{text-indent:var(--icon-size-lg,72px)}.form-control-icon-xl{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-xl, 96px))}.form-control-icon-xl+.form-control-icon-wrapper-xl,.form-control-icon-xl .form-control-arrow-xl{top:calc(50% - (var(--icon-size-xl, 96px) / 2) - var(--icon-padding-xl, 12px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-xl, 12px))}.form-control .input-arrow-xl{--icon-padding-xl:0}.form-control .input-arrow-xl.up{top:1px}.form-control .input-arrow-xl.down{top:50%}.form-control-icon-locked-xl{position:absolute;top:calc(50% - (var(--icon-size-xl, 96px) / 2) - var(--icon-padding-xl, 12px));left:0}.form-control-icon-locked-xl~input{text-indent:var(--icon-size-xl,96px)}.form-control-icon-locked-primary{left:var(--form-control-locked-icon-position-left)}.form-control-icon-locked-secondary{left:var(--form-control-secondary-locked-icon-position-left)}.form-control-icon-locked-inverse{left:var(--form-control-inverse-locked-icon-position-left)}.form-control-disabled,.form-control[disabled]{color:var(--form-control-font-color-disabled,var(--form-control-disabled-color,var(--text-disabled-color,#bebebe)));background:var(--form-control-background-disabled,var(--alto,#d7d7d7));border-color:var(--form-control-border-color-disabled,var(--form-control-disabled-border-color,var(--text-disabled-color,#bebebe)))}.form-control-disabled.form-control-inverse,.form-control[disabled].form-control-inverse{background:var(--form-control-inverse-background,transparent)}.form-control-disabled:focus,.form-control[disabled]:focus{outline:0}.form-control-locked{color:var(--form-control-font-color-locked,var(--form-control-locked-color,var(--form-control-font-color-disabled,var(--form-control-disabled-color,var(--text-disabled-color,#bebebe)))));background:var(--form-control-locked-background,var(--form-control-background-disabled,var(--alto,#d7d7d7)));border-color:var(--form-control-border-color-locked,var(--form-control-locked-border-color,var(--form-control-border-color-disabled,var(--form-control-disabled-border-color,var(--text-disabled-color,#bebebe)))));cursor:default}.form-control-locked.form-control-inverse{background:var(--form-control-inverse-background,transparent)}.form-control-error{border-color:var(--form-control-border-color-error,var(--form-control-error-border-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-control-error.form-control-inverse{border-color:var(--form-control-inverse-error-border-color)}.form-control::-webkit-input-placeholder{color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464))}.form-control::-webkit-input-placeholder,.form-control::placeholder{color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464))}.form-control.form-control-inverse::-webkit-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::-moz-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse:-ms-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::-ms-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control:active,.form-control:focus{outline:0}.form-control:active:not([disabled]):not(.form-control-disabled),.form-control:focus:not([disabled]):not(.form-control-disabled){border-color:var(--form-control-border-color-focus,var(--form-control-focus-border-color,var(--lagoon,#009ad2)))}.form-control:hover:not([disabled]):not(.form-control-disabled){border-color:var(--form-control-border-color-hover,var(--form-control-hover-border-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))))}.form-control:hover:not([disabled]):not(.form-control-disabled).form-control-inverse{border-color:var(--form-control-inverse-hover-border-color)}.form-control-error-message{font-family:var(--form-control-error-font-family);font-size:var(--form-control-error-font-size,.8em);font-style:var(--form-control-error-message-font-style,var(--form-control-error-font-style,italic));white-space:pre-line;color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))));margin-top:var(--form-control-error-message-margin-top,var(--form-control-error-margin-top,var(--spacing-xxs,6px)))}.form-control-description{font-family:var(--form-control-description-font-family);font-size:var(--form-control-description-font-size,.8em);font-style:var(--form-control-description-font-style);color:var(--form-control-description-color,var(--text-tertiary-color,#646464));white-space:pre-line;margin-top:var(--form-control-description-margin-top,var(--spacing-xxs,6px))}.form-control-icon-wrapper{position:absolute;cursor:pointer}.form-control-textarea{resize:none}.form-control-text-align-left,.form-control-text-align-left input{text-align:left}.form-control-text-align-center,.form-control-text-align-center input{text-align:center}.form-control-text-align-right,.form-control-text-align-right input{text-align:right}.form-control-wrapper{position:relative;min-width:var(--form-control-min-width,250px);max-width:var(--form-control-max-width,100%);width:100%}.form-control-wrapper .prefix{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;position:absolute;height:100%;width:auto;top:0;left:0;bottom:0;padding-left:var(--form-control-prefix-padding,var(--spacing-xxs,6px));padding-right:var(--form-control-prefix-padding,var(--spacing-xxs,6px));font-weight:var(--form-control-prefix-font-weight,var(--form-control-font-weight));font-size:var(--form-control-prefix-font-size,var(--form-control-font-size));color:var(--form-control-prefix-color,var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))))}.form-group{margin:var(--form-control-margin-top,0) var(--form-control-margin-right,0) var(--form-control-margin-bottom,0) var(--form-control-margin-left,0)}.form-group-inverse .form-control-icon-wrapper{--icon-color:var(--form-control-inverse-icon-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-group-inverse .form-control-icon-locked-inverse{--icon-color:var(--form-control-inverse-locked-icon-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-group-inverse .form-control-error-message{color:var(--form-control-inverse-error-color)}.form-group-inverse .form-control-description{color:var(--form-control-inverse-description-color)}.inline-form-group{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex-wrap:wrap;flex-wrap:wrap}.inline-form-group .form-control-error-message{width:100%;padding-left:var(--form-control-label-inline-padding-right,var(--spacing-s,24px));margin-left:var(--form-control-caption-width,var(--form-control-label-inline-width,25%))}.form-check{margin:var(--form-check-margin-top,0) var(--form-check-margin-right,0) var(--form-check-margin-bottom,var(--spacing-xs,12px)) var(--form-check-margin-left,0);font-family:var(--form-check-font-family);font-weight:var(--font-weight-normal,var(--font-weight,normal));font-size:var(--form-control-font-size)}.form-check:last-of-type{margin-bottom:0}.form-check input[type=checkbox],.form-check input[type=radio]{display:none}.form-check input[type=checkbox]+button,.form-check input[type=checkbox]+label,.form-check input[type=radio]+button,.form-check input[type=radio]+label{position:relative;display:inline-block;text-align:inherit}.form-check input[type=checkbox]+button.position-static,.form-check input[type=checkbox]+label.position-static,.form-check input[type=radio]+button.position-static,.form-check input[type=radio]+label.position-static{display:inline}.form-check input[type=checkbox]+button :after,.form-check input[type=checkbox]+label :after,.form-check input[type=radio]+button :after,.form-check input[type=radio]+label :after{content:none}.form-check input[type=checkbox]+button:after,.form-check input[type=checkbox]+button:before,.form-check input[type=checkbox]+label:after,.form-check input[type=checkbox]+label:before,.form-check input[type=radio]+button:after,.form-check input[type=radio]+button:before,.form-check input[type=radio]+label:after,.form-check input[type=radio]+label:before{content:\"\";position:absolute;display:inline-block}.form-check input[type=checkbox]+button:focus,.form-check input[type=checkbox]+label:focus,.form-check input[type=radio]+button:focus,.form-check input[type=radio]+label:focus{outline:none}.form-check input[type=checkbox]+button:focus:before,.form-check input[type=checkbox]+label:focus:before,.form-check input[type=radio]+button:focus:before,.form-check input[type=radio]+label:focus:before{border-color:var(--form-control-border-color-focus,var(--form-control-focus-border-color,var(--lagoon,#009ad2)))}.form-check.error input[type=checkbox]+label{color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-check.error input[type=checkbox]+label:before{border-color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-check.warning input[type=checkbox]+label{color:var(--color-text-warning,var(--text-warning-color,var(--warning,#7e5f16)))}.form-check.warning input[type=checkbox]+label:before{border-color:var(--color-text-warning,var(--text-warning-color,var(--warning,#7e5f16)))}.dropdown-multiselect-dropdown{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:var(--mulselect-dropdown-font-family)}.dropdown-multiselect-dropdown .filter-selected-options{display:block;--input-text-overflow:ellipsis;--text-primary-color:var(--color-text-secondary,var(--text-secondary-color,#444))}.dropdown-multiselect-dropdown .multiselect-dropdown{-webkit-box-shadow:var(--multiselect-dropdown-box-shadow,2px 4px 8px 0 rgba(27,27,26,.5));box-shadow:var(--multiselect-dropdown-box-shadow,2px 4px 8px 0 rgba(27,27,26,.5));background:var(--multiselect-dropdown-background,var(--color-background-default,#fff));padding:var(--multiselect-dropdown-padding,var(--spacing-xxs,6px));display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:var(--multiselect-dropdown-width,100%);height:var(--multiselect-dropdown-height,350px);-webkit-box-sizing:border-box;box-sizing:border-box;--button-margin-left:var(--spacing-xxs,6px)}.dropdown-multiselect-dropdown .multiselect-dropdown-options-wrapper{overflow-y:auto;-ms-flex:1 1;flex:1 1}.dropdown-multiselect-dropdown .multiselect-dropdown-option-checkbox,.dropdown-multiselect-dropdown .multiselect-dropdown-select-all-checkbox{-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;padding:var(--multiselect-dropdown-item-padding,var(--spacing-xs,12px) var(--spacing-xxs,6px));border:var(--multiselect-dropdown-item-border-width,1px) solid var(--multiselect-dropdown-item-border-color,transparent)}.dropdown-multiselect-dropdown .multiselect-dropdown-option-checkbox:hover,.dropdown-multiselect-dropdown .multiselect-dropdown-select-all-checkbox:hover{cursor:pointer;color:var(--multiselect-dropdown-item-hovered-color,var(--item-hovered-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))));background:var(--multiselect-dropdown-item-hovered-background,var(--item-hovered-background,var(--mercury,#e6e6e6)))}.dropdown-multiselect-dropdown .multiselect-dropdown-option-checkbox-selected,.dropdown-multiselect-dropdown .multiselect-dropdown-select-all-checkbox-selected{color:var(--multiselect-dropdown-item-selected-color,var(--item-selected-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))));background:var(--multiselect-dropdown-item-selected-background,var(--item-selected-background,var(--ice,#d3eaf3)))}.dropdown-multiselect-dropdown .multiselect-dropdown-option-focused .multiselect-dropdown-option-checkbox,.dropdown-multiselect-dropdown .multiselect-dropdown-select-all-focused .multiselect-dropdown-option-checkbox{color:var(--multiselect-dropdown-item-focused-color,var(--item-focused-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))));border-color:var(--multiselect-dropdown-item-focused-border-color,var(--item-focused-border-color,var(--lagoon,#009ad2)))}.dropdown-multiselect-dropdown .multiselect-dropdown-footer{-ms-flex-negative:1 0;flex-shrink:1 0;-ms-flex-item-align:end;align-self:flex-end;justify-self:flex-end;padding-top:var(--spacing-xs,12px)}.dropdown-multiselect-dropdown .multiselect-dropdown-footer .multiselect-dropdown-option-focused{outline:var(--multiselect-dropdown-item-focused-border-color,var(--item-focused-border-color,var(--lagoon,#009ad2))) auto 1px}.dropdown-multiselect-dropdown .multiselect-dropdown-option-not-found{text-align:center;padding:var(--multiselect-dropdown-item-padding,var(--spacing-xs,12px) var(--spacing-xxs,6px));color:var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)));font-weight:var(--font-weight-normal,var(--font-weight,normal));font-size:var(--form-control-font-size)}.dropdown-multiselect-dropdown .multiselect-dropdown-select-all{--checkbox-mark-color:var(--multiselect-dropdown-select-all-checkbox-mark-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));--checkbox-mark-background-color:var(--multiselect-dropdown-select-all-checkbox-mark-background-color,var(--black,#000));--checkbox-border-color:var(--multiselect-dropdown-select-all-checkbox-border-color,var(--black,#000))}"; }
};
__decorate([
    PrefixEvent()
], WfMultiselectDropdown.prototype, "change", void 0);

export { WfMultiselectDropdown as wf_multiselect_dropdown };
