import IMask from 'imask';
import { WfStepperInput } from './wf-stepper-input/wf-stepper-input';
export declare type InputType = 'color' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'masked';
export declare const BASIC_TYPES: string[];
export declare type MaskTypes = 'enum' | 'range';
export declare const MapMaskTypes: {
    enum: typeof IMask.MaskedEnum;
    range: typeof IMask.MaskedRange;
};
export declare const MASKED_TYPE = "masked";
export declare type InputVariant = 'primary' | 'secondary' | 'inverse';
export declare type InputSize = 'sm' | 'lg';
export declare type InputTextAlign = 'left' | 'center' | 'right';
export interface StepperOption {
    value: string;
}
/**
 * IMask.AnyMaskedOptions
 * https://github.com/ionic-team/stencil/issues/1512
 */
export declare type MaskOptions = any;
export declare type MaskValue = 'value' | 'unmaskedValue' | 'typedValue';
/**
 * IMask.InputMask
 * https://github.com/ionic-team/stencil/issues/1512
 */
export declare type Mask = any;
export declare class ShadowHTMLMaskElement extends IMask.HTMLMaskElement {
    get isActive(): boolean;
}
export interface Strategy {
    getValueFn?: Function;
    generateValue(object: WfStepperInput): any;
    swipeUp(object: WfStepperInput): void;
    swipeDown(object: WfStepperInput): void;
    validateValue(value: string, object: WfStepperInput): void;
}
