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
var WfActionMenu = /** @class */ (function () {
    function WfActionMenu(hostRef) {
        registerInstance(this, hostRef);
        /** Define if action menu is opened or closed */
        this.opened = false;
        /** Strucutre of menu items */
        this.items = [];
        /** Limit of items to show in primary dropdown */
        this.itemsLimit = 9;
        /** Label of extra items button */
        this.extraItemsLabel = 'More items...';
        /** Configure the arrow pointer for the child level menu flyout */
        this.noArrow = false;
        /** Configure child level flyout menu overlap */
        this.overlap = 12;
        /** Trigger event */
        this.trigger = 'click';
        /** Child menu trigger event */
        this.childTrigger = 'hover';
        this.parsedItems = [];
        this.mappedItems = [];
        this.docSelect = createEvent(this, "select", 7);
        this.docWfSelect = createEvent(this, "wfSelect", 7);
    }
    WfActionMenu.prototype.componentWillLoad = function () {
        if (!['left', 'right'].includes(this.subPlacement))
            this.subPlacement = undefined;
        this.handleNewItems();
    };
    WfActionMenu.prototype.handleOpenChanged = function (event) {
        this.opened = event.detail;
        event.stopPropagation();
    };
    WfActionMenu.prototype.handleNewItems = function () {
        var _this = this;
        this.parsedItems = Array.isArray(this.items) ? this.items : JSON.parse(this.items);
        this.mappedItems = this.parsedItems
            ? this.parsedItems.map(function (item) {
                return {
                    title: item.groupTitle,
                    icon: item.groupIcon,
                    iconSize: item.groupIconSize,
                    iconAlign: item.groupIconAlign,
                    isGroup: !(item.items && item.items.length <= 1),
                    originalItem: item.items && item.items.length <= 1 ? item.items[0] : item,
                    items: item.items ? item.items.map(_this.mapActionItem) : [],
                };
            })
            : [];
    };
    WfActionMenu.prototype.mapActionItem = function (item) {
        return {
            title: item.menuItemTitle,
            icon: item.menuItemIcon,
            iconSize: item.menuItemIconSize,
            iconAlign: item.menuItemIconAlign,
            isGroup: false,
            originalItem: item,
        };
    };
    WfActionMenu.prototype.handleItemClick = function (item) {
        this.select.emit(item.originalItem);
        this.opened = false;
        if (this.host && this.host.shadowRoot) {
            this.host.shadowRoot
                .querySelectorAll('wf-flyout')
                .forEach(function (flyout) { return (flyout.opened = false); });
        }
    };
    WfActionMenu.prototype.renderItem = function (item, enableClickEvent) {
        var _a;
        if (enableClickEvent === void 0) { enableClickEvent = true; }
        var itemClasses = (_a = {
                'action-menu-item': true
            },
            _a["action-menu-item-icon-" + (item.iconAlign || 'right')] = true,
            _a);
        return (h("button", { class: itemClasses, onClick: enableClickEvent && this.handleItemClick.bind(this, item) }, !!item.icon && (h("wf-icon", { class: "action-menu-icon", size: item.iconSize || 'xs', name: item.icon })), h("span", null, item.title)));
    };
    WfActionMenu.prototype.renderGroup = function (item) {
        var _this = this;
        var _a = this, renderItem = _a.renderItem, overlap = _a.overlap, noArrow = _a.noArrow, subPlacement = _a.subPlacement, childTrigger = _a.childTrigger;
        var menuClasses = {
            'action-menu': true,
        };
        return (h("wf-flyout", { class: "action-menu-child-flyout", "trigger-tab-index": "-1", level: 2, overlap: overlap, "no-arrow": noArrow, trigger: childTrigger, placement: subPlacement }, h("div", { slot: "trigger" }, renderItem(item, false)), h("div", { class: menuClasses }, item.items.map(function (item) { return renderItem.call(_this, item, true); }))));
    };
    WfActionMenu.prototype.renderGroupOrItem = function (item) {
        var _a = this, renderGroup = _a.renderGroup, renderItem = _a.renderItem;
        return item.isGroup ? renderGroup.call(this, item) : renderItem.call(this, item, true);
    };
    WfActionMenu.prototype.render = function () {
        var _a = this, mappedItems = _a.mappedItems, renderGroupOrItem = _a.renderGroupOrItem, overlap = _a.overlap, trigger = _a.trigger, placement = _a.placement;
        var button = this.host.shadowRoot
            ? this.host.shadowRoot.querySelector('.action-menu-item')
            : null;
        var itemHeight = button ? getComputedStyle(button).minHeight : '0px';
        var menuClasses = {
            'action-menu': true,
        };
        return (h("wf-flyout", { opened: this.opened, "enable-open-changed-event": true, overlap: overlap, trigger: trigger, placement: placement }, h("slot", { slot: "trigger", name: "trigger" }), h("div", { class: menuClasses, style: {
                maxHeight: "calc(" + this.itemsLimit + " * " + itemHeight + ")",
            } }, mappedItems.map(renderGroupOrItem, this))));
    };
    Object.defineProperty(WfActionMenu.prototype, "host", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WfActionMenu, "watchers", {
        get: function () {
            return {
                "items": ["handleNewItems"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WfActionMenu, "style", {
        get: function () { return ":host{--flyout-min-height:0}.action-menu{padding:var(--action-menu-padding,var(--spacing-xxxs,3px));min-width:var(--action-menu-min-width,200px);max-width:var(--action-menu-max-width,300px);overflow-y:auto}.action-menu-item{-ms-flex-align:center;align-items:center;background:transparent;border:0;cursor:var(--action-menu-item-cursor,pointer);min-height:var(--action-menu-item-min-height,48px);display:-ms-flexbox;display:flex;font-family:var(--action-menu-item-font-family);font-size:var(--action-menu-item-font-size);font-weight:var(--action-menu-item-font-weight);line-height:var(--action-menu-item-line-height);mix-blend-mode:var(--action-menu-item-blend-mode,normal);padding:0 var(--action-menu-item-horizontal-padding,var(--spacing-xs,12px));text-align:left;width:100%}.action-menu-item.trigger-active,.action-menu-item:hover{background-color:var(--action-menu-item-hover-background,hsla(0,0%,90.2%,.5))}.action-menu-item:active{background-color:var(--action-menu-item-active-background,hsla(0,0%,90.2%,.3))}.action-menu-item-icon-right{-ms-flex-direction:row-reverse;flex-direction:row-reverse}.action-menu-item span{-ms-flex-positive:1;flex-grow:1}.action-menu-item .action-menu-icon{display:-ms-flexbox;display:flex}.action-menu-item-icon-left .action-menu-icon{margin-right:var(--action-menu-item-icon-margin,8px)}.action-menu-item-icon-right .action-menu-icon{margin-left:var(--action-menu-item-icon-margin,8px)}.action-menu .action-menu-child-flyout{display:block;max-width:100%;width:100%}"; },
        enumerable: true,
        configurable: true
    });
    return WfActionMenu;
}());
__decorate([
    PrefixEvent()
], WfActionMenu.prototype, "select", void 0);
export { WfActionMenu as wf_action_menu };
