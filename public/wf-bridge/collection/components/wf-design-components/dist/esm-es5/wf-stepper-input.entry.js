import { r as registerInstance, c as createEvent, h, g as getElement } from './core-2ee2b62e.js';
import './_commonjsHelpers-97e6d7b1.js';
import { g as generateUniqueId, a as showErrorMessage, b as prepareErrorTooltip } from './utils-9974937e.js';
import { P as PrefixEvent } from './custom-event-emitter-d3f4fc52.js';
var ArrowKeyKode;
(function (ArrowKeyKode) {
    ArrowKeyKode["ARROW_UP_KEY"] = "ArrowUp";
    ArrowKeyKode["ARROW_DOWN_KEY"] = "ArrowDown";
})(ArrowKeyKode || (ArrowKeyKode = {}));
var NumericStrategy = /** @class */ (function () {
    function NumericStrategy() {
    }
    NumericStrategy.prototype.generateValue = function (_a) {
        var value = _a.value;
        return Number(value);
    };
    NumericStrategy.prototype.swipeUp = function (object) {
        object.value = Number(object.value) + 1;
    };
    NumericStrategy.prototype.swipeDown = function (object) {
        object.value = Number(object.value) - 1;
    };
    NumericStrategy.prototype.validateValue = function (value) {
        if (isNaN(Number(value))) {
            throw new Error('Value is not valid');
        }
    };
    return NumericStrategy;
}());
var OptionsStrategy = /** @class */ (function () {
    function OptionsStrategy(getValueFn) {
        this.getValueFn = getValueFn;
    }
    OptionsStrategy.prototype.generateValue = function (_a) {
        var parsedOptions = _a.parsedOptions, selectedIndex = _a.selectedIndex;
        var selectedOption = parsedOptions[selectedIndex];
        return typeof selectedOption === 'object'
            ? this.getValueFn(selectedOption)
            : selectedOption.toString();
    };
    OptionsStrategy.prototype.swipeUp = function (object) {
        object.selectedIndex = object.selectedIndex + 1;
    };
    OptionsStrategy.prototype.swipeDown = function (object) {
        object.selectedIndex = object.selectedIndex - 1;
    };
    OptionsStrategy.prototype.validateValue = function (value, object) {
        var _this = this;
        var index = Array.isArray(object.options) && typeof object.options[0] === 'object'
            ? object.options.findIndex(function (valueObj) { return _this.getValueFn(valueObj) === value; })
            : object.options.indexOf(value);
        if (index === -1) {
            throw new Error('Value is not valid');
        }
        else {
            object.selectedIndex = index;
        }
    };
    return OptionsStrategy;
}());
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
var WfStepperInput = /** @class */ (function () {
    function WfStepperInput(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
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
        this.getValue = function (step) { return step.value; };
        /** Initial numeric input value or gives/sets value from options value. */
        this.value = 0;
        /** Input value alignment */
        this.textAlign = 'left';
        //** Current selected option index */
        this.selectedIndex = 0;
        this.valueIndex = 0;
        this.generateValue = function () {
            return (_this.value = _this.strategy.generateValue(_this));
        };
        this.rerenderOptions = function () {
            // Parsing string to options is DEPRECATED!
            Array.isArray(_this.options)
                ? (_this.parsedOptions = _this.options)
                : (_this.parsedOptions = JSON.parse(_this.options));
            _this.length = _this.parsedOptions.length;
            _this.selectedIndex = 0;
            _this.handleStepperChange();
        };
        this.handleStepperChange = function () {
            var locked = _this.locked;
            if (!locked) {
                _this.value = _this.strategy.generateValue(_this);
                _this.stepperChange && _this.stepperChange.emit(_this.value);
            }
        };
        this.swipeUp = function () {
            if (_this.swipeUpAvailable()) {
                _this.strategy.swipeUp(_this);
                _this.handleStepperChange();
            }
        };
        this.swipeDown = function () {
            if (_this.swipeDownAvailable()) {
                _this.strategy.swipeDown(_this);
                _this.handleStepperChange();
            }
        };
        this.swipeUpAvailable = function () {
            var _a = _this, disabled = _a.disabled, locked = _a.locked, selectedIndex = _a.selectedIndex, numeric = _a.numeric, length = _a.length;
            return !disabled && !locked && (numeric || selectedIndex + 1 < length);
        };
        this.swipeDownAvailable = function () {
            var _a = _this, disabled = _a.disabled, locked = _a.locked, selectedIndex = _a.selectedIndex, numeric = _a.numeric;
            return !disabled && !locked && (numeric || !!selectedIndex);
        };
        this.focusStepper = function () {
            _this.host.shadowRoot.querySelector('.input-stepper').focus();
        };
        this.hasOptions = function () {
            var _a = _this, options = _a.options, numeric = _a.numeric;
            if (numeric)
                return false;
            return !!options && !!options.length;
        };
        this.docStepperChange = createEvent(this, "stepperChange", 7);
        this.docWfStepperChange = createEvent(this, "wfStepperChange", 7);
    }
    WfStepperInput.prototype.handleKeyDown = function (event) {
        event.preventDefault();
        if (event.key === ArrowKeyKode.ARROW_UP_KEY) {
            this.swipeUp();
        }
        if (event.key === ArrowKeyKode.ARROW_DOWN_KEY) {
            this.swipeDown();
        }
    };
    WfStepperInput.prototype.handleOptionsChange = function (newOptions, oldOptions) {
        if (!this.checkOptionType(newOptions)) {
            this.options = oldOptions;
            return;
        }
        this.setStrategy();
    };
    WfStepperInput.prototype.handleValueChange = function (newValue, oldValue) {
        try {
            this.strategy.validateValue(newValue, this);
        }
        catch (error) {
            this.value = oldValue;
            throw error;
        }
    };
    WfStepperInput.prototype.componentWillLoad = function () {
        this.setStrategy();
        this.value = this.strategy.generateValue(this);
    };
    WfStepperInput.prototype.checkOptionType = function (options) {
        return (Array.isArray(options) &&
            options.length &&
            options.every(function (option) { return typeof option === 'string'; }));
    };
    WfStepperInput.prototype.setStrategy = function () {
        if (this.hasOptions()) {
            this.numeric = false;
            this.strategy = new OptionsStrategy(this.getValue);
            this.rerenderOptions();
        }
        else {
            this.numeric = true;
            this.strategy = new NumericStrategy();
        }
    };
    WfStepperInput.prototype.renderLabel = function (id) {
        var _a, _b;
        var _c = this, error = _c.error, variant = _c.variant, label = _c.label, inlineLabel = _c.inlineLabel, caption = _c.caption;
        var displayLabel = label || caption;
        var labelClasses = (_a = {},
            _a["form-label"] = true,
            _a["form-label-inline"] = inlineLabel || (!!caption && !!!label),
            _a["form-label-" + variant] = variant === 'inverse',
            _a["form-label-error"] = !!error,
            _a);
        var asteriskClasses = (_b = {},
            _b["error"] = !!error,
            _b);
        return (h("label", { class: labelClasses, htmlFor: "form-element-" + id, onClick: this.focusStepper }, displayLabel, !!error && h("span", { class: asteriskClasses }, "*")));
    };
    WfStepperInput.prototype.renderLockedIcon = function () {
        var _a;
        var _b = this, lockedIcon = _b.lockedIcon, lockedIconSize = _b.lockedIconSize, locked = _b.locked, variant = _b.variant;
        var iconClasses = (_a = {},
            _a["form-control-icon-locked-" + lockedIconSize] = true,
            _a["form-control-icon-locked-" + variant] = true,
            _a);
        return (locked && h("wf-icon", { class: iconClasses, size: lockedIconSize, name: lockedIcon }));
    };
    WfStepperInput.prototype.render = function () {
        var _a, _b;
        var _c = this, inputId = _c.inputId, label = _c.label, inlineLabel = _c.inlineLabel, caption = _c.caption, description = _c.description, variant = _c.variant, size = _c.size, disabled = _c.disabled, locked = _c.locked, error = _c.error, errorMessage = _c.errorMessage, textAlign = _c.textAlign, value = _c.value, arrowUpIcon = _c.arrowUpIcon, arrowDownIcon = _c.arrowDownIcon, arrowIconSize = _c.arrowIconSize;
        var containerClasses = (_a = {},
            _a["form-group"] = true,
            _a["form-group-" + variant] = variant === 'inverse',
            _a["inline-form-group"] = inlineLabel || (!!caption && !!!label),
            _a);
        var stepperClasses = (_b = {
                'form-control': true,
                'input-stepper': true
            },
            _b["form-control-" + variant] = !!variant,
            _b["form-control-" + size] = !!size,
            _b["form-control-icon-xs"] = true,
            _b["form-control-error"] = !!error,
            _b["form-control-disabled"] = disabled,
            _b["form-control-locked"] = !!locked,
            _b["form-control-text-align-" + textAlign] = !!textAlign,
            _b);
        return (h("wf-tooltip", Object.assign({}, prepareErrorTooltip(error, errorMessage)), h("div", { class: containerClasses }, (!!label || !!caption) && this.renderLabel(inputId), h("div", { class: "form-control-wrapper" }, h("div", { class: stepperClasses, tabindex: "1", id: "form-element-" + inputId }, this.renderLockedIcon(), h("input", { disabled: true, class: "input-stepper-data", value: value }), this.swipeUpAvailable() && (h("wf-action-icon", { key: "arrowUp", size: arrowIconSize, name: arrowUpIcon, variant: variant === 'inverse' ? variant : undefined, class: "input-arrow input-arrow-" + arrowIconSize + " up", onClick: this.swipeUp })), this.swipeDownAvailable() && (h("wf-action-icon", { key: "arrowDown", size: arrowIconSize, name: arrowDownIcon, variant: variant === 'inverse' ? variant : undefined, class: "input-arrow input-arrow-" + arrowIconSize + " down", onClick: this.swipeDown })))), !!description && h("div", { class: "form-control-description" }, description), showErrorMessage(error, errorMessage) && (h("div", { class: "form-control-error-message", innerHTML: errorMessage.text })))));
    };
    Object.defineProperty(WfStepperInput.prototype, "host", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WfStepperInput, "watchers", {
        get: function () {
            return {
                "options": ["handleOptionsChange"],
                "value": ["handleValueChange"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WfStepperInput, "style", {
        get: function () { return ".all-caps{font-family:var(--all-caps-font-family,var(--font-family));font-weight:var(--all-caps-font-weight,var(--font-weight-bold,var(--font-weight,normal)));font-size:var(--all-caps-font-size,13px);line-height:var(--all-caps-line-height,15px);text-transform:var(--all-caps-text-transform,uppercase);letter-spacing:var(--all-caps-letter-spacing,1px)}.label-1{font-family:var(--label-1-font-family,var(--label-font-family));font-size:var(--label-1-font-size,var(--label-font-size));line-height:var(--label-1-line-height,var(--label-line-height));color:var(--label-1-color,var(--label-color));letter-spacing:var(--label-1-spacing,var(--label-letter-spacing));font-weight:var(--label-1-font-weight,var(--label-font-weight));text-transform:var(--label-1-text-transform,var(--label-text-transform))}.label-2{font-family:var(--label-2-font-family,var(--label-font-family));font-size:var(--label-2-font-size,var(--label-font-size));line-height:var(--label-2-line-height,var(--label-line-height));color:var(--label-2-color,var(--label-color));letter-spacing:var(--label-2-spacing,var(--label-letter-spacing));font-weight:var(--label-2-font-weight,var(--label-font-weight));text-transform:var(--label-2-text-transform,var(--label-text-transform))}.label-3{font-family:var(--label-3-font-family,var(--label-font-family));font-size:var(--label-3-font-size,var(--label-font-size));line-height:var(--label-3-line-height,var(--label-line-height));color:var(--label-3-color,var(--label-color));letter-spacing:var(--label-3-spacing,var(--label-letter-spacing));font-weight:var(--label-3-font-weight,var(--label-font-weight));text-transform:var(--label-3-text-transform,var(--label-text-transform))}.label-4{font-family:var(--label-4-font-family,var(--label-font-family));font-size:var(--label-4-font-size,var(--label-font-size));line-height:var(--label-4-line-height,var(--label-line-height));color:var(--label-4-color,var(--label-color));letter-spacing:var(--label-4-spacing,var(--label-letter-spacing));font-weight:var(--label-4-font-weight,var(--label-font-weight));text-transform:var(--label-4-text-transform,var(--label-text-transform))}.label-5{font-family:var(--label-5-font-family,var(--label-font-family));font-size:var(--label-5-font-size,var(--label-font-size));line-height:var(--label-5-line-height,var(--label-line-height));color:var(--label-5-color,var(--label-color));letter-spacing:var(--label-5-spacing,var(--label-letter-spacing));font-weight:var(--label-5-font-weight,var(--label-font-weight));text-transform:var(--label-5-text-transform,var(--label-text-transform))}.label-secondary{color:var(--label-secondary-color,var(--color-text-secondary,var(--text-secondary-color,#444)))}.label-tertiary{color:var(--label-tertiary-color,var(--text-tertiary-color,#646464))}.label-inverse{color:var(--label-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}:host{display:inline-block;vertical-align:var(--form-control-vertical-align,bottom)}.form-label,:host .form-tooltip{display:block}.form-label{font-family:var(--form-control-label-font-family);font-size:var(--form-control-label-font-size,var(--font-size-small,.9em));color:var(--form-control-label-color,var(--color-text-secondary,var(--text-secondary-color,#444)));line-height:var(--form-control-label-line-height);margin-bottom:var(--form-control-label-margin-bottom,var(--spacing-xxs,6px))}.form-label-inline{display:inline-block;text-align:right;padding-right:var(--form-control-label-inline-padding-right,var(--spacing-s,24px));padding-left:0;margin:0;width:var(--form-control-caption-width,var(--form-control-label-inline-width,25%));-ms-flex:1;flex:1}.form-label-locked{pointer-events:none}.form-label-error{color:var(--form-control-label-color-error,var(--form-control-error-label-color))}.form-label-inverse{color:var(--form-control-inverse-label-color,hsla(0,0%,100%,.8))}.form-label .required{color:var(--form-control-required-asterisk-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31))))}.form-label .error{color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-control{display:block;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:var(--form-control-font-family);font-weight:var(--form-control-font-weight);font-size:var(--form-control-font-size);border-width:0;border-style:var(--form-control-border-style,solid);border-radius:var(--form-control-border-radius);height:var(--form-control-size-m,var(--form-control-height,var(--spacing-m,36px)));-webkit-box-shadow:var(--form-control-box-shadow);box-shadow:var(--form-control-box-shadow)}.form-control-primary{color:var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));border-color:var(--form-control-border-color,var(--smoke,#919191));border-width:var(--form-control-border-width,1px);background:var(--form-control-background,var(--white,#fff));padding-left:var(--form-control-padding,var(--spacing-xs,12px));padding-right:var(--form-control-padding,var(--spacing-xs,12px))}.form-control-primary .form-control-required{border-color:var(--form-control-border-color-required,var(--form-control-required-border-color,var(--form-control-border-color,var(--smoke,#919191))))}.form-control-secondary{color:var(--form-control-secondary-color,var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))));border-color:var(--form-control-secondary-border-color,var(--form-control-border-color,var(--smoke,#919191)));border-width:var(--form-control-secondary-border-width,var(--form-control-border-width,1px));background:var(--form-control-secondary-background,var(--form-control-background,var(--white,#fff)));padding-left:var(--form-control-secondary-padding,var(--form-control-padding,var(--spacing-xs,12px)));padding-right:var(--form-control-secondary-padding,var(--form-control-padding,var(--spacing-xs,12px)))}.form-control-secondary .form-control-required{border-color:var(--form-control-secondary-required-border-color,var(--form-control-secondary-border-color,var(--form-control-border-color,var(--smoke,#919191))))}.form-control-inverse{color:var(--form-control-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));border-color:var(--form-control-inverse-border-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));border-width:var(--form-control-inverse-border-width,var(--form-control-border-width,1px));background:var(--form-control-inverse-background,transparent);padding-left:var(--form-control-inverse-padding,var(--form-control-padding,var(--spacing-xs,12px)));padding-right:var(--form-control-inverse-padding,var(--form-control-padding,var(--spacing-xs,12px)))}.form-control-inverse .form-control-required{border-color:var(--form-control-inverse-required-border-color,var(--form-control-inverse-border-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff)))))}.form-control-sm{height:var(--form-control-size-sm,var(--form-control-sm-height,var(--form-control-size-m,var(--form-control-height,var(--spacing-m,36px)))))}.form-control-icon-xs{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-xs, 16px))}.form-control-icon-xs+.form-control-icon-wrapper-xs,.form-control-icon-xs .form-control-arrow-xs{top:calc(50% - (var(--icon-size-xs, 16px) / 2) - var(--icon-padding-xs, 4px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-xs, 4px))}.form-control .input-arrow-xs{--icon-padding-xs:0}.form-control .input-arrow-xs.up{top:1px}.form-control .input-arrow-xs.down{top:50%}.form-control-icon-locked-xs{position:absolute;top:calc(50% - (var(--icon-size-xs, 16px) / 2) - var(--icon-padding-xs, 4px));left:0}.form-control-icon-locked-xs~input{text-indent:var(--icon-size-xs,16px)}.form-control-icon-sm{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-sm, 24px))}.form-control-icon-sm+.form-control-icon-wrapper-sm,.form-control-icon-sm .form-control-arrow-sm{top:calc(50% - (var(--icon-size-sm, 24px) / 2) - var(--icon-padding-sm, 6px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-sm, 6px))}.form-control .input-arrow-sm{--icon-padding-sm:0}.form-control .input-arrow-sm.up{top:1px}.form-control .input-arrow-sm.down{top:50%}.form-control-icon-locked-sm{position:absolute;top:calc(50% - (var(--icon-size-sm, 24px) / 2) - var(--icon-padding-sm, 6px));left:0}.form-control-icon-locked-sm~input{text-indent:var(--icon-size-sm,24px)}.form-control-icon-md{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-md, 36px))}.form-control-icon-md+.form-control-icon-wrapper-md,.form-control-icon-md .form-control-arrow-md{top:calc(50% - (var(--icon-size-md, 36px) / 2) - var(--icon-padding-md, 18px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-md, 18px))}.form-control .input-arrow-md{--icon-padding-md:0}.form-control .input-arrow-md.up{top:1px}.form-control .input-arrow-md.down{top:50%}.form-control-icon-locked-md{position:absolute;top:calc(50% - (var(--icon-size-md, 36px) / 2) - var(--icon-padding-md, 18px));left:0}.form-control-icon-locked-md~input{text-indent:var(--icon-size-md,36px)}.form-control-icon-lg{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-lg, 72px))}.form-control-icon-lg+.form-control-icon-wrapper-lg,.form-control-icon-lg .form-control-arrow-lg{top:calc(50% - (var(--icon-size-lg, 72px) / 2) - var(--icon-padding-lg, 12px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-lg, 12px))}.form-control .input-arrow-lg{--icon-padding-lg:0}.form-control .input-arrow-lg.up{top:1px}.form-control .input-arrow-lg.down{top:50%}.form-control-icon-locked-lg{position:absolute;top:calc(50% - (var(--icon-size-lg, 72px) / 2) - var(--icon-padding-lg, 12px));left:0}.form-control-icon-locked-lg~input{text-indent:var(--icon-size-lg,72px)}.form-control-icon-xl{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-xl, 96px))}.form-control-icon-xl+.form-control-icon-wrapper-xl,.form-control-icon-xl .form-control-arrow-xl{top:calc(50% - (var(--icon-size-xl, 96px) / 2) - var(--icon-padding-xl, 12px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-xl, 12px))}.form-control .input-arrow-xl{--icon-padding-xl:0}.form-control .input-arrow-xl.up{top:1px}.form-control .input-arrow-xl.down{top:50%}.form-control-icon-locked-xl{position:absolute;top:calc(50% - (var(--icon-size-xl, 96px) / 2) - var(--icon-padding-xl, 12px));left:0}.form-control-icon-locked-xl~input{text-indent:var(--icon-size-xl,96px)}.form-control-icon-locked-primary{left:var(--form-control-locked-icon-position-left)}.form-control-icon-locked-secondary{left:var(--form-control-secondary-locked-icon-position-left)}.form-control-icon-locked-inverse{left:var(--form-control-inverse-locked-icon-position-left)}.form-control-disabled,.form-control[disabled]{color:var(--form-control-font-color-disabled,var(--form-control-disabled-color,var(--text-disabled-color,#bebebe)));background:var(--form-control-background-disabled,var(--alto,#d7d7d7));border-color:var(--form-control-border-color-disabled,var(--form-control-disabled-border-color,var(--text-disabled-color,#bebebe)))}.form-control-disabled.form-control-inverse,.form-control[disabled].form-control-inverse{background:var(--form-control-inverse-background,transparent)}.form-control-disabled:focus,.form-control[disabled]:focus{outline:0}.form-control-locked{color:var(--form-control-font-color-locked,var(--form-control-locked-color,var(--form-control-font-color-disabled,var(--form-control-disabled-color,var(--text-disabled-color,#bebebe)))));background:var(--form-control-locked-background,var(--form-control-background-disabled,var(--alto,#d7d7d7)));border-color:var(--form-control-border-color-locked,var(--form-control-locked-border-color,var(--form-control-border-color-disabled,var(--form-control-disabled-border-color,var(--text-disabled-color,#bebebe)))));cursor:default}.form-control-locked.form-control-inverse{background:var(--form-control-inverse-background,transparent)}.form-control-error{border-color:var(--form-control-border-color-error,var(--form-control-error-border-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-control-error.form-control-inverse{border-color:var(--form-control-inverse-error-border-color)}.form-control::-webkit-input-placeholder{color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464))}.form-control::-webkit-input-placeholder,.form-control::placeholder{color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464))}.form-control.form-control-inverse::-webkit-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::-moz-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse:-ms-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::-ms-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control:active,.form-control:focus{outline:0}.form-control:active:not([disabled]):not(.form-control-disabled),.form-control:focus:not([disabled]):not(.form-control-disabled){border-color:var(--form-control-border-color-focus,var(--form-control-focus-border-color,var(--lagoon,#009ad2)))}.form-control:hover:not([disabled]):not(.form-control-disabled){border-color:var(--form-control-border-color-hover,var(--form-control-hover-border-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))))}.form-control:hover:not([disabled]):not(.form-control-disabled).form-control-inverse{border-color:var(--form-control-inverse-hover-border-color)}.form-control-error-message{font-family:var(--form-control-error-font-family);font-size:var(--form-control-error-font-size,.8em);font-style:var(--form-control-error-message-font-style,var(--form-control-error-font-style,italic));white-space:pre-line;color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))));margin-top:var(--form-control-error-message-margin-top,var(--form-control-error-margin-top,var(--spacing-xxs,6px)))}.form-control-description{font-family:var(--form-control-description-font-family);font-size:var(--form-control-description-font-size,.8em);font-style:var(--form-control-description-font-style);color:var(--form-control-description-color,var(--text-tertiary-color,#646464));white-space:pre-line;margin-top:var(--form-control-description-margin-top,var(--spacing-xxs,6px))}.form-control-icon-wrapper{position:absolute;cursor:pointer}.form-control-textarea{resize:none}.form-control-text-align-left,.form-control-text-align-left input{text-align:left}.form-control-text-align-center,.form-control-text-align-center input{text-align:center}.form-control-text-align-right,.form-control-text-align-right input{text-align:right}.form-control-wrapper{position:relative;min-width:var(--form-control-min-width,250px);max-width:var(--form-control-max-width,100%);width:100%}.form-control-wrapper .prefix{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;position:absolute;height:100%;width:auto;top:0;left:0;bottom:0;padding-left:var(--form-control-prefix-padding,var(--spacing-xxs,6px));padding-right:var(--form-control-prefix-padding,var(--spacing-xxs,6px));font-weight:var(--form-control-prefix-font-weight,var(--form-control-font-weight));font-size:var(--form-control-prefix-font-size,var(--form-control-font-size));color:var(--form-control-prefix-color,var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))))}.form-group{margin:var(--form-control-margin-top,0) var(--form-control-margin-right,0) var(--form-control-margin-bottom,0) var(--form-control-margin-left,0)}.form-group-inverse .form-control-icon-wrapper{--icon-color:var(--form-control-inverse-icon-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-group-inverse .form-control-icon-locked-inverse{--icon-color:var(--form-control-inverse-locked-icon-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-group-inverse .form-control-error-message{color:var(--form-control-inverse-error-color)}.form-group-inverse .form-control-description{color:var(--form-control-inverse-description-color)}.inline-form-group{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex-wrap:wrap;flex-wrap:wrap}.inline-form-group .form-control-error-message{width:100%;padding-left:var(--form-control-label-inline-padding-right,var(--spacing-s,24px));margin-left:var(--form-control-caption-width,var(--form-control-label-inline-width,25%))}.form-check{margin:var(--form-check-margin-top,0) var(--form-check-margin-right,0) var(--form-check-margin-bottom,var(--spacing-xs,12px)) var(--form-check-margin-left,0);font-family:var(--form-check-font-family);font-weight:var(--font-weight-normal,var(--font-weight,normal));font-size:var(--form-control-font-size)}.form-check:last-of-type{margin-bottom:0}.form-check input[type=checkbox],.form-check input[type=radio]{display:none}.form-check input[type=checkbox]+button,.form-check input[type=checkbox]+label,.form-check input[type=radio]+button,.form-check input[type=radio]+label{position:relative;display:inline-block;text-align:inherit}.form-check input[type=checkbox]+button.position-static,.form-check input[type=checkbox]+label.position-static,.form-check input[type=radio]+button.position-static,.form-check input[type=radio]+label.position-static{display:inline}.form-check input[type=checkbox]+button :after,.form-check input[type=checkbox]+label :after,.form-check input[type=radio]+button :after,.form-check input[type=radio]+label :after{content:none}.form-check input[type=checkbox]+button:after,.form-check input[type=checkbox]+button:before,.form-check input[type=checkbox]+label:after,.form-check input[type=checkbox]+label:before,.form-check input[type=radio]+button:after,.form-check input[type=radio]+button:before,.form-check input[type=radio]+label:after,.form-check input[type=radio]+label:before{content:\"\";position:absolute;display:inline-block}.form-check input[type=checkbox]+button:focus,.form-check input[type=checkbox]+label:focus,.form-check input[type=radio]+button:focus,.form-check input[type=radio]+label:focus{outline:none}.form-check input[type=checkbox]+button:focus:before,.form-check input[type=checkbox]+label:focus:before,.form-check input[type=radio]+button:focus:before,.form-check input[type=radio]+label:focus:before{border-color:var(--form-control-border-color-focus,var(--form-control-focus-border-color,var(--lagoon,#009ad2)))}.form-check.error input[type=checkbox]+label{color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-check.error input[type=checkbox]+label:before{border-color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-check.warning input[type=checkbox]+label{color:var(--color-text-warning,var(--text-warning-color,var(--warning,#7e5f16)))}.form-check.warning input[type=checkbox]+label:before{border-color:var(--color-text-warning,var(--text-warning-color,var(--warning,#7e5f16)))}.form-control-wrapper{width:var(--input-width,var(--form-control-width,auto));min-width:var(--input-min-width,var(--form-control-min-width,250px));max-width:var(--input-max-width,var(--form-control-max-width,100%))}.form-input-type-number{-moz-appearance:textfield}.form-input-type-text{text-overflow:var(--input-text-overflow,clip)}.input-stepper{position:relative;display:-ms-flexbox;display:flex}.input-stepper-data{font-family:inherit;font-size:inherit;color:inherit;margin:auto 0;border:0}.input-stepper-data:disabled{background-color:inherit;color:inherit}.input-stepper .input-arrow{display:inline-block;position:absolute;right:var(--input-stepper-arrow-right,var(--spacing-xs,12px));cursor:pointer;--action-icon-hover-background-color:var(--input-stepper-arrow-hover-background,transparent);--action-icon-overlay-hover-background-color:var(--input-stepper-arrow-hover-background,transparent);--action-icon-active-background-color:var(--input-stepper-arrow-active-background,transparent);--action-icon-overlay-hover-background-color:var(--input-stepper-arrow-active-background,transparent);--action-icon-inverse-hover-background-color:var(--input-stepper-inverse-arrow-hover-background,transparent);--action-icon-inverse-overlay-hover-background-color:var(--input-stepper-inverse-arrow-hover-background,transparent);--action-icon-inverse-active-background-color:var(--input-stepper-inverse-arrow-active-background,transparent);--action-icon-inverse-overlay-active-background-color:var(--input-stepper-inverse-arrow-active-background,transparent)}.input-stepper .input-arrow:focus{outline:0}input::-webkit-inner-spin-button{align-self:center}"; },
        enumerable: true,
        configurable: true
    });
    return WfStepperInput;
}());
__decorate([
    PrefixEvent()
], WfStepperInput.prototype, "stepperChange", void 0);
export { WfStepperInput as wf_stepper_input };
