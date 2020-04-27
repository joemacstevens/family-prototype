import { EventEmitter } from '../../stencil.core';
import { FormErrorMessage } from '../../utils/types';
import { InputVariant, InputSize, InputTextAlign } from '../wf-input/types';
import { AmountFilterRange, AmountFilterOutput, AmountFilterType } from './types';
import { ButtonSize } from '../wf-button/types';
import { InputType, MaskOptions, MaskValue } from '../wf-input/types';
export declare class WfAmountFilter {
    defaultMask: MaskOptions;
    /** Inner input error */
    inputError: boolean;
    /** Internal selected tab */
    internalSelectedTab: AmountFilterRange;
    /** Internal inner input value */
    internalValue: number | string;
    /** Visible trigger value */
    internalVisibleValue: string;
    /** Filter label */
    label: string;
    /** Inner value input label */
    innerLabel: string;
    /** Filtered column key name. Used as ID of filtered column */
    field: string;
    /** Variant of filter wf-input */
    variant: InputVariant;
    /** Size of component trigger */
    size: InputSize;
    /** DEPRECATED! Size of filter input field */
    inputSize: InputSize;
    /** Size of action buttons */
    buttonSize: ButtonSize;
    /** Error message for empty input value (inner input)*/
    errorMessage: FormErrorMessage;
    /** Inner input current value */
    value: number | string;
    /** Current selected tab */
    selectedTab: AmountFilterRange;
    /** Decides if amount filter required */
    required: boolean;
    /** Sets filter component error state */
    error: boolean;
    /** Component error state message */
    mainErrorMessage: FormErrorMessage;
    /** Type of internal input */
    inputType: InputType;
    /** Mask options */
    maskOptions: MaskOptions;
    /** Value type returned from masked type input */
    maskValue: MaskValue;
    /** Internal input prefix */
    prefixLabel: string;
    /** Input value alignment */
    textAlign: InputTextAlign;
    /** Input text placeholder */
    placeholder: string;
    /** Decides if amount filter is disabled */
    disabled: boolean;
    /** Amount filter change event */
    change: EventEmitter<AmountFilterOutput>;
    /** Amount filter change event */
    docChange: EventEmitter<AmountFilterOutput>;
    /** Amount filter change event */
    docWfChange: EventEmitter<AmountFilterOutput>;
    dropdown: HTMLWfDropdownElement;
    triggerInput: HTMLWfInputElement;
    innerInput: HTMLWfInputElement;
    filterListItems: {
        [AmountFilterType.EQUAL]: string;
        [AmountFilterType.LESS]: string;
        [AmountFilterType.GREATER]: string;
    };
    componentWillLoad(): void;
    handleInputValueChange(newValue: any): void;
    handleSelectedTabChange(newSelectedTab: any): void;
    handleOnItemClick(tabName: AmountFilterRange): void;
    handleApplyButtonClick(): void;
    get triggerValue(): string;
    handleInputChange(event: any): void;
    handleKeyPress(event: any): void;
    validateInput(): void;
    cancelFilter(): void;
    closeFilter(): void;
    renderListItems(): any[];
    render(): any;
}
