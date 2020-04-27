import { EventEmitter } from '../../stencil.core';
import { InputType, InputVariant, InputSize, InputTextAlign, MaskOptions, MaskValue } from './types';
import { FormErrorMessage } from '../../utils/types';
import { IconSize } from '../wf-icon/types';
export declare class WfInput {
    host: HTMLElement;
    /** ID of an underlying input element */
    inputId: string;
    /** Input text placeholder */
    placeholder: string;
    /** Content of top label */
    label: string;
    /** Decides if label has inline position */
    inlineLabel: boolean;
    /** DEPRECATED Content of caption */
    caption: string;
    /** Content of description / contextual info */
    description: string;
    /** Type of input */
    type: InputType;
    /** Variant of input */
    variant: InputVariant;
    /** DEPRECATED Size of input  */
    size: InputSize;
    /** Input icon */
    icon: string;
    /** Input icon size */
    iconSize: IconSize;
    /** Input locked icon */
    lockedIcon: string;
    /** Input locked icon size */
    lockedIconSize: IconSize;
    /** Decides if input is disabled */
    disabled: boolean;
    /** Decides if input in locked state */
    locked: boolean;
    /** Decides if input is in readonly mode */
    readonly: boolean;
    /** Decides if input has an error */
    error: boolean;
    /** Decides if input field required */
    required: boolean;
    /** Error messages */
    errorMessage: FormErrorMessage;
    /** Value of input */
    value: string;
    /** Maximum length of input field */
    maxlength: number;
    /** Mask options */
    maskOptions: MaskOptions;
    /** Value type returned from masked type input */
    maskValue: MaskValue;
    /** Input prefix */
    prefixLabel: string;
    /** Input value alignment */
    textAlign: InputTextAlign;
    /** Input change event */
    change: EventEmitter<any>;
    /** Input input event */
    input: EventEmitter<string>;
    /** Input icon click event */
    iconClick: EventEmitter<void>;
    /** Input focus event */
    wfFocus: EventEmitter<void>;
    /** Input blur event */
    wfBlur: EventEmitter<void>;
    /** Input click event */
    wfClick: EventEmitter<void>;
    docChange: EventEmitter<string>;
    docWfChange: EventEmitter<string>;
    docInput: EventEmitter<string>;
    docWfInput: EventEmitter<string>;
    docFocus: EventEmitter<void>;
    docBlur: EventEmitter<void>;
    docClick: EventEmitter<void>;
    private initialValue;
    private form;
    private mask;
    /** Input focus method */
    setFocus(): Promise<void>;
    /** Input select method */
    selectText(): Promise<void>;
    getHost(): HTMLElement;
    get isMasked(): boolean;
    getNativeInput(): HTMLInputElement;
    getValueToEmit(): any;
    componentWillLoad(): void;
    addIntersectionObserver(element: HTMLElement): void;
    setInputLeftPadding: () => void;
    componentDidLoad(): void;
    private initMask;
    mapMaskOptions(options: any): any;
    componentDidUnload(): void;
    private dropMask;
    handleType(): void;
    handleMaskOptions(maskOptions: any): void;
    handleValue(): void;
    handleInput: (event: Event) => void;
    handleChange: (event: Event) => void;
    handleOnFocus: () => void;
    handleOnBlur: () => void;
    formResetListener: () => void;
    handleIconClick: () => void;
    renderLockedIcon(): any;
    renderLabel(): any;
    render(): any;
}
