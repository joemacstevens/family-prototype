var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import { DrawerPositionEnum, DrawerWidthEnum } from './types';
import { checkIfPresetExist, getPositionFromPreset } from '../../utils/presets';
import { animate, setupTimeout } from '../../utils/utils';
import { enableBodyScroll, disableBodyScroll } from '../../utils/block-scroll';
import { PrefixEvent } from '../../utils/custom-event-emitter';
export class WfDrawer {
    constructor() {
        /** Position of drawer */
        this.position = 'right';
        /** Backdrop drawer */
        this.hideBackdrop = false;
        /** Controls the 'opened' state of the drawer */
        this.opened = false;
        /** Closing action icon name */
        this.closeIcon = 'wf-close';
        /** Control back button */
        this.backButton = false;
        /** Back action icon name */
        this.backIcon = 'wf-arrow-left';
        /** The size of the close and back icon */
        this.iconSize = 'xs';
        /** Control should drawer squeeze page */
        this.squeezePage = false;
        /** Min witdth of page where squeeze is available */
        this.thresholdBreakpoint = 1680;
        /** Animation duration */
        this.animationDuration = 500;
        this.isSqueezed = false;
        this.isSqueeze = () => {
            const { position, width, squeezePage, thresholdBreakpoint } = this;
            const overlayThreshold = document.body.getBoundingClientRect().width > thresholdBreakpoint;
            return (squeezePage &&
                position === DrawerPositionEnum.RIGHT &&
                width === DrawerWidthEnum.SLIM &&
                overlayThreshold);
        };
        this.onBackClick = () => {
            this.back.emit();
        };
    }
    handleGlobalScroll(opened) {
        if (!this.hideBackdrop && !this.isSqueeze()) {
            opened ? disableBodyScroll(this.drawerDialog) : enableBodyScroll(this.drawerDialog);
        }
    }
    async close() {
        const { isSqueeze, position, drawerClose, drawerDialog, animationDuration } = this;
        if (!this.opened)
            return;
        if (isSqueeze() || this.isSqueezed) {
            animate(document.body, `${drawerDialog.offsetWidth}px`, `0`, 'paddingRight', animationDuration);
            this.isSqueezed = false;
        }
        animate(drawerDialog, '0', `-${drawerDialog[this.isVertical(this.position) ? 'offsetWidth' : 'offsetHeight']}px`, position, animationDuration);
        setupTimeout(() => {
            this.opened = false;
            drawerClose.emit();
        }, animationDuration);
        return;
    }
    isPreset(preset) {
        let presetExist = false;
        try {
            presetExist = checkIfPresetExist(preset);
        }
        catch (e) {
            presetExist = false;
        }
        return presetExist;
    }
    checkPreset() {
        const { preset, host } = this;
        if (preset && preset.length > 0 && this.isPreset(preset)) {
            this.setStylesByPreset(host);
        }
    }
    isVertical(position) {
        return position === 'left' || position === 'right';
    }
    setStylesByPreset(host) {
        const { opened, position, preset, isVertical, isSqueeze } = this;
        if (opened && !isSqueeze()) {
            const drawer = host.shadowRoot.querySelector('.drawer-dialog');
            const presets = getPositionFromPreset(preset, position);
            isVertical(position)
                ? drawer.setAttribute('style', `top: ${presets.start}px; bottom: ${presets.end}px`)
                : drawer.setAttribute('style', `left: ${presets.start}px; right: ${presets.end}px`);
            requestAnimationFrame(this.setStylesByPreset.bind(this, host));
        }
    }
    componentDidRender() {
        this.checkPreset();
        if (this.opened) {
            if (this.isSqueeze()) {
                animate(document.body, '0', `${Math.round((this.drawerDialog.offsetWidth / document.body.offsetWidth) * 100)}%`, 'paddingRight', this.animationDuration);
                this.isSqueezed = true;
            }
            animate(this.drawerDialog, `-${this.drawerDialog[this.isVertical(this.position) ? 'offsetWidth' : 'offsetHeight']}px`, '0', this.position, this.animationDuration);
        }
    }
    componentDidUpdate() {
        this.checkPreset();
    }
    render() {
        const { opened, hideBackdrop, width, position, header, close, isSqueeze, closeIcon, backIcon, onBackClick, backButton, iconSize, } = this;
        const dialogClasses = {
            drawer: true,
            [`drawer-${width}`]: !!width,
            [`drawer-position-${position}`]: true,
        };
        const drawerBodyClasses = {
            ['drawer-dialog']: true,
            ['drawer-dialog-squeeze']: isSqueeze(),
        };
        const drawerHeaderClasses = {
            ['title']: true,
            ['header-6']: !!width && width === 'slim',
            ['header-4']: !width || width === 'wide',
        };
        return opened ? (h("div", { class: dialogClasses },
            hideBackdrop || isSqueeze() ? null : (h("div", { class: "drawer-backdrop", onClick: close.bind(this) })),
            h("div", { ref: (el) => (this.drawerDialog = el), class: drawerBodyClasses },
                h("header", { class: "drawer-header" },
                    h("wf-action-icon", { class: "drawer-header-icon-close", name: closeIcon, size: iconSize, onClick: close.bind(this) }),
                    backButton && (h("wf-action-icon", { class: "drawer-header-icon-back", name: backIcon, size: iconSize, onClick: onBackClick })),
                    header && h("p", { class: drawerHeaderClasses }, header),
                    h("div", { class: "drawer-header-custom-content" },
                        h("slot", { name: "header" })),
                    !backButton && h("hr", { class: "divider divider-2" })),
                h("main", { class: "drawer-body" },
                    h("div", { class: "drawer-body-content" },
                        h("slot", null)),
                    h("footer", { class: "drawer-footer" },
                        h("slot", { name: "footer" })))))) : null;
    }
    static get is() { return "wf-drawer"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/drawer/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/drawer/main.css"]
    }; }
    static get properties() { return {
        "width": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "DrawerWidth",
                "resolved": "\"slim\" | \"wide\"",
                "references": {
                    "DrawerWidth": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Controls the 'width' of drawer dialog. Can be standard (default), slim or wide"
            },
            "attribute": "width",
            "reflect": false
        },
        "header": {
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
                "text": "Simple drawer title"
            },
            "attribute": "header",
            "reflect": false
        },
        "position": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "DrawerPosition",
                "resolved": "\"bottom\" | \"left\" | \"right\" | \"top\"",
                "references": {
                    "DrawerPosition": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Position of drawer"
            },
            "attribute": "position",
            "reflect": false,
            "defaultValue": "'right'"
        },
        "preset": {
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
                "text": "Preset drawer"
            },
            "attribute": "preset",
            "reflect": false
        },
        "hideBackdrop": {
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
                "text": "Backdrop drawer"
            },
            "attribute": "hidebackdrop",
            "reflect": false,
            "defaultValue": "false"
        },
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
                "text": "Controls the 'opened' state of the drawer"
            },
            "attribute": "opened",
            "reflect": false,
            "defaultValue": "false"
        },
        "closeIcon": {
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
                "text": "Closing action icon name"
            },
            "attribute": "close-icon",
            "reflect": false,
            "defaultValue": "'wf-close'"
        },
        "backButton": {
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
                "text": "Control back button"
            },
            "attribute": "back-button",
            "reflect": false,
            "defaultValue": "false"
        },
        "backIcon": {
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
                "text": "Back action icon name"
            },
            "attribute": "back-icon",
            "reflect": false,
            "defaultValue": "'wf-arrow-left'"
        },
        "iconSize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ActionIconSize",
                "resolved": "\"sm\" | \"xs\"",
                "references": {
                    "ActionIconSize": {
                        "location": "import",
                        "path": "../wf-action-icon/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The size of the close and back icon"
            },
            "attribute": "icon-size",
            "reflect": false,
            "defaultValue": "'xs'"
        },
        "squeezePage": {
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
                "text": "Control should drawer squeeze page"
            },
            "attribute": "squeeze-page",
            "reflect": false,
            "defaultValue": "false"
        },
        "thresholdBreakpoint": {
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
                "text": "Min witdth of page where squeeze is available"
            },
            "attribute": "threshold-breakpoint",
            "reflect": false,
            "defaultValue": "1680"
        },
        "animationDuration": {
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
                "text": "Animation duration"
            },
            "attribute": "animation-duration",
            "reflect": false,
            "defaultValue": "500"
        }
    }; }
    static get events() { return [{
            "method": "docClose",
            "name": "close",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "docWfClose",
            "name": "wfClose",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "docBack",
            "name": "back",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "docWfBack",
            "name": "wfBack",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "close": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "opened",
            "methodName": "handleGlobalScroll"
        }]; }
}
__decorate([
    PrefixEvent({ eventName: 'close' })
], WfDrawer.prototype, "drawerClose", void 0);
__decorate([
    PrefixEvent()
], WfDrawer.prototype, "back", void 0);
