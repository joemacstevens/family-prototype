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
import { g as generateUniqueId, e as clonedeep, f as getAllNodes, a as showErrorMessage, b as prepareErrorTooltip, s as stopPropagation } from './utils-9974937e.js';
import { a as KeyValue } from './types-bc604d28.js';
import { P as PrefixEvent } from './custom-event-emitter-d3f4fc52.js';
import { h as handleKeyboardControl } from './keyboard-control-29636223.js';
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
var WfSelect = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
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
        this.formResetListener = function () {
            if (_this.initialOption) {
                _this.selectedValue = _this.initialOption.selectedName || _this.initialOption.name;
                _this.value = _this.initialOption.value;
                _this.change.emit(_this.initialOption.value);
            }
        };
        this.handleSelectChange = function (option) {
            if (!_this.locked && !option.disabled) {
                _this.closeSelect();
                _this.value = option.value;
                _this.change.emit(option.value);
                _this.selectedValue = option.selectedName || option.name;
            }
        };
        this.docChange = createEvent(this, "change", 7);
        this.docWfChange = createEvent(this, "wfChange", 7);
    }
    /** To focus select element use setFocus method */
    class_1.prototype.setFocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.selectInput)
                    this.selectInput.setFocus();
                if (this.selectButton)
                    this.selectButton.setFocus();
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.watchHandler = function (newOptions) {
        this.updateSelectOptions(newOptions);
    };
    class_1.prototype.handleInput = function (ev) {
        this.searchStr = ev.detail;
    };
    //TODO : Merge selectedValue and value in one option
    class_1.prototype.handleDropdownChange = function () {
        var _a = this, selectInput = _a.selectInput, selectButton = _a.selectButton, dropdown = _a.dropdown, selectType = _a.selectType, liveSearch = _a.liveSearch;
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
    };
    class_1.prototype.handleKeyDown = function (ev) {
        var _a = this, dropdown = _a.dropdown, host = _a.host;
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
        var optionClass = 'form-select-option';
        var focusClass = 'form-select-option-focused';
        var optionsList = host.shadowRoot.querySelector(".form-select-list");
        handleKeyboardControl(ev, optionClass, focusClass, optionsList);
    };
    class_1.prototype.handleValueChange = function (newValue, oldValue) {
        var selectOptions = this.selectOptions;
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
            var index = selectOptions.findIndex(function (option) { return isEqual(option.value, newValue); });
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
    };
    class_1.prototype.componentWillLoad = function () {
        this.updateSelectOptions(this.options, true);
    };
    class_1.prototype.getSelectedValue = function () {
        var _a = this, prefixLabel = _a.prefixLabel, selectedValue = _a.selectedValue, placeholder = _a.placeholder;
        if (prefixLabel)
            return selectedValue
                ? prefixLabel + ": " + selectedValue
                : placeholder
                    ? ''
                    : prefixLabel + ": ";
        return selectedValue;
    };
    class_1.prototype.getSelectedValueText = function () {
        var placeholder = this.placeholder;
        var value = this.getSelectedValue();
        var finalValue = value || placeholder;
        return finalValue || '';
    };
    class_1.prototype.getSelectedOptionName = function () {
        var _this = this;
        if (!this.selectOptions)
            return '';
        var selectedOption = this.selectOptions.find(function (opt) {
            if (opt.hasOwnProperty('selectedName') && !!opt.selectedName)
                return opt.selectedName === _this.selectedValue;
            return opt.name === _this.selectedValue;
        });
        return selectedOption ? selectedOption.name : '';
    };
    class_1.prototype.componentDidLoad = function () {
        this.form = this.getHost().closest('form');
        if (this.form) {
            this.form.addEventListener('reset', this.formResetListener);
        }
        this.handleDropdownChange();
    };
    class_1.prototype.componentDidUnload = function () {
        if (this.form) {
            this.form.removeEventListener('reset', this.formResetListener);
        }
    };
    class_1.prototype.getHost = function () {
        return this.host;
    };
    class_1.prototype.parseOptionElement = function (node) {
        return {
            name: node.getAttribute('name') || '',
            value: node.getAttribute('value'),
            selectedName: node.getAttribute('selected-name') || null,
            disabled: node.getAttribute('disabled') !== null && node.getAttribute('disabled') !== 'false',
            selected: node.getAttribute('selected') !== null && node.getAttribute('selected') !== 'false',
        };
    };
    class_1.prototype.updateSelectOptions = function (options, initial) {
        if (initial === void 0) { initial = false; }
        var _a = this, host = _a.host, parseOptionElement = _a.parseOptionElement;
        this.selectOptions = options
            ? clonedeep(options)
            : getAllNodes(host, 'wf-select-option, brml-select-option').map(parseOptionElement);
        if (this.value && initial) {
            this.handleValueChange(this.value);
            return;
        }
        this.initialOption = this.selectOptions.find(function (option) { return option.selected; });
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
    };
    class_1.prototype.closeSelect = function () {
        this.dropdown.opened = false;
    };
    class_1.prototype.renderOption = function (option, index) {
        var _a;
        var _b = this, selectedValue = _b.selectedValue, locked = _b.locked, handleSelectChange = _b.handleSelectChange, size = _b.size;
        var selectedByName = selectedValue === option.name ||
            (!!option.selectedName && selectedValue === option.selectedName);
        var optionClass = (_a = {},
            _a['form-select-option'] = true,
            _a["form-select-option-selected"] = selectedByName,
            _a["form-select-option-" + size] = true,
            _a);
        var optionProps = {
            'data-value': index,
            key: index,
            selected: !!option.selected,
            disabled: !!locked ? true : option.disabled,
        };
        return (h("li", Object.assign({ class: optionClass }, optionProps, { onClick: function () { return handleSelectChange(option); } }), !this.customRow ? h("a", null, " ", option.name) : h("div", { innerHTML: this.customRow(option) })));
    };
    class_1.prototype.renderListOptions = function (options) {
        var _a;
        var _this = this;
        var _b = this, searchStr = _b.searchStr, disabled = _b.disabled;
        var optionListClass = (_a = {},
            _a['form-select-list'] = true,
            _a);
        var filteredOption = options.filter(function (option) { return option.name.toLowerCase().includes(searchStr.toLowerCase()); });
        return (h("wf-dropdown", { ref: function (el) { return (_this.dropdown = el); }, class: "form-control-select-dropdown", disabled: disabled, parentSelector: ".form-group" }, h("ul", { tabindex: "-1", class: optionListClass }, filteredOption.map(function (option, index) { return _this.renderOption(option, index); }), h("slot", { name: "footer" }))));
    };
    class_1.prototype.renderLabel = function () {
        var _a, _b;
        var _c = this, label = _c.label, error = _c.error, required = _c.required, variant = _c.variant, type = _c.type, selectId = _c.selectId, inlineLabel = _c.inlineLabel, caption = _c.caption;
        // Supporting deprecated type and caption
        var inputVariant = type || variant;
        var displayCaption = !!caption && !label;
        var currentLabel = displayCaption ? caption : label;
        var labelClasses = (_a = {},
            _a["form-label"] = true,
            _a["form-label-inline"] = inlineLabel || displayCaption,
            _a["form-label-" + inputVariant] = inputVariant === 'inverse',
            _a["form-label-error"] = !!error,
            _a);
        var asteriskClasses = (_b = {},
            _b["error"] = !!error,
            _b['required'] = !error && !!required,
            _b);
        return (h("label", { "data-dropdown-trigger": true, class: labelClasses, htmlFor: selectId }, currentLabel, (!!error || !!required) && h("span", { class: asteriskClasses }, "*")));
    };
    class_1.prototype.renderButtonTrigger = function () {
        var _this = this;
        var _a = this, variant = _a.variant, disabled = _a.disabled, selectId = _a.selectId, placeholder = _a.placeholder, icon = _a.icon, iconSize = _a.iconSize, selectedValue = _a.selectedValue;
        var commomAttributes = {
            disabled: disabled,
            iconSize: iconSize,
            id: "form-element-" + selectId,
            'data-dropdown': "" + !disabled,
        };
        var buttonAttributes = Object.assign(Object.assign({}, commomAttributes), { icon: icon,
            variant: variant, class: !!placeholder && !selectedValue ? 'with-placeholder' : '' });
        return (h("wf-button", Object.assign({}, buttonAttributes, { ref: function (el) { return (_this.selectButton = el); }, iconPlacement: "right" }), placeholder));
    };
    class_1.prototype.renderInputTrigger = function () {
        var _a;
        var _this = this;
        var _b = this, type = _b.type, variant = _b.variant, size = _b.size, locked = _b.locked, disabled = _b.disabled, error = _b.error, selectId = _b.selectId, placeholder = _b.placeholder, icon = _b.icon, iconSize = _b.iconSize, searchIcon = _b.searchIcon, liveSearch = _b.liveSearch, selectType = _b.selectType;
        var commomAttributes = {
            disabled: disabled,
            iconSize: iconSize,
            id: "form-element-" + selectId,
            onChange: stopPropagation,
            onWfChange: stopPropagation,
            'data-dropdown': "" + !disabled,
        };
        var selectClasses = (_a = {},
            _a["form-control-select"] = true,
            _a);
        var inputAttributes;
        if (selectType !== 'button') {
            var inputVariant = variant === 'primary' || variant === 'secondary' || variant === 'inverse'
                ? type || variant
                : 'primary';
            inputAttributes = Object.assign(Object.assign({}, commomAttributes), { size: size,
                locked: locked,
                placeholder: placeholder,
                error: error, variant: inputVariant, class: selectClasses, readonly: !liveSearch, icon: liveSearch ? searchIcon : icon });
        }
        return h("wf-input", Object.assign({}, inputAttributes, { ref: function (el) { return (_this.selectInput = el); } }));
    };
    class_1.prototype.render = function () {
        var _a;
        var _b = this, variant = _b.variant, label = _b.label, caption = _b.caption, inlineLabel = _b.inlineLabel, error = _b.error, errorMessage = _b.errorMessage, selectOptions = _b.selectOptions, description = _b.description, selectType = _b.selectType;
        var containerClasses = (_a = {},
            _a["form-group"] = true,
            _a["inline-form-group"] = !!inlineLabel || (!!caption && !label),
            _a["form-group-" + variant] = variant === 'inverse',
            _a["form-group-" + selectType] = selectType === 'button',
            _a);
        return (h("wf-tooltip", Object.assign({}, prepareErrorTooltip(error, errorMessage)), h("div", { class: containerClasses }, (!!label || !!caption) && this.renderLabel(), h("div", { class: "form-control-wrapper" }, selectType === 'button' ? this.renderButtonTrigger() : this.renderInputTrigger(), selectOptions && this.renderListOptions(selectOptions)), !!description && h("div", { class: "form-control-description" }, description), showErrorMessage(error, errorMessage) && (h("div", { class: "form-control-error-message", innerHTML: errorMessage.text })))));
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
                "prefixLabel": ["handleDropdownChange"],
                "value": ["handleValueChange"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return ".all-caps{font-family:var(--all-caps-font-family,var(--font-family));font-weight:var(--all-caps-font-weight,var(--font-weight-bold,var(--font-weight,normal)));font-size:var(--all-caps-font-size,13px);line-height:var(--all-caps-line-height,15px);text-transform:var(--all-caps-text-transform,uppercase);letter-spacing:var(--all-caps-letter-spacing,1px)}.label-1{font-family:var(--label-1-font-family,var(--label-font-family));font-size:var(--label-1-font-size,var(--label-font-size));line-height:var(--label-1-line-height,var(--label-line-height));color:var(--label-1-color,var(--label-color));letter-spacing:var(--label-1-spacing,var(--label-letter-spacing));font-weight:var(--label-1-font-weight,var(--label-font-weight));text-transform:var(--label-1-text-transform,var(--label-text-transform))}.label-2{font-family:var(--label-2-font-family,var(--label-font-family));font-size:var(--label-2-font-size,var(--label-font-size));line-height:var(--label-2-line-height,var(--label-line-height));color:var(--label-2-color,var(--label-color));letter-spacing:var(--label-2-spacing,var(--label-letter-spacing));font-weight:var(--label-2-font-weight,var(--label-font-weight));text-transform:var(--label-2-text-transform,var(--label-text-transform))}.label-3{font-family:var(--label-3-font-family,var(--label-font-family));font-size:var(--label-3-font-size,var(--label-font-size));line-height:var(--label-3-line-height,var(--label-line-height));color:var(--label-3-color,var(--label-color));letter-spacing:var(--label-3-spacing,var(--label-letter-spacing));font-weight:var(--label-3-font-weight,var(--label-font-weight));text-transform:var(--label-3-text-transform,var(--label-text-transform))}.label-4{font-family:var(--label-4-font-family,var(--label-font-family));font-size:var(--label-4-font-size,var(--label-font-size));line-height:var(--label-4-line-height,var(--label-line-height));color:var(--label-4-color,var(--label-color));letter-spacing:var(--label-4-spacing,var(--label-letter-spacing));font-weight:var(--label-4-font-weight,var(--label-font-weight));text-transform:var(--label-4-text-transform,var(--label-text-transform))}.label-5{font-family:var(--label-5-font-family,var(--label-font-family));font-size:var(--label-5-font-size,var(--label-font-size));line-height:var(--label-5-line-height,var(--label-line-height));color:var(--label-5-color,var(--label-color));letter-spacing:var(--label-5-spacing,var(--label-letter-spacing));font-weight:var(--label-5-font-weight,var(--label-font-weight));text-transform:var(--label-5-text-transform,var(--label-text-transform))}.label-secondary{color:var(--label-secondary-color,var(--color-text-secondary,var(--text-secondary-color,#444)))}.label-tertiary{color:var(--label-tertiary-color,var(--text-tertiary-color,#646464))}.label-inverse{color:var(--label-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}:host{display:inline-block;vertical-align:var(--form-control-vertical-align,bottom)}.form-label,:host .form-tooltip{display:block}.form-label{font-family:var(--form-control-label-font-family);font-size:var(--form-control-label-font-size,var(--font-size-small,.9em));color:var(--form-control-label-color,var(--color-text-secondary,var(--text-secondary-color,#444)));line-height:var(--form-control-label-line-height);margin-bottom:var(--form-control-label-margin-bottom,var(--spacing-xxs,6px))}.form-label-inline{display:inline-block;text-align:right;padding-right:var(--form-control-label-inline-padding-right,var(--spacing-s,24px));padding-left:0;margin:0;width:var(--form-control-caption-width,var(--form-control-label-inline-width,25%));-ms-flex:1;flex:1}.form-label-locked{pointer-events:none}.form-label-error{color:var(--form-control-label-color-error,var(--form-control-error-label-color))}.form-label-inverse{color:var(--form-control-inverse-label-color,hsla(0,0%,100%,.8))}.form-label .required{color:var(--form-control-required-asterisk-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31))))}.form-label .error{color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-control{display:block;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:var(--form-control-font-family);font-weight:var(--form-control-font-weight);font-size:var(--form-control-font-size);border-width:0;border-style:var(--form-control-border-style,solid);border-radius:var(--form-control-border-radius);height:var(--form-control-size-m,var(--form-control-height,var(--spacing-m,36px)));-webkit-box-shadow:var(--form-control-box-shadow);box-shadow:var(--form-control-box-shadow)}.form-control-primary{color:var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));border-color:var(--form-control-border-color,var(--smoke,#919191));border-width:var(--form-control-border-width,1px);background:var(--form-control-background,var(--white,#fff));padding-left:var(--form-control-padding,var(--spacing-xs,12px));padding-right:var(--form-control-padding,var(--spacing-xs,12px))}.form-control-primary .form-control-required{border-color:var(--form-control-border-color-required,var(--form-control-required-border-color,var(--form-control-border-color,var(--smoke,#919191))))}.form-control-secondary{color:var(--form-control-secondary-color,var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))));border-color:var(--form-control-secondary-border-color,var(--form-control-border-color,var(--smoke,#919191)));border-width:var(--form-control-secondary-border-width,var(--form-control-border-width,1px));background:var(--form-control-secondary-background,var(--form-control-background,var(--white,#fff)));padding-left:var(--form-control-secondary-padding,var(--form-control-padding,var(--spacing-xs,12px)));padding-right:var(--form-control-secondary-padding,var(--form-control-padding,var(--spacing-xs,12px)))}.form-control-secondary .form-control-required{border-color:var(--form-control-secondary-required-border-color,var(--form-control-secondary-border-color,var(--form-control-border-color,var(--smoke,#919191))))}.form-control-inverse{color:var(--form-control-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));border-color:var(--form-control-inverse-border-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));border-width:var(--form-control-inverse-border-width,var(--form-control-border-width,1px));background:var(--form-control-inverse-background,transparent);padding-left:var(--form-control-inverse-padding,var(--form-control-padding,var(--spacing-xs,12px)));padding-right:var(--form-control-inverse-padding,var(--form-control-padding,var(--spacing-xs,12px)))}.form-control-inverse .form-control-required{border-color:var(--form-control-inverse-required-border-color,var(--form-control-inverse-border-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff)))))}.form-control-sm{height:var(--form-control-size-sm,var(--form-control-sm-height,var(--form-control-size-m,var(--form-control-height,var(--spacing-m,36px)))))}.form-control-icon-xs{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-xs, 16px))}.form-control-icon-xs+.form-control-icon-wrapper-xs,.form-control-icon-xs .form-control-arrow-xs{top:calc(50% - (var(--icon-size-xs, 16px) / 2) - var(--icon-padding-xs, 4px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-xs, 4px))}.form-control .input-arrow-xs{--icon-padding-xs:0}.form-control .input-arrow-xs.up{top:1px}.form-control .input-arrow-xs.down{top:50%}.form-control-icon-locked-xs{position:absolute;top:calc(50% - (var(--icon-size-xs, 16px) / 2) - var(--icon-padding-xs, 4px));left:0}.form-control-icon-locked-xs~input{text-indent:var(--icon-size-xs,16px)}.form-control-icon-sm{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-sm, 24px))}.form-control-icon-sm+.form-control-icon-wrapper-sm,.form-control-icon-sm .form-control-arrow-sm{top:calc(50% - (var(--icon-size-sm, 24px) / 2) - var(--icon-padding-sm, 6px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-sm, 6px))}.form-control .input-arrow-sm{--icon-padding-sm:0}.form-control .input-arrow-sm.up{top:1px}.form-control .input-arrow-sm.down{top:50%}.form-control-icon-locked-sm{position:absolute;top:calc(50% - (var(--icon-size-sm, 24px) / 2) - var(--icon-padding-sm, 6px));left:0}.form-control-icon-locked-sm~input{text-indent:var(--icon-size-sm,24px)}.form-control-icon-md{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-md, 36px))}.form-control-icon-md+.form-control-icon-wrapper-md,.form-control-icon-md .form-control-arrow-md{top:calc(50% - (var(--icon-size-md, 36px) / 2) - var(--icon-padding-md, 18px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-md, 18px))}.form-control .input-arrow-md{--icon-padding-md:0}.form-control .input-arrow-md.up{top:1px}.form-control .input-arrow-md.down{top:50%}.form-control-icon-locked-md{position:absolute;top:calc(50% - (var(--icon-size-md, 36px) / 2) - var(--icon-padding-md, 18px));left:0}.form-control-icon-locked-md~input{text-indent:var(--icon-size-md,36px)}.form-control-icon-lg{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-lg, 72px))}.form-control-icon-lg+.form-control-icon-wrapper-lg,.form-control-icon-lg .form-control-arrow-lg{top:calc(50% - (var(--icon-size-lg, 72px) / 2) - var(--icon-padding-lg, 12px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-lg, 12px))}.form-control .input-arrow-lg{--icon-padding-lg:0}.form-control .input-arrow-lg.up{top:1px}.form-control .input-arrow-lg.down{top:50%}.form-control-icon-locked-lg{position:absolute;top:calc(50% - (var(--icon-size-lg, 72px) / 2) - var(--icon-padding-lg, 12px));left:0}.form-control-icon-locked-lg~input{text-indent:var(--icon-size-lg,72px)}.form-control-icon-xl{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-xl, 96px))}.form-control-icon-xl+.form-control-icon-wrapper-xl,.form-control-icon-xl .form-control-arrow-xl{top:calc(50% - (var(--icon-size-xl, 96px) / 2) - var(--icon-padding-xl, 12px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-xl, 12px))}.form-control .input-arrow-xl{--icon-padding-xl:0}.form-control .input-arrow-xl.up{top:1px}.form-control .input-arrow-xl.down{top:50%}.form-control-icon-locked-xl{position:absolute;top:calc(50% - (var(--icon-size-xl, 96px) / 2) - var(--icon-padding-xl, 12px));left:0}.form-control-icon-locked-xl~input{text-indent:var(--icon-size-xl,96px)}.form-control-icon-locked-primary{left:var(--form-control-locked-icon-position-left)}.form-control-icon-locked-secondary{left:var(--form-control-secondary-locked-icon-position-left)}.form-control-icon-locked-inverse{left:var(--form-control-inverse-locked-icon-position-left)}.form-control-disabled,.form-control[disabled]{color:var(--form-control-font-color-disabled,var(--form-control-disabled-color,var(--text-disabled-color,#bebebe)));background:var(--form-control-background-disabled,var(--alto,#d7d7d7));border-color:var(--form-control-border-color-disabled,var(--form-control-disabled-border-color,var(--text-disabled-color,#bebebe)))}.form-control-disabled.form-control-inverse,.form-control[disabled].form-control-inverse{background:var(--form-control-inverse-background,transparent)}.form-control-disabled:focus,.form-control[disabled]:focus{outline:0}.form-control-locked{color:var(--form-control-font-color-locked,var(--form-control-locked-color,var(--form-control-font-color-disabled,var(--form-control-disabled-color,var(--text-disabled-color,#bebebe)))));background:var(--form-control-locked-background,var(--form-control-background-disabled,var(--alto,#d7d7d7)));border-color:var(--form-control-border-color-locked,var(--form-control-locked-border-color,var(--form-control-border-color-disabled,var(--form-control-disabled-border-color,var(--text-disabled-color,#bebebe)))));cursor:default}.form-control-locked.form-control-inverse{background:var(--form-control-inverse-background,transparent)}.form-control-error{border-color:var(--form-control-border-color-error,var(--form-control-error-border-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-control-error.form-control-inverse{border-color:var(--form-control-inverse-error-border-color)}.form-control::-webkit-input-placeholder{color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464))}.form-control::-webkit-input-placeholder,.form-control::placeholder{color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464))}.form-control.form-control-inverse::-webkit-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::-moz-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse:-ms-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::-ms-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control:active,.form-control:focus{outline:0}.form-control:active:not([disabled]):not(.form-control-disabled),.form-control:focus:not([disabled]):not(.form-control-disabled){border-color:var(--form-control-border-color-focus,var(--form-control-focus-border-color,var(--lagoon,#009ad2)))}.form-control:hover:not([disabled]):not(.form-control-disabled){border-color:var(--form-control-border-color-hover,var(--form-control-hover-border-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))))}.form-control:hover:not([disabled]):not(.form-control-disabled).form-control-inverse{border-color:var(--form-control-inverse-hover-border-color)}.form-control-error-message{font-family:var(--form-control-error-font-family);font-size:var(--form-control-error-font-size,.8em);font-style:var(--form-control-error-message-font-style,var(--form-control-error-font-style,italic));white-space:pre-line;color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))));margin-top:var(--form-control-error-message-margin-top,var(--form-control-error-margin-top,var(--spacing-xxs,6px)))}.form-control-description{font-family:var(--form-control-description-font-family);font-size:var(--form-control-description-font-size,.8em);font-style:var(--form-control-description-font-style);color:var(--form-control-description-color,var(--text-tertiary-color,#646464));white-space:pre-line;margin-top:var(--form-control-description-margin-top,var(--spacing-xxs,6px))}.form-control-icon-wrapper{position:absolute;cursor:pointer}.form-control-textarea{resize:none}.form-control-text-align-left,.form-control-text-align-left input{text-align:left}.form-control-text-align-center,.form-control-text-align-center input{text-align:center}.form-control-text-align-right,.form-control-text-align-right input{text-align:right}.form-control-wrapper{position:relative;min-width:var(--form-control-min-width,250px);max-width:var(--form-control-max-width,100%);width:100%}.form-control-wrapper .prefix{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;position:absolute;height:100%;width:auto;top:0;left:0;bottom:0;padding-left:var(--form-control-prefix-padding,var(--spacing-xxs,6px));padding-right:var(--form-control-prefix-padding,var(--spacing-xxs,6px));font-weight:var(--form-control-prefix-font-weight,var(--form-control-font-weight));font-size:var(--form-control-prefix-font-size,var(--form-control-font-size));color:var(--form-control-prefix-color,var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))))}.form-group{margin:var(--form-control-margin-top,0) var(--form-control-margin-right,0) var(--form-control-margin-bottom,0) var(--form-control-margin-left,0)}.form-group-inverse .form-control-icon-wrapper{--icon-color:var(--form-control-inverse-icon-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-group-inverse .form-control-icon-locked-inverse{--icon-color:var(--form-control-inverse-locked-icon-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-group-inverse .form-control-error-message{color:var(--form-control-inverse-error-color)}.form-group-inverse .form-control-description{color:var(--form-control-inverse-description-color)}.inline-form-group{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex-wrap:wrap;flex-wrap:wrap}.inline-form-group .form-control-error-message{width:100%;padding-left:var(--form-control-label-inline-padding-right,var(--spacing-s,24px));margin-left:var(--form-control-caption-width,var(--form-control-label-inline-width,25%))}.form-check{margin:var(--form-check-margin-top,0) var(--form-check-margin-right,0) var(--form-check-margin-bottom,var(--spacing-xs,12px)) var(--form-check-margin-left,0);font-family:var(--form-check-font-family);font-weight:var(--font-weight-normal,var(--font-weight,normal));font-size:var(--form-control-font-size)}.form-check:last-of-type{margin-bottom:0}.form-check input[type=checkbox],.form-check input[type=radio]{display:none}.form-check input[type=checkbox]+button,.form-check input[type=checkbox]+label,.form-check input[type=radio]+button,.form-check input[type=radio]+label{position:relative;display:inline-block;text-align:inherit}.form-check input[type=checkbox]+button.position-static,.form-check input[type=checkbox]+label.position-static,.form-check input[type=radio]+button.position-static,.form-check input[type=radio]+label.position-static{display:inline}.form-check input[type=checkbox]+button :after,.form-check input[type=checkbox]+label :after,.form-check input[type=radio]+button :after,.form-check input[type=radio]+label :after{content:none}.form-check input[type=checkbox]+button:after,.form-check input[type=checkbox]+button:before,.form-check input[type=checkbox]+label:after,.form-check input[type=checkbox]+label:before,.form-check input[type=radio]+button:after,.form-check input[type=radio]+button:before,.form-check input[type=radio]+label:after,.form-check input[type=radio]+label:before{content:\"\";position:absolute;display:inline-block}.form-check input[type=checkbox]+button:focus,.form-check input[type=checkbox]+label:focus,.form-check input[type=radio]+button:focus,.form-check input[type=radio]+label:focus{outline:none}.form-check input[type=checkbox]+button:focus:before,.form-check input[type=checkbox]+label:focus:before,.form-check input[type=radio]+button:focus:before,.form-check input[type=radio]+label:focus:before{border-color:var(--form-control-border-color-focus,var(--form-control-focus-border-color,var(--lagoon,#009ad2)))}.form-check.error input[type=checkbox]+label{color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-check.error input[type=checkbox]+label:before{border-color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-check.warning input[type=checkbox]+label{color:var(--color-text-warning,var(--text-warning-color,var(--warning,#7e5f16)))}.form-check.warning input[type=checkbox]+label:before{border-color:var(--color-text-warning,var(--text-warning-color,var(--warning,#7e5f16)))}.form-control-arrow{pointer-events:none;cursor:pointer;position:absolute;display:block}.form-control-select{font-family:var(--form-control-font-family);font-weight:var(--form-control-font-weight);font-size:var(--form-control-font-size);position:relative;display:block;width:100%;text-align:left;--form-control-margin-top:0;--form-control-margin-bottom:0;--form-control-margin-right:0;--form-control-margin-left:0;--input-min-width:100%;--input-max-width:100%;--input-width:100%}.form-control-select-dropdown{--dropdown-width:var(--form-select-list-width,var(--select-list-width,auto));--dropdown-min-width:var(--form-select-list-min-width,var(--select-list-min-width,250px));--dropdown-max-width:var(--select-list-max-width)}.select-search-input{--input-min-width:100%;--input-max-width:100%;--input-width:100%;--spacing-s:$form-search-input-margin;display:block}.form-control-wrapper{width:var(--select-width,var(--form-control-width,auto));min-width:var(--form-select-min-width,var(--select-min-width,var(--form-control-min-width,250px)));max-width:var(--form-select-max-width,var(--select-max-width,var(--form-control-max-width,100%)))}.form-control-wrapper .form-control{-ms-appearance:none;-moz-appearance:none;-webkit-appearance:none;appearance:none}.form-control-wrapper .form-control::-ms-expand{display:none}.form-control-wrapper .form-control-select{position:relative;text-align:left}.form-control-wrapper .form-control-select .value{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.form-control-wrapper .form-control-select .value .placeholder{color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464))}.form-control-wrapper .form-select-list{list-style:none;overflow-y:auto;overflow-x:hidden;max-height:var(--form-select-list-height,var(--select-list-height,300px));padding:var(--form-select-list-padding,var(--select-list-padding,var(--spacing-xxs,6px)));margin:0;-webkit-box-shadow:var(--form-select-box-shadow,var(--select-box-shadow,var(--form-control-box-shadow)));box-shadow:var(--form-select-box-shadow,var(--select-box-shadow,var(--form-control-box-shadow)));background-clip:padding-box;border-radius:var(--form-select-border-radius,var(--select-border-radius,var(--form-control-border-radius)));border:solid var(--form-select-border-width,var(--select-border-width,var(--form-control-border-width,1px))) var(--form-select-border-color,var(--select-border-color,var(--form-control-border-color,var(--smoke,#919191))))}.form-control-wrapper .form-select-list,.form-control-wrapper .form-select-list .form-select-option{background-color:var(--form-select-option-background,var(--select-option-background,var(--white,#fff)))}.form-control-wrapper .form-select-list .form-select-option{color:var(--form-select-option-color,var(--select-option-color));-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;min-height:var(--form-select-option-min-height,var(--select-option-min-height,var(--form-control-size-m,var(--form-control-height,var(--spacing-m,36px)))));padding:var(--form-select-option-padding,var(--select-option-padding,0 var(--form-control-padding,var(--spacing-xs,12px))));border:var(--form-select-option-border-width,var(--select-option-border-width,1px)) solid var(--form-select-option-border-color,var(--select-option-border-color,transparent));border-bottom:var(--form-select-option-border-width,var(--select-option-border-width,1px)) solid var(--form-select-divider-border-color,var(--select-divider-border-color,transparent))}.form-control-wrapper .form-select-list .form-select-option.form-select-option-sm{min-height:var(--form-control-size-sm,var(--form-control-sm-height,var(--form-control-size-m,var(--form-control-height,var(--spacing-m,36px)))))}.form-control-wrapper .form-select-list .form-select-option[disabled]{background:var(--form-control-background-disabled,var(--alto,#d7d7d7));color:var(--form-control-font-color-disabled,var(--form-control-disabled-color,var(--text-disabled-color,#bebebe)))}.form-control-wrapper .form-select-list .form-select-option:hover:not([disabled]):not(.form-control-disabled){text-decoration:none;cursor:pointer;color:var(--form-select-option-hover-color,var(--select-option-hover-color,var(--item-hovered-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))))));background-color:var(--form-select-option-hover-background,var(--select-option-hover-background,var(--item-hovered-background,var(--mercury,#e6e6e6))))}.form-control-wrapper .form-select-list .form-select-option-selected:not([disabled]):not(.form-control-disabled){text-decoration:none;color:var(--select-option-active-color,var(--form-control-option-active-color,var(--item-selected-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))))));background-color:var(--select-option-active-background,var(--form-control-option-active-background,var(--item-selected-background,var(--ice,#d3eaf3))))}.form-control-wrapper .form-select-list .form-select-option-focused:not([disabled]):not(.form-control-disabled){color:var(--form-select-option-focused-color,var(--select-option-focused-color,var(--item-focused-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))))));border-color:var(--form-select-option-focused-border-color,var(--select-option-focused-border-color,var(--item-focused-border-color,var(--lagoon,#009ad2))))}.form-control-wrapper .form-select-list .form-select-option a{display:inline-block;font-size:inherit}.form-group-button{--button-min-width:var(--form-select-button-min-width,var(--select-button-min-width,100px));--button-max-width:var(--form-select-button-max-width,var(--select-button-max-width,200px));--button-justify-content:var(--form-select-button-justify-content,var(--select-button-justify-content,space-between))}.form-group-button .with-placeholder{--button-primary-color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464));--button-secondary-color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464));--button-tertiary-color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464));--button-inverse-color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464));--button-link-color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464))}.form-group-button .form-control-wrapper{width:auto;min-width:0}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
__decorate([
    PrefixEvent()
], WfSelect.prototype, "change", void 0);
export { WfSelect as wf_select };