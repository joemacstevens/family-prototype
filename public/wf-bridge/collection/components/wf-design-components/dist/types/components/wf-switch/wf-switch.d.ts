import { EventEmitter } from '../../stencil.core';
import { SwitchPlacement, SwitchSize } from './types';
import { IconPlacement } from '../../utils/types';
import { IconSize } from '../wf-icon/types';
export declare class WfSwitch {
    classes: {};
    /** Disabled Switch */
    disabled: boolean;
    /** Readonly Switch */
    readonly: boolean;
    /** Error Switch */
    error: boolean;
    /** On/Off labels placement */
    size: SwitchSize;
    /** On/Off labels placement */
    placement: SwitchPlacement;
    /** Define if icon should be shown before or after text */
    iconPlacement: IconPlacement;
    /** Define switch on name */
    on: string;
    /** Define switch off name */
    off: string;
    /** Define switch label */
    label: string;
    /** DEPRECATED! Define icon */
    iconname: any;
    /** Define icon */
    icon: string;
    /** DEPRECATED! Define icon size */
    iconsize: IconSize;
    /** Define icon size */
    iconSize: IconSize;
    /** Define if switch checked */
    checked: boolean;
    /** Switch change event */
    change: EventEmitter<boolean>;
    /** Switch change event */
    wfChange: EventEmitter<boolean>;
    handleChange: () => void;
    renderLabel(label: string): any;
    renderSingle(): any;
    renderWithoutText(): any;
    renderInsideText(): any;
    renderOutsideText(): any;
    renderLayout(placement: SwitchPlacement): any;
    render(): any;
}
