import { EventEmitter } from '../../../stencil.core';
import { FormErrorMessage } from '../../../utils/types';
import { InputVariant, InputSize, StepperOption, InputTextAlign, Strategy } from '../types';
import { IconSize } from '../../wf-icon/types';
import { ActionIconSize } from '../../wf-action-icon/types';
export declare class WfStepperInput {
    host: HTMLElement;
    /** Id of input stepper */
    inputId: string;
    /** DEPRECATED Content of caption */
    caption: string;
    /** Content of top label */
    label: string;
    /** Decides if label has inline position */
    inlineLabel: boolean;
    /** Content of description / contextual info */
    description: string;
    /** Variant of stepper */
    variant: InputVariant;
    /** DEPRECATED Size of stepper  */
    size: InputSize;
    /** Stepper options. DEPRECATED! Option types StepperOption[] | string */
    options: string[] | StepperOption[] | string;
    /** Decides if stepper is disabled */
    disabled: boolean;
    /** Decides if stepper is in locked state */
    locked: boolean;
    /** Input locked icon */
    lockedIcon: string;
    /** Input locked icon size */
    lockedIconSize: IconSize;
    arrowUpIcon: string;
    arrowDownIcon: string;
    arrowIconSize: ActionIconSize;
    /** Decides if stepper has an error */
    error: boolean;
    /** Error messages */
    errorMessage: FormErrorMessage;
    /** DEPRECATED! Decides if stepper input numeric */
    numeric: boolean;
    /** DEPRECATED! Accumulator function to get Value from object option */
    getValue: Function;
    /** Initial numeric input value or gives/sets value from options value. */
    value: string | number;
    /** Input value alignment */
    textAlign: InputTextAlign;
    selectedIndex: number;
    /** Stepper change event */
    stepperChange: EventEmitter<string | number>;
    /** Stepper change event */
    docStepperChange: EventEmitter<string | number>;
    /** Stepper change event */
    docWfStepperChange: EventEmitter<string | number>;
    valueIndex: number;
    length: number;
    parsedOptions: string[] | StepperOption[];
    strategy: Strategy;
    handleKeyDown(event: any): void;
    handleOptionsChange(newOptions: any, oldOptions: any): void;
    handleValueChange(newValue: any, oldValue: any): void;
    componentWillLoad(): void;
    checkOptionType(options: any): boolean;
    setStrategy(): void;
    generateValue: () => any;
    rerenderOptions: () => void;
    handleStepperChange: () => void;
    swipeUp: () => void;
    swipeDown: () => void;
    swipeUpAvailable: () => boolean;
    swipeDownAvailable: () => boolean;
    focusStepper: () => void;
    hasOptions: () => boolean;
    renderLabel(id: string): any;
    renderLockedIcon(): any;
    render(): any;
}
