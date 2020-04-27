var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import { KeyValue, DropdownTriggerType } from '../../utils/types';
import { DropdownVerticalState, DropdownHorizontalState } from './types';
import { PrefixEvent } from '../../utils/custom-event-emitter';
export class WfDropdown {
    constructor() {
        this.opened = false;
        /** Define if closing on scroll active **/
        this.scrollSensitive = false;
        /** Define if dropdown available to open **/
        this.disabled = false;
        /** Define if dropdown aling with parent **/
        this.alignWithParent = true;
        /** Define should we adjust height **/
        this.adjustHeight = false;
        this.manualMaxWidth = false;
        this.manualWidth = false;
        this.toggleDropdown = (ev) => {
            if (this.disabled)
                return;
            switch (this.dropdownParent.dataset.dropdown) {
                case DropdownTriggerType.OPEN_ONLY:
                    this.opened = true;
                    break;
                case DropdownTriggerType.OPEN_ONLY_WITH_ICON:
                    this.opened = ev
                        .composedPath()
                        .some((element) => element.nodeName && element.nodeName.toLowerCase().includes('icon'))
                        ? !this.opened
                        : true;
                    break;
                case false.toString():
                    break;
                default:
                    this.opened = !this.opened;
            }
        };
        this.toggleTrigger = (ev) => {
            if (this.disabled)
                return;
            const targetElement = ev.composedPath ? ev.composedPath()[0] : this.dropdownTriggers[0];
            if (targetElement.dataset.dropdownTrigger === undefined)
                return;
            this.opened =
                targetElement.dataset.dropdownTrigger === DropdownTriggerType.OPEN_ONLY ? true : !this.opened;
        };
        this.checkPlacement = () => {
            const { dropdown, dropdownParent, alignWithParent, manualWidth } = this;
            if (!this.opened || !this.dropdownParent)
                return;
            dropdown.style.transform = '';
            const rect = dropdown.getBoundingClientRect();
            dropdown.style.transform = `translate(${this.calculateHorizontalPosition(dropdown, document.body.clientWidth, rect)}px, -${this.calculateVerticalValue(dropdown, rect, dropdownParent.getBoundingClientRect(), window.innerHeight)}px)`;
            if (alignWithParent && !manualWidth)
                dropdown.style.width = `${dropdownParent.offsetWidth}px`;
            requestAnimationFrame(this.checkPlacement);
        };
    }
    componentDidLoad() {
        const parentNode = this.parentSelector && this.host.closest(this.parentSelector)
            ? this.host.closest(this.parentSelector)
            : this.host.parentNode;
        this.dropdownParent = this.host.parentNode.querySelector('[data-dropdown]');
        this.dropdownTriggers = parentNode.querySelectorAll('[data-dropdown-trigger]');
        if (this.dropdownParent) {
            this.dropdownParent.addEventListener('click', this.toggleDropdown);
        }
        if (this.dropdownTriggers.length > 0) {
            this.dropdownTriggers.forEach((trigger) => trigger.addEventListener('click', this.toggleTrigger));
        }
    }
    componentDidRender() {
        if (this.opened) {
            this.manualMaxWidth = !isNaN(parseFloat(window.getComputedStyle(this.dropdown).maxWidth));
            this.manualWidth =
                this.dropdown.offsetWidth !== document.body.offsetWidth &&
                    this.dropdownParent.classList.contains('form-control-select');
            this.checkPlacement();
            return;
        }
        this.dropdown && this.dropdown.removeAttribute('style');
    }
    componentDidUnload() {
        if (this.dropdownParent) {
            this.dropdownParent.removeEventListener('click', this.toggleDropdown);
        }
        if (Array.isArray(this.dropdownTriggers) && this.dropdownTriggers.length > 0) {
            this.dropdownTriggers.forEach((trigger) => trigger.removeEventListener('click', this.toggleTrigger));
        }
    }
    handleOpenedChange() {
        this.emitEvent();
    }
    onGlobalScroll() {
        if (!this.scrollSensitive)
            return;
        this.closeSelect();
    }
    closeSelect() {
        if (!this.opened)
            return;
        this.opened = false;
    }
    handleKeydown(ev) {
        if (ev.key === KeyValue.ESC_KEY && this.opened) {
            ev.preventDefault();
            this.closeSelect();
        }
    }
    clickOutside(event) {
        if (!this.opened)
            return;
        let clickPath = [];
        if (event.composedPath)
            clickPath = event.composedPath();
        const triggers = [this.host, this.dropdownParent, ...Array.from(this.dropdownTriggers)];
        if (!clickPath.some((trigger) => triggers.includes(trigger)))
            this.closeSelect();
    }
    calculateVerticalValue(dropdown, rect, parentRect, windowHeight) {
        const verticalState = this.getVerticalState(windowHeight, rect, parentRect);
        if (this.adjustHeight)
            dropdown.firstElementChild.assignedElements()[0].style.height =
                dropdown.offsetWidth === dropdown.scrollWidth ? '' : 'auto';
        dropdown.style.maxHeight = `${windowHeight}px`;
        switch (verticalState) {
            case DropdownVerticalState.OPEN_BOTTOM:
                return rect.top - parentRect.bottom;
            case DropdownVerticalState.OPEN_TOP:
                return rect.bottom - parentRect.top;
            case DropdownVerticalState.SCROLL:
                dropdown.style.overflow = 'auto';
            case DropdownVerticalState.OPEN_OVERLAP:
                return rect.bottom - windowHeight;
        }
    }
    calculateHorizontalPosition(dropdown, windowWidth, rect) {
        const state = (() => {
            if (rect.width > windowWidth)
                return DropdownHorizontalState.SCROLL;
            if (rect.right > windowWidth)
                return DropdownHorizontalState.OPEN_OVERLAP;
            return DropdownHorizontalState.OPEN_ALIGNED;
        })();
        if (!this.manualMaxWidth)
            dropdown.style.maxWidth = `${windowWidth}px`;
        switch (state) {
            case DropdownHorizontalState.OPEN_ALIGNED:
                return 0;
            case DropdownHorizontalState.SCROLL:
                dropdown.style.overflow = 'auto';
            case DropdownHorizontalState.OPEN_OVERLAP:
                return windowWidth - rect.right;
        }
    }
    getVerticalState(windowHeight, rect, parentRect) {
        if (rect.height > windowHeight)
            return DropdownVerticalState.SCROLL;
        if (windowHeight - parentRect.bottom > rect.height)
            return DropdownVerticalState.OPEN_BOTTOM;
        if (parentRect.top > rect.height)
            return DropdownVerticalState.OPEN_TOP;
        return DropdownVerticalState.OPEN_OVERLAP;
    }
    emitEvent() {
        this.toggle.emit(this.opened);
    }
    render() {
        const dropdownClasses = {
            ['dropdown']: true,
            ['dropdown-opened']: !!this.opened,
            ['dropdown-aligned']: !!this.alignWithParent,
        };
        return (h("div", { ref: (el) => (this.dropdown = el), class: dropdownClasses },
            h("slot", null)));
    }
    static get is() { return "wf-dropdown"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/dropdown/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/dropdown/main.css"]
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
                "text": ""
            },
            "attribute": "opened",
            "reflect": false,
            "defaultValue": "false"
        },
        "scrollSensitive": {
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
                "text": "Define if closing on scroll active *"
            },
            "attribute": "scroll-sensitive",
            "reflect": false,
            "defaultValue": "false"
        },
        "parentSelector": {
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
                "text": "Define for special case parent selector *"
            },
            "attribute": "parent-selector",
            "reflect": false
        },
        "disabled": {
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
                "text": "Define if dropdown available to open *"
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "alignWithParent": {
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
                "text": "Define if dropdown aling with parent *"
            },
            "attribute": "align-with-parent",
            "reflect": false,
            "defaultValue": "true"
        },
        "adjustHeight": {
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
                "text": "Define should we adjust height *"
            },
            "attribute": "adjust-height",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get events() { return [{
            "method": "docToggle",
            "name": "toggle",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Toggle event"
            },
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            }
        }, {
            "method": "docWfToggle",
            "name": "wfToggle",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Toggle event"
            },
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            }
        }]; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "opened",
            "methodName": "handleOpenedChange"
        }]; }
    static get listeners() { return [{
            "name": "scroll",
            "method": "onGlobalScroll",
            "target": "window",
            "capture": false,
            "passive": true
        }, {
            "name": "keydown",
            "method": "handleKeydown",
            "target": "window",
            "capture": false,
            "passive": false
        }, {
            "name": "click",
            "method": "clickOutside",
            "target": "window",
            "capture": false,
            "passive": false
        }]; }
}
__decorate([
    PrefixEvent()
], WfDropdown.prototype, "toggle", void 0);
