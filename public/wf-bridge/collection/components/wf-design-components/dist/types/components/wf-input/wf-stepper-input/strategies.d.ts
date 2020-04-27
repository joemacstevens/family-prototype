import { Strategy } from '../types';
import { WfStepperInput } from './wf-stepper-input';
export declare class NumericStrategy implements Strategy {
    generateValue({ value }: {
        value: any;
    }): number;
    swipeUp(object: WfStepperInput): void;
    swipeDown(object: WfStepperInput): void;
    validateValue(value: string): void;
}
export declare class OptionsStrategy implements Strategy {
    getValueFn: Function;
    constructor(getValueFn: any);
    generateValue({ parsedOptions, selectedIndex }: {
        parsedOptions: any;
        selectedIndex: any;
    }): any;
    swipeUp(object: WfStepperInput): void;
    swipeDown(object: WfStepperInput): void;
    validateValue(value: any, object: WfStepperInput): void;
}
