var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import { checkElementPosition } from '../../utils/calc-position';
import { setPX } from '../../utils/utils';
import { defaultTimeout, defaultScreenGrid, defaultDistance } from './constants';
import { createAnimationFrameRunner, } from '../../utils/create-animation-frame-runner';
import { observeIntersection } from '../../utils/observe-intersection';
import { createTimeout } from '../../utils/create-timeout';
import { queryShadowRoot, makeSiblings, appendToBody, createSpy } from '../../utils/dom-utils';
import { PrefixEvent } from '../../utils/custom-event-emitter';
import { errorMessages } from '../../utils/error-messages';
export class WfTooltip {
    constructor() {
        this.distance = defaultDistance;
        this.closeTimeout = createTimeout();
        /** Trigger position on Screen spaces */
        this.spaces = {
            vertical: 'bottom',
            horizontal: 'center',
        };
        /** Type of tooltip */
        this.type = 'default';
        /** Trigger event */
        this.trigger = 'hover';
        /** Tooltip visibility period */
        this.timeout = defaultTimeout;
        /** Controls the 'visible' state of the tooltip */
        this.opened = false;
        /** Controls the 'width' of drawer dialog. Can be standard (default), slim or wide */
        this.width = 'standard';
        /** Whether it should be moved directly to the body */
        this.detached = false;
        this.updatePosition = () => {
            const { opened, triggerEl, tooltipEl, distance } = this;
            if (!opened || !tooltipEl.classList.contains('show'))
                return;
            const newPlacement = checkElementPosition(triggerEl, tooltipEl, defaultScreenGrid, distance, this.getDefaultSpaces());
            this.tryAdjustSpaces(newPlacement.spaces);
            tooltipEl.style.top = setPX(newPlacement.placement.top);
            tooltipEl.style.left = setPX(newPlacement.placement.left);
            // this is to resolve Chrome loosing frames when smooth scrolling is disabled
            tooltipEl.style.willChange = 'top, left';
        };
        this.mouseEnterListener = () => this.handleEvent('hover', true);
        this.mouseLeaveListener = () => this.handleEvent('hover', false);
        this.clickListener = () => this.handleEvent('click', !this.opened);
    }
    openHandle(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.toggleTooltip(newValue);
        }
    }
    toggleTooltip(opened) {
        if (!opened) {
            this.hide();
            return;
        }
        this.show();
        if (this.timeout > 0)
            this.setupTimeout(this.timeout);
    }
    toggleTriggerActiveClass(toggle) {
        const cls = 'trigger-active';
        const assignedElements = this.getElementsFromSlot();
        for (const el of assignedElements) {
            toggle ? el.classList.add(cls) : el.classList.remove(cls);
        }
    }
    show() {
        const { tooltipEl } = this;
        tooltipEl.classList.add('show');
        this.toggleTriggerActiveClass(true);
        this.closeTimeout.clear();
        this.animationFrameRunner.start();
    }
    hide() {
        const { tooltipEl } = this;
        tooltipEl.classList.remove('show');
        this.opened = false;
        this.close.emit();
        this.toggleTriggerActiveClass(false);
        this.animationFrameRunner.stop();
    }
    setupTimeout(timeout) {
        this.closeTimeout.clear();
        this.closeTimeout.set(() => {
            this.hide();
        }, timeout);
    }
    clickOutside(event) {
        if (!this.opened || this.trigger !== 'click')
            return;
        let clickPath = [];
        if (event.composedPath)
            clickPath = event.composedPath();
        const triggers = [this.host, this.tooltipEl, this.triggerEl];
        if (!clickPath.some((trigger) => triggers.includes(trigger)))
            this.hide();
    }
    placementHandle(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.updateSpaces(newValue);
        }
    }
    updateSpaces(placement) {
        const placementsMap = {
            top: { vertical: 'bottom', horizontal: 'center' },
            bottom: { vertical: 'top', horizontal: 'center' },
            left: { vertical: 'middle', horizontal: 'right' },
            right: { vertical: 'middle', horizontal: 'left' },
        };
        this.spaces = placementsMap[placement];
    }
    componentWillLoad() {
        const { updatePosition, placement } = this;
        this.animationFrameRunner = createAnimationFrameRunner(updatePosition);
        if (!!placement) {
            this.updateSpaces(placement);
        }
    }
    getDefaultSpaces() {
        const { placement } = this;
        if (placement) {
            return this.spaces;
        }
    }
    tryAdjustSpaces(newSpaces) {
        const { spaces } = this;
        if (spaces.horizontal === newSpaces.horizontal && spaces.vertical === newSpaces.vertical) {
            return;
        }
        this.spaces = newSpaces;
    }
    componentDidLoad() {
        const { opened } = this;
        this.setupTriggerElement();
        this.tooltipEl = this.host.shadowRoot.querySelector('.tooltip-wrapper');
        if (window.getComputedStyle(this.tooltipEl).paddingTop) {
            this.distance = parseInt(window.getComputedStyle(this.tooltipEl).paddingTop, 10);
        }
        if (opened) {
            this.toggleTooltip(true);
            this.animationFrameRunner.start();
        }
    }
    setupTriggerElement() {
        if (this.detached) {
            const assignedElements = this.getElementsFromSlot();
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
            this.triggerEl = this.host.shadowRoot.querySelector('.tooltip-trigger');
        }
        this.addEventListeners();
        this.addIntersectionObserver();
    }
    getElementsFromSlot() {
        const slotEl = queryShadowRoot(this.host, '.tooltip-trigger>>slot');
        return slotEl ? slotEl.assignedElements() : [];
    }
    detachHost() {
        // extract trigger element from the host
        makeSiblings(this.host, this.triggerEl);
        // create spy to spy on host, inject spy into trigger element
        createSpy(this.host, this.triggerEl);
        // detach tooltip from original context
        appendToBody(this.host);
    }
    handleEvent(event, opened) {
        if (this.trigger !== event || this.opened === opened)
            return;
        this.opened = opened;
    }
    addEventListeners() {
        const { triggerEl, mouseEnterListener, mouseLeaveListener, clickListener } = this;
        triggerEl.addEventListener('mouseenter', mouseEnterListener);
        triggerEl.addEventListener('mouseleave', mouseLeaveListener);
        triggerEl.addEventListener('click', clickListener);
    }
    addIntersectionObserver() {
        const { triggerEl } = this;
        observeIntersection(triggerEl, (entries) => {
            if (!this.opened)
                return;
            if (entries[0].isIntersecting === true) {
                this.tooltipEl.classList.add('show');
                this.updatePosition();
            }
            else {
                this.tooltipEl.classList.remove('show');
            }
        }, { threshold: [0] });
    }
    componentDidUnload() {
        const { animationFrameRunner, triggerEl, mouseEnterListener, mouseLeaveListener, clickListener, } = this;
        animationFrameRunner.stop();
        triggerEl.removeEventListener('mouseenter', mouseEnterListener);
        triggerEl.removeEventListener('mouseleave', mouseLeaveListener);
        triggerEl.removeEventListener('click', clickListener);
    }
    render() {
        const { header, text, type, width, spaces, trigger, opened } = this;
        const triggerClasses = {
            'tooltip-trigger': true,
            [`tooltip-trigger-${trigger}`]: true,
            'tooltip-opened': !!opened,
        };
        const classes = {
            'tooltip-content': true,
            [`tooltip-content-wide`]: width === 'wide',
            [`tooltip-content-${type}`]: true,
            [`tooltip-content-${spaces.vertical}-${spaces.horizontal}`]: true,
        };
        const tooltipHeader = header ? h("h6", { class: "tooltip-header" }, header) : null;
        const tooltipText = text ? h("div", { class: "tooltip-text" }, text) : null;
        return (h("div", null,
            h("div", { class: triggerClasses },
                h("slot", null)),
            h("div", { class: "tooltip-wrapper" },
                h("div", { class: classes },
                    h("span", { class: "arrow-mask" },
                        h("span", { class: "arrow-pointer" })),
                    h("div", { class: "tooltip-content-inner-wrapper" },
                        tooltipHeader,
                        h("slot", { name: "content" }, tooltipText))))));
    }
    static get is() { return "wf-tooltip"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/tooltip/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/tooltip/main.css"]
    }; }
    static get properties() { return {
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
                "text": "The title of the tooltip"
            },
            "attribute": "header",
            "reflect": false
        },
        "text": {
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
                "text": "The text of the tooltip"
            },
            "attribute": "text",
            "reflect": false
        },
        "placement": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "TooltipPlacement",
                "resolved": "\"bottom\" | \"left\" | \"right\" | \"top\"",
                "references": {
                    "TooltipPlacement": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Placement of tooltip, if not defined it will be auto-calculated"
            },
            "attribute": "placement",
            "reflect": false
        },
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "TooltipType",
                "resolved": "\"default\" | \"error\" | \"feedback\" | \"info\" | \"warning\"",
                "references": {
                    "TooltipType": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Type of tooltip"
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "'default'"
        },
        "trigger": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "TooltipEvent",
                "resolved": "\"click\" | \"hover\" | \"none\"",
                "references": {
                    "TooltipEvent": {
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
            "defaultValue": "'hover'"
        },
        "timeout": {
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
                "text": "Tooltip visibility period"
            },
            "attribute": "timeout",
            "reflect": false,
            "defaultValue": "defaultTimeout"
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
                "text": "Controls the 'visible' state of the tooltip"
            },
            "attribute": "opened",
            "reflect": false,
            "defaultValue": "false"
        },
        "width": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "TooltipWidth",
                "resolved": "\"standard\" | \"wide\"",
                "references": {
                    "TooltipWidth": {
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
            "reflect": false,
            "defaultValue": "'standard'"
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
        "spaces": {}
    }; }
    static get events() { return [{
            "method": "docClose",
            "name": "close",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when tooltip is closed"
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
                "text": "Emitted when tooltip is closed"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "opened",
            "methodName": "openHandle"
        }, {
            "propName": "placement",
            "methodName": "placementHandle"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "clickOutside",
            "target": "window",
            "capture": false,
            "passive": false
        }]; }
}
__decorate([
    PrefixEvent()
], WfTooltip.prototype, "close", void 0);
