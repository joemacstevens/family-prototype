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
import { g as getIconBody } from './svg-60a44df6.js';
var WfIcon = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** The size of the icon */
        this.size = 'md';
        /** Decide if icon can change the size */
        this.scalable = true;
        this.svgContent = null;
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
                        this.svgContent = null;
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype.render = function () {
        var _a;
        var _b = this, size = _b.size, type = _b.type, scalable = _b.scalable, svgContent = _b.svgContent;
        var iconClasses = (_a = {
                icon: true
            },
            _a["icon-" + size] = !!size,
            _a["icon-scalable"] = scalable,
            _a["icon-" + type] = !!type,
            _a);
        return svgContent ? h("div", { class: iconClasses, innerHTML: svgContent }) : null;
    };
    Object.defineProperty(class_1, "style", {
        get: function () { return ".icon{background:var(--icon-primary-background-color,transparent);display:-ms-inline-flexbox;display:inline-flex;overflow:hidden;border-radius:var(--icon-border-radius,50%);padding:var(--icon-padding-md,18px)}.icon svg{display:block}.icon.icon-scalable svg{height:var(--icon-size-md,36px);width:var(--icon-size-md,36px)}.icon.icon-scalable.icon-xxs{padding:var(--icon-padding-xxs,2px)}.icon.icon-scalable.icon-xxs svg{height:var(--icon-size-xxs,12px);width:var(--icon-size-xxs,12px)}.icon.icon-scalable.icon-xs{padding:var(--icon-padding-xs,4px)}.icon.icon-scalable.icon-xs svg{height:var(--icon-size-xs,16px);width:var(--icon-size-xs,16px)}.icon.icon-scalable.icon-sm{padding:var(--icon-padding-sm,6px)}.icon.icon-scalable.icon-sm svg{height:var(--icon-size-sm,24px);width:var(--icon-size-sm,24px)}.icon.icon-scalable.icon-md{padding:var(--icon-padding-md,18px)}.icon.icon-scalable.icon-md svg{height:var(--icon-size-md,36px);width:var(--icon-size-md,36px)}.icon.icon-scalable.icon-lg{padding:var(--icon-padding-lg,12px)}.icon.icon-scalable.icon-lg svg{height:var(--icon-size-lg,72px);width:var(--icon-size-lg,72px)}.icon.icon-scalable.icon-xl{padding:var(--icon-padding-xl,12px)}.icon.icon-scalable.icon-xl svg{height:var(--icon-size-xl,96px);width:var(--icon-size-xl,96px)}.icon-primary{background:var(--icon-primary-background-color,transparent)}.icon-primary svg{--icon-color:var(--icon-primary-color,#1c1c1c)}.icon-secondary{background:var(--icon-secondary-background-color,#eee)}.icon-secondary svg{--icon-color:var(--icon-secondary-color,#646464)}.icon-success{background:var(--icon-success-background-color,transparent)}.icon-success svg{--icon-color:var(--icon-success-color,#498100)}.icon-info{background:var(--icon-info-background-color,transparent)}.icon-info svg{--icon-color:var(--icon-info-color,#007099)}.icon-danger{background:var(--icon-danger-background-color,transparent)}.icon-danger svg{--icon-color:var(--icon-danger-color,#c81219)}.icon-warning{background:var(--icon-warning-background-color,transparent)}.icon-warning svg{--icon-color:var(--icon-warning-color,#c81219)}.icon-inverse{background:var(--icon-inverse-background-color,#1c1c1c)}.icon-inverse svg{--icon-color:var(--icon-inverse-color,#fff)}.icon-inverse-simple{background:none}.icon-inverse-simple svg{--icon-color:var(--icon-inverse-color,#fff)}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { WfIcon as wf_icon };
