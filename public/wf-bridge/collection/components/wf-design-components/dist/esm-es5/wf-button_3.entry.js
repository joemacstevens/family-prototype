var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, c as createEvent, h, g as getElement } from './core-2ee2b62e.js';
import './_commonjsHelpers-97e6d7b1.js';
import { r as removePX, h as setPX, g as generateUniqueId, a as showErrorMessage, b as prepareErrorTooltip } from './utils-9974937e.js';
import { D as DropdownTriggerType, a as KeyValue } from './types-bc604d28.js';
import { P as PrefixEvent } from './custom-event-emitter-d3f4fc52.js';
var WfButton = /** @class */ (function () {
    function class_1(hostRef) {
        var _this_1 = this;
        registerInstance(this, hostRef);
        /** Type of button */
        this.type = 'submit';
        /** Variant of button. DEPRECATED! 'link', 'success', 'warning', 'info', 'danger' */
        this.variant = 'primary';
        /** Define if icon should be shown before or after text */
        this.iconPlacement = 'left';
        /** Icon size */
        this.iconSize = 'sm';
        this.handleClick = function () {
            var _a = _this_1, type = _a.type, submit = _a.submit, reset = _a.reset;
            var form = _this_1.selectForm();
            if (type === 'submit' && form) {
                submit(form);
            }
            else if (type === 'reset' && form) {
                reset(form);
            }
            _this_1.wfClick.emit();
        };
        this.handleOnFocus = function () {
            _this_1.wfFocus.emit();
        };
        this.handleOnBlur = function () {
            _this_1.wfBlur.emit();
        };
        this.wfClick = createEvent(this, "wfClick", 7);
        this.wfFocus = createEvent(this, "wfFocus", 7);
        this.wfBlur = createEvent(this, "wfBlur", 7);
        this.docClick = createEvent(this, "click", 7);
        this.docFocus = createEvent(this, "focus", 7);
        this.docBlur = createEvent(this, "blur", 7);
    }
    /** Button focus method */
    class_1.prototype.setFocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.getNativeButton().focus();
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.captureButtonClick = function (e) {
        if (this.disabled) {
            e.stopPropagation();
        }
    };
    class_1.prototype.getHost = function () {
        return this.host;
    };
    class_1.prototype.getNativeButton = function () {
        return this.getHost().shadowRoot.querySelector('button');
    };
    class_1.prototype.submit = function (form) {
        var tempSubmit = document.createElement('button');
        tempSubmit.type = 'submit';
        tempSubmit.style.visibility = 'hidden';
        form.appendChild(tempSubmit);
        tempSubmit.click();
        tempSubmit.remove();
    };
    class_1.prototype.reset = function (form) {
        form.reset();
    };
    class_1.prototype.selectForm = function () {
        return this.host.closest('form');
    };
    class_1.prototype.render = function () {
        var _a;
        var _b = this, type = _b.type, variant = _b.variant, size = _b.size, disabled = _b.disabled, active = _b.active, icon = _b.icon, iconPlacement = _b.iconPlacement, iconType = _b.iconType, iconSize = _b.iconSize, handleClick = _b.handleClick, handleOnFocus = _b.handleOnFocus, handleOnBlur = _b.handleOnBlur;
        var classes = (_a = {
                btn: true
            },
            _a["btn-" + variant] = true,
            _a["btn-" + size] = !!size,
            _a["btn-typeicon"] = !!icon,
            _a["btn-" + variant + "-typeicon"] = !!icon,
            _a["btn-typeicon-" + iconPlacement] = !!icon,
            _a.disabled = !!disabled,
            _a.active = !!active && !disabled,
            _a);
        return (h("button", { type: type, class: classes, disabled: !!disabled, onClick: handleClick, onFocus: handleOnFocus, onBlur: handleOnBlur }, !!icon && iconPlacement === 'left' ? (h("wf-icon", { class: "btn-icon", name: icon, size: iconSize, type: iconType })) : null, h("span", { class: "btn-text" }, h("slot", null)), !!icon && iconPlacement === 'right' ? (h("wf-icon", { class: "btn-icon", name: icon, size: iconSize, type: iconType })) : null));
    };
    Object.defineProperty(class_1.prototype, "host", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return ":host{display:inline-block;vertical-align:var(--button-vertical-align,var(--form-control-vertical-align,bottom))}.btn{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:var(--button-justify-content,center);justify-content:var(--button-justify-content,center);font-size:var(--button-font-size);font-family:var(--button-font-family);font-weight:var(--button-font-weight,var(--font-weight-normal,var(--font-weight,normal)));margin:var(--button-margin-top,0) var(--button-margin-right,0) var(--button-margin-bottom,0) var(--button-margin-left,0);padding:var(--button-padding-vertical,0) var(--button-padding-horizontal,var(--spacing-xs,12px));cursor:pointer;border:1px solid transparent;border-radius:var(--button-border-radius,0);text-transform:var(--button-text-transform,uppercase);line-height:1;min-width:var(--button-min-width,50px);max-width:var(--button-max-width,400px);min-height:var(--button-min-height,var(--spacing-m,36px));background-color:transparent;-webkit-appearance:none;position:relative}.btn-icon{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-negative:0;flex-shrink:0;-ms-flex-positive:0;flex-grow:0}.btn-icon,.btn-text{position:relative;z-index:3}.btn-text{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.btn:before{z-index:1}.btn:after,.btn:before{content:\"\";position:absolute;left:0;right:0;top:0;bottom:0;background-color:transparent}.btn:after{z-index:2}.btn:focus:not([disabled]){outline:var(--button-focus-outline,var(--color-highlight,var(--highlight-color,var(--lagoon,#009ad2))) auto 1px)}.btn:focus:active{outline:none}.btn-typeicon{--icon-color:var(--button-icon-icon-color,#1c1c1c);--icon-padding-xxs:0;--icon-padding-xs:0;--icon-padding-sm:0;--icon-padding-md:0;--icon-padding-lg:0;--icon-padding-xl:0}.btn-typeicon-left .btn-text{margin-left:var(--spacing-xxs,6px)}.btn-typeicon-right .btn-text{margin-right:var(--spacing-xxs,6px)}.btn-typeicon:not([disabled]):focus,.btn-typeicon:not([disabled]):hover{--icon-color:var(--button-icon-icon-hover-color,var(--brand-2-background,#444))}.btn-typeicon:not([disabled]).active,.btn-typeicon:not([disabled]):active{--icon-color:var(--button-icon-icon-color,#1c1c1c)}.btn-typeicon[disabled]{--icon-color:var(--button-icon-icon-disabled-color,var(--button-icon-disabled-color,#bebebe))}.btn-primary{color:var(--button-primary-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));border-color:var(--button-primary-border-color,transparent);border-width:var(--button-primary-border-width,0)}.btn-primary:before{background-color:var(--button-primary-background,var(--brand-2-background,#444));mix-blend-mode:var(--button-primary-blend-mode,normal)}.btn-primary:after{background-color:var(--button-primary-overlay-background,transparent);mix-blend-mode:var(--button-primary-overlay-blend-mode,normal)}.btn-primary-typeicon{--icon-color:var(--button-primary-icon-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.btn-primary-typeicon:not([disabled]):focus,.btn-primary-typeicon:not([disabled]):hover{--icon-color:var(--button-primary-icon-hover-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.btn-primary-typeicon:not([disabled]).active,.btn-primary-typeicon:not([disabled]):active{--icon-color:var(--button-primary-icon-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.btn-primary-typeicon[disabled]{--icon-color:var(--button-primary-icon-disabled-color,var(--button-primary-disabled-color,#bebebe))}.btn-primary[disabled]{color:var(--button-primary-disabled-color,#bebebe);border-width:var(--button-primary-disabled-border-width,0);border-color:var(--button-primary-disabled-border-color,transparent)}.btn-primary[disabled]:before{background-color:var(--button-primary-disabled-background,#d7d7d7)}.btn-primary:not([disabled]):focus,.btn-primary:not([disabled]):hover{-webkit-text-decoration:var(--button-text-decoration-hover,var(--button-primary-hover-text-decoration,none));text-decoration:var(--button-text-decoration-hover,var(--button-primary-hover-text-decoration,none));border-color:var(--button-primary-hover-border-color,transparent);border-width:var(--button-primary-hover-border-width,0)}.btn-primary:not([disabled]):focus:before,.btn-primary:not([disabled]):hover:before{background-color:var(--button-primary-background-hover,var(--button-primary-hover-background,#1c1c1c))}.btn-primary:not([disabled]):focus:after,.btn-primary:not([disabled]):hover:after{background-color:var(--button-primary-overlay-hover-background,transparent)}.btn-primary:not([disabled]).active,.btn-primary:not([disabled]):active{border-color:var(--button-primary-active-border-color,transparent);border-width:var(--button-primary-active-border-width,0)}.btn-primary:not([disabled]).active:before,.btn-primary:not([disabled]):active:before{background-color:var(--button-primary-background-active,var(--button-primary-active-background,#646464))}.btn-primary:not([disabled]).active:after,.btn-primary:not([disabled]):active:after{background-color:var(--button-primary-overlay-active-background,transparent)}.btn-secondary{color:var(--button-secondary-color,var(--brand-2-background,#444));border-color:var(--button-secondary-border-color,transparent);border-width:var(--button-secondary-border-width,0)}.btn-secondary:before{background-color:var(--button-secondary-background,#ebdecd);mix-blend-mode:var(--button-secondary-blend-mode,normal)}.btn-secondary:after{background-color:var(--button-secondary-overlay-background,transparent);mix-blend-mode:var(--button-secondary-overlay-blend-mode,multiply)}.btn-secondary-typeicon{--icon-color:var(--button-secondary-icon-color,var(--button-icon-icon-color,#1c1c1c))}.btn-secondary-typeicon:not([disabled]):focus,.btn-secondary-typeicon:not([disabled]):hover{--icon-color:var(--button-secondary-icon-hover-color,var(--button-icon-hover-color,var(--link-hover-color)))}.btn-secondary-typeicon:not([disabled]).active,.btn-secondary-typeicon:not([disabled]):active{--icon-color:var(--button-secondary-icon-color,var(--button-icon-icon-color,#1c1c1c))}.btn-secondary-typeicon[disabled]{--icon-color:var(--button-secondary-icon-disabled-color,var(--button-secondary-disabled-color,#bebebe))}.btn-secondary[disabled]{color:var(--button-secondary-disabled-color,#bebebe);border-width:var(--button-secondary-disabled-border-width,0);border-color:var(--button-secondary-disabled-border-color,transparent)}.btn-secondary[disabled]:before{background-color:var(--button-secondary-disabled-background,#d7d7d7)}.btn-secondary:not([disabled]):focus,.btn-secondary:not([disabled]):hover{-webkit-text-decoration:var(--button-text-decoration-hover,var(--button-secondary-hover-text-decoration,none));text-decoration:var(--button-text-decoration-hover,var(--button-secondary-hover-text-decoration,none));border-color:var(--button-secondary-border-color-hover,var(--button-secondary-hover-border-color,hsla(0,0%,90.2%,.6)));border-width:var(--button-secondary-hover-border-width,0)}.btn-secondary:not([disabled]):focus:before,.btn-secondary:not([disabled]):hover:before{background-color:var(--button-secondary-hover-background,#ebdecd)}.btn-secondary:not([disabled]):focus:after,.btn-secondary:not([disabled]):hover:after{background-color:var(--button-secondary-overlay-hover-background,hsla(0,0%,90.2%,.6))}.btn-secondary:not([disabled]).active,.btn-secondary:not([disabled]):active{border-color:var(--button-secondary-active-border-color,hsla(0,0%,90.2%,.3));border-width:var(--button-secondary-active-border-width,0)}.btn-secondary:not([disabled]).active:before,.btn-secondary:not([disabled]):active:before{background-color:var(--button-secondary-active-background,#ebdecd)}.btn-secondary:not([disabled]).active:after,.btn-secondary:not([disabled]):active:after{background-color:var(--button-secondary-overlay-active-background,hsla(0,0%,90.2%,.3))}.btn-tertiary{color:var(--button-tertiary-color,var(--brand-2-background,#444));border-color:var(--button-tertiary-border-color,var(--brand-2-background,#444));border-width:var(--button-tertiary-border-width,1px)}.btn-tertiary:before{background-color:var(--button-tertiary-background,transparent);mix-blend-mode:var(--button-tertiary-blend-mode,normal)}.btn-tertiary:after{background-color:var(--button-tertiary-overlay-background,transparent);mix-blend-mode:var(--button-tertiary-overlay-blend-mode,multiply)}.btn-tertiary-typeicon{--icon-color:var(--button-tertiary-icon-color,var(--button-icon-icon-color,#1c1c1c))}.btn-tertiary-typeicon:not([disabled]):focus,.btn-tertiary-typeicon:not([disabled]):hover{--icon-color:var(--button-tertiary-icon-hover-color,var(--button-icon-hover-color,var(--link-hover-color)))}.btn-tertiary-typeicon:not([disabled]).active,.btn-tertiary-typeicon:not([disabled]):active{--icon-color:var(--button-tertiary-icon-color,var(--button-icon-icon-color,#1c1c1c))}.btn-tertiary-typeicon[disabled]{--icon-color:var(--button-tertiary-icon-disabled-color,var(--button-tertiary-disabled-color,#bebebe))}.btn-tertiary[disabled]{color:var(--button-tertiary-disabled-color,#bebebe);border-width:var(--button-tertiary-disabled-border-width,1px);border-color:var(--button-tertiary-disabled-border-color,#d7d7d7)}.btn-tertiary[disabled]:before{background-color:var(--button-tertiary-disabled-background,transparent)}.btn-tertiary:not([disabled]):focus,.btn-tertiary:not([disabled]):hover{-webkit-text-decoration:var(--button-text-decoration-hover,var(--button-tertiary-hover-text-decoration,none));text-decoration:var(--button-text-decoration-hover,var(--button-tertiary-hover-text-decoration,none));border-color:var(--button-tertiary-hover-border-color,#1c1c1c);border-width:var(--button-tertiary-hover-border-width,1px)}.btn-tertiary:not([disabled]):focus:before,.btn-tertiary:not([disabled]):hover:before{background-color:var(--button-tertiary-background-hover,var(--button-tertiary-hover-background,transparent))}.btn-tertiary:not([disabled]):focus:after,.btn-tertiary:not([disabled]):hover:after{background-color:var(--button-tertiary-overlay-hover-background,hsla(0,0%,80%,.5))}.btn-tertiary:not([disabled]).active,.btn-tertiary:not([disabled]):active{border-color:var(--button-tertiary-active-border-color,#646464);border-width:var(--button-tertiary-active-border-width,1px)}.btn-tertiary:not([disabled]).active:before,.btn-tertiary:not([disabled]):active:before{background-color:var(--button-tertiary-background-active,var(--button-tertiary-active-background,transparent))}.btn-tertiary:not([disabled]).active:after,.btn-tertiary:not([disabled]):active:after{background-color:var(--button-tertiary-overlay-active-background,hsla(0,0%,80%,.3))}.btn-inverse{color:var(--button-inverse-color,#fff);border-color:var(--button-inverse-border-color,#fff);border-width:var(--button-inverse-border-width,1px)}.btn-inverse:before{background-color:var(--button-inverse-background,transparent);mix-blend-mode:var(--button-inverse-blend-mode,multiply)}.btn-inverse:after{background-color:var(--button-inverse-overlay-background,transparent);mix-blend-mode:var(--button-inverse-overlay-blend-mode,multiply)}.btn-inverse-typeicon{--icon-color:var(--button-inverse-icon-color,#fff)}.btn-inverse-typeicon:not([disabled]):focus,.btn-inverse-typeicon:not([disabled]):hover{--icon-color:var(--button-inverse-icon-hover-color,#fff)}.btn-inverse-typeicon:not([disabled]).active,.btn-inverse-typeicon:not([disabled]):active{--icon-color:var(--button-inverse-icon-color,#fff)}.btn-inverse-typeicon[disabled]{--icon-color:var(--button-inverse-icon-disabled-color,var(--button-inverse-disabled-color,#bebebe))}.btn-inverse[disabled]{color:var(--button-inverse-disabled-color,#bebebe);border-width:var(--button-inverse-disabled-border-width,1px);border-color:var(--button-inverse-disabled-border-color,#d7d7d7)}.btn-inverse[disabled]:before{background-color:var(--button-inverse-disabled-background,transparent)}.btn-inverse:not([disabled]):focus,.btn-inverse:not([disabled]):hover{-webkit-text-decoration:var(--button-text-decoration-hover,var(--button-inverse-hover-text-decoration,none));text-decoration:var(--button-text-decoration-hover,var(--button-inverse-hover-text-decoration,none));border-color:var(--button-inverse-hover-border-color,#fff);border-width:var(--button-inverse-hover-border-width,1px)}.btn-inverse:not([disabled]):focus:before,.btn-inverse:not([disabled]):hover:before{background-color:var(--button-inverse-hover-background,#ccc)}.btn-inverse:not([disabled]):focus:after,.btn-inverse:not([disabled]):hover:after{background-color:var(--button-inverse-overlay-hover-background,hsla(0,0%,80%,.4))}.btn-inverse:not([disabled]).active,.btn-inverse:not([disabled]):active{border-color:var(--button-inverse-active-border-color,#fff);border-width:var(--button-inverse-active-border-width,1px)}.btn-inverse:not([disabled]).active:before,.btn-inverse:not([disabled]):active:before{background-color:var(--button-inverse-active-background,#ccc)}.btn-inverse:not([disabled]).active:after,.btn-inverse:not([disabled]):active:after{background-color:var(--button-inverse-overlay-active-background,hsla(0,0%,80%,.05))}.btn-sm{min-height:var(--button-size-sm,var(--spacing-m,36px));padding:var(--button-padding-vertical-sm,0) var(--button-padding-horizontal-sm,var(--spacing-xs,12px))}.btn-md{min-height:var(--button-size-m,48px);padding:var(--button-padding-vertical-m,0) var(--button-padding-horizontal-m,var(--spacing-xs,12px))}.btn-lg{min-height:var(--button-size-lg,60px);padding:var(--button-padding-vertical-lg,0) var(--button-padding-horizontal-lg,var(--spacing-xs,12px))}.btn-link{background:var(--button-link-background,transparent);color:var(--button-link-color,var(--button-icon-color,var(--link-color,#006286)));border:1px solid var(--button-link-border-color,var(--button-icon-border-color,transparent))}.btn-link:not([disabled]):hover{-webkit-text-decoration:var(--button-link-hover-text-decoration,var(--button-text-decoration-hover,var(--button-icon-hover-text-decoration,none)));text-decoration:var(--button-link-hover-text-decoration,var(--button-text-decoration-hover,var(--button-icon-hover-text-decoration,none)))}.btn-link:not([disabled]):focus,.btn-link:not([disabled]):hover{color:var(--button-link-hover-color,var(--button-icon-hover-color,var(--link-hover-color)));border:1px solid var(--button-link-hover-border-color,var(--button-icon-hover-border-color,transparent))}.btn-link:not([disabled]).active,.btn-link:not([disabled]):active{color:var(--button-link-color-active,var(--button-link-color,var(--button-icon-color,var(--link-color,#006286))));text-decoration:none;border:1px solid var(--button-icon-active-border-color,transparent)}.btn-link[disabled]{color:var(--button-icon-disabled-color,#bebebe);text-decoration:none}.btn-success{background:var(--button-background-success,#eff4f1);border-color:var(--button-background-success,#eff4f1);color:var(--button-color-success,#498100)}.btn-success:hover:not([disabled]){text-decoration:underline}.btn-success:focus:not([disabled]),.btn-success:hover:not([disabled]){background:var(--button-background-success-hover,#d3d8d5);border-color:var(--button-background-success-hover,#d3d8d5)}.btn-success.active:not([disabled]),.btn-success:active:not([disabled]){background:var(--button-background-success-active,#d3d8d5);border-color:var(--button-background-success-active,#d3d8d5)}.btn-info{background:var(--button-background-info,#5a6f89);border-color:var(--button-background-info,#5a6f89);color:var(--button-color-info,#fff)}.btn-info:hover:not([disabled]){text-decoration:underline}.btn-info:focus:not([disabled]),.btn-info:hover:not([disabled]){background:var(--button-background-info-hover,#55667a);border-color:var(--button-background-info-hover,#55667a)}.btn-info.active:not([disabled]),.btn-info:active:not([disabled]){background:var(--button-background-info-active,#55667a);border-color:var(--button-background-info-active,#55667a)}.btn-warning{background:var(--button-background-warning,#fff3da);border-color:var(--button-background-warning,#fff3da);color:var(--button-color-warning,#1c1c1c)}.btn-warning:hover:not([disabled]){text-decoration:underline}.btn-warning:focus:not([disabled]),.btn-warning:hover:not([disabled]){background:var(--button-background-warning-hover,#e9dfca);border-color:var(--button-background-warning-hover,#e9dfca)}.btn-warning.active:not([disabled]),.btn-warning:active:not([disabled]){background:var(--button-background-warning-active,#e9dfca);border-color:var(--button-background-warning-active,#e9dfca)}.btn-danger{background:var(--button-background-danger,#f7e1df);border-color:var(--button-background-danger,#f7e1df);color:var(--button-color-danger,#c81219)}.btn-danger:hover:not([disabled]){text-decoration:underline}.btn-danger:focus:not([disabled]),.btn-danger:hover:not([disabled]){background:var(--button-background-danger-hover,#dfc9c7);border-color:var(--button-background-danger-hover,#dfc9c7)}.btn-danger.active:not([disabled]),.btn-danger:active:not([disabled]){background:var(--button-background-danger-active,#dfc9c7);border-color:var(--button-background-danger-active,#dfc9c7)}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
var DropdownVerticalState;
(function (DropdownVerticalState) {
    DropdownVerticalState[DropdownVerticalState["OPEN_BOTTOM"] = 0] = "OPEN_BOTTOM";
    DropdownVerticalState[DropdownVerticalState["OPEN_TOP"] = 1] = "OPEN_TOP";
    DropdownVerticalState[DropdownVerticalState["OPEN_OVERLAP"] = 2] = "OPEN_OVERLAP";
    DropdownVerticalState[DropdownVerticalState["SCROLL"] = 3] = "SCROLL";
})(DropdownVerticalState || (DropdownVerticalState = {}));
var DropdownHorizontalState;
(function (DropdownHorizontalState) {
    DropdownHorizontalState[DropdownHorizontalState["OPEN_ALIGNED"] = 0] = "OPEN_ALIGNED";
    DropdownHorizontalState[DropdownHorizontalState["OPEN_OVERLAP"] = 1] = "OPEN_OVERLAP";
    DropdownHorizontalState[DropdownHorizontalState["SCROLL"] = 2] = "SCROLL";
})(DropdownHorizontalState || (DropdownHorizontalState = {}));
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
var WfDropdown = /** @class */ (function () {
    function WfDropdown(hostRef) {
        var _this_1 = this;
        registerInstance(this, hostRef);
        this.opened = false;
        /** Define if closing on scroll active **/
        this.scrollSensitive = false;
        /** Define if dropdown available to open **/
        this.disabled = false;
        /** Define if dropdown aling with parent **/
        this.alignWithParent = true;
        /** Define should we adjust height **/
        this.adjustHeight = false;
        this.manualMaxWidth = false;
        this.manualWidth = false;
        this.toggleDropdown = function (ev) {
            if (_this_1.disabled)
                return;
            switch (_this_1.dropdownParent.dataset.dropdown) {
                case DropdownTriggerType.OPEN_ONLY:
                    _this_1.opened = true;
                    break;
                case DropdownTriggerType.OPEN_ONLY_WITH_ICON:
                    _this_1.opened = ev
                        .composedPath()
                        .some(function (element) { return element.nodeName && element.nodeName.toLowerCase().includes('icon'); })
                        ? !_this_1.opened
                        : true;
                    break;
                case false.toString():
                    break;
                default:
                    _this_1.opened = !_this_1.opened;
            }
        };
        this.toggleTrigger = function (ev) {
            if (_this_1.disabled)
                return;
            var targetElement = ev.composedPath ? ev.composedPath()[0] : _this_1.dropdownTriggers[0];
            if (targetElement.dataset.dropdownTrigger === undefined)
                return;
            _this_1.opened =
                targetElement.dataset.dropdownTrigger === DropdownTriggerType.OPEN_ONLY ? true : !_this_1.opened;
        };
        this.checkPlacement = function () {
            var _a = _this_1, dropdown = _a.dropdown, dropdownParent = _a.dropdownParent, alignWithParent = _a.alignWithParent, manualWidth = _a.manualWidth;
            if (!_this_1.opened || !_this_1.dropdownParent)
                return;
            dropdown.style.transform = '';
            var rect = dropdown.getBoundingClientRect();
            dropdown.style.transform = "translate(" + _this_1.calculateHorizontalPosition(dropdown, document.body.clientWidth, rect) + "px, -" + _this_1.calculateVerticalValue(dropdown, rect, dropdownParent.getBoundingClientRect(), window.innerHeight) + "px)";
            if (alignWithParent && !manualWidth)
                dropdown.style.width = dropdownParent.offsetWidth + "px";
            requestAnimationFrame(_this_1.checkPlacement);
        };
        this.docToggle = createEvent(this, "toggle", 7);
        this.docWfToggle = createEvent(this, "wfToggle", 7);
    }
    WfDropdown.prototype.componentDidLoad = function () {
        var _this_1 = this;
        var parentNode = this.parentSelector && this.host.closest(this.parentSelector)
            ? this.host.closest(this.parentSelector)
            : this.host.parentNode;
        this.dropdownParent = this.host.parentNode.querySelector('[data-dropdown]');
        this.dropdownTriggers = parentNode.querySelectorAll('[data-dropdown-trigger]');
        if (this.dropdownParent) {
            this.dropdownParent.addEventListener('click', this.toggleDropdown);
        }
        if (this.dropdownTriggers.length > 0) {
            this.dropdownTriggers.forEach(function (trigger) { return trigger.addEventListener('click', _this_1.toggleTrigger); });
        }
    };
    WfDropdown.prototype.componentDidRender = function () {
        if (this.opened) {
            this.manualMaxWidth = !isNaN(parseFloat(window.getComputedStyle(this.dropdown).maxWidth));
            this.manualWidth =
                this.dropdown.offsetWidth !== document.body.offsetWidth &&
                    this.dropdownParent.classList.contains('form-control-select');
            this.checkPlacement();
            return;
        }
        this.dropdown && this.dropdown.removeAttribute('style');
    };
    WfDropdown.prototype.componentDidUnload = function () {
        var _this_1 = this;
        if (this.dropdownParent) {
            this.dropdownParent.removeEventListener('click', this.toggleDropdown);
        }
        if (Array.isArray(this.dropdownTriggers) && this.dropdownTriggers.length > 0) {
            this.dropdownTriggers.forEach(function (trigger) { return trigger.removeEventListener('click', _this_1.toggleTrigger); });
        }
    };
    WfDropdown.prototype.handleOpenedChange = function () {
        this.emitEvent();
    };
    WfDropdown.prototype.onGlobalScroll = function () {
        if (!this.scrollSensitive)
            return;
        this.closeSelect();
    };
    WfDropdown.prototype.closeSelect = function () {
        if (!this.opened)
            return;
        this.opened = false;
    };
    WfDropdown.prototype.handleKeydown = function (ev) {
        if (ev.key === KeyValue.ESC_KEY && this.opened) {
            ev.preventDefault();
            this.closeSelect();
        }
    };
    WfDropdown.prototype.clickOutside = function (event) {
        if (!this.opened)
            return;
        var clickPath = [];
        if (event.composedPath)
            clickPath = event.composedPath();
        var triggers = __spreadArrays([this.host, this.dropdownParent], Array.from(this.dropdownTriggers));
        if (!clickPath.some(function (trigger) { return triggers.includes(trigger); }))
            this.closeSelect();
    };
    WfDropdown.prototype.calculateVerticalValue = function (dropdown, rect, parentRect, windowHeight) {
        var verticalState = this.getVerticalState(windowHeight, rect, parentRect);
        if (this.adjustHeight)
            dropdown.firstElementChild.assignedElements()[0].style.height =
                dropdown.offsetWidth === dropdown.scrollWidth ? '' : 'auto';
        dropdown.style.maxHeight = windowHeight + "px";
        switch (verticalState) {
            case DropdownVerticalState.OPEN_BOTTOM:
                return rect.top - parentRect.bottom;
            case DropdownVerticalState.OPEN_TOP:
                return rect.bottom - parentRect.top;
            case DropdownVerticalState.SCROLL:
                dropdown.style.overflow = 'auto';
            case DropdownVerticalState.OPEN_OVERLAP:
                return rect.bottom - windowHeight;
        }
    };
    WfDropdown.prototype.calculateHorizontalPosition = function (dropdown, windowWidth, rect) {
        var state = (function () {
            if (rect.width > windowWidth)
                return DropdownHorizontalState.SCROLL;
            if (rect.right > windowWidth)
                return DropdownHorizontalState.OPEN_OVERLAP;
            return DropdownHorizontalState.OPEN_ALIGNED;
        })();
        if (!this.manualMaxWidth)
            dropdown.style.maxWidth = windowWidth + "px";
        switch (state) {
            case DropdownHorizontalState.OPEN_ALIGNED:
                return 0;
            case DropdownHorizontalState.SCROLL:
                dropdown.style.overflow = 'auto';
            case DropdownHorizontalState.OPEN_OVERLAP:
                return windowWidth - rect.right;
        }
    };
    WfDropdown.prototype.getVerticalState = function (windowHeight, rect, parentRect) {
        if (rect.height > windowHeight)
            return DropdownVerticalState.SCROLL;
        if (windowHeight - parentRect.bottom > rect.height)
            return DropdownVerticalState.OPEN_BOTTOM;
        if (parentRect.top > rect.height)
            return DropdownVerticalState.OPEN_TOP;
        return DropdownVerticalState.OPEN_OVERLAP;
    };
    WfDropdown.prototype.emitEvent = function () {
        this.toggle.emit(this.opened);
    };
    WfDropdown.prototype.render = function () {
        var _a;
        var _this_1 = this;
        var dropdownClasses = (_a = {},
            _a['dropdown'] = true,
            _a['dropdown-opened'] = !!this.opened,
            _a['dropdown-aligned'] = !!this.alignWithParent,
            _a);
        return (h("div", { ref: function (el) { return (_this_1.dropdown = el); }, class: dropdownClasses }, h("slot", null)));
    };
    Object.defineProperty(WfDropdown.prototype, "host", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WfDropdown, "watchers", {
        get: function () {
            return {
                "opened": ["handleOpenedChange"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WfDropdown, "style", {
        get: function () { return ".dropdown{position:fixed;z-index:var(--select-z-index,1000);display:none}.dropdown-opened{display:block;min-width:var(--dropdown-min-width,100px)}.dropdown-aligned{max-width:var(--dropdown-max-width);width:var(--dropdown-width,auto)}"; },
        enumerable: true,
        configurable: true
    });
    return WfDropdown;
}());
__decorate([
    PrefixEvent()
], WfDropdown.prototype, "toggle", void 0);
function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
            return typeof obj;
        };
    }
    else {
        _typeof = function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
            descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
        _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    }
    else {
        obj[key] = value;
    }
    return obj;
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null)
        return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0)
            continue;
        target[key] = source[key];
    }
    return target;
}
function _objectWithoutProperties(source, excluded) {
    if (source == null)
        return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0)
                continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key))
                continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object);
        if (object === null)
            break;
    }
    return object;
}
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    }
    else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base)
                return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}
