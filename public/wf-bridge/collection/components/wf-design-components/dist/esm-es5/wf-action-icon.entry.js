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
import { r as registerInstance, c as createEvent, h } from './core-2ee2b62e.js';
import { g as getIconBody } from './svg-60a44df6.js';
var WfActionIcon = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        /** The size of the icon */
        this.size = 'sm';
        /** Decide if icon can change the size */
        this.scalable = true;
        /** Defines if icon has bounding circle */
        this.bounding = false;
        /** Defines if icon has property open */
        this.open = false;
        this.svgContent = '';
        this.handleClick = function () {
            _this.wfClick.emit();
        };
        this.wfClick = createEvent(this, "wfClick", 7);
        this.docClick = createEvent(this, "click", 7);
        this.docWfClick = createEvent(this, "wfClick", 7);
    }
    class_1.prototype.componentWillRender = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, size, _b, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this, name = _a.name, size = _a.size;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        _b = this;
                        return [4 /*yield*/, getIconBody(name, size)];
                    case 2:
                        _b.svgContent = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _c.sent();
                        this.svgContent = '';
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype.render = function () {
        var _a;
        var _b = this, size = _b.size, scalable = _b.scalable, variant = _b.variant, open = _b.open, svgContent = _b.svgContent, bounding = _b.bounding, handleClick = _b.handleClick;
        var iconClasses = (_a = {
                icon: true
            },
            _a["icon-" + size] = !!size,
            _a["icon-scalable"] = scalable,
            _a["icon-" + variant] = !!variant,
            _a["icon-bounding"] = !!bounding,
            _a["icon-open"] = !!open,
            _a);
        return svgContent ? (h("div", { class: iconClasses }, h("button", { type: "button", onClick: handleClick, innerHTML: svgContent }))) : null;
    };
    Object.defineProperty(class_1, "style", {
        get: function () { return ".icon{display:-ms-inline-flexbox;display:inline-flex;overflow:hidden;padding:0;border-radius:50%}.icon button{display:block;cursor:pointer;border:none;margin:0;padding:0;color:inherit;font:inherit;text-align:inherit;line-height:normal;overflow:visible;background-color:transparent;-webkit-appearance:none;position:relative}.icon button:before{z-index:1}.icon button:after,.icon button:before{content:\"\";position:absolute;left:0;right:0;top:0;bottom:0}.icon button:after{z-index:2}.icon button:focus{outline:none}.icon button svg{display:block;position:relative;z-index:3;--icon-color:var(--action-icon-color,var(--text-color,#1c1c1c))}.icon.icon-scalable.icon-xs button{padding:var(--icon-padding-xs,4px)}.icon.icon-scalable.icon-xs svg{height:var(--icon-size-xs,16px);width:var(--icon-size-xs,16px)}.icon.icon-scalable.icon-sm button{padding:var(--icon-padding-sm,6px)}.icon.icon-scalable.icon-sm svg{height:var(--icon-size-sm,24px);width:var(--icon-size-sm,24px)}.icon.icon-bounding button:before{background-color:var(--action-icon-background-color,transparent);mix-blend-mode:var(--action-icon-blend-mode,normal)}.icon.icon-bounding button:after{background-color:var(--action-icon-overlay-background-color,transparent);mix-blend-mode:var(--action-icon-overlay-blend-mode,var(--action-icon-blend-mode,normal))}.icon:hover button:before{background-color:var(--action-icon-hover-background-color,var(--action-icon-background-color,transparent));mix-blend-mode:var(--action-icon-hover-blend-mode,var(--action-icon-blend-mode,normal))}.icon:hover button:after{background-color:var(--action-icon-overlay-hover-background-color,var(--action-icon-overlay-background-color,transparent));mix-blend-mode:var(--action-icon-overlay-hover-blend-mode,var(--action-icon-overlay-blend-mode,var(--action-icon-blend-mode,normal)))}.icon:hover button svg{--icon-color:var(--action-icon-hover-color,var(--action-icon-color,var(--text-color,#1c1c1c)))}.icon:active button:before{background-color:var(--action-icon-active-background-color,var(--action-icon-background-color,transparent));mix-blend-mode:var(--action-icon-active-blend-mode,var(--action-icon-blend-mode,normal))}.icon:active button:after{background-color:var(--action-icon-overlay-active-background-color,var(--action-icon-overlay-background-color,transparent));mix-blend-mode:var(--action-icon-overlay-active-blend-mode,var(--action-icon-overlay-blend-mode,var(--action-icon-blend-mode,normal)))}.icon:active button svg{--icon-color:var(--action-icon-active-color,var(--action-icon-color,var(--text-color,#1c1c1c)))}.icon.icon-open button:before{background-color:var(--action-icon-open-background-color,var(--action-icon-background-color,transparent));mix-blend-mode:var(--action-icon-open-blend-mode,var(--action-icon-blend-mode,normal))}.icon.icon-open button:after{background-color:var(--action-icon-overlay-open-background-color,var(--action-icon-overlay-background-color,transparent));mix-blend-mode:var(--action-icon-overlay-open-blend-mode,var(--action-icon-overlay-blend-mode,var(--action-icon-blend-mode,normal)))}.icon.icon-open button svg{--icon-color:var(--action-icon-open-color,var(--action-icon-color,var(--text-color,#1c1c1c)))}.icon-inverse.icon-bounding button:before{background-color:var(--action-icon-inverse-background-color,transparent);mix-blend-mode:var(--action-icon-inverse-blend-mode,normal)}.icon-inverse.icon-bounding button:after{background-color:var(--action-icon-inverse-overlay-background-color,transparent);mix-blend-mode:var(--action-icon-inverse-overlay-blend-mode,var(--action-icon-blend-mode,normal))}.icon-inverse button svg{--icon-color:var(--action-icon-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.icon-inverse:hover button:before{background-color:var(--action-icon-inverse-hover-background-color,var(--action-icon-inverse-background-color,transparent));mix-blend-mode:var(--action-icon-inverse-hover-blend-mode,var(--action-icon-inverse-blend-mode,normal))}.icon-inverse:hover button:after{background-color:var(--action-icon-inverse-overlay-hover-background-color,var(--action-icon-inverse-overlay-background-color,transparent));mix-blend-mode:var(--action-icon-inverse-overlay-hover-blend-mode,var(--action-icon-inverse-overlay-blend-mode,var(--action-icon-blend-mode,normal)))}.icon-inverse:hover button svg{--icon-color:var(--action-icon-inverse-hover-color,var(--action-icon-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff)))))}.icon-inverse:active button:before{background-color:var(--action-icon-inverse-active-background-color,var(--action-icon-inverse-background-color,transparent));mix-blend-mode:var(--action-icon-inverse-active-blend-mode,var(--action-icon-inverse-blend-mode,normal))}.icon-inverse:active button:after{background-color:var(--action-icon-inverse-overlay-active-background-color,var(--action-icon-inverse-overlay-background-color,transparent));mix-blend-mode:var(--action-icon-inverse-overlay-active-blend-mode,var(--action-icon-inverse-overlay-blend-mode,var(--action-icon-blend-mode,normal)))}.icon-inverse:active button svg{--icon-color:var(--action-icon-inverse-active-color,var(--action-icon-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff)))))}.icon-inverse.icon-open button:before{background-color:var(--action-icon-inverse-open-background-color,var(--action-icon-inverse-background-color,transparent));mix-blend-mode:var(--action-icon-inverse-open-blend-mode,var(--action-icon-inverse-blend-mode,normal))}.icon-inverse.icon-open button:after{background-color:var(--action-icon-inverse-overlay-open-background-color,var(--action-icon-inverse-overlay-background-color,transparent));mix-blend-mode:var(--action-icon-inverse-overlay-open-blend-mode,var(--action-icon-inverse-overlay-blend-mode,var(--action-icon-blend-mode,normal)))}.icon-inverse.icon-open button svg{--icon-color:var(--action-icon-inverse-open-color,var(--action-icon-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff)))))}:host(.trigger-active) .icon button:before{background-color:var(--action-icon-active-background-color,var(--action-icon-background-color,transparent));mix-blend-mode:var(--action-icon-active-blend-mode,var(--action-icon-blend-mode,normal))}:host(.trigger-active) .icon button:after{background-color:var(--action-icon-overlay-active-background-color,var(--action-icon-overlay-background-color,transparent));mix-blend-mode:var(--action-icon-overlay-active-blend-mode,var(--action-icon-overlay-blend-mode,var(--action-icon-blend-mode,normal)))}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { WfActionIcon as wf_action_icon };
