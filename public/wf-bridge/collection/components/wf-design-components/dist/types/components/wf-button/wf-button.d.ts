import { EventEmitter } from '../../stencil.core';
import { ButtonType, ButtonVariant, ButtonSize } from './types';
import { IconType, IconSize } from '../wf-icon/types';
import { IconPlacement } from '../../utils/types';
export declare class WfButton {
    host: HTMLElement;
    /** Type of button */
    type: ButtonType;
    /** Variant of button. DEPRECATED! 'link', 'success', 'warning', 'info', 'danger' */
    variant: ButtonVariant;
    /** DEPRECATED! Size of button */
    size: ButtonSize;
    /** Use to set button state as active */
    active: boolean;
    /** Use to set button state as disabled */
    disabled: boolean;
    /** Icon name to display on button */
    icon: string;
    /** Define if icon should be shown before or after text */
    iconPlacement: IconPlacement;
    /** DEPRECATED! Icon type */
    iconType: IconType;
    /** Icon size */
    iconSize: IconSize;
    /** @internal */
    wfClick: EventEmitter<any>;
    /** Input focus event */
    wfFocus: EventEmitter<void>;
    /** Input blur event */
    wfBlur: EventEmitter<void>;
    docClick: EventEmitter<any>;
    docFocus: EventEmitter<void>;
    docBlur: EventEmitter<void>;
    /** Button focus method */
    setFocus(): Promise<void>;
    captureButtonClick(e: MouseEvent): void;
    getHost(): HTMLElement;
    getNativeButton(): HTMLButtonElement;
    submit(form: HTMLFormElement): void;
    reset(form: HTMLFormElement): void;
    handleClick: () => void;
    selectForm(): HTMLFormElement;
    handleOnFocus: () => void;
    handleOnBlur: () => void;
    render(): any;
}
