import { r as registerInstance, h } from './core-2ee2b62e.js';
var CardBody = /** @class */ (function () {
    function CardBody(hostRef) {
        registerInstance(this, hostRef);
    }
    CardBody.prototype.render = function () {
        return (h("main", { class: "card-body" }, h("slot", null)));
    };
    Object.defineProperty(CardBody, "style", {
        get: function () { return ".card-body{-ms-flex-positive:1;flex-grow:1;min-height:var(--card-body-min-height,200px);padding:var(--card-body-padding,var(--spacing-s,24px) 0 0);font-family:var(--card-body-font-family);font-size:var(--card-body-font-size);font-weight:var(--card-body-font-weight)}"; },
        enumerable: true,
        configurable: true
    });
    return CardBody;
}());
export { CardBody as wf_card_body };
