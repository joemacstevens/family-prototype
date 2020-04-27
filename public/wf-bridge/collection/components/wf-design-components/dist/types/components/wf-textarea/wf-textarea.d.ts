import { EventEmitter } from '../../stencil.core';
import { FormErrorMessage } from '../../utils/types';
import { TextareaVariant, TextareaSize } from './types';
export declare class WfTextarea {
    host: HTMLElement;
    /** ID of an underlying textarea element */
    textareaId: string;
    /** Textarea text placeholder */
    placeholder: string;
    /** Content of top label */
    label: string;
    /** Decides if label has inline position */
    inlineLabel: boolean;
    /** DEPRECATED Content of left caption */
    caption: string;
    /** Content of description / contextual info */
    description: string;
    /** Variant of textarea */
    variant: TextareaVariant;
    /** DEPRECATED Size of textarea  */
    size: TextareaSize;
    /** Rows of textarea  */
    rows: number;
    /** Cols of textarea  */
    cols: number;
    /** Decides if textarea is disabled */
    disabled: boolean;
    /** Decides if textarea in locked state */
    locked: boolean;
    /** Decides if textarea has an error */
    error: boolean;
    /**Decides if textarea field required */
    required: boolean;
    /** Error messages */
    errorMessage: FormErrorMessage;
    /** Value of textarea */
    value: string;
    /** Maximum length of textarea field */
    maxlength: number;
    /** Textarea change event */
    change: EventEmitter<string>;
    /** Textarea input event */
    wfInput: EventEmitter<string>;
    /** Textarea focus event */
    wfFocus: EventEmitter<void>;
    /** Textarea blur event */
    wfBlur: EventEmitter<void>;
    docChange: EventEmitter<string>;
    docWfChange: EventEmitter<string>;
    docInput: EventEmitter<string>;
    docFocus: EventEmitter<void>;
    docBlur: EventEmitter<void>;
    private initialValue;
    private form;
    /** To focus textarea element use setFocus method */
    setFocus(): Promise<void>;
    /** Textarea select method */
    selectText(): Promise<void>;
    componentWillLoad(): void;
    getHost(): HTMLElement;
    getNativeTextarea(): HTMLTextAreaElement;
    updateInput(value: string): Promise<void>;
    componentDidLoad(): void;
    formResetListener: () => void;
    componentDidUnload(): void;
    handleChange: (event: Event) => void;
    handleInput: (event: Event) => void;
    handleFocus: () => void;
    handleBlur: () => void;
    renderLabel(id: string): any;
    render(): any;
}
