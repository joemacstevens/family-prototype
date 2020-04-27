import { EventEmitter } from '../../stencil.core';
import { MultiselectDropdownOption, MultiselectDropdownResult } from './types';
import { FormErrorMessage } from '../../utils/types';
import { HTMLStencilElement } from '../../stencil.core';
import { InputVariant, InputSize } from '../wf-input/types';
import { ButtonSize } from '../wf-button/types';
import { CheckboxSize } from '../wf-checkbox/types';
export declare class WfMultiselectDropdown {
    host: HTMLStencilElement;
    /** Prepared options array */
    multiselectDropdownOptions: MultiselectDropdownOption[];
    /** List of selected options */
    selectedOptions: string[];
    /** Search string input */
    searchStr: string;
    /** Multiselect dropdown label */
    label: string;
    /** Filtered column key name. Used as ID of filtered column */
    field: string;
    /** Multiselect dropdown options. Type string is DEPRECATED! */
    options: MultiselectDropdownOption[] | string;
    /** Limit of visible selected options */
    optionsVisibilityLimit: number | string;
    /** Variant of filter wf-input */
    variant: InputVariant;
    /** DEPRECATED! Size of component trigger */
    size: InputSize;
    /** DEPRECATED! Size of action buttons */
    buttonSize: ButtonSize;
    /** Size of items checkboxs */
    checkboxSize: CheckboxSize;
    /** Decides if multiselect required */
    required: boolean;
    /** Sets filter component error state */
    error: boolean;
    /** Component error state message */
    errorMessage: FormErrorMessage;
    /** Property gives current value or sets new from options value. */
    value: string[];
    /** Input text placeholder */
    placeholder: string;
    /** Decides if multiselect dropdown is disabled */
    disabled: boolean;
    /** Change event */
    change: EventEmitter<MultiselectDropdownResult>;
    /** Change event */
    docChange: EventEmitter<MultiselectDropdownResult>;
    /** Change event */
    docWfChange: EventEmitter<MultiselectDropdownResult>;
    initialValue: string;
    currentOptionsState: string;
    selectedOptionsElement: any;
    dropdown: HTMLWfDropdownElement;
    handleInput(e: CustomEvent): void;
    handleDropdownChange(e: CustomEvent): void;
    handleKeyDown(e: KeyboardEvent): void;
    handleValueChange(newValue: any, oldValue: any): void;
    validateValues(value: string[]): boolean;
    toggleInput(opened: boolean): void;
    handleSave(): void;
    closeFilter(shouldSave?: boolean): void;
    handleCheckboxChange(option: MultiselectDropdownOption, event?: CustomEvent): void;
    handleSelectAll(event: CustomEvent | boolean): void;
    handleSelectAllClick(allSelected: boolean): void;
    handleCheckboxClick(option: MultiselectDropdownOption): void;
    updateSelectedOptions(): void;
    getDisplayValue(option: any): string;
    showSelectedOptions(): void;
    getSortableValue(option: any): any;
    sortOptions(options: MultiselectDropdownOption[]): MultiselectDropdownOption[];
    filterUniqueOptions(options: MultiselectDropdownOption[]): MultiselectDropdownOption[];
    componentWillLoad(): void;
    handleOptionsUpdate(newValue: any, oldValue?: any): void;
    componentDidLoad(): void;
    findSearchStrInValue(searchStr: string, value: string): boolean;
    renderMultiselectDropdownOptions(): any;
    render(): any;
}
