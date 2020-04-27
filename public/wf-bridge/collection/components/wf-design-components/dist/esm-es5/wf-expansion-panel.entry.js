import { r as registerInstance, c as createEvent, h } from './core-2ee2b62e.js';
import './_commonjsHelpers-97e6d7b1.js';
import { g as generateUniqueId } from './utils-9974937e.js';
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
var WfExpansionPanel = /** @class */ (function () {
    function WfExpansionPanel(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        /** State of panel */
        this.expanded = false;
        /** Unique Id of panel */
        this.panelId = generateUniqueId();
        /** Show title on open style*/
        this.pinnedTitle = true;
        this.onTogglePanel = function () {
            _this.expanded = !_this.expanded;
            _this.expand.emit({
                id: _this.panelId,
                expanded: _this.expanded,
            });
        };
        this.docExpand = createEvent(this, "expand", 7);
        this.docWfExpand = createEvent(this, "wfExpand", 7);
    }
    WfExpansionPanel.prototype.render = function () {
        var _a, _b, _c, _d;
        var _e = this, expanded = _e.expanded, pinnedTitle = _e.pinnedTitle;
        var contentPanelClasses = (_a = {},
            _a['expansion-panel-content'] = true,
            _a["expansion-panel-content-active"] = !!expanded,
            _a);
        var panelClasses = (_b = {},
            _b['expansion-panel'] = true,
            _b['expansion-panel-expanded'] = expanded,
            _b);
        var arrowClasses = (_c = {},
            _c['arrow'] = true,
            _c['arrow-up'] = expanded,
            _c['arrow-down'] = !expanded,
            _c);
        var titleClasses = (_d = {},
            _d['panel-title-hidden'] = !pinnedTitle && expanded,
            _d);
        return (h("div", { class: panelClasses }, h("div", { class: 'expansion-panel-header', onClick: this.onTogglePanel }, h("div", { class: arrowClasses }), h("div", { class: titleClasses }, h("slot", { name: "header" }))), h("div", { class: contentPanelClasses }, h("slot", { name: "content" }))));
    };
    Object.defineProperty(WfExpansionPanel, "style", {
        get: function () { return ".expansion-panel{-webkit-box-sizing:var(--panel-box-sizing,content-box);box-sizing:var(--panel-box-sizing,content-box);-webkit-box-shadow:var(--panel-box-shadow,none);box-shadow:var(--panel-box-shadow,none);display:block;margin:0;padding:0;overflow:visible;-webkit-transition:padding 225ms cubic-bezier(.4,0,.2,1),-webkit-box-shadow .28s cubic-bezier(.4,0,.2,1);transition:padding 225ms cubic-bezier(.4,0,.2,1),-webkit-box-shadow .28s cubic-bezier(.4,0,.2,1);transition:padding 225ms cubic-bezier(.4,0,.2,1),box-shadow .28s cubic-bezier(.4,0,.2,1);transition:padding 225ms cubic-bezier(.4,0,.2,1),box-shadow .28s cubic-bezier(.4,0,.2,1),-webkit-box-shadow .28s cubic-bezier(.4,0,.2,1);background:var(--panel-background,#fff);font-family:var(--panel-font-family);color:var(--panel-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))))}.expansion-panel-header{display:-ms-flexbox;display:flex;-ms-flex-direction:row-reverse;flex-direction:row-reverse;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;padding:var(--panel-header-padding,var(--spacing-xs,12px) var(--spacing-s,24px));min-height:var(--panel-header-height,48px);background:var(--panel-header-background,inherit);border-radius:var(--panel-header-border-radius,0);border-bottom:var(--panel-header-border,3px solid #000);font-size:var(--panel-header-font-size,var(--font-size-small,.9em));font-weight:var(--panel-header-font-weight,var(--font-weight-normal,var(--font-weight,normal)));color:var(--panel-header-color,inherit);cursor:pointer}.expansion-panel-header:hover{background:var(--panel-header-background-hover,#f5f5f5)}.expansion-panel-header:active{background:var(--panel-header-background-pressed,#bebebe)}.expansion-panel-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:visible;visibility:hidden;height:0}.expansion-panel-content-active{visibility:visible;height:auto;padding:var(--panel-content-bottom-padding,var(--spacing-xs,12px))}.expansion-panel .panel-title-hidden{visibility:hidden}.expansion-panel .arrow{border:solid var(--panel-arrow-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));border-width:0 3px 3px 0;display:inline-block;padding:var(--panel-arrow-size,3px)}.expansion-panel .arrow.arrow-up{transform:rotate(-135deg);-webkit-transform:rotate(-135deg)}.expansion-panel .arrow.arrow-down{transform:rotate(45deg);-webkit-transform:rotate(45deg)}.expansion-panel-expanded{padding-bottom:var(--panel-padding-bottom,var(--spacing-xs,12px))}"; },
        enumerable: true,
        configurable: true
    });
    return WfExpansionPanel;
}());
__decorate([
    PrefixEvent()
], WfExpansionPanel.prototype, "expand", void 0);
export { WfExpansionPanel as wf_expansion_panel };
