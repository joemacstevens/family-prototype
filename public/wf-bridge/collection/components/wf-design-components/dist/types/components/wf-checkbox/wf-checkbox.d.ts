import { EventEmitter } from '../../stencil.core';
import { FormErrorMessage } from '../../utils/types';
import { CheckboxSize, CheckboxOutput } from './types';
export declare class WfCheckbox {
    host: HTMLElement;
    /** Checkbox name */
    name: string;
    /** Checkbox ID */
    checkboxId: string;
    /** Content of label */
    label: string;
    /** Decides if checkbox is checked */
    checked: boolean;
    /** Decides if checkbox is disabled */
    disabled: boolean;
    /** Decides if checkbox has an error */
    error: boolean;
    /** Error messages */
    errorMessage: FormErrorMessage;
    /** Size of checkbox  */
    size: CheckboxSize;
    /** Decides if checkbox field required */
    required: boolean;
    /** Decides if checkbox is indeterminate mode */
    indeterminate: boolean;
    /** Value of checkbox */
    value: string;
    /** Checkbox change event */
    change: EventEmitter<boolean | CheckboxOutput>;
    /** Checkbox focus event */
    wfFocus: EventEmitter<void>;
    /** Checkbox blur event */
    wfBlur: EventEmitter<void>;
    docChange: EventEmitter<boolean | CheckboxOutput>;
    docWfChange: EventEmitter<boolean | CheckboxOutput>;
    docFocus: EventEmitter<void>;
    docBlur: EventEmitter<void>;
    initialChecked: boolean;
    private form;
    /** To focus checkbox element use setFocus method */
    setFocus(): Promise<void>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    getHost(): HTMLElement;
    emitValue: () => void;
    formResetListener: () => void;
    handleClick: () => void;
    handleChange: (checkbox: any) => void;
    handleOnFocus: () => void;
    handleOnBlur: () => void;
    render(): any;
}
