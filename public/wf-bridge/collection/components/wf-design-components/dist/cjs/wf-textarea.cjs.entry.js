'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-4cbc2ed1.js');
require('./_commonjsHelpers-72d386ba.js');
const utils = require('./utils-aa0a6419.js');
const customEventEmitter = require('./custom-event-emitter-f54d881b.js');

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
const WfTextarea = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        /** Decides if label has inline position */
        this.inlineLabel = false;
        /** Variant of textarea */
        this.variant = 'primary';
        /** Decides if textarea is disabled */
        this.disabled = false;
        /** Decides if textarea in locked state */
        this.locked = false;
        /** Decides if textarea has an error */
        this.error = false;
        /**Decides if textarea field required */
        this.required = false;
        this.formResetListener = () => {
            this.value = this.initialValue;
            this.change.emit(this.value);
        };
        this.handleChange = (event) => {
            const textarea = event.target;
            this.change.emit(textarea.value);
        };
        this.handleInput = (event) => {
            const textarea = event.target;
            this.value = textarea.value;
            this.wfInput.emit(textarea.value);
            // this is in case value was updated within the subscriber
            textarea.value = this.value;
        };
        this.handleFocus = () => {
            this.wfFocus.emit();
        };
        this.handleBlur = () => {
            this.wfBlur.emit();
        };
        this.wfInput = core.createEvent(this, "wfInput", 7);
        this.wfFocus = core.createEvent(this, "wfFocus", 7);
        this.wfBlur = core.createEvent(this, "wfBlur", 7);
        this.docChange = core.createEvent(this, "change", 7);
        this.docWfChange = core.createEvent(this, "wfChange", 7);
        this.docInput = core.createEvent(this, "input", 7);
        this.docFocus = core.createEvent(this, "focus", 7);
        this.docBlur = core.createEvent(this, "blur", 7);
    }
    /** To focus textarea element use setFocus method */
    async setFocus() {
        this.getNativeTextarea().focus();
    }
    /** Textarea select method */
    async selectText() {
        this.getNativeTextarea().select();
    }
    componentWillLoad() {
        const { textareaId, value } = this;
        this.initialValue = value;
        if (textareaId) {
            return;
        }
        this.textareaId = `form-element-${utils.generateUniqueId()}`;
    }
    getHost() {
        return this.host;
    }
    getNativeTextarea() {
        return this.getHost().shadowRoot.querySelector('textarea');
    }
    async updateInput(value) {
        this.value = value;
        this.wfInput.emit(value);
        this.change.emit(value);
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
    renderLabel(id) {
        const { error, variant, label, inlineLabel, caption, required } = this;
        const displayLabel = label || caption;
        const labelClasses = {
            [`form-label`]: true,
            [`form-label-inline`]: inlineLabel || (!!caption && !!!label),
            [`form-label-${variant}`]: variant === 'inverse',
            [`form-label-error`]: !!error,
        };
        const asteriskClasses = {
            [`error`]: !!error,
            ['required']: !error && !!required,
        };
        return (core.h("label", { class: labelClasses, htmlFor: id }, displayLabel, (!!error || !!required) && core.h("span", { class: asteriskClasses }, "*")));
    }
    render() {
        const { textareaId, variant, size, value, placeholder, disabled, error, errorMessage, locked, label, caption, description, maxlength, required, rows, cols, inlineLabel, handleFocus, handleBlur, handleChange, handleInput, } = this;
        const textareaClasses = {
            'form-control': true,
            'form-control-textarea': true,
            [`form-control-${variant}`]: !!variant,
            [`form-control-${size}`]: !!size && !!!rows,
            [`form-control-error`]: !!error,
            [`form-control-disabled`]: !!disabled,
            [`form-control-required`]: !!required,
            [`form-control-locked`]: !!locked,
        };
        const containerClasses = {
            [`form-group`]: true,
            [`form-group-${variant}`]: variant === 'inverse',
            [`inline-form-group`]: inlineLabel || (!!caption && !!!label),
        };
        const textareaAttributes = Object.assign(Object.assign({ id: textareaId, class: textareaClasses, disabled, readonly: !!locked, placeholder,
            value,
            rows,
            cols }, (maxlength ? { maxlength } : {})), { onChange: handleChange, onInput: handleInput, onFocus: handleFocus, onBlur: handleBlur });
        return (core.h("wf-tooltip", Object.assign({}, utils.prepareErrorTooltip(error, errorMessage)), core.h("div", { class: containerClasses }, (!!label || !!caption) && this.renderLabel(textareaId), core.h("div", { class: "form-control-wrapper" }, core.h("textarea", Object.assign({}, textareaAttributes))), !!description && core.h("div", { class: "form-control-description" }, description), utils.showErrorMessage(error, errorMessage) && (core.h("div", { class: "form-control-error-message" }, errorMessage.text)))));
    }
    get host() { return core.getElement(this); }
    static get style() { return ".all-caps{font-family:var(--all-caps-font-family,var(--font-family));font-weight:var(--all-caps-font-weight,var(--font-weight-bold,var(--font-weight,normal)));font-size:var(--all-caps-font-size,13px);line-height:var(--all-caps-line-height,15px);text-transform:var(--all-caps-text-transform,uppercase);letter-spacing:var(--all-caps-letter-spacing,1px)}.label-1{font-family:var(--label-1-font-family,var(--label-font-family));font-size:var(--label-1-font-size,var(--label-font-size));line-height:var(--label-1-line-height,var(--label-line-height));color:var(--label-1-color,var(--label-color));letter-spacing:var(--label-1-spacing,var(--label-letter-spacing));font-weight:var(--label-1-font-weight,var(--label-font-weight));text-transform:var(--label-1-text-transform,var(--label-text-transform))}.label-2{font-family:var(--label-2-font-family,var(--label-font-family));font-size:var(--label-2-font-size,var(--label-font-size));line-height:var(--label-2-line-height,var(--label-line-height));color:var(--label-2-color,var(--label-color));letter-spacing:var(--label-2-spacing,var(--label-letter-spacing));font-weight:var(--label-2-font-weight,var(--label-font-weight));text-transform:var(--label-2-text-transform,var(--label-text-transform))}.label-3{font-family:var(--label-3-font-family,var(--label-font-family));font-size:var(--label-3-font-size,var(--label-font-size));line-height:var(--label-3-line-height,var(--label-line-height));color:var(--label-3-color,var(--label-color));letter-spacing:var(--label-3-spacing,var(--label-letter-spacing));font-weight:var(--label-3-font-weight,var(--label-font-weight));text-transform:var(--label-3-text-transform,var(--label-text-transform))}.label-4{font-family:var(--label-4-font-family,var(--label-font-family));font-size:var(--label-4-font-size,var(--label-font-size));line-height:var(--label-4-line-height,var(--label-line-height));color:var(--label-4-color,var(--label-color));letter-spacing:var(--label-4-spacing,var(--label-letter-spacing));font-weight:var(--label-4-font-weight,var(--label-font-weight));text-transform:var(--label-4-text-transform,var(--label-text-transform))}.label-5{font-family:var(--label-5-font-family,var(--label-font-family));font-size:var(--label-5-font-size,var(--label-font-size));line-height:var(--label-5-line-height,var(--label-line-height));color:var(--label-5-color,var(--label-color));letter-spacing:var(--label-5-spacing,var(--label-letter-spacing));font-weight:var(--label-5-font-weight,var(--label-font-weight));text-transform:var(--label-5-text-transform,var(--label-text-transform))}.label-secondary{color:var(--label-secondary-color,var(--color-text-secondary,var(--text-secondary-color,#444)))}.label-tertiary{color:var(--label-tertiary-color,var(--text-tertiary-color,#646464))}.label-inverse{color:var(--label-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}:host{display:inline-block;vertical-align:var(--form-control-vertical-align,bottom)}.form-label,:host .form-tooltip{display:block}.form-label{font-family:var(--form-control-label-font-family);font-size:var(--form-control-label-font-size,var(--font-size-small,.9em));color:var(--form-control-label-color,var(--color-text-secondary,var(--text-secondary-color,#444)));line-height:var(--form-control-label-line-height);margin-bottom:var(--form-control-label-margin-bottom,var(--spacing-xxs,6px))}.form-label-inline{display:inline-block;text-align:right;padding-right:var(--form-control-label-inline-padding-right,var(--spacing-s,24px));padding-left:0;margin:0;width:var(--form-control-caption-width,var(--form-control-label-inline-width,25%));-ms-flex:1;flex:1}.form-label-locked{pointer-events:none}.form-label-error{color:var(--form-control-label-color-error,var(--form-control-error-label-color))}.form-label-inverse{color:var(--form-control-inverse-label-color,hsla(0,0%,100%,.8))}.form-label .required{color:var(--form-control-required-asterisk-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31))))}.form-label .error{color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-control{display:block;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:var(--form-control-font-family);font-weight:var(--form-control-font-weight);font-size:var(--form-control-font-size);border-width:0;border-style:var(--form-control-border-style,solid);border-radius:var(--form-control-border-radius);height:var(--form-control-size-m,var(--form-control-height,var(--spacing-m,36px)));-webkit-box-shadow:var(--form-control-box-shadow);box-shadow:var(--form-control-box-shadow)}.form-control-primary{color:var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));border-color:var(--form-control-border-color,var(--smoke,#919191));border-width:var(--form-control-border-width,1px);background:var(--form-control-background,var(--white,#fff));padding-left:var(--form-control-padding,var(--spacing-xs,12px));padding-right:var(--form-control-padding,var(--spacing-xs,12px))}.form-control-primary .form-control-required{border-color:var(--form-control-border-color-required,var(--form-control-required-border-color,var(--form-control-border-color,var(--smoke,#919191))))}.form-control-secondary{color:var(--form-control-secondary-color,var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))));border-color:var(--form-control-secondary-border-color,var(--form-control-border-color,var(--smoke,#919191)));border-width:var(--form-control-secondary-border-width,var(--form-control-border-width,1px));background:var(--form-control-secondary-background,var(--form-control-background,var(--white,#fff)));padding-left:var(--form-control-secondary-padding,var(--form-control-padding,var(--spacing-xs,12px)));padding-right:var(--form-control-secondary-padding,var(--form-control-padding,var(--spacing-xs,12px)))}.form-control-secondary .form-control-required{border-color:var(--form-control-secondary-required-border-color,var(--form-control-secondary-border-color,var(--form-control-border-color,var(--smoke,#919191))))}.form-control-inverse{color:var(--form-control-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));border-color:var(--form-control-inverse-border-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));border-width:var(--form-control-inverse-border-width,var(--form-control-border-width,1px));background:var(--form-control-inverse-background,transparent);padding-left:var(--form-control-inverse-padding,var(--form-control-padding,var(--spacing-xs,12px)));padding-right:var(--form-control-inverse-padding,var(--form-control-padding,var(--spacing-xs,12px)))}.form-control-inverse .form-control-required{border-color:var(--form-control-inverse-required-border-color,var(--form-control-inverse-border-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff)))))}.form-control-sm{height:var(--form-control-size-sm,var(--form-control-sm-height,var(--form-control-size-m,var(--form-control-height,var(--spacing-m,36px)))))}.form-control-icon-xs{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-xs, 16px))}.form-control-icon-xs+.form-control-icon-wrapper-xs,.form-control-icon-xs .form-control-arrow-xs{top:calc(50% - (var(--icon-size-xs, 16px) / 2) - var(--icon-padding-xs, 4px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-xs, 4px))}.form-control .input-arrow-xs{--icon-padding-xs:0}.form-control .input-arrow-xs.up{top:1px}.form-control .input-arrow-xs.down{top:50%}.form-control-icon-locked-xs{position:absolute;top:calc(50% - (var(--icon-size-xs, 16px) / 2) - var(--icon-padding-xs, 4px));left:0}.form-control-icon-locked-xs~input{text-indent:var(--icon-size-xs,16px)}.form-control-icon-sm{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-sm, 24px))}.form-control-icon-sm+.form-control-icon-wrapper-sm,.form-control-icon-sm .form-control-arrow-sm{top:calc(50% - (var(--icon-size-sm, 24px) / 2) - var(--icon-padding-sm, 6px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-sm, 6px))}.form-control .input-arrow-sm{--icon-padding-sm:0}.form-control .input-arrow-sm.up{top:1px}.form-control .input-arrow-sm.down{top:50%}.form-control-icon-locked-sm{position:absolute;top:calc(50% - (var(--icon-size-sm, 24px) / 2) - var(--icon-padding-sm, 6px));left:0}.form-control-icon-locked-sm~input{text-indent:var(--icon-size-sm,24px)}.form-control-icon-md{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-md, 36px))}.form-control-icon-md+.form-control-icon-wrapper-md,.form-control-icon-md .form-control-arrow-md{top:calc(50% - (var(--icon-size-md, 36px) / 2) - var(--icon-padding-md, 18px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-md, 18px))}.form-control .input-arrow-md{--icon-padding-md:0}.form-control .input-arrow-md.up{top:1px}.form-control .input-arrow-md.down{top:50%}.form-control-icon-locked-md{position:absolute;top:calc(50% - (var(--icon-size-md, 36px) / 2) - var(--icon-padding-md, 18px));left:0}.form-control-icon-locked-md~input{text-indent:var(--icon-size-md,36px)}.form-control-icon-lg{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-lg, 72px))}.form-control-icon-lg+.form-control-icon-wrapper-lg,.form-control-icon-lg .form-control-arrow-lg{top:calc(50% - (var(--icon-size-lg, 72px) / 2) - var(--icon-padding-lg, 12px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-lg, 12px))}.form-control .input-arrow-lg{--icon-padding-lg:0}.form-control .input-arrow-lg.up{top:1px}.form-control .input-arrow-lg.down{top:50%}.form-control-icon-locked-lg{position:absolute;top:calc(50% - (var(--icon-size-lg, 72px) / 2) - var(--icon-padding-lg, 12px));left:0}.form-control-icon-locked-lg~input{text-indent:var(--icon-size-lg,72px)}.form-control-icon-xl{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-xl, 96px))}.form-control-icon-xl+.form-control-icon-wrapper-xl,.form-control-icon-xl .form-control-arrow-xl{top:calc(50% - (var(--icon-size-xl, 96px) / 2) - var(--icon-padding-xl, 12px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-xl, 12px))}.form-control .input-arrow-xl{--icon-padding-xl:0}.form-control .input-arrow-xl.up{top:1px}.form-control .input-arrow-xl.down{top:50%}.form-control-icon-locked-xl{position:absolute;top:calc(50% - (var(--icon-size-xl, 96px) / 2) - var(--icon-padding-xl, 12px));left:0}.form-control-icon-locked-xl~input{text-indent:var(--icon-size-xl,96px)}.form-control-icon-locked-primary{left:var(--form-control-locked-icon-position-left)}.form-control-icon-locked-secondary{left:var(--form-control-secondary-locked-icon-position-left)}.form-control-icon-locked-inverse{left:var(--form-control-inverse-locked-icon-position-left)}.form-control-disabled,.form-control[disabled]{color:var(--form-control-font-color-disabled,var(--form-control-disabled-color,var(--text-disabled-color,#bebebe)));background:var(--form-control-background-disabled,var(--alto,#d7d7d7));border-color:var(--form-control-border-color-disabled,var(--form-control-disabled-border-color,var(--text-disabled-color,#bebebe)))}.form-control-disabled.form-control-inverse,.form-control[disabled].form-control-inverse{background:var(--form-control-inverse-background,transparent)}.form-control-disabled:focus,.form-control[disabled]:focus{outline:0}.form-control-locked{color:var(--form-control-font-color-locked,var(--form-control-locked-color,var(--form-control-font-color-disabled,var(--form-control-disabled-color,var(--text-disabled-color,#bebebe)))));background:var(--form-control-locked-background,var(--form-control-background-disabled,var(--alto,#d7d7d7)));border-color:var(--form-control-border-color-locked,var(--form-control-locked-border-color,var(--form-control-border-color-disabled,var(--form-control-disabled-border-color,var(--text-disabled-color,#bebebe)))));cursor:default}.form-control-locked.form-control-inverse{background:var(--form-control-inverse-background,transparent)}.form-control-error{border-color:var(--form-control-border-color-error,var(--form-control-error-border-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-control-error.form-control-inverse{border-color:var(--form-control-inverse-error-border-color)}.form-control::-webkit-input-placeholder{color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464))}.form-control::-webkit-input-placeholder,.form-control::placeholder{color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464))}.form-control.form-control-inverse::-webkit-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::-moz-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse:-ms-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::-ms-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control:active,.form-control:focus{outline:0}.form-control:active:not([disabled]):not(.form-control-disabled),.form-control:focus:not([disabled]):not(.form-control-disabled){border-color:var(--form-control-border-color-focus,var(--form-control-focus-border-color,var(--lagoon,#009ad2)))}.form-control:hover:not([disabled]):not(.form-control-disabled){border-color:var(--form-control-border-color-hover,var(--form-control-hover-border-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))))}.form-control:hover:not([disabled]):not(.form-control-disabled).form-control-inverse{border-color:var(--form-control-inverse-hover-border-color)}.form-control-error-message{font-family:var(--form-control-error-font-family);font-size:var(--form-control-error-font-size,.8em);font-style:var(--form-control-error-message-font-style,var(--form-control-error-font-style,italic));white-space:pre-line;color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))));margin-top:var(--form-control-error-message-margin-top,var(--form-control-error-margin-top,var(--spacing-xxs,6px)))}.form-control-description{font-family:var(--form-control-description-font-family);font-size:var(--form-control-description-font-size,.8em);font-style:var(--form-control-description-font-style);color:var(--form-control-description-color,var(--text-tertiary-color,#646464));white-space:pre-line;margin-top:var(--form-control-description-margin-top,var(--spacing-xxs,6px))}.form-control-icon-wrapper{position:absolute;cursor:pointer}.form-control-textarea{resize:none}.form-control-text-align-left,.form-control-text-align-left input{text-align:left}.form-control-text-align-center,.form-control-text-align-center input{text-align:center}.form-control-text-align-right,.form-control-text-align-right input{text-align:right}.form-control-wrapper{position:relative;min-width:var(--form-control-min-width,250px);max-width:var(--form-control-max-width,100%);width:100%}.form-control-wrapper .prefix{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;position:absolute;height:100%;width:auto;top:0;left:0;bottom:0;padding-left:var(--form-control-prefix-padding,var(--spacing-xxs,6px));padding-right:var(--form-control-prefix-padding,var(--spacing-xxs,6px));font-weight:var(--form-control-prefix-font-weight,var(--form-control-font-weight));font-size:var(--form-control-prefix-font-size,var(--form-control-font-size));color:var(--form-control-prefix-color,var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))))}.form-group{margin:var(--form-control-margin-top,0) var(--form-control-margin-right,0) var(--form-control-margin-bottom,0) var(--form-control-margin-left,0)}.form-group-inverse .form-control-icon-wrapper{--icon-color:var(--form-control-inverse-icon-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-group-inverse .form-control-icon-locked-inverse{--icon-color:var(--form-control-inverse-locked-icon-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-group-inverse .form-control-error-message{color:var(--form-control-inverse-error-color)}.form-group-inverse .form-control-description{color:var(--form-control-inverse-description-color)}.inline-form-group{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex-wrap:wrap;flex-wrap:wrap}.inline-form-group .form-control-error-message{width:100%;padding-left:var(--form-control-label-inline-padding-right,var(--spacing-s,24px));margin-left:var(--form-control-caption-width,var(--form-control-label-inline-width,25%))}.form-check{margin:var(--form-check-margin-top,0) var(--form-check-margin-right,0) var(--form-check-margin-bottom,var(--spacing-xs,12px)) var(--form-check-margin-left,0);font-family:var(--form-check-font-family);font-weight:var(--font-weight-normal,var(--font-weight,normal));font-size:var(--form-control-font-size)}.form-check:last-of-type{margin-bottom:0}.form-check input[type=checkbox],.form-check input[type=radio]{display:none}.form-check input[type=checkbox]+button,.form-check input[type=checkbox]+label,.form-check input[type=radio]+button,.form-check input[type=radio]+label{position:relative;display:inline-block;text-align:inherit}.form-check input[type=checkbox]+button.position-static,.form-check input[type=checkbox]+label.position-static,.form-check input[type=radio]+button.position-static,.form-check input[type=radio]+label.position-static{display:inline}.form-check input[type=checkbox]+button :after,.form-check input[type=checkbox]+label :after,.form-check input[type=radio]+button :after,.form-check input[type=radio]+label :after{content:none}.form-check input[type=checkbox]+button:after,.form-check input[type=checkbox]+button:before,.form-check input[type=checkbox]+label:after,.form-check input[type=checkbox]+label:before,.form-check input[type=radio]+button:after,.form-check input[type=radio]+button:before,.form-check input[type=radio]+label:after,.form-check input[type=radio]+label:before{content:\"\";position:absolute;display:inline-block}.form-check input[type=checkbox]+button:focus,.form-check input[type=checkbox]+label:focus,.form-check input[type=radio]+button:focus,.form-check input[type=radio]+label:focus{outline:none}.form-check input[type=checkbox]+button:focus:before,.form-check input[type=checkbox]+label:focus:before,.form-check input[type=radio]+button:focus:before,.form-check input[type=radio]+label:focus:before{border-color:var(--form-control-border-color-focus,var(--form-control-focus-border-color,var(--lagoon,#009ad2)))}.form-check.error input[type=checkbox]+label{color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-check.error input[type=checkbox]+label:before{border-color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-check.warning input[type=checkbox]+label{color:var(--color-text-warning,var(--text-warning-color,var(--warning,#7e5f16)))}.form-check.warning input[type=checkbox]+label:before{border-color:var(--color-text-warning,var(--text-warning-color,var(--warning,#7e5f16)))}.form-control-wrapper{width:var(--textarea-width,var(--form-control-width,auto));min-width:var(--textarea-min-width,var(--form-control-min-width,250px));max-width:var(--textarea-max-width,var(--form-control-max-width,100%))}.form-control-textarea{display:block;width:100%}.form-control-textarea.form-control-primary{padding:var(--textarea-padding,var(--form-control-padding,var(--spacing-xs,12px)));min-height:var(--textarea-min-height,calc(2 * var(--spacing-xl, 72px)))}.form-control-textarea.form-control-secondary{padding:var(--textarea-secondary-padding,var(--textarea-padding,var(--form-control-padding,var(--spacing-xs,12px))));min-height:var(--textarea-secondary-min-height,var(--textarea-min-height,calc(2 * var(--spacing-xl, 72px))))}.form-control-textarea.form-control-inverse{padding:var(--textarea-inverse-padding,var(--textarea-padding,var(--form-control-padding,var(--spacing-xs,12px))));min-height:var(--textarea-inverse-min-height,var(--textarea-min-height,calc(2 * var(--spacing-xl, 72px))))}"; }
};
__decorate([
    customEventEmitter.PrefixEvent()
], WfTextarea.prototype, "change", void 0);

exports.wf_textarea = WfTextarea;
