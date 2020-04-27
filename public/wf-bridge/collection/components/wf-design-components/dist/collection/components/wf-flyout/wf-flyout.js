var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import { setPX } from '../../utils/utils';
import { checkParentElementPosition, checkChildElementPosition, arrowCoordinate, } from '../../utils/calc-position';
import { getElementsFromSlot, makeSiblings, appendToBody, createSpy } from '../../utils/dom-utils';
import { PrefixEvent } from '../../utils/custom-event-emitter';
import { observeIntersection } from '../../utils/observe-intersection';
import { errorMessages } from '../../utils/error-messages';
export class WfFlyout {
    constructor() {
        /** Current depth level */
        this.level = 1;
        /**  Define if flyout should have visual pointer to trigger element */
        this.noArrow = false;
        /** Configure child level flyout menu overlap */
        this.overlap = 0;
        /** Define if flyout content is open or close */
        this.opened = false;
        /** Focusable element attribute. Should be added to design component that content should be focusable. */
        this.focusAttribute = 'focusable';
        /** Tab index assigned to the trigger element */
        this.triggerTabIndex = '0';
        /** DEPRECATED! Define if flyout should have visual pointer to trigger element */
        this.arrowPointer = true;
        /** Trigger event */
        this.trigger = 'click';
        this.enableOpenChangedEvent = false;
        /** Whether it should be moved directly to the body */
        this.detached = false;
        /** Flyout if trigger is in view port */
        this.visible = true;
        /** Trigger position on Screen spaces */
        this.spaces = {
            vertical: 'bottom',
            horizontal: 'center',
        };
        this.screenGrid = { columns: 3, rows: 3 };
        this.triggerSelector = '.flyout-trigger';
        this.focusFirstChild = false;
        this.handleClick = (event) => {
            const { trigger, opened } = this;
            if (trigger === 'none' || (trigger !== 'click' && event.detail === 1))
                return; // event.detail = 0 means it was really a keyboard event
            if (event.detail === 0)
                this.focusFirstChild = true;
            event.preventDefault();
            opened ? this.closeFlyout('MOUSE_CLICK') : this.openFlyout('MOUSE_CLICK');
        };
        this.handleMouseEnter = () => {
            if (this.trigger !== 'hover' || this.opened)
                return;
            this.openFlyout('MOUSE_ENTER');
        };
        this.handleMouseLeave = () => {
            if (this.trigger !== 'hover' || !this.opened)
                return;
            this.closeFlyout('MOUSE_LEAVE', true);
        };
        this.keyPressCases = (event, triggerTarget, currentItemIndex) => ({
            Enter: () => {
                if (triggerTarget) {
                    event.stopPropagation();
                    this.focusFirstChild = true;
                    this.opened ? this.closeFlyout('ENTER_KEY') : this.openFlyout('ENTER_KEY');
                }
            },
            ArrowDown: () => {
                if (triggerTarget) {
                    event.preventDefault();
                    this.focusFirstChild = true;
                    this.openFlyout('ARROW_DOWN');
                }
                if (currentItemIndex !== -1) {
                    event.preventDefault();
                    this.focusNextItem(currentItemIndex);
                }
            },
            ArrowUp: () => {
                if (currentItemIndex !== -1) {
                    event.preventDefault();
                    this.focusPrevItem(currentItemIndex);
                }
            },
            Tab: () => {
                if (currentItemIndex !== -1) {
                    event.preventDefault();
                    this.focusNextItem(currentItemIndex);
                }
            },
            Escape: () => {
                if (this.opened)
                    event.stopPropagation();
                this.closeFlyout('ESC_KEY');
            },
        }[event.key]);
        this.spacesValidity = (params) => {
            return {
                vertical: params.vertical ? params.vertical : this.spaces.vertical,
                horizontal: params.horizontal ? params.horizontal : this.spaces.horizontal,
            };
        };
    }
    componentWillLoad() {
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.focusableElementsSelector = `button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [${this.focusAttribute}]`;
        this.focusableElements = [];
        this.slotElement = this.host.querySelector('[slot=trigger]');
        if (!!this.placement) {
            this.spaces = this.updateSpaces(this.placement);
        }
    }
    emitOpenChanged() {
        if (this.enableOpenChangedEvent) {
            this.flyoutOpenChanged.emit(this.opened);
        }
        if (this.slotElement) {
            Array.from(this.slotElement.children).forEach((child) => child.classList.toggle('trigger-active'));
        }
    }
    searchFocusableInComponent(focusableElement, selector) {
        return focusableElement.shadowRoot.querySelector(selector) || focusableElement;
    }
    queryShadowRoot(element, selector) {
        return element.shadowRoot.querySelector(selector);
    }
    getAllFocusableItems() {
        const flyoutContentElements = getElementsFromSlot(this.host, '.flyout-content slot');
        let foundFocusableElements = [];
        flyoutContentElements.forEach((element) => {
            const elements = Array.from(element.querySelectorAll(this.focusableElementsSelector)).filter((el) => el.offsetWidth);
            foundFocusableElements = [...foundFocusableElements, ...elements];
        });
        return foundFocusableElements;
    }
    setFocusToChild() {
        let firstFocusableElement;
        this.focusableElements = this.getAllFocusableItems();
        firstFocusableElement = this.focusableElements[0];
        if (!firstFocusableElement)
            return;
        if (firstFocusableElement.classList.contains('hydrated')) {
            const focusableInComponent = this.searchFocusableInComponent(firstFocusableElement, this.focusableElementsSelector);
            firstFocusableElement = focusableInComponent;
        }
        firstFocusableElement.focus();
    }
    closeFlyout(reason, notFocus = false) {
        this.opened = false;
        this.close.emit(reason);
        if (notFocus)
            return;
        let elementToFocus;
        if (this.triggerTabIndex === '-1') {
            elementToFocus = this.host
                .querySelector('[slot=trigger]')
                .querySelector(this.focusableElementsSelector);
        }
        else {
            elementToFocus = this.queryShadowRoot(this.host, this.triggerSelector);
        }
        if (elementToFocus) {
            elementToFocus.focus();
        }
    }
    openFlyout(reason) {
        this.opened = true;
        this.open.emit(reason);
    }
    focusPrevItem(currentItemIndex) {
        const newIndex = currentItemIndex <= 0 ? this.focusableElements.length - 1 : currentItemIndex - 1;
        this.focusableElements[newIndex].focus();
    }
    focusNextItem(currentItemIndex) {
        const newIndex = currentItemIndex >= this.focusableElements.length - 1 ? 0 : currentItemIndex + 1;
        this.focusableElements[newIndex].focus();
    }
    searchForFocusableItem(target) {
        return this.focusableElements.indexOf(target);
    }
    handleKeyPress(event) {
        const target = event.path[0];
        const currentItemIndex = this.searchForFocusableItem(target);
        const triggerTarget = target.classList.contains('flyout-trigger');
        const availableEvents = ['Enter', 'ArrowDown', 'ArrowUp', 'Tab', 'Escape'];
        if (availableEvents.includes(event.key) && this.trigger !== 'none') {
            this.keyPressCases(event, triggerTarget, currentItemIndex)();
        }
    }
    clickOutside(event) {
        if (!this.opened || this.trigger !== 'click')
            return;
        let clickPath = [];
        if (event.composedPath)
            clickPath = event.composedPath();
        const triggers = [this.host, this.triggerEl];
        if (!clickPath.some((trigger) => triggers.includes(trigger)))
            this.closeFlyout('OUTSIDE_CLICK');
    }
    applyStyles(arrow, { top, right, bottom, left }) {
        const { style } = arrow;
        top ? (style.top = top) : style.removeProperty('top');
        right ? (style.right = right) : style.removeProperty('right');
        bottom ? (style.bottom = bottom) : style.removeProperty('bottom');
        left ? (style.left = left) : style.removeProperty('left');
    }
    calculateArrowPointer(spaces) {
        const { triggerEl, flyoutElement, applyStyles } = this;
        const arrow = flyoutElement.querySelector('.arrow-pointer');
        const arrowSize = arrow.getBoundingClientRect().width;
        const coordinate = arrowCoordinate(`${spaces.vertical}-${spaces.horizontal}`, triggerEl, arrowSize);
        applyStyles(arrow, coordinate);
    }
    updateSpaces(placement) {
        const placementsMap = {
            top: { vertical: 'bottom', horizontal: 'center' },
            bottom: { vertical: 'top', horizontal: 'center' },
            left: { vertical: 'middle', horizontal: 'right' },
            right: { vertical: 'middle', horizontal: 'left' },
        };
        return placementsMap[placement];
    }
    updatePosition() {
        const { opened, triggerEl, flyoutElement, screenGrid, level, overlap, noArrow, arrowPointer, spacesValidity, } = this;
        if (!opened || !triggerEl || !flyoutElement)
            return;
        let defaultSpaces;
        if (!!this.placement) {
            defaultSpaces = this.updateSpaces(this.placement);
        }
        const newPlacement = level === 1
            ? checkParentElementPosition(triggerEl, flyoutElement, screenGrid, defaultSpaces)
            : checkChildElementPosition(triggerEl, flyoutElement, overlap, defaultSpaces);
        const { placement, spaces } = newPlacement;
        flyoutElement.style.top = setPX(placement.top);
        flyoutElement.style.left = setPX(placement.left);
        if (!noArrow || !!arrowPointer) {
            const flyoutContent = flyoutElement.querySelector('.flyout-content');
            const oldClassName = `flyout-content-${this.spaces.vertical}-${this.spaces.horizontal}`;
            const validSpaces = spacesValidity(spaces);
            const newClassName = `flyout-content-${validSpaces.vertical}-${validSpaces.horizontal}`;
            if (oldClassName !== newClassName) {
                flyoutContent.classList.remove(oldClassName);
                flyoutContent.classList.add(newClassName);
            }
            this.calculateArrowPointer(validSpaces);
            this.spaces = validSpaces;
        }
        requestAnimationFrame(this.updatePosition.bind(this));
    }
    componentDidLoad() {
        this.setupTriggerElement();
        this.componentDidUpdate();
    }
    componentDidUpdate() {
        const { host, opened } = this;
        this.flyoutElement = this.queryShadowRoot(host, '.flyout-content-wrapper');
        if (opened) {
            if (this.focusFirstChild) {
                this.focusFirstChild = false;
                this.setFocusToChild();
            }
            this.updatePosition();
        }
    }
    setupTriggerElement() {
        if (this.detached) {
            const assignedElements = getElementsFromSlot(this.host, '.flyout-trigger slot');
            if (assignedElements.length === 0) {
                throw new Error(errorMessages.NOT_FOUND_DETACHED_ELEMENT);
            }
            if (assignedElements.length > 1) {
                throw new Error(errorMessages.MORE_THAN_ONE_ELEMENT);
            }
            this.triggerEl = assignedElements[0];
            this.detachHost();
        }
        else {
            this.triggerEl = this.host.shadowRoot.querySelector('.flyout-trigger');
        }
        this.addEventListeners();
        this.addIntersectionObserver();
    }
    detachHost() {
        // extract trigger element from the host
        makeSiblings(this.host, this.triggerEl);
        // create spy to spy on host, inject spy into trigger element
        createSpy(this.host, this.triggerEl);
        // detach tooltip from original context
        appendToBody(this.host);
    }
    addEventListeners() {
        const { triggerEl, handleMouseEnter, handleMouseLeave, handleClick } = this;
        triggerEl.addEventListener('mouseenter', handleMouseEnter);
        triggerEl.addEventListener('mouseleave', handleMouseLeave);
        triggerEl.addEventListener('click', handleClick);
    }
    addIntersectionObserver() {
        const { triggerEl } = this;
        observeIntersection(triggerEl, (entries) => {
            if (!this.opened)
                return;
            if (!entries[0].isIntersecting) {
                this.visible = false;
                return;
            }
            this.visible = true;
            this.updatePosition();
        }, { threshold: [0] });
    }
    componentDidUnload() {
        const { triggerEl, handleMouseEnter, handleMouseLeave, handleClick } = this;
        triggerEl.removeEventListener('mouseenter', handleMouseEnter);
        triggerEl.removeEventListener('mouseleave', handleMouseLeave);
        triggerEl.removeEventListener('click', handleClick);
    }
    render() {
        const { arrowPointer, noArrow, spaces, opened, visible, trigger, triggerTabIndex, handleMouseEnter, handleMouseLeave, } = this;
        const triggerClasses = {
            ['flyout-trigger']: true,
            ['flyout-trigger-none']: trigger === 'none',
        };
        const contentWrapperClasses = {
            ['flyout-content-wrapper']: true,
            ['no-arrow']: !arrowPointer || !!noArrow,
        };
        const contentClasses = {
            ['flyout-content']: true,
            [`flyout-content-${spaces.vertical}-${spaces.horizontal}`]: true,
        };
        return (h("div", { class: "flyout", onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave },
            h("div", { class: triggerClasses, tabindex: triggerTabIndex },
                h("slot", { name: "trigger" })),
            opened && visible ? (h("div", { class: contentWrapperClasses },
                h("div", { class: contentClasses },
                    h("span", { class: "arrow-mask" },
                        h("span", { class: "arrow-pointer" })),
                    h("div", { class: "flyout-content-slot-wrapper" },
                        h("slot", null))))) : (h("div", null))));
    }
    static get is() { return "wf-flyout"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/flyout/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/flyout/main.css"]
    }; }
    static get properties() { return {
        "level": {
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
                "text": "Current depth level"
            },
            "attribute": "level",
            "reflect": false,
            "defaultValue": "1"
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
                "text": "Define if flyout should have visual pointer to trigger element"
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
            "defaultValue": "0"
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
                "text": "Define if flyout content is open or close"
            },
            "attribute": "opened",
            "reflect": false,
            "defaultValue": "false"
        },
        "focusAttribute": {
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
                "text": "Focusable element attribute. Should be added to design component that content should be focusable."
            },
            "attribute": "focus-attribute",
            "reflect": false,
            "defaultValue": "'focusable'"
        },
        "triggerTabIndex": {
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
                "text": "Tab index assigned to the trigger element"
            },
            "attribute": "trigger-tab-index",
            "reflect": false,
            "defaultValue": "'0'"
        },
        "arrowPointer": {
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
                "text": "DEPRECATED! Define if flyout should have visual pointer to trigger element"
            },
            "attribute": "arrow-pointer",
            "reflect": false,
            "defaultValue": "true"
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
                        "path": "./types"
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
        "enableOpenChangedEvent": {
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
                "text": ""
            },
            "attribute": "enable-open-changed-event",
            "reflect": false,
            "defaultValue": "false"
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
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Placement of flyout, if not defined it will be auto-calculated"
            },
            "attribute": "placement",
            "reflect": false
        },
        "detached": {
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
                "text": "Whether it should be moved directly to the body"
            },
            "attribute": "detached",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "contentPositionStyles": {},
        "visible": {}
    }; }
    static get events() { return [{
            "method": "flyoutOpenChanged",
            "name": "flyoutOpenChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "docOpen",
            "name": "open",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "FlyoutOpenEvent",
                "resolved": "\"ARROW_DOWN\" | \"ENTER_KEY\" | \"MOUSE_CLICK\" | \"MOUSE_ENTER\"",
                "references": {
                    "FlyoutOpenEvent": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            }
        }, {
            "method": "docWfOpen",
            "name": "wfOpen",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "FlyoutOpenEvent",
                "resolved": "\"ARROW_DOWN\" | \"ENTER_KEY\" | \"MOUSE_CLICK\" | \"MOUSE_ENTER\"",
                "references": {
                    "FlyoutOpenEvent": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            }
        }, {
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
                "original": "FlyoutCloseEvent",
                "resolved": "\"ENTER_KEY\" | \"ESC_KEY\" | \"MOUSE_CLICK\" | \"MOUSE_LEAVE\" | \"OUTSIDE_CLICK\"",
                "references": {
                    "FlyoutCloseEvent": {
                        "location": "import",
                        "path": "./types"
                    }
                }
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
                "original": "FlyoutCloseEvent",
                "resolved": "\"ENTER_KEY\" | \"ESC_KEY\" | \"MOUSE_CLICK\" | \"MOUSE_LEAVE\" | \"OUTSIDE_CLICK\"",
                "references": {
                    "FlyoutCloseEvent": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            }
        }]; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "opened",
            "methodName": "emitOpenChanged"
        }]; }
    static get listeners() { return [{
            "name": "keydown",
            "method": "handleKeyPress",
            "target": undefined,
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
], WfFlyout.prototype, "open", void 0);
__decorate([
    PrefixEvent()
], WfFlyout.prototype, "close", void 0);
