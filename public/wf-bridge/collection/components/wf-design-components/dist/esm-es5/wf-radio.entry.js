var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, c as createEvent, h, g as getElement } from './core-2ee2b62e.js';
import './_commonjsHelpers-97e6d7b1.js';
import { g as generateUniqueId, f as getAllNodes, a as showErrorMessage, b as prepareErrorTooltip } from './utils-9974937e.js';
import { a as KeyValue } from './types-bc604d28.js';
import { P as PrefixEvent } from './custom-event-emitter-d3f4fc52.js';
import { i as isEqual } from './index-c13fbd6f.js';
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
var WfRadio = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
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
        this.getSelectedOptionIndex = function () {
            var index = _this.radioOptions.findIndex(function (option) { return isEqual(_this.value, option.value); });
            return index !== -1 ? index : 0;
        };
        this.formResetListener = function () {
            if (_this.initialValue) {
                _this.value = _this.initialValue;
                _this.change.emit(_this.value);
            }
        };
        this.getHost = function () {
            return _this.host;
        };
        this.handleClick = function (option) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.disabled || option.disabled)
                    return [2 /*return*/];
                this.value = option.value;
                this.change.emit(this.value);
                return [2 /*return*/];
            });
        }); };
        this.handleOnFocus = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.wfFocus.emit();
                return [2 /*return*/];
            });
        }); };
        this.handleOnBlur = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.wfBlur.emit();
                return [2 /*return*/];
            });
        }); };
        this.wfFocus = createEvent(this, "wfFocus", 7);
        this.wfBlur = createEvent(this, "wfBlur", 7);
        this.docChange = createEvent(this, "change", 7);
        this.docWfChange = createEvent(this, "wfChange", 7);
        this.docFocus = createEvent(this, "focus", 7);
        this.docBlur = createEvent(this, "blur", 7);
    }
    /** To focus radio button element use setFocus method */
    class_1.prototype.setFocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var optionBtns, optionBtnsArr, selectedOption;
            return __generator(this, function (_a) {
                optionBtns = this.getHost().shadowRoot.querySelectorAll('button');
                optionBtnsArr = Array.from(optionBtns);
                selectedOption = optionBtnsArr.find(function (option) { return option.classList.contains('checked'); });
                selectedOption ? selectedOption.focus() : optionBtnsArr[0].focus();
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.watchHandler = function (newOptions) {
        this.updateRadioOptions(newOptions);
    };
    class_1.prototype.valueWatcher = function (newValue, oldValue) {
        if (newValue === undefined)
            return;
        var optionByValue = this.radioOptions.find(function (option) { return isEqual(newValue, option.value); });
        if (optionByValue)
            return;
        console.error('No radio option for provided value');
        this.value = oldValue;
    };
    class_1.prototype.handleKeyDown = function (e) {
        if (e.key === KeyValue.ARROW_DOWN || e.key === KeyValue.ARROW_RIGHT) {
            e.preventDefault();
            if (this.disabled || this.allOptionsDisabled())
                return;
            var index = this.getNextIndex();
            this.setChangedOption(index);
        }
        else if (e.key === KeyValue.ARROW_UP || e.key === KeyValue.ARROW_LEFT) {
            e.preventDefault();
            if (this.disabled || this.allOptionsDisabled())
                return;
            var index = this.getPreviousIndex();
            this.setChangedOption(index);
        }
    };
    class_1.prototype.allOptionsDisabled = function () {
        return this.radioOptions.every(function (option) { return option.disabled; });
    };
    class_1.prototype.getNextIndex = function () {
        var _a = this, getSelectedOptionIndex = _a.getSelectedOptionIndex, radioOptions = _a.radioOptions;
        var index = getSelectedOptionIndex() + 1;
        if (index === radioOptions.length)
            index = 0;
        while (radioOptions[index].disabled) {
            index + 1 === radioOptions.length ? (index = 0) : index++;
        }
        return index;
    };
    class_1.prototype.getPreviousIndex = function () {
        var _a = this, getSelectedOptionIndex = _a.getSelectedOptionIndex, radioOptions = _a.radioOptions;
        var index = getSelectedOptionIndex() - 1;
        if (index < 0)
            index = radioOptions.length - 1;
        while (radioOptions[index].disabled) {
            index - 1 < 0 ? (index = radioOptions.length - 1) : index--;
        }
        return index;
    };
    class_1.prototype.setChangedOption = function (index) {
        this.value = this.radioOptions[index].value;
        this.change.emit(this.value);
    };
    class_1.prototype.componentWillLoad = function () {
        var _a = this, name = _a.name, options = _a.options;
        this.radioName = name || generateUniqueId();
        this.initialValue = this.value;
        this.updateRadioOptions(options);
    };
    class_1.prototype.componentDidLoad = function () {
        this.form = this.getHost().closest('form');
        if (this.form) {
            this.form.addEventListener('reset', this.formResetListener);
        }
    };
    class_1.prototype.componentDidUnload = function () {
        if (this.form) {
            this.form.removeEventListener('reset', this.formResetListener);
        }
    };
    class_1.prototype.componentDidUpdate = function () {
        this.setFocus();
    };
    class_1.prototype.parseOptionElement = function (node) {
        return Object.assign({ label: node.getAttribute('label'), value: node.getAttribute('value'), disabled: node.getAttribute('disabled') !== null && node.getAttribute('disabled') !== 'false', checked: node.getAttribute('checked') !== null && node.getAttribute('checked') !== 'false' }, (node.getAttribute('option-id') !== null && { optionId: node.getAttribute('option-id') }));
    };
    class_1.prototype.updateRadioOptions = function (options) {
        var _a = this, host = _a.host, parseOptionElement = _a.parseOptionElement;
        this.radioOptions = options
            ? options
            : getAllNodes(host, 'wf-radio-option, brml-radio-option').map(parseOptionElement);
        var initiallyCheckedOption = this.radioOptions.find(function (option) { return option.checked; });
        if (initiallyCheckedOption) {
            this.initialValue = this.value = initiallyCheckedOption.value;
            delete initiallyCheckedOption.checked;
        }
    };
    class_1.prototype.renderOption = function (option, index) {
        var _a, _b;
        var _c = this, radioName = _c.radioName, disabled = _c.disabled, error = _c.error, handleClick = _c.handleClick, inline = _c.inline, handleOnFocus = _c.handleOnFocus, handleOnBlur = _c.handleOnBlur, size = _c.size;
        var labelClass = (_a = {
                'position-static': !option.label
            },
            _a['checked'] = isEqual(this.value, option.value),
            _a);
        var checkClasses = (_b = {
                'form-check': true
            },
            _b['form-check-error'] = !!error,
            _b["form-check-inline"] = !!inline,
            _b["form-check-" + size] = true,
            _b);
        if (!option.optionId) {
            option.optionId = generateUniqueId();
        }
        var optionProps = {
            type: 'radio',
            name: radioName,
            id: option.optionId,
            checked: isEqual(this.value, option.value),
            disabled: disabled || !!option.disabled,
            value: '',
        };
        var buttonProps = {
            'data-index': index,
            type: 'button',
            class: labelClass,
            onClick: function () {
                handleClick(option);
            },
            tabindex: !optionProps.checked ? '-1' : '0',
            onfocus: handleOnFocus,
            onblur: handleOnBlur,
        };
        return (h("div", { class: checkClasses }, h("input", Object.assign({}, optionProps)), h("button", Object.assign({}, buttonProps), option.label)));
    };
    class_1.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this, label = _b.label, error = _b.error, errorMessage = _b.errorMessage, radioOptions = _b.radioOptions, required = _b.required;
        var asteriskClasses = (_a = {},
            _a["error"] = !!error,
            _a['required'] = !error && !!required,
            _a);
        return (h("wf-tooltip", Object.assign({}, prepareErrorTooltip(error, errorMessage)), h("div", { class: "form-group" }, !!label && (h("label", { class: "form-label" }, label, (!!error || !!required) && h("span", { class: asteriskClasses }, "*"))), radioOptions && radioOptions.map(function (option, index) { return _this.renderOption(option, index); }), showErrorMessage(error, errorMessage) && (h("div", { class: "form-control-error-message", innerHTML: errorMessage.text })))));
    };
    Object.defineProperty(class_1.prototype, "host", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "options": ["watchHandler"],
                "value": ["valueWatcher"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return ".all-caps{font-family:var(--all-caps-font-family,var(--font-family));font-weight:var(--all-caps-font-weight,var(--font-weight-bold,var(--font-weight,normal)));font-size:var(--all-caps-font-size,13px);line-height:var(--all-caps-line-height,15px);text-transform:var(--all-caps-text-transform,uppercase);letter-spacing:var(--all-caps-letter-spacing,1px)}.label-1{font-family:var(--label-1-font-family,var(--label-font-family));font-size:var(--label-1-font-size,var(--label-font-size));line-height:var(--label-1-line-height,var(--label-line-height));color:var(--label-1-color,var(--label-color));letter-spacing:var(--label-1-spacing,var(--label-letter-spacing));font-weight:var(--label-1-font-weight,var(--label-font-weight));text-transform:var(--label-1-text-transform,var(--label-text-transform))}.label-2{font-family:var(--label-2-font-family,var(--label-font-family));font-size:var(--label-2-font-size,var(--label-font-size));line-height:var(--label-2-line-height,var(--label-line-height));color:var(--label-2-color,var(--label-color));letter-spacing:var(--label-2-spacing,var(--label-letter-spacing));font-weight:var(--label-2-font-weight,var(--label-font-weight));text-transform:var(--label-2-text-transform,var(--label-text-transform))}.label-3{font-family:var(--label-3-font-family,var(--label-font-family));font-size:var(--label-3-font-size,var(--label-font-size));line-height:var(--label-3-line-height,var(--label-line-height));color:var(--label-3-color,var(--label-color));letter-spacing:var(--label-3-spacing,var(--label-letter-spacing));font-weight:var(--label-3-font-weight,var(--label-font-weight));text-transform:var(--label-3-text-transform,var(--label-text-transform))}.label-4{font-family:var(--label-4-font-family,var(--label-font-family));font-size:var(--label-4-font-size,var(--label-font-size));line-height:var(--label-4-line-height,var(--label-line-height));color:var(--label-4-color,var(--label-color));letter-spacing:var(--label-4-spacing,var(--label-letter-spacing));font-weight:var(--label-4-font-weight,var(--label-font-weight));text-transform:var(--label-4-text-transform,var(--label-text-transform))}.label-5{font-family:var(--label-5-font-family,var(--label-font-family));font-size:var(--label-5-font-size,var(--label-font-size));line-height:var(--label-5-line-height,var(--label-line-height));color:var(--label-5-color,var(--label-color));letter-spacing:var(--label-5-spacing,var(--label-letter-spacing));font-weight:var(--label-5-font-weight,var(--label-font-weight));text-transform:var(--label-5-text-transform,var(--label-text-transform))}.label-secondary{color:var(--label-secondary-color,var(--color-text-secondary,var(--text-secondary-color,#444)))}.label-tertiary{color:var(--label-tertiary-color,var(--text-tertiary-color,#646464))}.label-inverse{color:var(--label-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}:host{display:inline-block;vertical-align:var(--form-control-vertical-align,bottom)}.form-label,:host .form-tooltip{display:block}.form-label{font-family:var(--form-control-label-font-family);font-size:var(--form-control-label-font-size,var(--font-size-small,.9em));color:var(--form-control-label-color,var(--color-text-secondary,var(--text-secondary-color,#444)));line-height:var(--form-control-label-line-height);margin-bottom:var(--form-control-label-margin-bottom,var(--spacing-xxs,6px))}.form-label-inline{display:inline-block;text-align:right;padding-right:var(--form-control-label-inline-padding-right,var(--spacing-s,24px));padding-left:0;margin:0;width:var(--form-control-caption-width,var(--form-control-label-inline-width,25%));-ms-flex:1;flex:1}.form-label-locked{pointer-events:none}.form-label-error{color:var(--form-control-label-color-error,var(--form-control-error-label-color))}.form-label-inverse{color:var(--form-control-inverse-label-color,hsla(0,0%,100%,.8))}.form-label .required{color:var(--form-control-required-asterisk-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31))))}.form-label .error{color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-control{display:block;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:var(--form-control-font-family);font-weight:var(--form-control-font-weight);font-size:var(--form-control-font-size);border-width:0;border-style:var(--form-control-border-style,solid);border-radius:var(--form-control-border-radius);height:var(--form-control-size-m,var(--form-control-height,var(--spacing-m,36px)));-webkit-box-shadow:var(--form-control-box-shadow);box-shadow:var(--form-control-box-shadow)}.form-control-primary{color:var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));border-color:var(--form-control-border-color,var(--smoke,#919191));border-width:var(--form-control-border-width,1px);background:var(--form-control-background,var(--white,#fff));padding-left:var(--form-control-padding,var(--spacing-xs,12px));padding-right:var(--form-control-padding,var(--spacing-xs,12px))}.form-control-primary .form-control-required{border-color:var(--form-control-border-color-required,var(--form-control-required-border-color,var(--form-control-border-color,var(--smoke,#919191))))}.form-control-secondary{color:var(--form-control-secondary-color,var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))));border-color:var(--form-control-secondary-border-color,var(--form-control-border-color,var(--smoke,#919191)));border-width:var(--form-control-secondary-border-width,var(--form-control-border-width,1px));background:var(--form-control-secondary-background,var(--form-control-background,var(--white,#fff)));padding-left:var(--form-control-secondary-padding,var(--form-control-padding,var(--spacing-xs,12px)));padding-right:var(--form-control-secondary-padding,var(--form-control-padding,var(--spacing-xs,12px)))}.form-control-secondary .form-control-required{border-color:var(--form-control-secondary-required-border-color,var(--form-control-secondary-border-color,var(--form-control-border-color,var(--smoke,#919191))))}.form-control-inverse{color:var(--form-control-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));border-color:var(--form-control-inverse-border-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));border-width:var(--form-control-inverse-border-width,var(--form-control-border-width,1px));background:var(--form-control-inverse-background,transparent);padding-left:var(--form-control-inverse-padding,var(--form-control-padding,var(--spacing-xs,12px)));padding-right:var(--form-control-inverse-padding,var(--form-control-padding,var(--spacing-xs,12px)))}.form-control-inverse .form-control-required{border-color:var(--form-control-inverse-required-border-color,var(--form-control-inverse-border-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff)))))}.form-control-sm{height:var(--form-control-size-sm,var(--form-control-sm-height,var(--form-control-size-m,var(--form-control-height,var(--spacing-m,36px)))))}.form-control-icon-xs{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-xs, 16px))}.form-control-icon-xs+.form-control-icon-wrapper-xs,.form-control-icon-xs .form-control-arrow-xs{top:calc(50% - (var(--icon-size-xs, 16px) / 2) - var(--icon-padding-xs, 4px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-xs, 4px))}.form-control .input-arrow-xs{--icon-padding-xs:0}.form-control .input-arrow-xs.up{top:1px}.form-control .input-arrow-xs.down{top:50%}.form-control-icon-locked-xs{position:absolute;top:calc(50% - (var(--icon-size-xs, 16px) / 2) - var(--icon-padding-xs, 4px));left:0}.form-control-icon-locked-xs~input{text-indent:var(--icon-size-xs,16px)}.form-control-icon-sm{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-sm, 24px))}.form-control-icon-sm+.form-control-icon-wrapper-sm,.form-control-icon-sm .form-control-arrow-sm{top:calc(50% - (var(--icon-size-sm, 24px) / 2) - var(--icon-padding-sm, 6px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-sm, 6px))}.form-control .input-arrow-sm{--icon-padding-sm:0}.form-control .input-arrow-sm.up{top:1px}.form-control .input-arrow-sm.down{top:50%}.form-control-icon-locked-sm{position:absolute;top:calc(50% - (var(--icon-size-sm, 24px) / 2) - var(--icon-padding-sm, 6px));left:0}.form-control-icon-locked-sm~input{text-indent:var(--icon-size-sm,24px)}.form-control-icon-md{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-md, 36px))}.form-control-icon-md+.form-control-icon-wrapper-md,.form-control-icon-md .form-control-arrow-md{top:calc(50% - (var(--icon-size-md, 36px) / 2) - var(--icon-padding-md, 18px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-md, 18px))}.form-control .input-arrow-md{--icon-padding-md:0}.form-control .input-arrow-md.up{top:1px}.form-control .input-arrow-md.down{top:50%}.form-control-icon-locked-md{position:absolute;top:calc(50% - (var(--icon-size-md, 36px) / 2) - var(--icon-padding-md, 18px));left:0}.form-control-icon-locked-md~input{text-indent:var(--icon-size-md,36px)}.form-control-icon-lg{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-lg, 72px))}.form-control-icon-lg+.form-control-icon-wrapper-lg,.form-control-icon-lg .form-control-arrow-lg{top:calc(50% - (var(--icon-size-lg, 72px) / 2) - var(--icon-padding-lg, 12px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-lg, 12px))}.form-control .input-arrow-lg{--icon-padding-lg:0}.form-control .input-arrow-lg.up{top:1px}.form-control .input-arrow-lg.down{top:50%}.form-control-icon-locked-lg{position:absolute;top:calc(50% - (var(--icon-size-lg, 72px) / 2) - var(--icon-padding-lg, 12px));left:0}.form-control-icon-locked-lg~input{text-indent:var(--icon-size-lg,72px)}.form-control-icon-xl{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-xl, 96px))}.form-control-icon-xl+.form-control-icon-wrapper-xl,.form-control-icon-xl .form-control-arrow-xl{top:calc(50% - (var(--icon-size-xl, 96px) / 2) - var(--icon-padding-xl, 12px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-xl, 12px))}.form-control .input-arrow-xl{--icon-padding-xl:0}.form-control .input-arrow-xl.up{top:1px}.form-control .input-arrow-xl.down{top:50%}.form-control-icon-locked-xl{position:absolute;top:calc(50% - (var(--icon-size-xl, 96px) / 2) - var(--icon-padding-xl, 12px));left:0}.form-control-icon-locked-xl~input{text-indent:var(--icon-size-xl,96px)}.form-control-icon-locked-primary{left:var(--form-control-locked-icon-position-left)}.form-control-icon-locked-secondary{left:var(--form-control-secondary-locked-icon-position-left)}.form-control-icon-locked-inverse{left:var(--form-control-inverse-locked-icon-position-left)}.form-control-disabled,.form-control[disabled]{color:var(--form-control-font-color-disabled,var(--form-control-disabled-color,var(--text-disabled-color,#bebebe)));background:var(--form-control-background-disabled,var(--alto,#d7d7d7));border-color:var(--form-control-border-color-disabled,var(--form-control-disabled-border-color,var(--text-disabled-color,#bebebe)))}.form-control-disabled.form-control-inverse,.form-control[disabled].form-control-inverse{background:var(--form-control-inverse-background,transparent)}.form-control-disabled:focus,.form-control[disabled]:focus{outline:0}.form-control-locked{color:var(--form-control-font-color-locked,var(--form-control-locked-color,var(--form-control-font-color-disabled,var(--form-control-disabled-color,var(--text-disabled-color,#bebebe)))));background:var(--form-control-locked-background,var(--form-control-background-disabled,var(--alto,#d7d7d7)));border-color:var(--form-control-border-color-locked,var(--form-control-locked-border-color,var(--form-control-border-color-disabled,var(--form-control-disabled-border-color,var(--text-disabled-color,#bebebe)))));cursor:default}.form-control-locked.form-control-inverse{background:var(--form-control-inverse-background,transparent)}.form-control-error{border-color:var(--form-control-border-color-error,var(--form-control-error-border-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-control-error.form-control-inverse{border-color:var(--form-control-inverse-error-border-color)}.form-control::-webkit-input-placeholder{color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464))}.form-control::-webkit-input-placeholder,.form-control::placeholder{color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464))}.form-control.form-control-inverse::-webkit-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::-moz-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse:-ms-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::-ms-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control:active,.form-control:focus{outline:0}.form-control:active:not([disabled]):not(.form-control-disabled),.form-control:focus:not([disabled]):not(.form-control-disabled){border-color:var(--form-control-border-color-focus,var(--form-control-focus-border-color,var(--lagoon,#009ad2)))}.form-control:hover:not([disabled]):not(.form-control-disabled){border-color:var(--form-control-border-color-hover,var(--form-control-hover-border-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))))}.form-control:hover:not([disabled]):not(.form-control-disabled).form-control-inverse{border-color:var(--form-control-inverse-hover-border-color)}.form-control-error-message{font-family:var(--form-control-error-font-family);font-size:var(--form-control-error-font-size,.8em);font-style:var(--form-control-error-message-font-style,var(--form-control-error-font-style,italic));white-space:pre-line;color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))));margin-top:var(--form-control-error-message-margin-top,var(--form-control-error-margin-top,var(--spacing-xxs,6px)))}.form-control-description{font-family:var(--form-control-description-font-family);font-size:var(--form-control-description-font-size,.8em);font-style:var(--form-control-description-font-style);color:var(--form-control-description-color,var(--text-tertiary-color,#646464));white-space:pre-line;margin-top:var(--form-control-description-margin-top,var(--spacing-xxs,6px))}.form-control-icon-wrapper{position:absolute;cursor:pointer}.form-control-textarea{resize:none}.form-control-text-align-left,.form-control-text-align-left input{text-align:left}.form-control-text-align-center,.form-control-text-align-center input{text-align:center}.form-control-text-align-right,.form-control-text-align-right input{text-align:right}.form-control-wrapper{position:relative;min-width:var(--form-control-min-width,250px);max-width:var(--form-control-max-width,100%);width:100%}.form-control-wrapper .prefix{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;position:absolute;height:100%;width:auto;top:0;left:0;bottom:0;padding-left:var(--form-control-prefix-padding,var(--spacing-xxs,6px));padding-right:var(--form-control-prefix-padding,var(--spacing-xxs,6px));font-weight:var(--form-control-prefix-font-weight,var(--form-control-font-weight));font-size:var(--form-control-prefix-font-size,var(--form-control-font-size));color:var(--form-control-prefix-color,var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))))}.form-group{margin:var(--form-control-margin-top,0) var(--form-control-margin-right,0) var(--form-control-margin-bottom,0) var(--form-control-margin-left,0)}.form-group-inverse .form-control-icon-wrapper{--icon-color:var(--form-control-inverse-icon-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-group-inverse .form-control-icon-locked-inverse{--icon-color:var(--form-control-inverse-locked-icon-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-group-inverse .form-control-error-message{color:var(--form-control-inverse-error-color)}.form-group-inverse .form-control-description{color:var(--form-control-inverse-description-color)}.inline-form-group{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex-wrap:wrap;flex-wrap:wrap}.inline-form-group .form-control-error-message{width:100%;padding-left:var(--form-control-label-inline-padding-right,var(--spacing-s,24px));margin-left:var(--form-control-caption-width,var(--form-control-label-inline-width,25%))}.form-check{margin:var(--form-check-margin-top,0) var(--form-check-margin-right,0) var(--form-check-margin-bottom,var(--spacing-xs,12px)) var(--form-check-margin-left,0);font-family:var(--form-check-font-family);font-weight:var(--font-weight-normal,var(--font-weight,normal));font-size:var(--form-control-font-size)}.form-check:last-of-type{margin-bottom:0}.form-check input[type=checkbox],.form-check input[type=radio]{display:none}.form-check input[type=checkbox]+button,.form-check input[type=checkbox]+label,.form-check input[type=radio]+button,.form-check input[type=radio]+label{position:relative;display:inline-block;text-align:inherit}.form-check input[type=checkbox]+button.position-static,.form-check input[type=checkbox]+label.position-static,.form-check input[type=radio]+button.position-static,.form-check input[type=radio]+label.position-static{display:inline}.form-check input[type=checkbox]+button :after,.form-check input[type=checkbox]+label :after,.form-check input[type=radio]+button :after,.form-check input[type=radio]+label :after{content:none}.form-check input[type=checkbox]+button:after,.form-check input[type=checkbox]+button:before,.form-check input[type=checkbox]+label:after,.form-check input[type=checkbox]+label:before,.form-check input[type=radio]+button:after,.form-check input[type=radio]+button:before,.form-check input[type=radio]+label:after,.form-check input[type=radio]+label:before{content:\"\";position:absolute;display:inline-block}.form-check input[type=checkbox]+button:focus,.form-check input[type=checkbox]+label:focus,.form-check input[type=radio]+button:focus,.form-check input[type=radio]+label:focus{outline:none}.form-check input[type=checkbox]+button:focus:before,.form-check input[type=checkbox]+label:focus:before,.form-check input[type=radio]+button:focus:before,.form-check input[type=radio]+label:focus:before{border-color:var(--form-control-border-color-focus,var(--form-control-focus-border-color,var(--lagoon,#009ad2)))}.form-check.error input[type=checkbox]+label{color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-check.error input[type=checkbox]+label:before{border-color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-check.warning input[type=checkbox]+label{color:var(--color-text-warning,var(--text-warning-color,var(--warning,#7e5f16)))}.form-check.warning input[type=checkbox]+label:before{border-color:var(--color-text-warning,var(--text-warning-color,var(--warning,#7e5f16)))}.form-label{margin-bottom:var(--spacing-xs,12px)}.form-check-inline{display:-ms-inline-flexbox;display:inline-flex;margin-right:calc(var(--radio-width, var(--radio-size, 18px)) + 2 * var(--radio-spacing, var(--spacing-xxs, 6px)))}.form-check{font-size:var(--radio-font-size,var(--form-control-font-size));line-height:var(--radio-line-height);font-family:var(--radio-font-family,var(--form-control-font-family))}.form-check button{display:block;border:none;padding-top:0;padding-bottom:0;background-color:transparent;min-height:var(--radio-height,var(--radio-size,18px));font-family:inherit}.form-check-lg{font-size:var(--radio-lg-font-size,16px);line-height:var(--radio-lg-line-height)}.form-check-lg button{min-height:var(--radio-lg-size,24px)}.form-check input[type=radio]+button,.form-check input[type=radio]+label{color:var(--radio-label-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));margin-right:calc(0px - var(--spacing-s, 24px));cursor:pointer}.form-check input[type=radio]+button:before,.form-check input[type=radio]+label:before{content:\"\";-webkit-box-sizing:border-box;box-sizing:border-box;border:var(--radio-border-width,1px) solid var(--radio-border-color,var(--form-control-border-color,var(--smoke,#919191)));background-color:var(--radio-background-color #fff);-webkit-box-shadow:var(--radio-box-shadow,none);box-shadow:var(--radio-box-shadow,none);border-radius:50%;left:0;top:0}.form-check input[type=radio]:checked+button:before,.form-check input[type=radio]:checked+label:before{border-color:var(--radio-checked-border-color,var(--radio-border-color,var(--form-control-border-color,var(--smoke,#919191))))}.form-check input[type=radio]:checked+button:after,.form-check input[type=radio]:checked+label:after{content:\"\";-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--radio-bullet-color,var(--radio-bullet-background-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))));border-radius:50%}.form-check input[type=radio][disabled]+button,.form-check input[type=radio][disabled]+label{cursor:auto;color:var(--radio-label-color-disabled,var(--radio-disabled-label-color,var(--form-control-font-color-disabled,var(--form-control-disabled-color,var(--text-disabled-color,#bebebe)))))}.form-check input[type=radio][disabled]+button:before,.form-check input[type=radio][disabled]+label:before{border-color:var(--radio-border-color-disabled,var(--radio-disabled-border-color,var(--form-control-border-color-disabled,var(--form-control-disabled-border-color,var(--text-disabled-color,#bebebe)))))}.form-check input[type=radio][disabled]+button:after,.form-check input[type=radio][disabled]+label:after{background-color:var(--radio-bullet-color-disabled,var(--radio-disabled-bullet-background-color,var(--text-disabled-color,#bebebe)))}.form-check input[type=radio]:not([disabled])+button:hover:before,.form-check input[type=radio]:not([disabled])+label:hover:before{border-color:var(--radio-border-color-hover,var(--radio-hover-border-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))))}.form-check input[type=radio]:not([disabled])+button:hover:after,.form-check input[type=radio]:not([disabled])+label:hover:after{background-color:var(--radio-hover-bullet-background-color,var(--radio-bullet-color,var(--radio-bullet-background-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))))))}.form-check input[type=radio]:not([disabled])+button:focus:not(:active):not(:hover):before,.form-check input[type=radio]:not([disabled])+label:focus:not(:active):not(:hover):before{border-color:var(--form-control-border-color-focus,var(--form-control-focus-border-color,var(--lagoon,#009ad2)))}.form-check input[type=radio]+button,.form-check input[type=radio]+label{padding-left:calc(var(--radio-width, var(--radio-size, 18px)) + var(--radio-spacing, var(--spacing-xxs, 6px)))}.form-check input[type=radio]+button:before,.form-check input[type=radio]+label:before{height:var(--radio-height,var(--radio-size,18px));width:var(--radio-width,var(--radio-size,18px))}.form-check input[type=radio]:checked+button:after,.form-check input[type=radio]:checked+label:after{height:var(--radio-bullet-size,10px);width:var(--radio-bullet-size,10px);left:calc((var(--radio-width, var(--radio-size, 18px)) - var(--radio-bullet-size, 10px)) / 2);top:calc((var(--radio-width, var(--radio-size, 18px)) - var(--radio-bullet-size, 10px)) / 2)}.form-check-sm input[type=radio]+button,.form-check-sm input[type=radio]+label{padding-left:calc(var(--radio-width, var(--radio-size, 18px)) + var(--radio-spacing, var(--spacing-xxs, 6px)))}.form-check-sm input[type=radio]+button:before,.form-check-sm input[type=radio]+label:before{height:var(--radio-height,var(--radio-size,18px));width:var(--radio-width,var(--radio-size,18px))}.form-check-sm input[type=radio]:checked+button:after,.form-check-sm input[type=radio]:checked+label:after{height:var(--radio-bullet-size,10px);width:var(--radio-bullet-size,10px);left:calc((var(--radio-width, var(--radio-size, 18px)) - var(--radio-bullet-size, 10px)) / 2);top:calc((var(--radio-width, var(--radio-size, 18px)) - var(--radio-bullet-size, 10px)) / 2)}.form-check-lg input[type=radio]+button,.form-check-lg input[type=radio]+label{padding-left:calc(var(--radio-lg-size, 24px) + var(--radio-spacing, var(--spacing-xxs, 6px)))}.form-check-lg input[type=radio]+button:before,.form-check-lg input[type=radio]+label:before{height:var(--radio-lg-size,24px);width:var(--radio-lg-size,24px)}.form-check-lg input[type=radio]:checked+button:after,.form-check-lg input[type=radio]:checked+label:after{height:var(--radio-lg-bullet-size,14px);width:var(--radio-lg-bullet-size,14px);left:calc((var(--radio-lg-size, 24px) - var(--radio-lg-bullet-size, 14px)) / 2);top:calc((var(--radio-lg-size, 24px) - var(--radio-lg-bullet-size, 14px)) / 2)}.form-check-error input[type=radio]+button,.form-check-error input[type=radio]+label,.form-check-error input[type=radio]:checked+button,.form-check-error input[type=radio]:checked+label{color:var(--radio-error-label-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))))}.form-check-error input[type=radio]+button:before,.form-check-error input[type=radio]+label:before,.form-check-error input[type=radio]:checked+button:before,.form-check-error input[type=radio]:checked+label:before{border-color:var(--radio-error-border-color,var(--form-control-border-color,var(--smoke,#919191)));background-color:var(--radio-error-background-color,#fff)}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
__decorate([
    PrefixEvent()
], WfRadio.prototype, "change", void 0);
export { WfRadio as wf_radio };
