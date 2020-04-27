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
import { r as registerInstance, h } from './core-2ee2b62e.js';
import './_commonjsHelpers-97e6d7b1.js';
import { c as setupTimeout } from './utils-9974937e.js';
var timeoutMessages = {
    error: 'Seems to be down, please try again later',
    warning: 'Please be patient, it may take a longer time',
};
var defaultDelay = 0;
var defaultWarningTimeout = 10000;
var defaultErrorTimeout = 20000;
var WfSpinner = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** Message to show warning with long loading time */
        this.timeoutWarningMsg = timeoutMessages.warning;
        /** Message to show error when time expired */
        this.timeoutErrorMsg = timeoutMessages.error;
        /** Delay time (in ms) after which spinner will show */
        this.delay = defaultDelay;
        /** Amount of time (in ms) that spinner will wait until shows timeoutWarningMsg. Set to 0 to disable. */
        this.warningTimeout = defaultWarningTimeout;
        /** Amount of time (in ms) that spinner will wait until shows timeoutErrorMsg. Set to 0 to disable. */
        this.errorTimeout = defaultErrorTimeout;
        /** Define if warning message is visible */
        this.timeoutWarningState = false;
        /** Define if error message is visible */
        this.timeoutErrorState = false;
        /** Define if spinner is actually visible */
        this.visible = false;
    }
    class_1.prototype.setErrorTimeout = function () {
        var _this = this;
        var errorTimeout = this.errorTimeout;
        this.errorTimeoutHandler = setupTimeout(function () {
            if (errorTimeout === 0)
                return;
            _this.timeoutWarningState = false;
            _this.timeoutErrorState = true;
        }, errorTimeout);
    };
    class_1.prototype.setSpinner = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, opened, warningTimeoutHandler, errorTimeoutHandler, delay, delayTimeoutHandler;
            var _this = this;
            return __generator(this, function (_b) {
                _a = this, opened = _a.opened, warningTimeoutHandler = _a.warningTimeoutHandler, errorTimeoutHandler = _a.errorTimeoutHandler, delay = _a.delay, delayTimeoutHandler = _a.delayTimeoutHandler;
                if (!opened) {
                    if (!!warningTimeoutHandler)
                        warningTimeoutHandler();
                    if (!!errorTimeoutHandler)
                        errorTimeoutHandler();
                    if (!!delayTimeoutHandler)
                        delayTimeoutHandler();
                    this.visible = false;
                    return [2 /*return*/];
                }
                if (delay !== 0) {
                    this.delayTimeoutHandler = setupTimeout(function () {
                        _this.handleSpinnerStates();
                    }, delay);
                }
                else {
                    this.handleSpinnerStates();
                }
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.handleSpinnerStates = function () {
        this.visible = true;
        this.timeoutWarningState = false;
        this.timeoutErrorState = false;
        this.setTimers();
    };
    class_1.prototype.setTimers = function () {
        var _this = this;
        var _a = this, warningTimeout = _a.warningTimeout, errorTimeout = _a.errorTimeout;
        if (warningTimeout === 0 && errorTimeout === 0)
            return;
        this.warningTimeoutHandler = setupTimeout(function () {
            if (warningTimeout !== 0)
                _this.timeoutWarningState = true;
            _this.setErrorTimeout();
        }, warningTimeout);
    };
    class_1.prototype.componentDidLoad = function () {
        this.setSpinner();
    };
    class_1.prototype.render = function () {
        var _a = this, timeoutWarningMsg = _a.timeoutWarningMsg, timeoutErrorMsg = _a.timeoutErrorMsg, timeoutWarningState = _a.timeoutWarningState, timeoutErrorState = _a.timeoutErrorState, visible = _a.visible;
        return visible ? (h("div", { class: "spinner-wrapper" }, !timeoutErrorState ? (h("svg", { class: "spinner-graphic", viewBox: "0 0 60 60", preserveAspectRatio: "xMidYMid" }, h("circle", { class: "spinner-background-ring", cx: "30", cy: "30", r: "24", "stroke-linecap": "round", fill: "none" }), h("circle", { class: "spinner-foreground-ring", cx: "30", cy: "30", r: "24", "stroke-linecap": "round", fill: "none" }))) : (''), timeoutWarningState ? h("span", { class: "spinner-msg" }, timeoutWarningMsg) : '', timeoutErrorState ? h("span", { class: "spinner-msg" }, timeoutErrorMsg) : '')) : null;
    };
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "opened": ["setSpinner"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "\@-webkit-keyframes spinner-border{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@keyframes spinner-border{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.spinner-wrapper{position:absolute;top:0;bottom:0;left:0;right:0;z-index:var(--spinner-z-index,600);background:var(--spinner-background,hsla(0,0%,100%,.8));display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.spinner-wrapper .spinner-msg{color:var(--spinner-msg-color);font-family:var(--spinner-msg-font-family);font-size:var(--spinner-msg-font-size);font-weight:var(--spinner-msg-font-weight);text-transform:var(--spinner-text-transform,var(--spinner-msg-text-transform))}.spinner-wrapper .spinner{border-color:var(--spinner-color,var(--spinner-foreground-ring-color,#444));border-top-color:transparent;border-width:var(--spinner-thickness,var(--spacing-xxxs,3px));border-radius:50%;border-style:solid;-webkit-animation:spinner-border 1.2s linear infinite;animation:spinner-border 1.2s linear infinite}.spinner-wrapper .spinner,.spinner-wrapper .spinner-graphic{width:var(--spinner-size,var(--spacing-m,36px));height:var(--spinner-size,var(--spacing-m,36px))}.spinner-wrapper .spinner-background-ring{stroke:var(--spinner-background-ring-color,#f5f5f5);stroke-width:var(--spinner-thickness,var(--spacing-xxxs,3px))}.spinner-wrapper .spinner-background-ring,.spinner-wrapper .spinner-foreground-ring{width:var(--spinner-size,var(--spacing-m,36px));height:var(--spinner-size,var(--spacing-m,36px))}.spinner-wrapper .spinner-foreground-ring{fill:transparent;stroke:var(--spinner-color,var(--spinner-foreground-ring-color,#444));stroke-width:var(--spinner-thickness,var(--spacing-xxxs,3px));-webkit-animation:spinner 1.6666666667s linear infinite;animation:spinner 1.6666666667s linear infinite}\@-webkit-keyframes spinner{0%{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate(0deg);transform:rotate(0deg);stroke-dasharray:0 144.5132620651}50%{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate(190deg);transform:rotate(190deg);stroke-dasharray:115.6106096521 28.902652413}to{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate(2turn);transform:rotate(2turn);stroke-dasharray:0 144.5132620651}}\@keyframes spinner{0%{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate(0deg);transform:rotate(0deg);stroke-dasharray:0 144.5132620651}50%{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate(190deg);transform:rotate(190deg);stroke-dasharray:115.6106096521 28.902652413}to{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate(2turn);transform:rotate(2turn);stroke-dasharray:0 144.5132620651}}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { WfSpinner as wf_spinner };
