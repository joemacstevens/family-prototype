'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-4cbc2ed1.js');
require('./_commonjsHelpers-72d386ba.js');
const utils = require('./utils-aa0a6419.js');
const customEventEmitter = require('./custom-event-emitter-f54d881b.js');
const observeIntersection = require('./observe-intersection-00f33ec1.js');
const errorMessages = require('./error-messages-cc772063.js');

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
const WfFlyout = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
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
        this.flyoutOpenChanged = core.createEvent(this, "flyoutOpenChanged", 7);
        this.docOpen = core.createEvent(this, "open", 7);
        this.docWfOpen = core.createEvent(this, "wfOpen", 7);
        this.docClose = core.createEvent(this, "close", 7);
        this.docWfClose = core.createEvent(this, "wfClose", 7);
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
        const flyoutContentElements = errorMessages.getElementsFromSlot(this.host, '.flyout-content slot');
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
        const coordinate = errorMessages.arrowCoordinate(`${spaces.vertical}-${spaces.horizontal}`, triggerEl, arrowSize);
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
            ? errorMessages.checkParentElementPosition(triggerEl, flyoutElement, screenGrid, defaultSpaces)
            : errorMessages.checkChildElementPosition(triggerEl, flyoutElement, overlap, defaultSpaces);
        const { placement, spaces } = newPlacement;
        flyoutElement.style.top = utils.setPX(placement.top);
        flyoutElement.style.left = utils.setPX(placement.left);
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
            const assignedElements = errorMessages.getElementsFromSlot(this.host, '.flyout-trigger slot');
            if (assignedElements.length === 0) {
                throw new Error(errorMessages.errorMessages.NOT_FOUND_DETACHED_ELEMENT);
            }
            if (assignedElements.length > 1) {
                throw new Error(errorMessages.errorMessages.MORE_THAN_ONE_ELEMENT);
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
        errorMessages.makeSiblings(this.host, this.triggerEl);
        // create spy to spy on host, inject spy into trigger element
        errorMessages.createSpy(this.host, this.triggerEl);
        // detach tooltip from original context
        errorMessages.appendToBody(this.host);
    }
    addEventListeners() {
        const { triggerEl, handleMouseEnter, handleMouseLeave, handleClick } = this;
        triggerEl.addEventListener('mouseenter', handleMouseEnter);
        triggerEl.addEventListener('mouseleave', handleMouseLeave);
        triggerEl.addEventListener('click', handleClick);
    }
    addIntersectionObserver() {
        const { triggerEl } = this;
        observeIntersection.observeIntersection(triggerEl, (entries) => {
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
        return (core.h("div", { class: "flyout", onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }, core.h("div", { class: triggerClasses, tabindex: triggerTabIndex }, core.h("slot", { name: "trigger" })), opened && visible ? (core.h("div", { class: contentWrapperClasses }, core.h("div", { class: contentClasses }, core.h("span", { class: "arrow-mask" }, core.h("span", { class: "arrow-pointer" })), core.h("div", { class: "flyout-content-slot-wrapper" }, core.h("slot", null))))) : (core.h("div", null))));
    }
    get host() { return core.getElement(this); }
    static get watchers() { return {
        "opened": ["emitOpenChanged"]
    }; }
    static get style() { return ":host{display:inline-block}.flyout{position:relative;font-family:var(--flyout-font-family);color:var(--flyout-text-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))))}.flyout-trigger{cursor:pointer}.flyout-trigger-none{cursor:auto}.flyout-content{position:relative;background:var(--flyout-background,#fff);border-color:var(--flyout-background,#fff);-webkit-box-shadow:var(--flyout-box-shadow,var(--flyout-shadow,2px 4px 8px 0) var(--flyout-shadow-color,rgba(28,28,28,.5)));box-shadow:var(--flyout-box-shadow,var(--flyout-shadow,2px 4px 8px 0) var(--flyout-shadow-color,rgba(28,28,28,.5)));min-height:var(--flyout-min-height,200px);display:-ms-flexbox;display:flex}.flyout-content-wrapper{-webkit-box-sizing:border-box;box-sizing:border-box;position:fixed;z-index:var(--flyout-z-index,1000);top:100%;padding:calc(var(--flyout-distance, var(--spacing-xxs, 6px)) + var(--flyout-arrow-size, 8px));min-width:var(--flyout-min-width,180px);max-width:var(--flyout-max-width,70%);width:var(--flyout-width,auto);white-space:normal;word-break:break-word}.flyout-content-wrapper .arrow-mask{display:block;position:absolute;height:calc(var(--flyout-arrow-size, 8px) + var(--spacing-xxs, 6px));width:calc(var(--flyout-arrow-size, 8px) + var(--spacing-xxs, 6px))}.flyout-content-wrapper .arrow-mask .arrow-pointer{position:absolute;left:auto;top:auto;width:calc(var(--flyout-arrow-size, 8px) * 1.41);height:calc(var(--flyout-arrow-size, 8px) * 1.41);background:var(--flyout-background,#fff);-webkit-box-shadow:var(--flyout-shadow,2px 4px 8px 0) var(--flyout-shadow-color,rgba(28,28,28,.5));box-shadow:var(--flyout-shadow,2px 4px 8px 0) var(--flyout-shadow-color,rgba(28,28,28,.5));-webkit-transform:rotate(45deg);transform:rotate(45deg)}.flyout-content-wrapper.no-arrow{padding:var(--flyout-distance,var(--spacing-xxs,6px))}.flyout-content-wrapper.no-arrow .arrow-mask,.flyout-content-wrapper.no-arrow .arrow-pointer{display:none}.flyout-content-slot-wrapper{padding:var(--flyout-padding,var(--spacing-xxs,6px));background:var(--flyout-background,#fff);position:relative;-ms-flex-item-align:stretch;align-self:stretch;width:100%}.flyout-content-left-top .arrow-mask{right:100%;top:0;height:100%}.flyout-content-left-top .arrow-mask .arrow-pointer{right:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);top:unset}.flyout-content-left-bottom .arrow-mask{right:100%;bottom:0;height:100%}.flyout-content-left-bottom .arrow-mask .arrow-pointer{right:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);bottom:unset}.flyout-content-right-top .arrow-mask{left:100%;top:0;height:100%}.flyout-content-right-top .arrow-mask .arrow-pointer{left:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);top:unset}.flyout-content-right-bottom .arrow-mask{left:100%;bottom:0;height:100%}.flyout-content-right-bottom .arrow-mask .arrow-pointer{left:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);bottom:unset}.flyout-content-top-left .arrow-mask{bottom:100%;left:0;width:100%}.flyout-content-top-left .arrow-mask .arrow-pointer{bottom:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);left:var(--flyout-arrow-size,8px)}.flyout-content-top-center .arrow-mask{bottom:100%;left:0;width:100%}.flyout-content-top-center .arrow-mask .arrow-pointer{bottom:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);left:calc(50% - calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2)}.flyout-content-top-right .arrow-mask{bottom:100%;right:0;width:100%}.flyout-content-top-right .arrow-mask .arrow-pointer{bottom:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);right:var(--flyout-arrow-size,8px)}.flyout-content-middle-left .arrow-mask{top:100%;right:0;height:100%}.flyout-content-middle-left .arrow-mask .arrow-pointer{top:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);right:100%}.flyout-content-middle-right .arrow-mask{top:100%;left:0;height:100%}.flyout-content-middle-right .arrow-mask .arrow-pointer{top:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);left:100%}.flyout-content-bottom-left .arrow-mask{top:100%;left:0;width:100%}.flyout-content-bottom-left .arrow-mask .arrow-pointer{top:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);left:var(--flyout-arrow-size,8px)}.flyout-content-bottom-center .arrow-mask{top:100%;left:0;width:100%}.flyout-content-bottom-center .arrow-mask .arrow-pointer{top:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);left:calc(50% - calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2)}.flyout-content-bottom-right .arrow-mask{top:100%;right:0;width:100%}.flyout-content-bottom-right .arrow-mask .arrow-pointer{top:calc(-1 * calc(var(--flyout-arrow-size, 8px) * 1.41)/ 2);right:var(--flyout-arrow-size,8px)}"; }
};
__decorate([
    customEventEmitter.PrefixEvent()
], WfFlyout.prototype, "open", void 0);
__decorate([
    customEventEmitter.PrefixEvent()
], WfFlyout.prototype, "close", void 0);

exports.wf_flyout = WfFlyout;
