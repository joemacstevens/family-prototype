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
import { P as PrefixEvent } from './custom-event-emitter-d3f4fc52.js';
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
var WfChip = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.handleChipRemove = function (event) {
            if (event) {
                event.stopPropagation();
            }
            _this.chipRemove.emit(_this.host);
        };
        this.handlelChipClick = function () {
            _this.chipClick.emit(_this.host);
        };
        this.docChipRemove = createEvent(this, "chipRemove", 7);
        this.docWfChipRemove = createEvent(this, "wfChipRemove", 7);
        this.docChipClick = createEvent(this, "chipClick", 7);
        this.docWfChipClick = createEvent(this, "wfChipClick", 7);
    }
    class_1.prototype.removeChip = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.chipRemove.emit(this.host);
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.render = function () {
        return (h("div", { class: "chip", onClick: this.handlelChipClick }, h("a", { class: "chip-delete", onClick: this.handleChipRemove }, "\u2716"), h("slot", null)));
    };
    Object.defineProperty(class_1.prototype, "host", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return ".chip{display:inline-block;margin:var(--chip-spacing,var(--spacing-xxxs,3px));padding:var(--chip-padding,var(--spacing-xs,12px));font-family:var(--chip-font-family);font-size:var(--chip-font-size,14px);font-weight:var(--chip-font-weight,400);color:var(--chip-color,#000);background:var(--chip-background,#f1f3f4);border-radius:var(--chip-border-radius,19px);position:relative;cursor:pointer;max-width:var(--chip-max-width,200px);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.chip,.chip .chip-delete{line-height:var(--chip-delete-x-font-size,20px)}.chip .chip-delete{display:none;float:right;margin-left:5px;font-size:var(--chip-delete-x-font-size,20px);text-decoration:none}.chip .chip-delete,.chip:hover{background:var(--chip-background-darker,#dee2e7)}.chip:active,.chip:active .chip-delete{background-color:var(--chip-color-active,#919191)}.chip:hover .chip-delete{display:inline}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
__decorate([
    PrefixEvent()
], WfChip.prototype, "chipRemove", void 0);
__decorate([
    PrefixEvent()
], WfChip.prototype, "chipClick", void 0);
export { WfChip as wf_chip };
