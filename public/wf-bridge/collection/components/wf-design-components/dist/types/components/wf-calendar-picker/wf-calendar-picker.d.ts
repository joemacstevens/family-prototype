import { EventEmitter } from '../../stencil.core';
import { Preset, PresetNames, PresetNameType, CalendarWeekend } from './types';
import { Moment } from 'moment';
import { FormErrorMessage } from '../../utils/types';
import { InputSize } from '../wf-input/types';
import { ButtonSize } from '../wf-button/types';
import { IconSize } from '../wf-icon/types';
export declare class CalendarPicker {
    host: HTMLElement;
    /** Content of input top label */
    label: string;
    /** Input text placeholder */
    placeholder: string;
    /** Enable range picking */
    range: boolean;
    /** Define the date format */
    format: string;
    /** Define the min date available for selection */
    minDate: string | Date;
    /** Define the max date available for selection */
    maxDate: string | Date;
    /** Define if the left panel with preset is visible */
    showPreset: boolean;
    /** Default preset */
    defaultPreset: PresetNameType;
    /** Define array of hided preset  */
    excludedPreset: any[];
    /** DEPRECATED! Size of component trigger */
    size: InputSize;
    /** DEPRECATED! Size of filter input fields */
    inputSize: InputSize;
    /** DEPRECATED! Size of action buttons */
    buttonSize: ButtonSize;
    /** Input icon */
    icon: string;
    /** Input icon size */
    iconSize: IconSize;
    /** Decides if calendar field required */
    required: boolean;
    /** Sets filter component error state */
    error: boolean;
    /** Component error state message */
    mainErrorMessage: FormErrorMessage;
    /** Decides if calendar picker is disabled */
    disabled: boolean;
    /** Initial calendar date */
    date: string[] | string;
    /** Type of weekend to block in calendar */
    weekend: CalendarWeekend;
    /** Define blackout days */
    holidays: (string | string[])[];
    /** Decides if disabled data should be shown */
    showDisable: boolean;
    /** Date picker change event, contains the picked date or array of two dates in case of range picker */
    change: EventEmitter<string | string[]>;
    /** Date picker change event, contains the picked date or array of two dates in case of range picker */
    docChange: EventEmitter<string | string[]>;
    /** Date picker change event, contains the picked date or array of two dates in case of range picker */
    docWfChange: EventEmitter<string | string[]>;
    presets: Preset[];
    activePreset: Preset;
    blackoutDays: Moment[];
    inputElement: HTMLWfInputElement;
    fromInputElement: HTMLWfInputElement;
    toInputElement: HTMLWfInputElement;
    wrapperElement: HTMLDivElement;
    dropdown: HTMLWfDropdownElement;
    selectedDate: Date[];
    /** To focus calendar element use setFocus method */
    setFocus(): Promise<void>;
    handleDateChange(newDate: any): void;
    handleDisableChange(): void;
    handleDropdownOpen(event: CustomEvent): void;
    handleUserInput(event: CustomEvent): void;
    handleFocusedInput(event: KeyboardEvent): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    getHost(): HTMLElement;
    initPresets(): void;
    activatePreset(presetName: PresetNames): void;
    initBlackoutDate(): void;
    getDisabledWeekend(weekend: CalendarWeekend): any[];
    isDateBlackout(date: Date): boolean;
    isDateDisabled(date: any): boolean;
    handleWrapperDateChange: (event: CustomEvent<any>) => void;
    handleInputClick: () => void;
    onApplyClick: () => void;
    applySelectedRange(): void;
    closeDropdown(): void;
    validateDate(fromData: Moment, toData: Moment, checkDisable?: boolean): boolean;
    updateDateInput(from?: Date, to?: Date): void;
    renderPresetItem(preset: Preset): any;
    render(): any;
}
