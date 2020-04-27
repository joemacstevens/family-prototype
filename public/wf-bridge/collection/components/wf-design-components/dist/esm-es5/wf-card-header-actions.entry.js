import { r as registerInstance, h } from './core-2ee2b62e.js';
var CardHeaderActions = /** @class */ (function () {
    function CardHeaderActions(hostRef) {
        registerInstance(this, hostRef);
    }
    CardHeaderActions.prototype.render = function () {
        return (h("div", { class: "card-header-actions" }, h("slot", null)));
    };
    Object.defineProperty(CardHeaderActions, "style", {
        get: function () { return ".card-header-actions{-ms-flex:1;flex:1;text-align:right}.card-header-actions ::slotted(*){visibility:hidden}.card-header-actions:hover ::slotted(*){visibility:visible}"; },
        enumerable: true,
        configurable: true
    });
    return CardHeaderActions;
}());
export { CardHeaderActions as wf_card_header_actions };
