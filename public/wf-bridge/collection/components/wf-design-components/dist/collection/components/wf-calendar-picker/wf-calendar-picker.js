var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import pickmeup from 'pickmeup/dist/pickmeup.min';
import { PresetNames, PresetDisplayValue } from './types';
import moment from 'moment';
import { DropdownTriggerType, KeyValue } from '../../utils/types';
import { stopPropagation } from '../../utils/utils';
import { PrefixEvent } from '../../utils/custom-event-emitter';
export class CalendarPicker {
    constructor() {
        /** Enable range picking */
        this.range = true;
        /** Define the date format */
        this.format = 'm/d/Y';
        /** Define if the left panel with preset is visible */
        this.showPreset = true;
        /** Define array of hided preset  */
        this.excludedPreset = [];
        /** DEPRECATED! Size of component trigger */
        this.size = 'lg';
        /** DEPRECATED! Size of filter input fields */
        this.inputSize = 'lg';
        /** DEPRECATED! Size of action buttons */
        this.buttonSize = 'md';
        /** Input icon */
        this.icon = 'wf-arrow-down';
        /** Decides if calendar field required */
        this.required = false;
        /** Sets filter component error state */
        this.error = false;
        /** Decides if calendar picker is disabled */
        this.disabled = false;
        /** Type of weekend to block in calendar */
        this.weekend = true;
        /** Decides if disabled data should be shown */
        this.showDisable = false;
        this.handleWrapperDateChange = (event) => {
            if (!this.range) {
                const formattedDate = event.detail.formatted_date;
                this.date = formattedDate;
                this.closeDropdown();
                this.change.emit(event.detail.date);
            }
            else {
                this.activatePreset(PresetNames.CUSTOM_RANGE);
                this.updateDateInput(...event.detail.date);
            }
        };
        this.handleInputClick = () => {
            const selectedDays = this.wrapperElement.querySelectorAll('.pmu-days .pmu-selected');
            if (selectedDays.length > 0) {
                selectedDays[selectedDays.length - 1].classList.add('pmu-selected-last');
            }
        };
        this.onApplyClick = () => {
            this.date = pickmeup(this.wrapperElement).get_date(true);
            this.change.emit(this.date);
        };
    }
    /** To focus calendar element use setFocus method */
    async setFocus() {
        const input = this.getHost().shadowRoot.querySelector('wf-input');
        input.setFocus();
    }
    handleDateChange(newDate) {
        const { range, format, wrapperElement } = this;
        if (!range) {
            const date = moment(newDate, format.toUpperCase());
            if (!date.isValid() || this.isDateDisabled(date.toDate()))
                return;
            pickmeup(wrapperElement).set_date(date.toDate());
            this.inputElement.value = date.format(format.toUpperCase());
            return;
        }
        let [fromDate, toDate] = Array.isArray(newDate) ? [...newDate] : [...newDate.split(',')];
        [fromDate, toDate] = [
            moment(fromDate, format.toUpperCase()),
            moment(toDate, format.toUpperCase()),
        ];
        if (!this.validateDate(fromDate, toDate))
            return;
        pickmeup(wrapperElement).set_date([fromDate.toDate(), toDate.toDate()]);
        this.applySelectedRange();
    }
    handleDisableChange() {
        if (this.holidays) {
            this.initBlackoutDate();
        }
        pickmeup(this.wrapperElement).update();
    }
    handleDropdownOpen(event) {
        event.stopPropagation();
        const { range, wrapperElement, selectedDate, activePreset } = this;
        if (event.detail && range) {
            pickmeup(wrapperElement).set_date(selectedDate);
            if (selectedDate) {
                this.updateDateInput(...selectedDate);
                this.activatePreset(PresetNames.CUSTOM_RANGE);
            }
            else {
                this.updateDateInput();
                this.activatePreset(activePreset ? activePreset.name : PresetNames.CUSTOM_RANGE);
            }
        }
    }
    handleUserInput(event) {
        const { format, fromInputElement, toInputElement, wrapperElement, showDisable } = this;
        const inputTarget = event.composedPath()[0];
        if (inputTarget !== fromInputElement && inputTarget !== toInputElement) {
            return;
        }
        event.stopPropagation();
        const fromData = moment(fromInputElement.value, format.toUpperCase());
        const toData = moment(toInputElement.value, format.toUpperCase());
        if (this.validateDate(fromData, toData, showDisable)) {
            this.activatePreset(PresetNames.CUSTOM_RANGE);
            pickmeup(wrapperElement).set_date([fromData.toDate(), toData.toDate()]);
        }
        else {
            this.updateDateInput();
        }
    }
    handleFocusedInput(event) {
        if (event.key === KeyValue.ENTER_KEY) {
            event.preventDefault();
            this.dropdown.opened = !this.dropdown.opened;
        }
    }
    componentWillLoad() {
        const { showPreset, range, format, holidays } = this;
        if (showPreset && range) {
            this.initPresets();
        }
        if (!this.placeholder) {
            this.placeholder = format;
        }
        if (holidays) {
            this.initBlackoutDate();
        }
    }
    componentDidLoad() {
        const { inputElement, wrapperElement, range, format, minDate, maxDate, date } = this;
        /* eslint-disable */
        pickmeup(wrapperElement, {
            flat: true,
            mode: range ? 'range' : 'single',
            format,
            hide_on_select: false,
            title_format: 'B Y',
            default_date: false,
            first_day: 0,
            select_month: false,
            select_year: false,
            min: minDate,
            max: maxDate,
            render: (date) => {
                if (this.isDateDisabled(date)) {
                    const currentRange = pickmeup(wrapperElement).get_date();
                    const inRange = this.range
                        ? currentRange[0].getTime() < date.getTime() &&
                            currentRange[1].getTime() > date.getTime()
                        : false;
                    return {
                        disabled: true,
                        class_name: inRange ? 'pmu-selected-disable' : '',
                    };
                }
            },
        });
        /* eslint-enable */
        wrapperElement.addEventListener('pickmeup-change', this.handleWrapperDateChange);
        inputElement.addEventListener('click', this.handleInputClick);
        if (date) {
            this.handleDateChange(date);
        }
    }
    componentDidUnload() {
        const { wrapperElement, inputElement } = this;
        wrapperElement.removeEventListener('pickmeup-change', this.handleWrapperDateChange);
        inputElement.removeEventListener('click', this.handleInputClick);
    }
    getHost() {
        return this.host;
    }
    initPresets() {
        const { minDate, maxDate, excludedPreset, defaultPreset, format } = this;
        const today = moment().endOf('day');
        const forTodayRange = (locale) => () => {
            return {
                from: today
                    .clone()
                    .startOf(locale)
                    .toDate(),
                to: today.clone().toDate(),
            };
        };
        const forLastRange = (locale) => () => {
            return {
                from: today
                    .clone()
                    .subtract(1, locale)
                    .startOf(locale)
                    .toDate(),
                to: today
                    .clone()
                    .subtract(1, locale)
                    .endOf(locale)
                    .toDate(),
            };
        };
        this.presets = [
            {
                name: PresetNames.THIS_MONTH,
                displayValue: PresetDisplayValue.THIS_MONTH,
                presetHandler: () => {
                    return {
                        from: today
                            .clone()
                            .startOf('month')
                            .toDate(),
                        to: today
                            .clone()
                            .endOf('month')
                            .toDate(),
                    };
                },
                hidden: excludedPreset.includes(PresetNames.THIS_MONTH),
            },
            {
                name: PresetNames.LAST_MONTH,
                displayValue: PresetDisplayValue.LAST_MONTH,
                presetHandler: forLastRange('month'),
                hidden: excludedPreset.includes(PresetNames.LAST_MONTH),
            },
            {
                name: PresetNames.QUARTER_TO_DATE,
                displayValue: PresetDisplayValue.QUARTER_TO_DATE,
                presetHandler: forTodayRange('quarter'),
                hidden: excludedPreset.includes(PresetNames.QUARTER_TO_DATE),
            },
            {
                name: PresetNames.YEAR_TO_DATE,
                displayValue: PresetDisplayValue.YEAR_TO_DATE,
                presetHandler: forTodayRange('year'),
                hidden: excludedPreset.includes(PresetNames.YEAR_TO_DATE),
            },
            {
                name: PresetNames.LAST_YEAR,
                displayValue: PresetDisplayValue.LAST_YEAR,
                presetHandler: forLastRange('year'),
                hidden: excludedPreset.includes(PresetNames.LAST_YEAR),
            },
            {
                name: PresetNames.CUSTOM_RANGE,
                displayValue: PresetDisplayValue.CUSTOM_RANGE,
                hidden: false,
            },
            {
                name: PresetNames.ALL_AVAILABLE_ACTIVITY,
                displayValue: PresetDisplayValue.ALL_AVAILABLE_ACTIVITY,
                presetHandler: () => {
                    return {
                        from: (minDate ? moment(minDate, format.toUpperCase()) : moment(0)).toDate(),
                        to: (maxDate ? moment(maxDate, format.toUpperCase()) : today).toDate(),
                    };
                },
                hidden: excludedPreset.includes(PresetNames.ALL_AVAILABLE_ACTIVITY),
            },
        ];
        this.activePreset = this.presets.find((preset) => preset.name === (defaultPreset || PresetNames.CUSTOM_RANGE));
    }
    activatePreset(presetName) {
        if (!this.showPreset)
            return;
        const selectedPreset = this.presets.find((preset) => preset.name === presetName);
        this.activePreset = selectedPreset;
        if (!selectedPreset.presetHandler)
            return;
        const range = selectedPreset.presetHandler();
        pickmeup(this.wrapperElement).set_date([range.from, range.to]);
        this.updateDateInput(range.from, range.to);
    }
    initBlackoutDate() {
        const { holidays, format } = this;
        const blackoutDates = [];
        holidays.forEach((holiday) => {
            if (!Array.isArray(holiday)) {
                const date = moment(holiday, format.toUpperCase());
                if (date.isValid())
                    blackoutDates.push(date);
            }
            else {
                const fromDate = moment(holiday[0], format.toUpperCase());
                const toDate = moment(holiday[1], format.toUpperCase());
                if (this.validateDate(fromDate, toDate))
                    for (let date = moment(fromDate); date.diff(toDate, 'days') <= 0; date.add(1, 'days'))
                        blackoutDates.push(moment(date));
            }
        });
        this.blackoutDays = blackoutDates;
    }
    getDisabledWeekend(weekend) {
        let weekendArray = [];
        switch (weekend) {
            case 'only_sun':
                weekendArray = [0];
                break;
            case 'only_sat':
                weekendArray = [6];
                break;
            case true:
            case true.toString():
                weekendArray = [0, 6];
                break;
        }
        return weekendArray;
    }
    isDateBlackout(date) {
        const { blackoutDays } = this;
        return (blackoutDays &&
            blackoutDays.findIndex((holiday) => {
                return holiday.isSame(date, 'days');
            }) > -1);
    }
    isDateDisabled(date) {
        return (this.showDisable &&
            (this.getDisabledWeekend(this.weekend).includes(date.getDay()) || this.isDateBlackout(date)));
    }
    applySelectedRange() {
        const formattedDate = pickmeup(this.wrapperElement).get_date(true);
        const date = pickmeup(this.wrapperElement).get_date(false);
        this.inputElement.value = formattedDate.join(' to ');
        this.closeDropdown();
        this.selectedDate = date;
    }
    closeDropdown() {
        this.dropdown.opened = false;
    }
    validateDate(fromData, toData, checkDisable = false) {
        return (fromData.isValid() &&
            toData.isValid() &&
            fromData.isSameOrBefore(toData) &&
            (checkDisable
                ? !this.isDateDisabled(fromData.toDate()) && !this.isDateDisabled(toData.toDate())
                : true));
    }
    updateDateInput(from, to) {
        const { format, wrapperElement } = this;
        const momentFormatter = format.toUpperCase();
        const currentData = pickmeup(wrapperElement).get_date(true);
        this.fromInputElement.value = from ? moment(from).format(momentFormatter) : currentData[0];
        this.toInputElement.value = to ? moment(to).format(momentFormatter) : currentData[1];
    }
    renderPresetItem(preset) {
        const { activePreset } = this;
        return (!preset.hidden && (h("li", { class: `date-picker-list-item ${activePreset.name === preset.name ? 'active' : ''}`, onClick: () => {
                this.activatePreset(preset.name);
            } }, preset.displayValue)));
    }
    render() {
        const { label, placeholder, range, presets, showPreset, size, inputSize, buttonSize, icon, iconSize, required, error, mainErrorMessage, disabled, } = this;
        const inputAttributes = {
            readonly: true,
            'data-dropdown': DropdownTriggerType.TOGGLE,
            class: 'date-picker-trigger-input',
            placeholder,
            required,
            size,
            icon,
            iconSize,
            error,
            errorMessage: mainErrorMessage,
            disabled,
            onChange: stopPropagation,
        };
        const wrapperClasses = {
            'calendar-wrapper': true,
        };
        const asteriskClasses = {
            [`error`]: !!error,
            ['required']: !error && !!required,
        };
        return (h("span", null,
            h("div", { class: "dropdown-trigger" },
                !!label ? (h("label", { "data-dropdown-trigger": true, class: "form-label" },
                    label,
                    (!!error || !!required) && h("span", { class: asteriskClasses }, "*"))) : null,
                h("wf-input", Object.assign({ ref: (el) => (this.inputElement = el) }, inputAttributes))),
            h("wf-dropdown", { ref: (el) => (this.dropdown = el), alignWithParent: false, disabled: disabled }, range ? (h("div", { class: "date-picker-content" },
                showPreset && (h("ul", { class: "date-picker-list" }, presets.map((preset) => this.renderPresetItem(preset)))),
                h("div", { class: "date-picker-calendar-control" },
                    h("div", { class: "data-picker-range" },
                        h("wf-input", { ref: (el) => (this.fromInputElement = el), label: "From", size: inputSize }),
                        h("wf-input", { ref: (el) => (this.toInputElement = el), label: "To", size: inputSize })),
                    h("div", { class: "date-picker-range", ref: (el) => (this.wrapperElement = el) }),
                    h("div", { class: "date-picker-footer" },
                        h("wf-button", { onClick: () => this.closeDropdown(), variant: "link", size: buttonSize }, "Cancel"),
                        h("wf-button", { onClick: this.onApplyClick, size: buttonSize }, "Apply"))))) : (h("div", { class: wrapperClasses, ref: (el) => (this.wrapperElement = el) })))));
    }
    static get is() { return "wf-calendar-picker"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/calendar-picker/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/calendar-picker/main.css"]
    }; }
    static get properties() { return {
        "label": {
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
                "text": "Content of input top label"
            },
            "attribute": "label",
            "reflect": false
        },
        "placeholder": {
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
                "text": "Input text placeholder"
            },
            "attribute": "placeholder",
            "reflect": false
        },
        "range": {
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
                "text": "Enable range picking"
            },
            "attribute": "range",
            "reflect": false,
            "defaultValue": "true"
        },
        "format": {
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
                "text": "Define the date format"
            },
            "attribute": "format",
            "reflect": false,
            "defaultValue": "'m/d/Y'"
        },
        "minDate": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string | Date",
                "resolved": "Date | string",
                "references": {
                    "Date": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Define the min date available for selection"
            },
            "attribute": "min-date",
            "reflect": false
        },
        "maxDate": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string | Date",
                "resolved": "Date | string",
                "references": {
                    "Date": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Define the max date available for selection"
            },
            "attribute": "max-date",
            "reflect": false
        },
        "showPreset": {
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
                "text": "Define if the left panel with preset is visible"
            },
            "attribute": "show-preset",
            "reflect": false,
            "defaultValue": "true"
        },
        "defaultPreset": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "PresetNameType",
                "resolved": "\"all_available_activity\" | \"custom_range\" | \"last_month\" | \"last_year\" | \"quarter_to_date\" | \"this_month\" | \"year_to_date\"",
                "references": {
                    "PresetNameType": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Default preset"
            },
            "attribute": "default-preset",
            "reflect": false
        },
        "excludedPreset": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "any[]",
                "resolved": "any[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Define array of hided preset"
            },
            "defaultValue": "[]"
        },
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "InputSize",
                "resolved": "\"lg\" | \"sm\"",
                "references": {
                    "InputSize": {
                        "location": "import",
                        "path": "../wf-input/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "DEPRECATED! Size of component trigger"
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "'lg'"
        },
        "inputSize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "InputSize",
                "resolved": "\"lg\" | \"sm\"",
                "references": {
                    "InputSize": {
                        "location": "import",
                        "path": "../wf-input/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "DEPRECATED! Size of filter input fields"
            },
            "attribute": "input-size",
            "reflect": false,
            "defaultValue": "'lg'"
        },
        "buttonSize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ButtonSize",
                "resolved": "\"lg\" | \"md\" | \"sm\"",
                "references": {
                    "ButtonSize": {
                        "location": "import",
                        "path": "../wf-button/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "DEPRECATED! Size of action buttons"
            },
            "attribute": "button-size",
            "reflect": false,
            "defaultValue": "'md'"
        },
        "icon": {
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
                "text": "Input icon"
            },
            "attribute": "icon",
            "reflect": false,
            "defaultValue": "'wf-arrow-down'"
        },
        "iconSize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "IconSize",
                "resolved": "\"lg\" | \"md\" | \"sm\" | \"xl\" | \"xs\" | \"xxs\"",
                "references": {
                    "IconSize": {
                        "location": "import",
                        "path": "../wf-icon/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Input icon size"
            },
            "attribute": "icon-size",
            "reflect": false
        },
        "required": {
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
                "text": "Decides if calendar field required"
            },
            "attribute": "required",
            "reflect": false,
            "defaultValue": "false"
        },
        "error": {
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
                "text": "Sets filter component error state"
            },
            "attribute": "error",
            "reflect": false,
            "defaultValue": "false"
        },
        "mainErrorMessage": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "FormErrorMessage",
                "resolved": "FormErrorMessage",
                "references": {
                    "FormErrorMessage": {
                        "location": "import",
                        "path": "../../utils/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Component error state message"
            }
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
                "text": "Decides if calendar picker is disabled"
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "date": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string[] | string",
                "resolved": "string | string[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Initial calendar date"
            },
            "attribute": "date",
            "reflect": false
        },
        "weekend": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "CalendarWeekend",
                "resolved": "\"only_sat\" | \"only_sun\" | boolean",
                "references": {
                    "CalendarWeekend": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Type of weekend to block in calendar"
            },
            "attribute": "weekend",
            "reflect": false,
            "defaultValue": "true"
        },
        "holidays": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "(string | string[])[]",
                "resolved": "(string | string[])[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Define blackout days"
            }
        },
        "showDisable": {
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
                "text": "Decides if disabled data should be shown"
            },
            "attribute": "show-disable",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "presets": {},
        "activePreset": {}
    }; }
    static get events() { return [{
            "method": "docChange",
            "name": "change",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Date picker change event, contains the picked date or array of two dates in case of range picker"
            },
            "complexType": {
                "original": "string | string[]",
                "resolved": "string | string[]",
                "references": {}
            }
        }, {
            "method": "docWfChange",
            "name": "wfChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Date picker change event, contains the picked date or array of two dates in case of range picker"
            },
            "complexType": {
                "original": "string | string[]",
                "resolved": "string | string[]",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "setFocus": {
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
                "text": "To focus calendar element use setFocus method",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "date",
            "methodName": "handleDateChange"
        }, {
            "propName": "showDisable",
            "methodName": "handleDisableChange"
        }, {
            "propName": "weekend",
            "methodName": "handleDisableChange"
        }, {
            "propName": "holidays",
            "methodName": "handleDisableChange"
        }]; }
    static get listeners() { return [{
            "name": "toggle",
            "method": "handleDropdownOpen",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "change",
            "method": "handleUserInput",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "handleFocusedInput",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
__decorate([
    PrefixEvent()
], CalendarPicker.prototype, "change", void 0);
