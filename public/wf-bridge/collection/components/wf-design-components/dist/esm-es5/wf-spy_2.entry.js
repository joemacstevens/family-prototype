var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, c as createEvent, h, g as getElement } from './core-2ee2b62e.js';
import './_commonjsHelpers-97e6d7b1.js';
import { h as setPX } from './utils-9974937e.js';
import { P as PrefixEvent } from './custom-event-emitter-d3f4fc52.js';
import { o as observeIntersection } from './observe-intersection-68666023.js';
import { h as checkElementPosition, e as errorMessages, q as queryShadowRoot, m as makeSiblings, d as createSpy, f as appendToBody } from './error-messages-47c90ef9.js';
var WfSpy = /** @class */ (function () {
    function WfSpy(hostRef) {
        registerInstance(this, hostRef);
    }
    /**
     * Target to be disposed when spy is removed from DOM
     */
    WfSpy.prototype.componentDidUnload = function () {
        if (!this.target) {
            return;
        }
        this.target.remove();
    };
    return WfSpy;
}());
var defaultTimeout = 0;
var defaultDistance = 10;
var defaultScreenGrid = { columns: 3, rows: 3 };
var createAnimationFrameRunner = function (callback) {
    var requestId;
    var wrapper = function () {
        callback();
        requestId = window.requestAnimationFrame(wrapper);
    };
    return {
        start: function () {
            requestId = window.requestAnimationFrame(wrapper);
        },
        stop: function () {
            requestId && window.cancelAnimationFrame(requestId);
        },
    };
};
var createTimeout = function () {
    var id;
    return {
        set: function (handler, timeout) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            id = window.setTimeout.apply(window, __spreadArrays([handler, timeout], args));
        },
        clear: function () {
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
var WfTooltip = /** @class */ (function () {
    function WfTooltip(hostRef) {
        var _this = this;
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
        this.updatePosition = function () {
            var _a = _this, opened = _a.opened, triggerEl = _a.triggerEl, tooltipEl = _a.tooltipEl, distance = _a.distance;
            if (!opened || !tooltipEl.classList.contains('show'))
                return;
            var newPlacement = checkElementPosition(triggerEl, tooltipEl, defaultScreenGrid, distance, _this.getDefaultSpaces());
            _this.tryAdjustSpaces(newPlacement.spaces);
            tooltipEl.style.top = setPX(newPlacement.placement.top);
            tooltipEl.style.left = setPX(newPlacement.placement.left);
            // this is to resolve Chrome loosing frames when smooth scrolling is disabled
            tooltipEl.style.willChange = 'top, left';
        };
        this.mouseEnterListener = function () { return _this.handleEvent('hover', true); };
        this.mouseLeaveListener = function () { return _this.handleEvent('hover', false); };
        this.clickListener = function () { return _this.handleEvent('click', !_this.opened); };
        this.docClose = createEvent(this, "close", 7);
        this.docWfClose = createEvent(this, "wfClose", 7);
    }
    WfTooltip.prototype.openHandle = function (newValue, oldValue) {
        if (newValue !== oldValue) {
            this.toggleTooltip(newValue);
        }
    };
    WfTooltip.prototype.toggleTooltip = function (opened) {
        if (!opened) {
            this.hide();
            return;
        }
        this.show();
        if (this.timeout > 0)
            this.setupTimeout(this.timeout);
    };
    WfTooltip.prototype.toggleTriggerActiveClass = function (toggle) {
        var cls = 'trigger-active';
        var assignedElements = this.getElementsFromSlot();
        for (var _i = 0, assignedElements_1 = assignedElements; _i < assignedElements_1.length; _i++) {
            var el = assignedElements_1[_i];
            toggle ? el.classList.add(cls) : el.classList.remove(cls);
        }
    };
    WfTooltip.prototype.show = function () {
        var tooltipEl = this.tooltipEl;
        tooltipEl.classList.add('show');
        this.toggleTriggerActiveClass(true);
        this.closeTimeout.clear();
        this.animationFrameRunner.start();
    };
    WfTooltip.prototype.hide = function () {
        var tooltipEl = this.tooltipEl;
        tooltipEl.classList.remove('show');
        this.opened = false;
        this.close.emit();
        this.toggleTriggerActiveClass(false);
        this.animationFrameRunner.stop();
    };
    WfTooltip.prototype.setupTimeout = function (timeout) {
        var _this = this;
        this.closeTimeout.clear();
        this.closeTimeout.set(function () {
            _this.hide();
        }, timeout);
    };
    WfTooltip.prototype.clickOutside = function (event) {
        if (!this.opened || this.trigger !== 'click')
            return;
        var clickPath = [];
        if (event.composedPath)
            clickPath = event.composedPath();
        var triggers = [this.host, this.tooltipEl, this.triggerEl];
        if (!clickPath.some(function (trigger) { return triggers.includes(trigger); }))
            this.hide();
    };
    WfTooltip.prototype.placementHandle = function (newValue, oldValue) {
        if (newValue !== oldValue) {
            this.updateSpaces(newValue);
        }
    };
    WfTooltip.prototype.updateSpaces = function (placement) {
        var placementsMap = {
            top: { vertical: 'bottom', horizontal: 'center' },
            bottom: { vertical: 'top', horizontal: 'center' },
            left: { vertical: 'middle', horizontal: 'right' },
            right: { vertical: 'middle', horizontal: 'left' },
        };
        this.spaces = placementsMap[placement];
    };
    WfTooltip.prototype.componentWillLoad = function () {
        var _a = this, updatePosition = _a.updatePosition, placement = _a.placement;
        this.animationFrameRunner = createAnimationFrameRunner(updatePosition);
        if (!!placement) {
            this.updateSpaces(placement);
        }
    };
    WfTooltip.prototype.getDefaultSpaces = function () {
        var placement = this.placement;
        if (placement) {
            return this.spaces;
        }
    };
    WfTooltip.prototype.tryAdjustSpaces = function (newSpaces) {
        var spaces = this.spaces;
        if (spaces.horizontal === newSpaces.horizontal && spaces.vertical === newSpaces.vertical) {
            return;
        }
        this.spaces = newSpaces;
    };
    WfTooltip.prototype.componentDidLoad = function () {
        var opened = this.opened;
        this.setupTriggerElement();
        this.tooltipEl = this.host.shadowRoot.querySelector('.tooltip-wrapper');
        if (window.getComputedStyle(this.tooltipEl).paddingTop) {
            this.distance = parseInt(window.getComputedStyle(this.tooltipEl).paddingTop, 10);
        }
        if (opened) {
            this.toggleTooltip(true);
            this.animationFrameRunner.start();
        }
    };
    WfTooltip.prototype.setupTriggerElement = function () {
        if (this.detached) {
            var assignedElements = this.getElementsFromSlot();
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
    };
    WfTooltip.prototype.getElementsFromSlot = function () {
        var slotEl = queryShadowRoot(this.host, '.tooltip-trigger>>slot');
        return slotEl ? slotEl.assignedElements() : [];
    };
    WfTooltip.prototype.detachHost = function () {
        // extract trigger element from the host
        makeSiblings(this.host, this.triggerEl);
        // create spy to spy on host, inject spy into trigger element
        createSpy(this.host, this.triggerEl);
        // detach tooltip from original context
        appendToBody(this.host);
    };
    WfTooltip.prototype.handleEvent = function (event, opened) {
        if (this.trigger !== event || this.opened === opened)
            return;
        this.opened = opened;
    };
    WfTooltip.prototype.addEventListeners = function () {
        var _a = this, triggerEl = _a.triggerEl, mouseEnterListener = _a.mouseEnterListener, mouseLeaveListener = _a.mouseLeaveListener, clickListener = _a.clickListener;
        triggerEl.addEventListener('mouseenter', mouseEnterListener);
        triggerEl.addEventListener('mouseleave', mouseLeaveListener);
        triggerEl.addEventListener('click', clickListener);
    };
    WfTooltip.prototype.addIntersectionObserver = function () {
        var _this = this;
        var triggerEl = this.triggerEl;
        observeIntersection(triggerEl, function (entries) {
            if (!_this.opened)
                return;
            if (entries[0].isIntersecting === true) {
                _this.tooltipEl.classList.add('show');
                _this.updatePosition();
            }
            else {
                _this.tooltipEl.classList.remove('show');
            }
        }, { threshold: [0] });
    };
    WfTooltip.prototype.componentDidUnload = function () {
        var _a = this, animationFrameRunner = _a.animationFrameRunner, triggerEl = _a.triggerEl, mouseEnterListener = _a.mouseEnterListener, mouseLeaveListener = _a.mouseLeaveListener, clickListener = _a.clickListener;
        animationFrameRunner.stop();
        triggerEl.removeEventListener('mouseenter', mouseEnterListener);
        triggerEl.removeEventListener('mouseleave', mouseLeaveListener);
        triggerEl.removeEventListener('click', clickListener);
    };
    WfTooltip.prototype.render = function () {
        var _a, _b;
        var _c = this, header = _c.header, text = _c.text, type = _c.type, width = _c.width, spaces = _c.spaces, trigger = _c.trigger, opened = _c.opened;
        var triggerClasses = (_a = {
                'tooltip-trigger': true
            },
            _a["tooltip-trigger-" + trigger] = true,
            _a['tooltip-opened'] = !!opened,
            _a);
        var classes = (_b = {
                'tooltip-content': true
            },
            _b["tooltip-content-wide"] = width === 'wide',
            _b["tooltip-content-" + type] = true,
            _b["tooltip-content-" + spaces.vertical + "-" + spaces.horizontal] = true,
            _b);
        var tooltipHeader = header ? h("h6", { class: "tooltip-header" }, header) : null;
        var tooltipText = text ? h("div", { class: "tooltip-text" }, text) : null;
        return (h("div", null, h("div", { class: triggerClasses }, h("slot", null)), h("div", { class: "tooltip-wrapper" }, h("div", { class: classes }, h("span", { class: "arrow-mask" }, h("span", { class: "arrow-pointer" })), h("div", { class: "tooltip-content-inner-wrapper" }, tooltipHeader, h("slot", { name: "content" }, tooltipText))))));
    };
    Object.defineProperty(WfTooltip.prototype, "host", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WfTooltip, "watchers", {
        get: function () {
            return {
                "opened": ["openHandle"],
                "placement": ["placementHandle"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WfTooltip, "style", {
        get: function () { return ":host{display:inline-block;position:relative}.tooltip-wrapper{position:fixed;display:none;opacity:0;visibility:hidden;z-index:var(--tooltip-z-index,9999);padding:var(--tooltip-distance,12px);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:opacity linear var(--tooltip-animate-delay,.15s),visibility linear var(--tooltip-animate-delay,.15s);transition:opacity linear var(--tooltip-animate-delay,.15s),visibility linear var(--tooltip-animate-delay,.15s);top:0;left:0;white-space:normal;word-break:break-word}.tooltip-wrapper.show{display:block;opacity:1;visibility:visible}.tooltip-content{position:relative;display:-ms-flexbox;display:flex;width:var(--tooltip-width,auto);max-width:var(--tooltip-max-width,220px);border-radius:var(--tooltip-border-radius,0);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:var(--tooltip-shadow,1px 1px 2px 1px) var(--tooltip-shadow-color,rgba(0,0,0,.25));box-shadow:var(--tooltip-shadow,1px 1px 2px 1px) var(--tooltip-shadow-color,rgba(0,0,0,.25));white-space:normal;font-size:var(--tooltip-font-size);font-family:var(--tooltip-font-family);font-weight:var(--tooltip-font-weight);line-height:var(--tooltip-line-height);text-align:left}.tooltip-content .tooltip-header{font:inherit;font-family:var(--tooltip-header-font-family,var(--headline-font-family,var(--font-family)));font-weight:var(--tooltip-header-font-weight,var(--headline-font-weight,var(--font-weight-bold,var(--font-weight,normal))));font-size:var(--tooltip-header-font-size,var(--tooltip-font-size));margin:0 0 var(--tooltip-header-margin-bottom,var(--spacing-xs,12px)) 0}.tooltip-content-wide{max-width:var(--tooltip-wide-max-width,300px)}.tooltip-content-inner-wrapper{padding:var(--tooltip-padding,var(--spacing-xs,12px));position:relative;-ms-flex-item-align:stretch;align-self:stretch;width:100%}.tooltip-content .arrow-mask{display:block;position:absolute;height:var(--tooltip-arrow-size,4px);width:var(--tooltip-arrow-size,4px)}.tooltip-content .arrow-mask .arrow-pointer{position:absolute;left:auto;top:auto;width:calc(var(--tooltip-arrow-size, 4px) * 1.41);height:calc(var(--tooltip-arrow-size, 4px) * 1.41);-webkit-box-shadow:var(--tooltip-shadow,1px 1px 2px 1px) var(--tooltip-shadow-color,rgba(0,0,0,.25));box-shadow:var(--tooltip-shadow,1px 1px 2px 1px) var(--tooltip-shadow-color,rgba(0,0,0,.25));-webkit-transform:rotate(45deg);transform:rotate(45deg)}.tooltip-content-default{color:var(--tooltip-color);border-color:var(--tooltip-background-color,#fff)}.tooltip-content-default,.tooltip-content-default .arrow-mask .arrow-pointer,.tooltip-content-default .tooltip-content-inner-wrapper{background-color:var(--tooltip-background-color,#fff)}.tooltip-content-info{color:var(--tooltip-info-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));border-color:var(--tooltip-info-background-color,#2191cb)}.tooltip-content-info,.tooltip-content-info .arrow-mask .arrow-pointer,.tooltip-content-info .tooltip-content-inner-wrapper{background-color:var(--tooltip-info-background-color,#2191cb)}.tooltip-content-warning{color:var(--tooltip-warning-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));border-color:var(--tooltip-warning-background-color,#f7e1df)}.tooltip-content-warning,.tooltip-content-warning .arrow-mask .arrow-pointer,.tooltip-content-warning .tooltip-content-inner-wrapper{background-color:var(--tooltip-warning-background-color,#f7e1df)}.tooltip-content-error{color:var(--tooltip-error-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));border-color:var(--tooltip-error-background-color,#f7e1df)}.tooltip-content-error,.tooltip-content-error .arrow-mask .arrow-pointer,.tooltip-content-error .tooltip-content-inner-wrapper{background-color:var(--tooltip-error-background-color,#f7e1df)}.tooltip-content-feedback{color:var(--tooltip-feedback-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));border-color:var(--tooltip-feedback-background-color,#444)}.tooltip-content-feedback,.tooltip-content-feedback .arrow-mask .arrow-pointer,.tooltip-content-feedback .tooltip-content-inner-wrapper{background-color:var(--tooltip-feedback-background-color,#444)}.tooltip-content-top-left .arrow-mask{bottom:100%;left:0;width:100%}.tooltip-content-top-left .arrow-mask .arrow-pointer{bottom:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);left:calc(calc(var(--tooltip-arrow-size, 4px) * 1.41))}.tooltip-content-top-center .arrow-mask{bottom:100%;left:0;width:100%}.tooltip-content-top-center .arrow-mask .arrow-pointer{bottom:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);left:calc(50% - calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2)}.tooltip-content-top-right .arrow-mask{bottom:100%;right:0;width:100%}.tooltip-content-top-right .arrow-mask .arrow-pointer{bottom:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);right:calc(calc(var(--tooltip-arrow-size, 4px) * 1.41))}.tooltip-content-middle-left .arrow-mask{right:100%;top:0;height:100%}.tooltip-content-middle-left .arrow-mask .arrow-pointer{right:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);top:calc(50% - calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2)}.tooltip-content-middle-right .arrow-mask{left:100%;top:0;height:100%}.tooltip-content-middle-right .arrow-mask .arrow-pointer{left:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);top:calc(50% - calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2)}.tooltip-content-bottom-left .arrow-mask{top:100%;left:0;width:100%}.tooltip-content-bottom-left .arrow-mask .arrow-pointer{top:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);left:calc(calc(var(--tooltip-arrow-size, 4px) * 1.41))}.tooltip-content-bottom-center .arrow-mask{top:100%;left:0;width:100%}.tooltip-content-bottom-center .arrow-mask .arrow-pointer{top:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);left:calc(50% - calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2)}.tooltip-content-bottom-right .arrow-mask{top:100%;right:0;width:100%}.tooltip-content-bottom-right .arrow-mask .arrow-pointer{top:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);right:calc(calc(var(--tooltip-arrow-size, 4px) * 1.41))}"; },
        enumerable: true,
        configurable: true
    });
    return WfTooltip;
}());
__decorate([
    PrefixEvent()
], WfTooltip.prototype, "close", void 0);
export { WfSpy as wf_spy, WfTooltip as wf_tooltip };
