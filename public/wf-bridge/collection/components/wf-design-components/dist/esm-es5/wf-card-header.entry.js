import { r as registerInstance, h } from './core-2ee2b62e.js';
var CardHeader = /** @class */ (function () {
    function CardHeader(hostRef) {
        registerInstance(this, hostRef);
    }
    CardHeader.prototype.render = function () {
        return (h("header", { class: "card-header" }, h("slot", null)));
    };
    Object.defineProperty(CardHeader, "style", {
        get: function () { return ".card-header{display:-ms-flexbox;display:flex;-ms-flex-pack:var(--card-header-justify-content,space-between);justify-content:var(--card-header-justify-content,space-between);padding:var(--card-header-padding,0);font-family:var(--card-header-font-family);font-size:var(--card-header-font-size);font-weight:var(--card-header-font-weight)}"; },
        enumerable: true,
        configurable: true
    });
    return CardHeader;
}());
export { CardHeader as wf_card_header };
