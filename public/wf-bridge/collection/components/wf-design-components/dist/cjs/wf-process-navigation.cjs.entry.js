'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-4cbc2ed1.js');
const types = require('./types-84f579fc.js');
const customEventEmitter = require('./custom-event-emitter-f54d881b.js');

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
const WfProcessNavigation = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        /** Array of process steps */
        this.steps = [];
        /** Navigation type, freeflow allows step clicking */
        this.type = 'guided';
        this.docClick = core.createEvent(this, "click", 7);
        this.docWfClick = core.createEvent(this, "wfClick", 7);
    }
    componentWillLoad() {
        this.renderStep = this.renderStep.bind(this);
        this.handleStepClick = this.handleStepClick.bind(this);
        this.handleStepKeyDown = this.handleStepKeyDown.bind(this);
    }
    handleStepClick(event, step) {
        const { type, click } = this;
        event.stopPropagation();
        if (type !== 'freeflow' || step.disabled)
            return;
        event.target.blur();
        click.emit(step);
    }
    handleStepKeyDown(event, step) {
        const { type, click } = this;
        if (type !== 'freeflow' || event.keyCode !== types.KeyCodes.ENTER_KEY || step.disabled)
            return;
        click.emit(step);
    }
    renderStep(step) {
        const { handleStepClick, handleStepKeyDown, type } = this;
        const stepClasses = {
            'process-navigation-step': true,
            'process-navigation-step-disabled': step.disabled,
            [`process-navigation-step-${step.status || 'uncompleted'}`]: true,
        };
        return (core.h("div", { class: stepClasses, onClick: (event) => handleStepClick(event, step), onKeyDown: (event) => handleStepKeyDown(event, step), tabindex: type === 'freeflow' && !step.disabled ? '0' : '-1' }, step.icon && (core.h("wf-icon", { class: "process-navigation-step-icon", name: step.icon, size: step.iconSize || 'xs', type: "primary" })), core.h("span", { class: "process-navigation-step-label" }, step.label)));
    }
    render() {
        const { steps, renderStep, type } = this;
        const parsedSteps = Array.isArray(steps) ? steps : JSON.parse(steps);
        const navigationClasses = {
            'process-navigation': true,
            [`process-navigation-${type || 'guided'}`]: true,
        };
        return core.h("div", { class: navigationClasses }, parsedSteps.map(renderStep));
    }
    static get style() { return ":host{display:block}.process-navigation{display:-ms-flexbox;display:flex;font-family:var(--process-navigation-font-family);font-size:var(--process-navigation-font-size,var(--font-size-small,.9em));overflow-x:auto}.process-navigation-step{border-top:var(--process-navigation-step-border-width,var(--spacing-xxs,6px)) solid;-ms-flex:1 1 0px;flex:1 1 0px;min-width:var(--process-navigation-step-min-width,150px);outline:none}.process-navigation-step-label{line-height:var(--process-navigation-step-line-height,25px);vertical-align:middle}.process-navigation-step+.process-navigation-step{margin-left:var(--process-navigation-step-margin,var(--spacing-xxs,6px))}.process-navigation-step .process-navigation-step-icon{--icon-padding-xs:0;display:inline-block;height:var(--icon-size-xs,16px);margin-right:6px;vertical-align:middle}.process-navigation-freeflow .process-navigation-step:focus:not(.process-navigation-step-disabled),.process-navigation-freeflow .process-navigation-step:hover:not(.process-navigation-step-disabled){--icon-primary-color:var(--process-navigation-step-hover-icon-color,var(--plum,#5a6f89));border-top-color:var(--process-navigation-step-hover-border-color,var(--plum,#5a6f89));color:var(--process-navigation-step-hover-font-color,var(--plum,#5a6f89));font-weight:var(--process-navigation-step-hover-font-weight,var(--font-weight-bold,var(--font-weight,normal)));cursor:pointer}.process-navigation-step-active{--icon-primary-color:var(--process-navigation-step-active-icon-color,var(--positive,#0a7520));border-top-color:var(--process-navigation-step-active-border-color,var(--positive,#0a7520));color:var(--process-navigation-step-active-font-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));font-weight:var(--process-navigation-step-active-font-weight,var(--font-weight-bold,var(--font-weight,normal)))}.process-navigation-step-completed{--icon-primary-color:var(--process-navigation-step-completed-icon-color,var(--positive,#0a7520));border-top-color:var(--process-navigation-step-completed-border-color,var(--positive,#0a7520));color:var(--process-navigation-step-completed-font-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));font-weight:var(--process-navigation-step-completed-font-weight,var(--font-weight-normal,var(--font-weight,normal)))}.process-navigation-step-started{--icon-primary-color:var(--process-navigation-step-started-icon-color,var(--plum,#5a6f89));border-top-color:var(--process-navigation-step-started-border-color,var(--plum,#5a6f89));color:var(--process-navigation-step-started-font-color,var(--plum,#5a6f89));font-weight:var(--process-navigation-step-started-font-weight,var(--font-weight-normal,var(--font-weight,normal)))}.process-navigation-step-uncompleted{--icon-primary-color:var(--process-navigation-step-uncompleted-icon-color,var(--lavender,#bdc6d4));border-top-color:var(--process-navigation-step-uncompleted-border-color,var(--lavender,#bdc6d4));color:var(--process-navigation-step-uncompleted-font-color,var(--plum,#5a6f89));font-weight:var(--process-navigation-step-uncompleted-font-weight,var(--font-weight-normal,var(--font-weight,normal)))}"; }
};
__decorate([
    customEventEmitter.PrefixEvent()
], WfProcessNavigation.prototype, "click", void 0);

exports.wf_process_navigation = WfProcessNavigation;
