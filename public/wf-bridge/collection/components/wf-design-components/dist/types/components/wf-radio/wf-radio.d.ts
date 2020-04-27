import { EventEmitter } from '../../stencil.core';
import { FormErrorMessage } from '../../utils/types';
import { RadioOption, RadioSize } from './types';
export declare class WfRadio<T> {
    host: HTMLElement;
    /** Prepared radio options array */
    radioOptions: RadioOption<any>[];
    /** Prepared radio group name property */
    radioName: string;
    /** Radio buttons group name */
    name: string;
    /** Content of top label */
    label: string;
    /** Decides if radio group is disabled */
    disabled: boolean;
    /** Decides if radio group align horizontally */
    inline: boolean;
    /** Decides if radio group has an error */
    error: boolean;
    /** Error messages */
    errorMessage: FormErrorMessage;
    /** Size of radio  */
    size: RadioSize;
    /** Radio options */
    options: RadioOption<any>[];
    /** Decides if radio field required */
    required: boolean;
    /** Currently selected value */
    value: any;
    /** Radio button change event */
    change: EventEmitter<any>;
    /** Radio button focus event */
    wfFocus: EventEmitter<void>;
    /** Radio button blur event */
    wfBlur: EventEmitter<void>;
    docChange: EventEmitter<any>;
    docWfChange: EventEmitter<any>;
    docFocus: EventEmitter<any>;
    docBlur: EventEmitter<any>;
    initialValue: any;
    private form;
    /** To focus radio button element use setFocus method */
    setFocus(): Promise<void>;
    watchHandler(newOptions: any): void;
    valueWatcher(newValue: any, oldValue: any): void;
    handleKeyDown(e: KeyboardEvent): void;
    allOptionsDisabled(): boolean;
    getSelectedOptionIndex: () => number;
    getNextIndex(): number;
    getPreviousIndex(): number;
    setChangedOption(index: number): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    componentDidUpdate(): void;
    formResetListener: () => void;
    getHost: () => HTMLElement;
    parseOptionElement(node: HTMLElement): RadioOption<string>;
    updateRadioOptions(options: RadioOption<T>[]): void;
    handleClick: (option: RadioOption<T>) => Promise<void>;
    handleOnFocus: () => Promise<void>;
    handleOnBlur: () => Promise<void>;
    renderOption(option: RadioOption<T>, index: number): any;
    render(): any;
}
