var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import { PrefixEvent } from '../../utils/custom-event-emitter';
export class WfActionMenu {
    constructor() {
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
    }
    componentWillLoad() {
        if (!['left', 'right'].includes(this.subPlacement))
            this.subPlacement = undefined;
        this.handleNewItems();
    }
    handleOpenChanged(event) {
        this.opened = event.detail;
        event.stopPropagation();
    }
    handleNewItems() {
        this.parsedItems = Array.isArray(this.items) ? this.items : JSON.parse(this.items);
        this.mappedItems = this.parsedItems
            ? this.parsedItems.map((item) => {
                return {
                    title: item.groupTitle,
                    icon: item.groupIcon,
                    iconSize: item.groupIconSize,
                    iconAlign: item.groupIconAlign,
                    isGroup: !(item.items && item.items.length <= 1),
                    originalItem: item.items && item.items.length <= 1 ? item.items[0] : item,
                    items: item.items ? item.items.map(this.mapActionItem) : [],
                };
            })
            : [];
    }
    mapActionItem(item) {
        return {
            title: item.menuItemTitle,
            icon: item.menuItemIcon,
            iconSize: item.menuItemIconSize,
            iconAlign: item.menuItemIconAlign,
            isGroup: false,
            originalItem: item,
        };
    }
    handleItemClick(item) {
        this.select.emit(item.originalItem);
        this.opened = false;
        if (this.host && this.host.shadowRoot) {
            this.host.shadowRoot
                .querySelectorAll('wf-flyout')
                .forEach((flyout) => (flyout.opened = false));
        }
    }
    renderItem(item, enableClickEvent = true) {
        const itemClasses = {
            'action-menu-item': true,
            [`action-menu-item-icon-${item.iconAlign || 'right'}`]: true,
        };
        return (h("button", { class: itemClasses, onClick: enableClickEvent && this.handleItemClick.bind(this, item) },
            !!item.icon && (h("wf-icon", { class: "action-menu-icon", size: item.iconSize || 'xs', name: item.icon })),
            h("span", null, item.title)));
    }
    renderGroup(item) {
        const { renderItem, overlap, noArrow, subPlacement, childTrigger } = this;
        const menuClasses = {
            'action-menu': true,
        };
        return (h("wf-flyout", { class: "action-menu-child-flyout", "trigger-tab-index": "-1", level: 2, overlap: overlap, "no-arrow": noArrow, trigger: childTrigger, placement: subPlacement },
            h("div", { slot: "trigger" }, renderItem(item, false)),
            h("div", { class: menuClasses }, item.items.map((item) => renderItem.call(this, item, true)))));
    }
    renderGroupOrItem(item) {
        const { renderGroup, renderItem } = this;
        return item.isGroup ? renderGroup.call(this, item) : renderItem.call(this, item, true);
    }
    render() {
        const { mappedItems, renderGroupOrItem, overlap, trigger, placement } = this;
        const button = this.host.shadowRoot
            ? this.host.shadowRoot.querySelector('.action-menu-item')
            : null;
        const itemHeight = button ? getComputedStyle(button).minHeight : '0px';
        const menuClasses = {
            'action-menu': true,
        };
        return (h("wf-flyout", { opened: this.opened, "enable-open-changed-event": true, overlap: overlap, trigger: trigger, placement: placement },
            h("slot", { slot: "trigger", name: "trigger" }),
            h("div", { class: menuClasses, style: {
                    maxHeight: `calc(${this.itemsLimit} * ${itemHeight})`,
                } }, mappedItems.map(renderGroupOrItem, this))));
    }
    static get is() { return "wf-action-menu"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/action-menu/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/action-menu/main.css"]
    }; }
    static get properties() { return {
        "opened": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Define if action menu is opened or closed"
            },
            "attribute": "opened",
            "reflect": false,
            "defaultValue": "false"
        },
        "items": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "GroupItemDTO[] | string",
                "resolved": "GroupItemDTO[] | string",
                "references": {
                    "GroupItemDTO": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Strucutre of menu items"
            },
            "attribute": "items",
            "reflect": false,
            "defaultValue": "[]"
        },
        "itemsLimit": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Limit of items to show in primary dropdown"
            },
            "attribute": "items-limit",
            "reflect": false,
            "defaultValue": "9"
        },
        "extraItemsLabel": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label of extra items button"
            },
            "attribute": "extra-items-label",
            "reflect": false,
            "defaultValue": "'More items...'"
        },
        "noArrow": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Configure the arrow pointer for the child level menu flyout"
            },
            "attribute": "no-arrow",
            "reflect": false,
            "defaultValue": "false"
        },
        "overlap": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Configure child level flyout menu overlap"
            },
            "attribute": "overlap",
            "reflect": false,
            "defaultValue": "12"
        },
        "trigger": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "FlyoutEvent",
                "resolved": "\"click\" | \"hover\" | \"none\"",
                "references": {
                    "FlyoutEvent": {
                        "location": "import",
                        "path": "../wf-flyout/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Trigger event"
            },
            "attribute": "trigger",
            "reflect": false,
            "defaultValue": "'click'"
        },
        "childTrigger": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "FlyoutEvent",
                "resolved": "\"click\" | \"hover\" | \"none\"",
                "references": {
                    "FlyoutEvent": {
                        "location": "import",
                        "path": "../wf-flyout/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Child menu trigger event"
            },
            "attribute": "child-trigger",
            "reflect": false,
            "defaultValue": "'hover'"
        },
        "placement": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "FlyoutPlacement",
                "resolved": "\"bottom\" | \"left\" | \"right\" | \"top\"",
                "references": {
                    "FlyoutPlacement": {
                        "location": "import",
                        "path": "../wf-flyout/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Placement of action menu, if not defined it will be auto-calculated"
            },
            "attribute": "placement",
            "reflect": false
        },
        "subPlacement": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "'left' | 'right'",
                "resolved": "\"left\" | \"right\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Placement of sub menus, if not defined it will be auto-calculated"
            },
            "attribute": "sub-placement",
            "reflect": false
        }
    }; }
    static get events() { return [{
            "method": "docSelect",
            "name": "select",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Select event"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "docWfSelect",
            "name": "wfSelect",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Select event"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "items",
            "methodName": "handleNewItems"
        }]; }
    static get listeners() { return [{
            "name": "flyoutOpenChanged",
            "method": "handleOpenChanged",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
__decorate([
    PrefixEvent()
], WfActionMenu.prototype, "select", void 0);