function set(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
        set = Reflect.set;
    }
    else {
        set = function set(target, property, value, receiver) {
            var base = _superPropBase(target, property);
            var desc;
            if (base) {
                desc = Object.getOwnPropertyDescriptor(base, property);
                if (desc.set) {
                    desc.set.call(receiver, value);
                    return true;
                }
                else if (!desc.writable) {
                    return false;
                }
            }
            desc = Object.getOwnPropertyDescriptor(receiver, property);
            if (desc) {
                if (!desc.writable) {
                    return false;
                }
                desc.value = value;
                Object.defineProperty(receiver, property, desc);
            }
            else {
                _defineProperty(receiver, property, value);
            }
            return true;
        };
    }
    return set(target, property, value, receiver);
}
function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);
    if (!s && isStrict) {
        throw new Error('failed to set property');
    }
    return value;
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
        return arr;
}
function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i)
                break;
        }
    }
    catch (err) {
        _d = true;
        _e = err;
    }
    finally {
        try {
            if (!_n && _i["return"] != null)
                _i["return"]();
        }
        finally {
            if (_d)
                throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
/** Checks if value is string */
function isString(str) {
    return typeof str === 'string' || str instanceof String;
}
/**
  Direction
  @prop {string} NONE
  @prop {string} LEFT
  @prop {string} FORCE_LEFT
  @prop {string} RIGHT
  @prop {string} FORCE_RIGHT
*/
var DIRECTION = {
    NONE: 'NONE',
    LEFT: 'LEFT',
    FORCE_LEFT: 'FORCE_LEFT',
    RIGHT: 'RIGHT',
    FORCE_RIGHT: 'FORCE_RIGHT'
    /**
      Direction
      @enum {string}
    */
};
/** */
function forceDirection(direction) {
    switch (direction) {
        case DIRECTION.LEFT:
            return DIRECTION.FORCE_LEFT;
        case DIRECTION.RIGHT:
            return DIRECTION.FORCE_RIGHT;
        default:
            return direction;
    }
}
/** Escapes regular expression control chars */
function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
} // cloned from https://github.com/epoberezkin/fast-deep-equal with small changes
function objectIncludes(b, a) {
    if (a === b)
        return true;
    var arrA = Array.isArray(a), arrB = Array.isArray(b), i;
    if (arrA && arrB) {
        if (a.length != b.length)
            return false;
        for (i = 0; i < a.length; i++) {
            if (!objectIncludes(a[i], b[i]))
                return false;
        }
        return true;
    }
    if (arrA != arrB)
        return false;
    if (a && b && _typeof(a) === 'object' && _typeof(b) === 'object') {
        var dateA = a instanceof Date, dateB = b instanceof Date;
        if (dateA && dateB)
            return a.getTime() == b.getTime();
        if (dateA != dateB)
            return false;
        var regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
        if (regexpA && regexpB)
            return a.toString() == b.toString();
        if (regexpA != regexpB)
            return false;
        var keys = Object.keys(a); // if (keys.length !== Object.keys(b).length) return false;
        for (i = 0; i < keys.length; i++) {
            if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
                return false;
        }
        for (i = 0; i < keys.length; i++) {
            if (!objectIncludes(b[keys[i]], a[keys[i]]))
                return false;
        }
        return true;
    }
    else if (a && b && typeof a === 'function' && typeof b === 'function') {
        return a.toString() === b.toString();
    }
    return false;
}
/* eslint-disable no-undef */
var g = typeof window !== 'undefined' && window || typeof global !== 'undefined' && global.global === global && global || typeof self !== 'undefined' && self.self === self && self || {};
/* eslint-enable no-undef */
/** Selection range */
/** Provides details of changing input */
var ActionDetails = 
/*#__PURE__*/
function () {
    /** Current input value */
    /** Current cursor position */
    /** Old input value */
    /** Old selection */
    function ActionDetails(value, cursorPos, oldValue, oldSelection) {
        _classCallCheck(this, ActionDetails);
        this.value = value;
        this.cursorPos = cursorPos;
        this.oldValue = oldValue;
        this.oldSelection = oldSelection; // double check if left part was changed (autofilling, other non-standard input triggers)
        while (this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos)) {
            --this.oldSelection.start;
        }
    }
    /**
      Start changing position
      @readonly
    */
    _createClass(ActionDetails, [{
            key: "startChangePos",
            get: function get() {
                return Math.min(this.cursorPos, this.oldSelection.start);
            }
            /**
              Inserted symbols count
              @readonly
            */
        }, {
            key: "insertedCount",
            get: function get() {
                return this.cursorPos - this.startChangePos;
            }
            /**
              Inserted symbols
              @readonly
            */
        }, {
            key: "inserted",
            get: function get() {
                return this.value.substr(this.startChangePos, this.insertedCount);
            }
            /**
              Removed symbols count
              @readonly
            */
        }, {
            key: "removedCount",
            get: function get() {
                // Math.max for opposite operation
                return Math.max(this.oldSelection.end - this.startChangePos || // for Delete
                    this.oldValue.length - this.value.length, 0);
            }
            /**
              Removed symbols
              @readonly
            */
        }, {
            key: "removed",
            get: function get() {
                return this.oldValue.substr(this.startChangePos, this.removedCount);
            }
            /**
              Unchanged head symbols
              @readonly
            */
        }, {
            key: "head",
            get: function get() {
                return this.value.substring(0, this.startChangePos);
            }
            /**
              Unchanged tail symbols
              @readonly
            */
        }, {
            key: "tail",
            get: function get() {
                return this.value.substring(this.startChangePos + this.insertedCount);
            }
            /**
              Remove direction
              @readonly
            */
        }, {
            key: "removeDirection",
            get: function get() {
                if (!this.removedCount || this.insertedCount)
                    return DIRECTION.NONE; // align right if delete at right or if range removed (event with backspace)
                return this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos ? DIRECTION.RIGHT : DIRECTION.LEFT;
            }
        }]);
    return ActionDetails;
}();
/**
  Provides details of changing model value
  @param {Object} [details]
  @param {string} [details.inserted] - Inserted symbols
  @param {boolean} [details.skip] - Can skip chars
  @param {number} [details.removeCount] - Removed symbols count
  @param {number} [details.tailShift] - Additional offset if any changes occurred before tail
*/
var ChangeDetails = 
/*#__PURE__*/
function () {
    /** Inserted symbols */
    /** Can skip chars */
    /** Additional offset if any changes occurred before tail */
    /** Raw inserted is used by dynamic mask */
    function ChangeDetails(details) {
        _classCallCheck(this, ChangeDetails);
        Object.assign(this, {
            inserted: '',
            rawInserted: '',
            skip: false,
            tailShift: 0
        }, details);
    }
    /**
      Aggregate changes
      @returns {ChangeDetails} `this`
    */
    _createClass(ChangeDetails, [{
            key: "aggregate",
            value: function aggregate(details) {
                this.rawInserted += details.rawInserted;
                this.skip = this.skip || details.skip;
                this.inserted += details.inserted;
                this.tailShift += details.tailShift;
                return this;
            }
            /** Total offset considering all changes */
        }, {
            key: "offset",
            get: function get() {
                return this.tailShift + this.inserted.length;
            }
        }]);
    return ChangeDetails;
}();
/** Provides details of continuous extracted tail */
var ContinuousTailDetails = 
/*#__PURE__*/
function () {
    /** Tail value as string */
    /** Tail start position */
    /** Start position */
    function ContinuousTailDetails() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var stop = arguments.length > 2 ? arguments[2] : undefined;
        _classCallCheck(this, ContinuousTailDetails);
        this.value = value;
        this.from = from;
        this.stop = stop;
    }
    _createClass(ContinuousTailDetails, [{
            key: "toString",
            value: function toString() {
                return this.value;
            }
        }, {
            key: "extend",
            value: function extend(tail) {
                this.value += String(tail);
            }
        }, {
            key: "appendTo",
            value: function appendTo(masked) {
                return masked.append(this.toString(), {
                    tail: true
                }).aggregate(masked._appendPlaceholder());
            }
        }, {
            key: "shiftBefore",
            value: function shiftBefore(pos) {
                if (this.from >= pos || !this.value.length)
                    return '';
                var shiftChar = this.value[0];
                this.value = this.value.slice(1);
                return shiftChar;
            }
        }, {
            key: "state",
            get: function get() {
                return {
                    value: this.value,
                    from: this.from,
                    stop: this.stop
                };
            },
            set: function set(state) {
                Object.assign(this, state);
            }
        }]);
    return ContinuousTailDetails;
}();
/** Provides common masking stuff */
var Masked = 
/*#__PURE__*/
function () {
    // $Shape<MaskedOptions>; TODO after fix https://github.com/facebook/flow/issues/4773
    /** @type {Mask} */
    /** */
    // $FlowFixMe no ideas
    /** Transforms value before mask processing */
    /** Validates if value is acceptable */
    /** Does additional processing in the end of editing */
    /** Enable characters overwriting */
    /** */
    function Masked(opts) {
        _classCallCheck(this, Masked);
        this._value = '';
        this._update(opts);
        this.isInitialized = true;
    }
    /** Sets and applies new options */
    _createClass(Masked, [{
            key: "updateOptions",
            value: function updateOptions(opts) {
                if (!Object.keys(opts).length)
                    return;
                this.withValueRefresh(this._update.bind(this, opts));
            }
            /**
              Sets new options
              @protected
            */
        }, {
            key: "_update",
            value: function _update(opts) {
                Object.assign(this, opts);
            }
            /** Mask state */
        }, {
            key: "reset",
            /** Resets value */
            value: function reset() {
                this._value = '';
            }
            /** */
        }, {
            key: "resolve",
            /** Resolve new value */
            value: function resolve(value) {
                this.reset();
                this.append(value, {
                    input: true
                }, '');
                this.doCommit();
                return this.value;
            }
            /** */
        }, {
            key: "nearestInputPos",
            /** Finds nearest input position in direction */
            value: function nearestInputPos(cursorPos, direction) {
                return cursorPos;
            }
            /** Extracts value in range considering flags */
        }, {
            key: "extractInput",
            value: function extractInput() {
                var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
                return this.value.slice(fromPos, toPos);
            }
            /** Extracts tail in range */
        }, {
            key: "extractTail",
            value: function extractTail() {
                var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
                return new ContinuousTailDetails(this.extractInput(fromPos, toPos), fromPos);
            }
            /** Appends tail */
            // $FlowFixMe no ideas
        }, {
            key: "appendTail",
            value: function appendTail(tail) {
                if (isString(tail))
                    tail = new ContinuousTailDetails(String(tail));
                return tail.appendTo(this);
            }
            /** Appends char */
        }, {
            key: "_appendCharRaw",
            value: function _appendCharRaw(ch) {
                var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                ch = this.doPrepare(ch, flags);
                if (!ch)
                    return new ChangeDetails();
                this._value += ch;
                return new ChangeDetails({
                    inserted: ch,
                    rawInserted: ch
                });
            }
            /** Appends char */
        }, {
            key: "_appendChar",
            value: function _appendChar(ch) {
                var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var checkTail = arguments.length > 2 ? arguments[2] : undefined;
                var consistentState = this.state;
                var details = this._appendCharRaw(ch, flags);
                if (details.inserted) {
                    var consistentTail;
                    var appended = this.doValidate(flags) !== false;
                    if (appended && checkTail != null) {
                        // validation ok, check tail
                        var beforeTailState = this.state;
                        if (this.overwrite) {
                            consistentTail = checkTail.state;
                            checkTail.shiftBefore(this.value.length);
                        }
                        var tailDetails = this.appendTail(checkTail);
                        appended = tailDetails.rawInserted === checkTail.toString(); // if ok, rollback state after tail
                        if (appended && tailDetails.inserted)
                            this.state = beforeTailState;
                    } // revert all if something went wrong
                    if (!appended) {
                        details.rawInserted = details.inserted = '';
                        this.state = consistentState;
                        if (checkTail && consistentTail)
                            checkTail.state = consistentTail;
                    }
                }
                return details;
            }
            /** Appends optional placeholder at end */
        }, {
            key: "_appendPlaceholder",
            value: function _appendPlaceholder() {
                return new ChangeDetails();
            }
            /** Appends symbols considering flags */
            // $FlowFixMe no ideas
        }, {
            key: "append",
            value: function append(str, flags, tail) {
                if (!isString(str))
                    throw new Error('value should be string');
                var details = new ChangeDetails();
                var checkTail = isString(tail) ? new ContinuousTailDetails(String(tail)) : tail;
                if (flags.tail)
                    flags._beforeTailState = this.state;
                for (var ci = 0; ci < str.length; ++ci) {
                    details.aggregate(this._appendChar(str[ci], flags, checkTail));
                } // append tail but aggregate only tailShift
                if (checkTail != null) {
                    details.tailShift += this.appendTail(checkTail).tailShift; // TODO it's a good idea to clear state after appending ends
                    // but it causes bugs when one append calls another (when dynamic dispatch set rawInputValue)
                    // this._resetBeforeTailState();
                }
                return details;
            }
            /** */
        }, {
            key: "remove",
            value: function remove() {
                var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
                this._value = this.value.slice(0, fromPos) + this.value.slice(toPos);
                return new ChangeDetails();
            }
            /** Calls function and reapplies current value */
        }, {
            key: "withValueRefresh",
            value: function withValueRefresh(fn) {
                if (this._refreshing || !this.isInitialized)
                    return fn();
                this._refreshing = true;
                var unmasked = this.unmaskedValue;
                var value = this.value;
                var ret = fn(); // try to update with raw value first to keep fixed chars
                if (this.resolve(value) !== value) {
                    // or fallback to unmasked
                    this.unmaskedValue = unmasked;
                }
                delete this._refreshing;
                return ret;
            }
            /**
              Prepares string before mask processing
              @protected
            */
        }, {
            key: "doPrepare",
            value: function doPrepare(str) {
                var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                return this.prepare ? this.prepare(str, this, flags) : str;
            }
            /**
              Validates if value is acceptable
              @protected
            */
        }, {
            key: "doValidate",
            value: function doValidate(flags) {
                return (!this.validate || this.validate(this.value, this, flags)) && (!this.parent || this.parent.doValidate(flags));
            }
            /**
              Does additional processing in the end of editing
              @protected
            */
        }, {
            key: "doCommit",
            value: function doCommit() {
                if (this.commit)
                    this.commit(this.value, this);
            }
            /** */
        }, {
            key: "splice",
            value: function splice(start, deleteCount, inserted, removeDirection) {
                var tailPos = start + deleteCount;
                var tail = this.extractTail(tailPos);
                var startChangePos = this.nearestInputPos(start, removeDirection);
                var changeDetails = new ChangeDetails({
                    tailShift: startChangePos - start // adjust tailShift if start was aligned
                }).aggregate(this.remove(startChangePos)).aggregate(this.append(inserted, {
                    input: true
                }, tail));
                return changeDetails;
            }
        }, {
            key: "state",
            get: function get() {
                return {
                    _value: this.value
                };
            },
            set: function set(state) {
                this._value = state._value;
            }
        }, {
            key: "value",
            get: function get() {
                return this._value;
            },
            set: function set(value) {
                this.resolve(value);
            }
        }, {
            key: "unmaskedValue",
            get: function get() {
                return this.value;
            },
            set: function set(value) {
                this.reset();
                this.append(value, {}, '');
                this.doCommit();
            }
            /** */
        }, {
            key: "typedValue",
            get: function get() {
                return this.unmaskedValue;
            },
            set: function set(value) {
                this.unmaskedValue = value;
            }
            /** Value that includes raw user input */
        }, {
            key: "rawInputValue",
            get: function get() {
                return this.extractInput(0, this.value.length, {
                    raw: true
                });
            },
            set: function set(value) {
                this.reset();
                this.append(value, {
                    raw: true
                }, '');
                this.doCommit();
            }
            /** */
        }, {
            key: "isComplete",
            get: function get() {
                return true;
            }
        }]);
    return Masked;
}();
/** Get Masked class by mask type */
function maskedClass(mask) {
    if (mask == null) {
        throw new Error('mask property should be defined');
    }
    if (mask instanceof RegExp)
        return g.IMask.MaskedRegExp;
    if (isString(mask))
        return g.IMask.MaskedPattern;
    if (mask instanceof Date || mask === Date)
        return g.IMask.MaskedDate;
    if (mask instanceof Number || typeof mask === 'number' || mask === Number)
        return g.IMask.MaskedNumber;
    if (Array.isArray(mask) || mask === Array)
        return g.IMask.MaskedDynamic; // $FlowFixMe
    if (mask.prototype instanceof g.IMask.Masked)
        return mask; // $FlowFixMe
    if (mask instanceof Function)
        return g.IMask.MaskedFunction;
    console.warn('Mask not found for mask', mask); // eslint-disable-line no-console
    return g.IMask.Masked;
}
/** Creates new {@link Masked} depending on mask type */
function createMask(opts) {
    opts = Object.assign({}, opts);
    var mask = opts.mask;
    if (mask instanceof g.IMask.Masked)
        return mask;
    var MaskedClass = maskedClass(mask);
    return new MaskedClass(opts);
}
var DEFAULT_INPUT_DEFINITIONS = {
    '0': /\d/,
    'a': /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
    // http://stackoverflow.com/a/22075070
    '*': /./
};
/** */
var PatternInputDefinition = 
/*#__PURE__*/
function () {
    /** */
    /** */
    /** */
    /** */
    /** */
    /** */
    function PatternInputDefinition(opts) {
        _classCallCheck(this, PatternInputDefinition);
        var mask = opts.mask, blockOpts = _objectWithoutProperties(opts, ["mask"]);
        this.masked = createMask({
            mask: mask
        });
        Object.assign(this, blockOpts);
    }
    _createClass(PatternInputDefinition, [{
            key: "reset",
            value: function reset() {
                this._isFilled = false;
                this.masked.reset();
            }
        }, {
            key: "remove",
            value: function remove() {
                var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
                if (fromPos === 0 && toPos >= 1) {
                    this._isFilled = false;
                    return this.masked.remove(fromPos, toPos);
                }
                return new ChangeDetails();
            }
        }, {
            key: "_appendChar",
            value: function _appendChar(str) {
                var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                if (this._isFilled)
                    return new ChangeDetails();
                var state = this.masked.state; // simulate input
                var details = this.masked._appendChar(str, flags);
                if (details.inserted && this.doValidate(flags) === false) {
                    details.inserted = details.rawInserted = '';
                    this.masked.state = state;
                }
                if (!details.inserted && !this.isOptional && !this.lazy && !flags.input) {
                    details.inserted = this.placeholderChar;
                }
                details.skip = !details.inserted && !this.isOptional;
                this._isFilled = Boolean(details.inserted);
                return details;
            }
        }, {
            key: "append",
            value: function append() {
                var _this$masked;
                return (_this$masked = this.masked).append.apply(_this$masked, arguments);
            }
        }, {
            key: "_appendPlaceholder",
            value: function _appendPlaceholder() {
                var details = new ChangeDetails();
                if (this._isFilled || this.isOptional)
                    return details;
                this._isFilled = true;
                details.inserted = this.placeholderChar;
                return details;
            }
        }, {
            key: "extractTail",
            value: function extractTail() {
                var _this$masked2;
                return (_this$masked2 = this.masked).extractTail.apply(_this$masked2, arguments);
            }
        }, {
            key: "appendTail",
            value: function appendTail() {
                var _this$masked3;
                return (_this$masked3 = this.masked).appendTail.apply(_this$masked3, arguments);
            }
        }, {
            key: "extractInput",
            value: function extractInput() {
                var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
                var flags = arguments.length > 2 ? arguments[2] : undefined;
                return this.masked.extractInput(fromPos, toPos, flags);
            }
        }, {
            key: "nearestInputPos",
            value: function nearestInputPos(cursorPos) {
                var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
                var minPos = 0;
                var maxPos = this.value.length;
                var boundPos = Math.min(Math.max(cursorPos, minPos), maxPos);
                switch (direction) {
                    case DIRECTION.LEFT:
                    case DIRECTION.FORCE_LEFT:
                        return this.isComplete ? boundPos : minPos;
                    case DIRECTION.RIGHT:
                    case DIRECTION.FORCE_RIGHT:
                        return this.isComplete ? boundPos : maxPos;
                    case DIRECTION.NONE:
                    default:
                        return boundPos;
                }
            }
        }, {
            key: "doValidate",
            value: function doValidate() {
                var _this$masked4, _this$parent;
                return (_this$masked4 = this.masked).doValidate.apply(_this$masked4, arguments) && (!this.parent || (_this$parent = this.parent).doValidate.apply(_this$parent, arguments));
            }
        }, {
            key: "doCommit",
            value: function doCommit() {
                this.masked.doCommit();
            }
        }, {
            key: "value",
            get: function get() {
                return this.masked.value || (this._isFilled && !this.isOptional ? this.placeholderChar : '');
            }
        }, {
            key: "unmaskedValue",
            get: function get() {
                return this.masked.unmaskedValue;
            }
        }, {
            key: "isComplete",
            get: function get() {
                return Boolean(this.masked.value) || this.isOptional;
            }
        }, {
            key: "state",
            get: function get() {
                return {
                    masked: this.masked.state,
                    _isFilled: this._isFilled
                };
            },
            set: function set(state) {
                this.masked.state = state.masked;
                this._isFilled = state._isFilled;
            }
        }]);
    return PatternInputDefinition;
}();
var PatternFixedDefinition = 
/*#__PURE__*/
function () {
    /** */
    /** */
    /** */
    /** */
    function PatternFixedDefinition(opts) {
        _classCallCheck(this, PatternFixedDefinition);
        Object.assign(this, opts);
        this._value = '';
    }
    _createClass(PatternFixedDefinition, [{
            key: "reset",
            value: function reset() {
                this._isRawInput = false;
                this._value = '';
            }
        }, {
            key: "remove",
            value: function remove() {
                var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
                this._value = this._value.slice(0, fromPos) + this._value.slice(toPos);
                if (!this._value)
                    this._isRawInput = false;
                return new ChangeDetails();
            }
        }, {
            key: "nearestInputPos",
            value: function nearestInputPos(cursorPos) {
                var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
                var minPos = 0;
                var maxPos = this._value.length;
                switch (direction) {
                    case DIRECTION.LEFT:
                    case DIRECTION.FORCE_LEFT:
                        return minPos;
                    case DIRECTION.NONE:
                    case DIRECTION.RIGHT:
                    case DIRECTION.FORCE_RIGHT:
                    default:
                        return maxPos;
                }
            }
        }, {
            key: "extractInput",
            value: function extractInput() {
                var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
                var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                return flags.raw && this._isRawInput && this._value.slice(fromPos, toPos) || '';
            }
        }, {
            key: "_appendChar",
            value: function _appendChar(str) {
                var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var details = new ChangeDetails();
                if (this._value)
                    return details;
                var appended = this.char === str[0];
                var isResolved = appended && (this.isUnmasking || flags.input || flags.raw) && !flags.tail;
                if (isResolved)
                    details.rawInserted = this.char;
                this._value = details.inserted = this.char;
                this._isRawInput = isResolved && (flags.raw || flags.input);
                return details;
            }
        }, {
            key: "_appendPlaceholder",
            value: function _appendPlaceholder() {
                var details = new ChangeDetails();
                if (this._value)
                    return details;
                this._value = details.inserted = this.char;
                return details;
            }
        }, {
            key: "extractTail",
            value: function extractTail() {
                return new ContinuousTailDetails('');
            } // $FlowFixMe no ideas
        }, {
            key: "appendTail",
            value: function appendTail(tail) {
                if (isString(tail))
                    tail = new ContinuousTailDetails(String(tail));
                return tail.appendTo(this);
            }
        }, {
            key: "append",
            value: function append(str, flags, tail) {
                var details = this._appendChar(str, flags);
                if (tail != null) {
                    details.tailShift += this.appendTail(tail).tailShift;
                }
                return details;
            }
        }, {
            key: "doCommit",
            value: function doCommit() { }
        }, {
            key: "value",
            get: function get() {
                return this._value;
            }
        }, {
            key: "unmaskedValue",
            get: function get() {
                return this.isUnmasking ? this.value : '';
            }
        }, {
            key: "isComplete",
            get: function get() {
                return true;
            }
        }, {
            key: "state",
            get: function get() {
                return {
                    _value: this._value,
                    _isRawInput: this._isRawInput
                };
            },
            set: function set(state) {
                Object.assign(this, state);
            }
        }]);
    return PatternFixedDefinition;
}();
var ChunksTailDetails = 
/*#__PURE__*/
function () {
    /** */
    function ChunksTailDetails() {
        var chunks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        _classCallCheck(this, ChunksTailDetails);
        this.chunks = chunks;
        this.from = from;
    }
    _createClass(ChunksTailDetails, [{
            key: "toString",
            value: function toString() {
                return this.chunks.map(String).join('');
            } // $FlowFixMe no ideas
        }, {
            key: "extend",
            value: function extend(tailChunk) {
                if (!String(tailChunk))
                    return;
                if (isString(tailChunk))
                    tailChunk = new ContinuousTailDetails(String(tailChunk));
                var lastChunk = this.chunks[this.chunks.length - 1];
                var extendLast = lastChunk && ( // if stops are same or tail has no stop
                lastChunk.stop === tailChunk.stop || tailChunk.stop == null) && // if tail chunk goes just after last chunk
                    tailChunk.from === lastChunk.from + lastChunk.toString().length;
                if (tailChunk instanceof ContinuousTailDetails) {
                    // check the ability to extend previous chunk
                    if (extendLast) {
                        // extend previous chunk
                        lastChunk.extend(tailChunk.toString());
                    }
                    else {
                        // append new chunk
                        this.chunks.push(tailChunk);
                    }
                }
                else if (tailChunk instanceof ChunksTailDetails) {
                    if (tailChunk.stop == null) {
                        // unwrap floating chunks to parent, keeping `from` pos
                        var firstTailChunk;
                        while (tailChunk.chunks.length && tailChunk.chunks[0].stop == null) {
                            firstTailChunk = tailChunk.chunks.shift();
                            firstTailChunk.from += tailChunk.from;
                            this.extend(firstTailChunk);
                        }
                    } // if tail chunk still has value
                    if (tailChunk.toString()) {
                        // if chunks contains stops, then popup stop to container
                        tailChunk.stop = tailChunk.blockIndex;
                        this.chunks.push(tailChunk);
                    }
                }
            }
        }, {
            key: "appendTo",
            value: function appendTo(masked) {
                if (!(masked instanceof g.IMask.MaskedPattern)) {
                    var tail = new ContinuousTailDetails(this.toString());
                    return tail.appendTo(masked);
                }
                var details = new ChangeDetails();
                for (var ci = 0; ci < this.chunks.length && !details.skip; ++ci) {
                    var chunk = this.chunks[ci];
                    var lastBlockIter = masked._mapPosToBlock(masked.value.length);
                    var stop = chunk.stop;
                    var chunkBlock = void 0;
                    if (stop && ( // if block not found or stop is behind lastBlock
                    !lastBlockIter || lastBlockIter.index <= stop)) {
                        if (chunk instanceof ChunksTailDetails || // for continuous block also check if stop is exist
                            masked._stops.indexOf(stop) >= 0) {
                            details.aggregate(masked._appendPlaceholder(stop));
                        }
                        chunkBlock = chunk instanceof ChunksTailDetails && masked._blocks[stop];
                    }
                    if (chunkBlock) {
                        var tailDetails = chunkBlock.appendTail(chunk);
                        tailDetails.skip = false; // always ignore skip, it will be set on last
                        details.aggregate(tailDetails);
                        masked._value += tailDetails.inserted; // get not inserted chars
                        var remainChars = chunk.toString().slice(tailDetails.rawInserted.length);
                        if (remainChars)
                            details.aggregate(masked.append(remainChars, {
                                tail: true
                            }));
                    }
                    else {
                        details.aggregate(masked.append(chunk.toString(), {
                            tail: true
                        }));
                    }
                }
                return details;
            }
        }, {
            key: "shiftBefore",
            value: function shiftBefore(pos) {
                if (this.from >= pos || !this.chunks.length)
                    return '';
                var chunkShiftPos = pos - this.from;
                var ci = 0;
                while (ci < this.chunks.length) {
                    var chunk = this.chunks[ci];
                    var shiftChar = chunk.shiftBefore(chunkShiftPos);
                    if (chunk.toString()) {
                        // chunk still contains value
                        // but not shifted - means no more available chars to shift
                        if (!shiftChar)
                            break;
                        ++ci;
                    }
                    else {
                        // clean if chunk has no value
                        this.chunks.splice(ci, 1);
                    }
                    if (shiftChar)
                        return shiftChar;
                }
                return '';
            }
        }, {
            key: "state",
            get: function get() {
                return {
                    chunks: this.chunks.map(function (c) {
                        return c.state;
                    }),
                    from: this.from,
                    stop: this.stop,
                    blockIndex: this.blockIndex
                };
            },
            set: function set(state) {
                var chunks = state.chunks, props = _objectWithoutProperties(state, ["chunks"]);
                Object.assign(this, props);
                this.chunks = chunks.map(function (cstate) {
                    var chunk = "chunks" in cstate ? new ChunksTailDetails() : new ContinuousTailDetails(); // $FlowFixMe already checked above
                    chunk.state = cstate;
                    return chunk;
                });
            }
        }]);
    return ChunksTailDetails;
}();
/**
  Pattern mask
  @param {Object} opts
  @param {Object} opts.blocks
  @param {Object} opts.definitions
  @param {string} opts.placeholderChar
  @param {boolean} opts.lazy
*/
var MaskedPattern = 
/*#__PURE__*/
function (_Masked) {
    _inherits(MaskedPattern, _Masked);
    /** */
    /** */
    /** Single char for empty input */
    /** Show placeholder only when needed */
    function MaskedPattern() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        _classCallCheck(this, MaskedPattern);
        // TODO type $Shape<MaskedPatternOptions>={} does not work
        opts.definitions = Object.assign({}, DEFAULT_INPUT_DEFINITIONS, opts.definitions);
        return _possibleConstructorReturn(this, _getPrototypeOf(MaskedPattern).call(this, Object.assign({}, MaskedPattern.DEFAULTS, {}, opts)));
    }
    /**
      @override
      @param {Object} opts
    */
    _createClass(MaskedPattern, [{
            key: "_update",
            value: function _update() {
                var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                opts.definitions = Object.assign({}, this.definitions, opts.definitions);
                _get(_getPrototypeOf(MaskedPattern.prototype), "_update", this).call(this, opts);
                this._rebuildMask();
            }
            /** */
        }, {
            key: "_rebuildMask",
            value: function _rebuildMask() {
                var _this = this;
                var defs = this.definitions;
                this._blocks = [];
                this._stops = [];
                this._maskedBlocks = {};
                var pattern = this.mask;
                if (!pattern || !defs)
                    return;
                var unmaskingBlock = false;
                var optionalBlock = false;
                for (var i = 0; i < pattern.length; ++i) {
                    if (this.blocks) {
                        var _ret = function () {
                            var p = pattern.slice(i);
                            var bNames = Object.keys(_this.blocks).filter(function (bName) {
                                return p.indexOf(bName) === 0;
                            }); // order by key length
                            bNames.sort(function (a, b) {
                                return b.length - a.length;
                            }); // use block name with max length
                            var bName = bNames[0];
                            if (bName) {
                                var maskedBlock = createMask(Object.assign({
                                    parent: _this,
                                    lazy: _this.lazy,
                                    placeholderChar: _this.placeholderChar,
                                    overwrite: _this.overwrite
                                }, _this.blocks[bName]));
                                if (maskedBlock) {
                                    _this._blocks.push(maskedBlock); // store block index
                                    if (!_this._maskedBlocks[bName])
                                        _this._maskedBlocks[bName] = [];
                                    _this._maskedBlocks[bName].push(_this._blocks.length - 1);
                                }
                                i += bName.length - 1;
                                return "continue";
                            }
                        }();
                        if (_ret === "continue")
                            continue;
                    }
                    var char = pattern[i];
                    var _isInput = char in defs;
                    if (char === MaskedPattern.STOP_CHAR) {
                        this._stops.push(this._blocks.length);
                        continue;
                    }
                    if (char === '{' || char === '}') {
                        unmaskingBlock = !unmaskingBlock;
                        continue;
                    }
                    if (char === '[' || char === ']') {
                        optionalBlock = !optionalBlock;
                        continue;
                    }
                    if (char === MaskedPattern.ESCAPE_CHAR) {
                        ++i;
                        char = pattern[i];
                        if (!char)
                            break;
                        _isInput = false;
                    }
                    var def = _isInput ? new PatternInputDefinition({
                        parent: this,
                        lazy: this.lazy,
                        placeholderChar: this.placeholderChar,
                        mask: defs[char],
                        isOptional: optionalBlock
                    }) : new PatternFixedDefinition({
                        char: char,
                        isUnmasking: unmaskingBlock
                    });
                    this._blocks.push(def);
                }
            }
            /**
              @override
            */
        }, {
            key: "reset",
            /**
              @override
            */
            value: function reset() {
                _get(_getPrototypeOf(MaskedPattern.prototype), "reset", this).call(this);
                this._blocks.forEach(function (b) {
                    return b.reset();
                });
            }
            /**
              @override
            */
        }, {
            key: "doCommit",
            /**
              @override
            */
            value: function doCommit() {
                this._blocks.forEach(function (b) {
                    return b.doCommit();
                });
                _get(_getPrototypeOf(MaskedPattern.prototype), "doCommit", this).call(this);
            }
            /**
              @override
            */
        }, {
            key: "appendTail",
            /**
              @override
            */
            value: function appendTail(tail) {
                return _get(_getPrototypeOf(MaskedPattern.prototype), "appendTail", this).call(this, tail).aggregate(this._appendPlaceholder());
            }
            /**
              @override
            */
        }, {
            key: "_appendCharRaw",
            value: function _appendCharRaw(ch) {
                var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                ch = this.doPrepare(ch, flags);
                var blockIter = this._mapPosToBlock(this.value.length);
                var details = new ChangeDetails();
                if (!blockIter)
                    return details;
                for (var bi = blockIter.index;; ++bi) {
                    var _block = this._blocks[bi];
                    if (!_block)
                        break;
                    var blockDetails = _block._appendChar(ch, flags);
                    var skip = blockDetails.skip;
                    details.aggregate(blockDetails);
                    if (skip || blockDetails.rawInserted)
                        break; // go next char
                }
                return details;
            }
            /**
              @override
            */
        }, {
            key: "extractTail",
            value: function extractTail() {
                var _this2 = this;
                var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
                var chunkTail = new ChunksTailDetails();
                if (fromPos === toPos)
                    return chunkTail;
                this._forEachBlocksInRange(fromPos, toPos, function (b, bi, bFromPos, bToPos) {
                    var blockChunk = b.extractTail(bFromPos, bToPos);
                    blockChunk.stop = _this2._findStopBefore(bi);
                    blockChunk.from = _this2._blockStartPos(bi);
                    if (blockChunk instanceof ChunksTailDetails)
                        blockChunk.blockIndex = bi;
                    chunkTail.extend(blockChunk);
                });
                return chunkTail;
            }
            /**
              @override
            */
        }, {
            key: "extractInput",
            value: function extractInput() {
                var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
                var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                if (fromPos === toPos)
                    return '';
                var input = '';
                this._forEachBlocksInRange(fromPos, toPos, function (b, _, fromPos, toPos) {
                    input += b.extractInput(fromPos, toPos, flags);
                });
                return input;
            }
        }, {
            key: "_findStopBefore",
            value: function _findStopBefore(blockIndex) {
                var stopBefore;
                for (var si = 0; si < this._stops.length; ++si) {
                    var stop = this._stops[si];
                    if (stop <= blockIndex)
                        stopBefore = stop;
                    else
                        break;
                }
                return stopBefore;
            }
            /** Appends placeholder depending on laziness */
        }, {
            key: "_appendPlaceholder",
            value: function _appendPlaceholder(toBlockIndex) {
                var _this3 = this;
                var details = new ChangeDetails();
                if (this.lazy && toBlockIndex == null)
                    return details;
                var startBlockIter = this._mapPosToBlock(this.value.length);
                if (!startBlockIter)
                    return details;
                var startBlockIndex = startBlockIter.index;
                var endBlockIndex = toBlockIndex != null ? toBlockIndex : this._blocks.length;
                this._blocks.slice(startBlockIndex, endBlockIndex).forEach(function (b) {
                    if (!b.lazy || toBlockIndex != null) {
                        // $FlowFixMe `_blocks` may not be present
                        var args = b._blocks != null ? [b._blocks.length] : [];
                        var bDetails = b._appendPlaceholder.apply(b, args);
                        _this3._value += bDetails.inserted;
                        details.aggregate(bDetails);
                    }
                });
                return details;
            }
            /** Finds block in pos */
        }, {
            key: "_mapPosToBlock",
            value: function _mapPosToBlock(pos) {
                var accVal = '';
                for (var bi = 0; bi < this._blocks.length; ++bi) {
                    var _block2 = this._blocks[bi];
                    var blockStartPos = accVal.length;
                    accVal += _block2.value;
                    if (pos <= accVal.length) {
                        return {
                            index: bi,
                            offset: pos - blockStartPos
                        };
                    }
                }
            }
            /** */
        }, {
            key: "_blockStartPos",
            value: function _blockStartPos(blockIndex) {
                return this._blocks.slice(0, blockIndex).reduce(function (pos, b) {
                    return pos += b.value.length;
                }, 0);
            }
            /** */
        }, {
            key: "_forEachBlocksInRange",
            value: function _forEachBlocksInRange(fromPos) {
                var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
                var fn = arguments.length > 2 ? arguments[2] : undefined;
                var fromBlockIter = this._mapPosToBlock(fromPos);
                if (fromBlockIter) {
                    var toBlockIter = this._mapPosToBlock(toPos); // process first block
                    var isSameBlock = toBlockIter && fromBlockIter.index === toBlockIter.index;
                    var fromBlockStartPos = fromBlockIter.offset;
                    var fromBlockEndPos = toBlockIter && isSameBlock ? toBlockIter.offset : this._blocks[fromBlockIter.index].value.length;
                    fn(this._blocks[fromBlockIter.index], fromBlockIter.index, fromBlockStartPos, fromBlockEndPos);
                    if (toBlockIter && !isSameBlock) {
                        // process intermediate blocks
                        for (var bi = fromBlockIter.index + 1; bi < toBlockIter.index; ++bi) {
                            fn(this._blocks[bi], bi, 0, this._blocks[bi].value.length);
                        } // process last block
                        fn(this._blocks[toBlockIter.index], toBlockIter.index, 0, toBlockIter.offset);
                    }
                }
            }
            /**
              @override
            */
        }, {
            key: "remove",
            value: function remove() {
                var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
                var removeDetails = _get(_getPrototypeOf(MaskedPattern.prototype), "remove", this).call(this, fromPos, toPos);
                this._forEachBlocksInRange(fromPos, toPos, function (b, _, bFromPos, bToPos) {
                    removeDetails.aggregate(b.remove(bFromPos, bToPos));
                });
                return removeDetails;
            }
            /**
              @override
            */
        }, {
            key: "nearestInputPos",
            value: function nearestInputPos(cursorPos) {
                var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
                // TODO refactor - extract alignblock
                var beginBlockData = this._mapPosToBlock(cursorPos) || {
                    index: 0,
                    offset: 0
                };
                var beginBlockOffset = beginBlockData.offset, beginBlockIndex = beginBlockData.index;
                var beginBlock = this._blocks[beginBlockIndex];
                if (!beginBlock)
                    return cursorPos;
                var beginBlockCursorPos = beginBlockOffset; // if position inside block - try to adjust it
                if (beginBlockCursorPos !== 0 && beginBlockCursorPos < beginBlock.value.length) {
                    beginBlockCursorPos = beginBlock.nearestInputPos(beginBlockOffset, forceDirection(direction));
                }
                var cursorAtRight = beginBlockCursorPos === beginBlock.value.length;
                var cursorAtLeft = beginBlockCursorPos === 0; //  cursor is INSIDE first block (not at bounds)
                if (!cursorAtLeft && !cursorAtRight)
                    return this._blockStartPos(beginBlockIndex) + beginBlockCursorPos;
                var searchBlockIndex = cursorAtRight ? beginBlockIndex + 1 : beginBlockIndex;
                if (direction === DIRECTION.NONE) {
                    // NONE direction used to calculate start input position if no chars were removed
                    // FOR NONE:
                    // -
                    // input|any
                    // ->
                    //  any|input
                    // <-
                    //  filled-input|any
                    // check if first block at left is input
                    if (searchBlockIndex > 0) {
                        var blockIndexAtLeft = searchBlockIndex - 1;
                        var blockAtLeft = this._blocks[blockIndexAtLeft];
                        var blockInputPos = blockAtLeft.nearestInputPos(0, DIRECTION.NONE); // is input
                        if (!blockAtLeft.value.length || blockInputPos !== blockAtLeft.value.length) {
                            return this._blockStartPos(searchBlockIndex);
                        }
                    } // ->
                    var firstInputAtRight = searchBlockIndex;
                    for (var bi = firstInputAtRight; bi < this._blocks.length; ++bi) {
                        var blockAtRight = this._blocks[bi];
                        var _blockInputPos = blockAtRight.nearestInputPos(0, DIRECTION.NONE);
                        if (!blockAtRight.value.length || _blockInputPos !== blockAtRight.value.length) {
                            return this._blockStartPos(bi) + _blockInputPos;
                        }
                    } // <-
                    // find first non-fixed symbol
                    for (var _bi = searchBlockIndex - 1; _bi >= 0; --_bi) {
                        var _block3 = this._blocks[_bi];
                        var _blockInputPos2 = _block3.nearestInputPos(0, DIRECTION.NONE); // is input
                        if (!_block3.value.length || _blockInputPos2 !== _block3.value.length) {
                            return this._blockStartPos(_bi) + _block3.value.length;
                        }
                    }
                    return cursorPos;
                }
                if (direction === DIRECTION.LEFT || direction === DIRECTION.FORCE_LEFT) {
                    // -
                    //  any|filled-input
                    // <-
                    //  any|first not empty is not-len-aligned
                    //  not-0-aligned|any
                    // ->
                    //  any|not-len-aligned or end
                    // check if first block at right is filled input
                    var firstFilledBlockIndexAtRight;
                    for (var _bi2 = searchBlockIndex; _bi2 < this._blocks.length; ++_bi2) {
                        if (this._blocks[_bi2].value) {
                            firstFilledBlockIndexAtRight = _bi2;
                            break;
                        }
                    }
                    if (firstFilledBlockIndexAtRight != null) {
                        var filledBlock = this._blocks[firstFilledBlockIndexAtRight];
                        var _blockInputPos3 = filledBlock.nearestInputPos(0, DIRECTION.RIGHT);
                        if (_blockInputPos3 === 0 && filledBlock.unmaskedValue.length) {
                            // filled block is input
                            return this._blockStartPos(firstFilledBlockIndexAtRight) + _blockInputPos3;
                        }
                    } // <-
                    // find this vars
                    var firstFilledInputBlockIndex = -1;
                    var firstEmptyInputBlockIndex; // TODO consider nested empty inputs
                    for (var _bi3 = searchBlockIndex - 1; _bi3 >= 0; --_bi3) {
                        var _block4 = this._blocks[_bi3];
                        var _blockInputPos4 = _block4.nearestInputPos(_block4.value.length, DIRECTION.FORCE_LEFT);
                        if (!_block4.value || _blockInputPos4 !== 0)
                            firstEmptyInputBlockIndex = _bi3;
                        if (_blockInputPos4 !== 0) {
                            if (_blockInputPos4 !== _block4.value.length) {
                                // aligned inside block - return immediately
                                return this._blockStartPos(_bi3) + _blockInputPos4;
                            }
                            else {
                                // found filled
                                firstFilledInputBlockIndex = _bi3;
                                break;
                            }
                        }
                    }
                    if (direction === DIRECTION.LEFT) {
                        // try find first empty input before start searching position only when not forced
                        for (var _bi4 = firstFilledInputBlockIndex + 1; _bi4 <= Math.min(searchBlockIndex, this._blocks.length - 1); ++_bi4) {
                            var _block5 = this._blocks[_bi4];
                            var _blockInputPos5 = _block5.nearestInputPos(0, DIRECTION.NONE);
                            var blockAlignedPos = this._blockStartPos(_bi4) + _blockInputPos5;
                            if (blockAlignedPos > cursorPos)
                                break; // if block is not lazy input
                            if (_blockInputPos5 !== _block5.value.length)
                                return blockAlignedPos;
                        }
                    } // process overflow
                    if (firstFilledInputBlockIndex >= 0) {
                        return this._blockStartPos(firstFilledInputBlockIndex) + this._blocks[firstFilledInputBlockIndex].value.length;
                    } // for lazy if has aligned left inside fixed and has came to the start - use start position
                    if (direction === DIRECTION.FORCE_LEFT || this.lazy && !this.extractInput() && !isInput(this._blocks[searchBlockIndex])) {
                        return 0;
                    }
                    if (firstEmptyInputBlockIndex != null) {
                        return this._blockStartPos(firstEmptyInputBlockIndex);
                    } // find first input
                    for (var _bi5 = searchBlockIndex; _bi5 < this._blocks.length; ++_bi5) {
                        var _block6 = this._blocks[_bi5];
                        var _blockInputPos6 = _block6.nearestInputPos(0, DIRECTION.NONE); // is input
                        if (!_block6.value.length || _blockInputPos6 !== _block6.value.length) {
                            return this._blockStartPos(_bi5) + _blockInputPos6;
                        }
                    }
                    return 0;
                }
                if (direction === DIRECTION.RIGHT || direction === DIRECTION.FORCE_RIGHT) {
                    // ->
                    //  any|not-len-aligned and filled
                    //  any|not-len-aligned
                    // <-
                    //  not-0-aligned or start|any
                    var firstInputBlockAlignedIndex;
                    var firstInputBlockAlignedPos;
                    for (var _bi6 = searchBlockIndex; _bi6 < this._blocks.length; ++_bi6) {
                        var _block7 = this._blocks[_bi6];
                        var _blockInputPos7 = _block7.nearestInputPos(0, DIRECTION.NONE);
                        if (_blockInputPos7 !== _block7.value.length) {
                            firstInputBlockAlignedPos = this._blockStartPos(_bi6) + _blockInputPos7;
                            firstInputBlockAlignedIndex = _bi6;
                            break;
                        }
                    }
                    if (firstInputBlockAlignedIndex != null && firstInputBlockAlignedPos != null) {
                        for (var _bi7 = firstInputBlockAlignedIndex; _bi7 < this._blocks.length; ++_bi7) {
                            var _block8 = this._blocks[_bi7];
                            var _blockInputPos8 = _block8.nearestInputPos(0, DIRECTION.FORCE_RIGHT);
                            if (_blockInputPos8 !== _block8.value.length) {
                                return this._blockStartPos(_bi7) + _blockInputPos8;
                            }
                        }
                        return direction === DIRECTION.FORCE_RIGHT ? this.value.length : firstInputBlockAlignedPos;
                    }
                    for (var _bi8 = Math.min(searchBlockIndex, this._blocks.length - 1); _bi8 >= 0; --_bi8) {
                        var _block9 = this._blocks[_bi8];
                        var _blockInputPos9 = _block9.nearestInputPos(_block9.value.length, DIRECTION.LEFT);
                        if (_blockInputPos9 !== 0) {
                            var alignedPos = this._blockStartPos(_bi8) + _blockInputPos9;
                            if (alignedPos >= cursorPos)
                                return alignedPos;
                            break;
                        }
                    }
                }
                return cursorPos;
            }
            /** Get block by name */
        }, {
            key: "maskedBlock",
            value: function maskedBlock(name) {
                return this.maskedBlocks(name)[0];
            }
            /** Get all blocks by name */
        }, {
            key: "maskedBlocks",
            value: function maskedBlocks(name) {
                var _this4 = this;
                var indices = this._maskedBlocks[name];
                if (!indices)
                    return [];
                return indices.map(function (gi) {
                    return _this4._blocks[gi];
                });
            }
        }, {
            key: "state",
            get: function get() {
                return Object.assign({}, _get(_getPrototypeOf(MaskedPattern.prototype), "state", this), {
                    _blocks: this._blocks.map(function (b) {
                        return b.state;
                    })
                });
            },
            set: function set(state) {
                var _blocks = state._blocks, maskedState = _objectWithoutProperties(state, ["_blocks"]);
                this._blocks.forEach(function (b, bi) {
                    return b.state = _blocks[bi];
                });
                _set(_getPrototypeOf(MaskedPattern.prototype), "state", maskedState, this, true);
            }
        }, {
            key: "isComplete",
            get: function get() {
                return this._blocks.every(function (b) {
                    return b.isComplete;
                });
            }
        }, {
            key: "unmaskedValue",
            get: function get() {
                return this._blocks.reduce(function (str, b) {
                    return str += b.unmaskedValue;
                }, '');
            },
            set: function set(unmaskedValue) {
                _set(_getPrototypeOf(MaskedPattern.prototype), "unmaskedValue", unmaskedValue, this, true);
            }
            /**
              @override
            */
        }, {
            key: "value",
            get: function get() {
                // TODO return _value when not in change?
                return this._blocks.reduce(function (str, b) {
                    return str += b.value;
                }, '');
            },
            set: function set(value) {
                _set(_getPrototypeOf(MaskedPattern.prototype), "value", value, this, true);
            }
        }]);
    return MaskedPattern;
}(Masked);
MaskedPattern.DEFAULTS = {
    lazy: true,
    placeholderChar: '_'
};
MaskedPattern.STOP_CHAR = '`';
MaskedPattern.ESCAPE_CHAR = '\\';
MaskedPattern.InputDefinition = PatternInputDefinition;
MaskedPattern.FixedDefinition = PatternFixedDefinition;
function isInput(block) {
    if (!block)
        return false;
    var value = block.value;
    return !value || block.nearestInputPos(0, DIRECTION.NONE) !== value.length;
}
/** Pattern which accepts ranges */
var MaskedRange = 
/*#__PURE__*/
function (_MaskedPattern) {
    _inherits(MaskedRange, _MaskedPattern);
    function MaskedRange() {
        _classCallCheck(this, MaskedRange);
        return _possibleConstructorReturn(this, _getPrototypeOf(MaskedRange).apply(this, arguments));
    }
    _createClass(MaskedRange, [{
            key: "_update",
            /**
              @override
            */
            value: function _update(opts) {
                // TODO type
                opts = Object.assign({
                    to: this.to || 0,
                    from: this.from || 0
                }, opts);
                var maxLength = String(opts.to).length;
                if (opts.maxLength != null)
                    maxLength = Math.max(maxLength, opts.maxLength);
                opts.maxLength = maxLength;
                var fromStr = String(opts.from).padStart(maxLength, '0');
                var toStr = String(opts.to).padStart(maxLength, '0');
                var sameCharsCount = 0;
                while (sameCharsCount < toStr.length && toStr[sameCharsCount] === fromStr[sameCharsCount]) {
                    ++sameCharsCount;
                }
                opts.mask = toStr.slice(0, sameCharsCount).replace(/0/g, '\\0') + '0'.repeat(maxLength - sameCharsCount);
                _get(_getPrototypeOf(MaskedRange.prototype), "_update", this).call(this, opts);
            }
            /**
              @override
            */
        }, {
            key: "boundaries",
            value: function boundaries(str) {
                var minstr = '';
                var maxstr = '';
                var _ref = str.match(/^(\D*)(\d*)(\D*)/) || [], _ref2 = _slicedToArray(_ref, 3), placeholder = _ref2[1], num = _ref2[2];
                if (num) {
                    minstr = '0'.repeat(placeholder.length) + num;
                    maxstr = '9'.repeat(placeholder.length) + num;
                }
                minstr = minstr.padEnd(this.maxLength, '0');
                maxstr = maxstr.padEnd(this.maxLength, '9');
                return [minstr, maxstr];
            }
            /**
              @override
            */
        }, {
            key: "doPrepare",
            value: function doPrepare(str) {
                var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                str = _get(_getPrototypeOf(MaskedRange.prototype), "doPrepare", this).call(this, str, flags).replace(/\D/g, '');
                if (!this.autofix)
                    return str;
                var fromStr = String(this.from).padStart(this.maxLength, '0');
                var toStr = String(this.to).padStart(this.maxLength, '0');
                var val = this.value;
                var prepStr = '';
                for (var ci = 0; ci < str.length; ++ci) {
                    var nextVal = val + prepStr + str[ci];
                    var _this$boundaries = this.boundaries(nextVal), _this$boundaries2 = _slicedToArray(_this$boundaries, 2), minstr = _this$boundaries2[0], maxstr = _this$boundaries2[1];
                    if (Number(maxstr) < this.from)
                        prepStr += fromStr[nextVal.length - 1];
                    else if (Number(minstr) > this.to)
                        prepStr += toStr[nextVal.length - 1];
                    else
                        prepStr += str[ci];
                }
                return prepStr;
            }
            /**
              @override
            */
        }, {
            key: "doValidate",
            value: function doValidate() {
                var _get2;
                var str = this.value;
                var firstNonZero = str.search(/[^0]/);
                if (firstNonZero === -1 && str.length <= this._matchFrom)
                    return true;
                var _this$boundaries3 = this.boundaries(str), _this$boundaries4 = _slicedToArray(_this$boundaries3, 2), minstr = _this$boundaries4[0], maxstr = _this$boundaries4[1];
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }
                return this.from <= Number(maxstr) && Number(minstr) <= this.to && (_get2 = _get(_getPrototypeOf(MaskedRange.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args));
            }
        }, {
            key: "_matchFrom",
            /**
              Optionally sets max length of pattern.
              Used when pattern length is longer then `to` param length. Pads zeros at start in this case.
            */
            /** Min bound */
            /** Max bound */
            /** */
            get: function get() {
                return this.maxLength - String(this.from).length;
            }
        }, {
            key: "isComplete",
            get: function get() {
                return _get(_getPrototypeOf(MaskedRange.prototype), "isComplete", this) && Boolean(this.value);
            }
        }]);
    return MaskedRange;
}(MaskedPattern);
/** Date mask */
var MaskedDate = 
/*#__PURE__*/
function (_MaskedPattern) {
    _inherits(MaskedDate, _MaskedPattern);
    /** Parse string to Date */
    /** Format Date to string */
    /** Pattern mask for date according to {@link MaskedDate#format} */
    /** Start date */
    /** End date */
    /** */
    /**
      @param {Object} opts
    */
    function MaskedDate(opts) {
        _classCallCheck(this, MaskedDate);
        return _possibleConstructorReturn(this, _getPrototypeOf(MaskedDate).call(this, Object.assign({}, MaskedDate.DEFAULTS, {}, opts)));
    }
    /**
      @override
    */
    _createClass(MaskedDate, [{
            key: "_update",
            value: function _update(opts) {
                if (opts.mask === Date)
                    delete opts.mask;
                if (opts.pattern)
                    opts.mask = opts.pattern;
                var blocks = opts.blocks;
                opts.blocks = Object.assign({}, MaskedDate.GET_DEFAULT_BLOCKS()); // adjust year block
                if (opts.min)
                    opts.blocks.Y.from = opts.min.getFullYear();
                if (opts.max)
                    opts.blocks.Y.to = opts.max.getFullYear();
                if (opts.min && opts.max && opts.blocks.Y.from === opts.blocks.Y.to) {
                    opts.blocks.m.from = opts.min.getMonth() + 1;
                    opts.blocks.m.to = opts.max.getMonth() + 1;
                    if (opts.blocks.m.from === opts.blocks.m.to) {
                        opts.blocks.d.from = opts.min.getDate();
                        opts.blocks.d.to = opts.max.getDate();
                    }
                }
                Object.assign(opts.blocks, blocks); // add autofix
                Object.keys(opts.blocks).forEach(function (bk) {
                    var b = opts.blocks[bk];
                    if (!('autofix' in b))
                        b.autofix = opts.autofix;
                });
                _get(_getPrototypeOf(MaskedDate.prototype), "_update", this).call(this, opts);
            }
            /**
              @override
            */
        }, {
            key: "doValidate",
            value: function doValidate() {
                var _get2;
                var date = this.date;
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }
                return (_get2 = _get(_getPrototypeOf(MaskedDate.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args)) && (!this.isComplete || this.isDateExist(this.value) && date != null && (this.min == null || this.min <= date) && (this.max == null || date <= this.max));
            }
            /** Checks if date is exists */
        }, {
            key: "isDateExist",
            value: function isDateExist(str) {
                return this.format(this.parse(str)) === str;
            }
            /** Parsed Date */
        }, {
            key: "date",
            get: function get() {
                return this.isComplete ? this.parse(this.value) : null;
            },
            set: function set(date) {
                this.value = this.format(date);
            }
            /**
              @override
            */
        }, {
            key: "typedValue",
            get: function get() {
                return this.date;
            },
            set: function set(value) {
                this.date = value;
            }
        }]);
    return MaskedDate;
}(MaskedPattern);
MaskedDate.DEFAULTS = {
    pattern: 'd{.}`m{.}`Y',
    format: function format(date) {
        var day = String(date.getDate()).padStart(2, '0');
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var year = date.getFullYear();
        return [day, month, year].join('.');
    },
    parse: function parse(str) {
        var _str$split = str.split('.'), _str$split2 = _slicedToArray(_str$split, 3), day = _str$split2[0], month = _str$split2[1], year = _str$split2[2];
        return new Date(year, month - 1, day);
    }
};
MaskedDate.GET_DEFAULT_BLOCKS = function () {
    return {
        d: {
            mask: MaskedRange,
            from: 1,
            to: 31,
            maxLength: 2
        },
        m: {
            mask: MaskedRange,
            from: 1,
            to: 12,
            maxLength: 2
        },
        Y: {
            mask: MaskedRange,
            from: 1900,
            to: 9999
        }
    };
};
/**
  Generic element API to use with mask
  @interface
*/
var MaskElement = 
/*#__PURE__*/
function () {
    function MaskElement() {
        _classCallCheck(this, MaskElement);
    }
    _createClass(MaskElement, [{
            key: "select",
            /** Safely sets element selection */
            value: function select(start, end) {
                if (start == null || end == null || start === this.selectionStart && end === this.selectionEnd)
                    return;
                try {
                    this._unsafeSelect(start, end);
                }
                catch (e) { }
            }
            /** Should be overriden in subclasses */
        }, {
            key: "_unsafeSelect",
            value: function _unsafeSelect(start, end) { }
            /** Should be overriden in subclasses */
        }, {
            key: "bindEvents",
            /** Should be overriden in subclasses */
            value: function bindEvents(handlers) { }
            /** Should be overriden in subclasses */
        }, {
            key: "unbindEvents",
            value: function unbindEvents() { }
        }, {
            key: "selectionStart",
            /** */
            /** */
            /** */
            /** Safely returns selection start */
            get: function get() {
                var start;
                try {
                    start = this._unsafeSelectionStart;
                }
                catch (e) { }
                return start != null ? start : this.value.length;
            }
            /** Safely returns selection end */
        }, {
            key: "selectionEnd",
            get: function get() {
                var end;
                try {
                    end = this._unsafeSelectionEnd;
                }
                catch (e) { }
                return end != null ? end : this.value.length;
            }
        }, {
            key: "isActive",
            get: function get() {
                return false;
            }
        }]);
    return MaskElement;
}();
/** Bridge between HTMLElement and {@link Masked} */
var HTMLMaskElement = 
/*#__PURE__*/
function (_MaskElement) {
    _inherits(HTMLMaskElement, _MaskElement);
    /** Mapping between HTMLElement events and mask internal events */
    /** HTMLElement to use mask on */
    /**
      @param {HTMLInputElement|HTMLTextAreaElement} input
    */
    function HTMLMaskElement(input) {
        var _this;
        _classCallCheck(this, HTMLMaskElement);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(HTMLMaskElement).call(this));
        _this.input = input;
        _this._handlers = {};
        return _this;
    }
    /**
      Is element in focus
      @readonly
    */
    _createClass(HTMLMaskElement, [{
            key: "_unsafeSelect",
            /**
              Sets HTMLElement selection
              @override
            */
            value: function _unsafeSelect(start, end) {
                this.input.setSelectionRange(start, end);
            }
            /**
              HTMLElement value
              @override
            */
        }, {
            key: "bindEvents",
            /**
              Binds HTMLElement events to mask internal events
              @override
            */
            value: function bindEvents(handlers) {
                var _this2 = this;
                Object.keys(handlers).forEach(function (event) {
                    return _this2._toggleEventHandler(HTMLMaskElement.EVENTS_MAP[event], handlers[event]);
                });
            }
            /**
              Unbinds HTMLElement events to mask internal events
              @override
            */
        }, {
            key: "unbindEvents",
            value: function unbindEvents() {
                var _this3 = this;
                Object.keys(this._handlers).forEach(function (event) {
                    return _this3._toggleEventHandler(event);
                });
            }
            /** */
        }, {
            key: "_toggleEventHandler",
            value: function _toggleEventHandler(event, handler) {
                if (this._handlers[event]) {
                    this.input.removeEventListener(event, this._handlers[event]);
                    delete this._handlers[event];
                }
                if (handler) {
                    this.input.addEventListener(event, handler);
                    this._handlers[event] = handler;
                }
            }
        }, {
            key: "isActive",
            get: function get() {
                return this.input === document.activeElement;
            }
            /**
              Returns HTMLElement selection start
              @override
            */
        }, {
            key: "_unsafeSelectionStart",
            get: function get() {
                return this.input.selectionStart;
            }
            /**
              Returns HTMLElement selection end
              @override
            */
        }, {
            key: "_unsafeSelectionEnd",
            get: function get() {
                return this.input.selectionEnd;
            }
        }, {
            key: "value",
            get: function get() {
                return this.input.value;
            },
            set: function set(value) {
                this.input.value = value;
            }
        }]);
    return HTMLMaskElement;
}(MaskElement);
HTMLMaskElement.EVENTS_MAP = {
    selectionChange: 'keydown',
    input: 'input',
    drop: 'drop',
    click: 'click',
    focus: 'focus',
    commit: 'blur'
};
/** Listens to element events and controls changes between element and {@link Masked} */
var InputMask = 
/*#__PURE__*/
function () {
    /**
      View element
      @readonly
    */
    /**
      Internal {@link Masked} model
      @readonly
    */
    /**
      @param {MaskElement|HTMLInputElement|HTMLTextAreaElement} el
      @param {Object} opts
    */
    function InputMask(el, opts) {
        _classCallCheck(this, InputMask);
        this.el = el instanceof MaskElement ? el : new HTMLMaskElement(el);
        this.masked = createMask(opts);
        this._listeners = {};
        this._value = '';
        this._unmaskedValue = '';
        this._saveSelection = this._saveSelection.bind(this);
        this._onInput = this._onInput.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onDrop = this._onDrop.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this.alignCursor = this.alignCursor.bind(this);
        this.alignCursorFriendly = this.alignCursorFriendly.bind(this);
        this._bindEvents(); // refresh
        this.updateValue();
        this._onChange();
    }
    /** Read or update mask */
    _createClass(InputMask, [{
            key: "maskEquals",
            value: function maskEquals(mask) {
                return mask == null || mask === this.masked.mask || mask === Date && this.masked instanceof MaskedDate;
            }
        }, {
            key: "_bindEvents",
            /**
              Starts listening to element events
              @protected
            */
            value: function _bindEvents() {
                this.el.bindEvents({
                    selectionChange: this._saveSelection,
                    input: this._onInput,
                    drop: this._onDrop,
                    click: this.alignCursorFriendly,
                    focus: this._onFocus,
                    commit: this._onChange
                });
            }
            /**
              Stops listening to element events
              @protected
             */
        }, {
            key: "_unbindEvents",
            value: function _unbindEvents() {
                this.el.unbindEvents();
            }
            /**
              Fires custom event
              @protected
             */
        }, {
            key: "_fireEvent",
            value: function _fireEvent(ev) {
                var listeners = this._listeners[ev];
                if (!listeners)
                    return;
                listeners.forEach(function (l) {
                    return l();
                });
            }
            /**
              Current selection start
              @readonly
            */
        }, {
            key: "_saveSelection",
            /**
              Stores current selection
              @protected
            */
            value: function _saveSelection() {
                if (this.value !== this.el.value) {
                    console.warn('Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly.'); // eslint-disable-line no-console
                }
                this._selection = {
                    start: this.selectionStart,
                    end: this.cursorPos
                };
            }
            /** Syncronizes model value from view */
        }, {
            key: "updateValue",
            value: function updateValue() {
                this.masked.value = this.el.value;
                this._value = this.masked.value;
            }
            /** Syncronizes view from model value, fires change events */
        }, {
            key: "updateControl",
            value: function updateControl() {
                var newUnmaskedValue = this.masked.unmaskedValue;
                var newValue = this.masked.value;
                var isChanged = this.unmaskedValue !== newUnmaskedValue || this.value !== newValue;
                this._unmaskedValue = newUnmaskedValue;
                this._value = newValue;
                if (this.el.value !== newValue)
                    this.el.value = newValue;
                if (isChanged)
                    this._fireChangeEvents();
            }
            /** Updates options with deep equal check, recreates @{link Masked} model if mask type changes */
        }, {
            key: "updateOptions",
            value: function updateOptions(opts) {
                var mask = opts.mask, restOpts = _objectWithoutProperties(opts, ["mask"]);
                var updateMask = !this.maskEquals(mask);
                var updateOpts = !objectIncludes(this.masked, restOpts);
                if (updateMask)
                    this.mask = mask;
                if (updateOpts)
                    this.masked.updateOptions(restOpts);
                if (updateMask || updateOpts)
                    this.updateControl();
            }
            /** Updates cursor */
        }, {
            key: "updateCursor",
            value: function updateCursor(cursorPos) {
                if (cursorPos == null)
                    return;
                this.cursorPos = cursorPos; // also queue change cursor for mobile browsers
                this._delayUpdateCursor(cursorPos);
            }
            /**
              Delays cursor update to support mobile browsers
              @private
            */
        }, {
            key: "_delayUpdateCursor",
            value: function _delayUpdateCursor(cursorPos) {
                var _this = this;
                this._abortUpdateCursor();
                this._changingCursorPos = cursorPos;
                this._cursorChanging = setTimeout(function () {
                    if (!_this.el)
                        return; // if was destroyed
                    _this.cursorPos = _this._changingCursorPos;
                    _this._abortUpdateCursor();
                }, 10);
            }
            /**
              Fires custom events
              @protected
            */
        }, {
            key: "_fireChangeEvents",
            value: function _fireChangeEvents() {
                this._fireEvent('accept');
                if (this.masked.isComplete)
                    this._fireEvent('complete');
            }
            /**
              Aborts delayed cursor update
              @private
            */
        }, {
            key: "_abortUpdateCursor",
            value: function _abortUpdateCursor() {
                if (this._cursorChanging) {
                    clearTimeout(this._cursorChanging);
                    delete this._cursorChanging;
                }
            }
            /** Aligns cursor to nearest available position */
        }, {
            key: "alignCursor",
            value: function alignCursor() {
                this.cursorPos = this.masked.nearestInputPos(this.cursorPos, DIRECTION.LEFT);
            }
            /** Aligns cursor only if selection is empty */
        }, {
            key: "alignCursorFriendly",
            value: function alignCursorFriendly() {
                if (this.selectionStart !== this.cursorPos)
                    return; // skip if range is selected
                this.alignCursor();
            }
            /** Adds listener on custom event */
        }, {
            key: "on",
            value: function on(ev, handler) {
                if (!this._listeners[ev])
                    this._listeners[ev] = [];
                this._listeners[ev].push(handler);
                return this;
            }
            /** Removes custom event listener */
        }, {
            key: "off",
            value: function off(ev, handler) {
                if (!this._listeners[ev])
                    return this;
                if (!handler) {
                    delete this._listeners[ev];
                    return this;
                }
                var hIndex = this._listeners[ev].indexOf(handler);
                if (hIndex >= 0)
                    this._listeners[ev].splice(hIndex, 1);
                return this;
            }
            /** Handles view input event */
        }, {
            key: "_onInput",
            value: function _onInput() {
                this._abortUpdateCursor(); // fix strange IE behavior
                if (!this._selection)
                    return this.updateValue();
                var details = new ActionDetails(// new state
                this.el.value, this.cursorPos, // old state
                this.value, this._selection);
                var oldRawValue = this.masked.rawInputValue;
                var offset = this.masked.splice(details.startChangePos, details.removed.length, details.inserted, details.removeDirection).offset; // force align in remove direction only if no input chars were removed
                // otherwise we still need to align with NONE (to get out from fixed symbols for instance)
                var removeDirection = oldRawValue === this.masked.rawInputValue ? details.removeDirection : DIRECTION.NONE;
                var cursorPos = this.masked.nearestInputPos(details.startChangePos + offset, removeDirection);
                this.updateControl();
                this.updateCursor(cursorPos);
            }
            /** Handles view change event and commits model value */
        }, {
            key: "_onChange",
            value: function _onChange() {
                if (this.value !== this.el.value) {
                    this.updateValue();
                }
                this.masked.doCommit();
                this.updateControl();
                this._saveSelection();
            }
            /** Handles view drop event, prevents by default */
        }, {
            key: "_onDrop",
            value: function _onDrop(ev) {
                ev.preventDefault();
                ev.stopPropagation();
            }
            /** Restore last selection on focus */
        }, {
            key: "_onFocus",
            value: function _onFocus(ev) {
                if (this.selectionStart !== this.cursorPos)
                    return; // skip if range is selected
                if (this._selection)
                    this.cursorPos = this._selection.end;
                this.alignCursorFriendly();
            }
            /** Unbind view events and removes element reference */
        }, {
            key: "destroy",
            value: function destroy() {
                this._unbindEvents(); // $FlowFixMe why not do so?
                this._listeners.length = 0;
                delete this.el;
            }
        }, {
            key: "mask",
            get: function get() {
                return this.masked.mask;
            },
            set: function set(mask) {
                if (this.maskEquals(mask))
                    return;
                if (this.masked.constructor === maskedClass(mask)) {
                    this.masked.updateOptions({
                        mask: mask
                    });
                    return;
                }
                var masked = createMask({
                    mask: mask
                });
                masked.unmaskedValue = this.masked.unmaskedValue;
                this.masked = masked;
            }
            /** Raw value */
        }, {
            key: "value",
            get: function get() {
                return this._value;
            },
            set: function set(str) {
                this.masked.value = str;
                this.updateControl();
                this.alignCursor();
            }
            /** Unmasked value */
        }, {
            key: "unmaskedValue",
            get: function get() {
                return this._unmaskedValue;
            },
            set: function set(str) {
                this.masked.unmaskedValue = str;
                this.updateControl();
                this.alignCursor();
            }
            /** Typed unmasked value */
        }, {
            key: "typedValue",
            get: function get() {
                return this.masked.typedValue;
            },
            set: function set(val) {
                this.masked.typedValue = val;
                this.updateControl();
                this.alignCursor();
            }
        }, {
            key: "selectionStart",
            get: function get() {
                return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
            }
            /** Current cursor position */
        }, {
            key: "cursorPos",
            get: function get() {
                return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
            },
            set: function set(pos) {
                if (!this.el.isActive)
                    return;
                this.el.select(pos, pos);
                this._saveSelection();
            }
        }]);
    return InputMask;
}();
/** Pattern which validates enum values */
var MaskedEnum = 
/*#__PURE__*/
function (_MaskedPattern) {
    _inherits(MaskedEnum, _MaskedPattern);
    function MaskedEnum() {
        _classCallCheck(this, MaskedEnum);
        return _possibleConstructorReturn(this, _getPrototypeOf(MaskedEnum).apply(this, arguments));
    }
    _createClass(MaskedEnum, [{
            key: "_update",
            /**
              @override
              @param {Object} opts
            */
            value: function _update(opts) {
                // TODO type
                if (opts.enum)
                    opts.mask = '*'.repeat(opts.enum[0].length);
                _get(_getPrototypeOf(MaskedEnum.prototype), "_update", this).call(this, opts);
            }
            /**
              @override
            */
        }, {
            key: "doValidate",
            value: function doValidate() {
                var _this = this, _get2;
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }
                return this.enum.some(function (e) {
                    return e.indexOf(_this.unmaskedValue) >= 0;
                }) && (_get2 = _get(_getPrototypeOf(MaskedEnum.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args));
            }
        }]);
    return MaskedEnum;
}(MaskedPattern);
/**
  Number mask
  @param {Object} opts
  @param {string} opts.radix - Single char
  @param {string} opts.thousandsSeparator - Single char
  @param {Array<string>} opts.mapToRadix - Array of single chars
  @param {number} opts.min
  @param {number} opts.max
  @param {number} opts.scale - Digits after point
  @param {boolean} opts.signed - Allow negative
  @param {boolean} opts.normalizeZeros - Flag to remove leading and trailing zeros in the end of editing
  @param {boolean} opts.padFractionalZeros - Flag to pad trailing zeros after point in the end of editing
*/
var MaskedNumber = 
/*#__PURE__*/
function (_Masked) {
    _inherits(MaskedNumber, _Masked);
    /** Single char */
    /** Single char */
    /** Array of single chars */
    /** */
    /** */
    /** Digits after point */
    /** */
    /** Flag to remove leading and trailing zeros in the end of editing */
    /** Flag to pad trailing zeros after point in the end of editing */
    function MaskedNumber(opts) {
        _classCallCheck(this, MaskedNumber);
        return _possibleConstructorReturn(this, _getPrototypeOf(MaskedNumber).call(this, Object.assign({}, MaskedNumber.DEFAULTS, {}, opts)));
    }
    /**
      @override
    */
    _createClass(MaskedNumber, [{
            key: "_update",
            value: function _update(opts) {
                _get(_getPrototypeOf(MaskedNumber.prototype), "_update", this).call(this, opts);
                this._updateRegExps();
            }
            /** */
        }, {
            key: "_updateRegExps",
            value: function _updateRegExps() {
                // use different regexp to process user input (more strict, input suffix) and tail shifting
                var start = '^' + (this.allowNegative ? '[+|\\-]?' : '');
                var midInput = '(0|([1-9]+\\d*))?';
                var mid = '\\d*';
                var end = (this.scale ? '(' + escapeRegExp(this.radix) + '\\d{0,' + this.scale + '})?' : '') + '$';
                this._numberRegExpInput = new RegExp(start + midInput + end);
                this._numberRegExp = new RegExp(start + mid + end);
                this._mapToRadixRegExp = new RegExp('[' + this.mapToRadix.map(escapeRegExp).join('') + ']', 'g');
                this._thousandsSeparatorRegExp = new RegExp(escapeRegExp(this.thousandsSeparator), 'g');
            }
            /** */
        }, {
            key: "_removeThousandsSeparators",
            value: function _removeThousandsSeparators(value) {
                return value.replace(this._thousandsSeparatorRegExp, '');
            }
            /** */
        }, {
            key: "_insertThousandsSeparators",
            value: function _insertThousandsSeparators(value) {
                // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
                var parts = value.split(this.radix);
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
                return parts.join(this.radix);
            }
            /**
              @override
            */
        }, {
            key: "doPrepare",
            value: function doPrepare(str) {
                var _get2;
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }
                return (_get2 = _get(_getPrototypeOf(MaskedNumber.prototype), "doPrepare", this)).call.apply(_get2, [this, this._removeThousandsSeparators(str.replace(this._mapToRadixRegExp, this.radix))].concat(args));
            }
            /** */
        }, {
            key: "_separatorsCount",
            value: function _separatorsCount(to) {
                var extendOnSeparators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                var count = 0;
                for (var pos = 0; pos < to; ++pos) {
                    if (this._value.indexOf(this.thousandsSeparator, pos) === pos) {
                        ++count;
                        if (extendOnSeparators)
                            to += this.thousandsSeparator.length;
                    }
                }
                return count;
            }
            /** */
        }, {
            key: "_separatorsCountFromSlice",
            value: function _separatorsCountFromSlice() {
                var slice = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._value;
                return this._separatorsCount(this._removeThousandsSeparators(slice).length, true);
            }
            /**
              @override
            */
        }, {
            key: "extractInput",
            value: function extractInput() {
                var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
                var flags = arguments.length > 2 ? arguments[2] : undefined;
                var _this$_adjustRangeWit = this._adjustRangeWithSeparators(fromPos, toPos);
                var _this$_adjustRangeWit2 = _slicedToArray(_this$_adjustRangeWit, 2);
                fromPos = _this$_adjustRangeWit2[0];
                toPos = _this$_adjustRangeWit2[1];
                return this._removeThousandsSeparators(_get(_getPrototypeOf(MaskedNumber.prototype), "extractInput", this).call(this, fromPos, toPos, flags));
            }
            /**
              @override
            */
        }, {
            key: "_appendCharRaw",
            value: function _appendCharRaw(ch) {
                var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                if (!this.thousandsSeparator)
                    return _get(_getPrototypeOf(MaskedNumber.prototype), "_appendCharRaw", this).call(this, ch, flags);
                var prevBeforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;
                var prevBeforeTailSeparatorsCount = this._separatorsCountFromSlice(prevBeforeTailValue);
                this._value = this._removeThousandsSeparators(this.value);
                var appendDetails = _get(_getPrototypeOf(MaskedNumber.prototype), "_appendCharRaw", this).call(this, ch, flags);
                this._value = this._insertThousandsSeparators(this._value);
                var beforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;
                var beforeTailSeparatorsCount = this._separatorsCountFromSlice(beforeTailValue);
                appendDetails.tailShift += (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length;
                return appendDetails;
            }
            /** */
        }, {
            key: "_findSeparatorAround",
            value: function _findSeparatorAround(pos) {
                if (this.thousandsSeparator) {
                    var searchFrom = pos - this.thousandsSeparator.length + 1;
                    var separatorPos = this.value.indexOf(this.thousandsSeparator, searchFrom);
                    if (separatorPos <= pos)
                        return separatorPos;
                }
                return -1;
            }
        }, {
            key: "_adjustRangeWithSeparators",
            value: function _adjustRangeWithSeparators(from, to) {
                var separatorAroundFromPos = this._findSeparatorAround(from);
                if (separatorAroundFromPos >= 0)
                    from = separatorAroundFromPos;
                var separatorAroundToPos = this._findSeparatorAround(to);
                if (separatorAroundToPos >= 0)
                    to = separatorAroundToPos + this.thousandsSeparator.length;
                return [from, to];
            }
            /**
              @override
            */
        }, {
            key: "remove",
            value: function remove() {
                var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
                var _this$_adjustRangeWit3 = this._adjustRangeWithSeparators(fromPos, toPos);
                var _this$_adjustRangeWit4 = _slicedToArray(_this$_adjustRangeWit3, 2);
                fromPos = _this$_adjustRangeWit4[0];
                toPos = _this$_adjustRangeWit4[1];
                var valueBeforePos = this.value.slice(0, fromPos);
                var valueAfterPos = this.value.slice(toPos);
                var prevBeforeTailSeparatorsCount = this._separatorsCount(valueBeforePos.length);
                this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(valueBeforePos + valueAfterPos));
                var beforeTailSeparatorsCount = this._separatorsCountFromSlice(valueBeforePos);
                return new ChangeDetails({
                    tailShift: (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length
                });
            }
            /**
              @override
            */
        }, {
            key: "nearestInputPos",
            value: function nearestInputPos(cursorPos, direction) {
                if (!this.thousandsSeparator)
                    return cursorPos;
                switch (direction) {
                    case DIRECTION.NONE:
                    case DIRECTION.LEFT:
                    case DIRECTION.FORCE_LEFT:
                        {
                            var separatorAtLeftPos = this._findSeparatorAround(cursorPos - 1);
                            if (separatorAtLeftPos >= 0) {
                                var separatorAtLeftEndPos = separatorAtLeftPos + this.thousandsSeparator.length;
                                if (cursorPos < separatorAtLeftEndPos || this.value.length <= separatorAtLeftEndPos || direction === DIRECTION.FORCE_LEFT) {
                                    return separatorAtLeftPos;
                                }
                            }
                            break;
                        }
                    case DIRECTION.RIGHT:
                    case DIRECTION.FORCE_RIGHT:
                        {
                            var separatorAtRightPos = this._findSeparatorAround(cursorPos);
                            if (separatorAtRightPos >= 0) {
                                return separatorAtRightPos + this.thousandsSeparator.length;
                            }
                        }
                }
                return cursorPos;
            }
            /**
              @override
            */
        }, {
            key: "doValidate",
            value: function doValidate(flags) {
                var regexp = flags.input ? this._numberRegExpInput : this._numberRegExp; // validate as string
                var valid = regexp.test(this._removeThousandsSeparators(this.value));
                if (valid) {
                    // validate as number
                    var number = this.number;
                    valid = valid && !isNaN(number) && ( // check min bound for negative values
                    this.min == null || this.min >= 0 || this.min <= this.number) && ( // check max bound for positive values
                    this.max == null || this.max <= 0 || this.number <= this.max);
                }
                return valid && _get(_getPrototypeOf(MaskedNumber.prototype), "doValidate", this).call(this, flags);
            }
            /**
              @override
            */
        }, {
            key: "doCommit",
            value: function doCommit() {
                if (this.value) {
                    var number = this.number;
                    var validnum = number; // check bounds
                    if (this.min != null)
                        validnum = Math.max(validnum, this.min);
                    if (this.max != null)
                        validnum = Math.min(validnum, this.max);
                    if (validnum !== number)
                        this.unmaskedValue = String(validnum);
                    var formatted = this.value;
                    if (this.normalizeZeros)
                        formatted = this._normalizeZeros(formatted);
                    if (this.padFractionalZeros)
                        formatted = this._padFractionalZeros(formatted);
                    this._value = formatted;
                }
                _get(_getPrototypeOf(MaskedNumber.prototype), "doCommit", this).call(this);
            }
            /** */
        }, {
            key: "_normalizeZeros",
            value: function _normalizeZeros(value) {
                var parts = this._removeThousandsSeparators(value).split(this.radix); // remove leading zeros
                parts[0] = parts[0].replace(/^(\D*)(0*)(\d*)/, function (match, sign, zeros, num) {
                    return sign + num;
                }); // add leading zero
                if (value.length && !/\d$/.test(parts[0]))
                    parts[0] = parts[0] + '0';
                if (parts.length > 1) {
                    parts[1] = parts[1].replace(/0*$/, ''); // remove trailing zeros
                    if (!parts[1].length)
                        parts.length = 1; // remove fractional
                }
                return this._insertThousandsSeparators(parts.join(this.radix));
            }
            /** */
        }, {
            key: "_padFractionalZeros",
            value: function _padFractionalZeros(value) {
                if (!value)
                    return value;
                var parts = value.split(this.radix);
                if (parts.length < 2)
                    parts.push('');
                parts[1] = parts[1].padEnd(this.scale, '0');
                return parts.join(this.radix);
            }
            /**
              @override
            */
        }, {
            key: "unmaskedValue",
            get: function get() {
                return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, '.');
            },
            set: function set(unmaskedValue) {
                _set(_getPrototypeOf(MaskedNumber.prototype), "unmaskedValue", unmaskedValue.replace('.', this.radix), this, true);
            }
            /** Parsed Number */
        }, {
            key: "number",
            get: function get() {
                return Number(this.unmaskedValue);
            },
            set: function set(number) {
                this.unmaskedValue = String(number);
            }
            /**
              @override
            */
        }, {
            key: "typedValue",
            get: function get() {
                return this.number;
            },
            set: function set(value) {
                this.number = value;
            }
            /**
              Is negative allowed
              @readonly
            */
        }, {
            key: "allowNegative",
            get: function get() {
                return this.signed || this.min != null && this.min < 0 || this.max != null && this.max < 0;
            }
        }]);
    return MaskedNumber;
}(Masked);
MaskedNumber.DEFAULTS = {
    radix: ',',
    thousandsSeparator: '',
    mapToRadix: ['.'],
    scale: 2,
    signed: false,
    normalizeZeros: true,
    padFractionalZeros: false
};
/** Masking by RegExp */
var MaskedRegExp = 
/*#__PURE__*/
function (_Masked) {
    _inherits(MaskedRegExp, _Masked);
    function MaskedRegExp() {
        _classCallCheck(this, MaskedRegExp);
        return _possibleConstructorReturn(this, _getPrototypeOf(MaskedRegExp).apply(this, arguments));
    }
    _createClass(MaskedRegExp, [{
            key: "_update",
            /**
              @override
              @param {Object} opts
            */
            value: function _update(opts) {
                if (opts.mask)
                    opts.validate = function (value) {
                        return value.search(opts.mask) >= 0;
                    };
                _get(_getPrototypeOf(MaskedRegExp.prototype), "_update", this).call(this, opts);
            }
        }]);
    return MaskedRegExp;
}(Masked);
/** Masking by custom Function */
var MaskedFunction = 
/*#__PURE__*/
function (_Masked) {
    _inherits(MaskedFunction, _Masked);
    function MaskedFunction() {
        _classCallCheck(this, MaskedFunction);
        return _possibleConstructorReturn(this, _getPrototypeOf(MaskedFunction).apply(this, arguments));
    }
    _createClass(MaskedFunction, [{
            key: "_update",
            /**
              @override
              @param {Object} opts
            */
            value: function _update(opts) {
                if (opts.mask)
                    opts.validate = opts.mask;
                _get(_getPrototypeOf(MaskedFunction.prototype), "_update", this).call(this, opts);
            }
        }]);
    return MaskedFunction;
}(Masked);
/** Dynamic mask for choosing apropriate mask in run-time */
var MaskedDynamic = 
/*#__PURE__*/
function (_Masked) {
    _inherits(MaskedDynamic, _Masked);
    /** Currently chosen mask */
    /** Compliled {@link Masked} options */
    /** Chooses {@link Masked} depending on input value */
    /**
      @param {Object} opts
    */
    function MaskedDynamic(opts) {
        var _this;
        _classCallCheck(this, MaskedDynamic);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(MaskedDynamic).call(this, Object.assign({}, MaskedDynamic.DEFAULTS, {}, opts)));
        _this.currentMask = null;
        return _this;
    }
    /**
      @override
    */
    _createClass(MaskedDynamic, [{
            key: "_update",
            value: function _update(opts) {
                _get(_getPrototypeOf(MaskedDynamic.prototype), "_update", this).call(this, opts);
                if ('mask' in opts) {
                    // mask could be totally dynamic with only `dispatch` option
                    this.compiledMasks = Array.isArray(opts.mask) ? opts.mask.map(function (m) {
                        return createMask(m);
                    }) : [];
                }
            }
            /**
              @override
            */
        }, {
            key: "_appendCharRaw",
            value: function _appendCharRaw() {
                var details = this._applyDispatch.apply(this, arguments);
                if (this.currentMask) {
                    var _this$currentMask;
                    details.aggregate((_this$currentMask = this.currentMask)._appendChar.apply(_this$currentMask, arguments));
                }
                return details;
            }
        }, {
            key: "_applyDispatch",
            value: function _applyDispatch() {
                var appended = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var prevValueBeforeTail = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._value : this.value;
                var inputValue = this.rawInputValue;
                var insertValue = flags.tail && flags._beforeTailState != null ? // $FlowFixMe - tired to fight with type system
                    flags._beforeTailState._rawInputValue : inputValue;
                var tailValue = inputValue.slice(insertValue.length);
                var prevMask = this.currentMask;
                var details = new ChangeDetails();
                var prevMaskState = prevMask && prevMask.state; // clone flags to prevent overwriting `_beforeTailState`
                this.currentMask = this.doDispatch(appended, Object.assign({}, flags)); // restore state after dispatch
                if (this.currentMask) {
                    if (this.currentMask !== prevMask) {
                        // if mask changed reapply input
                        this.currentMask.reset(); // $FlowFixMe - it's ok, we don't change current mask above
                        var d = this.currentMask.append(insertValue, {
                            raw: true
                        });
                        details.tailShift = d.inserted.length - prevValueBeforeTail.length;
                        if (tailValue) {
                            // $FlowFixMe - it's ok, we don't change current mask above
                            details.tailShift += this.currentMask.append(tailValue, {
                                raw: true,
                                tail: true
                            }).tailShift;
                        }
                    }
                    else {
                        // Dispatch can do something bad with state, so
                        // restore prev mask state
                        this.currentMask.state = prevMaskState;
                    }
                }
                return details;
            }
        }, {
            key: "_appendPlaceholder",
            value: function _appendPlaceholder() {
                var details = this._applyDispatch.apply(this, arguments);
                if (this.currentMask) {
                    details.aggregate(this.currentMask._appendPlaceholder());
                }
                return details;
            }
            /**
              @override
            */
        }, {
            key: "doDispatch",
            value: function doDispatch(appended) {
                var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                return this.dispatch(appended, this, flags);
            }
            /**
              @override
            */
        }, {
            key: "doValidate",
            value: function doValidate() {
                var _get2, _this$currentMask2;
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }
                return (_get2 = _get(_getPrototypeOf(MaskedDynamic.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args)) && (!this.currentMask || (_this$currentMask2 = this.currentMask).doValidate.apply(_this$currentMask2, args));
            }
            /**
              @override
            */
        }, {
            key: "reset",
            value: function reset() {
                if (this.currentMask)
                    this.currentMask.reset();
                this.compiledMasks.forEach(function (m) {
                    return m.reset();
                });
            }
            /**
              @override
            */
        }, {
            key: "remove",
            /**
              @override
            */
            value: function remove() {
                var details = new ChangeDetails();
                if (this.currentMask) {
                    var _this$currentMask3;
                    details.aggregate((_this$currentMask3 = this.currentMask).remove.apply(_this$currentMask3, arguments)) // update with dispatch
                        .aggregate(this._applyDispatch());
                }
                return details;
            }
            /**
              @override
            */
        }, {
            key: "extractInput",
            /**
              @override
            */
            value: function extractInput() {
                var _this$currentMask4;
                return this.currentMask ? (_this$currentMask4 = this.currentMask).extractInput.apply(_this$currentMask4, arguments) : '';
            }
            /**
              @override
            */
        }, {
            key: "extractTail",
            value: function extractTail() {
                var _this$currentMask5, _get3;
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }
                return this.currentMask ? (_this$currentMask5 = this.currentMask).extractTail.apply(_this$currentMask5, args) : (_get3 = _get(_getPrototypeOf(MaskedDynamic.prototype), "extractTail", this)).call.apply(_get3, [this].concat(args));
            }
            /**
              @override
            */
        }, {
            key: "doCommit",
            value: function doCommit() {
                if (this.currentMask)
                    this.currentMask.doCommit();
                _get(_getPrototypeOf(MaskedDynamic.prototype), "doCommit", this).call(this);
            }
            /**
              @override
            */
        }, {
            key: "nearestInputPos",
            value: function nearestInputPos() {
                var _this$currentMask6, _get4;
                for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    args[_key3] = arguments[_key3];
                }
                return this.currentMask ? (_this$currentMask6 = this.currentMask).nearestInputPos.apply(_this$currentMask6, args) : (_get4 = _get(_getPrototypeOf(MaskedDynamic.prototype), "nearestInputPos", this)).call.apply(_get4, [this].concat(args));
            }
        }, {
            key: "value",
            get: function get() {
                return this.currentMask ? this.currentMask.value : '';
            },
            set: function set(value) {
                _set(_getPrototypeOf(MaskedDynamic.prototype), "value", value, this, true);
            }
            /**
              @override
            */
        }, {
            key: "unmaskedValue",
            get: function get() {
                return this.currentMask ? this.currentMask.unmaskedValue : '';
            },
            set: function set(unmaskedValue) {
                _set(_getPrototypeOf(MaskedDynamic.prototype), "unmaskedValue", unmaskedValue, this, true);
            }
            /**
              @override
            */
        }, {
            key: "typedValue",
            get: function get() {
                return this.currentMask ? this.currentMask.typedValue : '';
            } // probably typedValue should not be used with dynamic
            ,
            set: function set(value) {
                var unmaskedValue = String(value); // double check it
                if (this.currentMask) {
                    this.currentMask.typedValue = value;
                    unmaskedValue = this.currentMask.unmaskedValue;
                }
                this.unmaskedValue = unmaskedValue;
            }
            /**
              @override
            */
        }, {
            key: "isComplete",
            get: function get() {
                return !!this.currentMask && this.currentMask.isComplete;
            }
        }, {
            key: "state",
            get: function get() {
                return Object.assign({}, _get(_getPrototypeOf(MaskedDynamic.prototype), "state", this), {
                    _rawInputValue: this.rawInputValue,
                    compiledMasks: this.compiledMasks.map(function (m) {
                        return m.state;
                    }),
                    currentMaskRef: this.currentMask,
                    currentMask: this.currentMask && this.currentMask.state
                });
            },
            set: function set(state) {
                var compiledMasks = state.compiledMasks, currentMaskRef = state.currentMaskRef, currentMask = state.currentMask, maskedState = _objectWithoutProperties(state, ["compiledMasks", "currentMaskRef", "currentMask"]);
                this.compiledMasks.forEach(function (m, mi) {
                    return m.state = compiledMasks[mi];
                });
                if (currentMaskRef != null) {
                    this.currentMask = currentMaskRef;
                    this.currentMask.state = currentMask;
                }
                _set(_getPrototypeOf(MaskedDynamic.prototype), "state", maskedState, this, true);
            }
        }, {
            key: "overwrite",
            get: function get() {
                return this.currentMask ? this.currentMask.overwrite : _get(_getPrototypeOf(MaskedDynamic.prototype), "overwrite", this);
            },
            set: function set(overwrite) {
                console.warn('"overwrite" option is not available in dynamic mask, use this option in siblings');
            }
        }]);
    return MaskedDynamic;
}(Masked);
MaskedDynamic.DEFAULTS = {
    dispatch: function dispatch(appended, masked, flags) {
        if (!masked.compiledMasks.length)
            return;
        var inputValue = masked.rawInputValue; // simulate input
        var inputs = masked.compiledMasks.map(function (m, index) {
            m.reset();
            m.append(inputValue, {
                raw: true
            });
            m.append(appended, flags);
            var weight = m.rawInputValue.length;
            return {
                weight: weight,
                index: index
            };
        }); // pop masks with longer values first
        inputs.sort(function (i1, i2) {
            return i2.weight - i1.weight;
        });
        return masked.compiledMasks[inputs[0].index];
    }
};
/**
 * Applies mask on element.
 * @constructor
 * @param {HTMLInputElement|HTMLTextAreaElement|MaskElement} el - Element to apply mask
 * @param {Object} opts - Custom mask options
 * @return {InputMask}
 */
