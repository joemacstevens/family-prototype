import { r as registerInstance, h } from './core-2ee2b62e.js';
var WfChipList = /** @class */ (function () {
    function WfChipList(hostRef) {
        registerInstance(this, hostRef);
    }
    WfChipList.prototype.onChipRemove = function (event) {
        event.detail.remove();
    };
    WfChipList.prototype.render = function () {
        return (h("div", { class: "chip-group" }, h("slot", null)));
    };
    Object.defineProperty(WfChipList, "style", {
        get: function () { return ".chip{display:inline-block;margin:var(--chip-spacing,var(--spacing-xxxs,3px));padding:var(--chip-padding,var(--spacing-xs,12px));font-family:var(--chip-font-family);font-size:var(--chip-font-size,14px);font-weight:var(--chip-font-weight,400);color:var(--chip-color,#000);background:var(--chip-background,#f1f3f4);border-radius:var(--chip-border-radius,19px);position:relative;cursor:pointer;max-width:var(--chip-max-width,200px);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.chip,.chip .chip-delete{line-height:var(--chip-delete-x-font-size,20px)}.chip .chip-delete{display:none;float:right;margin-left:5px;font-size:var(--chip-delete-x-font-size,20px);text-decoration:none}.chip .chip-delete,.chip:hover{background:var(--chip-background-darker,#dee2e7)}.chip:active,.chip:active .chip-delete{background-color:var(--chip-color-active,#919191)}.chip:hover .chip-delete{display:inline}"; },
        enumerable: true,
        configurable: true
    });
    return WfChipList;
}());
export { WfChipList as wf_chip_list };
