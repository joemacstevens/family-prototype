import { r as registerInstance, c as createEvent, h, g as getElement } from './core-2ee2b62e.js';
import './_commonjsHelpers-97e6d7b1.js';
import { h as setPX } from './utils-9974937e.js';
import { P as PrefixEvent } from './custom-event-emitter-d3f4fc52.js';
import { o as observeIntersection } from './observe-intersection-68666023.js';
import { h as checkElementPosition, e as errorMessages, q as queryShadowRoot, m as makeSiblings, d as createSpy, f as appendToBody } from './error-messages-47c90ef9.js';

const WfSpy = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /**
     * Target to be disposed when spy is removed from DOM
     */
    componentDidUnload() {
        if (!this.target) {
            return;
        }
        this.target.remove();
    }
};

const defaultTimeout = 0;
const defaultDistance = 10;
const defaultScreenGrid = { columns: 3, rows: 3 };

const createAnimationFrameRunner = (callback) => {
    let requestId;
    const wrapper = () => {
        callback();
        requestId = window.requestAnimationFrame(wrapper);
    };
    return {
        start: () => {
            requestId = window.requestAnimationFrame(wrapper);
        },
        stop: () => {
            requestId && window.cancelAnimationFrame(requestId);
        },
    };
};

const createTimeout = () => {
    let id;
    return {
        set: (handler, timeout, ...args) => {
            id = window.setTimeout(handler, timeout, ...args);
        },
        clear: () => {
            id && window.clearTimeout(id);
        },
    };
};

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
const WfTooltip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this.docClose = createEvent(this, "close", 7);
        this.docWfClose = createEvent(this, "wfClose", 7);
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
        return (h("div", null, h("div", { class: triggerClasses }, h("slot", null)), h("div", { class: "tooltip-wrapper" }, h("div", { class: classes }, h("span", { class: "arrow-mask" }, h("span", { class: "arrow-pointer" })), h("div", { class: "tooltip-content-inner-wrapper" }, tooltipHeader, h("slot", { name: "content" }, tooltipText))))));
    }
    get host() { return getElement(this); }
    static get watchers() { return {
        "opened": ["openHandle"],
        "placement": ["placementHandle"]
    }; }
    static get style() { return ":host{display:inline-block;position:relative}.tooltip-wrapper{position:fixed;display:none;opacity:0;visibility:hidden;z-index:var(--tooltip-z-index,9999);padding:var(--tooltip-distance,12px);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:opacity linear var(--tooltip-animate-delay,.15s),visibility linear var(--tooltip-animate-delay,.15s);transition:opacity linear var(--tooltip-animate-delay,.15s),visibility linear var(--tooltip-animate-delay,.15s);top:0;left:0;white-space:normal;word-break:break-word}.tooltip-wrapper.show{display:block;opacity:1;visibility:visible}.tooltip-content{position:relative;display:-ms-flexbox;display:flex;width:var(--tooltip-width,auto);max-width:var(--tooltip-max-width,220px);border-radius:var(--tooltip-border-radius,0);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:var(--tooltip-shadow,1px 1px 2px 1px) var(--tooltip-shadow-color,rgba(0,0,0,.25));box-shadow:var(--tooltip-shadow,1px 1px 2px 1px) var(--tooltip-shadow-color,rgba(0,0,0,.25));white-space:normal;font-size:var(--tooltip-font-size);font-family:var(--tooltip-font-family);font-weight:var(--tooltip-font-weight);line-height:var(--tooltip-line-height);text-align:left}.tooltip-content .tooltip-header{font:inherit;font-family:var(--tooltip-header-font-family,var(--headline-font-family,var(--font-family)));font-weight:var(--tooltip-header-font-weight,var(--headline-font-weight,var(--font-weight-bold,var(--font-weight,normal))));font-size:var(--tooltip-header-font-size,var(--tooltip-font-size));margin:0 0 var(--tooltip-header-margin-bottom,var(--spacing-xs,12px)) 0}.tooltip-content-wide{max-width:var(--tooltip-wide-max-width,300px)}.tooltip-content-inner-wrapper{padding:var(--tooltip-padding,var(--spacing-xs,12px));position:relative;-ms-flex-item-align:stretch;align-self:stretch;width:100%}.tooltip-content .arrow-mask{display:block;position:absolute;height:var(--tooltip-arrow-size,4px);width:var(--tooltip-arrow-size,4px)}.tooltip-content .arrow-mask .arrow-pointer{position:absolute;left:auto;top:auto;width:calc(var(--tooltip-arrow-size, 4px) * 1.41);height:calc(var(--tooltip-arrow-size, 4px) * 1.41);-webkit-box-shadow:var(--tooltip-shadow,1px 1px 2px 1px) var(--tooltip-shadow-color,rgba(0,0,0,.25));box-shadow:var(--tooltip-shadow,1px 1px 2px 1px) var(--tooltip-shadow-color,rgba(0,0,0,.25));-webkit-transform:rotate(45deg);transform:rotate(45deg)}.tooltip-content-default{color:var(--tooltip-color);border-color:var(--tooltip-background-color,#fff)}.tooltip-content-default,.tooltip-content-default .arrow-mask .arrow-pointer,.tooltip-content-default .tooltip-content-inner-wrapper{background-color:var(--tooltip-background-color,#fff)}.tooltip-content-info{color:var(--tooltip-info-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));border-color:var(--tooltip-info-background-color,#2191cb)}.tooltip-content-info,.tooltip-content-info .arrow-mask .arrow-pointer,.tooltip-content-info .tooltip-content-inner-wrapper{background-color:var(--tooltip-info-background-color,#2191cb)}.tooltip-content-warning{color:var(--tooltip-warning-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));border-color:var(--tooltip-warning-background-color,#f7e1df)}.tooltip-content-warning,.tooltip-content-warning .arrow-mask .arrow-pointer,.tooltip-content-warning .tooltip-content-inner-wrapper{background-color:var(--tooltip-warning-background-color,#f7e1df)}.tooltip-content-error{color:var(--tooltip-error-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));border-color:var(--tooltip-error-background-color,#f7e1df)}.tooltip-content-error,.tooltip-content-error .arrow-mask .arrow-pointer,.tooltip-content-error .tooltip-content-inner-wrapper{background-color:var(--tooltip-error-background-color,#f7e1df)}.tooltip-content-feedback{color:var(--tooltip-feedback-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));border-color:var(--tooltip-feedback-background-color,#444)}.tooltip-content-feedback,.tooltip-content-feedback .arrow-mask .arrow-pointer,.tooltip-content-feedback .tooltip-content-inner-wrapper{background-color:var(--tooltip-feedback-background-color,#444)}.tooltip-content-top-left .arrow-mask{bottom:100%;left:0;width:100%}.tooltip-content-top-left .arrow-mask .arrow-pointer{bottom:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);left:calc(calc(var(--tooltip-arrow-size, 4px) * 1.41))}.tooltip-content-top-center .arrow-mask{bottom:100%;left:0;width:100%}.tooltip-content-top-center .arrow-mask .arrow-pointer{bottom:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);left:calc(50% - calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2)}.tooltip-content-top-right .arrow-mask{bottom:100%;right:0;width:100%}.tooltip-content-top-right .arrow-mask .arrow-pointer{bottom:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);right:calc(calc(var(--tooltip-arrow-size, 4px) * 1.41))}.tooltip-content-middle-left .arrow-mask{right:100%;top:0;height:100%}.tooltip-content-middle-left .arrow-mask .arrow-pointer{right:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);top:calc(50% - calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2)}.tooltip-content-middle-right .arrow-mask{left:100%;top:0;height:100%}.tooltip-content-middle-right .arrow-mask .arrow-pointer{left:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);top:calc(50% - calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2)}.tooltip-content-bottom-left .arrow-mask{top:100%;left:0;width:100%}.tooltip-content-bottom-left .arrow-mask .arrow-pointer{top:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);left:calc(calc(var(--tooltip-arrow-size, 4px) * 1.41))}.tooltip-content-bottom-center .arrow-mask{top:100%;left:0;width:100%}.tooltip-content-bottom-center .arrow-mask .arrow-pointer{top:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);left:calc(50% - calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2)}.tooltip-content-bottom-right .arrow-mask{top:100%;right:0;width:100%}.tooltip-content-bottom-right .arrow-mask .arrow-pointer{top:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);right:calc(calc(var(--tooltip-arrow-size, 4px) * 1.41))}"; }
};
__decorate([
    PrefixEvent()
], WfTooltip.prototype, "close", void 0);

export { WfSpy as wf_spy, WfTooltip as wf_tooltip };
