import { EventEmitter } from '../../stencil.core';
import { FormErrorMessage } from '../../utils/types';
import { SelectType, SelectSize, SelectOption, SelectVariant } from './types';
import { IconSize } from '../wf-icon/types';
import { ButtonVariant } from '../wf-button/types';
export declare class WfSelect<T> {
    host: HTMLElement;
    /** Prepared select options array */
    selectOptions: SelectOption<T>[];
    searchStr: string;
    selectedValue: string;
    /** Content of top label */
    label: string;
    /** Placeholder describes the expected value */
    placeholder: string;
    /** Prefix label content */
    prefixLabel: string;
    /** DEPRECATED! Content of left caption */
    caption: string;
    /** Decides if label has inline position */
    inlineLabel: boolean;
    /** Content of description / contextual info */
    description: string;
    /** Select ID */
    selectId: string;
    /** DEPRECATED! Type of select */
    type: SelectVariant;
    /** Type of component user as select list trigger (TEMPORARY! Will be changed to 'type') */
    selectType: SelectType;
    /** Variant of select trigger (SelectVariant or ButtonVariant, based on selectType)*/
    variant: SelectVariant | ButtonVariant;
    /** DEPRECATED! Size of select  */
    size: SelectSize;
    /** Decides if select is in locked state */
    locked: boolean;
    /** Decides if select is disabled */
    disabled: boolean;
    /** Decides if filtering available */
    liveSearch: boolean;
    /** Decides if select has an error */
    error: boolean;
    /** Error messages */
    errorMessage: FormErrorMessage;
    /** Icon name */
    icon: string;
    /** DEPRECATED! Search Icon Name */
    searchIcon: string;
    /** Icon size */
    iconSize: IconSize;
    /** Custom row for option element */
    customRow: (option: SelectOption<any>) => string;
    /** Select options. Type string is DEPRECATED! */
    options: SelectOption<any>[] | string;
    /** Decides if select field required */
    required: boolean;
    /** Property gives current value or sets new from options value. */
    value: any;
    /** Select change event */
    change: EventEmitter<any>;
    /** Change event */
    docChange: EventEmitter<any>;
    /** Change event */
    docWfChange: EventEmitter<any>;
    private form;
    initialOption: SelectOption<any>;
    dropdown?: HTMLWfDropdownElement;
    selectInput: HTMLWfInputElement;
    selectButton: HTMLWfButtonElement;
    /** To focus select element use setFocus method */
    setFocus(): Promise<void>;
    watchHandler(newOptions: any): void;
    handleInput(ev: any): void;
    handleDropdownChange(): void;
    handleKeyDown(ev: KeyboardEvent): void;
    handleValueChange(newValue: any, oldValue?: any): void;
    componentWillLoad(): void;
    getSelectedValue(): string;
    getSelectedValueText(): string;
    getSelectedOptionName(): string;
    componentDidLoad(): void;
    componentDidUnload(): void;
    getHost(): HTMLElement;
    formResetListener: () => void;
    parseOptionElement(node: HTMLElement): SelectOption<string>;
    updateSelectOptions(options: SelectOption<T>[] | string, initial?: boolean): void;
    closeSelect(): void;
    renderOption(option: SelectOption<T>, index: number): any;
    renderListOptions(options: SelectOption<T>[]): any;
    handleSelectChange: (option: SelectOption<T>) => void;
    renderLabel(): any;
    renderButtonTrigger(): any;
    renderInputTrigger(): any;
    render(): any;
}
