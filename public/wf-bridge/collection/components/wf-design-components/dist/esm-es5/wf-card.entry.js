import { r as registerInstance, h } from './core-2ee2b62e.js';
var Card = /** @class */ (function () {
    function Card(hostRef) {
        registerInstance(this, hostRef);
    }
    Card.prototype.render = function () {
        return (h("div", { class: "card" }, h("slot", null)));
    };
    Object.defineProperty(Card, "style", {
        get: function () { return ".card{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;font-family:var(--card-font-family);background:var(--card-background,#fff);border:var(--card-border,1px solid #d7d7d7);padding:var(--card-padding,var(--spacing-m,36px));min-height:var(--card-min-height,300px);-webkit-box-shadow:var(--card-box-shadow,none);box-shadow:var(--card-box-shadow,none)}"; },
        enumerable: true,
        configurable: true
    });
    return Card;
}());
export { Card as wf_card };