function IMask(el) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    // currently available only for input-like elements
    return new InputMask(el, opts);
}
/** {@link InputMask} */
IMask.InputMask = InputMask;
/** {@link Masked} */
IMask.Masked = Masked;
/** {@link MaskedPattern} */
IMask.MaskedPattern = MaskedPattern;
/** {@link MaskedEnum} */
IMask.MaskedEnum = MaskedEnum;
/** {@link MaskedRange} */
IMask.MaskedRange = MaskedRange;
/** {@link MaskedNumber} */
IMask.MaskedNumber = MaskedNumber;
/** {@link MaskedDate} */
IMask.MaskedDate = MaskedDate;
/** {@link MaskedRegExp} */
IMask.MaskedRegExp = MaskedRegExp;
/** {@link MaskedFunction} */
IMask.MaskedFunction = MaskedFunction;
/** {@link MaskedDynamic} */
IMask.MaskedDynamic = MaskedDynamic;
/** {@link createMask} */
IMask.createMask = createMask;
/** {@link MaskElement} */
IMask.MaskElement = MaskElement;
/** {@link HTMLMaskElement} */
IMask.HTMLMaskElement = HTMLMaskElement;
g.IMask = IMask;
var BASIC_TYPES = [
    'color',
    'email',
    'number',
    'password',
    'search',
    'tel',
    'text',
    'time',
    'url',
];
var MapMaskTypes = {
    enum: IMask.MaskedEnum,
    range: IMask.MaskedRange,
};
var MASKED_TYPE = 'masked';
var ShadowHTMLMaskElement = /** @class */ (function (_super) {
    __extends(ShadowHTMLMaskElement, _super);
    function ShadowHTMLMaskElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ShadowHTMLMaskElement.prototype, "isActive", {
        get: function () {
            var active = document.activeElement;
            while (active && active.shadowRoot && active.shadowRoot.activeElement) {
                active = active.shadowRoot.activeElement;
            }
            return this.input === active;
        },
        enumerable: true,
        configurable: true
    });
    return ShadowHTMLMaskElement;
}(IMask.HTMLMaskElement));
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WfInput = /** @class */ (function () {
    function class_2(hostRef) {
        var _this_1 = this;
        registerInstance(this, hostRef);
        /** Decides if label has inline position */
        this.inlineLabel = false;
        /** Type of input */
        this.type = 'text';
        /** Variant of input */
        this.variant = 'primary';
        /** Input icon size */
        this.iconSize = 'xs';
        /** Input locked icon */
        this.lockedIcon = 'wf-locked';
        /** Input locked icon size */
        this.lockedIconSize = 'xs';
        /** Decides if input is disabled */
        this.disabled = false;
        /** Decides if input in locked state */
        this.locked = false;
        /** Decides if input is in readonly mode */
        this.readonly = false;
        /** Decides if input has an error */
        this.error = false;
        /** Decides if input field required */
        this.required = false;
        /** Value type returned from masked type input */
        this.maskValue = 'value';
        /** Input value alignment */
        this.textAlign = 'left';
        this.setInputLeftPadding = function () {
            var prefixLabel = _this_1.prefixLabel;
            if (!prefixLabel)
                return;
            var input = _this_1.getNativeInput();
            var prefix = _this_1.getHost().shadowRoot.querySelector('.prefix');
            var paddingLeft = window.getComputedStyle(input, null).getPropertyValue('padding-left');
            var prefixWidth = window.getComputedStyle(prefix, null).getPropertyValue('width');
            var paddingSum = parseInt(paddingLeft, 2) + removePX(prefixWidth) + 12;
            input.style.paddingLeft = setPX(paddingSum);
        };
        this.handleInput = function (event) {
            event.stopPropagation();
            var nativeInput = event.target;
            // this is to make sure value will get most recent masked value
            setTimeout(function () {
                _this_1.value = nativeInput.value;
                var emittedValue = _this_1.getValueToEmit();
                _this_1.input.emit(emittedValue);
            });
        };
        this.handleChange = function (event) {
            event.stopPropagation();
            var nativeInput = event.target;
            _this_1.value = nativeInput.value;
            var emittedValue = _this_1.getValueToEmit();
            _this_1.change.emit(emittedValue);
        };
        this.handleOnFocus = function () {
            _this_1.wfFocus.emit();
        };
        this.handleOnBlur = function () {
            _this_1.wfBlur.emit();
        };
        this.formResetListener = function () {
            var _a = _this_1, mask = _a.mask, maskValue = _a.maskValue;
            _this_1.value = _this_1.initialValue;
            var emittedValue = !!mask ? mask[maskValue] : _this_1.value;
            _this_1.change.emit(emittedValue);
        };
        this.handleIconClick = function () {
            _this_1.wfClick.emit();
            _this_1.iconClick.emit();
        };
        this.iconClick = createEvent(this, "iconClick", 7);
        this.wfFocus = createEvent(this, "wfFocus", 7);
        this.wfBlur = createEvent(this, "wfBlur", 7);
        this.wfClick = createEvent(this, "wfClick", 7);
        this.docChange = createEvent(this, "change", 7);
        this.docWfChange = createEvent(this, "wfChange", 7);
        this.docInput = createEvent(this, "input", 7);
        this.docWfInput = createEvent(this, "wfInput", 7);
        this.docFocus = createEvent(this, "focus", 7);
        this.docBlur = createEvent(this, "blur", 7);
        this.docClick = createEvent(this, "click", 7);
    }
    /** Input focus method */
    class_2.prototype.setFocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.getNativeInput().focus();
                return [2 /*return*/];
            });
        });
    };
    /** Input select method */
    class_2.prototype.selectText = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.getNativeInput().select();
                return [2 /*return*/];
            });
        });
    };
    class_2.prototype.getHost = function () {
        return this.host;
    };
    Object.defineProperty(class_2.prototype, "isMasked", {
        get: function () {
            return this.type === MASKED_TYPE;
        },
        enumerable: true,
        configurable: true
    });
    class_2.prototype.getNativeInput = function () {
        return this.getHost().shadowRoot.querySelector('input');
    };
    class_2.prototype.getValueToEmit = function () {
        var _a = this, value = _a.value, mask = _a.mask, maskValue = _a.maskValue;
        return !!mask && value.length > 0 ? mask[maskValue] : value;
    };
    class_2.prototype.componentWillLoad = function () {
        var _a = this, inputId = _a.inputId, value = _a.value;
        this.initialValue = value;
        if (inputId) {
            return;
        }
        this.inputId = "form-element-" + generateUniqueId();
    };
    class_2.prototype.addIntersectionObserver = function (element) {
        var _this_1 = this;
        var observer = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting === true) {
                _this_1.setInputLeftPadding();
            }
        }, { threshold: [0] });
        observer.observe(element);
    };
    class_2.prototype.componentDidLoad = function () {
        this.form = this.getHost().closest('form');
        if (this.form) {
            this.form.addEventListener('reset', this.formResetListener);
        }
        this.initMask();
        var host = this.getHost();
        this.addIntersectionObserver(host);
    };
    class_2.prototype.initMask = function () {
        if (!this.isMasked || this.mask) {
            return;
        }
        var nativeInput = this.getNativeInput();
        this.mask = IMask(new ShadowHTMLMaskElement(nativeInput), {
            mask: /.*/,
        });
        if (this.maskOptions) {
            var options = this.mapMaskOptions(this.maskOptions);
            this.mask.updateOptions(options);
        }
    };
    class_2.prototype.mapMaskOptions = function (options) {
        var maskOption = function (option) {
            var mapHeader = function (option) { return MapMaskTypes[option.mask] ? Object.assign(Object.assign({}, option), { mask: MapMaskTypes[option.mask] }) : option; };
            var highLevelMaskType = mapHeader(option);
            if (!highLevelMaskType.blocks)
                return highLevelMaskType;
            return Object.assign(Object.assign({}, highLevelMaskType), { blocks: Object.keys(highLevelMaskType.blocks).reduce(function (acc, key) {
                    acc[key] = mapHeader(highLevelMaskType.blocks[key]);
                    return acc;
                }, {}) });
        };
        return Array.isArray(options) ? options.map(maskOption) : maskOption(options);
    };
    class_2.prototype.componentDidUnload = function () {
        if (this.form) {
            this.form.removeEventListener('reset', this.formResetListener);
        }
        this.dropMask();
    };
    class_2.prototype.dropMask = function () {
        if (!this.mask) {
            return;
        }
        this.mask.destroy();
        delete this.mask;
    };
    class_2.prototype.handleType = function () {
        // this is in case masked to any other type change
        this.dropMask();
        // this is in case from any other to masked type change
        this.initMask();
    };
    class_2.prototype.handleMaskOptions = function (maskOptions) {
        // due to teh complex nature of mask options the attribute is not supported
        if (!this.isMasked || !this.mask || typeof maskOptions === 'string') {
            return;
        }
        this.mask.updateOptions(this.mapMaskOptions(this.maskOptions));
    };
    class_2.prototype.handleValue = function () {
        var nativeInput = this.getNativeInput();
        if (!this.isMasked || !this.mask || this.value === nativeInput.value) {
            return;
        }
        nativeInput.value = this.value;
        this.mask.updateValue();
        this.mask.updateControl();
        this.value = nativeInput.value;
    };
    class_2.prototype.renderLockedIcon = function () {
        var _a;
        var _b = this, lockedIcon = _b.lockedIcon, lockedIconSize = _b.lockedIconSize, locked = _b.locked, variant = _b.variant;
        var iconClasses = (_a = {},
            _a["form-control-icon-locked-" + lockedIconSize] = true,
            _a["form-control-icon-locked-" + variant] = true,
            _a);
        return (locked && h("wf-icon", { class: iconClasses, size: lockedIconSize, name: lockedIcon }));
    };
    class_2.prototype.renderLabel = function () {
        var _a, _b;
        var _c = this, error = _c.error, required = _c.required, variant = _c.variant, inputId = _c.inputId, label = _c.label, inlineLabel = _c.inlineLabel, caption = _c.caption;
        var displayLabel = label || caption;
        var labelClasses = (_a = {},
            _a["form-label"] = true,
            _a["form-label-inline"] = inlineLabel || (!!caption && !!!label),
            _a["form-label-" + variant] = variant === 'inverse',
            _a["form-label-error"] = !!error,
            _a);
        var asteriskClasses = (_b = {},
            _b["error"] = !!error,
            _b['required'] = !error && !!required,
            _b);
        return (h("label", { class: labelClasses, htmlFor: inputId }, displayLabel, (!!error || !!required) && h("span", { class: asteriskClasses }, "*")));
    };
    class_2.prototype.render = function () {
        var _a, _b, _c;
        var _f = this, type = _f.type, inputId = _f.inputId, variant = _f.variant, size = _f.size, value = _f.value, placeholder = _f.placeholder, disabled = _f.disabled, error = _f.error, errorMessage = _f.errorMessage, locked = _f.locked, readonly = _f.readonly, label = _f.label, inlineLabel = _f.inlineLabel, caption = _f.caption, description = _f.description, icon = _f.icon, iconSize = _f.iconSize, maxlength = _f.maxlength, required = _f.required, prefixLabel = _f.prefixLabel, textAlign = _f.textAlign, handleChange = _f.handleChange, handleInput = _f.handleInput, handleOnFocus = _f.handleOnFocus, handleOnBlur = _f.handleOnBlur, handleIconClick = _f.handleIconClick;
        var newType = BASIC_TYPES.includes(type) ? type : 'text';
        var containerClasses = (_a = {},
            _a["form-group"] = true,
            _a["form-group-" + variant] = variant === 'inverse',
            _a["inline-form-group"] = inlineLabel || (!!caption && !!!label),
            _a);
        var inputClasses = (_b = {
                'form-control': true
            },
            _b["form-input-type-" + newType] = true,
            _b["form-control-" + variant] = !!variant,
            _b["form-control-" + size] = !!size,
            _b["form-control-icon-" + iconSize] = !!icon,
            _b["form-control-error"] = !!error,
            _b["form-control-disabled"] = !!disabled,
            _b["form-control-required"] = !!required,
            _b["form-control-locked"] = !!locked,
            _b["form-control-text-align-" + textAlign] = !!textAlign,
            _b);
        var iconClasses = (_c = {
                'form-control-icon-wrapper': true
            },
            _c["form-control-icon-wrapper-" + iconSize] = !!iconSize,
            _c);
        var inputAttributes = Object.assign(Object.assign({ type: newType, id: inputId, class: inputClasses, readonly: locked || readonly, disabled: disabled,
            placeholder: placeholder, onChange: handleChange, onInput: handleInput, onfocus: handleOnFocus, onblur: handleOnBlur }, (maxlength ? { maxlength: maxlength } : {})), { value: value });
        return (h("wf-tooltip", Object.assign({}, prepareErrorTooltip(error, errorMessage)), h("div", { class: containerClasses }, (!!label || !!caption) && this.renderLabel(), h("div", { class: "form-control-wrapper" }, !!prefixLabel && h("span", { class: "prefix" }, prefixLabel), this.renderLockedIcon(), h("input", Object.assign({}, inputAttributes)), !!icon && (h("div", { class: iconClasses, onClick: handleIconClick }, h("wf-icon", { size: iconSize, name: icon })))), !!description && h("div", { class: "form-control-description" }, description), showErrorMessage(error, errorMessage) && (h("div", { class: "form-control-error-message", innerHTML: errorMessage.text })))));
    };
    Object.defineProperty(class_2.prototype, "host", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_2, "watchers", {
        get: function () {
            return {
                "type": ["handleType"],
                "maskOptions": ["handleMaskOptions"],
                "value": ["handleValue"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_2, "style", {
        get: function () { return ".all-caps{font-family:var(--all-caps-font-family,var(--font-family));font-weight:var(--all-caps-font-weight,var(--font-weight-bold,var(--font-weight,normal)));font-size:var(--all-caps-font-size,13px);line-height:var(--all-caps-line-height,15px);text-transform:var(--all-caps-text-transform,uppercase);letter-spacing:var(--all-caps-letter-spacing,1px)}.label-1{font-family:var(--label-1-font-family,var(--label-font-family));font-size:var(--label-1-font-size,var(--label-font-size));line-height:var(--label-1-line-height,var(--label-line-height));color:var(--label-1-color,var(--label-color));letter-spacing:var(--label-1-spacing,var(--label-letter-spacing));font-weight:var(--label-1-font-weight,var(--label-font-weight));text-transform:var(--label-1-text-transform,var(--label-text-transform))}.label-2{font-family:var(--label-2-font-family,var(--label-font-family));font-size:var(--label-2-font-size,var(--label-font-size));line-height:var(--label-2-line-height,var(--label-line-height));color:var(--label-2-color,var(--label-color));letter-spacing:var(--label-2-spacing,var(--label-letter-spacing));font-weight:var(--label-2-font-weight,var(--label-font-weight));text-transform:var(--label-2-text-transform,var(--label-text-transform))}.label-3{font-family:var(--label-3-font-family,var(--label-font-family));font-size:var(--label-3-font-size,var(--label-font-size));line-height:var(--label-3-line-height,var(--label-line-height));color:var(--label-3-color,var(--label-color));letter-spacing:var(--label-3-spacing,var(--label-letter-spacing));font-weight:var(--label-3-font-weight,var(--label-font-weight));text-transform:var(--label-3-text-transform,var(--label-text-transform))}.label-4{font-family:var(--label-4-font-family,var(--label-font-family));font-size:var(--label-4-font-size,var(--label-font-size));line-height:var(--label-4-line-height,var(--label-line-height));color:var(--label-4-color,var(--label-color));letter-spacing:var(--label-4-spacing,var(--label-letter-spacing));font-weight:var(--label-4-font-weight,var(--label-font-weight));text-transform:var(--label-4-text-transform,var(--label-text-transform))}.label-5{font-family:var(--label-5-font-family,var(--label-font-family));font-size:var(--label-5-font-size,var(--label-font-size));line-height:var(--label-5-line-height,var(--label-line-height));color:var(--label-5-color,var(--label-color));letter-spacing:var(--label-5-spacing,var(--label-letter-spacing));font-weight:var(--label-5-font-weight,var(--label-font-weight));text-transform:var(--label-5-text-transform,var(--label-text-transform))}.label-secondary{color:var(--label-secondary-color,var(--color-text-secondary,var(--text-secondary-color,#444)))}.label-tertiary{color:var(--label-tertiary-color,var(--text-tertiary-color,#646464))}.label-inverse{color:var(--label-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}:host{display:inline-block;vertical-align:var(--form-control-vertical-align,bottom)}.form-label,:host .form-tooltip{display:block}.form-label{font-family:var(--form-control-label-font-family);font-size:var(--form-control-label-font-size,var(--font-size-small,.9em));color:var(--form-control-label-color,var(--color-text-secondary,var(--text-secondary-color,#444)));line-height:var(--form-control-label-line-height);margin-bottom:var(--form-control-label-margin-bottom,var(--spacing-xxs,6px))}.form-label-inline{display:inline-block;text-align:right;padding-right:var(--form-control-label-inline-padding-right,var(--spacing-s,24px));padding-left:0;margin:0;width:var(--form-control-caption-width,var(--form-control-label-inline-width,25%));-ms-flex:1;flex:1}.form-label-locked{pointer-events:none}.form-label-error{color:var(--form-control-label-color-error,var(--form-control-error-label-color))}.form-label-inverse{color:var(--form-control-inverse-label-color,hsla(0,0%,100%,.8))}.form-label .required{color:var(--form-control-required-asterisk-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31))))}.form-label .error{color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-control{display:block;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:var(--form-control-font-family);font-weight:var(--form-control-font-weight);font-size:var(--form-control-font-size);border-width:0;border-style:var(--form-control-border-style,solid);border-radius:var(--form-control-border-radius);height:var(--form-control-size-m,var(--form-control-height,var(--spacing-m,36px)));-webkit-box-shadow:var(--form-control-box-shadow);box-shadow:var(--form-control-box-shadow)}.form-control-primary{color:var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));border-color:var(--form-control-border-color,var(--smoke,#919191));border-width:var(--form-control-border-width,1px);background:var(--form-control-background,var(--white,#fff));padding-left:var(--form-control-padding,var(--spacing-xs,12px));padding-right:var(--form-control-padding,var(--spacing-xs,12px))}.form-control-primary .form-control-required{border-color:var(--form-control-border-color-required,var(--form-control-required-border-color,var(--form-control-border-color,var(--smoke,#919191))))}.form-control-secondary{color:var(--form-control-secondary-color,var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))));border-color:var(--form-control-secondary-border-color,var(--form-control-border-color,var(--smoke,#919191)));border-width:var(--form-control-secondary-border-width,var(--form-control-border-width,1px));background:var(--form-control-secondary-background,var(--form-control-background,var(--white,#fff)));padding-left:var(--form-control-secondary-padding,var(--form-control-padding,var(--spacing-xs,12px)));padding-right:var(--form-control-secondary-padding,var(--form-control-padding,var(--spacing-xs,12px)))}.form-control-secondary .form-control-required{border-color:var(--form-control-secondary-required-border-color,var(--form-control-secondary-border-color,var(--form-control-border-color,var(--smoke,#919191))))}.form-control-inverse{color:var(--form-control-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));border-color:var(--form-control-inverse-border-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));border-width:var(--form-control-inverse-border-width,var(--form-control-border-width,1px));background:var(--form-control-inverse-background,transparent);padding-left:var(--form-control-inverse-padding,var(--form-control-padding,var(--spacing-xs,12px)));padding-right:var(--form-control-inverse-padding,var(--form-control-padding,var(--spacing-xs,12px)))}.form-control-inverse .form-control-required{border-color:var(--form-control-inverse-required-border-color,var(--form-control-inverse-border-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff)))))}.form-control-sm{height:var(--form-control-size-sm,var(--form-control-sm-height,var(--form-control-size-m,var(--form-control-height,var(--spacing-m,36px)))))}.form-control-icon-xs{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-xs, 16px))}.form-control-icon-xs+.form-control-icon-wrapper-xs,.form-control-icon-xs .form-control-arrow-xs{top:calc(50% - (var(--icon-size-xs, 16px) / 2) - var(--icon-padding-xs, 4px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-xs, 4px))}.form-control .input-arrow-xs{--icon-padding-xs:0}.form-control .input-arrow-xs.up{top:1px}.form-control .input-arrow-xs.down{top:50%}.form-control-icon-locked-xs{position:absolute;top:calc(50% - (var(--icon-size-xs, 16px) / 2) - var(--icon-padding-xs, 4px));left:0}.form-control-icon-locked-xs~input{text-indent:var(--icon-size-xs,16px)}.form-control-icon-sm{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-sm, 24px))}.form-control-icon-sm+.form-control-icon-wrapper-sm,.form-control-icon-sm .form-control-arrow-sm{top:calc(50% - (var(--icon-size-sm, 24px) / 2) - var(--icon-padding-sm, 6px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-sm, 6px))}.form-control .input-arrow-sm{--icon-padding-sm:0}.form-control .input-arrow-sm.up{top:1px}.form-control .input-arrow-sm.down{top:50%}.form-control-icon-locked-sm{position:absolute;top:calc(50% - (var(--icon-size-sm, 24px) / 2) - var(--icon-padding-sm, 6px));left:0}.form-control-icon-locked-sm~input{text-indent:var(--icon-size-sm,24px)}.form-control-icon-md{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-md, 36px))}.form-control-icon-md+.form-control-icon-wrapper-md,.form-control-icon-md .form-control-arrow-md{top:calc(50% - (var(--icon-size-md, 36px) / 2) - var(--icon-padding-md, 18px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-md, 18px))}.form-control .input-arrow-md{--icon-padding-md:0}.form-control .input-arrow-md.up{top:1px}.form-control .input-arrow-md.down{top:50%}.form-control-icon-locked-md{position:absolute;top:calc(50% - (var(--icon-size-md, 36px) / 2) - var(--icon-padding-md, 18px));left:0}.form-control-icon-locked-md~input{text-indent:var(--icon-size-md,36px)}.form-control-icon-lg{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-lg, 72px))}.form-control-icon-lg+.form-control-icon-wrapper-lg,.form-control-icon-lg .form-control-arrow-lg{top:calc(50% - (var(--icon-size-lg, 72px) / 2) - var(--icon-padding-lg, 12px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-lg, 12px))}.form-control .input-arrow-lg{--icon-padding-lg:0}.form-control .input-arrow-lg.up{top:1px}.form-control .input-arrow-lg.down{top:50%}.form-control-icon-locked-lg{position:absolute;top:calc(50% - (var(--icon-size-lg, 72px) / 2) - var(--icon-padding-lg, 12px));left:0}.form-control-icon-locked-lg~input{text-indent:var(--icon-size-lg,72px)}.form-control-icon-xl{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-xl, 96px))}.form-control-icon-xl+.form-control-icon-wrapper-xl,.form-control-icon-xl .form-control-arrow-xl{top:calc(50% - (var(--icon-size-xl, 96px) / 2) - var(--icon-padding-xl, 12px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-xl, 12px))}.form-control .input-arrow-xl{--icon-padding-xl:0}.form-control .input-arrow-xl.up{top:1px}.form-control .input-arrow-xl.down{top:50%}.form-control-icon-locked-xl{position:absolute;top:calc(50% - (var(--icon-size-xl, 96px) / 2) - var(--icon-padding-xl, 12px));left:0}.form-control-icon-locked-xl~input{text-indent:var(--icon-size-xl,96px)}.form-control-icon-locked-primary{left:var(--form-control-locked-icon-position-left)}.form-control-icon-locked-secondary{left:var(--form-control-secondary-locked-icon-position-left)}.form-control-icon-locked-inverse{left:var(--form-control-inverse-locked-icon-position-left)}.form-control-disabled,.form-control[disabled]{color:var(--form-control-font-color-disabled,var(--form-control-disabled-color,var(--text-disabled-color,#bebebe)));background:var(--form-control-background-disabled,var(--alto,#d7d7d7));border-color:var(--form-control-border-color-disabled,var(--form-control-disabled-border-color,var(--text-disabled-color,#bebebe)))}.form-control-disabled.form-control-inverse,.form-control[disabled].form-control-inverse{background:var(--form-control-inverse-background,transparent)}.form-control-disabled:focus,.form-control[disabled]:focus{outline:0}.form-control-locked{color:var(--form-control-font-color-locked,var(--form-control-locked-color,var(--form-control-font-color-disabled,var(--form-control-disabled-color,var(--text-disabled-color,#bebebe)))));background:var(--form-control-locked-background,var(--form-control-background-disabled,var(--alto,#d7d7d7)));border-color:var(--form-control-border-color-locked,var(--form-control-locked-border-color,var(--form-control-border-color-disabled,var(--form-control-disabled-border-color,var(--text-disabled-color,#bebebe)))));cursor:default}.form-control-locked.form-control-inverse{background:var(--form-control-inverse-background,transparent)}.form-control-error{border-color:var(--form-control-border-color-error,var(--form-control-error-border-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-control-error.form-control-inverse{border-color:var(--form-control-inverse-error-border-color)}.form-control::-webkit-input-placeholder{color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464))}.form-control::-webkit-input-placeholder,.form-control::placeholder{color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464))}.form-control.form-control-inverse::-webkit-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::-moz-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse:-ms-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::-ms-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control:active,.form-control:focus{outline:0}.form-control:active:not([disabled]):not(.form-control-disabled),.form-control:focus:not([disabled]):not(.form-control-disabled){border-color:var(--form-control-border-color-focus,var(--form-control-focus-border-color,var(--lagoon,#009ad2)))}.form-control:hover:not([disabled]):not(.form-control-disabled){border-color:var(--form-control-border-color-hover,var(--form-control-hover-border-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))))}.form-control:hover:not([disabled]):not(.form-control-disabled).form-control-inverse{border-color:var(--form-control-inverse-hover-border-color)}.form-control-error-message{font-family:var(--form-control-error-font-family);font-size:var(--form-control-error-font-size,.8em);font-style:var(--form-control-error-message-font-style,var(--form-control-error-font-style,italic));white-space:pre-line;color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))));margin-top:var(--form-control-error-message-margin-top,var(--form-control-error-margin-top,var(--spacing-xxs,6px)))}.form-control-description{font-family:var(--form-control-description-font-family);font-size:var(--form-control-description-font-size,.8em);font-style:var(--form-control-description-font-style);color:var(--form-control-description-color,var(--text-tertiary-color,#646464));white-space:pre-line;margin-top:var(--form-control-description-margin-top,var(--spacing-xxs,6px))}.form-control-icon-wrapper{position:absolute;cursor:pointer}.form-control-textarea{resize:none}.form-control-text-align-left,.form-control-text-align-left input{text-align:left}.form-control-text-align-center,.form-control-text-align-center input{text-align:center}.form-control-text-align-right,.form-control-text-align-right input{text-align:right}.form-control-wrapper{position:relative;min-width:var(--form-control-min-width,250px);max-width:var(--form-control-max-width,100%);width:100%}.form-control-wrapper .prefix{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;position:absolute;height:100%;width:auto;top:0;left:0;bottom:0;padding-left:var(--form-control-prefix-padding,var(--spacing-xxs,6px));padding-right:var(--form-control-prefix-padding,var(--spacing-xxs,6px));font-weight:var(--form-control-prefix-font-weight,var(--form-control-font-weight));font-size:var(--form-control-prefix-font-size,var(--form-control-font-size));color:var(--form-control-prefix-color,var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))))}.form-group{margin:var(--form-control-margin-top,0) var(--form-control-margin-right,0) var(--form-control-margin-bottom,0) var(--form-control-margin-left,0)}.form-group-inverse .form-control-icon-wrapper{--icon-color:var(--form-control-inverse-icon-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-group-inverse .form-control-icon-locked-inverse{--icon-color:var(--form-control-inverse-locked-icon-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-group-inverse .form-control-error-message{color:var(--form-control-inverse-error-color)}.form-group-inverse .form-control-description{color:var(--form-control-inverse-description-color)}.inline-form-group{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex-wrap:wrap;flex-wrap:wrap}.inline-form-group .form-control-error-message{width:100%;padding-left:var(--form-control-label-inline-padding-right,var(--spacing-s,24px));margin-left:var(--form-control-caption-width,var(--form-control-label-inline-width,25%))}.form-check{margin:var(--form-check-margin-top,0) var(--form-check-margin-right,0) var(--form-check-margin-bottom,var(--spacing-xs,12px)) var(--form-check-margin-left,0);font-family:var(--form-check-font-family);font-weight:var(--font-weight-normal,var(--font-weight,normal));font-size:var(--form-control-font-size)}.form-check:last-of-type{margin-bottom:0}.form-check input[type=checkbox],.form-check input[type=radio]{display:none}.form-check input[type=checkbox]+button,.form-check input[type=checkbox]+label,.form-check input[type=radio]+button,.form-check input[type=radio]+label{position:relative;display:inline-block;text-align:inherit}.form-check input[type=checkbox]+button.position-static,.form-check input[type=checkbox]+label.position-static,.form-check input[type=radio]+button.position-static,.form-check input[type=radio]+label.position-static{display:inline}.form-check input[type=checkbox]+button :after,.form-check input[type=checkbox]+label :after,.form-check input[type=radio]+button :after,.form-check input[type=radio]+label :after{content:none}.form-check input[type=checkbox]+button:after,.form-check input[type=checkbox]+button:before,.form-check input[type=checkbox]+label:after,.form-check input[type=checkbox]+label:before,.form-check input[type=radio]+button:after,.form-check input[type=radio]+button:before,.form-check input[type=radio]+label:after,.form-check input[type=radio]+label:before{content:\"\";position:absolute;display:inline-block}.form-check input[type=checkbox]+button:focus,.form-check input[type=checkbox]+label:focus,.form-check input[type=radio]+button:focus,.form-check input[type=radio]+label:focus{outline:none}.form-check input[type=checkbox]+button:focus:before,.form-check input[type=checkbox]+label:focus:before,.form-check input[type=radio]+button:focus:before,.form-check input[type=radio]+label:focus:before{border-color:var(--form-control-border-color-focus,var(--form-control-focus-border-color,var(--lagoon,#009ad2)))}.form-check.error input[type=checkbox]+label{color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-check.error input[type=checkbox]+label:before{border-color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-check.warning input[type=checkbox]+label{color:var(--color-text-warning,var(--text-warning-color,var(--warning,#7e5f16)))}.form-check.warning input[type=checkbox]+label:before{border-color:var(--color-text-warning,var(--text-warning-color,var(--warning,#7e5f16)))}.form-control-wrapper{width:var(--input-width,var(--form-control-width,auto));min-width:var(--input-min-width,var(--form-control-min-width,250px));max-width:var(--input-max-width,var(--form-control-max-width,100%))}.form-input-type-number{-moz-appearance:textfield}.form-input-type-text{text-overflow:var(--input-text-overflow,clip)}.input-stepper{position:relative;display:-ms-flexbox;display:flex}.input-stepper-data{font-family:inherit;font-size:inherit;color:inherit;margin:auto 0;border:0}.input-stepper-data:disabled{background-color:inherit;color:inherit}.input-stepper .input-arrow{display:inline-block;position:absolute;right:var(--input-stepper-arrow-right,var(--spacing-xs,12px));cursor:pointer;--action-icon-hover-background-color:var(--input-stepper-arrow-hover-background,transparent);--action-icon-overlay-hover-background-color:var(--input-stepper-arrow-hover-background,transparent);--action-icon-active-background-color:var(--input-stepper-arrow-active-background,transparent);--action-icon-overlay-hover-background-color:var(--input-stepper-arrow-active-background,transparent);--action-icon-inverse-hover-background-color:var(--input-stepper-inverse-arrow-hover-background,transparent);--action-icon-inverse-overlay-hover-background-color:var(--input-stepper-inverse-arrow-hover-background,transparent);--action-icon-inverse-active-background-color:var(--input-stepper-inverse-arrow-active-background,transparent);--action-icon-inverse-overlay-active-background-color:var(--input-stepper-inverse-arrow-active-background,transparent)}.input-stepper .input-arrow:focus{outline:0}input::-webkit-inner-spin-button{align-self:center}"; },
        enumerable: true,
        configurable: true
    });
    return class_2;
}());
__decorate$1([
    PrefixEvent()
], WfInput.prototype, "change", void 0);
__decorate$1([
    PrefixEvent()
], WfInput.prototype, "input", void 0);
export { WfButton as wf_button, WfDropdown as wf_dropdown, WfInput as wf_input };
