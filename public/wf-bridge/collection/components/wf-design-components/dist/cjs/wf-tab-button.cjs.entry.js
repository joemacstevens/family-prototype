'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-4cbc2ed1.js');

const WfTabButton = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        /** Decides which tab is selected initially, do not set this property directly since it's propagated from `wf-tabs` */
        this.selected = false;
        /** Controls the 'disabled' state of the button */
        this.disabled = false;
        this.tabButtonClicked = core.createEvent(this, "tabButtonClicked", 7);
        this.docWfTabButtonClicked = core.createEvent(this, "wfTabButtonClicked", 7);
    }
    handleWfTabSelect() {
        if (!this.disabled) {
            this.tabButtonClicked.emit(this.tab);
        }
    }
    render() {
        const { type, selected, disabled } = this;
        const tabClasses = {
            'tab-button': true,
            [`tab-button-${type}`]: !!type,
            'tab-button-active': selected,
            'tab-button-disabled': disabled,
        };
        return (core.h("div", { class: tabClasses, onClick: this.handleWfTabSelect.bind(this) }, core.h("slot", null)));
    }
    static get style() { return ".tab-button{color:var(--tab-color,var(--color-text-secondary,var(--text-secondary-color,#444)));cursor:pointer;font-size:var(--headline-4-font-size,32px);font-weight:var(--tab-font-weight,var(--font-weight-bold,var(--font-weight,normal)));height:var(--tab-height,36px);margin-right:var(--tab-margin,var(--spacing-l,54px));padding-bottom:calc(var(--active-tab-border-height, var(--spacing-xxs, 6px)) + var(--spacing-xs, 12px));position:relative;text-transform:var(--tab-text-transform,none)}.tab-button,.tab-button-active{font-stretch:normal;font-style:normal;line-height:1}.tab-button-active{color:var(--active-tab-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));font-weight:var(--active-tab-font-weight,var(--font-weight-bold,var(--font-weight,normal)))}.tab-button-active:after{background-color:var(--active-tab-border-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));bottom:0;content:\"\";height:var(--active-tab-border-height,var(--spacing-xxs,6px));left:0;position:absolute;width:100%}.tab-button:hover{color:var(--tab-hover-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));font-weight:var(--tab-hover-font-weight,var(--font-weight-bold,var(--font-weight,normal)))}.tab-button-disabled,.tab-button-disabled:hover{color:var(--disabled-tab-color,#eee)}.tab-button-disabled:hover{font-weight:var(--tab-font-weight,var(--font-weight-bold,var(--font-weight,normal)))}.tab-button-secondary{color:var(--tab-secondary-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));font-size:var(--tab-secondary-font-size,var(--font-size-small,.9em));font-weight:var(--tab-secondary-font-weight,var(--font-weight-normal,var(--font-weight,normal)));height:var(--tab-secondary-height,var(--font-size-small,.9em));margin-right:var(--tab-secondary-margin,var(--spacing-s,24px));padding-bottom:calc(var(--active-tab-secondary-border-height, 4px) + var(--spacing-xxs, 6px));text-transform:var(--tab-secondary-text-transform,none)}.tab-button-secondary.tab-button-active{color:var(--active-tab-secondary-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));font-weight:var(--active-tab-secondary-font-weight,var(--font-weight-bold,var(--font-weight,normal)))}.tab-button-secondary.tab-button-active:after{background-color:var(--active-tab-secondary-border-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));height:var(--active-tab-secondary-border-height,4px)}.tab-button-secondary:hover{color:var(--tab-secondary-hover-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));font-weight:var(--tab-secondary-hover-font-weight,var(--font-weight-bold,var(--font-weight,normal)))}.tab-button-secondary.tab-button-disabled{color:var(--disabled-tab-secondary-color,#eee)}.tab-button-secondary.tab-button-disabled:hover{color:var(--disabled-tab-secondary-color,#eee);font-weight:var(--tab-secondary-font-weight,var(--font-weight-normal,var(--font-weight,normal)))}"; }
};

exports.wf_tab_button = WfTabButton;
