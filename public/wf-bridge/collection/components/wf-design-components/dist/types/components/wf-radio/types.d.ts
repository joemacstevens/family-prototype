export interface RadioOption<T> {
    label: string;
    value: T;
    optionId?: string;
    disabled?: boolean | string;
    checked?: boolean | string;
}
export declare type RadioSize = 'sm' | 'lg';
