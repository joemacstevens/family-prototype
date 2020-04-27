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
import { g as getElementsFromSlot, a as arrowCoordinate, c as checkParentElementPosition, b as checkChildElementPosition, e as errorMessages, m as makeSiblings, d as createSpy, f as appendToBody } from './error-messages-47c90ef9.js';
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
var WfFlyout = /** @class */ (function () {
    function WfFlyout(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
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
        this.handleClick = function (event) {
            var _a = _this, trigger = _a.trigger, opened = _a.opened;
            if (trigger === 'none' || (trigger !== 'click' && event.detail === 1))
                return; // event.detail = 0 means it was really a keyboard event
            if (event.detail === 0)
                _this.focusFirstChild = true;
            event.preventDefault();
            opened ? _this.closeFlyout('MOUSE_CLICK') : _this.openFlyout('MOUSE_CLICK');
        };
        this.handleMouseEnter = function () {
            if (_this.trigger !== 'hover' || _this.opened)
                return;
            _this.openFlyout('MOUSE_ENTER');
        };
        this.handleMouseLeave = function () {
            if (_this.trigger !== 'hover' || !_this.opened)
                return;
            _this.closeFlyout('MOUSE_LEAVE', true);
        };
        this.keyPressCases = function (event, triggerTarget, currentItemIndex) { return ({
            Enter: function () {
                if (triggerTarget) {
                    event.stopPropagation();
                    _this.focusFirstChild = true;
                    _this.opened ? _this.closeFlyout('ENTER_KEY') : _this.openFlyout('ENTER_KEY');
                }
            },
            ArrowDown: function () {
                if (triggerTarget) {
                    event.preventDefault();
                    _this.focusFirstChild = true;
                    _this.openFlyout('ARROW_DOWN');
                }
                if (currentItemIndex !== -1) {
                    event.preventDefault();
                    _this.focusNextItem(currentItemIndex);
                }
            },
            ArrowUp: function () {
                if (currentItemIndex !== -1) {
                    event.preventDefault();
                    _this.focusPrevItem(currentItemIndex);
                }
            },
            Tab: function () {
                if (currentItemIndex !== -1) {
                    event.preventDefault();
                    _this.focusNextItem(currentItemIndex);
                }
            },
            Escape: function () {
                if (_this.opened)
                    event.stopPropagation();
                _this.closeFlyout('ESC_KEY');
            },
        }[event.key]); };
        this.spacesValidity = function (params) {
            return {
                vertical: params.vertical ? params.vertical : _this.spaces.vertical,
                horizontal: params.horizontal ? params.horizontal : _this.spaces.horizontal,
            };
        };
        this.flyoutOpenChanged = createEvent(this, "flyoutOpenChanged", 7);
        this.docOpen = createEvent(this, "open", 7);
        this.docWfOpen = createEvent(this, "wfOpen", 7);
        this.docClose = createEvent(this, "close", 7);
        this.docWfClose = createEvent(this, "wfClose", 7);
    }
    WfFlyout.prototype.componentWillLoad = function () {
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.focusableElementsSelector = "button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"]), [" + this.focusAttribute + "]";
        this.focusableElements = [];
        this.slotElement = this.host.querySelector('[slot=trigger]');
        if (!!this.placement) {
            this.spaces = this.updateSpaces(this.placement);
        }
    };
    WfFlyout.prototype.emitOpenChanged = function () {
        if (this.enableOpenChangedEvent) {
            this.flyoutOpenChanged.emit(this.opened);
        }
        if (this.slotElement) {
            Array.from(this.slotElement.children).forEach(function (child) { return child.classList.toggle('trigger-active'); });
        }
    };
    WfFlyout.prototype.searchFocusableInComponent = function (focusableElement, selector) {
        return focusableElement.shadowRoot.querySelector(selector) || focusableElement;
    };
    WfFlyout.prototype.queryShadowRoot = function (element, selector) {
        return element.shadowRoot.querySelector(selector);
    };
    WfFlyout.prototype.getAllFocusableItems = function () {
        var _this = this;
        var flyoutContentElements = getElementsFromSlot(this.host, '.flyout-content slot');
        var foundFocusableElements = [];
        flyoutContentElements.forEach(function (element) {
            var elements = Array.from(element.querySelectorAll(_this.focusableElementsSelector)).filter(function (el) { return el.offsetWidth; });
            foundFocusableElements = __spreadArrays(foundFocusableElements, elements);
        });
        return foundFocusableElements;
    };
    WfFlyout.prototype.setFocusToChild = function () {
        var firstFocusableElement;
        this.focusableElements = this.getAllFocusableItems();
        firstFocusableElement = this.focusableElements[0];
        if (!firstFocusableElement)
            return;
        if (firstFocusableElement.classList.contains('hydrated')) {
            var focusableInComponent = this.searchFocusableInComponent(firstFocusableElement, this.focusableElementsSelector);
            firstFocusableElement = focusableInComponent;
        }
        firstFocusableElement.focus();
    };
    WfFlyout.prototype.closeFlyout = function (reason, notFocus) {
        if (notFocus === void 0) { notFocus = false; }
        this.opened = false;
        this.close.emit(reason);
        if (notFocus)
            return;
        var elementToFocus;
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
    };
    WfFlyout.prototype.openFlyout = function (reason) {
        this.opened = true;
        this.open.emit(reason);
    };
    WfFlyout.prototype.focusPrevItem = function (currentItemIndex) {
        var newIndex = currentItemIndex <= 0 ? this.focusableElements.length - 1 : currentItemIndex - 1;
        this.focusableElements[newIndex].focus();
    };
    WfFlyout.prototype.focusNextItem = function (currentItemIndex) {
        var newIndex = currentItemIndex >= this.focusableElements.length - 1 ? 0 : currentItemIndex + 1;
        this.focusableElements[newIndex].focus();
    };
    WfFlyout.prototype.searchForFocusableItem = function (target) {
        return this.focusableElements.indexOf(target);
    };
    WfFlyout.prototype.handleKeyPress = function (event) {
        var target = event.path[0];
        var currentItemIndex = this.searchForFocusableItem(target);
        var triggerTarget = target.classList.contains('flyout-trigger');
        var availableEvents = ['Enter', 'ArrowDown', 'ArrowUp', 'Tab', 'Escape'];
        if (availableEvents.includes(event.key) && this.trigger !== 'none') {
            this.keyPressCases(event, triggerTarget, currentItemIndex)();
        }
    };
    WfFlyout.prototype.clickOutside = function (event) {
        if (!this.opened || this.trigger !== 'click')
            return;
        var clickPath = [];
        if (event.composedPath)
            clickPath = event.composedPath();
        var triggers = [this.host, this.triggerEl];
        if (!clickPath.some(function (trigger) { return triggers.includes(trigger); }))
            this.closeFlyout('OUTSIDE_CLICK');
    };
    WfFlyout.prototype.applyStyles = function (arrow, _a) {
        var top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left;
        var style = arrow.style;
        top ? (style.top = top) : style.removeProperty('top');
        right ? (style.right = right) : style.removeProperty('right');
        bottom ? (style.bottom = bottom) : style.removeProperty('bottom');
        left ? (style.left = left) : style.removeProperty('left');
    };
    WfFlyout.prototype.calculateArrowPointer = function (spaces) {
        var _a = this, triggerEl = _a.triggerEl, flyoutElement = _a.flyoutElement, applyStyles = _a.applyStyles;
        var arrow = flyoutElement.querySelector('.arrow-pointer');
        var arrowSize = arrow.getBoundingClientRect().width;
        var coordinate = arrowCoordinate(spaces.vertical + "-" + spaces.horizontal, triggerEl, arrowSize);
        applyStyles(arrow, coordinate);
    };
    WfFlyout.prototype.updateSpaces = function (placement) {
        var placementsMap = {
            top: { vertical: 'bottom', horizontal: 'center' },
            bottom: { vertical: 'top', horizontal: 'center' },
            left: { vertical: 'middle', horizontal: 'right' },
            right: { vertical: 'middle', horizontal: 'left' },
        };
        return placementsMap[placement];
    };
    WfFlyout.prototype.updatePosition = function () {
        var _a = this, opened = _a.opened, triggerEl = _a.triggerEl, flyoutElement = _a.flyoutElement, screenGrid = _a.screenGrid, level = _a.level, overlap = _a.overlap, noArrow = _a.noArrow, arrowPointer = _a.arrowPointer, spacesValidity = _a.spacesValidity;
        if (!opened || !triggerEl || !flyoutElement)
            return;
        var defaultSpaces;
        if (!!this.placement) {
            defaultSpaces = this.updateSpaces(this.placement);
        }
        var newPlacement = level === 1
            ? checkParentElementPosition(triggerEl, flyoutElement, screenGrid, defaultSpaces)
            : checkChildElementPosition(triggerEl, flyoutElement, overlap, defaultSpaces);
        var placement = newPlacement.placement, spaces = newPlacement.spaces;
        flyoutElement.style.top = setPX(placement.top);
        flyoutElement.style.left = setPX(placement.left);
        if (!noArrow || !!arrowPointer) {
            var flyoutContent = flyoutElement.querySelector('.flyout-content');
            var oldClassName = "flyout-content-" + this.spaces.vertical + "-" + this.spaces.horizontal;
            var validSpaces = spacesValidity(spaces);
            var newClassName = "flyout-content-" + validSpaces.vertical + "-" + validSpaces.horizontal;
            if (oldClassName !== newClassName) {
                flyoutContent.classList.remove(oldClassName);
                flyoutContent.classList.add(newClassName);
            }
            this.calculateArrowPointer(validSpaces);
            this.spaces = validSpaces;
        }
        requestAnimationFrame(this.updatePosition.bind(this));
    };
    WfFlyout.prototype.componentDidLoad = function () {
        this.setupTriggerElement();
        this.componentDidUpdate();
    };
    WfFlyout.prototype.componentDidUpdate = function () {
        var _a = this, host = _a.host, opened = _a.opened;
        this.flyoutElement = this.queryShadowRoot(host, '.flyout-content-wrapper');
        if (opened) {
            if (this.focusFirstChild) {
                this.focusFirstChild = false;
                this.setFocusToChild();
            }
            this.updatePosition();
        }
    };
    WfFlyout.prototype.setupTriggerElement = function () {
        if (this.detached) {
            var assignedElements = getElementsFromSlot(this.host, '.flyout-trigger slot');
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
    };
    WfFlyout.prototype.detachHost = function () {
        // extract trigger element from the host
        makeSiblings(this.host, this.triggerEl);
        // create spy to spy on host, inject spy into trigger element
        createSpy(this.host, this.triggerEl);
        // detach tooltip from original context
        appendToBody(this.host);
    };
    WfFlyout.prototype.addEventListeners = function () {
        var _a = this, triggerEl = _a.triggerEl, handleMouseEnter = _a.handleMouseEnter, handleMouseLeave = _a.handleMouseLeave, handleClick = _a.handleClick;
        triggerEl.addEventListener('mouseenter', handleMouseEnter);
        triggerEl.addEventListener('mouseleave', handleMouseLeave);
        triggerEl.addEventListener('click', handleClick);
    };
    WfFlyout.prototype.addIntersectionObserver = function () {
        var _this = this;
        var triggerEl = this.triggerEl;
        observeIntersection(triggerEl, function (entries) {
            if (!_this.opened)
                return;
            if (!entries[0].isIntersecting) {
                _this.visible = false;
                return;
            }
            _this.visible = true;
            _this.updatePosition();
        }, { threshold: [0] });
    };
    WfFlyout.prototype.componentDidUnload = function () {
        var _a = this, triggerEl = _a.triggerEl, handleMouseEnter = _a.handleMouseEnter, handleMouseLeave = _a.handleMouseLeave, handleClick = _a.handleClick;
        triggerEl.removeEventListener('mouseenter', handleMouseEnter);
        triggerEl.removeEventListener('mouseleave', handleMouseLeave);
        triggerEl.removeEventListener('click', handleClick);
    };
    WfFlyout.prototype.render = function () {
        var _a, _b, _c;
        var _d = this, arrowPointer = _d.arrowPointer, noArrow = _d.noArrow, spaces = _d.spaces, opened = _d.opened, visible = _d.visible, trigger = _d.trigger, triggerTabIndex = _d.triggerTabIndex, handleMouseEnter = _d.handleMouseEnter, handleMouseLeave = _d.handleMouseLeave;
        var triggerClasses = (_a = {},
            _a['flyout-trigger'] = true,
            _a['flyout-trigger-none'] = trigger === 'none',
            _a);
        var contentWrapperClasses = (_b = {},
            _b['flyout-content-wrapper'] = true,
            _b['no-arrow'] = !arrowPointer || !!noArrow,
            _b);
        var contentClasses = (_c = {},
            _c['flyout-content'] = true,
            _c["flyout-content-" + spaces.vertical + "-" + spaces.horizontal] = true,
            _c);
        return (h("div", { class: "flyout", onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }, h("div", { class: triggerClasses, tabindex: triggerTabIndex }, h("slot", { name: "trigger" })), opened && visible ? (h("div", { class: contentWrapperClasses }, h("div", { class: contentClasses }, h("span", { class: "arrow-mask" }, h("span", { class: "arrow-pointer" })), h("div", { class: "flyout-content-slot-wrapper" }, h("slot", null))))) : (h("div", null))));
    };
    Object.defineProperty(WfFlyout.prototype, "host", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WfFlyout, "watchers", {
        get: function () {
            return {
                "opened": ["emitOpenChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WfFlyout, "style", {
        get: function () { return ":host{display:inline-block}.flyout{position:relative;font-family:var(--flyout-font-family);color:var(--flyout-text-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))))}.flyout-trigger{cursor:pointer}.flyout-trigger-none{cursor:auto}.flyout-content{position:relative;background:var(--flyout-background,#fff);border-color:var(--flyout-background,#fff);-webkit-box-shadow:var(--flyout-box-shadow,var(--flyout-shadow,2px 4px 8px 0) var(--flyout-shadow-color,rgba(28,28,28,.5)));box-shadow:var(--flyout-box-shadow,var(--flyout-shadow,2px 4px 8px 0) var(--flyout-shadow-color,rgba(28,28,28,.5)));min-height:var(--flyout-min-height,200px);display:-ms-flexbox;display:flex}.flyout-content-wrapper{-webkit-box-sizing:border-box;box-sizing:border-box;position:fixed;z-index:var(--flyout-z-index,1000);top:100%;padding:calc(var(--flyout-distance, var(--spacing-xxs, 6px)) + var(--flyout-arrow-size, 8px));min-width:var(--flyout-min-width,180px);max-width:var(--flyout-max-width,70%);width:var(--flyout-width,auto);white-space:normal;word-break:break-word}.flyout-content-wrapper .arrow-mask{display:block;position:absolute;height:calc(var(--flyout-arrow-size, 8px) + var(--spacing-xxs, 6px));width:calc(var(--flyout-arrow-size, 8px) + var(--spacing-xxs, 6px))}.flyout-content-wrapper .arrow-mask .arrow-pointer{position:absolute;left:auto;top:auto;width:calc(var(--flyout-arrow-size, 8px) * 1.41);height:calc(var(--flyout-arrow-size, 8px) * 1.41);background:var(--flyout-background,#fff);-webkit-box-shadow:var(--flyout-shadow,2px 4px 8px 0) var(--flyout-shadow-color,rgba(28,28,28,.5));box-shadow:var(--flyout-shadow,2px 4px 8px 0) var(--flyout-shadow-color,rgba(28,28,28,.5));-webkit-transform:rotate(45deg);transform:rotate(45deg)}.flyout-content-wrapper.no-arrow{padding:var(--flyout-distance,var(--spacing-xxs,6px))}.flyout-content-wrapper.no-arrow .arrow-mask,.flyout-content-wrapper.no-arrow .arrow-pointer{display:none}.flyout-content-slot-wrapper{padding:var(--flyout-padding,var(--spacing-xxs,6px));background:var(--flyout-background,#fff);position:relative;-ms-flex-item-align:stretch;align-self:stretch;width:100%}.flyout-content-left-top .arrow-mask{right:100%;top:0;height:100%}.flyout-content-left-top .arrow-mask .arrow-pointer{right:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);top:unset}.flyout-content-left-bottom .arrow-mask{right:100%;bottom:0;height:100%}.flyout-content-left-bottom .arrow-mask .arrow-pointer{right:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);bottom:unset}.flyout-content-right-top .arrow-mask{left:100%;top:0;height:100%}.flyout-content-right-top .arrow-mask .arrow-pointer{left:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);top:unset}.flyout-content-right-bottom .arrow-mask{left:100%;bottom:0;height:100%}.flyout-content-right-bottom .arrow-mask .arrow-pointer{left:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);bottom:unset}.flyout-content-top-left .arrow-mask{bottom:100%;left:0;width:100%}.flyout-content-top-left .arrow-mask .arrow-pointer{bottom:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);left:var(--flyout-arrow-size,8px)}.flyout-content-top-center .arrow-mask{bottom:100%;left:0;width:100%}.flyout-content-top-center .arrow-mask .arrow-pointer{bottom:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);left:calc(50% - calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2)}.flyout-content-top-right .arrow-mask{bottom:100%;right:0;width:100%}.flyout-content-top-right .arrow-mask .arrow-pointer{bottom:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);right:var(--flyout-arrow-size,8px)}.flyout-content-middle-left .arrow-mask{top:100%;right:0;height:100%}.flyout-content-middle-left .arrow-mask .arrow-pointer{top:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);right:100%}.flyout-content-middle-right .arrow-mask{top:100%;left:0;height:100%}.flyout-content-middle-right .arrow-mask .arrow-pointer{top:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);left:100%}.flyout-content-bottom-left .arrow-mask{top:100%;left:0;width:100%}.flyout-content-bottom-left .arrow-mask .arrow-pointer{top:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);left:var(--flyout-arrow-size,8px)}.flyout-content-bottom-center .arrow-mask{top:100%;left:0;width:100%}.flyout-content-bottom-center .arrow-mask .arrow-pointer{top:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);left:calc(50% - calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2)}.flyout-content-bottom-right .arrow-mask{top:100%;right:0;width:100%}.flyout-content-bottom-right .arrow-mask .arrow-pointer{top:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);right:var(--flyout-arrow-size,8px)}"; },
        enumerable: true,
        configurable: true
    });
    return WfFlyout;
}());
__decorate([
    PrefixEvent()
], WfFlyout.prototype, "open", void 0);
__decorate([
    PrefixEvent()
], WfFlyout.prototype, "close", void 0);
export { WfFlyout as wf_flyout };
