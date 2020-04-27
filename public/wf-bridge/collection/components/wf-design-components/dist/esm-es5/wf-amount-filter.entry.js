import { r as registerInstance, c as createEvent, h } from './core-2ee2b62e.js';
import './_commonjsHelpers-97e6d7b1.js';
import { s as stopPropagation } from './utils-9974937e.js';
import { K as KeyCodes, D as DropdownTriggerType } from './types-bc604d28.js';
import { P as PrefixEvent } from './custom-event-emitter-d3f4fc52.js';
var AmountFilterType;
(function (AmountFilterType) {
    AmountFilterType["EQUAL"] = "equals";
    AmountFilterType["GREATER"] = "greaterThan";
    AmountFilterType["LESS"] = "lessThan";
})(AmountFilterType || (AmountFilterType = {}));
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
var WfAmountFilter = /** @class */ (function () {
    function WfAmountFilter(hostRef) {
        var _a;
        registerInstance(this, hostRef);
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
        this.filterListItems = (_a = {},
            _a[AmountFilterType.EQUAL] = 'Equal to',
            _a[AmountFilterType.LESS] = 'Less than',
            _a[AmountFilterType.GREATER] = 'Greater than',
            _a);
        this.docChange = createEvent(this, "change", 7);
        this.docWfChange = createEvent(this, "wfChange", 7);
    }
    WfAmountFilter.prototype.componentWillLoad = function () {
        this.handleApplyButtonClick = this.handleApplyButtonClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.closeFilter = this.closeFilter.bind(this);
        this.cancelFilter = this.cancelFilter.bind(this);
        this.internalSelectedTab = this.selectedTab;
    };
    WfAmountFilter.prototype.handleInputValueChange = function (newValue) {
        var _a = this, maskOptions = _a.maskOptions, innerInput = _a.innerInput;
        this.internalValue = newValue;
        if (!!maskOptions && !!innerInput) {
            this.internalVisibleValue = innerInput.shadowRoot.querySelector('.form-control ').nodeValue;
        }
    };
    WfAmountFilter.prototype.handleSelectedTabChange = function (newSelectedTab) {
        this.internalSelectedTab = newSelectedTab;
    };
    WfAmountFilter.prototype.handleOnItemClick = function (tabName) {
        this.internalSelectedTab = tabName;
    };
    WfAmountFilter.prototype.handleApplyButtonClick = function () {
        var _a = this, field = _a.field, internalSelectedTab = _a.internalSelectedTab, internalValue = _a.internalValue, maskOptions = _a.maskOptions, innerInput = _a.innerInput;
        this.validateInput();
        if (!!this.inputError)
            return;
        this.change.emit({
            field: field,
            value: internalValue,
            filterType: internalSelectedTab,
        });
        this.selectedTab = internalSelectedTab;
        this.value = internalValue;
        if (!!maskOptions) {
            this.internalVisibleValue = innerInput.value;
        }
        this.closeFilter();
    };
    Object.defineProperty(WfAmountFilter.prototype, "triggerValue", {
        get: function () {
            var _a = this, selectedTab = _a.selectedTab, value = _a.value, filterListItems = _a.filterListItems, internalVisibleValue = _a.internalVisibleValue;
            if (!value && value !== 0) {
                return;
            }
            var inputValue = !!internalVisibleValue ? internalVisibleValue : value;
            return filterListItems[selectedTab] + " " + inputValue;
        },
        enumerable: true,
        configurable: true
    });
    WfAmountFilter.prototype.handleInputChange = function (event) {
        event.stopPropagation();
        this.internalValue = event.detail;
        this.validateInput();
    };
    WfAmountFilter.prototype.handleKeyPress = function (event) {
        if (event.keyCode === KeyCodes.ENTER_KEY) {
            this.handleApplyButtonClick();
        }
    };
    WfAmountFilter.prototype.validateInput = function () {
        if (!!this.internalValue || this.internalValue === 0) {
            this.inputError = false;
        }
        else {
            this.inputError = true;
        }
    };
    WfAmountFilter.prototype.cancelFilter = function () {
        this.internalValue = this.value;
        this.innerInput.value = !!this.internalValue ? this.internalValue.toString() : '';
        this.internalSelectedTab = this.selectedTab;
        this.closeFilter();
    };
    WfAmountFilter.prototype.closeFilter = function () {
        this.dropdown.opened = false;
        this.inputError = false;
    };
    WfAmountFilter.prototype.renderListItems = function () {
        var _this = this;
        var _a = this, filterListItems = _a.filterListItems, internalSelectedTab = _a.internalSelectedTab;
        return Object.keys(filterListItems).map(function (item) { return (h("li", { class: "date-picker-list-item " + (internalSelectedTab === item ? 'active' : ''), onClick: function () {
                _this.handleOnItemClick(item);
            } }, filterListItems[item])); });
    };
    WfAmountFilter.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this, label = _b.label, variant = _b.variant, size = _b.size, inputSize = _b.inputSize, value = _b.value, innerLabel = _b.innerLabel, inputError = _b.inputError, errorMessage = _b.errorMessage, triggerValue = _b.triggerValue, buttonSize = _b.buttonSize, required = _b.required, error = _b.error, inputType = _b.inputType, maskOptions = _b.maskOptions, maskValue = _b.maskValue, prefixLabel = _b.prefixLabel, textAlign = _b.textAlign, mainErrorMessage = _b.mainErrorMessage, placeholder = _b.placeholder, disabled = _b.disabled;
        var asteriskClasses = (_a = {},
            _a["error"] = !!error,
            _a['required'] = !error && !!required,
            _a);
        var inputAttributes = {
            readonly: true,
            class: 'amount-filter-trigger-input',
            'data-dropdown': DropdownTriggerType.TOGGLE,
            icon: 'wf-arrow-down',
            variant: variant,
            error: error,
            size: size,
            placeholder: placeholder,
            value: triggerValue,
            errorMessage: mainErrorMessage,
            disabled: disabled,
        };
        var innerInputAttributes = Object.assign(Object.assign(Object.assign(Object.assign({ class: 'amount-filter-value', variant: variant, type: inputType, label: innerLabel, size: inputSize, error: !!inputError, errorMessage: errorMessage,
            maskOptions: maskOptions }, (!!maskOptions && inputType === 'masked' && { maskValue: maskValue })), (!!prefixLabel && { prefixLabel: prefixLabel })), (!!textAlign && { textAlign: textAlign })), { onInput: this.handleInputChange, onKeyDown: this.handleKeyPress, value: !!value || value === 0 ? value.toString() : '', onChange: stopPropagation, onWfChange: stopPropagation });
        return (h("div", { class: "amount-filter" }, h("div", { class: "dropdown-trigger" }, !!label ? (h("label", { "data-dropdown-trigger": true, class: "form-label" }, label, (!!error || !!required) && h("span", { class: asteriskClasses }, "*"))) : null, h("wf-input", Object.assign({ ref: function (el) { return (_this.triggerInput = el); } }, inputAttributes))), h("wf-dropdown", { ref: function (el) { return (_this.dropdown = el); }, alignWithParent: false, disabled: disabled }, h("div", { class: "date-picker-content" }, h("ul", { class: "date-picker-list" }, this.renderListItems()), h("div", { class: "date-picker-calendar-control" }, h("div", { class: "date-picker-range" }, h("wf-input", Object.assign({ ref: function (el) { return (_this.innerInput = el); } }, innerInputAttributes))), h("div", { class: "date-picker-footer" }, h("wf-button", { variant: "link", onClick: this.cancelFilter, size: buttonSize }, "Cancel"), h("wf-button", { onClick: this.handleApplyButtonClick, size: buttonSize }, "Apply")))))));
    };
    Object.defineProperty(WfAmountFilter, "watchers", {
        get: function () {
            return {
                "value": ["handleInputValueChange"],
                "selectedTab": ["handleSelectedTabChange"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WfAmountFilter, "style", {
        get: function () { return ".all-caps{font-family:var(--all-caps-font-family,var(--font-family));font-weight:var(--all-caps-font-weight,var(--font-weight-bold,var(--font-weight,normal)));font-size:var(--all-caps-font-size,13px);line-height:var(--all-caps-line-height,15px);text-transform:var(--all-caps-text-transform,uppercase);letter-spacing:var(--all-caps-letter-spacing,1px)}.label-1{font-family:var(--label-1-font-family,var(--label-font-family));font-size:var(--label-1-font-size,var(--label-font-size));line-height:var(--label-1-line-height,var(--label-line-height));color:var(--label-1-color,var(--label-color));letter-spacing:var(--label-1-spacing,var(--label-letter-spacing));font-weight:var(--label-1-font-weight,var(--label-font-weight));text-transform:var(--label-1-text-transform,var(--label-text-transform))}.label-2{font-family:var(--label-2-font-family,var(--label-font-family));font-size:var(--label-2-font-size,var(--label-font-size));line-height:var(--label-2-line-height,var(--label-line-height));color:var(--label-2-color,var(--label-color));letter-spacing:var(--label-2-spacing,var(--label-letter-spacing));font-weight:var(--label-2-font-weight,var(--label-font-weight));text-transform:var(--label-2-text-transform,var(--label-text-transform))}.label-3{font-family:var(--label-3-font-family,var(--label-font-family));font-size:var(--label-3-font-size,var(--label-font-size));line-height:var(--label-3-line-height,var(--label-line-height));color:var(--label-3-color,var(--label-color));letter-spacing:var(--label-3-spacing,var(--label-letter-spacing));font-weight:var(--label-3-font-weight,var(--label-font-weight));text-transform:var(--label-3-text-transform,var(--label-text-transform))}.label-4{font-family:var(--label-4-font-family,var(--label-font-family));font-size:var(--label-4-font-size,var(--label-font-size));line-height:var(--label-4-line-height,var(--label-line-height));color:var(--label-4-color,var(--label-color));letter-spacing:var(--label-4-spacing,var(--label-letter-spacing));font-weight:var(--label-4-font-weight,var(--label-font-weight));text-transform:var(--label-4-text-transform,var(--label-text-transform))}.label-5{font-family:var(--label-5-font-family,var(--label-font-family));font-size:var(--label-5-font-size,var(--label-font-size));line-height:var(--label-5-line-height,var(--label-line-height));color:var(--label-5-color,var(--label-color));letter-spacing:var(--label-5-spacing,var(--label-letter-spacing));font-weight:var(--label-5-font-weight,var(--label-font-weight));text-transform:var(--label-5-text-transform,var(--label-text-transform))}.label-secondary{color:var(--label-secondary-color,var(--color-text-secondary,var(--text-secondary-color,#444)))}.label-tertiary{color:var(--label-tertiary-color,var(--text-tertiary-color,#646464))}.label-inverse{color:var(--label-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}:host{display:inline-block;vertical-align:var(--form-control-vertical-align,bottom)}.form-label,:host .form-tooltip{display:block}.form-label{font-family:var(--form-control-label-font-family);font-size:var(--form-control-label-font-size,var(--font-size-small,.9em));color:var(--form-control-label-color,var(--color-text-secondary,var(--text-secondary-color,#444)));line-height:var(--form-control-label-line-height);margin-bottom:var(--form-control-label-margin-bottom,var(--spacing-xxs,6px))}.form-label-inline{display:inline-block;text-align:right;padding-right:var(--form-control-label-inline-padding-right,var(--spacing-s,24px));padding-left:0;margin:0;width:var(--form-control-caption-width,var(--form-control-label-inline-width,25%));-ms-flex:1;flex:1}.form-label-locked{pointer-events:none}.form-label-error{color:var(--form-control-label-color-error,var(--form-control-error-label-color))}.form-label-inverse{color:var(--form-control-inverse-label-color,hsla(0,0%,100%,.8))}.form-label .required{color:var(--form-control-required-asterisk-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31))))}.form-label .error{color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-control{display:block;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:var(--form-control-font-family);font-weight:var(--form-control-font-weight);font-size:var(--form-control-font-size);border-width:0;border-style:var(--form-control-border-style,solid);border-radius:var(--form-control-border-radius);height:var(--form-control-size-m,var(--form-control-height,var(--spacing-m,36px)));-webkit-box-shadow:var(--form-control-box-shadow);box-shadow:var(--form-control-box-shadow)}.form-control-primary{color:var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));border-color:var(--form-control-border-color,var(--smoke,#919191));border-width:var(--form-control-border-width,1px);background:var(--form-control-background,var(--white,#fff));padding-left:var(--form-control-padding,var(--spacing-xs,12px));padding-right:var(--form-control-padding,var(--spacing-xs,12px))}.form-control-primary .form-control-required{border-color:var(--form-control-border-color-required,var(--form-control-required-border-color,var(--form-control-border-color,var(--smoke,#919191))))}.form-control-secondary{color:var(--form-control-secondary-color,var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))));border-color:var(--form-control-secondary-border-color,var(--form-control-border-color,var(--smoke,#919191)));border-width:var(--form-control-secondary-border-width,var(--form-control-border-width,1px));background:var(--form-control-secondary-background,var(--form-control-background,var(--white,#fff)));padding-left:var(--form-control-secondary-padding,var(--form-control-padding,var(--spacing-xs,12px)));padding-right:var(--form-control-secondary-padding,var(--form-control-padding,var(--spacing-xs,12px)))}.form-control-secondary .form-control-required{border-color:var(--form-control-secondary-required-border-color,var(--form-control-secondary-border-color,var(--form-control-border-color,var(--smoke,#919191))))}.form-control-inverse{color:var(--form-control-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));border-color:var(--form-control-inverse-border-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));border-width:var(--form-control-inverse-border-width,var(--form-control-border-width,1px));background:var(--form-control-inverse-background,transparent);padding-left:var(--form-control-inverse-padding,var(--form-control-padding,var(--spacing-xs,12px)));padding-right:var(--form-control-inverse-padding,var(--form-control-padding,var(--spacing-xs,12px)))}.form-control-inverse .form-control-required{border-color:var(--form-control-inverse-required-border-color,var(--form-control-inverse-border-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff)))))}.form-control-sm{height:var(--form-control-size-sm,var(--form-control-sm-height,var(--form-control-size-m,var(--form-control-height,var(--spacing-m,36px)))))}.form-control-icon-xs{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-xs, 16px))}.form-control-icon-xs+.form-control-icon-wrapper-xs,.form-control-icon-xs .form-control-arrow-xs{top:calc(50% - (var(--icon-size-xs, 16px) / 2) - var(--icon-padding-xs, 4px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-xs, 4px))}.form-control .input-arrow-xs{--icon-padding-xs:0}.form-control .input-arrow-xs.up{top:1px}.form-control .input-arrow-xs.down{top:50%}.form-control-icon-locked-xs{position:absolute;top:calc(50% - (var(--icon-size-xs, 16px) / 2) - var(--icon-padding-xs, 4px));left:0}.form-control-icon-locked-xs~input{text-indent:var(--icon-size-xs,16px)}.form-control-icon-sm{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-sm, 24px))}.form-control-icon-sm+.form-control-icon-wrapper-sm,.form-control-icon-sm .form-control-arrow-sm{top:calc(50% - (var(--icon-size-sm, 24px) / 2) - var(--icon-padding-sm, 6px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-sm, 6px))}.form-control .input-arrow-sm{--icon-padding-sm:0}.form-control .input-arrow-sm.up{top:1px}.form-control .input-arrow-sm.down{top:50%}.form-control-icon-locked-sm{position:absolute;top:calc(50% - (var(--icon-size-sm, 24px) / 2) - var(--icon-padding-sm, 6px));left:0}.form-control-icon-locked-sm~input{text-indent:var(--icon-size-sm,24px)}.form-control-icon-md{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-md, 36px))}.form-control-icon-md+.form-control-icon-wrapper-md,.form-control-icon-md .form-control-arrow-md{top:calc(50% - (var(--icon-size-md, 36px) / 2) - var(--icon-padding-md, 18px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-md, 18px))}.form-control .input-arrow-md{--icon-padding-md:0}.form-control .input-arrow-md.up{top:1px}.form-control .input-arrow-md.down{top:50%}.form-control-icon-locked-md{position:absolute;top:calc(50% - (var(--icon-size-md, 36px) / 2) - var(--icon-padding-md, 18px));left:0}.form-control-icon-locked-md~input{text-indent:var(--icon-size-md,36px)}.form-control-icon-lg{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-lg, 72px))}.form-control-icon-lg+.form-control-icon-wrapper-lg,.form-control-icon-lg .form-control-arrow-lg{top:calc(50% - (var(--icon-size-lg, 72px) / 2) - var(--icon-padding-lg, 12px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-lg, 12px))}.form-control .input-arrow-lg{--icon-padding-lg:0}.form-control .input-arrow-lg.up{top:1px}.form-control .input-arrow-lg.down{top:50%}.form-control-icon-locked-lg{position:absolute;top:calc(50% - (var(--icon-size-lg, 72px) / 2) - var(--icon-padding-lg, 12px));left:0}.form-control-icon-locked-lg~input{text-indent:var(--icon-size-lg,72px)}.form-control-icon-xl{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-xl, 96px))}.form-control-icon-xl+.form-control-icon-wrapper-xl,.form-control-icon-xl .form-control-arrow-xl{top:calc(50% - (var(--icon-size-xl, 96px) / 2) - var(--icon-padding-xl, 12px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-xl, 12px))}.form-control .input-arrow-xl{--icon-padding-xl:0}.form-control .input-arrow-xl.up{top:1px}.form-control .input-arrow-xl.down{top:50%}.form-control-icon-locked-xl{position:absolute;top:calc(50% - (var(--icon-size-xl, 96px) / 2) - var(--icon-padding-xl, 12px));left:0}.form-control-icon-locked-xl~input{text-indent:var(--icon-size-xl,96px)}.form-control-icon-locked-primary{left:var(--form-control-locked-icon-position-left)}.form-control-icon-locked-secondary{left:var(--form-control-secondary-locked-icon-position-left)}.form-control-icon-locked-inverse{left:var(--form-control-inverse-locked-icon-position-left)}.form-control-disabled,.form-control[disabled]{color:var(--form-control-font-color-disabled,var(--form-control-disabled-color,var(--text-disabled-color,#bebebe)));background:var(--form-control-background-disabled,var(--alto,#d7d7d7));border-color:var(--form-control-border-color-disabled,var(--form-control-disabled-border-color,var(--text-disabled-color,#bebebe)))}.form-control-disabled.form-control-inverse,.form-control[disabled].form-control-inverse{background:var(--form-control-inverse-background,transparent)}.form-control-disabled:focus,.form-control[disabled]:focus{outline:0}.form-control-locked{color:var(--form-control-font-color-locked,var(--form-control-locked-color,var(--form-control-font-color-disabled,var(--form-control-disabled-color,var(--text-disabled-color,#bebebe)))));background:var(--form-control-locked-background,var(--form-control-background-disabled,var(--alto,#d7d7d7)));border-color:var(--form-control-border-color-locked,var(--form-control-locked-border-color,var(--form-control-border-color-disabled,var(--form-control-disabled-border-color,var(--text-disabled-color,#bebebe)))));cursor:default}.form-control-locked.form-control-inverse{background:var(--form-control-inverse-background,transparent)}.form-control-error{border-color:var(--form-control-border-color-error,var(--form-control-error-border-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-control-error.form-control-inverse{border-color:var(--form-control-inverse-error-border-color)}.form-control::-webkit-input-placeholder{color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464))}.form-control::-webkit-input-placeholder,.form-control::placeholder{color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464))}.form-control.form-control-inverse::-webkit-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::-moz-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse:-ms-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::-ms-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control:active,.form-control:focus{outline:0}.form-control:active:not([disabled]):not(.form-control-disabled),.form-control:focus:not([disabled]):not(.form-control-disabled){border-color:var(--form-control-border-color-focus,var(--form-control-focus-border-color,var(--lagoon,#009ad2)))}.form-control:hover:not([disabled]):not(.form-control-disabled){border-color:var(--form-control-border-color-hover,var(--form-control-hover-border-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))))}.form-control:hover:not([disabled]):not(.form-control-disabled).form-control-inverse{border-color:var(--form-control-inverse-hover-border-color)}.form-control-error-message{font-family:var(--form-control-error-font-family);font-size:var(--form-control-error-font-size,.8em);font-style:var(--form-control-error-message-font-style,var(--form-control-error-font-style,italic));white-space:pre-line;color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))));margin-top:var(--form-control-error-message-margin-top,var(--form-control-error-margin-top,var(--spacing-xxs,6px)))}.form-control-description{font-family:var(--form-control-description-font-family);font-size:var(--form-control-description-font-size,.8em);font-style:var(--form-control-description-font-style);color:var(--form-control-description-color,var(--text-tertiary-color,#646464));white-space:pre-line;margin-top:var(--form-control-description-margin-top,var(--spacing-xxs,6px))}.form-control-icon-wrapper{position:absolute;cursor:pointer}.form-control-textarea{resize:none}.form-control-text-align-left,.form-control-text-align-left input{text-align:left}.form-control-text-align-center,.form-control-text-align-center input{text-align:center}.form-control-text-align-right,.form-control-text-align-right input{text-align:right}.form-control-wrapper{position:relative;min-width:var(--form-control-min-width,250px);max-width:var(--form-control-max-width,100%);width:100%}.form-control-wrapper .prefix{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;position:absolute;height:100%;width:auto;top:0;left:0;bottom:0;padding-left:var(--form-control-prefix-padding,var(--spacing-xxs,6px));padding-right:var(--form-control-prefix-padding,var(--spacing-xxs,6px));font-weight:var(--form-control-prefix-font-weight,var(--form-control-font-weight));font-size:var(--form-control-prefix-font-size,var(--form-control-font-size));color:var(--form-control-prefix-color,var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))))}.form-group{margin:var(--form-control-margin-top,0) var(--form-control-margin-right,0) var(--form-control-margin-bottom,0) var(--form-control-margin-left,0)}.form-group-inverse .form-control-icon-wrapper{--icon-color:var(--form-control-inverse-icon-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-group-inverse .form-control-icon-locked-inverse{--icon-color:var(--form-control-inverse-locked-icon-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-group-inverse .form-control-error-message{color:var(--form-control-inverse-error-color)}.form-group-inverse .form-control-description{color:var(--form-control-inverse-description-color)}.inline-form-group{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex-wrap:wrap;flex-wrap:wrap}.inline-form-group .form-control-error-message{width:100%;padding-left:var(--form-control-label-inline-padding-right,var(--spacing-s,24px));margin-left:var(--form-control-caption-width,var(--form-control-label-inline-width,25%))}.form-check{margin:var(--form-check-margin-top,0) var(--form-check-margin-right,0) var(--form-check-margin-bottom,var(--spacing-xs,12px)) var(--form-check-margin-left,0);font-family:var(--form-check-font-family);font-weight:var(--font-weight-normal,var(--font-weight,normal));font-size:var(--form-control-font-size)}.form-check:last-of-type{margin-bottom:0}.form-check input[type=checkbox],.form-check input[type=radio]{display:none}.form-check input[type=checkbox]+button,.form-check input[type=checkbox]+label,.form-check input[type=radio]+button,.form-check input[type=radio]+label{position:relative;display:inline-block;text-align:inherit}.form-check input[type=checkbox]+button.position-static,.form-check input[type=checkbox]+label.position-static,.form-check input[type=radio]+button.position-static,.form-check input[type=radio]+label.position-static{display:inline}.form-check input[type=checkbox]+button :after,.form-check input[type=checkbox]+label :after,.form-check input[type=radio]+button :after,.form-check input[type=radio]+label :after{content:none}.form-check input[type=checkbox]+button:after,.form-check input[type=checkbox]+button:before,.form-check input[type=checkbox]+label:after,.form-check input[type=checkbox]+label:before,.form-check input[type=radio]+button:after,.form-check input[type=radio]+button:before,.form-check input[type=radio]+label:after,.form-check input[type=radio]+label:before{content:\"\";position:absolute;display:inline-block}.form-check input[type=checkbox]+button:focus,.form-check input[type=checkbox]+label:focus,.form-check input[type=radio]+button:focus,.form-check input[type=radio]+label:focus{outline:none}.form-check input[type=checkbox]+button:focus:before,.form-check input[type=checkbox]+label:focus:before,.form-check input[type=radio]+button:focus:before,.form-check input[type=radio]+label:focus:before{border-color:var(--form-control-border-color-focus,var(--form-control-focus-border-color,var(--lagoon,#009ad2)))}.form-check.error input[type=checkbox]+label{color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-check.error input[type=checkbox]+label:before{border-color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-check.warning input[type=checkbox]+label{color:var(--color-text-warning,var(--text-warning-color,var(--warning,#7e5f16)))}.form-check.warning input[type=checkbox]+label:before{border-color:var(--color-text-warning,var(--text-warning-color,var(--warning,#7e5f16)))}.date-picker{position:relative}.date-picker-form{background:var(--date-picker-form-background-color,#a1a1a1);padding:var(--spacing-xs,12px);width:300px}.date-picker-content{background:var(--date-picker-content-background-color,#fff);-webkit-box-shadow:var(--date-picker-content-box-shadow,2px 4px 8px 0 rgba(27,27,26,.5));box-shadow:var(--date-picker-content-box-shadow,2px 4px 8px 0 rgba(27,27,26,.5));display:-ms-flexbox;display:flex;-ms-flex-align:stretch;align-items:stretch;min-height:var(--date-picker-content-height,200px);border:var(--date-picker-content-border,0 solid var(--smoke,#919191));margin:var(--date-picker-content-margins,0)}.date-picker-calendar-control{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;background:var(--date-picker-calendar-control-background-color,#ededed);padding:var(--date-picker-calendar-control-padding,var(--spacing-m,36px))}.date-picker-list{list-style:none;padding:var(--date-picker-list-padding,var(--spacing-m,36px) 0);margin:0;min-width:var(--date-picker-list-width,300px)}.date-picker-list-item{cursor:pointer;text-transform:uppercase;font-weight:var(--date-picker-list-font-weight,500);margin:0;padding:var(--spacing-xs,12px) var(--spacing-m,36px)}.date-picker-list-item>span{line-height:var(--spacing-s,24px);padding:0 var(--spacing-xs,12px)}.date-picker-list-item.active,.date-picker-list-item:hover{background:var(--date-picker-calendar-control-background-color,#ededed)}.date-picker-range{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.date-picker-range label{padding-top:var(--spacing-xxs,6px);line-height:var(--spacing-m,36px)}.date-picker-footer{text-align:right}.date-picker input.form-control{margin-bottom:0}.amount-filter{font-family:var(--amount-filter-font-family);position:relative;--date-picker-content-height:var(--amount-filter-content-height,240px);--date-picker-list-width:var(--amount-filter-list-width,200px);--date-picker-list-padding:var(--amount-filter-list-padding,var(--spacing-s,24px) 0);--date-picker-calendar-control-background-color:var(--amount-filter-content-background,var(--mercury,#e6e6e6));--date-picker-content-background-color:var(--amount-filter-list-background,var(--white,#fff));--date-picker-content-box-shadow:var(--amount-filter-box-shadow,2px 4px 8px 0 rgba(27,27,26,0.5));--date-picker-content-border:var(--amount-filter-dropdown-border,1px solid var(--smoke,#919191));--date-picker-content-margins:var(--amount-filter-dropdown-margins,-1px 0 0 0);--dropdown-width:auto;--button-margin-left:var(--spacing-xxs,6px)}.amount-filter-value{margin-bottom:var(--spacing-xs,12px);--input-min-width:var(--amount-filter-value-input-width,var(--amount-filter-value-input-min-width,180px))}.amount-filter-trigger-input{display:block;--text-primary-color:var(--color-text-secondary,var(--text-secondary-color,#444))}"; },
        enumerable: true,
        configurable: true
    });
    return WfAmountFilter;
}());
__decorate([
    PrefixEvent()
], WfAmountFilter.prototype, "change", void 0);
export { WfAmountFilter as wf_amount_filter };
